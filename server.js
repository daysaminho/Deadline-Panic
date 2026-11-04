const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const { SCENARIOS } = require('./public/data/scenarios.js');
const { generateProceduralMarket } = require('./public/data/generator.js');
const { checkPhilosophyMatch } = require('./public/data/archetypes.js');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));

// ==============================================================
// GESTIONNAIRE DE SALONS 1V1 DUEL EN LIGNE (DEADLINE DAY PANIC)
// ==============================================================

const duelRooms = new Map();

// Groupement exclusif des scénarios difficiles (petits clubs commando maintien)
// 43 petits clubs répartis sur 10 championnats différents
const DIFFICULT_SCENARIOS = SCENARIOS.filter(s => s.difficulty === 'difficile');
const LEAGUES_MAP = {};
DIFFICULT_SCENARIOS.forEach(s => {
  const c = s.country;
  if (!LEAGUES_MAP[c]) LEAGUES_MAP[c] = [];
  LEAGUES_MAP[c].push(s);
});

const LEAGUE_KEYS = Object.keys(LEAGUES_MAP).filter(k => LEAGUES_MAP[k].length >= 2);

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Tirage au sort d'une ligue et de 2 petits clubs rivaux pour le commando maintien
function selectRivalClubDuo() {
  const shuffledLeagues = [...LEAGUE_KEYS];
  for (let i = shuffledLeagues.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledLeagues[i], shuffledLeagues[j]] = [shuffledLeagues[j], shuffledLeagues[i]];
  }
  const leagueKey = shuffledLeagues[0];

  const pool = [...LEAGUES_MAP[leagueKey]];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  // Clonage profond des deux petits clubs
  const clubA = JSON.parse(JSON.stringify(pool[0]));
  const clubB = JSON.parse(JSON.stringify(pool[1]));

  // Budget de départ tiré aléatoirement entre 7.0 M€ et 11.0 M€ (précision 0.1 M€)
  // STRICTEMENT IDENTIQUE pour les deux joueurs (Équité 1v1 compétitive)
  const commonBudget = Math.round((7.0 + Math.random() * 4.0) * 10) / 10;
  clubA.budget = commonBudget;
  clubB.budget = commonBudget;

  return {
    league: leagueKey,
    rivalryName: `⚔️ COMMANDO MAINTIEN`,
    rivalryTag: `Duel d'outsiders • Mission survie dans l'élite`,
    tier: 'maintien',
    clubA,
    clubB
  };
}

// Génération du marché partagé (combine les besoins des 2 clubs)
function generateSharedMarket(scenarioA, scenarioB) {
  // On génère avec le budget du club et le scénario associé (bon ordre des paramètres)
  const marketA = generateProceduralMarket(scenarioA.budget, scenarioA);
  const marketB = generateProceduralMarket(scenarioB.budget, scenarioB);

  const combined = [...marketA];
  const seenIds = new Set(marketA.map(p => p.id));
  const seenNames = new Set(marketA.map(p => p.name));

  marketB.forEach(p => {
    if (!seenIds.has(p.id) && !seenNames.has(p.name)) {
      combined.push(p);
      seenIds.add(p.id);
      seenNames.add(p.name);
    }
  });

  // Mélange du marché pour ne pas grouper par club
  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }

  return combined;
}

// Simulation réaliste d'un match direct entre les deux joueurs
function simulateDirectMatch(p1, p2, matchLabel, matchday) {
  // Calcul de la puissance d'équipe basée sur le recrutement, les archétypes et la psychologie
  const calcPower = (p) => {
    let power = 50;
    (p.signedPlayers || []).forEach(pl => {
      const tier = pl.caliberTier || 'SOLID';
      if (tier === 'TOP_TARGET') power += 7;
      else if (tier === 'SOLID') power += 4;
      else if (tier === 'MID_ROTATION') power += 2;
      else if (tier === 'CHEAP_WRONG') power -= 2;

      // Bonus/Malus d'Archétype dans un choc direct
      if (pl.archetype) {
        const attCodes = ['RENARD_SURF', 'PIVOT_CIBLE', 'INFILTREUR_VITESSE', 'DRIBBLEUR_ISOLATION', 'MENEUR_AVANCE', 'CREATEUR_ESPACE'];
        const defCodes = ['STOPPEUR_BRUTAL', 'LIBERO_RELANCEUR', 'CADENAS_DEFENSIF', 'SENTINELLE_GARDIENNE', 'MUR_INFRANCHISSABLE', 'GARDIEN_BALAYEUR'];
        if (attCodes.includes(pl.archetype.code)) power += 2;
        if (defCodes.includes(pl.archetype.code)) power += 2;
      }

      // Bonus/Malus Psychologique
      if (pl.psychology) {
        if (pl.psychology.code === 'LEADER_EXEMPLAIRE') power += 3;
        if (pl.psychology.code === 'SOLDAT_COLLECTIF') power += 2;
        if (pl.psychology.code === 'GENIE_TOXIQUE' && Math.random() < 0.35) power -= 2;
      }
    });
    return power;
  };

  const power1 = calcPower(p1) + 3; // Avantage terrain domicile
  const power2 = calcPower(p2);

  const diff = (power1 - power2) / 30;
  let goals1 = Math.max(0, Math.round(1.4 + diff + (Math.random() * 2 - 1)));
  let goals2 = Math.max(0, Math.round(1.3 - diff + (Math.random() * 2 - 1)));

  // Buteurs potentiels (favorise les recrues signées !)
  const getScorers = (p, count) => {
    const scorers = [];
    const candidates = [];
    (p.signedPlayers || []).forEach(pl => {
      const label = pl.archetype ? `${pl.name} (${pl.archetype.name})` : pl.name;
      if (['ATT', 'MIL'].includes(pl.pos)) {
        candidates.push(label);
        candidates.push(label); // Double poids pour les recrues offensives
      } else {
        candidates.push(label);
      }
    });
    candidates.push('Buteur maison');
    candidates.push('Capitaine');
    candidates.push('Ailier');

    for (let i = 0; i < count; i++) {
      const minute = 8 + Math.floor(Math.random() * 82);
      const name = candidates[Math.floor(Math.random() * candidates.length)];
      scorers.push({ minute, player: name, team: p.club.club });
    }
    return scorers;
  };

  const scorers1 = getScorers(p1, goals1);
  const scorers2 = getScorers(p2, goals2);
  const allEvents = [
    ...scorers1.map(s => ({ ...s, type: 'goal', isP1: true })),
    ...scorers2.map(s => ({ ...s, type: 'goal', isP1: false }))
  ];

  // Ajout d'actions chaudes ou cartons en fonction des profils psychologiques
  const actionMinutes = [18, 42, 61, 77, 86];
  actionMinutes.forEach(m => {
    if (!allEvents.some(e => Math.abs(e.minute - m) <= 3)) {
      const isP1 = Math.random() > 0.5;
      const targetTeam = isP1 ? p1 : p2;
      const tbrRecruit = (targetTeam.signedPlayers || []).find(pl => pl.psychology && pl.psychology.code === 'TETE_BRULEE');
      
      let type = Math.random() > 0.4 ? 'save' : 'card';
      let actor = targetTeam.club.club;
      if (type === 'card' && tbrRecruit) {
        actor = `${tbrRecruit.name} (${tbrRecruit.psychology.label})`;
      }

      allEvents.push({
        minute: m,
        type: type,
        player: actor,
        team: targetTeam.club.club,
        isP1: isP1
      });
    }
  });

  allEvents.sort((a, b) => a.minute - b.minute);

  return {
    matchday,
    label: matchLabel,
    homeClub: p1.club.club,
    awayClub: p2.club.club,
    score1: goals1,
    score2: goals2,
    events: allEvents,
    winner: goals1 > goals2 ? p1.name : (goals2 > goals1 ? p2.name : 'Nul')
  };
}

// Catalogues des Dilemmes Sanguins d'Avant-Derby (Guerre Psychologique & Ultras)
const HOME_DERBY_DILEMMAS = [
  {
    id: 'banderole_affaires',
    title: '🏴 Banderole Hostile des Ultras',
    question: "Les Ultras ont peint une bâche géante sur les affaires financières troubles du président adverse. On l'affiche en tribune présidentielle ?",
    successText: "La banderole fait un vacarme fou ! L'adversaire est totalement déstabilisé et perd ses moyens.",
    failText: "Le délégué de la ligue intervient : amende record et sanctions disciplinaires !",
    successOdds: 0.65,
    powerBonus: 4,
    powerMalus: -1,
    ptsSanctionOnFail: 1
  },
  {
    id: 'tifo_fumigenes',
    title: '🔥 Tifo Pyrotechnique Interdit (200 Fumigènes)',
    question: "Les virages veulent allumer 200 fumigènes au coup d'envoi pour enfumer le gardien rival. Vous fermez les yeux ?",
    successText: "Ambiance volcanique irrespirable : Le gardien adverse commet une boulette sous la fumée !",
    failText: "Le délégué interrompt le match 15 minutes, l'équipe perd sa concentration et encaisse un but.",
    successOdds: 0.65,
    powerBonus: 4,
    powerMalus: -2,
    ptsSanctionOnFail: 0
  },
  {
    id: 'chants_personnels',
    title: '📢 Chants Ciblés sur la Star Adverse',
    question: "Les supporters ont préparé un refrain provocateur sur la vie privée de l'attaquant star rival. Vous autorisez les mégaphones ?",
    successText: "Le buteur adverse pète les plombs, prend un carton d'entrée et sort totalement de son match !",
    failText: "Piqué au vif par les insultes, l'attaquant rival est en fusion et marque un but vengeur !",
    successOdds: 0.60,
    powerBonus: 5,
    powerMalus: -3,
    ptsSanctionOnFail: 0
  },
  {
    id: 'accueil_car',
    title: '🚌 Accueil Électrique du Bus Visiteur',
    question: "Les supporters veulent encercler le bus adverse avec fumigènes et tambours pour les faire trembler dès la descente.",
    successText: "Les joueurs adverses descendent livides et terrorisés, ils n'ont pas les jambes au coup d'envoi !",
    failText: "Les forces de l'ordre interviennent, l'ambiance devient toxique et crispe nos propres joueurs.",
    successOdds: 0.65,
    powerBonus: 4,
    powerMalus: -2,
    ptsSanctionOnFail: 0
  },
  {
    id: 'champ_de_patates',
    title: '🌱 Pelouse Sabotée / Champ de Patates',
    question: "Le jardinier propose de couper l'arrosage et laisser l'herbe haute pour paralyser le jeu de passes courtes des rivaux.",
    successText: "Leurs combinaisons échouent lamentablement dans les mottes de terre !",
    failText: "Notre propre milieu se prend les pieds dans le gazon et donne un contre létal.",
    successOdds: 0.60,
    powerBonus: 4,
    powerMalus: -2,
    ptsSanctionOnFail: 0
  }
];

const AWAY_DERBY_DILEMMAS = [
  {
    id: 'conf_toxique',
    title: '🎙️ Attaque Frontale en Conférence de Presse',
    question: "Vous accusez publiquement les arbitres d'avoir 'peur de siffler contre le club recevant' pour leur mettre la pression médiatique.",
    successText: "L'arbitre, sous pression des caméras, refuse de favoriser l'équipe à domicile !",
    failText: "La déclaration galvanise le stade entier, le public pousse son équipe comme un seul homme !",
    successOdds: 0.65,
    powerBonus: 4,
    powerMalus: -2,
    ptsSanctionOnFail: 0
  },
  {
    id: 'taupe_staff',
    title: '🕵️ Achat de la Feuille Tactique Secrète',
    question: "Un stadier adverse propose de vous vendre sur clé USB les combinaisons secrètes sur corner de leur coach pour 10 000 €.",
    successText: "Vous lisez dans leur jeu comme dans un livre ouvert ! Leurs attaques sont anticipées.",
    failText: "L'affaire fuite sur Twitter ! Scandale d'espionnage et retrait d'1 point sur tapis vert !",
    successOdds: 0.65,
    powerBonus: 5,
    powerMalus: -1,
    ptsSanctionOnFail: 1
  },
  {
    id: 'prime_noire',
    title: '💼 Valise / Double Prime de Match au Black',
    question: "Vous promettez une double prime de match en liquide de votre poche aux joueurs s'ils triomphent chez le rival.",
    successText: "Vos joueurs se dépouillent sur chaque tacle, une combativité héroïque !",
    failText: "La pression de l'argent tétanise le groupe, les passes sont crispées et sans âme.",
    successOdds: 0.65,
    powerBonus: 4,
    powerMalus: -2,
    ptsSanctionOnFail: 0
  },
  {
    id: 'vestiaire_glace',
    title: '🚿 Réclamation pour Vestiaire Glacé',
    question: "Vous déposez une réclamation officielle pour 'eau glacée et vestiaire insalubre' afin de retarder le coup d'envoi de 20 minutes.",
    successText: "L'équipe adverse s'est refroidie pendant l'attente et rate son début de match !",
    failText: "Le délégué rejette la plainte et inflige un avertissement formel pour obstruction.",
    successOdds: 0.60,
    powerBonus: 4,
    powerMalus: -1,
    ptsSanctionOnFail: 0
  }
];

// Autopsie du Duel : Analyse décisionnelle expliquant pourquoi un manager a triomphé et l'autre a échoué
function generateDuelAnalysis(p1, p2, pts1, pts2, rank1, rank2, h2hMatches, dncgData, duelWinner) {
  const isDraw = duelWinner === 'Égalité' || duelWinner === 'Nul';
  const isP1Winner = duelWinner === p1.name;
  
  const winner = isP1Winner ? p1 : p2;
  const loser = isP1Winner ? p2 : p1;
  const winnerPts = isP1Winner ? pts1 : pts2;
  const loserPts = isP1Winner ? pts2 : pts1;
  const winnerRank = isP1Winner ? rank1 : rank2;
  const loserRank = isP1Winner ? rank2 : rank1;
  const winnerDncg = dncgData ? (isP1Winner ? dncgData.p1 : dncgData.p2) : null;
  const loserDncg = dncgData ? (isP1Winner ? dncgData.p2 : dncgData.p1) : null;

  const points = [];

  if (isDraw) {
    points.push({
      icon: '🤝',
      title: 'Duel au cordeau',
      desc: `Les deux managers terminent avec exactement ${pts1} points. Une résistance héroïque de part et d'autre où chaque recrue a pesé pour arracher le maintien ensemble.`
    });
    return {
      points,
      punchline: `Aucun vainqueur, mais deux clubs qui ont fait preuve d'un courage exemplaire pour sauver leur peau dans l'élite !`
    };
  }

  // 1. Facteur Mercato & Recrues clés
  const winnerSignings = winner.signedPlayers || [];
  const loserSignings = loser.signedPlayers || [];

  const topTarget = winnerSignings.find(p => p.caliberTier === 'TOP_TARGET');
  const flopSigning = loserSignings.find(p => p.caliberTier === 'CHEAP_WRONG' || (p.traits && p.traits.includes('Genou en cristal')));

  if (topTarget) {
    points.push({
      icon: '🎯',
      title: `Le flair au Mercato (${winner.name})`,
      desc: `La signature de ${topTarget.name} (${topTarget.caliberLabel || 'Cadre Prioritaire'}${topTarget.archetype ? ' • ' + topTarget.archetype.name : ''}) a tout changé : il a stabilisé ${winner.club.club} et apporté le surplus de points indispensable pour la survie.`
    });
  } else if (winnerSignings.length > loserSignings.length) {
    points.push({
      icon: '🛒',
      title: `Banc plus fourni (${winner.name})`,
      desc: `${winner.name} a signé ${winnerSignings.length} renfort(s) contre seulement ${loserSignings.length} pour ${loser.name}, offrant plus de profondeur dans les moments décisifs de la saison.`
    });
  } else {
    points.push({
      icon: '🛡️',
      title: `Solidité collective (${winner.name})`,
      desc: `L'alchimie tactique de ${winner.club.club} a compensé le manque de gros noms grâce à une discipline de fer dans les duels.`
    });
  }

  // 1b. Archétypes & Synergies Tactiques
  const fitPlayer = winnerSignings.find(p => p.isArchetypeFit);
  if (fitPlayer && fitPlayer.archetype) {
    points.push({
      icon: '♟️',
      title: `Synergie d'archétype (${winner.name})`,
      desc: `Le choix de ${fitPlayer.name} (${fitPlayer.archetype.name}) a sublimé le projet de jeu : son atout majeur '${fitPlayer.archetype.strength}' a rapporté des points cruciaux.`
    });
  }

  const misfitPlayer = loserSignings.find(p => p.isArchetypeMisfit);
  if (misfitPlayer && misfitPlayer.archetype) {
    points.push({
      icon: '🧩',
      title: `Dissonance tactique fatale (${loser.name})`,
      desc: `Le profil de ${misfitPlayer.name} (${misfitPlayer.archetype.name}) a exposé le club à sa faille congénitale : '${misfitPlayer.archetype.sacrifice}' (-3 pts de pénalité).`
    });
  }

  // 1c. Facteur Psychologique & Vestiaire
  const psychProblem = loserSignings.find(p => p.hasPsychProblem);
  if (psychProblem && psychProblem.psychology) {
    points.push({
      icon: '🧠',
      title: `Fracture psychologique (${loser.name})`,
      desc: `${psychProblem.name} (${psychProblem.psychology.label}) : ${psychProblem.hasPsychProblem}. Le vestiaire a vacillé au plus mauvais moment.`
    });
  }

  const leaderPlayer = winnerSignings.find(p => p.psychology && ['LEADER_EXEMPLAIRE', 'SOLDAT_COLLECTIF'].includes(p.psychology.code));
  if (leaderPlayer && leaderPlayer.psychology) {
    points.push({
      icon: '👑',
      title: `Force mentale & Vestiaire (${winner.name})`,
      desc: `L'abnégation de ${leaderPlayer.name} (${leaderPlayer.psychology.label}) a maintenu le groupe sous pression positive pour sauver la place du club.`
    });
  }

  // Flop ou lacune du perdant
  if (flopSigning) {
    if (flopSigning.traits && flopSigning.traits.includes('Genou en cristal')) {
      points.push({
        icon: '🩹',
        title: `La roulette médicale (${loser.name})`,
        desc: `Le pari risqué sur ${flopSigning.name} ('Genou en cristal') a coûté 4 points après une rechute physique à l'entraînement, un coup dur fatal pour le maintien.`
      });
    } else {
      points.push({
        icon: '📉',
        title: `Erreur de casting (${loser.name})`,
        desc: `Le recrutement au rabais de ${flopSigning.name} a désorganisé le collectif de ${loser.club.club} (-3 pts de pénalité de vestiaire).`
      });
    }
  } else if (loserSignings.length === 0) {
    points.push({
      icon: '⚠️',
      title: `Mercato blanc (${loser.name})`,
      desc: `Zéro recrue signée avant la deadline ! Jouer le maintien avec un effectif essoufflé et sans sang neuf s'est révélé insurmontable.`
    });
  }

  // 2. Chocs Directs (H2H)
  const h1 = h2hMatches[0];
  const h2 = h2hMatches[1];
  let winnerH2HPts = 0;
  let loserH2HPts = 0;

  // H1 : p1 home, p2 away
  if (h1.score1 > h1.score2) {
    if (isP1Winner) winnerH2HPts += 3; else loserH2HPts += 3;
  } else if (h1.score1 < h1.score2) {
    if (isP1Winner) loserH2HPts += 3; else winnerH2HPts += 3;
  } else {
    winnerH2HPts += 1; loserH2HPts += 1;
  }

  // H2 : p2 home, p1 away
  if (h2.score1 > h2.score2) {
    if (isP1Winner) loserH2HPts += 3; else winnerH2HPts += 3;
  } else if (h2.score1 < h2.score2) {
    if (isP1Winner) winnerH2HPts += 3; else loserH2HPts += 3;
  } else {
    winnerH2HPts += 1; loserH2HPts += 1;
  }

  if (winnerH2HPts > loserH2HPts) {
    points.push({
      icon: '⚔️',
      title: `Ascendant direct (${winnerH2HPts} pts pris sur 6)`,
      desc: `${winner.name} a pris le dessus lors des confrontations directes entre les deux managers, privant son rival de points charnières dans la course au maintien.`
    });
  } else if (winnerH2HPts === loserH2HPts) {
    points.push({
      icon: '⚖️',
      title: `Confrontations directes neutralisées`,
      desc: `Égalité parfaite sur les deux matchs directs. Le salut de ${winner.name} s'est joué sur sa régularité face aux autres équipes du championnat.`
    });
  } else {
    points.push({
      icon: '⚡',
      title: `Résilience face au rival`,
      desc: `Même si ${loser.name} a pris des points dans le derby, ${winner.name} a su compenser en réalisant des exploits face aux cadors de la division.`
    });
  }

  // 3. Impact DNCG
  if (loserDncg && loserDncg.status === 'penalty') {
    points.push({
      icon: '📉',
      title: `Sanction DNCG fatale (${loser.name})`,
      desc: `Le retrait de ${loserDncg.ptsLost} points infligé par la DNCG pour irrégularités financières a lourdement pénalisé ${loser.club.club} au pire moment.`
    });
  } else if (loserDncg && loserDncg.status === 'relegation') {
    points.push({
      icon: '🚨',
      title: `Relégation administrative immédiate`,
      desc: `Exclusion d'office par la DNCG pour ${loser.club.club} suite à une falsification de bilans comptables. Victoire sur tapis vert pour ${winner.name} !`
    });
  } else if (dncgData) {
    points.push({
      icon: '🟢',
      title: `Finances saines`,
      desc: `Les deux clubs ont passé l'audit financier sans pénalité, tout s'est réglé sportivement sur la pelouse.`
    });
  }

  // Punchline finale
  const diff = Math.abs(winnerPts - loserPts);
  let punchline = '';
  if (diff <= 2) {
    punchline = `Un dénouement irrespirable à un souffle près ! ${winner.name} a fait preuve d'un sang-froid chirurgical dans le money time, tandis que ${loser.name} regrettera longtemps ses opportunités manquées au mercato.`;
  } else if (diff <= 6) {
    punchline = `${winner.name} valide sa mission commando avec méthode et pragmatisme. Pour ${loser.name}, le manque de renforts ciblés se paie cash dans l'élite.`;
  } else {
    punchline = `Victoire nette et sans bavure pour ${winner.name} qui a dominé tous les compartiments du duel. Pour ${loser.name}, la descente aux enfers a commencé dès la fin du mercato.`;
  }

  return { points, punchline };
}

// Simulation globale des 38 journées pour le duel
function simulateFullDuelSeason(room) {
  const p1 = room.players[0];
  const p2 = room.players[1];

  // Matchs directs avec dates aléatoires et cohérence Aller-Retour (exactement 19 journées d'écart)
  const matchdayAller = Math.floor(Math.random() * (16 - 7 + 1)) + 7; // Entre J7 et J16
  const matchdayRetour = matchdayAller + 19; // Entre J26 et J35

  // Attribution des dilemmes d'avant-derby
  const dilemmaAllerHome = { ...HOME_DERBY_DILEMMAS[Math.floor(Math.random() * HOME_DERBY_DILEMMAS.length)] };
  const dilemmaAllerAway = { ...AWAY_DERBY_DILEMMAS[Math.floor(Math.random() * AWAY_DERBY_DILEMMAS.length)] };
  const dilemmaRetourHome = { ...HOME_DERBY_DILEMMAS[Math.floor(Math.random() * HOME_DERBY_DILEMMAS.length)] };
  const dilemmaRetourAway = { ...AWAY_DERBY_DILEMMAS[Math.floor(Math.random() * AWAY_DERBY_DILEMMAS.length)] };

  const h2hMatch1 = simulateDirectMatch(p1, p2, 'Match Aller', matchdayAller);
  h2hMatch1.dilemmaHome = dilemmaAllerHome;
  h2hMatch1.dilemmaAway = dilemmaAllerAway;

  const h2hMatch2 = simulateDirectMatch(p2, p1, 'Match Retour', matchdayRetour);
  h2hMatch2.dilemmaHome = dilemmaRetourHome;
  h2hMatch2.dilemmaAway = dilemmaRetourAway;

  // Points de base calibrés pour le duel (Commando Maintien)
  let basePoints = 30;
  let minPts = 16;
  let maxPts = 50;

  const duelTier = room.tier || 'maintien';
  if (duelTier === 'titre') {
    basePoints = 71;
    minPts = 58;
    maxPts = 94;
  } else if (duelTier === 'europe') {
    basePoints = 48;
    minPts = 36;
    maxPts = 74;
  }

  let pts1 = basePoints;
  let pts2 = basePoints;

  // Impact réaliste des recrues signées, de la compatibilité d'archétypes et de la psychologie
  const calcSeasonBonus = (p) => {
    let pts = 0;
    const coachPhilo = (p.club.tacticalPhilosophy || '').toLowerCase();

    (p.signedPlayers || []).forEach(pl => {
      const tier = pl.caliberTier || 'SOLID';
      if (tier === 'TOP_TARGET') pts += 4;
      else if (tier === 'SOLID') pts += 2;
      else if (tier === 'MID_ROTATION') pts += 1;
      else if (tier === 'CHEAP_WRONG') pts -= 3;

      // Trait classique Genou en cristal
      if (pl.traits && pl.traits.includes('Genou en cristal') && Math.random() < 0.40) {
        pts -= 4;
      }

      // Synergie ou dissonance d'archétype avec la philosophie du club
      if (pl.archetype) {
        if (checkPhilosophyMatch(pl.archetype.preferredPhilosophy, coachPhilo)) {
          pts += 2;
          pl.isArchetypeFit = true;
        } else if (checkPhilosophyMatch(pl.archetype.misfitPhilosophy, coachPhilo)) {
          pts -= 3;
          pl.isArchetypeMisfit = true;
        }
      }

      // Profils psychologiques
      if (pl.psychology) {
        const code = pl.psychology.code;
        if (code === 'GENIE_TOXIQUE' && Math.random() < 0.28) {
          pts -= 3;
          pl.hasPsychProblem = 'Clash et crise d\'ego dans le vestiaire';
        } else if (code === 'PARI_MEDICAL' && Math.random() < 0.35) {
          pts -= 4;
          pl.hasPsychProblem = 'Rechute musculaire après 8 matchs disputés';
        } else if (code === 'TETE_BRULEE' && Math.random() < 0.30) {
          pts -= 2;
          pl.hasPsychProblem = 'Expulsions évitables et suspensions';
        } else if (code === 'LEADER_EXEMPLAIRE') {
          pts += 1;
        } else if (code === 'SOLDAT_COLLECTIF') {
          pts += 1;
        } else if (code === 'MERCENAIRE_FROID' && Math.random() < 0.25) {
          pts -= 2;
          pl.hasPsychProblem = 'Démotivation dans les moments difficiles';
        }
      }
    });

    // Pénalité pour besoins prioritaires du club non satisfaits
    const needed = p.club.needs || [];
    needed.forEach(n => {
      const match = (p.signedPlayers || []).some(sp => (sp.subPos === n.subPos || sp.pos === n.pos));
      if (!match) {
        pts -= 4; // Poste manquant pénalisé
      }
    });

    return pts;
  };

  pts1 += calcSeasonBonus(p1);
  pts2 += calcSeasonBonus(p2);

  // Intégration des points des chocs directs
  if (h2hMatch1.score1 > h2hMatch1.score2) pts1 += 3;
  else if (h2hMatch1.score1 < h2hMatch1.score2) pts2 += 3;
  else { pts1 += 1; pts2 += 1; }

  // Au retour : p2 reçoit p1
  if (h2hMatch2.score1 > h2hMatch2.score2) pts2 += 3;
  else if (h2hMatch2.score1 < h2hMatch2.score2) pts1 += 3;
  else { pts1 += 1; pts2 += 1; }

  // Aléa réaliste de saison
  pts1 += Math.floor(Math.random() * 5 - 2);
  pts2 += Math.floor(Math.random() * 5 - 2);

  // AUDIT DNCG À J22 : seulement 30% de chance qu'une commission d'audit surprise soit convoquée cette saison !
  const hasDNCGAudit = Math.random() < 0.30;
  let dncgData = null;
  let dncg1 = null;
  let dncg2 = null;

  if (hasDNCGAudit) {
    const rollDNCG = (player) => {
      const r = Math.random();
      if (r < 0.04) {
        // 4% crash relégation (Game Over immédiat)
        return {
          status: 'relegation',
          badge: '🚨 RELÉGATION IMMÉDIATE',
          badgeClass: 'bg-rose-950/80 text-rose-300 border border-rose-500 font-extrabold',
          ptsLost: 0,
          isGameOver: true,
          summary: `Faux bilans comptables et trésorerie fictive : Le club de ${player.name} est exclu administrativement sur-le-champ !`
        };
      } else if (r < 0.35) {
        // 31% retrait de points
        const ptsLost = Math.floor(Math.random() * 3) + 2; // -2, -3 ou -4 pts
        const reasons = [
          `Dépassement flagrant de la masse salariale autorisée et commissions suspectes (-${ptsLost} pts).`,
          `Déficit structurel supérieur aux prévisions après audit de mi-saison (-${ptsLost} pts).`,
          `Opacité sur les primes de signature et garanties bancaires insuffisantes (-${ptsLost} pts).`
        ];
        return {
          status: 'penalty',
          badge: `⚠️ -${ptsLost} POINTS (DNCG)`,
          badgeClass: 'bg-amber-950/80 text-amber-300 border border-amber-500 font-extrabold',
          ptsLost: ptsLost,
          isGameOver: false,
          summary: reasons[Math.floor(Math.random() * reasons.length)]
        };
      } else {
        // 65% clean
        const reasons = [
          `Comptes certifiés sincères et équilibrés. Feu vert sans réserve accordé par la commission.`,
          `Audit impeccable : Gestion financière saine et respect scrupuleux de la masse salariale.`
        ];
        return {
          status: 'clean',
          badge: '🟢 COMPTES VALIDÉS (CLEAN)',
          badgeClass: 'bg-emerald-950/80 text-emerald-300 border border-emerald-500 font-extrabold',
          ptsLost: 0,
          isGameOver: false,
          summary: reasons[Math.floor(Math.random() * reasons.length)]
        };
      }
    };

    dncg1 = rollDNCG(p1);
    dncg2 = rollDNCG(p2);

    // Application des retraits de points DNCG
    pts1 = Math.max(10, pts1 - dncg1.ptsLost);
    pts2 = Math.max(10, pts2 - dncg2.ptsLost);

    dncgData = {
      matchday: 22,
      p1: { name: p1.name, club: p1.club.club, logo: p1.club.logo, ...dncg1 },
      p2: { name: p2.name, club: p2.club.club, logo: p2.club.logo, ...dncg2 }
    };
  }

  // Borner selon le standing du duel (Titre, Europe ou Maintien)
  pts1 = Math.max(minPts, Math.min(maxPts, pts1));
  pts2 = Math.max(minPts, Math.min(maxPts, pts2));

  // Rangs dans la ligue
  // Simulation de 18 rivaux
  const rivalsPoints = [];
  for (let i = 0; i < 18; i++) {
    const rPts = Math.round(84 - (i * 3.3) + (Math.random() * 4 - 2));
    rivalsPoints.push(Math.max(18, Math.min(95, rPts)));
  }

  const allScores = [
    { isP1: true, name: p1.name, club: p1.club.club, pts: pts1 },
    { isP2: true, name: p2.name, club: p2.club.club, pts: pts2 },
    ...rivalsPoints.map((pts, i) => ({ isRival: true, name: `Rival ${i + 1}`, pts }))
  ];

  allScores.sort((a, b) => b.pts - a.pts);

  const rank1 = allScores.findIndex(s => s.isP1) + 1;
  const rank2 = allScores.findIndex(s => s.isP2) + 1;

  let duelWinner = null;
  if (dncg1 && dncg1.isGameOver && (!dncg2 || !dncg2.isGameOver)) {
    duelWinner = p2.name; // Victoire par forfait administratif de P2
  } else if (dncg2 && dncg2.isGameOver && (!dncg1 || !dncg1.isGameOver)) {
    duelWinner = p1.name;
  } else if (rank1 < rank2) {
    duelWinner = p1.name;
  } else if (rank2 < rank1) {
    duelWinner = p2.name;
  } else {
    duelWinner = pts1 > pts2 ? p1.name : (pts2 > pts1 ? p2.name : 'Égalité');
  }

  const analysis = generateDuelAnalysis(p1, p2, pts1, pts2, rank1, rank2, [h2hMatch1, h2hMatch2], dncgData, duelWinner);

  return {
    h2hMatches: [h2hMatch1, h2hMatch2],
    dncg: dncgData,
    p1Result: { name: p1.name, club: p1.club.club, points: pts1, rank: rank1, logo: p1.club.logo, dncg: dncg1 },
    p2Result: { name: p2.name, club: p2.club.club, points: pts2, rank: rank2, logo: p2.club.logo, dncg: dncg2 },
    duelWinner,
    analysis
  };
}

// ==============================================================
// GESTION DES ÉVÉNEMENTS WEBSOCKET (SOCKET.IO)
// ==============================================================

io.on('connection', (socket) => {
  let currentRoomCode = null;

  // Création d'un salon 1v1
  socket.on('createDuelRoom', ({ nickname }) => {
    let code = generateRoomCode();
    while (duelRooms.has(code)) {
      code = generateRoomCode();
    }

    const room = {
      code,
      hostId: socket.id,
      state: 'lobby',
      league: null,
      players: [
        {
          id: socket.id,
          name: nickname || 'Manager 1',
          isReady: false,
          club: null,
          signedPlayers: [],
          remainingBudget: 0,
          doneMercato: false
        }
      ],
      market: [],
      lockedPlayers: {}, // playerId -> socketId
      timer: 180,
      timerInterval: null,
      rematchVotes: new Set(),
      simResult: null
    };

    duelRooms.set(code, room);
    currentRoomCode = code;
    socket.join(code);

    socket.emit('duelRoomCreated', {
      code,
      playerIndex: 0,
      player: room.players[0]
    });
  });

  // Rejoindre un salon existant
  socket.on('joinDuelRoom', ({ code, nickname }) => {
    const formattedCode = (code || '').trim().toUpperCase();
    if (!duelRooms.has(formattedCode)) {
      socket.emit('duelError', { message: 'Code de salon invalide ou inexistant !' });
      return;
    }

    const room = duelRooms.get(formattedCode);
    if (room.players.length >= 2) {
      socket.emit('duelError', { message: 'Ce salon est déjà complet (2/2) !' });
      return;
    }

    if (room.state !== 'lobby') {
      socket.emit('duelError', { message: 'La partie est déjà en cours dans ce salon !' });
      return;
    }

    const player2 = {
      id: socket.id,
      name: nickname || 'Manager 2',
      isReady: false,
      club: null,
      signedPlayers: [],
      remainingBudget: 0,
      doneMercato: false
    };

    room.players.push(player2);
    currentRoomCode = formattedCode;
    socket.join(formattedCode);

    // Tirage au sort de la ligue et des 2 clubs rivaux
    const duo = selectRivalClubDuo();
    room.league = duo.league;
    room.rivalryId = duo.rivalryId;
    room.rivalryName = duo.rivalryName;
    room.rivalryTag = duo.rivalryTag;
    room.tier = duo.tier;
    room.players[0].club = duo.clubA;
    room.players[0].remainingBudget = duo.clubA.budget;
    room.players[1].club = duo.clubB;
    room.players[1].remainingBudget = duo.clubB.budget;

    // Génération du marché partagé
    room.market = generateSharedMarket(duo.clubA, duo.clubB);

    // Notification aux deux joueurs
    io.to(formattedCode).emit('duelRoomReady', {
      code: formattedCode,
      league: room.league,
      rivalryName: room.rivalryName,
      rivalryTag: room.rivalryTag,
      tier: room.tier,
      players: room.players.map(p => ({
        id: p.id,
        name: p.name,
        isReady: p.isReady,
        club: p.club
      })),
      market: room.market
    });
  });

  // Relance d'un tirage aléatoire de duel dans le lobby
  socket.on('rerollDuelMatchup', () => {
    if (!currentRoomCode || !duelRooms.has(currentRoomCode)) return;
    const room = duelRooms.get(currentRoomCode);
    if (room.state === 'mercato' || room.state === 'simulating' || room.state === 'results') return;

    // Réinitialisation de l'état prêt des deux joueurs
    room.players.forEach(p => { p.isReady = false; });

    const duo = selectRivalClubDuo();
    room.league = duo.league;
    room.rivalryId = duo.rivalryId;
    room.rivalryName = duo.rivalryName;
    room.rivalryTag = duo.rivalryTag;
    room.tier = duo.tier;

    room.players[0].club = duo.clubA;
    room.players[0].remainingBudget = duo.clubA.budget;
    if (room.players[1]) {
      room.players[1].club = duo.clubB;
      room.players[1].remainingBudget = duo.clubB.budget;
    }

    room.market = generateSharedMarket(duo.clubA, duo.clubB);

    io.to(currentRoomCode).emit('duelRoomReady', {
      code: currentRoomCode,
      league: room.league,
      rivalryName: room.rivalryName,
      rivalryTag: room.rivalryTag,
      tier: room.tier,
      players: room.players.map(p => ({
        id: p.id,
        name: p.name,
        isReady: p.isReady,
        club: p.club
      })),
      market: room.market
    });
  });

  // Bascule de l'état "Prêt" dans le lobby
  socket.on('toggleDuelReady', () => {
    if (!currentRoomCode || !duelRooms.has(currentRoomCode)) return;
    const room = duelRooms.get(currentRoomCode);
    const p = room.players.find(x => x.id === socket.id);
    if (!p) return;

    p.isReady = !p.isReady;

    io.to(currentRoomCode).emit('duelPlayerReadyChanged', {
      playerId: socket.id,
      isReady: p.isReady
    });

    // Si les deux joueurs sont prêts : compte à rebours 3s puis départ
    if (room.players.length === 2 && room.players.every(x => x.isReady)) {
      room.state = 'countdown';
      let count = 3;
      io.to(currentRoomCode).emit('duelCountdownTick', { count });

      const countInterval = setInterval(() => {
        count--;
        if (count > 0) {
          io.to(currentRoomCode).emit('duelCountdownTick', { count });
        } else {
          clearInterval(countInterval);
          startRoomMercato(room);
        }
      }, 1000);
    }
  });

  function startRoomMercato(room) {
    room.state = 'mercato';
    room.timer = 180;

    io.to(room.code).emit('duelMercatoStarted', {
      timer: room.timer,
      market: room.market,
      players: room.players.map(p => ({
        id: p.id,
        name: p.name,
        club: p.club,
        remainingBudget: p.remainingBudget
      }))
    });

    // Chronomètre 180s synchronisé par le serveur
    if (room.timerInterval) clearInterval(room.timerInterval);
    room.timerInterval = setInterval(() => {
      room.timer--;
      io.to(room.code).emit('duelTimerTick', { timer: room.timer });

      if (room.timer <= 0) {
        clearInterval(room.timerInterval);
        room.timerInterval = null;
        finishMercatoAndSimulate(room);
      }
    }, 1000);
  }

  // Verrouillage d'un joueur en cours de négociation
  socket.on('lockPlayerNegotiation', ({ playerId }) => {
    if (!currentRoomCode || !duelRooms.has(currentRoomCode)) return;
    const room = duelRooms.get(currentRoomCode);
    const player = room.players.find(x => x.id === socket.id);
    if (!player) return;

    const target = room.market.find(p => p.id === playerId);
    if (!target) return;

    if (target.isSold) {
      socket.emit('playerLockFailed', {
        playerId,
        message: 'Ce joueur a déjà été transféré et signé !'
      });
      return;
    }

    if (room.lockedPlayers[playerId] && room.lockedPlayers[playerId] !== socket.id) {
      socket.emit('playerLockFailed', {
        playerId,
        message: 'Ce joueur est déjà en négociation avec votre adversaire !'
      });
      return;
    }

    room.lockedPlayers[playerId] = socket.id;

    // Avertir l'autre joueur
    socket.to(currentRoomCode).emit('playerLockedNotice', {
      playerId,
      lockerName: player.name,
      lockerId: socket.id
    });
  });

  // Déverrouillage d'un joueur (négociation annulée ou échec)
  socket.on('unlockPlayerNegotiation', ({ playerId }) => {
    if (!currentRoomCode || !duelRooms.has(currentRoomCode)) return;
    const room = duelRooms.get(currentRoomCode);

    if (room.lockedPlayers[playerId] === socket.id) {
      delete room.lockedPlayers[playerId];
      io.to(currentRoomCode).emit('playerUnlockedNotice', { playerId });
    }
  });

  // Joueur signé avec succès
  socket.on('playerSignedSuccess', ({ playerId, agreedPrice, playerObj }) => {
    if (!currentRoomCode || !duelRooms.has(currentRoomCode)) return;
    const room = duelRooms.get(currentRoomCode);
    const buyer = room.players.find(x => x.id === socket.id);
    if (!buyer) return;

    // Supprimer le verrou
    delete room.lockedPlayers[playerId];

    // Marquer le joueur comme vendu dans le marché de la room
    const target = room.market.find(p => p.id === playerId);
    if (target) {
      target.isSold = true;
      target.buyerName = buyer.name;
    }

    buyer.signedPlayers.push({
      ...playerObj,
      agreedPrice
    });
    buyer.remainingBudget = Math.max(0, buyer.remainingBudget - agreedPrice);

    // Diffuser à toute la salle que le joueur a été arraché !
    io.to(currentRoomCode).emit('playerSoldNotice', {
      playerId,
      buyerName: buyer.name,
      buyerId: socket.id,
      agreedPrice,
      buyerRemainingBudget: buyer.remainingBudget,
      buyerSignedCount: buyer.signedPlayers.length
    });
  });

  // Un joueur clique sur "Mercato Bouclé"
  socket.on('playerDoneMercato', () => {
    if (!currentRoomCode || !duelRooms.has(currentRoomCode)) return;
    const room = duelRooms.get(currentRoomCode);
    const p = room.players.find(x => x.id === socket.id);
    if (!p) return;

    p.doneMercato = true;
    io.to(currentRoomCode).emit('playerDoneNotice', {
      playerId: socket.id,
      playerName: p.name
    });

    // Si les deux joueurs ont bouclé avant la fin des 3 minutes -> fin instantanée
    if (room.players.every(x => x.doneMercato)) {
      if (room.timerInterval) {
        clearInterval(room.timerInterval);
        room.timerInterval = null;
      }
      finishMercatoAndSimulate(room);
    }
  });

  function finishMercatoAndSimulate(room) {
    room.state = 'simulation';

    // Simulation complète avec confrontations directes Aller-Retour (journées aléatoires)
    const simResult = simulateFullDuelSeason(room);
    room.simResult = simResult;

    io.to(room.code).emit('startDuelSimulation', {
      simResult,
      p1: {
        name: room.players[0].name,
        club: room.players[0].club,
        signedPlayers: room.players[0].signedPlayers,
        remainingBudget: room.players[0].remainingBudget
      },
      p2: {
        name: room.players[1].name,
        club: room.players[1].club,
        signedPlayers: room.players[1].signedPlayers,
        remainingBudget: room.players[1].remainingBudget
      }
    });
  }

  // Proposition de Revanche
  socket.on('requestRematch', () => {
    if (!currentRoomCode || !duelRooms.has(currentRoomCode)) return;
    const room = duelRooms.get(currentRoomCode);
    const p = room.players.find(x => x.id === socket.id);
    if (!p) return;

    room.rematchVotes.add(socket.id);

    // Alerter l'adversaire
    socket.to(currentRoomCode).emit('rematchOffered', {
      proposerName: p.name
    });

    // Si les deux ont accepté : réinitialisation complète de la salle pour une nouvelle revanche !
    if (room.rematchVotes.size >= 2) {
      room.rematchVotes.clear();
      room.state = 'lobby';

      // Nouveau duo de clubs rivaux et nouveau marché
      const duo = selectRivalClubDuo();
      room.league = duo.league;
      room.rivalryId = duo.rivalryId;
      room.rivalryName = duo.rivalryName;
      room.rivalryTag = duo.rivalryTag;
      room.tier = duo.tier;
      room.players[0].club = duo.clubA;
      room.players[0].remainingBudget = duo.clubA.budget;
      room.players[0].signedPlayers = [];
      room.players[0].isReady = false;
      room.players[0].doneMercato = false;

      room.players[1].club = duo.clubB;
      room.players[1].remainingBudget = duo.clubB.budget;
      room.players[1].signedPlayers = [];
      room.players[1].isReady = false;
      room.players[1].doneMercato = false;

      room.market = generateSharedMarket(duo.clubA, duo.clubB);
      room.lockedPlayers = {};
      room.simResult = null;

      io.to(currentRoomCode).emit('duelRematchAccepted', {
        league: room.league,
        rivalryName: room.rivalryName,
        rivalryTag: room.rivalryTag,
        tier: room.tier,
        players: room.players.map(x => ({
          id: x.id,
          name: x.name,
          isReady: x.isReady,
          club: x.club
        })),
        market: room.market
      });
    }
  });

  // Déconnexion
  socket.on('disconnect', () => {
    if (currentRoomCode && duelRooms.has(currentRoomCode)) {
      const room = duelRooms.get(currentRoomCode);
      const departingPlayer = room.players.find(x => x.id === socket.id);

      socket.to(currentRoomCode).emit('opponentLeftRoom', {
        message: departingPlayer ? `${departingPlayer.name} a quitté le duel.` : "L'adversaire s'est déconnecté."
      });

      if (room.timerInterval) {
        clearInterval(room.timerInterval);
      }
      duelRooms.delete(currentRoomCode);
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`⚽ DEADLINE DAY PANIC - SERVEUR EN LIGNE PRÊT !`);
  console.log(`🔗 Accès Local : http://localhost:${PORT}`);
  console.log(`=================================================\n`);
});
