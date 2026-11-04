// ==============================================================
// DEADLINE DAY PANIC - CORE APPLICATION ENGINE v4.0
// Double besoin obligatoire • 1 seule chance de négociation par joueur
// ==============================================================

// ==============================================================
// GESTION UNIVERSELLE DES DRAPEAUX HD (PC WINDOWS & MOBILE)
// ==============================================================
function getCountryCodeFromEmoji(emoji) {
  if (!emoji || typeof emoji !== 'string') return null;
  if (emoji.includes('🏴󠁧󠁢󠁥󠁮󠁧󠁿')) return 'gb-eng';
  if (emoji.includes('🏴󠁧󠁢󠁳󠁣󠁴󠁿')) return 'gb-sct';
  if (emoji.includes('🏴󠁧󠁢󠁷󠁬󠁳󠁿')) return 'gb-wls';
  const chars = [...emoji];
  for (let i = 0; i < chars.length - 1; i++) {
    const c1 = chars[i].codePointAt(0);
    const c2 = chars[i + 1].codePointAt(0);
    if (c1 >= 0x1F1E6 && c1 <= 0x1F1FF && c2 >= 0x1F1E6 && c2 <= 0x1F1FF) {
      return (String.fromCharCode(c1 - 0x1F1E6 + 65) + String.fromCharCode(c2 - 0x1F1E6 + 65)).toLowerCase();
    }
  }
  return null;
}

function renderFlag(flagEmoji, alt = '', cls = '') {
  if (!flagEmoji) return '';
  const code = getCountryCodeFromEmoji(flagEmoji);
  if (!code) return flagEmoji;
  return `<img src="https://flagcdn.com/24x18/${code}.png" srcset="https://flagcdn.com/48x36/${code}.png 2x" width="18" height="13.5" alt="${alt || code}" title="${alt || code}" class="inline-block align-middle rounded-xs shadow-xs ${cls}" style="display:inline-block; vertical-align: -1px; margin-right: 3px;" loading="lazy" />`;
}

function formatWithFlags(str) {
  if (!str || typeof str !== 'string') return str || '';
  let res = str;
  if (res.includes('🏴󠁧󠁢󠁥󠁮󠁧󠁿')) res = res.replace(/🏴󠁧󠁢󠁥󠁮󠁧󠁿/g, renderFlag('🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Angleterre'));
  if (res.includes('🏴󠁧󠁢󠁳󠁣󠁴󠁿')) res = res.replace(/🏴󠁧󠁢󠁳󠁣󠁴󠁿/g, renderFlag('🏴󠁧󠁢󠁳󠁣󠁴󠁿', 'Écosse'));
  if (res.includes('🏴󠁧󠁢󠁷󠁬󠁳󠁿')) res = res.replace(/🏴󠁧󠁢󠁷󠁬󠁳󠁿/g, renderFlag('🏴󠁧󠁢󠁷󠁬󠁳󠁿', 'Pays de Galles'));
  return res.replace(/([\uD83C][\uDDE6-\uDDFF]){2}/g, match => renderFlag(match));
}

// --- SOUND EFFECTS (WEB AUDIO API) ---
const audio = {
  ctx: null,
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },
  play(type) {
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      if (type === 'sms_in') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, t);
        osc.frequency.setValueAtTime(880, t + 0.08);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.25);
      } else if (type === 'sms_out') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, t);
        osc.frequency.setValueAtTime(659.25, t + 0.06);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.2);
      } else if (type === 'deal_signed') {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, t + idx * 0.07);
          gain.gain.setValueAtTime(0.25, t + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.01, t + idx * 0.07 + 0.4);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t + idx * 0.07);
          osc.stop(t + idx * 0.07 + 0.4);
        });
      } else if (type === 'fail') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, t);
        osc.frequency.setValueAtTime(140, t + 0.15);
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.35);
      } else if (type === 'alert') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(700, t);
        osc.frequency.setValueAtTime(900, t + 0.1);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.25);
      }
    } catch (e) {}
  }
};

// --- TOAST NOTIFICATIONS (REMPLACE LES ALERTS DU NAVIGATEUR) ---
function showToast(message, type = 'success', duration = 2800) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const typeStyles = {
    success: 'bg-emerald-950/95 border-emerald-500/70 text-emerald-200 shadow-emerald-500/30',
    error: 'bg-rose-950/95 border-rose-500/70 text-rose-200 shadow-rose-500/30',
    info: 'bg-amber-950/95 border-amber-500/70 text-amber-200 shadow-amber-500/30'
  };
  const icon = type === 'success' ? '✅' : (type === 'error' ? '❌' : 'ℹ️');

  toast.className = `pointer-events-auto transform -translate-y-4 opacity-0 transition-all duration-300 border-2 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold backdrop-blur-md ${typeStyles[type] || typeStyles.info}`;
  toast.innerHTML = `
    <span class="text-base shrink-0">${icon}</span>
    <span class="flex-1 leading-tight">${message}</span>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('-translate-y-4', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  });

  setTimeout(() => {
    toast.classList.add('-translate-y-4', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 320);
  }, duration);
}

// --- CONFETTIS ANIMATION DANS LA MODALE DE NÉGOCIATION ---
function spawnNegoConfetti() {
  const overlay = document.getElementById('nego-success-overlay');
  if (!overlay) return;

  const colors = ['#10b981', '#34d399', '#f59e0b', '#fbbf24', '#38bdf8', '#c084fc'];
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 5 + Math.random() * 6;
    const startX = 50 + (Math.random() - 0.5) * 20;
    const endX = startX + (Math.random() - 0.5) * 80;
    const endY = 20 + Math.random() * 70;
    const rotate = Math.random() * 360;

    particle.style.cssText = `
      position: absolute;
      left: ${startX}%;
      top: 45%;
      width: ${size}px;
      height: ${size * (Math.random() > 0.5 ? 1 : 1.7)}px;
      background-color: ${color};
      border-radius: 2px;
      pointer-events: none;
      z-index: 40;
      opacity: 1;
      transform: translate(-50%, -50%) rotate(0deg);
      transition: all 0.9s cubic-bezier(0.25, 1, 0.5, 1);
    `;
    overlay.appendChild(particle);

    requestAnimationFrame(() => {
      particle.style.transform = `translate(${endX - startX}vw, ${endY - 45}vh) rotate(${rotate}deg)`;
      particle.style.opacity = '0';
    });

    setTimeout(() => {
      if (particle.parentNode) particle.parentNode.removeChild(particle);
    }, 1000);
  }
}

// --- APP STATE & LOCAL STORAGE ---
const STORAGE_KEY = 'deadline_day_panic_careers_v4';
const ACHIEVEMENTS_KEY = 'deadline_day_panic_achievements_v4';
const DISCOVERED_CRISES_KEY = 'deadline_day_panic_crises_v1';

const ACHIEVEMENTS_DEF = [
  {
    id: 'doc_temeraire',
    title: 'Docteur Téméraire',
    icon: '🩺',
    desc: 'Valider un objectif de saison avec un joueur ayant le trait "Genou en cristal".'
  },
  {
    id: 'mur_solitaire',
    title: 'Le Mur Solitaire',
    icon: '🛡️',
    desc: 'Valider le maintien ou l\'Europe en ayant recruté un seul joueur (Défenseur).'
  },
  {
    id: 'gong_minuit',
    title: 'Gong de Minuit',
    icon: '⏱️',
    desc: 'Signer une recrue dans les 45 dernières secondes du chrono réel.'
  },
  {
    id: 'as_bluff',
    title: 'As du Bluff',
    icon: '💰',
    desc: 'Réussir un coup de bluff face à un club vendeur agressif.'
  },
  {
    id: 'maitre_clauses',
    title: 'Maître des Clauses',
    icon: '🤝',
    desc: 'Signer un joueur en utilisant une clause de revente (20%) ou un bonus de fin de saison.'
  },
  {
    id: 'grand_chelem',
    title: 'Grand Chelem C1',
    icon: '🌟',
    desc: 'Obtenir 3 Étoiles (Note A+) lors d\'un scénario en mode Facile.'
  },
  {
    id: 'genie_debrouille',
    title: 'Génie de la Débrouille',
    icon: '⚡',
    desc: 'Valider un maintien en mode Difficile avec moins de 9.0 M€ de budget.'
  },
  {
    id: 'dompteur_nuit',
    title: 'Dompteur de Fauves',
    icon: '🍸',
    desc: 'Valider un objectif avec succès malgré la présence d\'un "Fêtard invétéré".'
  },
  {
    id: 'livre_noir',
    title: 'Le Livre Noir du Football',
    icon: '📖',
    desc: 'Vivre et percer le mystère des 10 scénarios de crise et drames de la simulation.'
  }
];

// ==============================================================
// BASE DE DONNÉES : LES 10 SCÉNARIOS DE CRISE & DRAMAS (SUSPENSE)
// ==============================================================
const CRISIS_SCENARIOS_DB = [
  {
    id: 'DNCG_PASSAGE',
    title: 'Passage devant la DNCG & Gendarme Financier',
    icon: '⚖️',
    difficulties: ['facile', 'moyen', 'difficile'],
    description: (club) => `La Commission de Contrôle des Clubs Professionnels a convoqué en urgence la direction de ${club}. Des anomalies comptables et un déficit structurel préoccupant menacent l'homologation de la saison.`,
    phases: [
      'Examen minutieux des bilans comptables et flux de trésorerie...',
      'Audition sous haute tension du Président et des commissaires aux comptes...',
      'Délibération secrète de la Commission de Contrôle...'
    ],
    failureRate: { facile: 0.25, moyen: 0.40, difficile: 0.65 },
    survivalVerdict: 'Feu vert accordé sous encadrement strict de la masse salariale ! Le club évite la rétrogradation in extremis et peut terminer sa saison.',
    fatalVerdict: 'Rétrogradation administrative immédiate prononcée ! Le déficit est jugé irrémédiable, la licence professionnelle est révoquée.',
    pressReport: 'Le couperet financier est tombé : la Commission a prononcé la rétrogradation administrative immédiate du club. Tous les contrats sont gelés, la saison est officiellement avortée.'
  },
  {
    id: 'FAILLITE_LIQUIDATION',
    title: 'Dépôt de Bilan & Liquidation Judiciaire',
    icon: '📉',
    difficulties: ['difficile'],
    description: (club) => `Coup de tonnerre au Tribunal de Commerce ! Les actionnaires de ${club} ont brutalement retiré leur soutien financier face à une dette abyssale impayée.`,
    phases: [
      'Gel conservatoire immédiat de tous les comptes bancaires du club...',
      'Audition expéditive devant les magistrats consulaires...',
      'Délibération finale du Tribunal de Commerce...'
    ],
    failureRate: { facile: 0, moyen: 0, difficile: 1.0 },
    survivalVerdict: 'Un repreneur surprise a déposé une offre de dernière seconde validée par le tribunal.',
    fatalVerdict: 'Liquidation judiciaire immédiate ordonnée avec cessation d\'activité ! Le club dépose le bilan et met la clé sous la porte.',
    pressReport: 'La fin d\'une institution : le tribunal a ordonné la liquidation judiciaire avec effet immédiat. Les bureaux sont fermés, les joueurs libérés, le club n\'existe plus au niveau professionnel.'
  },
  {
    id: 'PARIS_TRUQUES',
    title: 'Scandale des Paris & Matchs Truqués',
    icon: '🎰',
    difficulties: ['moyen', 'difficile'],
    description: (club) => `La brigade des jeux et Interpol ont fait irruption au centre d'entraînement de ${club}. Des flux massifs de paris suspects sur les matchs récents de l'équipe ont été interceptés.`,
    phases: [
      'Perquisition des casiers et saisie des téléphones du vestiaire...',
      'Garde à vue et interrogatoires sous tension des joueurs ciblés...',
      'Audition extraordinaire de la Commission d\'Éthique de la Ligue...'
    ],
    failureRate: { facile: 0.20, moyen: 0.40, difficile: 0.55 },
    survivalVerdict: 'Mise hors de cause de la direction sportive ! Deux suspects sont suspendus à titre conservatoire, la compétition peut reprendre avec un blâme.',
    fatalVerdict: 'Exclusion immédiate du championnat et radiation fédérale prononcées pour corruption sportive aggravée !',
    pressReport: 'Le football dans la tourmente : les preuves de corruption étant accablantes, la Ligue a exclu le club du championnat avec perte de tous ses droits sportifs.'
  },
  {
    id: 'INVASION_TERRAIN',
    title: 'Invasion de Terrain & Émeute au Stade',
    icon: '🔥',
    difficulties: ['facile', 'moyen', 'difficile'],
    description: (club) => `Scènes de chaos absolu en plein match : des supporters excédés ont brisé les grilles, envahi la pelouse et affronté les stadiers et les forces de l'ordre.`,
    phases: [
      'Évacuation du stade sous gaz lacrymogène et rapport des arbitres...',
      'Réunion de crise en préfecture avec les autorités de sécurité...',
      'Session disciplinaire d\'urgence de la Commission de Sécurité...'
    ],
    failureRate: { facile: 0.20, moyen: 0.35, difficile: 0.50 },
    survivalVerdict: 'Sanction sportive : fin de saison délocalisée à 400 km à huis clos strict, mais l\'équipe est autorisée à disputer ses matchs.',
    fatalVerdict: 'Suspension définitive de l\'agrément du stade et forclusion de la saison par arrêté préfectoral pour violences graves !',
    pressReport: 'Les débordements inadmissibles ont conduit la Préfecture et la Ligue à mettre fin prématurément à la saison du club. Le club est exclu pour atteinte majeure à l\'ordre public.'
  },
  {
    id: 'RACHAT_VAUTOUR',
    title: 'Rachat Hostile par un Fonds Vautour',
    icon: '💼',
    difficulties: ['moyen', 'difficile'],
    description: (club) => `Un fonds d'investissement opaque vient d'acquérir 100% des parts de ${club} dans le plus grand secret. Les nouveaux propriétaires débarquent avec leurs propres conseillers.`,
    phases: [
      'Prise de contrôle express et audit sans concession des contrats...',
      'Entretien glacial avec le représentant des nouveaux actionnaires...',
      'Décision du nouveau conseil d\'administration...'
    ],
    failureRate: { facile: 0.25, moyen: 0.45, difficile: 0.60 },
    survivalVerdict: 'Les investisseurs valident vos compétences managériales et vous maintiennent à votre poste avec un vote de confiance !',
    fatalVerdict: 'Purge brutale de tout l\'organigramme ! Vous êtes démis de vos fonctions avec effet immédiat pour divergence de stratégie.',
    pressReport: 'Révolution brutale au club : les nouveaux propriétaires ont débarqué l\'ensemble de la direction sportive dans l\'heure suivant leur arrivée. Votre contrat est immédiatement résilié.'
  },
  {
    id: 'FIASCO_SANITAIRE',
    title: 'Fiasco Sanitaire & Intoxication de Masse',
    icon: '🏥',
    difficulties: ['facile', 'moyen', 'difficile'],
    description: (club) => `Drame médical avant une série de matchs capitaux : 14 joueurs de ${club} sont hospitalisés en soins intensifs suite à une violente intoxication bactérienne à l'hôtel.`,
    phases: [
      'Alerte sanitaire d\'urgence et mise en quarantaine de l\'effectif...',
      'Demande de report exceptionnel déposée auprès de la Ligue...',
      'Arbitrage juridique de la Commission des Compétitions...'
    ],
    failureRate: { facile: 0.20, moyen: 0.40, difficile: 0.50 },
    survivalVerdict: 'Report exceptionnel validé par les médecins fédéraux ! Le calendrier est condensé, mais l\'équipe pourra terminer sa saison.',
    fatalVerdict: 'Refus formel de la Ligue : forfaits répétés en cascade constatés et exclusion administrative définitive de la compétition.',
    pressReport: 'L\'incapacité d\'aligner une équipe conforme lors de trois rencontres consécutives a conduit la Ligue à prononcer le forfait général et la disqualification du club.'
  },
  {
    id: 'GREVE_KNYSNA',
    title: 'Mutinerie du Vestiaire (Grève de Knysna)',
    icon: '🚌',
    difficulties: ['facile', 'moyen', 'difficile'],
    description: (club) => `Psychodrame en direct : à la suite d'un clash retentissant avec le staff, les cadres de ${club} refusent de descendre du car et boycottent l'entraînement en direct télévisé !`,
    phases: [
      'Lettre ouverte incendiaire lue par le capitaine devant les médias...',
      'Médiation d\'urgence à huis clos dans le vestiaire barricadé...',
      'Ultimatum de la direction générale aux joueurs frondeurs...'
    ],
    failureRate: { facile: 0.25, moyen: 0.40, difficile: 0.55 },
    survivalVerdict: 'Un accord in extremis est trouvé après 6 heures de pourparlers. Les joueurs reprennent la compétition, malgré une ambiance glaciale.',
    fatalVerdict: 'Rupture collective des contrats et désertion totale du vestiaire ! L\'équipe ne peut plus jouer et déclare forfait général.',
    pressReport: 'La mutinerie a détruit le club de l\'intérieur. Incapable de ramener le vestiaire à la raison, la direction a acté la rupture totale et le forfait général de l\'équipe.'
  },
  {
    id: 'AUDIT_UEFA_FPF',
    title: 'Audit UEFA & Fair-Play Financier',
    icon: '🇪🇺',
    difficulties: ['facile', 'moyen'],
    description: (club) => `L'Instance de Contrôle Financier des Clubs de l'UEFA (ICFC) a ouvert une procédure d'urgence contre ${club} pour dissimulation de pertes et contrats de sponsoring fictifs.`,
    phases: [
      'Épluchage des montages financiers et valorisations par les auditeurs suisses...',
      'Plaidoirie désespérée des avocats du club au siège de Nyon...',
      'Publication du verdict de la Chambre de Jugement de l\'UEFA...'
    ],
    failureRate: { facile: 0.35, moyen: 0.50, difficile: 0.65 },
    survivalVerdict: 'Amende record de 20 M€ et encadrement salarial, mais la licence professionnelle et l\'autorisation de concourir restent sauves !',
    fatalVerdict: 'Bannissement immédiat de toutes compétitions officielles et retrait de la licence professionnelle pour fraude au FPF !',
    pressReport: 'Sanction historique de l\'UEFA : convaincu de fraude financière caractérisée, le club est banni des compétitions officielles et déchu de sa licence professionnelle.'
  },
  {
    id: 'FRAUDE_IDENTITE',
    title: 'Fraude d\'Identité & TPO Clandestine',
    icon: '🪪',
    difficulties: ['facile', 'moyen', 'difficile'],
    description: (club) => `Révélation choc d'Interpol et de la FIFA : l'une des recrues du mercato de ${club} jouait sous une fausse identité avec des droits économiques détenus par un fonds clandestin.`,
    phases: [
      'Enquête policière internationale et expertise graphologique des passeports...',
      'Saisine express de la Commission Juridique de la FIFA...',
      'Examen de la validité de l\'ensemble des matchs disputés...'
    ],
    failureRate: { facile: 0.30, moyen: 0.45, difficile: 0.60 },
    survivalVerdict: 'Suspension à vie du joueur impliqué et amende au club, mais la participation globale au championnat est maintenue.',
    fatalVerdict: 'Tous les matchs joués sont déclarés perdus par pénalité administrative : disqualification rétroactive et annulation de la saison !',
    pressReport: 'Le scandale de la licence frauduleuse a coûté la saison : l\'annulation sur tapis vert de toutes les rencontres disputées a conduit à l\'exclusion pure et simple du club.'
  },
  {
    id: 'PUTSCH_PRESIDENTIEL',
    title: 'Putsch Présidentiel & Vote de Défiance',
    icon: '🗳️',
    difficulties: ['facile', 'moyen', 'difficile'],
    description: (club) => `Assemblée Générale sous haute tension au siège de ${club} : une coalition de socios et d'actionnaires dissidents dépose une motion de censure pour renverser la direction.`,
    phases: [
      'Débats houleux et altercations verbales au siège du club...',
      'Dépouillement sous tension des bulletins de vote des actionnaires...',
      'Proclamation officielle des résultats de la motion de censure...'
    ],
    failureRate: { facile: 0.25, moyen: 0.40, difficile: 0.55 },
    survivalVerdict: 'La motion de censure est rejetée de justesse à 52% des suffrages ! Le Président est maintenu et confirme sa confiance en votre projet.',
    fatalVerdict: 'Le Président est renversé ! Le nouveau conseil d\'administration prend le pouvoir et démet instantanément toute la cellule sportive.',
    pressReport: 'Le putsch a réussi : le président historique est chassé de son fauteuil. La nouvelle direction a révoqué votre mandat avec effet immédiat sans préavis.'
  }
];

function getDiscoveredCrises() {
  try {
    const raw = localStorage.getItem(DISCOVERED_CRISES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function recordCrisisDiscovered(crisisId) {
  try {
    if (!crisisId) return;
    const list = getDiscoveredCrises();
    if (!list.includes(crisisId)) {
      list.push(crisisId);
      localStorage.setItem(DISCOVERED_CRISES_KEY, JSON.stringify(list));
      
      const totalCrises = typeof CRISIS_SCENARIOS_DB !== 'undefined' ? CRISIS_SCENARIOS_DB.length : 10;
      if (list.length >= totalCrises) {
        unlockAchievement('livre_noir');
      }
      updateHeaderStats();
    }
  } catch (e) {}
}

function getSavedProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function getAchievementsProgress() {
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function unlockAchievement(key) {
  try {
    const unlocked = getAchievementsProgress();
    if (!unlocked.includes(key)) {
      unlocked.push(key);
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(unlocked));
      const ach = ACHIEVEMENTS_DEF.find(a => a.id === key);
      if (ach) {
        showAchievementToast(ach);
      }
      updateHeaderStats();
    }
  } catch (e) {}
}

function showAchievementToast(ach) {
  const toast = document.getElementById('achievement-toast');
  const iconEl = document.getElementById('toast-icon');
  const titleEl = document.getElementById('toast-title');
  if (!toast || !iconEl || !titleEl) return;

  iconEl.textContent = ach.icon;
  titleEl.textContent = ach.title;

  audio.play('deal_signed');

  toast.classList.remove('hidden', 'translate-y-36', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-36', 'opacity-0');
    setTimeout(() => toast.classList.add('hidden'), 500);
  }, 4500);
}

function getManagerRank(completedCount) {
  if (completedCount >= 50) return { title: 'Légende Absolue du Football', icon: '🏆', badge: '🏆 Légende' };
  if (completedCount >= 30) return { title: 'Maître du Mercato', icon: '👑', badge: '👑 Maître' };
  if (completedCount >= 16) return { title: 'Directeur Sportif Confirmé', icon: '💎', badge: '💎 Directeur' };
  if (completedCount >= 8) return { title: 'Négociateur Averti', icon: '🥇', badge: '🥇 Négociateur' };
  if (completedCount >= 3) return { title: 'Scout Prometteur', icon: '🥈', badge: '🥈 Scout' };
  return { title: 'Stagiaire de la Deadline Day', icon: '🥉', badge: '🥉 Stagiaire' };
}

function saveScenarioSuccess(scenarioId, data) {
  const saved = getSavedProgress();
  saved[scenarioId] = {
    completed: true,
    score: data.score,
    grade: data.grade,
    stars: data.stars,
    finalRank: data.finalRank,
    date: new Date().toLocaleDateString('fr-FR')
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  updateHeaderStats();
}

function resetAllProgress() {
  if (confirm('Voulez-vous vraiment réinitialiser toutes vos carrières terminées, succès et crises découvertes ?')) {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ACHIEVEMENTS_KEY);
    localStorage.removeItem(DISCOVERED_CRISES_KEY);
    updateHeaderStats();
    if (!document.getElementById('screen-gallery').classList.contains('hidden')) {
      renderGallery();
    }
  }
}

// Current Run State
let activeScenario = null;
let currentRemainingBudget = 0;
let currentSignedPlayers = [];
let currentMarketPlayers = [];
let selectedMarketPos = 'ALL';
let currentPickedDiff = 'facile';

// Real-time timers
let realtimeRemainingSeconds = 300;
let realtimeInterval = null;
let rivalsInterval = null;
let deadlineMadnessTriggered = false;

// Negotiation State
let activeNegotiation = {
  player: null,
  patience: 100,
  step: 1,
  offeredPrice: 0,
  sellerName: '',
  history: [],
  usedClause: false
};

let pendingDeal = null;

// --- NAVIGATION & SCREENS ---
function showScreen(screenId) {
  [
    'screen-portal',
    'screen-home',
    'screen-gallery',
    'screen-mercato',
    'screen-simulation',
    'screen-recap',
    'screen-duel-portal',
    'screen-duel-lobby',
    'screen-duel-recap'
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });
  const target = document.getElementById(screenId);
  if (target) target.classList.remove('hidden');

  if (screenId === 'screen-gallery') {
    if (currentGalleryTab === 'crises') {
      renderCrisesList();
    } else if (currentGalleryTab === 'achievements') {
      renderAchievementsList();
    } else {
      renderGallery();
    }
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateHeaderStats() {
  const saved = getSavedProgress();
  const unlocked = getAchievementsProgress();
  const discoveredCrises = getDiscoveredCrises();
  const completedCount = Object.keys(saved).length;
  const pct = Math.round((completedCount / SCENARIOS.length) * 100);

  const countEl = document.getElementById('header-completed-count');
  const pctEl = document.getElementById('header-progress-pct');
  const rankEl = document.getElementById('header-manager-rank');
  const galleryBadgeEl = document.getElementById('btn-gallery-badge');

  const statCareersEl = document.getElementById('gallery-stat-careers');
  const statAchEl = document.getElementById('gallery-stat-achievements');
  const statCrisesEl = document.getElementById('gallery-stat-crises');
  const tabAchCountEl = document.getElementById('tab-ach-count');
  const tabCrisesCountEl = document.getElementById('tab-crises-count');

  const rankInfo = getManagerRank(completedCount);

  if (countEl) countEl.textContent = `${completedCount} / ${SCENARIOS.length}`;
  if (pctEl) pctEl.textContent = `${pct}%`;
  if (rankEl) rankEl.textContent = rankInfo.badge;
  if (galleryBadgeEl) galleryBadgeEl.textContent = `${completedCount}/100 débloquées`;

  if (statCareersEl) statCareersEl.textContent = `${completedCount} / ${SCENARIOS.length}`;
  if (statAchEl) statAchEl.textContent = `${unlocked.length} / ${ACHIEVEMENTS_DEF.length}`;
  if (statCrisesEl) statCrisesEl.textContent = `${discoveredCrises.length} / ${CRISIS_SCENARIOS_DB.length}`;
  if (tabAchCountEl) tabAchCountEl.textContent = `${ACHIEVEMENTS_DEF.length}`;
  if (tabCrisesCountEl) tabCrisesCountEl.textContent = `${discoveredCrises.length}/${CRISIS_SCENARIOS_DB.length}`;
}

// ==============================================================
// 1. ACCUEIL : CHOIX DE DIFFICULTÉ & CLUB PICKER
// ==============================================================

function pickDifficulty(diff) {
  audio.init();
  currentPickedDiff = diff;

  const diffBadges = {
    facile: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    moyen: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    difficile: 'bg-rose-500/20 text-rose-400 border-rose-500/30'
  };

  const badgeEl = document.getElementById('picker-diff-badge');
  badgeEl.className = `text-xs font-extrabold uppercase px-3 py-1 rounded-full border ${diffBadges[diff]}`;
  badgeEl.textContent = `DIFFICULTÉ : ${diff.toUpperCase()}`;

  renderClubsPicker();
  document.getElementById('modal-club-picker').classList.remove('hidden');
}

function closeClubPicker() {
  document.getElementById('modal-club-picker').classList.add('hidden');
}

function rerollClubsPicker() {
  audio.play('sms_in');
  renderClubsPicker();
}

// Formattage propre et uniforme des besoins et postes (y compris polyvalence)
function getNeedDisplay(need) {
  if (!need) return { code: '', shortLabel: '', fullLabel: '', icon: '🎯' };
  const code = typeof need === 'object' ? (need.code || '') : need;
  const name = typeof need === 'object' ? (need.name || '') : '';
  const icon = (typeof need === 'object' && need.icon) ? need.icon : '🎯';

  let shortLabel = code;
  let fullLabel = name || code;

  if (code === 'POLYVALENT_6_DC') {
    shortLabel = 'Polyv. 6/DC';
    fullLabel = 'Polyvalent 6 & DC (Sentinelle / Central)';
  } else if (code === 'POLYVALENT_DG_DD' || code === 'LATERAL' || code === 'POLYVALENT_LATERAUX') {
    shortLabel = 'Polyv. DG/DD';
    fullLabel = 'Polyvalent Deux Côtés (DG / DD)';
  } else if (code === 'POLYVALENT_PISTON_AILIER') {
    shortLabel = 'Piston / Ailier';
    fullLabel = 'Piston de Couloir & Ailier';
  } else if (code === 'POLYVALENT_6_8') {
    shortLabel = 'Polyv. 6/8';
    fullLabel = 'Polyvalent 6 & 8 (Sentinelle / Relayeur)';
  } else if (code === 'POLYVALENT_8_10') {
    shortLabel = 'Polyv. 8/10';
    fullLabel = 'Polyvalent 8 & 10 (Relayeur / Meneur)';
  } else if (code === 'POLYVALENT_10_AILIER') {
    shortLabel = 'Polyv. 10/Ailier';
    fullLabel = 'Polyvalent 10 & Ailier Créatif';
  } else if (code === 'POLYVALENT_DEUX_AILES') {
    shortLabel = 'Polyv. AG/AD';
    fullLabel = 'Polyvalent Deux Ailes (AG & AD)';
  } else if (code === 'POLYVALENT_ATTAQUE') {
    shortLabel = 'Polyv. BU/Ailier';
    fullLabel = 'Polyvalent Attaque (Buteur / Ailier)';
  } else if (code === 'POLYVALENT_DC_LATERAL') {
    shortLabel = 'Polyv. DC/Latéral';
    fullLabel = 'Polyvalent DC & Latéral Défensif';
  } else if (code === 'PEPITE_U21') {
    shortLabel = 'Pépite U21';
    fullLabel = 'Pépite U21 (-21 ans)';
  } else if (code === 'DC') {
    shortLabel = 'DC';
    fullLabel = 'Défenseur Central';
  } else if (code === 'DG') {
    shortLabel = 'DG';
    fullLabel = 'Latéral Gauche';
  } else if (code === 'DD') {
    shortLabel = 'DD';
    fullLabel = 'Latéral Droit';
  } else if (code === 'MDF') {
    shortLabel = 'Sentinelle (6)';
    fullLabel = 'Sentinelle / MDF (6)';
  } else if (code === 'MC') {
    shortLabel = 'Relayeur (8)';
    fullLabel = 'Milieu Relayeur (8)';
  } else if (code === 'MO') {
    shortLabel = 'Meneur (10)';
    fullLabel = 'Meneur de Jeu (10)';
  } else if (code === 'BU') {
    shortLabel = 'Buteur (9)';
    fullLabel = 'Buteur / N°9';
  } else if (code === 'AG') {
    shortLabel = 'AG';
    fullLabel = 'Ailier Gauche';
  } else if (code === 'AD') {
    shortLabel = 'AD';
    fullLabel = 'Ailier Droit';
  } else if (code === 'GAR' || code === 'GB') {
    shortLabel = 'Gardien';
    fullLabel = 'Gardien de But';
  } else {
    shortLabel = name || code;
    fullLabel = name || code;
  }

  return { code, shortLabel, fullLabel, icon };
}

function renderClubsPicker() {
  const container = document.getElementById('picker-clubs-list');
  if (!container) return;

  const saved = getSavedProgress();
  const available = SCENARIOS.filter(s => s.difficulty === currentPickedDiff);

  const uncompleted = available.filter(s => !saved[s.id]);
  const pool = uncompleted.length >= 3 ? uncompleted : available;
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  const selectedClubs = shuffled.slice(0, 3);

  container.innerHTML = selectedClubs.map(sc => {
    const isDone = !!saved[sc.id];

    return `
      <div onclick="selectClubFromPicker(${sc.id})" class="cursor-pointer group bg-gray-800/80 hover:bg-gray-800 border border-gray-700 hover:border-amber-400 rounded-2xl p-3 sm:p-4 transition-all duration-200 flex items-center justify-between gap-3 sm:gap-4">
        <div class="flex items-center space-x-3 sm:space-x-3.5 min-w-0 flex-1">
          <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gray-700/80 border border-gray-600 flex items-center justify-center text-xl sm:text-2xl shrink-0 group-hover:scale-110 transition">
            ${sc.logo}
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-1.5 sm:gap-2 mb-0.5 flex-wrap sm:flex-nowrap">
              <h4 class="font-display font-extrabold text-sm sm:text-base text-white group-hover:text-amber-400 transition truncate">${sc.club}</h4>
              <span class="text-[11px] sm:text-xs text-gray-400 whitespace-nowrap inline-flex items-center gap-1">• ${formatWithFlags(sc.country)}</span>
              ${isDone ? '<span class="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 whitespace-nowrap">Validé ✅</span>' : ''}
            </div>
            ${sc.tacticalPhilosophy ? `
              <div class="flex items-center gap-1.5 mb-1 flex-wrap">
                <span class="text-[9px] font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded">${sc.tacticalPhilosophy}</span>
                <span class="text-[10px] text-gray-400">• ${sc.tacticalTag || ''}</span>
              </div>
            ` : ''}
            <p class="text-[11px] sm:text-xs text-gray-300 italic line-clamp-1 mb-1.5">
              ${sc.coachDemand}
            </p>
            <div class="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-gray-400 flex-wrap">
              <span>Budget : <strong class="text-emerald-400 font-mono font-bold">${sc.budget} M€</strong></span>
              <span class="text-gray-600">•</span>
              <div class="inline-flex items-center gap-1.5 flex-wrap">
                <span class="text-gray-400 text-[10px] uppercase font-bold">Missions :</span>
                ${(sc.needs || []).map(n => {
                  const info = getNeedDisplay(n);
                  const isPoly = info.code.startsWith('POLYVALENT');
                  const isU21 = info.code === 'PEPITE_U21';
                  const badgeColor = isPoly ? 'border-indigo-500/40 bg-indigo-950/40 text-indigo-300' : (isU21 ? 'border-purple-500/40 bg-purple-950/40 text-purple-300' : 'border-amber-400/30 bg-gray-900/90 text-amber-300');
                  return `<span class="inline-flex items-center gap-1 border ${badgeColor} px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm whitespace-nowrap">
                    <span>${info.icon}</span>
                    <span>${info.shortLabel}</span>
                  </span>`;
                }).join('')}
              </div>
            </div>
          </div>
        </div>

        <button class="px-3 sm:px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 group-hover:from-amber-300 group-hover:to-amber-400 text-black font-display font-bold text-xs rounded-xl shadow transition whitespace-nowrap shrink-0">
          Choisir ▶
        </button>
      </div>
    `;
  }).join('');
}

function selectClubFromPicker(id) {
  closeClubPicker();
  openScenarioBriefing(id, false);
}

// ==============================================================
// 2. GALERIE DES 100 CARRIÈRES & SUCCÈS
// ==============================================================

let galleryFilter = 'all';
let currentGalleryTab = 'careers';

function switchGalleryTab(tab) {
  audio.init();
  currentGalleryTab = tab;

  const careersView = document.getElementById('gallery-careers-view');
  const achView = document.getElementById('gallery-achievements-view');
  const crisesView = document.getElementById('gallery-crises-view');
  const btnCareers = document.getElementById('tab-btn-careers');
  const btnAch = document.getElementById('tab-btn-achievements');
  const btnCrises = document.getElementById('tab-btn-crises');
  const filters = document.getElementById('gallery-diff-filters');

  if (careersView) careersView.classList.add('hidden');
  if (achView) achView.classList.add('hidden');
  if (crisesView) crisesView.classList.add('hidden');

  if (btnCareers) btnCareers.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-gray-800 text-gray-300 hover:text-white transition';
  if (btnAch) btnAch.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-gray-800 text-gray-300 hover:text-white transition';
  if (btnCrises) btnCrises.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-gray-800 text-gray-300 hover:text-white transition flex items-center gap-1.5';

  if (tab === 'careers') {
    if (careersView) careersView.classList.remove('hidden');
    if (filters) filters.classList.remove('hidden');
    if (btnCareers) btnCareers.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-amber-400 text-black shadow transition';
    renderGallery();
  } else if (tab === 'achievements') {
    if (achView) achView.classList.remove('hidden');
    if (filters) filters.classList.add('hidden');
    if (btnAch) btnAch.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-amber-400 text-black shadow transition';
    renderAchievementsList();
  } else if (tab === 'crises') {
    if (crisesView) crisesView.classList.remove('hidden');
    if (filters) filters.classList.add('hidden');
    if (btnCrises) btnCrises.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-rose-500 text-white shadow transition flex items-center gap-1.5';
    renderCrisesList();
  }
}

function renderCrisesList() {
  const container = document.getElementById('crises-list');
  const badgeEl = document.getElementById('crises-discovered-badge');
  const tabCrisesCountEl = document.getElementById('tab-crises-count');
  if (!container) return;

  const discovered = getDiscoveredCrises();
  const total = typeof CRISIS_SCENARIOS_DB !== 'undefined' ? CRISIS_SCENARIOS_DB.length : 10;

  if (badgeEl) {
    badgeEl.textContent = `${discovered.length} / ${total} DÉCOUVERTS`;
  }
  if (tabCrisesCountEl) {
    tabCrisesCountEl.textContent = `${discovered.length}/${total}`;
  }

  container.innerHTML = CRISIS_SCENARIOS_DB.map(crisis => {
    const isDiscovered = discovered.includes(crisis.id);

    if (isDiscovered) {
      const diffBadges = (crisis.difficulties || []).map(d => {
        const color = d === 'facile' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : (d === 'moyen' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-rose-500/20 text-rose-400 border-rose-500/30');
        return `<span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${color}">${d}</span>`;
      }).join(' ');

      return `
        <div class="bg-gradient-to-br from-rose-950/30 via-gray-900 to-black border-2 border-rose-500/40 rounded-2xl p-4 shadow-xl flex flex-col justify-between gap-3 relative overflow-hidden transition hover:border-rose-500/70">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center space-x-3.5">
              <div class="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/40 flex items-center justify-center text-2xl shadow-inner shrink-0">
                ${crisis.icon}
              </div>
              <div>
                <div class="flex flex-wrap items-center gap-1.5 mb-1">
                  ${diffBadges}
                </div>
                <h4 class="font-display font-extrabold text-sm text-white">${crisis.title}</h4>
              </div>
            </div>
            <span class="text-[11px] font-bold text-rose-400 bg-rose-950/80 px-2.5 py-1 rounded-lg border border-rose-800 whitespace-nowrap shrink-0 flex items-center gap-1">
              <span>🚨</span> Découvert
            </span>
          </div>

          <p class="text-xs text-gray-300 leading-relaxed bg-black/40 p-2.5 rounded-xl border border-rose-950/60">
            ${typeof crisis.description === 'function' ? crisis.description('votre club') : crisis.description}
          </p>

          <div class="text-[11px] bg-rose-950/20 border border-rose-900/40 rounded-xl p-2.5 flex flex-col gap-1 text-gray-300">
            <div class="flex items-center justify-between text-[10px] text-gray-400 font-mono">
              <span>RISQUE D'ÉCHEC FATAL</span>
              <span class="text-rose-400 font-bold">${crisis.failureRate ? `Difficile ${Math.round((crisis.failureRate.difficile || 0.5)*100)}% • Moyen ${Math.round((crisis.failureRate.moyen || 0.3)*100)}%` : 'Élevé'}</span>
            </div>
            <div class="text-rose-300 italic text-[11px] truncate">
              💀 ${crisis.fatalVerdict}
            </div>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="bg-gray-950/60 border border-dashed border-gray-800 rounded-2xl p-4 opacity-75 select-none flex flex-col justify-between gap-3 relative overflow-hidden">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center space-x-3.5">
              <div class="w-12 h-12 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center text-2xl text-gray-600 grayscale shrink-0">
                🔒
              </div>
              <div>
                <span class="text-[10px] font-mono uppercase tracking-widest text-gray-500 block mb-0.5">ÉVÉNEMENT NON DÉCOUVERT</span>
                <h4 class="font-display font-bold text-sm text-gray-400 font-mono">??? (Dossier Classé Secret)</h4>
              </div>
            </div>
            <span class="text-[11px] font-bold text-gray-500 bg-gray-900 px-2.5 py-1 rounded-lg border border-gray-800 whitespace-nowrap shrink-0">
              🔒 Mystère
            </span>
          </div>

          <p class="text-xs text-gray-500 italic leading-relaxed bg-black/20 p-2.5 rounded-xl border border-gray-900">
            Cette crise dramatique sommeille dans les coulisses de la simulation... Jouez des carrières (en particulier en mode Difficile) pour la subir et percer son mystère.
          </p>

          <div class="text-[10px] text-gray-600 font-mono flex items-center gap-1.5 pt-1">
            <span>🎲 Déclenchement aléatoire en cours de saison</span>
          </div>
        </div>
      `;
    }
  }).join('');
}

function renderAchievementsList() {
  const container = document.getElementById('achievements-list');
  if (!container) return;

  const unlocked = getAchievementsProgress();

  container.innerHTML = ACHIEVEMENTS_DEF.map(ach => {
    const isUnlocked = unlocked.includes(ach.id);

    if (isUnlocked) {
      return `
        <div class="bg-gradient-to-r from-gray-900 to-gray-800/90 border-2 border-emerald-500/50 rounded-2xl p-4 shadow-lg flex items-center justify-between gap-4">
          <div class="flex items-center space-x-3.5">
            <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-2xl">
              ${ach.icon}
            </div>
            <div>
              <h4 class="font-display font-extrabold text-sm text-white">${ach.title}</h4>
              <p class="text-xs text-gray-300 mt-0.5">${ach.desc}</p>
            </div>
          </div>
          <span class="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800 whitespace-nowrap">
            Débloqué 🏆
          </span>
        </div>
      `;
    } else {
      return `
        <div class="bg-gray-950/60 border border-gray-800 rounded-2xl p-4 opacity-60 flex items-center justify-between gap-4 select-none">
          <div class="flex items-center space-x-3.5">
            <div class="w-12 h-12 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center text-2xl grayscale">
              🔒
            </div>
            <div>
              <h4 class="font-display font-bold text-sm text-gray-400">${ach.title}</h4>
              <p class="text-xs text-gray-500 mt-0.5">${ach.desc}</p>
            </div>
          </div>
          <span class="text-[11px] font-bold text-gray-600 bg-gray-900 px-2.5 py-1 rounded-lg border border-gray-800 whitespace-nowrap">
            Verrouillé
          </span>
        </div>
      `;
    }
  }).join('');
}

function filterGallery(diff) {
  galleryFilter = diff;
  ['all', 'facile', 'moyen', 'difficile'].forEach(d => {
    const btn = document.getElementById(`gal-${d}`);
    if (btn) {
      if (d === diff) {
        btn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-400 text-black';
      } else {
        btn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-800 text-gray-300';
      }
    }
  });
  renderGallery();
}

function renderGallery() {
  const container = document.getElementById('gallery-grid');
  if (!container) return;

  const saved = getSavedProgress();
  const unlocked = getAchievementsProgress();
  const discoveredCrises = getDiscoveredCrises();
  const completedCount = Object.keys(saved).length;
  const rankInfo = getManagerRank(completedCount);

  const managerAvatarEl = document.getElementById('gallery-manager-avatar');
  const managerTitleEl = document.getElementById('gallery-manager-title');
  const statCareersEl = document.getElementById('gallery-stat-careers');
  const statAchEl = document.getElementById('gallery-stat-achievements');
  const statCrisesEl = document.getElementById('gallery-stat-crises');
  const tabAchCountEl = document.getElementById('tab-ach-count');
  const tabCrisesCountEl = document.getElementById('tab-crises-count');

  if (managerAvatarEl) managerAvatarEl.textContent = rankInfo.icon;
  if (managerTitleEl) managerTitleEl.textContent = rankInfo.title;
  if (statCareersEl) statCareersEl.textContent = `${completedCount} / ${SCENARIOS.length}`;
  if (statAchEl) statAchEl.textContent = `${unlocked.length} / ${ACHIEVEMENTS_DEF.length}`;
  if (statCrisesEl) statCrisesEl.textContent = `${discoveredCrises.length} / ${CRISIS_SCENARIOS_DB.length}`;
  if (tabAchCountEl) tabAchCountEl.textContent = `${ACHIEVEMENTS_DEF.length}`;
  if (tabCrisesCountEl) tabCrisesCountEl.textContent = `${discoveredCrises.length}/${CRISIS_SCENARIOS_DB.length}`;

  const list = galleryFilter === 'all' ? SCENARIOS : SCENARIOS.filter(s => s.difficulty === galleryFilter);

  container.innerHTML = list.map(sc => {
    const isDone = !!saved[sc.id];
    const record = saved[sc.id];

    if (isDone) {
      return `
        <div class="bg-gray-900 border border-emerald-500/40 rounded-2xl p-3.5 shadow-md flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xl">${sc.logo}</span>
              <span class="text-[9px] font-mono text-gray-500">#${sc.id.toString().padStart(3, '0')}</span>
            </div>
            <h4 class="font-display font-bold text-xs text-white truncate">${sc.club}</h4>
            <span class="text-[10px] text-gray-400 truncate block mt-0.5">${sc.objective}</span>
          </div>
          <div class="border-t border-gray-800 pt-2 mt-3 flex items-center justify-between text-xs">
            <span class="text-amber-400 text-[10px]">${'⭐'.repeat(record.stars || 1)}</span>
            <span class="text-[10px] font-mono font-bold text-emerald-400">${record.grade || 'A'}</span>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="bg-gray-900/40 border border-gray-800/60 rounded-2xl p-3.5 flex flex-col items-center justify-center text-center min-h-[120px] select-none opacity-60">
          <span class="text-[9px] font-mono text-gray-600 absolute top-2.5 right-3">#${sc.id.toString().padStart(3, '0')}</span>
          <span class="text-3xl font-display font-extrabold text-gray-700 mb-1">?</span>
          <span class="text-[10px] font-bold uppercase tracking-wider text-gray-600">Mystère</span>
          <span class="text-[9px] text-gray-600 mt-0.5">Verrouillé</span>
        </div>
      `;
    }
  }).join('');
}

// ==============================================================
// ==============================================================
// 3. BRIEFING SCÉNARIO (AVEC CONTEXTES MERCATO POSITIFS & NÉGATIFS)
// ==============================================================

const POSITIVE_RUN_MODIFIERS = [
  {
    id: 'subvention',
    icon: '🏦',
    name: 'Injection Exceptionnelle',
    isPositive: true,
    desc: '+15% de budget débloqué d\'urgence par les actionnaires pour dynamiser le mercato !',
    apply: (s) => { s.budget = Math.round(s.budget * 1.15 * 10) / 10; }
  },
  {
    id: 'crise_liquidites',
    icon: '📉',
    name: 'Vendeurs aux Abois',
    isPositive: true,
    desc: 'Clubs vendeurs sous pression financière : vos propositions de clauses et bonus ont +25% d\'acceptation.'
  },
  {
    id: 'as_bluffeur',
    icon: '🃏',
    name: 'Panique Générale',
    isPositive: true,
    desc: 'Fébrile fin de mercato : vos tentatives de coup de bluff ont +25% de chances de réussir.'
  },
  {
    id: 'reputation_doree',
    icon: '✨',
    name: 'Attractivité & Prestige',
    isPositive: true,
    desc: 'Le projet séduit les joueurs : vos interlocuteurs démarrent avec +15% de patience en négociation.'
  },
  {
    id: 'informateurs',
    icon: '🔍',
    name: 'Réseau d\'Infiltrés',
    isPositive: true,
    desc: 'Vos éclaireurs sont infiltrés : vous bénéficiez d\'une grande marge de négociation avec les agents.'
  },
  {
    id: 'remise_flash',
    icon: '🏷️',
    name: 'Soldes de Dernière Minute',
    isPositive: true,
    desc: 'Embouteillage de transferts : les clubs vendeurs baissent leurs prétentions initiales de 10% !'
  }
];

const NEGATIVE_RUN_MODIFIERS = [
  {
    id: 'austerite_dncg',
    icon: '🔒',
    name: 'Coup de Rabot DNCG',
    isPositive: false,
    desc: 'Gendarme financier impitoyable : -15% de budget amputé immédiatement pour provisionner les dettes !',
    apply: (s) => { s.budget = Math.max(1.5, Math.round(s.budget * 0.85 * 10) / 10); }
  },
  {
    id: 'vendeurs_gourmands',
    icon: '🦈',
    name: 'Cartel des Présidents Rivaux',
    isPositive: false,
    desc: 'Entente entre clubs vendeurs : intransigeance totale sur les prix (-10% de patience initiale).'
  },
  {
    id: 'agents_voraces',
    icon: '💼',
    name: 'Commissions Opaques d\'Agents',
    isPositive: false,
    desc: 'Intermédiaires cupides : la patience des vendeurs s\'épuise 35% plus vite lors des pourparlers.'
  },
  {
    id: 'inflation_panique',
    icon: '📈',
    name: 'Surchauffe du Marché',
    isPositive: false,
    desc: 'Concurrence féroce : le bluff a deux fois plus de risques d\'échouer et de rompre les négociations.'
  },
  {
    id: 'fuite_mediatique',
    icon: '🗞️',
    name: 'Fuite dans la Presse (Rumeurs)',
    isPositive: false,
    desc: 'Vos cibles ont fuité à la une : les vendeurs refusent catégoriquement les clauses et bonus étalés.'
  },
  {
    id: 'veto_bancaire',
    icon: '🚫',
    name: 'Blocage des Lignes de Crédit',
    isPositive: false,
    desc: 'Contrôle bancaire drastique : -10% de budget et marge de manœuvre financière réduite.',
    apply: (s) => { s.budget = Math.max(1.5, Math.round(s.budget * 0.90 * 10) / 10); }
  }
];

const RUN_MODIFIERS = [...POSITIVE_RUN_MODIFIERS, ...NEGATIVE_RUN_MODIFIERS];

let activeRunModifier = null;

function startQuickRandomGame() {
  audio.init();
  const saved = getSavedProgress();
  const uncompleted = SCENARIOS.filter(s => !saved[s.id]);
  const pool = uncompleted.length > 0 ? uncompleted : SCENARIOS;
  const picked = pool[Math.floor(Math.random() * pool.length)];

  currentPickedDiff = picked.difficulty;
  openScenarioBriefing(picked.id, true);
}

function quickStartNextCareer() {
  audio.init();
  const saved = getSavedProgress();
  const uncompleted = SCENARIOS.filter(s => !saved[s.id] && (!activeScenario || s.id !== activeScenario.id));
  const pool = uncompleted.length > 0 ? uncompleted : SCENARIOS;
  const picked = pool[Math.floor(Math.random() * pool.length)];

  currentPickedDiff = picked.difficulty;
  openScenarioBriefing(picked.id, true);
}

function openScenarioBriefing(id, isRandom = false) {
  audio.init();
  const sc = SCENARIOS.find(s => s.id === id);
  if (!sc) return;

  // Clone scenario to allow modifier without corrupting database
  activeScenario = JSON.parse(JSON.stringify(sc));

  // Règle d'attribution du Contexte Mercato :
  // - Difficile : JAMAIS positif (100% négatif)
  // - Facile : TOUJOURS positif (100% positif)
  // - Moyen : 50/50 (50% positif, 50% négatif)
  const diff = activeScenario.difficulty || 'moyen';
  let isPositive = false;
  if (diff === 'facile') {
    isPositive = true;
  } else if (diff === 'difficile') {
    isPositive = false;
  } else {
    isPositive = Math.random() < 0.50;
  }

  const pool = isPositive ? POSITIVE_RUN_MODIFIERS : NEGATIVE_RUN_MODIFIERS;
  activeRunModifier = pool[Math.floor(Math.random() * pool.length)];
  if (activeRunModifier.apply) {
    activeRunModifier.apply(activeScenario);
  }

  // Header navigation buttons: In random mode, hide "Retour aux clubs" and show "Relancer l'aléatoire"
  const backBtn = document.getElementById('briefing-back-btn');
  const rerollBtn = document.getElementById('briefing-reroll-btn');
  if (backBtn && rerollBtn) {
    if (isRandom) {
      backBtn.classList.add('hidden');
      rerollBtn.classList.remove('hidden');
    } else {
      backBtn.classList.remove('hidden');
      rerollBtn.classList.add('hidden');
    }
  }

  document.getElementById('briefing-logo').textContent = activeScenario.logo;
  document.getElementById('briefing-club-name').textContent = activeScenario.club;
  document.getElementById('briefing-country').innerHTML = formatWithFlags(activeScenario.country);
  document.getElementById('briefing-budget').textContent = `${activeScenario.budget} M€`;
  document.getElementById('briefing-objective').textContent = activeScenario.objective;
  document.getElementById('briefing-coach-demand').textContent = `"${activeScenario.coachDemand}"`;

  // Display the 3 specific targets in Briefing
  const targetsEl = document.getElementById('briefing-targets-list');
  if (targetsEl && activeScenario.needs) {
    targetsEl.innerHTML = activeScenario.needs.map((n, idx) => {
      const info = getNeedDisplay(n);
      const isPoly = info.code.startsWith('POLYVALENT');
      const isU21 = info.code === 'PEPITE_U21';
      const borderClass = isPoly ? 'border-indigo-500/40 bg-indigo-950/40 text-indigo-300' : (isU21 ? 'border-purple-500/40 bg-purple-950/40 text-purple-300' : 'border-amber-400/30 bg-black/50 text-amber-300');
      return `<span class="border ${borderClass} text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
        <span>${info.icon}</span>
        <span>Cible ${idx + 1} : <strong>${info.fullLabel}</strong></span>
      </span>`;
    }).join('');
  }

  // Display Origin Constraint in Briefing
  const originEl = document.getElementById('briefing-origin-rule');
  const originIconEl = document.getElementById('briefing-origin-icon');
  const originTextEl = document.getElementById('briefing-origin-text');
  if (originEl && originIconEl && originTextEl) {
    if (activeScenario.originConstraint && activeScenario.originConstraint.code !== 'FREE') {
      originIconEl.textContent = activeScenario.originConstraint.icon || '📍';
      originTextEl.innerHTML = `Filière exigée : <strong class="text-amber-300 font-bold">${activeScenario.originConstraint.name}</strong> • <span class="italic text-gray-300">${activeScenario.originConstraint.shortDesc}</span>`;
      originEl.classList.remove('hidden');
    } else {
      originIconEl.textContent = '🌍';
      originTextEl.innerHTML = `Filière : <strong class="text-gray-300">Scouting Libre</strong> • Aucun quota géographique imposé`;
      originEl.classList.remove('hidden');
    }
  }

  // Display Run Modifier in Briefing
  const modBox = document.getElementById('briefing-modifier-box');
  const modIcon = document.getElementById('briefing-modifier-icon');
  const modName = document.getElementById('briefing-modifier-name');
  const modDesc = document.getElementById('briefing-modifier-desc');
  if (modBox && modIcon && modName && modDesc) {
    modIcon.textContent = activeRunModifier.icon;
    if (activeRunModifier.isPositive) {
      modBox.className = 'mb-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50 flex items-center gap-3 text-xs text-emerald-200 shadow-sm';
      modName.className = 'font-extrabold block text-[10px] uppercase text-emerald-400';
      modName.textContent = `✨ Contexte Favorable : ${activeRunModifier.name}`;
    } else {
      modBox.className = 'mb-4 p-3 rounded-xl bg-rose-950/40 border border-rose-500/50 flex items-center gap-3 text-xs text-rose-200 shadow-sm';
      modName.className = 'font-extrabold block text-[10px] uppercase text-rose-400';
      modName.textContent = `⚠️ Contexte Défavorable : ${activeRunModifier.name}`;
    }
    modDesc.textContent = activeRunModifier.desc;
    modBox.classList.remove('hidden');
  }

  const diffEl = document.getElementById('briefing-difficulty');
  if (activeScenario.difficulty === 'facile') {
    diffEl.className = 'text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
    diffEl.textContent = 'FACILE';
  } else if (activeScenario.difficulty === 'moyen') {
    diffEl.className = 'text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30';
    diffEl.textContent = 'MOYEN';
  } else {
    diffEl.className = 'text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30';
    diffEl.textContent = 'DIFFICILE';
  }

  document.getElementById('btn-start-mercato').onclick = () => {
    closeBriefingModal();
    startMercatoRun();
  };

  document.getElementById('modal-briefing').classList.remove('hidden');
}

function closeBriefingModal() {
  document.getElementById('modal-briefing').classList.add('hidden');
}

function backToPickerFromBriefing() {
  closeBriefingModal();
  pickDifficulty(currentPickedDiff);
}

// ==============================================================
// 4. MERCATO TEMPS RÉEL (5 MINUTES) - MARCHÉ À DOUBLE POSTE
// ==============================================================

function startMercatoRun() {
  if (!activeScenario) {
    showToast('Erreur : Aucun club sélectionné !', 'error');
    return;
  }

  try {
    clearInterval(realtimeInterval);
    clearInterval(rivalsInterval);

    currentRemainingBudget = activeScenario.budget;
    currentSignedPlayers = [];
    realtimeRemainingSeconds = 300;
    deadlineMadnessTriggered = false;

    // MARCHÉ IMPITOYABLE ALIGNÉ SUR LES EXIGENCES DU COACH :
    // Les profils parfaits sont chers, les profils peu chers sont hors-sujet ou toxiques !
    currentMarketPlayers = generateProceduralMarket(activeScenario.budget, activeScenario);

    document.getElementById('mercato-club-badge').textContent = activeScenario.logo;
    document.getElementById('mercato-club-title').textContent = activeScenario.club;
    const originNote = (activeScenario.originConstraint && activeScenario.originConstraint.code !== 'FREE')
      ? `<span class="block mt-1 font-bold text-amber-300 not-italic">📍 Filière exigée : ${activeScenario.originConstraint.name} (${activeScenario.originConstraint.shortDesc})</span>`
      : '';
    document.getElementById('mercato-coach-reminder').innerHTML = `"${activeScenario.coachDemand}"${originNote}`;

    updateMercatoHUD();
    renderSignedPlayers();
    renderMarketPlayers();

    // En solo : s'assurer que les boutons solo sont visibles et le HUD duel masqué
    const btnClose = document.getElementById('btn-close-mercato');
    const btnCloseMob = document.getElementById('btn-close-mercato-mobile');
    if (btnClose) btnClose.classList.remove('hidden');
    if (btnCloseMob) btnCloseMob.classList.remove('hidden');
    const duelHud = document.getElementById('duel-mercato-hud');
    if (duelHud) duelHud.classList.add('hidden');

    showScreen('screen-mercato');

    startRealtimeClock();
    startRivalClubsActivity();
  } catch (err) {
    console.error('Erreur lancement mercato:', err);
    showToast('Erreur lors du lancement : ' + err.message, 'error', 6000);
  }
}

function startRealtimeClock() {
  const clockEl = document.getElementById('realtime-clock');

  realtimeInterval = setInterval(() => {
    realtimeRemainingSeconds--;

    if (realtimeRemainingSeconds <= 0) {
      clearInterval(realtimeInterval);
      clearInterval(rivalsInterval);
      clockEl.textContent = '00:00';
      audio.play('alert');
      showToast('⏰ GONG FINAL ! La Deadline Day est terminée !', 'info', 2000);
      setTimeout(() => {
        finishMercatoAndSimulate();
      }, 700);
      return;
    }

    const mins = Math.floor(realtimeRemainingSeconds / 60);
    const secs = realtimeRemainingSeconds % 60;
    clockEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    // DEADLINE MADNESS TRIGGER AT 90 SECONDS LEFT
    if (realtimeRemainingSeconds <= 90 && !deadlineMadnessTriggered) {
      deadlineMadnessTriggered = true;
      triggerDeadlineMadness();
    }

    if (realtimeRemainingSeconds <= 60) {
      clockEl.className = 'font-mono font-extrabold text-xl text-rose-500 tracking-wider pulse-timer';
    } else {
      clockEl.className = 'font-mono font-extrabold text-xl text-red-400 tracking-wider';
    }
  }, 1000);
}

function getRivalsForCurrentClub() {
  if (activeScenario.difficulty === 'difficile') {
    return ['Empoli FC', 'US Lecce', 'Cagliari Calcio', 'Frosinone', 'Cadiz CF', 'UD Almeria', 'Luton Town', 'FC Metz', 'Clermont Foot', 'Hellas Verona', 'Salernitana'];
  } else if (activeScenario.difficulty === 'moyen') {
    return ['Atalanta Bergamo', 'ACF Fiorentina', 'Sevilla FC', 'Real Betis', 'Brighton & Hove', 'West Ham United', 'LOSC Lille', 'Stade Rennais', 'Eintracht Frankfurt', 'Torino FC'];
  } else {
    return ['Real Madrid', 'Manchester City', 'Bayern München', 'Paris SG', 'Chelsea FC', 'Arsenal FC', 'Liverpool FC', 'FC Barcelone', 'Juventus'];
  }
}

function startRivalClubsActivity() {
  const RIVAL_NAMES = getRivalsForCurrentClub();

  rivalsInterval = setInterval(() => {
    if (realtimeRemainingSeconds <= 15) return;

    const available = currentMarketPlayers.filter(p => !p.isSoldToRival && !p.isNegotiationFailed && !currentSignedPlayers.some(sp => sp.id === p.id));
    if (available.length <= 4) return;

    const target = available[Math.floor(Math.random() * available.length)];
    const rival = RIVAL_NAMES[Math.floor(Math.random() * RIVAL_NAMES.length)];

    target.isSoldToRival = true;
    target.rivalBidClub = rival;

    const banner = document.getElementById('rival-breaking-banner');
    const bannerText = document.getElementById('rival-breaking-text');
    bannerText.textContent = `🚨 TRANSFERT CONCURRENT : ${rival} vient d'engager ${target.name} pour ${(target.estimatedPrice * 1.1).toFixed(1)} M€ !`;
    banner.classList.remove('hidden');
    audio.play('alert');

    if (activeNegotiation.player && activeNegotiation.player.id === target.id) {
      addNegoMessage('seller', `OFFRE CONCURRENTE ! ${rival} vient de s'aligner sur nos exigences et de signer le joueur. La piste est morte.`);
      audio.play('fail');
      setTimeout(() => {
        failAndLockNegotiation();
      }, 2500);
    }

    setTimeout(() => {
      banner.classList.add('hidden');
    }, 6000);

    renderMarketPlayers();
  }, 25000);
}

// ==============================================================
// 4b. DEADLINE MADNESS (COUP DE THÉÂTRE DES 90 DERNIÈRES SECONDES)
// ==============================================================

function triggerDeadlineMadness() {
  audio.play('alert');

  const modal = document.getElementById('modal-deadline-madness');
  const titleEl = document.getElementById('madness-title');
  const descEl = document.getElementById('madness-desc');
  const actionsEl = document.getElementById('madness-actions');
  const iconEl = document.getElementById('madness-icon');

  if (!modal || !titleEl || !descEl || !actionsEl) return;

  const isSaleOffer = Math.random() < 0.65;

  if (isSaleOffer) {
    const BUYERS = ['Al-Nassr FC', 'Chelsea FC', 'Paris SG', 'Al-Hilal', 'Manchester City', 'Bayern München'];
    const buyer = BUYERS[Math.floor(Math.random() * BUYERS.length)];

    let cashBonus = 3.0;
    if (activeScenario.difficulty === 'facile') cashBonus = 25.0;
    else if (activeScenario.difficulty === 'moyen') cashBonus = 7.5;
    else cashBonus = 2.8;

    iconEl.textContent = '💰';
    titleEl.textContent = `Offre d'Achat Express (${buyer})`;
    descEl.innerHTML = `
      Un émissaire de <strong>${buyer}</strong> débarque en urgence à 23h30 !<br><br>
      Ils cherchent un joueur de complément et formulent une offre ferme et immédiate pour racheter l'un de vos remplaçants.<br><br>
      Si vous acceptez, le club encaisse immédiatement <strong class="text-emerald-400 font-bold">+${cashBonus.toFixed(1)} M€</strong> sur vos liquidités disponibles pour le sprint final !
    `;

    actionsEl.innerHTML = `
      <button onclick="acceptMadnessSale(${cashBonus})" class="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-emerald-400 text-black font-display font-extrabold text-xs rounded-xl shadow-lg hover:from-emerald-400 hover:to-emerald-300 transition">
        Vendre & Encaisser +${cashBonus.toFixed(1)} M€ ✍️
      </button>
      <button onclick="closeMadnessModal()" class="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-display font-bold text-xs rounded-xl border border-gray-700 transition">
        Décliner l'Offre ✕
      </button>
    `;
  } else {
    // Braderie Flash du vendeur (-35%)
    const available = currentMarketPlayers.filter(p => !p.isSoldToRival && !p.isNegotiationFailed && !currentSignedPlayers.some(sp => sp.id === p.id));
    if (available.length === 0) return;

    const target = available[Math.floor(Math.random() * available.length)];
    const oldPrice = target.estimatedPrice;
    const newPrice = Math.round(target.estimatedPrice * 0.65 * 10) / 10;
    target.estimatedPrice = newPrice;
    target.hiddenRealPrice = Math.round(target.hiddenRealPrice * 0.65 * 10) / 10;
    target.availability = '⚡ BRADERIE FLASH (-35%)';

    iconEl.textContent = '📉';
    titleEl.textContent = `Braderie Flash : ${target.club}`;
    descEl.innerHTML = `
      Le directeur sportif de <strong>${target.club}</strong> est aux abois avant la fermeture du marché !<br><br>
      Pour éviter de conserver son joueur mécontent, il brade <strong>${target.name}</strong> (${target.pos} • ${target.reputation}) pour seulement <strong class="text-emerald-400 font-bold">${newPrice.toFixed(1)} M€</strong> (au lieu de ${oldPrice.toFixed(1)} M€) !<br><br>
      Profitez de cette opportunité en or sur le marché avant minuit !
    `;

    actionsEl.innerHTML = `
      <button onclick="closeMadnessModal(); filterMarketPosition('${target.pos}')" class="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-display font-extrabold text-xs rounded-xl shadow-lg hover:from-amber-300 hover:to-amber-400 transition">
        Voir la Fiche de ${target.name} (${newPrice.toFixed(1)} M€) 🔍
      </button>
    `;

    renderMarketPlayers();
  }

  modal.classList.remove('hidden');
}

function acceptMadnessSale(cashBonus) {
  closeMadnessModal();
  audio.play('deal_signed');
  currentRemainingBudget += cashBonus;
  updateMercatoHUD();
  renderMarketPlayers();

  const banner = document.getElementById('rival-breaking-banner');
  const bannerText = document.getElementById('rival-breaking-text');
  bannerText.textContent = `💰 VENTE CONFIRMÉE : +${cashBonus.toFixed(1)} M€ ajoutés à vos liquidités pour le sprint final !`;
  banner.classList.remove('hidden');
  setTimeout(() => banner.classList.add('hidden'), 5000);
}

function closeMadnessModal() {
  const modal = document.getElementById('modal-deadline-madness');
  if (modal) modal.classList.add('hidden');
}

// ==============================================================
// VÉRIFICATION DE LA FILIÈRE / PROVENANCE EXIGÉE PAR LE COACH
// ==============================================================
function checkPlayerFulfillsOrigin(player, originConstraint, scenario) {
  if (!originConstraint || originConstraint.code === 'FREE') return true;
  if (!player || !player.nationality) return false;

  const nat = player.nationality;
  const clubCountry = scenario ? (scenario.country || '') : '';

  if (originConstraint.code === 'DOMESTIC') {
    if (clubCountry.includes('France') && nat.name === 'France') return true;
    if (clubCountry.includes('Espagne') && nat.name === 'Espagne') return true;
    if (clubCountry.includes('Angleterre') && (nat.name === 'Angleterre' || nat.name === 'Écosse' || nat.name === 'Pays de Galles')) return true;
    if (clubCountry.includes('Italie') && nat.name === 'Italie') return true;
    if (clubCountry.includes('Allemagne') && (nat.name === 'Allemagne' || nat.name === 'Autriche')) return true;
    if (clubCountry.includes('Portugal') && nat.name === 'Portugal') return true;
    if (clubCountry.includes('Pays-Bas') && nat.name === 'Pays-Bas') return true;
    return false;
  }

  if (originConstraint.code === 'SOUTH_AMERICA') {
    return nat.continent === 'Amérique du Sud' || nat.region === 'SOUTH_AMERICA';
  }

  if (originConstraint.code === 'AFRICA') {
    return nat.continent === 'Afrique' || nat.region === 'AFRICA';
  }

  if (originConstraint.code === 'EURO_TACTICAL') {
    return nat.continent === 'Europe';
  }

  if (originConstraint.code === 'NORDIC_EAST') {
    return nat.region === 'NORDIC_EAST';
  }

  if (originConstraint.code === 'EXPATRIATE') {
    if (clubCountry.includes('France') && nat.name === 'France') return false;
    if (clubCountry.includes('Espagne') && nat.name === 'Espagne') return false;
    if (clubCountry.includes('Angleterre') && nat.name === 'Angleterre') return false;
    if (clubCountry.includes('Italie') && nat.name === 'Italie') return false;
    if (clubCountry.includes('Allemagne') && nat.name === 'Allemagne') return false;
    return true;
  }

  return true;
}

// ==============================================================
// VÉRIFICATION DE CORRESPONDANCE DES 3 BESOINS (POSTES, RÔLES, POLYVALENCE)
// ==============================================================
function checkPlayerFulfillsNeed(player, need) {
  if (!player || !need) return false;
  const needCode = typeof need === 'object' ? need.code : need;
  const v = (player.versatility || '').toUpperCase();
  const sub = player.subPos || player.pos || '';

  // 1. Profils Polyvalents Précis
  if (needCode === 'POLYVALENT_6_DC') {
    return (v.includes('6') && v.includes('DC')) ||
           (sub === 'DC' && (v.includes('6') || v.includes('MDF') || v.includes('SENTINELLE'))) ||
           (sub === 'MDF' && v.includes('DC'));
  }
  if (needCode === 'POLYVALENT_DG_DD' || needCode === 'LATERAL' || needCode === 'POLYVALENT_LATERAUX') {
    return (v.includes('DG') && v.includes('DD')) ||
           (sub === 'DG' && v.includes('DD')) ||
           (sub === 'DD' && v.includes('DG')) ||
           v.includes('DEUX CÔTÉS') || v.includes('DEUX COTES');
  }
  if (needCode === 'POLYVALENT_PISTON_AILIER') {
    return v.includes('PISTON') || 
           ((sub === 'DG' || sub === 'DD') && (v.includes('AILIER') || v.includes('AG') || v.includes('AD'))) ||
           ((sub === 'AG' || sub === 'AD') && v.includes('PISTON'));
  }
  if (needCode === 'POLYVALENT_6_8') {
    return (v.includes('6') && v.includes('8')) ||
           (sub === 'MDF' && v.includes('8')) ||
           (sub === 'MC' && (v.includes('6') || v.includes('BOX-TO-BOX')));
  }
  if (needCode === 'POLYVALENT_8_10') {
    return (v.includes('8') && v.includes('10')) ||
           (sub === 'MC' && v.includes('10')) ||
           (sub === 'MO' && v.includes('8'));
  }
  if (needCode === 'POLYVALENT_10_AILIER') {
    return (v.includes('10') && (v.includes('AILIER') || v.includes('AG') || v.includes('AD') || v.includes('FAUX 9'))) ||
           (sub === 'MO' && (v.includes('AILIER') || v.includes('AG') || v.includes('AD'))) ||
           ((sub === 'AG' || sub === 'AD') && v.includes('10'));
  }
  if (needCode === 'POLYVALENT_DEUX_AILES') {
    return (v.includes('AG') && v.includes('AD')) ||
           v.includes('DEUX AILES') ||
           (sub === 'AG' && v.includes('AD')) ||
           (sub === 'AD' && v.includes('AG'));
  }
  if (needCode === 'POLYVALENT_ATTAQUE') {
    return (v.includes('BU') && (v.includes('AILIER') || v.includes('AG') || v.includes('AD'))) ||
           (sub === 'BU' && (v.includes('AILIER') || v.includes('AG') || v.includes('AD'))) ||
           ((sub === 'AG' || sub === 'AD') && (v.includes('BU') || v.includes('BUTEUR')));
  }
  if (needCode === 'POLYVALENT_DC_LATERAL') {
    return (v.includes('DC') && (v.includes('DD') || v.includes('DG') || v.includes('LATÉRAL') || v.includes('LATERAL'))) ||
           (sub === 'DC' && (v.includes('DD') || v.includes('DG'))) ||
           ((sub === 'DD' || sub === 'DG') && v.includes('DC'));
  }

  // 2. Pépite U21
  if (needCode === 'PEPITE_U21') {
    return player.age <= 21;
  }

  // 3. Postes spécifiques ou correspondances directes
  if (['DC', 'DD', 'DG', 'MDF', 'MC', 'MO', 'BU', 'AG', 'AD', 'GAR'].includes(needCode)) {
    if (player.subPos === needCode) return true;
    if (player.versatility && player.versatility.toUpperCase().includes(needCode)) return true;
    if (player.pos === needCode) return true;
  }

  // Fallback général
  if (player.pos === needCode) return true;
  return false;
}

function updateMercatoHUD() {
  const budgetEl = document.getElementById('mercato-remaining-budget');
  budgetEl.textContent = `${currentRemainingBudget.toFixed(1)} M€`;
  if (currentRemainingBudget <= 0.2) {
    budgetEl.className = 'text-sm sm:text-xl font-display font-bold text-rose-500 animate-pulse';
  } else {
    budgetEl.className = 'text-sm sm:text-xl font-display font-bold text-emerald-400';
  }

  // 3 Besoins & Missions tracker
  const needsBadge = document.getElementById('mercato-needs-badge');
  if (needsBadge && activeScenario && activeScenario.needs) {
    const usedPlayerIds = new Set();
    const badgesHtml = activeScenario.needs.map(n => {
      const match = currentSignedPlayers.find(p => !usedPlayerIds.has(p.id) && checkPlayerFulfillsNeed(p, n));
      const info = getNeedDisplay(n);

      if (match) {
        usedPlayerIds.add(match.id);
        return `<span class="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 whitespace-nowrap text-[9px] sm:text-[10px] shadow-sm">
          ${info.icon} ${info.shortLabel} : Validé ✅
        </span>`;
      } else {
        return `<span class="inline-flex items-center gap-1 text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30 whitespace-nowrap text-[9px] sm:text-[10px] shadow-sm">
          ${info.icon} ${info.shortLabel} : Requis ❌
        </span>`;
      }
    }).join(' ');

    needsBadge.innerHTML = badgesHtml;
  }
}

function filterMarketPosition(pos) {
  selectedMarketPos = pos;
  document.querySelectorAll('.pos-filter-btn').forEach(b => {
    if (b.textContent === pos || (pos === 'ALL' && b.textContent === 'TOUS')) {
      b.className = 'pos-filter-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-400 text-black';
    } else {
      b.className = 'pos-filter-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-800 text-gray-300 hover:bg-gray-700';
    }
  });
  renderMarketPlayers();
}

function renderMarketPlayers() {
  const container = document.getElementById('market-players-list');
  const countLabel = document.getElementById('market-count-label');
  if (!container) return;

  const filtered = currentMarketPlayers.filter(p => {
    if (currentSignedPlayers.some(sp => sp.id === p.id)) return false;
    if (selectedMarketPos !== 'ALL' && p.pos !== selectedMarketPos) return false;
    return true;
  });

  if (countLabel) {
    const activeCount = filtered.filter(p => !p.isSoldToRival && !p.isNegotiationFailed).length;
    countLabel.textContent = `${activeCount} joueur${activeCount > 1 ? 's' : ''} sur le mercato`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center text-gray-400 text-xs">
        Aucun joueur disponible pour ce poste.
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => {
    const posColors = {
      ATT: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
      MIL: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      DEF: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      GAR: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    };

    if (p.isSoldToRival) {
      return `
        <div class="bg-gray-950/60 border border-gray-800/60 rounded-2xl p-4 opacity-50 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <span class="text-2xl">🚫</span>
            <div>
              <h4 class="font-display font-bold text-sm text-gray-400 line-through">${p.name}</h4>
              <span class="text-[10px] text-rose-400 font-bold">Transféré à ${p.rivalBidClub || 'un concurrent'}</span>
            </div>
          </div>
          <span class="text-xs text-gray-600 font-mono">VENDU</span>
        </div>
      `;
    }

    if (p.isNegotiationFailed) {
      return `
        <div class="bg-gray-950/70 border border-rose-900/40 rounded-2xl p-4 opacity-60 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <span class="text-2xl">❌</span>
            <div>
              <h4 class="font-display font-bold text-sm text-gray-300">${p.name} <span class="text-xs text-gray-500 font-normal">(${p.pos} • ${p.estimatedPrice} M€)</span></h4>
              <span class="text-[10px] text-rose-400 font-bold">Piste définitivement fermée suite à l'échec des négociations</span>
            </div>
          </div>
          <span class="text-[11px] font-bold text-rose-500 bg-rose-950/80 px-3 py-1.5 rounded-lg border border-rose-800">Rupture définitive ❌</span>
        </div>
      `;
    }

    const subPosColors = {
      DC: 'bg-blue-600/20 text-blue-300 border-blue-500/40',
      DG: 'bg-cyan-600/20 text-cyan-300 border-cyan-500/40',
      DD: 'bg-sky-600/20 text-sky-300 border-sky-500/40',
      MDF: 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40',
      MC: 'bg-teal-600/20 text-teal-300 border-teal-500/40',
      MO: 'bg-purple-600/20 text-purple-300 border-purple-500/40',
      BU: 'bg-rose-600/20 text-rose-300 border-rose-500/40',
      AG: 'bg-pink-600/20 text-pink-300 border-pink-500/40',
      AD: 'bg-orange-600/20 text-orange-300 border-orange-500/40',
      GAR: 'bg-amber-600/20 text-amber-300 border-amber-500/40'
    };

    const subKey = p.subPos || p.pos;
    const subLabel = p.subPosName || p.subPos || p.pos;
    const subIcon = p.subPosIcon || (p.pos === 'ATT' ? '⚡' : (p.pos === 'MIL' ? '🎯' : (p.pos === 'DEF' ? '🛡️' : '🧤')));

    // Check if player satisfies one of the active scenario needs
    const matchingNeed = (activeScenario.needs || []).find(n => checkPlayerFulfillsNeed(p, n));
    const isTarget = !!matchingNeed;
    const satisfiesOrigin = activeScenario.originConstraint && activeScenario.originConstraint.code !== 'FREE' && checkPlayerFulfillsOrigin(p, activeScenario.originConstraint, activeScenario);

    const isLocked = !!p.isLockedByRival;
    const isAffordable = currentRemainingBudget >= 0.4 && !isLocked;

    return `
      <div data-player-id="${p.id}" class="bg-gray-900 border ${isLocked ? 'border-amber-500/80 bg-amber-950/10' : (isTarget ? 'border-amber-500/40 shadow-lg shadow-amber-500/5' : 'border-gray-800 hover:border-gray-700')} rounded-2xl p-4 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        <!-- Player Info -->
        <div class="flex items-center space-x-3.5">
          <div class="w-12 h-12 rounded-2xl bg-gray-800 border border-gray-700 flex flex-col items-center justify-center font-display text-xl text-white shrink-0">
            ${subIcon}
          </div>

          <div>
            <div class="flex flex-wrap items-center gap-1.5 mb-1">
              <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${subPosColors[subKey] || 'bg-gray-800 text-gray-300'} whitespace-nowrap">${subKey} • ${subLabel}</span>
              ${p.nationality ? `<span class="inline-flex items-center shrink-0" title="${p.nationality.name}">${renderFlag(p.nationality.flag, p.nationality.name)}</span>` : ''}
              ${p.versatility ? `<span class="text-[9px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 whitespace-nowrap">🔄 ${p.versatility}</span>` : ''}
              ${isTarget ? `<span class="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 whitespace-nowrap">⭐ Cible : ${getNeedDisplay(matchingNeed).shortLabel}</span>` : ''}
              ${satisfiesOrigin ? `<span class="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 whitespace-nowrap">📍 Filière Coach</span>` : ''}
              ${p.age <= 21 ? `<span class="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">💎 U21</span>` : ''}
              ${isLocked ? `<span class="text-[9px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse whitespace-nowrap">⏳ Négociation en cours (${p.rivalLockerName || 'Rival'})</span>` : ''}
              <h4 class="font-display font-bold text-base text-white ml-1">${p.name}</h4>
              <span class="text-xs text-gray-400 font-medium">• ${p.nationality ? p.nationality.name : ''} (${p.age} ans)</span>
              ${p.caliberLabel ? `<span class="text-[10px] ${p.caliberBadgeStyle || 'bg-gray-800 text-gray-300'} px-2 py-0.5 rounded-md whitespace-nowrap">${p.caliberLabel}</span>` : `<span class="text-[10px] font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">${p.reputation}</span>`}
            </div>

            <p class="text-xs text-gray-400 mb-2">
              Club vendeur : <strong class="text-gray-300">${p.club}</strong> • <span class="italic text-gray-400">${p.availability}</span>
            </p>

            <!-- Traits pills & Archetype & Psychology -->
            <div class="flex flex-wrap gap-1.5 mb-1.5">
              ${p.traits.map(t => {
                const isForbidden = (activeScenario.forbiddenTraits || []).includes(t);
                let badgeClass = 'bg-gray-800 text-gray-300';
                if (isForbidden) badgeClass = 'bg-rose-950 text-rose-300 border-rose-800 font-bold';

                return `<span class="text-[10px] ${badgeClass} px-2 py-0.5 rounded-md border border-gray-700">${isForbidden ? '⚠️ ' : ''}${t}</span>`;
              }).join('')}
              ${p.psychology ? `<span class="text-[9px] font-bold px-2 py-0.5 rounded border ${p.psychology.badgeClass}" title="${p.psychology.summary}">${p.psychology.icon || '🧠'} ${p.psychology.label}</span>` : ''}
            </div>

            <!-- Archetype details with Strength & Tactical Sacrifice -->
            ${p.archetype ? (() => {
              const coachPhilo = activeScenario.tacticalPhilosophy || '';
              const isFit = typeof checkPhilosophyMatch === 'function' && checkPhilosophyMatch(p.archetype.preferredPhilosophy, coachPhilo);
              const isMisfit = typeof checkPhilosophyMatch === 'function' && checkPhilosophyMatch(p.archetype.misfitPhilosophy, coachPhilo);
              return `
                <div class="flex flex-wrap items-center gap-1.5 text-[10px]">
                  <span class="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold flex items-center gap-1">
                    <span>${p.archetype.icon || '⚡'}</span>
                    <span>${p.archetype.name}</span>
                  </span>
                  <span class="px-1.5 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-800/60 font-medium" title="Atout principal">
                    ✓ ${p.archetype.strength}
                  </span>
                  <span class="px-1.5 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-800/60 font-medium" title="Sacrifice / Faille tactique">
                    ⚠️ ${p.archetype.sacrifice}
                  </span>
                  ${isFit ? `<span class="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-600 font-bold">🎯 Idéal Coach (+2 pts)</span>` : ''}
                  ${isMisfit ? `<span class="px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-700 font-bold">⛔ Dissonance Coach (-3 pts)</span>` : ''}
                </div>
              `;
            })() : ''}
          </div>
        </div>

        <!-- Price & Action Button -->
        <div class="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 border-gray-800 pt-3 sm:pt-0 shrink-0">
          <div class="sm:text-right mb-2">
            <span class="text-[10px] text-gray-400 block uppercase font-bold">Valeur Estimée</span>
            <span class="text-lg font-display font-extrabold text-emerald-400">${p.estimatedPrice} M€</span>
          </div>

          <button onclick="startNegotiation('${p.id}')" ${!isAffordable ? 'disabled' : ''} class="px-4 py-2 ${isLocked ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black'} disabled:opacity-40 disabled:cursor-not-allowed font-display font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5 whitespace-nowrap">
            <span>${isLocked ? '🔒 En négociation' : '💬 Négocier'}</span>
          </button>
        </div>

      </div>
    `;
  }).join('');
}

function renderSignedPlayers() {
  const container = document.getElementById('signed-players-list');
  const countEl = document.getElementById('signed-count');
  const spentEl = document.getElementById('total-spent');

  if (!container) return;

  countEl.textContent = `${currentSignedPlayers.length} recrue${currentSignedPlayers.length > 1 ? 's' : ''}`;

  let totalSpent = 0;

  if (currentSignedPlayers.length === 0) {
    container.innerHTML = `
      <p class="text-xs text-gray-500 italic p-4 text-center border border-dashed border-gray-800 rounded-lg">
        Aucune signature pour le moment.<br>Négociez avant la fin des 5 minutes !
      </p>
    `;
  } else {
    container.innerHTML = currentSignedPlayers.map(p => {
      totalSpent += p.agreedPrice;

      return `
        <div class="bg-gray-800/80 border border-gray-700/80 rounded-xl p-3 flex items-center justify-between">
          <div class="min-w-0 flex-1 mr-2">
            <h5 class="text-xs font-bold text-white flex items-center gap-1.5 truncate">
              ${p.nationality ? `<span class="inline-flex items-center shrink-0">${renderFlag(p.nationality.flag, p.nationality.name)}</span>` : ''}
              <span class="truncate">${p.name}</span>
            </h5>
            <span class="text-[10px] text-amber-400 block truncate">${p.reputation} • ${p.subPosName || p.subPos || p.pos}${p.nationality ? ' • ' + p.nationality.name : ''}${p.versatility ? ' (' + p.versatility + ')' : ''}</span>
            ${p.archetype ? `<span class="text-[9px] text-indigo-300 font-semibold block truncate">${p.archetype.icon} ${p.archetype.name} (✓ ${p.archetype.strength})</span>` : ''}
            ${p.psychology ? `<span class="text-[9px] ${p.psychology.badgeClass} px-1.5 py-0.2 rounded inline-block mt-0.5">${p.psychology.icon} ${p.psychology.label}</span>` : ''}
          </div>
          <span class="text-xs font-mono font-bold text-emerald-400 shrink-0">${p.agreedPrice.toFixed(1)} M€</span>
        </div>
      `;
    }).join('');
  }

  spentEl.textContent = `${totalSpent.toFixed(1)} M€`;
}

// ==============================================================
// 5. NÉGOCIATION STRICTE & DIALOGUES DYNAMIQUES (10+ VARIANTES)
// ==============================================================

const NEGO_DIALOGUES = {
  sellerOpeningNeutral: [
    "Bonjour. Le chrono tourne, soyons directs : {NAME} est estimé à {PRICE} M€. Qu'avez-vous à poser sur la table ?",
    "Nous écoutons. {NAME} suscite de l'intérêt, sa cote est de {PRICE} M€. Quelle est votre première proposition ?",
    "La fin de mercato approche. Nous sommes disposés à discuter pour {NAME} ({PRICE} M€), mais pas à perdre notre temps.",
    "Bonjour. Pour {NAME}, la mise de départ tourne autour de {PRICE} M€. Faites-nous une offre décente.",
    "Le téléphone sonne beaucoup ce soir. Pour {NAME} ({PRICE} M€), nous attendons une prise de position rapide.",
    "Entrons dans le vif du sujet : {NAME} a une valeur de marché de {PRICE} M€. Qu'avez-vous à nous proposer ?",
    "Nous avons peu de temps avant le gong de minuit. {NAME} ({PRICE} M€) peut partir si l'offre est convenable.",
    "Bienvenue. Le président nous a donné le feu vert pour ouvrir les pourparlers pour {NAME} ({PRICE} M€).",
    "On m'a dit que vous cherchiez du renfort. {NAME} est disponible, sa valeur marchande est fixée à {PRICE} M€.",
    "Le temps presse pour tout le monde. {NAME} est à vous si vous vous alignez sur sa valeur de {PRICE} M€."
  ],
  sellerOpeningAggressive: [
    "Soyons clairs : {NAME} est intransférable à moins d'une offre irrefusable au-dessus de {PRICE} M€ !",
    "Vous arrivez à la dernière minute pour notre meilleur élément ({NAME}, {PRICE} M€). Ne comptez pas sur un cadeau.",
    "Pas question de solder nos cadres ! Pour {NAME}, c'est minimum {PRICE} M€, ou la porte est fermée.",
    "Je vous préviens d'emblée : nous n'avons aucun besoin de vendre {NAME} ({PRICE} M€). Sortez le chéquier.",
    "Si vous pensiez faire les soldes avec {NAME} ({PRICE} M€), vous vous trompez d'adresse. On veut du solide.",
    "Nos supporters nous assassineraient si on cédait {NAME} à bas prix. Sa valeur plancher est {PRICE} M€ cash.",
    "Le coach compte sur {NAME}. Si vous voulez le déloger à {PRICE} M€, va falloir vous montrer très convaincant.",
    "Nous sommes inflexibles sur ce dossier. {NAME} vaut {PRICE} M€ et nous ne ferons aucune concession.",
    "Ne nous faites pas perdre de précieuses minutes : {NAME} est estimé à {PRICE} M€, montrez-vous à la hauteur.",
    "On a déjà refusé des offres étrangères pour {NAME} ({PRICE} M€). Posez du lourd ou passez votre chemin."
  ],
  sellerOpeningDesperate: [
    "La DNCG nous surveille et la nuit s'annonce tendue... Nous devons vendre {NAME} ({PRICE} M€) avant minuit !",
    "Nos caisses sont à sec. Faites-nous une offre raisonnable autour de {PRICE} M€ pour {NAME} et on s'entend.",
    "La situation comptable est critique : nous sommes prêts à écouter toute offre crédible pour {NAME} ({PRICE} M€).",
    "Le joueur pousse clairement pour partir et le club a besoin de liquidités. {NAME} ({PRICE} M€) peut signer chez vous.",
    "Nous avons un besoin urgent d'alléger la masse salariale. Que pouvez-vous proposer pour {NAME} ({PRICE} M€) ?",
    "Trouvons vite un terrain d'entente. {NAME} vaut {PRICE} M€, mais nous examinerons sérieusement votre offre.",
    "Les créanciers frappent à la porte. {NAME} est sur le marché à {PRICE} M€, nous sommes ouverts à la discussion.",
    "C'est la panique dans nos bureaux. Proposez-nous quelque chose pour {NAME} ({PRICE} M€) avant le gong.",
    "Le président veut boucler ce dossier au plus vite. {NAME} ({PRICE} M€) doit trouver preneur ce soir.",
    "Nous n'avons plus beaucoup de marge de manœuvre. {NAME} ({PRICE} M€) est libre de négocier si l'offre tient la route."
  ],
  userMakeOffer: [
    "Nous vous soumettons une offre formelle de {OFFER} M€ pour la signature immédiate de {NAME}.",
    "Après validation par notre board, nous mettons officiellement {OFFER} M€ sur la table.",
    "Voici notre proposition d'achat chiffrée : {OFFER} M€ payables dès ce soir pour {NAME}.",
    "Notre direction sportive a calibré notre enveloppe : nous offrons {OFFER} M€ pour ce transfert.",
    "Nous venons avec du concret : voici une proposition contractuelle de {OFFER} M€.",
    "Nous croyons beaucoup en {NAME} et posons {OFFER} M€ pour finaliser le deal sans tarder.",
    "Voici notre enveloppe maximale sur ce profil : {OFFER} M€ pour un engagement ferme.",
    "Nous posons un chèque garanti de {OFFER} M€ pour la mutation définitive de {NAME}.",
    "Le club formule une offre ferme et sincère de {OFFER} M€ pour votre joueur.",
    "Nos comptes sont calés : voici notre engagement d'achat à hauteur de {OFFER} M€."
  ],
  offerTooLow: [
    "C'est une plaisanterie ? À ce tarif-là, vous n'achetez même pas son pied gauche !",
    "Votre proposition est dérisoire. Nous ne sommes pas une association caritative.",
    "Vous sous-estimez gravement le joueur. Avec {OFFER} M€, vous n'êtes nulle part.",
    "Notre président a failli s'étouffer en voyant votre offre. Vous êtes très loin du compte.",
    "Pour {OFFER} M€, nous ne prenons même pas la peine d'ouvrir le classeur contractuel.",
    "Est-ce une tentative de déstabilisation ? Ce montant est totalement hors marché.",
    "Vous abusez de notre patience avec de tels montants. Montrez un peu plus de sérieux.",
    "Nous avons d'autres clubs prêts à mettre bien davantage. Votre proposition ne tient pas la route.",
    "À ce prix dérisoire ({OFFER} M€), le joueur reste chez nous sans la moindre hésitation.",
    "C'est insultant pour un joueur de son statut. Il va falloir rehausser considérablement votre offre."
  ],
  counterOffer: [
    "Si vous voulez {NAME}, notre président n'ouvrira la porte qu'à partir de {PRICE} M€.",
    "Nous voulons bien faire un effort, mais le prix plancher est fixé à {PRICE} M€.",
    "Coupons la poire en deux : versez {PRICE} M€ immédiatement et on envoie la lettre de sortie.",
    "Notre direction exige au strict minimum {PRICE} M€ pour libérer {NAME} avant minuit.",
    "Mon conseil : alignez {PRICE} M€ sur notre bureau et nous concluons dans le quart d'heure.",
    "Voici notre contre-proposition non négociable : {PRICE} M€, pas un centime de moins.",
    "Pour {PRICE} M€, nous acceptons de signer le protocole d'accord dès maintenant.",
    "Le board refuse sous la barre des {PRICE} M€. À vous de voir si vous pouvez vous aligner.",
    "Si vous mettez {PRICE} M€ sur la table, nous trouvons un consensus avant le coup de minuit.",
    "Nous pouvons clore le dossier ce soir, mais uniquement si vous montez votre offre à {PRICE} M€."
  ],
  dealAccepted: [
    "Accord total entre nos deux clubs ! Pour {PRICE} M€, nous validons le transfert de {NAME}.",
    "Marché conclu ! Votre offre de {PRICE} M€ convient à notre président. Passons aux détails contractuels.",
    "Nous avons un deal ! {PRICE} M€ pour {NAME}, nous préparons les documents officiels.",
    "Affaire conclue. Pour {PRICE} M€, {NAME} est autorisé à parapher son contrat chez vous.",
    "Proposition acceptée ! {PRICE} M€, c'est un montant équitable pour les deux parties.",
    "Top là ! Le protocole d'accord est validé à {PRICE} M€. Vous faites une excellente pioche.",
    "Feu vert du président ! Pour {PRICE} M€, {NAME} s'engage avec votre formation.",
    "C'est un soulagement pour tout le monde : l'accord est entériné à hauteur de {PRICE} M€.",
    "Dossier bouclé entre nos états-majors ! {PRICE} M€, envoyez votre médecin sans tarder.",
    "Le fax de confirmation vient de partir : {PRICE} M€, nous sommes parfaitement d'accord !"
  ],
  dealFailedPatience: [
    "Trop de tergiversations ! Vous nous avez fait perdre un temps précieux. Négociations closes !",
    "Notre patience a des limites. Vous n'avez pas les moyens de vos ambitions, dossier classé.",
    "C'est terminé. Nous refusons de poursuivre ces échanges stériles, la piste est fermée.",
    "Vous avez épuisé notre temps imparti. Nous nous tournons vers une autre opportunité. Adieu.",
    "Fin de non-recevoir. Le président vient de raccrocher le combiné, affaire définitivement enterrée.",
    "Nous ne pouvons plus perdre la moindre minute avec vous. Les pourparlers sont rompus.",
    "Votre manque de réactivité nous contraint à stopper les pourparlers. Vous n'aurez pas {NAME}.",
    "Le conseil d'administration a tranché : stop au cirque. La porte est désormais verrouillée.",
    "Vous avez trop tiré sur la corde. Négociation close, {NAME} restera au club.",
    "Rideau ! Vous avez trop tergiversé dans l'urgence. Piste définitivement close."
  ],
  userBluff: [
    "C'est à prendre ou à laisser. Si vous refusez, nous levons immédiatement l'option sur notre plan B !",
    "À ce montant-là, nous quittons la table immédiatement. Réfléchissez bien avant de refuser.",
    "Le chrono tourne aussi pour vous : prenez ce chèque maintenant ou vous vous retrouvez le bec dans l'eau.",
    "Nous ne ferons pas un centime de surenchère. C'est notre offre finale et définitive.",
    "Soit vous acceptez nos conditions sur-le-champ, soit nous signons notre autre cible dans dix minutes.",
    "Nous avons une alternative prête à signer pour moins cher. Dernière chance de conclure.",
    "Nos dirigeants ne tolèrent aucun chantage. Acceptez ce montant ou nous mettons un terme aux pourparlers.",
    "Vous n'aurez pas de meilleure opportunité ce soir. Prenez l'offre ou gardez votre joueur sur le banc.",
    "Nous posons cet argent ici et maintenant. Une minute de réflexion, pas une de plus.",
    "C'est notre proposition ultime. Si vous dites non, nous coupons court à la communication."
  ],
  bluffSuccess: [
    "Vous avez des nerfs d'acier... Le board ne peut pas se permettre de repartir bredouille. On accepte !",
    "Impressionnant coup de poker... Vos conditions sont acceptées, vous avez gagné votre bras de fer.",
    "Le président ne veut pas voir la transaction capoter à la dernière seconde. Deal accepté !",
    "C'est un pari risqué qui paie pour vous... Nous cédons sur votre montant pour éviter le fiasco.",
    "Vous nous prenez à la gorge avec le chrono... D'accord, nous nous alignons sur votre dernière offre !",
    "Bien joué. On sent le négociateur expérimenté... Nous ratifions l'accord à vos conditions.",
    "Le conseil craint de se retrouver sans liquidités. Vous emportez la décision, affaire conclue !",
    "Vous bluffez sans doute, mais nous n'avons pas le luxe de le vérifier. Le joueur est à vous.",
    "Le timing joue en votre faveur. Vos exigences sont validées par notre direction générale.",
    "Nous capitulons face à votre fermeté. Le contrat est approuvé au montant que vous imposiez !"
  ],
  bluffFail: [
    "Votre tentative d'intimidation est pathétique. On ne menace pas notre institution ! Fin de discussion.",
    "Le bluff ne prend pas avec nous. Vous vouliez jouer au plus fin ? Vous repartez les mains vides !",
    "Vous avez surestimé votre force de persuasion. Les négociations sont immédiatement stoppées !",
    "Nous ne cédons jamais au chantage de dernière minute. Prenez la porte, le dossier est clos.",
    "Vous pensiez nous faire trembler avec votre plan B imaginaire ? C'est non, et adieu !",
    "Mauvais calcul ! Notre président déteste ce genre d'arrogance. La transaction est annulée.",
    "Inutile de dramatiser : vous n'aurez rien du tout. Piste définitivement refermée !",
    "Un coup de bluff aussi grossier méritait une sanction : vous êtes rayé de nos carnets ce soir.",
    "Fin du sketch ! Nous gardons notre joueur et nous vous laissons avec vos regrets.",
    "Vous avez poussé le bouchon trop loin. Négociation immédiatement terminée !"
  ],
  agentDemand: [
    "[Agent] Mon joueur a des prétentions légitimes. J'exige une prime de signature de {BONUS} M€.",
    "[Agent] {NAME} fait un effort pour vous rejoindre, mais mes honoraires s'élèvent à {BONUS} M€.",
    "[Agent] Plusieurs clubs anglais sont à l'affût. Pour signer le bail, versez {BONUS} M€ de prime.",
    "[Agent] Les commissions d'intermédiaire sur ce transfert sont arrêtées à {BONUS} M€ nets.",
    "[Agent] Mon poulain est d'accord sur le projet, à condition d'ajouter {BONUS} M€ à la signature.",
    "[Agent] Dans le football moderne, la qualité se rémunère. Mon mandat exige {BONUS} M€ de prime.",
    "[Agent] Nous avons un préaccord oral, mais mon agence demande {BONUS} M€ pour finaliser le bail.",
    "[Agent] Pour garantir la loyauté totale du joueur sur plusieurs saisons, il faut poser {BONUS} M€ de prime.",
    "[Agent] Nous touchons au but, mais il reste ma commission de {BONUS} M€ à régulariser sans délai.",
    "[Agent] Ne bloquez pas l'opération pour des miettes : versez la prime de {BONUS} M€ et le joueur est à vous."
  ],
  agentRefusalAccepted: [
    "[Agent] Le joueur a mis son veto pour venir chez vous. Je renonce exceptionnellement à ma prime.",
    "[Agent] Vous êtes redoutable en négociation. Pour l'amour du jeu et du projet, j'accepte le deal sec.",
    "[Agent] Mon joueur insiste tant pour signer chez vous que je consens à abandonner mes honoraires.",
    "[Agent] Soit ! La volonté de {NAME} passe avant mon chèque. Nous signons sans frais supplémentaires.",
    "[Agent] Vous avez le sens de l'économie... Marché conclu sans commission additionnelle.",
    "[Agent] Mon client prend en charge mes émoluments pour ne pas compromettre son arrivée. On signe !",
    "[Agent] Rarement vu un directeur financier aussi intraitable ! D'accord pour le contrat sans prime.",
    "[Agent] Face à votre intransigeance et l'envie de mon poulain, je retire ma revendication financière.",
    "[Agent] Entendu. Nous signons sur les bases financières du club uniquement. Envoyez le protocole.",
    "[Agent] La perspective sportive compense le manque à gagner : nous validons l'engagement sec !"
  ],
  agentRefusalRejected: [
    "[Agent] Vous refusez ma commission ? Dans ce cas, mon joueur reste bien au chaud où il est. Terminé.",
    "[Agent] Sans respect pour le travail de mon agence, aucune signature n'aura lieu. Fin des pourparlers !",
    "[Agent] Mon client mérite un traitement digne des cadors. Vous n'avez pas le standing, adieu !",
    "[Agent] Ce refus est un manque de respect caractérisé. Je bloque la délivrance du certificat de transfert.",
    "[Agent] Le marché ne fonctionne pas ainsi. Pas de prime, pas de contrat. Le deal s'arrête ici.",
    "[Agent] J'ai trois autres écuries prêtes à payer le double. Nous annulons les démarches avec vous.",
    "[Agent] Vous venez de saboter le transfert de votre propre main. Bonne chance pour votre fin de saison !",
    "[Agent] Mon rôle est de protéger les intérêts de mon protégé. Votre posture est inacceptable. C'est fini.",
    "[Agent] C'est tout bonnement insultant pour mes services. Je coupe immédiatement la ligne.",
    "[Agent] Aucune flexibilité de votre part, aucune tolérance de la nôtre : dossier définitivement refermé !"
  ],
  proposeClauseSellOn: [
    "Nous intégrons une clause de 20% sur la plus-value à la revente en échange d'un cash immédiat de {PRICE} M€.",
    "Acceptons une alliance d'avenir : 20% à la revente future de {NAME} contre une indemnité sèche de {PRICE} M€.",
    "Voici une proposition gagnant-gagnant : nous versons {PRICE} M€ cash et vous conservez 20% sur sa revente.",
    "Pour soulager notre trésorerie ce soir, prenez {PRICE} M€ cash et encaissez 20% sur son prochain départ !",
    "Cédons sur le futur : un pourcentage élevé de 20% à la revente pour ramener le coût immédiat à {PRICE} M€.",
    "Vous toucherez le pactole sur son prochain transfert : nous proposons 20% à la revente et {PRICE} M€ ce soir.",
    "Notre structure de deal inclut 20% sur future cession afin de débloquer {PRICE} M€ de liquidités immédiates.",
    "Partageons les bénéfices futurs : 20% garantis à la revente contre un virement garanti de {PRICE} M€ maintenant.",
    "C'est l'offre moderne par excellence : {PRICE} M€ en cash et un intéressement massif de 20% à la revente.",
    "Réduisons l'impact cash immédiat : nous vous cédons 20% sur la revente en posant {PRICE} M€ sur la table."
  ],
  proposeClauseBonus: [
    "Nous complétons l'offre avec un bonus de 1.0 M€ payé en fin de saison si l'objectif du club est atteint.",
    "Pour préserver nos fonds, nous vous proposons {PRICE} M€ fixes plus 1.0 M€ garantis au bilan de la saison.",
    "Voici notre montage d'incentive : {PRICE} M€ ce soir et un virement différé de 1.0 M€ en juin prochain.",
    "Nous indexons 1.0 M€ supplémentaires sur nos performances sportives, avec {PRICE} M€ versés à la signature.",
    "Acceptons ce bonus conditionnel : {PRICE} M€ payables maintenant et 1.0 M€ ajoutés en fin d'exercice.",
    "Un bonus de maintien/Europe d'un million d'euros sera crédité en juin pour sécuriser vos {PRICE} M€ immédiats.",
    "Nos finances exigent d'échelonner l'effort : {PRICE} M€ cash et 1.0 M€ débloqués en clôture de championnat.",
    "Voici un bonus de performance de 1.0 M€ au terme de la saison, complétant les {PRICE} M€ d'acompte ferme.",
    "Partageons le risque sportif : {PRICE} M€ garantis ce soir, et 1.0 M€ versés lors du bilan officiel.",
    "C'est un montage responsable : {PRICE} M€ de cash disponible et 1.0 M€ réglés après la 38e journée."
  ],
  clauseAccepted: [
    "Cette clause nous convient parfaitement ! C'est une excellente affaire pour notre club à long terme.",
    "Marché conclu avec cette clause ! Nos comptables valident le montage financier, nous signons !",
    "Le board valide avec enthousiasme cet intéressement. Le protocole contractuel est validé !",
    "Vous faites preuve d'une belle ingéniosité financière. Nous acceptons la clause et le deal est scellé !",
    "Cette formule préserve nos intérêts futurs tout en débloquant le dossier. Affaire conclue !",
    "Proposition intelligente qui satisfait toutes les parties prenantes. Accord entériné avec cette clause !",
    "C'est validé par nos commissaires aux comptes ! La clause est annexée au contrat de mutation.",
    "Excellente négociation : nous empochons les liquidités et nous gardons une part sur l'avenir. Vendu !",
    "Notre président approuve cette clause avec grand plaisir. Préparons la visite médicale !",
    "Accord parfait ! La clause compense l'effort financier consenti ce soir. Bienvenue au joueur !"
  ],
  clauseRefused: [
    "Hors de question ! Nous exigeons du cash immédiat pour boucler nos propres transferts ce soir !",
    "Nous ne croyons pas aux promesses lointaines. C'est l'indemnité pleine et entière ou rien du tout !",
    "Notre direction refuse systématiquement les clauses conditionnelles. Versez la somme demandée.",
    "Des pourcentages hypothétiques ne combleront pas notre déficit actuel. Clause rejetée.",
    "Nous voulons de la trésorerie disponible à minuit, pas des primes différées. Revenez avec du cash.",
    "La clause proposée est jugée insuffisante par notre directeur financier. Refus catégorique.",
    "Ne tentez pas d'édulcorer l'indemnité avec des bonus hasardeux. C'est non pour cette formule.",
    "Nous sommes sous la pression de la ligue : il nous faut du cash sonnant et trébuchant dès ce soir.",
    "Votre montage ne résout rien pour nous ce soir. Clause déclinée, maintenez l'offre principale.",
    "Notre politique interne proscrit ce type d'artifice. Restons sur une transaction simple et directe."
  ],
  declineTooExpensive: [
    "Après examen de nos comptes, cette opération dépasse nos capacités financières. Nous nous retirons.",
    "Ce montant mettrait en péril l'équilibre financier de notre institution. Nous quittons la table.",
    "Nos caisses ne permettent pas une telle folie à cette heure-ci. Bonne continuation pour votre mercato.",
    "Nous avons une gestion saine et refusons de nous endetter déraisonnablement. Le dossier s'arrête ici.",
    "L'opération est bien trop onéreuse pour notre enveloppe actuelle. Nous refermons poliment cette piste.",
    "C'est au-dessus de nos moyens financiers actuels. Nous préférons nous concentrer sur des cibles accessibles.",
    "Le conseil d'administration a mis son veto : trop cher pour nos finances. Fin des discussions.",
    "Nous ne pouvons pas hypothéquer le futur du club sur un seul dossier. Nous passons notre tour.",
    "Face à de telles exigences budgétaires, nous devons renoncer avec regret. Bonne fin de soirée.",
    "Nos marges de manœuvre sont épuisées pour ce tarif. Nous nous retirons des pourparlers."
  ]
};

function getNegoDialogue(category, params = {}) {
  const list = NEGO_DIALOGUES[category];
  if (!list || list.length === 0) return '';
  const template = list[Math.floor(Math.random() * list.length)];
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return params[key] !== undefined ? params[key] : match;
  });
}

function startNegotiation(playerId) {
  audio.init();

  const p = currentMarketPlayers.find(pl => pl.id === playerId);
  if (!p || p.isSoldToRival || p.isNegotiationFailed || p.isSold || p.isLockedByRival) return;

  // En mode Duel 1v1 : vérifier et verrouiller le joueur auprès du serveur
  if (typeof isDuelActive !== 'undefined' && isDuelActive && typeof socket !== 'undefined' && socket) {
    socket.emit('lockPlayerNegotiation', { playerId: p.id });
  }

  let basePatience = activeScenario.difficulty === 'difficile' ? 65 : (activeScenario.difficulty === 'moyen' ? 80 : 100);
  if (activeRunModifier && activeRunModifier.id === 'reputation_doree') {
    basePatience = Math.min(100, basePatience + 15);
  } else if (activeRunModifier && activeRunModifier.id === 'vendeurs_gourmands') {
    basePatience = Math.max(35, basePatience - 10);
  }

  activeNegotiation = {
    player: p,
    patience: basePatience,
    step: 1,
    offeredPrice: Math.min(p.estimatedPrice, currentRemainingBudget),
    sellerName: `Directeur Sportif (${p.club})`,
    history: [],
    usedClause: false
  };

  const natName = p.nationality ? ` • ${p.nationality.name}` : '';
  document.getElementById('nego-contact-name').textContent = activeNegotiation.sellerName;
  document.getElementById('nego-contact-sub').innerHTML = 'Club Vendeur • <span class="text-emerald-400 font-semibold">En direct</span>';
  document.getElementById('nego-player-name').innerHTML = `${p.nationality ? renderFlag(p.nationality.flag, p.nationality.name) + ' ' : ''}${p.name}`;

  let repHtml = `${p.reputation} • ${p.subPosName || p.subPos || p.pos}${natName}${p.versatility ? ' (' + p.versatility + ')' : ''}`;
  if (p.archetype) {
    repHtml += ` | <strong class="text-indigo-300">${p.archetype.icon || '⚡'} ${p.archetype.name}</strong> <span class="text-emerald-400">(✓ ${p.archetype.strength})</span> <span class="text-amber-400">(⚠️ ${p.archetype.sacrifice})</span>`;
  }
  if (p.psychology) {
    repHtml += ` | <span class="px-1.5 py-0.5 rounded text-[9px] font-bold ${p.psychology.badgeClass}">${p.psychology.icon || '🧠'} ${p.psychology.label}</span>`;
  }
  document.getElementById('nego-player-rep').innerHTML = repHtml;
  document.getElementById('nego-player-val').textContent = `${p.estimatedPrice} M€ (Valeur marché)`;
  document.getElementById('nego-patience-bar').style.width = `${activeNegotiation.patience}%`;
  document.getElementById('nego-chat-history').innerHTML = '';

  let introMsg = getNegoDialogue('sellerOpeningNeutral', { NAME: p.name, PRICE: p.estimatedPrice });
  if (p.sellerProfile === 'aggressive') {
    introMsg = getNegoDialogue('sellerOpeningAggressive', { NAME: p.name, PRICE: p.estimatedPrice });
  } else if (p.sellerProfile === 'desperate') {
    introMsg = getNegoDialogue('sellerOpeningDesperate', { NAME: p.name, PRICE: p.estimatedPrice });
  }

  addNegoMessage('seller', introMsg);
  audio.play('sms_in');

  showNegoChoicesStep1();
  document.getElementById('modal-negotiation').classList.remove('hidden');
}

function addNegoMessage(sender, text) {
  const container = document.getElementById('nego-chat-history');
  if (!container) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `flex flex-col ${sender === 'me' ? 'items-end' : 'items-start'}`;

  const bubble = document.createElement('div');
  bubble.className = sender === 'me' 
    ? 'bg-amber-400 text-black font-medium text-xs px-3.5 py-2.5 rounded-2xl rounded-tr-none max-w-[85%] shadow-md leading-relaxed' 
    : 'bg-gray-800 text-gray-100 font-medium text-xs px-3.5 py-2.5 rounded-2xl rounded-tl-none max-w-[85%] border border-gray-700 shadow-md leading-relaxed';

  bubble.textContent = text;
  msgDiv.appendChild(bubble);

  const timeSpan = document.createElement('span');
  timeSpan.className = 'text-[9px] text-gray-500 mt-1 px-1';
  timeSpan.textContent = 'À l\'instant';
  msgDiv.appendChild(timeSpan);

  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

function updatePatience(delta) {
  let effectiveDelta = delta;
  if (effectiveDelta < 0 && activeRunModifier && activeRunModifier.id === 'agents_voraces') {
    effectiveDelta = Math.round(effectiveDelta * 1.35);
  }
  activeNegotiation.patience = Math.max(0, Math.min(100, activeNegotiation.patience + effectiveDelta));
  const bar = document.getElementById('nego-patience-bar');
  if (bar) {
    bar.style.width = `${activeNegotiation.patience}%`;
    if (activeNegotiation.patience > 50) {
      bar.className = 'bg-emerald-500 h-full transition-all duration-300';
    } else if (activeNegotiation.patience > 25) {
      bar.className = 'bg-amber-500 h-full transition-all duration-300';
    } else {
      bar.className = 'bg-rose-500 h-full transition-all duration-300 animate-pulse';
    }
  }

  if (activeNegotiation.patience <= 0) {
    setTimeout(() => {
      const pName = activeNegotiation.player ? activeNegotiation.player.name : 'le joueur';
      addNegoMessage('seller', getNegoDialogue('dealFailedPatience', { NAME: pName }));
      audio.play('fail');
      document.getElementById('nego-choices-box').innerHTML = `
        <button onclick="failAndLockNegotiation()" class="w-full py-3 bg-gray-800 text-rose-400 hover:bg-gray-700 font-display font-bold text-xs rounded-xl border border-rose-900/60">
          Négociations rompues (Piste perdue) ❌
        </button>
      `;
    }, 500);
  }
}

function failAndLockNegotiation() {
  if (activeNegotiation.player) {
    activeNegotiation.player.isNegotiationFailed = true;
    if (typeof isDuelActive !== 'undefined' && isDuelActive && typeof socket !== 'undefined' && socket) {
      socket.emit('unlockPlayerNegotiation', { playerId: activeNegotiation.player.id });
    }
  }
  document.getElementById('modal-negotiation').classList.add('hidden');
  renderMarketPlayers();
}

function showNegoChoicesStep1() {
  const p = activeNegotiation.player;
  const choicesContainer = document.getElementById('nego-choices-box');

  const budget = currentRemainingBudget;
  const standardOffer = Math.round(p.estimatedPrice * 10) / 10;
  const lowOffer = Math.round(p.estimatedPrice * 0.78 * 10) / 10;

  if (lowOffer > budget) {
    choicesContainer.innerHTML = `
      <div class="bg-rose-950/40 border border-rose-500/30 p-2.5 rounded-xl text-[11px] text-rose-300 mb-2">
        ⚠️ Valeur (${standardOffer} M€) très supérieure à vos fonds restants (${budget.toFixed(1)} M€).
      </div>
      <button onclick="handleDesperateAllInOffer(${budget})" class="w-full text-left p-3 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 transition flex items-center justify-between text-xs mb-1.5">
        <span>💸 Tenter le coup de poker : poser tous nos fonds (<strong>${budget.toFixed(1)} M€</strong>)</span>
        <span class="text-rose-400 font-bold">Chances infimes</span>
      </button>
      <button onclick="declineBecauseTooExpensive()" class="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-display font-bold text-xs rounded-xl border border-gray-700">
        🚪 Décliner : Hors de nos moyens financiers
      </button>
    `;
    return;
  }

  const buttons = [];

  if (lowOffer <= budget) {
    buttons.push(`
      <button onclick="handleOfferPrice(${lowOffer}, 'low')" class="w-full text-left p-3 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 transition flex items-center justify-between text-xs">
        <span>📉 Offre au rabais (<strong>${lowOffer} M€</strong>)</span>
        <span class="text-rose-400 font-bold">Risqué</span>
      </button>
    `);
  }

  if (standardOffer <= budget) {
    buttons.push(`
      <button onclick="handleOfferPrice(${standardOffer}, 'standard')" class="w-full text-left p-3 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 transition flex items-center justify-between text-xs">
        <span>🤝 Offrir la valeur marchande (<strong>${standardOffer} M€</strong>)</span>
        <span class="text-amber-400 font-bold">Standard</span>
      </button>
    `);
  } else {
    buttons.push(`
      <button onclick="handleOfferPrice(${budget}, 'max_budget')" class="w-full text-left p-3 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 transition flex items-center justify-between text-xs">
        <span>💰 Offrir notre budget max disponible (<strong>${budget.toFixed(1)} M€</strong>)</span>
        <span class="text-amber-400 font-bold">All-In</span>
      </button>
    `);
  }

  buttons.push(`
    <button onclick="failAndLockNegotiation()" class="w-full py-2 text-gray-500 hover:text-white text-xs">
      Abandonner la piste (Verrouille ce joueur)
    </button>
  `);

  choicesContainer.innerHTML = buttons.join('');
}

function declineBecauseTooExpensive() {
  audio.play('sms_out');
  addNegoMessage('me', getNegoDialogue('declineTooExpensive'));
  setTimeout(() => {
    addNegoMessage('seller', `Nous comprenons. Bonne chance pour le reste de votre mercato.`);
    setTimeout(() => {
      failAndLockNegotiation();
    }, 1200);
  }, 500);
}

function handleDesperateAllInOffer(budgetAmount) {
  audio.play('sms_out');
  addNegoMessage('me', `Soyons honnêtes : voici l'intégralité de nos liquidités (${budgetAmount.toFixed(1)} M€). C'est tout ce que le club possède.`);

  setTimeout(() => {
    const p = activeNegotiation.player;
    const isDesperateSeller = (p.sellerProfile === 'desperate' || p.availability === 'En froid avec le coach');
    const miracle = isDesperateSeller && Math.random() < 0.12;

    if (miracle) {
      updatePatience(+10);
      addNegoMessage('seller', `C'est une perte sèche énorme pour nous... Mais la situation interne est trop critique. Accepté pour ${budgetAmount.toFixed(1)} M€. Envoyez les papiers.`);
      audio.play('sms_in');
      showAgentStep(budgetAmount);
    } else {
      updatePatience(-50);
      addNegoMessage('seller', getNegoDialogue('offerTooLow', { OFFER: budgetAmount.toFixed(1) }));
      audio.play('sms_in');

      document.getElementById('nego-choices-box').innerHTML = `
        <button onclick="failAndLockNegotiation()" class="w-full py-3 bg-gray-800 text-rose-400 hover:bg-gray-700 font-display font-bold text-xs rounded-xl border border-rose-900/60">
          Clore la négociation (Piste perdue) ❌
        </button>
      `;
    }
  }, 750);
}

function handleOfferPrice(amount, type) {
  if (amount > currentRemainingBudget) {
    showToast("Impossible : vous n'avez pas les fonds nécessaires dans le budget !", "error");
    return;
  }

  audio.play('sms_out');
  const p = activeNegotiation.player;
  activeNegotiation.offeredPrice = amount;

  addNegoMessage('me', getNegoDialogue('userMakeOffer', { NAME: p.name, OFFER: amount.toFixed(1) }));

  setTimeout(() => {
    const hiddenPrice = p.hiddenRealPrice;

    if (amount >= hiddenPrice) {
      updatePatience(+20);
      addNegoMessage('seller', getNegoDialogue('dealAccepted', { NAME: p.name, PRICE: amount.toFixed(1) }));
      audio.play('sms_in');
      showAgentStep(amount);
    } else {
      const diffPatienceLoss = activeScenario.difficulty === 'difficile' ? -40 : -25;
      updatePatience(diffPatienceLoss);

      if (activeNegotiation.patience > 0) {
        const counterPrice = Math.round(Math.max(amount * 1.15, hiddenPrice) * 10) / 10;
        addNegoMessage('seller', `${getNegoDialogue('offerTooLow', { OFFER: amount.toFixed(1) })} ${getNegoDialogue('counterOffer', { NAME: p.name, PRICE: counterPrice.toFixed(1) })}`);
        audio.play('sms_in');
        showCounterChoices(counterPrice);
      }
    }
  }, 650);
}

function showCounterChoices(counterPrice) {
  const choicesContainer = document.getElementById('nego-choices-box');
  const budget = currentRemainingBudget;
  const p = activeNegotiation.player;

  // Clause calculations:
  // 1) 20% à la revente -> cuts cash by 15%
  const sellOnPrice = Math.round(counterPrice * 0.85 * 10) / 10;
  // 2) Bonus de fin de saison -> cuts upfront cash by 1.0 M€
  const bonusPrice = Math.round(Math.max(0.8, counterPrice - 1.0) * 10) / 10;

  const canAffordRaw = (counterPrice <= budget);
  const canAffordSellOn = (sellOnPrice <= budget);
  const canAffordBonus = (bonusPrice <= budget);

  let buttonsHtml = '';

  if (canAffordRaw) {
    buttonsHtml += `
      <button onclick="handleOfferPrice(${counterPrice}, 'counter_accepted')" class="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-display font-extrabold text-xs rounded-xl shadow-lg transition">
        Accepter l'exigence du club (${counterPrice.toFixed(1)} M€) 🤝
      </button>
    `;
  }

  // Clause 20% à la revente
  if (canAffordSellOn) {
    buttonsHtml += `
      <button onclick="handleClauseSellOn(${counterPrice}, ${sellOnPrice})" class="w-full text-left p-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 border border-emerald-500/40 hover:border-emerald-400 transition flex items-center justify-between text-xs">
        <div>
          <span class="font-bold text-emerald-400">📄 Proposer Clause 20% à la revente</span>
          <span class="block text-[10px] text-gray-400">Offrir <strong>${sellOnPrice.toFixed(1)} M€ cash</strong> + 20% sur la plus-value future</span>
        </div>
        <span class="text-[11px] font-mono font-bold text-emerald-300">-${(counterPrice - sellOnPrice).toFixed(1)} M€ cash</span>
      </button>
    `;
  }

  // Clause Bonus fin de saison (1 M€)
  if (canAffordBonus) {
    buttonsHtml += `
      <button onclick="handleClauseBonus(${counterPrice}, ${bonusPrice})" class="w-full text-left p-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 border border-blue-500/40 hover:border-blue-400 transition flex items-center justify-between text-xs">
        <div>
          <span class="font-bold text-blue-400">🏆 Proposer Bonus Fin de Saison (1.0 M€)</span>
          <span class="block text-[10px] text-gray-400">Offrir <strong>${bonusPrice.toFixed(1)} M€ cash</strong> + 1 M€ si objectif atteint</span>
        </div>
        <span class="text-[11px] font-mono font-bold text-blue-300">-1.0 M€ cash</span>
      </button>
    `;
  }

  if (!canAffordRaw && !canAffordSellOn && !canAffordBonus) {
    buttonsHtml += `
      <div class="bg-rose-950/40 border border-rose-500/30 p-2.5 rounded-xl text-[11px] text-rose-300 mb-2">
        Le vendeur exige au moins ${sellOnPrice.toFixed(1)} M€ avec clause, mais vos caisses ne comptent que ${budget.toFixed(1)} M€ !
      </div>
      <button onclick="handleDesperateAllInOffer(${budget})" class="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-amber-400 font-display font-bold text-xs rounded-xl border border-gray-700 mb-1">
        💸 Proposer notre max absolu (${budget.toFixed(1)} M€)
      </button>
    `;
  }

  // Coup de bluff
  buttonsHtml += `
    <button onclick="handleBluffUltimatum()" class="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-rose-400 font-display font-bold text-xs rounded-xl border border-gray-700">
      🃏 Coup de Bluff : "À ce prix-là, on quitte la table."
    </button>
    <button onclick="declineBecauseTooExpensive()" class="w-full py-2 bg-transparent text-gray-500 hover:text-white text-xs">
      Rompre la discussion (Piste fermée)
    </button>
  `;

  choicesContainer.innerHTML = buttonsHtml;
}

function handleClauseSellOn(rawCounterPrice, cashPrice) {
  audio.play('sms_out');
  const p = activeNegotiation.player;

  addNegoMessage('me', getNegoDialogue('proposeClauseSellOn', { NAME: p.name, PRICE: cashPrice.toFixed(1) }));

  setTimeout(() => {
    let acceptChance = 0.70;
    if (activeRunModifier && activeRunModifier.id === 'crise_liquidites') acceptChance += 0.25;
    if (activeRunModifier && activeRunModifier.id === 'fuite_mediatique') acceptChance -= 0.30;
    if (p.sellerProfile === 'desperate') acceptChance = Math.min(0.95, acceptChance + 0.15);
    if (p.sellerProfile === 'aggressive') acceptChance = Math.max(0.15, acceptChance - 0.20);

    if (Math.random() < acceptChance) {
      activeNegotiation.usedClause = true;
      activeNegotiation.offeredPrice = cashPrice;
      updatePatience(+20);
      addNegoMessage('seller', getNegoDialogue('clauseAccepted', { NAME: p.name, PRICE: cashPrice.toFixed(1) }));
      audio.play('sms_in');
      showAgentStep(cashPrice);
    } else {
      updatePatience(-20);
      addNegoMessage('seller', getNegoDialogue('clauseRefused', { NAME: p.name, PRICE: rawCounterPrice.toFixed(1) }));
      audio.play('sms_in');
      if (activeNegotiation.patience > 0) {
        showCounterChoices(rawCounterPrice);
      }
    }
  }, 700);
}

function handleClauseBonus(rawCounterPrice, cashPrice) {
  audio.play('sms_out');
  const p = activeNegotiation.player;

  addNegoMessage('me', getNegoDialogue('proposeClauseBonus', { NAME: p.name, PRICE: cashPrice.toFixed(1) }));

  setTimeout(() => {
    let acceptChance = 0.65;
    if (activeRunModifier && activeRunModifier.id === 'crise_liquidites') acceptChance += 0.25;
    if (activeRunModifier && activeRunModifier.id === 'fuite_mediatique') acceptChance -= 0.30;
    if (p.sellerProfile === 'desperate') acceptChance = Math.min(0.95, acceptChance + 0.15);
    if (p.sellerProfile === 'aggressive') acceptChance = Math.max(0.15, acceptChance - 0.20);

    if (Math.random() < acceptChance) {
      activeNegotiation.usedClause = true;
      activeNegotiation.offeredPrice = cashPrice;
      updatePatience(+20);
      addNegoMessage('seller', getNegoDialogue('clauseAccepted', { NAME: p.name, PRICE: cashPrice.toFixed(1) }));
      audio.play('sms_in');
      showAgentStep(cashPrice);
    } else {
      updatePatience(-20);
      addNegoMessage('seller', getNegoDialogue('clauseRefused', { NAME: p.name, PRICE: rawCounterPrice.toFixed(1) }));
      audio.play('sms_in');
      if (activeNegotiation.patience > 0) {
        showCounterChoices(rawCounterPrice);
      }
    }
  }, 700);
}

function handleBluffUltimatum() {
  audio.play('sms_out');
  const p = activeNegotiation.player;
  addNegoMessage('me', getNegoDialogue('userBluff', { NAME: p.name }));

  setTimeout(() => {
    let bluffSuccessRate = activeScenario.difficulty === 'difficile' ? 0.20 : 0.45;
    if (activeRunModifier && activeRunModifier.id === 'as_bluffeur') bluffSuccessRate += 0.25;
    if (activeRunModifier && activeRunModifier.id === 'inflation_panique') bluffSuccessRate -= 0.15;
    const isSuccess = Math.random() < bluffSuccessRate;

    if (isSuccess) {
      updatePatience(+20);
      addNegoMessage('seller', getNegoDialogue('bluffSuccess', { NAME: p.name, PRICE: activeNegotiation.offeredPrice.toFixed(1) }));
      audio.play('sms_in');
      unlockAchievement('as_bluff');
      showAgentStep(activeNegotiation.offeredPrice);
    } else {
      addNegoMessage('seller', getNegoDialogue('bluffFail', { NAME: p.name }));
      audio.play('fail');
      updatePatience(-100);
    }
  }, 700);
}

// STEP 2: AGENT NEGOTIATION (TENSION SUR LES CONDITIONS DU JOUEUR)
function showAgentStep(agreedClubPrice) {
  const choicesContainer = document.getElementById('nego-choices-box');
  const p = activeNegotiation.player;
  const agentBonus = Math.max(0.6, Math.round(agreedClubPrice * 0.08 * 10) / 10);
  const totalCost = Math.round((agreedClubPrice + agentBonus) * 10) / 10;

  setTimeout(() => {
    // Contact updates to the Agent
    document.getElementById('nego-contact-name').textContent = `Agent de ${p.name} 💼`;
    document.getElementById('nego-contact-sub').innerHTML = `<span class="text-amber-400 font-bold">Conseiller Sportif</span> • <span class="text-emerald-400 font-semibold">En direct</span>`;

    const agentDialogues = [
      `[Agent] Accord trouvé avec le club vendeur pour ${agreedClubPrice.toFixed(1)} M€ ! Mon joueur est très motivé, mais un club anglais lui propose une prime de signature de ${agentBonus.toFixed(1)} M€. Si vous vous alignez (+${agentBonus.toFixed(1)} M€), nous signons dans la minute !`,
      `[Agent] Feu vert du club pour ${agreedClubPrice.toFixed(1)} M€. Mon client a deux autres touches sérieuses : nous exigeons une prime d'installation de ${agentBonus.toFixed(1)} M€ pour valider le contrat immédiatement.`,
      `[Agent] Parfait pour l'indemnité (${agreedClubPrice.toFixed(1)} M€). Pour finaliser les conditions personnelles de ${p.name}, nous demandons ${agentBonus.toFixed(1)} M€ de bonus contractuel.`
    ];
    const agentMsg = agentDialogues[Math.floor(Math.random() * agentDialogues.length)];
    addNegoMessage('seller', agentMsg);
    audio.play('sms_in');

    const canAffordBonus = (totalCost <= currentRemainingBudget);

    choicesContainer.innerHTML = `
      ${canAffordBonus ? `
        <button onclick="acceptAgentBonus(${totalCost})" class="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-display font-extrabold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-1.5">
          <span>💰 Payer la prime & Valider le contrat (${totalCost.toFixed(1)} M€)</span>
        </button>
      ` : `
        <div class="text-[11px] text-rose-400 mb-2 bg-rose-950/30 p-2 rounded-lg border border-rose-900/40">
          ⚠️ La prime ferait dépasser votre budget disponible (${currentRemainingBudget.toFixed(1)} M€ restants).
        </div>
      `}
      <button onclick="refuseAgentBonus(${agreedClubPrice})" class="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-amber-400 font-display font-bold text-xs rounded-xl border border-gray-700 transition flex items-center justify-center gap-1.5">
        <span>🎲 Coup de bluff : « À prendre ou à laisser sans prime (${agreedClubPrice.toFixed(1)} M€) ! »</span>
      </button>
    `;
  }, 400);
}

function acceptAgentBonus(totalCost) {
  audio.play('sms_out');
  addNegoMessage('me', `D'accord pour la prime. L'important est que le joueur soit pleinement investi dès demain.`);
  setTimeout(() => {
    addNegoMessage('seller', `[Agent] Parfait, accord personnel validé ! Nous finalisons les examens médicaux. ✍️`);
    audio.play('sms_in');
    setTimeout(() => proceedToMedicalExam(totalCost), 600);
  }, 600);
}

function refuseAgentBonus(basePrice) {
  audio.play('sms_out');
  const p = activeNegotiation.player;
  addNegoMessage('me', `Hors de question de céder aux surenchères d'agent. C'est l'offre sèche (${basePrice.toFixed(1)} M€) ou nous nous retirons.`);

  setTimeout(() => {
    const success = Math.random() < 0.72;
    if (success) {
      addNegoMessage('seller', `[Agent] Bon... mon client adore le coach et veut absolument rejoindre votre équipe. On signe sans la prime ! 🤝`);
      audio.play('sms_in');
      setTimeout(() => proceedToMedicalExam(basePrice), 600);
    } else {
      addNegoMessage('seller', `[Agent] Dommage. Mon client ne se bradera pas dans ces conditions. Les discussions sont rompues ! ❌`);
      audio.play('fail');
      updatePatience(-100);
    }
  }, 650);
}

// ==============================================================
// 6. VISITE MÉDICALE & ANOMALIES PHYSIQUES VARIÉES (12 SCÉNARIOS)
// ==============================================================

const MEDICAL_DILEMMAS_DB = [
  {
    id: 'achille',
    title: '⚠️ Tendon d\'Achille Enflammé',
    desc: (p) => `Le médecin-chef alerte : un épaississement et un nodule inflammatoire sont visibles à l'échographie sur le tendon d'Achille de <strong>${p.name}</strong>. Risque élevé de rupture en cas d'enchaînement de matchs. Prenez-vous le risque de valider le contrat ?`,
    addedTrait: 'Genou en cristal'
  },
  {
    id: 'pubalgie',
    title: '⚠️ Pubalgie Chronique Tenace',
    desc: (p) => `L'IRM pelvienne révèle une inflammation symphysaire carabinée chez <strong>${p.name}</strong>. Il a joué sous infiltrations ces derniers mois. Risque d'arrêt de 3 à 5 mois au moindre faux mouvement. Signez-vous quand même ?`,
    addedTrait: 'Genou en cristal'
  },
  {
    id: 'ischios',
    title: '⚠️ Fibrose aux Ischio-Jambiers',
    desc: (p) => `Le staff médical relève une cicatrice fibreuse profonde à l'arrière de la cuisse de <strong>${p.name}</strong> suite à un ancien claquage mal soigné. Les accélérations brutales risquent de rouvrir la lésion. Validez-vous ce pari ?`,
    addedTrait: 'Genou en cristal'
  },
  {
    id: 'croises',
    title: '⚠️ Laxité du Ligament Croisé Antérieur',
    desc: (p) => `L'examen orthopédique décèle un tiroir antérieur anormal au genou de <strong>${p.name}</strong>. Une rechute ligamentaire majeure n'est pas à exclure lors des chocs hivernaux. Prenez-vous le risque ?`,
    addedTrait: 'Genou en cristal'
  },
  {
    id: 'metatarse',
    title: '⚠️ Fissure de Fatigue au Métatarse',
    desc: (p) => `La radiologie osseuse montre une micro-fissure d'usure au pied d'appui de <strong>${p.name}</strong>. S'il enchaîne les 90 minutes sans repos strict, une fracture nette le privera de compétition. Confirmez-vous le transfert ?`,
    addedTrait: 'Genou en cristal'
  },
  {
    id: 'cheville',
    title: '⚠️ Instabilité Chronique de la Cheville',
    desc: (p) => `Les antécédents d'entorses à répétition ont provoqué une distension ligamentaire à la cheville de <strong>${p.name}</strong>. Le joueur aura besoin d'infiltrations et d'un protocole renforcé chaque semaine. Prenez-vous le risque ?`,
    addedTrait: 'Genou en cristal'
  },
  {
    id: 'epaule',
    title: '⚠️ Séquelles d\'Opération de l\'Épaule',
    desc: (p) => `Le médecin constate une instabilité de la coiffe des rotateurs suite à une ancienne luxation de <strong>${p.name}</strong>. Il sera très vulnérable au moindre duel aérien rugueux. Validez-vous la signature ?`,
    addedTrait: 'Genou en cristal'
  },
  {
    id: 'lombalgie',
    title: '⚠️ Pincement Discal L5-S1 (Lombalgie)',
    desc: (p) => `Le scanner vertébral met en évidence une hernie discale naissante chez <strong>${p.name}</strong>. Des douleurs sciatiques invalidantes risquent de le paralyser sur les terrains lourds. Prenez-vous le risque ?`,
    addedTrait: 'Genou en cristal'
  },
  {
    id: 'menisque',
    title: '⚠️ Languette Méniscale Fissurée',
    desc: (p) => `Le radiologue repère une petite languette cartilagineuse instable au ménisque interne de <strong>${p.name}</strong>. Un blocage articulaire soudain reste possible à tout moment s'il subit une torsion. Prenez-vous le risque de signer ?`,
    addedTrait: 'Genou en cristal'
  },
  {
    id: 'cardiologie',
    title: '⚠️ Alerte Cardiaque : Extrasystoles d\'Effort',
    desc: (p) => `Le cardiologue du club relève une légère arythmie bénigne mais atypique lors du test VO2 max de <strong>${p.name}</strong>. Un protocole physique et des bilans trimestriels devront être scrupuleusement respectés. Signez-vous ?`,
    addedTrait: 'Genou en cristal'
  },
  {
    id: 'nocturne',
    title: '⚠️ Vie Nocturne Tumultueuse',
    desc: (p) => `Un rapport d'indicateur révèle que <strong>${p.name}</strong> a écumé plusieurs boîtes de nuit jusqu'à 5h du matin ces dernières semaines. Le coach abhorre ce manque de discipline. Prenez-vous le risque d'enflammer le vestiaire ?`,
    addedTrait: 'Fêtard invétéré'
  },
  {
    id: 'clash_ego',
    title: '⚠️ Égo Surdimensionné & Conflit d\'Agent',
    desc: (p) => `L'entourage de <strong>${p.name}</strong> réclame déjà des privilèges contractuels exorbitants et menace de créer un scandale médiatique s'il n'est pas titulaire garanti à chaque match. Prenez-vous le risque ?`,
    addedTrait: 'Fêtard invétéré'
  }
];

function proceedToMedicalExam(finalPrice) {
  if (finalPrice > currentRemainingBudget) {
    showToast("Erreur critique : ce montant dépasse vos liquidités disponibles !", "error");
    failAndLockNegotiation();
    return;
  }

  pendingDeal = {
    player: activeNegotiation.player,
    finalPrice: finalPrice,
    usedClause: activeNegotiation.usedClause
  };

  const hasAnomaly = Math.random() < 0.28;

  if (hasAnomaly) {
    // Fermer le chat et ouvrir la modale de dilemme médical
    document.getElementById('modal-negotiation').classList.add('hidden');
    audio.play('alert');
    const p = pendingDeal.player;

    const picked = MEDICAL_DILEMMAS_DB[Math.floor(Math.random() * MEDICAL_DILEMMAS_DB.length)];
    const descText = typeof picked.desc === 'function' ? picked.desc(p) : picked.desc;

    const d = {
      id: picked.id,
      title: picked.title,
      desc: descText,
      addedTrait: picked.addedTrait
    };
    pendingDeal.anomaly = d;

    document.getElementById('medical-dilemma-title').textContent = d.title;
    document.getElementById('medical-dilemma-desc').innerHTML = d.desc;
    document.getElementById('modal-medical-dilemma').classList.remove('hidden');
  } else {
    // Pas d'anomalie : on garde la modale de négociation ouverte pour l'animation Option A
    finalizePlayerSigning(pendingDeal.player, finalPrice, null, pendingDeal.usedClause);
    pendingDeal = null;
  }
}

function resolveMedicalDilemma(acceptRisk) {
  document.getElementById('modal-medical-dilemma').classList.add('hidden');

  if (!pendingDeal) return;

  if (acceptRisk) {
    const p = pendingDeal.player;
    if (pendingDeal.anomaly.addedTrait && !p.traits.includes(pendingDeal.anomaly.addedTrait)) {
      p.traits.push(pendingDeal.anomaly.addedTrait);
    }
    finalizePlayerSigning(p, pendingDeal.finalPrice, pendingDeal.anomaly, pendingDeal.usedClause);
  } else {
    audio.play('fail');
    showToast('❌ Transfert annulé par précaution. La piste est refermée.', 'error');
    if (pendingDeal.player) {
      pendingDeal.player.isNegotiationFailed = true;
      if (typeof isDuelActive !== 'undefined' && isDuelActive && typeof socket !== 'undefined' && socket) {
        socket.emit('unlockPlayerNegotiation', { playerId: pendingDeal.player.id });
      }
    }
    renderMarketPlayers();
  }

  pendingDeal = null;
}

function finalizePlayerSigning(player, price, anomaly, usedClause) {
  if (price > currentRemainingBudget) {
    showToast("Action impossible : fonds insuffisants !", "error");
    return;
  }

  audio.play('deal_signed');

  // Secret Badges check: Gong de Minuit (<= 45s on clock)
  if (realtimeRemainingSeconds <= 45) {
    unlockAchievement('gong_minuit');
  }
  // Secret Badges check: Maître des Clauses
  if (usedClause || (activeNegotiation && activeNegotiation.usedClause)) {
    unlockAchievement('maitre_clauses');
  }

  currentRemainingBudget = Math.max(0, currentRemainingBudget - price);
  currentSignedPlayers.push({
    ...player,
    agreedPrice: price,
    hadAnomaly: !!anomaly,
    anomalyData: anomaly,
    usedClause: !!usedClause
  });

  // En mode Duel 1v1 : synchroniser l'achat avec le serveur pour retirer le joueur du marché partagé
  if (typeof isDuelActive !== 'undefined' && isDuelActive && typeof socket !== 'undefined' && socket) {
    socket.emit('playerSignedSuccess', {
      playerId: player.id,
      agreedPrice: price,
      playerObj: player
    });
  }

  updateMercatoHUD();
  renderSignedPlayers();
  renderMarketPlayers();

  // Animation Option A : Tampon animé "CONTRAT SIGNÉ" dans le chat + fermeture automatique
  const negoModal = document.getElementById('modal-negotiation');
  const stampOverlay = document.getElementById('nego-success-overlay');
  const stampContent = document.getElementById('nego-stamp-content');
  const playerInfoEl = document.getElementById('nego-success-player-info');
  const choicesBox = document.getElementById('nego-choices-box');

  if (negoModal && !negoModal.classList.contains('hidden') && stampOverlay && stampContent) {
    if (choicesBox) choicesBox.innerHTML = ''; // Nettoyer les boutons de négociation
    if (playerInfoEl) {
      playerInfoEl.innerHTML = `<strong class="text-amber-400 font-bold">${player.name}</strong> s'engage pour <strong class="text-emerald-400 font-mono font-bold">${price.toFixed(1)} M€</strong>`;
    }

    stampOverlay.classList.remove('hidden', 'pointer-events-none');
    void stampOverlay.offsetWidth;
    stampOverlay.classList.remove('opacity-0');
    stampOverlay.classList.add('opacity-100');

    stampContent.classList.remove('animate-stamp');
    void stampContent.offsetWidth;
    stampContent.classList.add('animate-stamp');

    spawnNegoConfetti();

    // Fermeture automatique fluide après 1.2s et affichage du toast
    setTimeout(() => {
      stampOverlay.classList.add('opacity-0', 'pointer-events-none');
      stampOverlay.classList.remove('opacity-100');

      setTimeout(() => {
        stampOverlay.classList.add('hidden');
        stampContent.classList.remove('animate-stamp');
        negoModal.classList.add('hidden');
        showToast(`🎉 Transfert officialisé : ${player.name} (${price.toFixed(1)} M€) !`, 'success');
      }, 250);
    }, 1200);
  } else {
    // Si la modale était déjà fermée (dilemme médical)
    showToast(`🎉 Transfert officialisé : ${player.name} (${price.toFixed(1)} M€) !`, 'success');
  }
}

function cancelNegotiation() {
  failAndLockNegotiation();
}

// ==============================================================
// 7. SIMULATION DE SAISON AVEC DOUBLE BESOIN OBLIGATOIRE
// ==============================================================

function finishMercatoAndSimulate() {
  audio.init();

  // Mode Duel 1v1 : passer par le validateur de fin de mercato multijoueur
  if (typeof isDuelActive !== 'undefined' && isDuelActive) {
    if (typeof finishDuelMercatoAction === 'function') {
      finishDuelMercatoAction();
    }
    return;
  }

  clearInterval(realtimeInterval);
  clearInterval(rivalsInterval);

  showScreen('screen-simulation');
  runSeasonSimulation();
}

const LEAGUE_RIVALS_DB = {
  'Premier League': [
    { name: 'Manchester City', target: 89 },
    { name: 'Arsenal FC', target: 84 },
    { name: 'Liverpool FC', target: 80 },
    { name: 'Aston Villa', target: 71 },
    { name: 'Tottenham', target: 66 },
    { name: 'Chelsea FC', target: 63 },
    { name: 'Newcastle Utd', target: 59 },
    { name: 'Manchester Utd', target: 55 },
    { name: 'West Ham', target: 51 },
    { name: 'Brighton', target: 48 },
    { name: 'Bournemouth', target: 45 },
    { name: 'Fulham FC', target: 43 },
    { name: 'Wolves', target: 41 },
    { name: 'Crystal Palace', target: 39 },
    { name: 'Brentford', target: 38 },
    { name: 'Everton FC', target: 36 },
    { name: 'Nottm Forest', target: 34 },
    { name: 'Luton Town', target: 28 },
    { name: 'Burnley FC', target: 24 },
    { name: 'Sheffield Utd', target: 20 }
  ],
  'La Liga': [
    { name: 'Real Madrid', target: 89 },
    { name: 'FC Barcelone', target: 84 },
    { name: 'Girona FC', target: 78 },
    { name: 'Atlético Madrid', target: 73 },
    { name: 'Athletic Bilbao', target: 67 },
    { name: 'Real Sociedad', target: 61 },
    { name: 'Real Betis', target: 56 },
    { name: 'Villarreal CF', target: 52 },
    { name: 'Valencia CF', target: 48 },
    { name: 'Deportivo Alavés', target: 45 },
    { name: 'Osasuna', target: 43 },
    { name: 'Getafe CF', target: 41 },
    { name: 'Celta Vigo', target: 39 },
    { name: 'Sevilla FC', target: 38 },
    { name: 'RCD Mallorca', target: 37 },
    { name: 'Las Palmas', target: 36 },
    { name: 'Rayo Vallecano', target: 34 },
    { name: 'Cadiz CF', target: 30 },
    { name: 'Granada CF', target: 25 },
    { name: 'UD Almería', target: 21 }
  ],
  'Serie A': [
    { name: 'Inter Milan', target: 89 },
    { name: 'AC Milan', target: 79 },
    { name: 'Juventus', target: 75 },
    { name: 'Atalanta', target: 70 },
    { name: 'Bologna', target: 66 },
    { name: 'AS Roma', target: 62 },
    { name: 'Lazio Roma', target: 60 },
    { name: 'Fiorentina', target: 57 },
    { name: 'Torino FC', target: 51 },
    { name: 'Napoli', target: 50 },
    { name: 'Genoa CFC', target: 46 },
    { name: 'AC Monza', target: 44 },
    { name: 'Hellas Verona', target: 38 },
    { name: 'US Lecce', target: 37 },
    { name: 'Cagliari', target: 36 },
    { name: 'Empoli', target: 35 },
    { name: 'Frosinone', target: 32 },
    { name: 'Udinese', target: 31 },
    { name: 'Sassuolo', target: 27 },
    { name: 'Salernitana', target: 20 }
  ],
  'Bundesliga': [
    { name: 'Bayer Leverkusen', target: 88 },
    { name: 'Bayern Munich', target: 84 },
    { name: 'VfB Stuttgart', target: 76 },
    { name: 'RB Leipzig', target: 71 },
    { name: 'Borussia Dortmund', target: 66 },
    { name: 'Eintracht Frankfurt', target: 59 },
    { name: 'TSG Hoffenheim', target: 52 },
    { name: 'SC Freiburg', target: 48 },
    { name: 'FC Heidenheim', target: 46 },
    { name: 'Werder Brême', target: 44 },
    { name: 'FC Augsburg', target: 42 },
    { name: 'VfL Wolfsburg', target: 40 },
    { name: 'FSV Mainz 05', target: 38 },
    { name: 'Bor. M\'gladbach', target: 36 },
    { name: 'Union Berlin', target: 34 },
    { name: 'VfL Bochum', target: 32 },
    { name: '1. FC Köln', target: 28 },
    { name: 'Darmstadt 98', target: 24 },
    { name: 'FC St. Pauli', target: 22 },
    { name: 'Holstein Kiel', target: 20 }
  ],
  'Ligue 1': [
    { name: 'Paris SG', target: 87 },
    { name: 'AS Monaco', target: 76 },
    { name: 'Stade Brestois', target: 71 },
    { name: 'LOSC Lille', target: 68 },
    { name: 'OGC Nice', target: 63 },
    { name: 'Ol. Lyonnais', target: 59 },
    { name: 'RC Lens', target: 56 },
    { name: 'Ol. de Marseille', target: 54 },
    { name: 'Stade Rennais', target: 50 },
    { name: 'Toulouse FC', target: 46 },
    { name: 'Stade de Reims', target: 44 },
    { name: 'Montpellier HSC', target: 41 },
    { name: 'RC Strasbourg', target: 39 },
    { name: 'FC Nantes', target: 37 },
    { name: 'Le Havre AC', target: 35 },
    { name: 'FC Metz', target: 32 },
    { name: 'FC Lorient', target: 30 },
    { name: 'Clermont Foot', target: 26 },
    { name: 'AJ Auxerre', target: 23 },
    { name: 'Angers SCO', target: 20 }
  ],
  'Liga Portugal': [
    { name: 'Sporting CP', target: 88 },
    { name: 'SL Benfica', target: 82 },
    { name: 'FC Porto', target: 76 },
    { name: 'SC Braga', target: 68 },
    { name: 'Vitoria Guimaraes', target: 62 },
    { name: 'Moreirense', target: 55 },
    { name: 'Arouca', target: 48 },
    { name: 'Famalicao', target: 44 },
    { name: 'Casa Pia', target: 40 },
    { name: 'SC Farense', target: 38 },
    { name: 'Rio Ave', target: 37 },
    { name: 'Gil Vicente', target: 36 },
    { name: 'Estoril Praia', target: 35 },
    { name: 'Boavista FC', target: 34 },
    { name: 'Estrela Amadora', target: 33 },
    { name: 'Portimonense', target: 30 },
    { name: 'FC Vizela', target: 26 },
    { name: 'GD Chaves', target: 22 },
    { name: 'CS Maritimo', target: 21 },
    { name: 'CF Belenenses', target: 19 }
  ],
  'Eredivisie': [
    { name: 'PSV Eindhoven', target: 89 },
    { name: 'Feyenoord', target: 83 },
    { name: 'FC Twente', target: 72 },
    { name: 'AZ Alkmaar', target: 68 },
    { name: 'Ajax Amsterdam', target: 60 },
    { name: 'NEC Nijmegen', target: 53 },
    { name: 'FC Utrecht', target: 50 },
    { name: 'Sparta Rotterdam', target: 47 },
    { name: 'Go Ahead Eagles', target: 45 },
    { name: 'Fortuna Sittard', target: 40 },
    { name: 'SC Heerenveen', target: 38 },
    { name: 'PEC Zwolle', target: 36 },
    { name: 'Almere City', target: 35 },
    { name: 'Heracles Almelo', target: 33 },
    { name: 'RKC Waalwijk', target: 31 },
    { name: 'Excelsior', target: 28 },
    { name: 'Vitesse Arnhem', target: 24 },
    { name: 'FC Volendam', target: 20 },
    { name: 'Willem II', target: 22 },
    { name: 'FC Groningen', target: 21 }
  ]
};

function getLeagueRivalsPool(scenario) {
  let leagueKey = scenario ? scenario.league : null;
  if (!leagueKey || !LEAGUE_RIVALS_DB[leagueKey]) {
    const c = (scenario && scenario.country) ? scenario.country : '';
    if (c.includes('Allemagne')) leagueKey = 'Bundesliga';
    else if (c.includes('France')) leagueKey = 'Ligue 1';
    else if (c.includes('Angleterre')) leagueKey = 'Premier League';
    else if (c.includes('Espagne')) leagueKey = 'La Liga';
    else if (c.includes('Italie')) leagueKey = 'Serie A';
    else if (c.includes('Portugal')) leagueKey = 'Liga Portugal';
    else if (c.includes('Pays-Bas')) leagueKey = 'Eredivisie';
    else leagueKey = 'Premier League';
  }

  const basePool = LEAGUE_RIVALS_DB[leagueKey] || LEAGUE_RIVALS_DB['Premier League'];
  const userClubNormalized = ((scenario && scenario.club) || '').toLowerCase().trim();

  // Filter out the user's club to avoid playing against oneself
  const filtered = basePool.filter(c => {
    const rName = c.name.toLowerCase().trim();
    return !userClubNormalized.includes(rName) && !rName.includes(userClubNormalized);
  });

  if (filtered.length >= 19) {
    return filtered.slice(0, 19);
  }
  return basePool.slice(0, 19);
}

let currentSimMatchday = 0;
let currentSimInterval = null;
let currentSimSpeed = 480;
let currentSimStepFn = null;

// ==============================================================
// 10 SCÉNARIOS DE CRISE MAJEURE & INTERRUPTION DE SIMULATION
// ==============================================================
let currentCrisis = null;
let currentCrisisInterval = null;
let isCrisisActive = false;
let currentCrisisSimMeta = {};
let currentCrisisUserPoints = 0;
let currentCrisisFilledCount = 0;

function triggerCrisisEvent(crisis, isInstant = false) {
  isCrisisActive = true;
  currentCrisis = crisis;

  if (crisis && crisis.id) {
    recordCrisisDiscovered(crisis.id);
  }

  if (currentSimInterval) {
    clearInterval(currentSimInterval);
    currentSimInterval = null;
  }

  audio.init();
  audio.play('fail');

  const modal = document.getElementById('modal-crisis');
  const iconEl = document.getElementById('crisis-icon');
  const titleEl = document.getElementById('crisis-title');
  const matchdayTagEl = document.getElementById('crisis-matchday-tag');
  const descEl = document.getElementById('crisis-desc');
  const suspenseSec = document.getElementById('crisis-suspense-section');
  const verdictSec = document.getElementById('crisis-verdict-section');
  const phaseTextEl = document.getElementById('crisis-phase-text');
  const pctEl = document.getElementById('crisis-progress-pct');
  const progressBar = document.getElementById('crisis-progress-bar');

  if (!modal) return;

  iconEl.textContent = crisis.icon;
  titleEl.textContent = crisis.title;
  matchdayTagEl.textContent = `Journée ${crisis.matchday} / 38 • Simulation interrompue d'urgence`;
  descEl.textContent = typeof crisis.description === 'function' ? crisis.description(activeScenario.club) : crisis.description;

  suspenseSec.classList.remove('hidden');
  verdictSec.classList.add('hidden');
  pctEl.textContent = '0%';
  progressBar.style.width = '0%';
  phaseTextEl.innerHTML = `<span>⏳</span><span>${crisis.phases[0]}</span>`;

  modal.classList.remove('hidden');

  let progress = 0;
  const speed = isInstant ? 35 : 90;

  if (currentCrisisInterval) clearInterval(currentCrisisInterval);
  currentCrisisInterval = setInterval(() => {
    progress += 2;
    if (progress > 100) progress = 100;

    pctEl.textContent = `${progress}%`;
    progressBar.style.width = `${progress}%`;

    if (progress < 35) {
      phaseTextEl.innerHTML = `<span>⏳</span><span>${crisis.phases[0]}</span>`;
    } else if (progress < 75) {
      phaseTextEl.innerHTML = `<span>⏳</span><span>${crisis.phases[1]}</span>`;
    } else if (progress < 100) {
      phaseTextEl.innerHTML = `<span>⚖️</span><span>${crisis.phases[2]}</span>`;
    } else {
      clearInterval(currentCrisisInterval);
      currentCrisisInterval = null;
      renderCrisisVerdict(crisis);
    }
  }, speed);
}

function skipCrisisSuspense() {
  if (currentCrisisInterval) {
    clearInterval(currentCrisisInterval);
    currentCrisisInterval = null;
  }
  if (currentCrisis) {
    const pctEl = document.getElementById('crisis-progress-pct');
    const progressBar = document.getElementById('crisis-progress-bar');
    if (pctEl) pctEl.textContent = '100%';
    if (progressBar) progressBar.style.width = '100%';
    renderCrisisVerdict(currentCrisis);
  }
}

function renderCrisisVerdict(crisis) {
  const suspenseSec = document.getElementById('crisis-suspense-section');
  const verdictSec = document.getElementById('crisis-verdict-section');
  const verdictBox = document.getElementById('crisis-verdict-box');
  const actionContainer = document.getElementById('crisis-action-container');

  if (suspenseSec) suspenseSec.classList.add('hidden');
  if (verdictSec) verdictSec.classList.remove('hidden');

  if (crisis.isGameOver) {
    audio.play('fail');
    verdictBox.className = 'p-4 sm:p-5 rounded-2xl border border-rose-500/80 bg-rose-950/40 text-rose-200 leading-relaxed text-xs sm:text-sm shadow-xl';
    verdictBox.innerHTML = `
      <div class="flex items-center gap-2 mb-2">
        <span class="text-xl">💀</span>
        <strong class="font-display font-extrabold text-rose-400 text-sm sm:text-base uppercase tracking-tight">VERDICT FATAL : CESSATION DE LA SAISON</strong>
      </div>
      <p class="mb-2 font-medium">${crisis.fatalVerdict}</p>
      <div class="text-[11px] bg-black/40 border border-rose-900/60 p-2.5 rounded-xl text-rose-300 italic">
        "Les instances ont tranché avec sévérité. L'aventure s'arrête ici pour le club et pour vous."
      </div>
    `;

    actionContainer.innerHTML = `
      <button onclick="resolveFatalCrisis()" class="w-full py-3.5 px-4 bg-gradient-to-r from-red-700 via-rose-700 to-red-800 hover:from-red-600 hover:to-rose-600 text-white font-display font-black text-xs sm:text-sm rounded-xl shadow-2xl transition transform hover:scale-[1.02] flex items-center justify-center gap-2">
        <span>ACCÉDER AU BILAN DE LA CRISE</span>
        <span>💀</span>
      </button>
    `;
  } else {
    audio.play('deal_signed');
    verdictBox.className = 'p-4 sm:p-5 rounded-2xl border border-emerald-500/80 bg-emerald-950/40 text-emerald-200 leading-relaxed text-xs sm:text-sm shadow-xl';
    verdictBox.innerHTML = `
      <div class="flex items-center gap-2 mb-2">
        <span class="text-xl">🛡️</span>
        <strong class="font-display font-extrabold text-emerald-400 text-sm sm:text-base uppercase tracking-tight">VERDICT FAVORABLE : LE CLUB EST SAUVÉ !</strong>
      </div>
      <p class="mb-2 font-medium">${crisis.survivalVerdict}</p>
      <div class="text-[11px] bg-black/40 border border-emerald-900/60 p-2.5 rounded-xl text-emerald-300 italic">
        "Ouf de soulagement dans les couloirs du stade ! L'équipe peut retourner sur le terrain et terminer son championnat."
      </div>
    `;

    actionContainer.innerHTML = `
      <button onclick="resumeSimulationAfterCrisis()" class="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-display font-black text-xs sm:text-sm rounded-xl shadow-2xl transition transform hover:scale-[1.02] flex items-center justify-center gap-2">
        <span>REPRENDRE LE CHAMPIONNAT</span>
        <span>⚽</span>
      </button>
    `;
  }
}

function resumeSimulationAfterCrisis() {
  const modal = document.getElementById('modal-crisis');
  if (modal) modal.classList.add('hidden');
  isCrisisActive = false;

  showToast('Reprise du championnat après la crise ! ⚽', 'info');

  if (currentSimStepFn) {
    if (currentSimInterval) clearInterval(currentSimInterval);
    currentSimInterval = setInterval(() => currentSimStepFn(false), currentSimSpeed);
  }
}

function resolveFatalCrisis() {
  const modal = document.getElementById('modal-crisis');
  if (modal) modal.classList.add('hidden');
  isCrisisActive = false;

  if (currentSimInterval) {
    clearInterval(currentSimInterval);
    currentSimInterval = null;
  }
  currentSimStepFn = null;

  showRecapScreen(
    currentCrisisUserPoints || 0,
    20,
    currentCrisisFilledCount || 0,
    (activeScenario && activeScenario.needs) ? activeScenario.needs.length : 3,
    {
      ...currentCrisisSimMeta,
      crisisGameOver: currentCrisis
    }
  );
}

// Fonction de test direct dans la console (pour tester n'importe quel scénario de crise !)
window.testCrisis = function(crisisId = null, forceGameOver = null) {
  let targetCrisis = null;
  if (crisisId) {
    targetCrisis = CRISIS_SCENARIOS_DB.find(c => c.id === crisisId);
  }
  if (!targetCrisis) {
    targetCrisis = CRISIS_SCENARIOS_DB[Math.floor(Math.random() * CRISIS_SCENARIOS_DB.length)];
  }
  const diff = (activeScenario && activeScenario.difficulty) || 'moyen';
  const isGameOver = forceGameOver !== null ? forceGameOver : (Math.random() < (targetCrisis.failureRate[diff] !== undefined ? targetCrisis.failureRate[diff] : 0.40));

  const crisisInstance = {
    ...targetCrisis,
    matchday: currentSimMatchday || 22,
    isGameOver: isGameOver
  };

  currentCrisisSimMeta = {
    exploitPlayer: null,
    dramaFlopPlayer: null,
    lowCostCount: 0,
    topPlayerCount: 1
  };
  currentCrisisUserPoints = 28;
  currentCrisisFilledCount = 2;

  triggerCrisisEvent(crisisInstance, false);
};

// ==============================================================
// VARIATIONS NARRATIVES DES BILANS SAISON (10+ VARIANTES PAR TYPE D'ÉVÉNEMENT)
// ==============================================================
const INJURY_NARRATIVES = [
  (p, m) => `A disputé seulement ${m} matchs avant une rupture des ligaments croisés du genou. Saison terminée prématurément, un vrai coup dur pour l'équipe.`,
  (p, m) => `Victime d'une grave fracture tibia-péroné à sa ${m}e apparition. L'infirmerie est devenue sa résidence principale pour de longs mois.`,
  (p, m) => `Seulement ${m} titularisations avant qu'un claquage foudroyant aux ischio-jambiers ne l'écarte définitivement des terrains.`,
  (p, m) => `Touché au ménisque dès son ${m}e match. Son passage sur la table d'opération et une convalescence ralentie ont gâché son exercice.`,
  (p, m) => `Pubalgie chronique et rechutes à répétition : à peine ${m} apparitions sous nos couleurs avant de devoir déclarer forfait jusqu'à l'été.`,
  (p, m) => `Un tacle violent subi lors de sa ${m}e sortie a causé une désinsertion ligamentaire. Les supporters ne l'auront presque pas vu fouler la pelouse.`,
  (p, m) => `Après ${m} prestations encourageantes, son tendon d'Achille a lâché à l'entraînement. Une immense désillusion pour la direction sportive.`,
  (p, m) => `Le genou n'a pas résisté aux cadences infernales : seulement ${m} rencontres disputées avant une rechute musculaire fatale.`,
  (p, m) => `Fracture de fatigue au métatarse après ${m} matchs. Un arrêt forcé de 6 mois qui a laissé un vide béant dans l'effectif.`,
  (p, m) => `Blessé gravement à la cheville à la ${m}e journée, son indisponibilité prolongée a anéanti tous les plans du staff technique.`,
  (p, m) => `Luxation sévère de l'épaule et complications nerveuses après ${m} apparitions. Un recrutement maudit par les blessures.`,
  (p, m) => `Seulement ${m} matchs au compteur : fissuration du cartilage et multiples passages chez les spécialistes. Année blanche.`
];

const INJURY_TICKER_TEXTS = [
  (p) => `J21 : CATASTROPHE MÉDICALE ! Le genou fragile de ${p.name} a lâché : rupture ligamentaire, saison terminée !`,
  (p) => `J21 : COUP DE MASSE ! ${p.name} quitte la pelouse sur civière : cheville brisée et 6 mois d'absence confirmés.`,
  (p) => `J21 : L'INFIRMERIE REÇOIT ${p.name} ! Déchirure musculaire totale aux ischios, il ne rejouera plus cette saison.`,
  (p) => `J21 : DRAME AU VESTIAIRE : Le ménisque de ${p.name} a cédé. Opération d'urgence programmée ce jeudi.`,
  (p) => `J21 : AÏE ! ${p.name} rechute lourdement à l'entraînement : rupture du tendon d'Achille, clap de fin pour lui.`,
  (p) => `J21 : TERRIBLE VERDICT pour ${p.name} : fracture de fatigue confirmée par les radiologues, fin de championnat.`,
  (p) => `J21 : MALÉDICTION : Un choc violent envoie ${p.name} à l'hôpital. Les ligaments sont touchés, le coach est dépité.`,
  (p) => `J21 : FLASH MÉDICAL : ${p.name} doit déclarer forfait pour le reste de l'exercice suite à une pubalgie invalidante.`,
  (p) => `J21 : SCÈNE CHOC : ${p.name} s'effondre sans contact. Les croisés ont lâché, silence glacial dans le stade.`,
  (p) => `J21 : POISSE NOIRE : ${p.name} subit une luxation avec arrachement osseux. Six mois d'arrêt obligatoire.`
];

const SCANDAL_NARRATIVES = [
  (p) => `Virée en boîte de nuit arrosée jusqu'à l'aube la veille d'un choc décisif. Amende record et 3 matchs de suspension interne.`,
  (p) => `Prise de bec incendiaire avec l'entraîneur adjoint et jet de chasuble à la mi-temps. Mis à pied pendant trois semaines.`,
  (p) => `Retards chroniques aux briefings vidéo et déclarations explosives dans la presse étrangère pour forcer un départ.`,
  (p) => `A critiqué sans filtre la tactique de l'équipe sur Twitch après une défaite. Vestiaire fracturé et bronca des supporters.`,
  (p) => `Refus pur et simple de s'échauffer en fin de rencontre. Un caprice d'ego qui a valu une sanction exemplaire de la direction.`,
  (p) => `Repéré dans un casino à l'étranger à 48h d'un match capital. 3 cartons rouges et 2 expulsions évitables sur le terrain.`,
  (p) => `Guerre d'égos et clash violent sur WhatsApp avec le capitaine de l'équipe. L'ambiance dans le vestiaire en a pâti toute l'année.`,
  (p) => `A séché une mise au vert obligatoire pour fêter son anniversaire. Un manque de professionnalisme qui a coûté des points précieux.`,
  (p) => `Altercation houleuse avec des supporters mécontents sur le parking du stade après un match. Le service de sécurité a dû intervenir.`,
  (p) => `Comportement désinvolte, hygiène de vie douteuse et multiplication des sanctions financières. Un pari extra-sportif désastreux.`
];

const ANOMALY_SUCCESS_NARRATIVES = [
  (p, m) => `Le staff médical était alarmiste au mercato, mais il a enchaîné ${m} matchs impériaux ! Un pari risqué 100% gagnant.`,
  (p, m) => `Anomalie médicale oubliée : un protocole physique sur-mesure lui a permis de disputer ${m} rencontres de très haut vol.`,
  (p, m) => `Les sceptiques annonçaient un fiasco physique, il leur a répondu sur le pré avec ${m} titularisations XXL et un leadership sans faille.`,
  (p, m) => `Le cardiologue du club avait hésité... résultat : un roc increvable présent sur ${m} batailles héroïques de bout en bout.`,
  (p, m) => `Suivi kiné millimétré et hygiène de vie irréprochable : il a transformé l'alerte médicale en une saison de référence avec ${m} matchs.`,
  (p, m) => `Tous les voyants étaient orange à la signature : il a pourtant aligné ${m} feuilles de match sans la moindre alerte ! Coup de génie.`,
  (p, m) => `Pari audacieux de la direction sportive : son corps a tenu le choc et il a été l'un des piliers incontournables (${m} apparitions).`,
  (p, m) => `Revenu d'un dossier médical complexe, il a fait taire les doutes avec ${m} matchs d'une régularité métronomique.`,
  (p, m) => `La visite médicale avait failli capoter à la dernière minute. Neuf mois plus tard, il figure parmi les meilleures recrues du club !`,
  (p, m) => `Préparation millimétrée par le staff : 0 blessure majeure et ${m} matchs pleins d'intensité. Une masterclass de gestion.`
];

function generatePlayerSeasonEvaluation(p, ctx = {}) {
  const isSucc = !!ctx.isSuccess;
  const isRel = !!ctx.isReligated;
  const tier = p.caliberTier || 'SOLID';
  const priceStr = p.agreedPrice ? p.agreedPrice.toFixed(1) + ' M€' : 'Gratuit';
  const pos = p.pos || 'MIL';

  const isAtt = pos === 'ATT' || ['BU', 'AG', 'AD'].includes(p.subPos);
  const isDef = pos === 'DEF' || ['DC', 'DG', 'DD'].includes(p.subPos);
  const isGar = pos === 'GAR' || p.subPos === 'GAR';

  // 1. CAS DRAME / FLOP RETENTISSANT (p.hadDramaFlop)
  if (p.hadDramaFlop) {
    const dramaTxt = ctx.dramaReason || 'crise de confiance majeure et clash retentissant avec le vestiaire';
    let narrative = '';
    if (isAtt) {
      narrative = `Saison cauchemardesque : <strong>${dramaTxt}</strong>. Seulement 2 petits buts inscrits et une mise à l'écart progressive par le staff.`;
    } else if (isDef || isGar) {
      narrative = `Le naufrage individuel : <strong>${dramaTxt}</strong>. Fébrile au duel et responsable direct de 7 buts concédés avant d'être rétrogradé sur le banc.`;
    } else {
      narrative = `Gros coup d'arrêt : <strong>${dramaTxt}</strong>. Son rendement a chuté vertigineusement au fil des semaines.`;
    }
    return {
      badgeLabel: '💔 Drame Sportif',
      badgeClass: 'bg-rose-950 text-rose-300 border-rose-800 font-bold',
      narrative
    };
  }

  // 2. CAS BLESSURE MAJEURE (p.wasInjured)
  if (p.wasInjured) {
    const matchesPlayed = 4 + Math.floor(Math.random() * 6);
    const injuryTemplate = INJURY_NARRATIVES[Math.floor(Math.random() * INJURY_NARRATIVES.length)];
    return {
      badgeLabel: '🚑 Saison Tronquée (Infirmerie)',
      badgeClass: 'bg-rose-950 text-rose-300 border-rose-800 font-bold',
      narrative: `Trahison physique : ${injuryTemplate(p, matchesPlayed)} Un investissement de <strong>${priceStr}</strong> passé en grande partie sous perfusion.`
    };
  }

  // 3. CAS SCANDALE EXTRA-SPORTIF (p.hadScandal)
  if (p.hadScandal) {
    const scandalTemplate = SCANDAL_NARRATIVES[Math.floor(Math.random() * SCANDAL_NARRATIVES.length)];
    return {
      badgeLabel: '🍸 Scandale Nocturne',
      badgeClass: 'bg-amber-950 text-amber-300 border-amber-800 font-bold',
      narrative: `Frasques en dehors des terrains : ${scandalTemplate(p)} Sanctionné par la direction, il a plombé l'ambiance du groupe.`
    };
  }

  // 4. CAS PARI MÉDICAL RÉUSSI (p.hadAnomaly)
  if (p.hadAnomaly && !p.wasInjured) {
    const matchesPlayed = 32 + Math.floor(Math.random() * 6);
    const tmpl = ANOMALY_SUCCESS_NARRATIVES[Math.floor(Math.random() * ANOMALY_SUCCESS_NARRATIVES.length)];
    const specificAnomaly = (p.anomalyData && p.anomalyData.title) ? ` (${p.anomalyData.title.replace('⚠️ ', '')})` : '';
    return {
      badgeLabel: '✨ Pari Médical Réussi',
      badgeClass: 'bg-emerald-950 text-emerald-300 border-emerald-600 font-bold',
      narrative: `${tmpl(p, matchesPlayed)}${specificAnomaly} Un investissement de <strong>${priceStr}</strong> 100% amorti.`
    };
  }

  // 5. CAS EXPLOIT HÉROÏQUE DU JOUEUR LOW-COST (p.hadExploit)
  if (p.hadExploit) {
    let stats = '';
    if (isAtt) stats = `<strong>${14 + Math.floor(Math.random() * 8)} buts</strong> et <strong>6 passes</strong>`;
    else if (isDef) stats = `<strong>${75 + Math.floor(Math.random() * 20)} tacles</strong> et <strong>12 clean sheets</strong>`;
    else if (isGar) stats = `<strong>112 arrêts</strong> et <strong>4 penaltys sortis</strong>`;
    else stats = `<strong>${88 + Math.floor(Math.random() * 8)}% de passes réussies</strong> et <strong>8 caviars</strong>`;

    return {
      badgeLabel: '🚀 Révélation de l\'Année',
      badgeClass: 'bg-emerald-950 text-emerald-300 border-emerald-500 font-extrabold shadow-sm',
      narrative: `Le casse du siècle ! Signé pour seulement <strong>${priceStr}</strong>, il s'est métamorphosé en titan : ${stats}. Véritable coqueluche des supporters !`
    };
  }

  // 6. JOUEUR AU RABAIS QUI A FLOPPÉ (CHEAP_WRONG sans exploit)
  if (tier === 'CHEAP_WRONG') {
    let narrative = '';
    if (isDef) {
      const fouls = 18 + Math.floor(Math.random() * 10);
      narrative = `Écart de niveau rédhibitoire : trop lent et dépassé par l'intensité de la division (<strong>${fouls} fautes grossières</strong> commises). Le piège du discount.`;
    } else if (isAtt) {
      const goals = Math.floor(Math.random() * 3);
      narrative = `Inoffensif : seulement <strong>${goals} but(s)</strong> en championnat. Complètement étouffé par les défenses rugueuses de l'élite.`;
    } else if (isGar) {
      narrative = `Fébrilité criante : fautif sur plusieurs sorties aériennes ratées, l'équipe a tremblé à chaque frappe cadrée adverse.`;
    } else {
      narrative = `Trop limité dans l'entrejeu : pressing inexistant, pertes de balle à répétition et relégué dans la hiérarchie dès l'automne.`;
    }
    return {
      badgeLabel: '❌ Flop Low-Cost',
      badgeClass: 'bg-red-950/80 text-rose-300 border-rose-800 font-bold',
      narrative
    };
  }

  // 7. PARI RISQUÉ (BARGAIN_RISK)
  if (tier === 'BARGAIN_RISK') {
    let narrative = '';
    if (isSucc) {
      narrative = `Rendement sur courant alternatif : quelques fulgurances décisives en première partie de saison, mais une régularité parfois déconcertante.`;
    } else {
      narrative = `Pari non concluant : trop intermittent pour porter l'équipe dans les moments durs. Son investissement défensif a laissé à désirer.`;
    }
    return {
      badgeLabel: '⚠️ Pari Contrasté',
      badgeClass: 'bg-amber-950/70 text-amber-300 border-amber-800 font-semibold',
      narrative
    };
  }

  // 8. JOUEUR DE ROTATION / DÉPANNAGE (MID_ROTATION)
  if (tier === 'MID_ROTATION') {
    const appearances = 14 + Math.floor(Math.random() * 12);
    let narrative = `Rôle de doublure tenu avec sérieux : <strong>${appearances} apparitions</strong> (souvent en sortie de banc). A apporté de la fraîcheur tactique sans fausse note.`;
    return {
      badgeLabel: '🔄 Doublure Utile',
      badgeClass: 'bg-blue-950 text-blue-300 border-blue-800',
      narrative
    };
  }

  // 9. TITULAIRE ÉPROUVÉ (SOLID)
  if (tier === 'SOLID') {
    const appearances = 30 + Math.floor(Math.random() * 7);
    let narrative = '';
    if (isSucc) {
      if (isAtt) {
        const goals = 10 + Math.floor(Math.random() * 6);
        narrative = `Fiabilité exemplaire : <strong>${appearances} matchs joués</strong>, <strong>${goals} buts</strong> et un sens du sacrifice salué par le coach.`;
      } else if (isDef) {
        const cleanSheets = 8 + Math.floor(Math.random() * 6);
        narrative = `Garde du corps de la défense : <strong>${appearances} titularisations</strong>, <strong>${cleanSheets} clean sheets</strong> et une solidité au duel rassurante.`;
      } else {
        narrative = `Régularité de métronome : <strong>${appearances} apparitions</strong> d'un niveau constant. La colonne vertébrale du collectif.`;
      }
    } else {
      narrative = `A lutté avec honneur : <strong>${appearances} matchs</strong> disputés avec combativité, mais n'a pas pu enrayer à lui seul les défaillances collectives de l'équipe.`;
    }

    return {
      badgeLabel: '🛡️ Titulaire Fiable',
      badgeClass: 'bg-emerald-950/70 text-emerald-300 border-emerald-700/60 font-semibold',
      narrative
    };
  }

  // 10. SUPERSTAR / TOP RECRUE (TOP_TARGET)
  if (tier === 'TOP_TARGET') {
    let narrative = '';
    if (isSucc) {
      if (isAtt) {
        const goals = 18 + Math.floor(Math.random() * 12);
        const assists = 5 + Math.floor(Math.random() * 6);
        narrative = `Maestro offensif : <strong>${goals} buts</strong> et <strong>${assists} passes</strong> ! A justifié chaque centime de ses <strong>${priceStr}</strong> en marchant sur la ligue.`;
      } else if (isDef) {
        const cleanSheets = 12 + Math.floor(Math.random() * 6);
        narrative = `Le roc des grands soirs : <strong>${cleanSheets} clean sheets</strong> et patron absolu de la ligne arrière. Infranchissable dans les chocs au sommet.`;
      } else {
        narrative = `Chef d'orchestre d'exception : a dicté le tempo de toute la saison, élu parmi les meilleurs joueurs du championnat.`;
      }
    } else {
      if (isAtt) {
        const goals = 11 + Math.floor(Math.random() * 4);
        narrative = `Trop esseulé : auteur de <strong>${goals} buts</strong> de classe, mais ses exploits individuels n'ont pas suffi à compenser les errances du reste de l'effectif.`;
      } else {
        narrative = `Le seul à tenir son rang : a surnagé dans le naufrage de l'équipe, tentant sans relâche de sonner la révolte.`;
      }
    }

    return {
      badgeLabel: '⭐ Recrue Phare (XXL)',
      badgeClass: 'bg-amber-950 text-amber-200 border-amber-400 font-extrabold shadow-sm',
      narrative
    };
  }

  // WILDCARD / AUTRES
  return {
    badgeLabel: '🔄 Profil Complément',
    badgeClass: 'bg-gray-800 text-gray-300 border-gray-700',
    narrative: `A fait le métier en apportant une solution tactique d'appoint lors des rotations d'effectif.`
  };
}

function runSeasonSimulation() {
  const progressBar = document.getElementById('sim-progress-bar');
  const matchdayEl = document.getElementById('sim-matchday');
  const tickerIcon = document.getElementById('sim-ticker-icon');
  const tickerText = document.getElementById('sim-ticker-text');
  const virtualRankEl = document.getElementById('sim-virtual-rank');
  const virtualPointsEl = document.getElementById('sim-virtual-points');

  if (currentSimInterval) clearInterval(currentSimInterval);
  currentSimMatchday = 0;
  currentSimSpeed = 480;
  isCrisisActive = false;
  currentCrisis = null;
  if (currentCrisisInterval) {
    clearInterval(currentCrisisInterval);
    currentCrisisInterval = null;
  }

  // Base points in a 38-game season by difficulty tier (calibré pour réduire le taux de victoires faciles)
  let basePoints = 46;
  if (activeScenario.difficulty === 'facile') basePoints = 71;
  if (activeScenario.difficulty === 'moyen') basePoints = 46;
  if (activeScenario.difficulty === 'difficile') basePoints = 30;

  const neededPositions = activeScenario.needs || [];
  const usedPlayerIds = new Set();
  let filledCount = 0;
  let caliberPointsDelta = 0;
  let tacticalSynergyDelta = 0;
  let lowCostCount = 0;
  let topPlayerCount = 0;

  // Aléas spéciaux : Exploit inattendu ou Drame / Flop imprévu
  let exploitPlayer = null;
  let exploitReason = '';
  let dramaFlopPlayer = null;
  let dramaReason = '';
  let anyInjuredPlayer = null;
  let anyScandalPlayer = null;

  currentSignedPlayers.forEach(p => {
    p.wasInjured = false;
    p.hadScandal = false;
    p.hadExploit = false;
    p.hadDramaFlop = false;

    const tier = p.caliberTier || 'SOLID';
    let playerImpact = 0;

    if (tier === 'TOP_TARGET') {
      topPlayerCount++;
      // Leader d'équipe ou Star : impact modéré et réaliste (+3 à +4 pts)
      // Risque de Drame/Flop imprévu (~10% de chance)
      if (Math.random() < 0.10) {
        p.hadDramaFlop = true;
        dramaFlopPlayer = p;
        const dramas = [
          'Rupture des ligaments croisés à l\'automne et saison terminée',
          'Clash explosif avec le vestiaire et mise à l\'écart',
          'Crise de confiance aiguë et méforme totale'
        ];
        dramaReason = dramas[Math.floor(Math.random() * dramas.length)];
        playerImpact = -5;
      } else {
        playerImpact = 3 + (Math.random() < 0.5 ? 1 : 0); // +3 à +4 pts
      }

    } else if (tier === 'SOLID') {
      // Titulaire solide de D1 : régulier (+1 à +2 pts)
      if (Math.random() < 0.07) {
        p.hadDramaFlop = true;
        if (!dramaFlopPlayer) {
          dramaFlopPlayer = p;
          dramaReason = 'Pression trop lourde et baisse de régime continuelle';
        }
        playerImpact = -3;
      } else {
        playerImpact = 1 + (Math.random() < 0.5 ? 1 : 0); // +1 ou +2 pts
      }

    } else if (tier === 'MID_ROTATION') {
      // Joueur de rotation / banc (+1 pt)
      playerImpact = 1;

    } else if (tier === 'BARGAIN_RISK') {
      // Pari risqué : peut rapporter un peu (+1) ou décevoir (0)
      playerImpact = Math.random() < 0.40 ? 1 : 0;

    } else if (tier === 'CHEAP_WRONG') {
      // DÉPANNAGE AU RABAIS (LE PIÈGE DU LOW-COST !)
      // Normalement malus de niveau (-3 pts)
      // Exploit très rare (~5% de chance)
      if (Math.random() < 0.05) {
        p.hadExploit = true;
        exploitPlayer = p;
        exploitReason = `Acheté pour seulement ${p.agreedPrice.toFixed(1)} M€, il s'est transcendé et devient la révélation de la ligue !`;
        playerImpact = 7; // +7 pts héroïques
      } else {
        lowCostCount++;
        playerImpact = -3; // Malus de niveau : trop limité pour la division
      }

    } else {
      // Wildcard
      playerImpact = 1;
    }

    // Adéquation tactique avec la philosophie du coach (Traits existants)
    if (p.traits.some(t => (activeScenario.preferredTraits || []).includes(t))) {
      tacticalSynergyDelta += 2;
      p.isTacticalFit = true;
    }
    if (p.traits.some(t => (activeScenario.forbiddenTraits || []).includes(t))) {
      tacticalSynergyDelta -= 3;
      p.isTacticalMisfit = true;
    }

    // SYNERGIE OU DISSONANCE DE L'ARCHÉTYPE AVEC LA PHILOSOPHIE DU COACH
    if (p.archetype) {
      const coachPhilo = activeScenario.tacticalPhilosophy || '';
      const isFit = typeof checkPhilosophyMatch === 'function' && checkPhilosophyMatch(p.archetype.preferredPhilosophy, coachPhilo);
      const isMisfit = typeof checkPhilosophyMatch === 'function' && checkPhilosophyMatch(p.archetype.misfitPhilosophy, coachPhilo);
      if (isFit) {
        tacticalSynergyDelta += 2;
        p.isArchetypeFit = true;
      } else if (isMisfit) {
        tacticalSynergyDelta -= 3;
        p.isArchetypeMisfit = true;
      }
    }

    // ALÉAS ET BONUS DU PROFIL PSYCHOLOGIQUE
    if (p.psychology) {
      const pCode = p.psychology.code;
      if (pCode === 'GENIE_TOXIQUE' && Math.random() < 0.28) {
        tacticalSynergyDelta -= 3;
        p.hadPsychologyEvent = 'Clash de vestiaire provoqué par son ego';
      } else if (pCode === 'PARI_MEDICAL' && Math.random() < 0.35) {
        p.wasInjured = true;
        playerImpact -= 4;
        if (!anyInjuredPlayer) anyInjuredPlayer = p;
      } else if (pCode === 'TETE_BRULEE' && Math.random() < 0.30) {
        tacticalSynergyDelta -= 2;
        p.hadPsychologyEvent = 'Cartons rouges et suspensions à répétition';
      } else if (pCode === 'LEADER_EXEMPLAIRE') {
        tacticalSynergyDelta += 1;
      } else if (pCode === 'SOLDAT_COLLECTIF') {
        tacticalSynergyDelta += 1;
      } else if (pCode === 'MERCENAIRE_FROID' && activeScenario.difficulty === 'difficile' && Math.random() < 0.25) {
        tacticalSynergyDelta -= 2;
        p.hadPsychologyEvent = 'Démotivation dans la course au maintien';
      }
    }

    // Règle d'âge de la philosophie du club
    if (activeScenario.targetAgeRule === 'u21' && p.age <= 21) {
      tacticalSynergyDelta += 2;
    } else if (activeScenario.targetAgeRule === 'mature' && p.age >= 26) {
      tacticalSynergyDelta += 2;
    }

    // Risques de traits individuels (Genou en cristal & Fêtard)
    if (p.traits.includes('Genou en cristal') && Math.random() < 0.40) {
      p.wasInjured = true;
      playerImpact -= 4;
      if (!anyInjuredPlayer) anyInjuredPlayer = p;
    }
    if (p.traits.includes('Fêtard invétéré') && Math.random() < 0.35) {
      p.hadScandal = true;
      playerImpact -= 3;
      if (!anyScandalPlayer) anyScandalPlayer = p;
    }

    caliberPointsDelta += playerImpact;
  });

  // Détermination d'une éventuelle CRISE MAJEURE durant la saison (10 Scénarios)
  let plannedCrisis = null;
  const diff = activeScenario.difficulty || 'moyen';

  // Taux de base : Facile ~6% | Moyen ~12% | Difficile ~25%
  let crisisChance = diff === 'difficile' ? 0.25 : (diff === 'moyen' ? 0.12 : 0.06);
  if (diff === 'difficile' && currentRemainingBudget < 0.6) crisisChance += 0.05;
  if (lowCostCount >= 2) crisisChance += 0.05;

  if (Math.random() < crisisChance) {
    const eligibleCrises = CRISIS_SCENARIOS_DB.filter(c => c.difficulties.includes(diff));
    if (eligibleCrises.length > 0) {
      const picked = eligibleCrises[Math.floor(Math.random() * eligibleCrises.length)];
      const failRate = picked.failureRate[diff] !== undefined ? picked.failureRate[diff] : 0.40;
      const isGameOver = Math.random() < failRate;
      const matchdayTrigger = 16 + Math.floor(Math.random() * 14); // Entre J16 et J29

      plannedCrisis = {
        ...picked,
        matchday: matchdayTrigger,
        isGameOver: isGameOver
      };
    }
  }

  // Couverture des 3 postes exigés par le coach
  neededPositions.forEach(need => {
    const match = currentSignedPlayers.find(p => !usedPlayerIds.has(p.id) && checkPlayerFulfillsNeed(p, need));
    if (match) {
      filledCount++;
      usedPlayerIds.add(match.id);
    } else {
      // Poste prioritaire manquant : déficit criant de profondeur (-5 pts)
      caliberPointsDelta -= 5;
    }
  });

  // Respect de la consigne de provenance / filière du coach
  let hasFulfilledOrigin = true;
  let matchingOriginPlayer = null;
  const originConstraint = activeScenario.originConstraint;
  if (originConstraint && originConstraint.code !== 'FREE' && currentSignedPlayers.length > 0) {
    matchingOriginPlayer = currentSignedPlayers.find(p => checkPlayerFulfillsOrigin(p, originConstraint, activeScenario));
    if (matchingOriginPlayer) {
      tacticalSynergyDelta += 3;
      hasFulfilledOrigin = true;
    } else {
      tacticalSynergyDelta -= 2;
      hasFulfilledOrigin = false;
    }
  }

  // Score projeté équilibré et calibré (exigeant et serré)
  let targetUserPoints = Math.round(basePoints + caliberPointsDelta + tacticalSynergyDelta + (Math.random() * 2.5 - 1));
  if (activeScenario.difficulty === 'difficile') {
    targetUserPoints = Math.max(16, Math.min(48, targetUserPoints));
  } else if (activeScenario.difficulty === 'moyen') {
    targetUserPoints = Math.max(28, Math.min(74, targetUserPoints));
  } else {
    targetUserPoints = Math.max(50, Math.min(94, targetUserPoints));
  }

  // Setup the 19 rival clubs with tailored target points matching the scenario's league
  const rivalsPool = getLeagueRivalsPool(activeScenario);

  const leagueTitleEl = document.getElementById('sim-mini-standings-title');
  if (leagueTitleEl) {
    leagueTitleEl.textContent = `${activeScenario.flag || '🏆'} ${activeScenario.league || 'Ligue'} en direct`;
  }

  let matchday = 0;
  let userPoints = 0;
  const rivals = rivalsPool.map(r => ({ ...r, points: 0 }));

  // Probabilities per match
  const userProbWin = Math.max(0.04, Math.min(0.82, (targetUserPoints / 38 - 0.25) / 3));
  const probDraw = 0.25;

  // Build dynamic ticker events (avec Exploit ou Drame si déclenchés !)
  const recruit1 = currentSignedPlayers[0];
  const recruit2 = currentSignedPlayers[1];
  const dynamicTicker = [];

  dynamicTicker.push({
    j: 3,
    icon: '⚽',
    text: recruit1 
      ? `J3 : Premiers pas de ${recruit1.name} sous ses nouvelles couleurs sous les yeux des supporters.`
      : `J3 : L'équipe démarre sans renfort de la Deadline Day, le vestiaire est sous tension.`
  });

  if (dramaFlopPlayer) {
    dynamicTicker.push({
      j: 12,
      icon: '💔',
      text: `J12 : COUP DE TONNERRE ! ${dramaFlopPlayer.name} : ${dramaReason} ! Le vestiaire est abasourdi.`
    });
  } else if (anyScandalPlayer) {
    dynamicTicker.push({
      j: 12,
      icon: '🍸',
      text: `J12 : SCANDALE NOCTURNE ! ${anyScandalPlayer.name} a été filmé en boîte de nuit à 4h30 avant un match capital...`
    });
  } else if (recruit1 && recruit2) {
    dynamicTicker.push({
      j: 12,
      icon: '🤝',
      text: `J12 : Belle alchimie ! La complicité entre ${recruit1.name} et ${recruit2.name} porte ses fruits tactiques.`
    });
  }

  if (exploitPlayer) {
    dynamicTicker.push({
      j: 22,
      icon: '🚀',
      text: `J22 : RÉVÉLATION DE L'ANNÉE ! Recruté pour des miettes (${exploitPlayer.agreedPrice.toFixed(1)} M€), ${exploitPlayer.name} est en fusion et porte l'équipe !`
    });
  } else if (lowCostCount >= 2) {
    dynamicTicker.push({
      j: 22,
      icon: '⚠️',
      text: `J22 : Limites criantes ! Les recrues au rabais peinent à suivre l'intensité de la division. L'équipe prend l'eau.`
    });
  } else if (anyInjuredPlayer) {
    const injuryTickerFn = INJURY_TICKER_TEXTS[Math.floor(Math.random() * INJURY_TICKER_TEXTS.length)];
    dynamicTicker.push({
      j: 22,
      icon: '🚑',
      text: injuryTickerFn(anyInjuredPlayer)
    });
  } else if (targetUserPoints >= (activeScenario.difficulty === 'difficile' ? 36 : (activeScenario.difficulty === 'moyen' ? 58 : 78))) {
    dynamicTicker.push({
      j: 22,
      icon: '🧠',
      text: `J22 : "Le coup de maître" titre la presse ! L'équipe enchaîne une série de résultats remarquables.`
    });
  } else {
    dynamicTicker.push({
      j: 22,
      icon: '⚔️',
      text: `J22 : Combat acharné chaque week-end ! L'équipe s'arrache pour chaque point.`
    });
  }

  dynamicTicker.push({
    j: 31,
    icon: '⚡',
    text: `J31 : Sprint final irrespirable ! La lutte au classement est à son comble, chaque point vaut de l'or.`
  });

  dynamicTicker.push({
    j: 38,
    icon: '🏁',
    text: `J38 : Fin du championnat ! Les supporters et la direction attendent le débriefing.`
  });

  currentSimStepFn = (isInstant = false) => {
    matchday++;
    currentSimMatchday = matchday;
    const pct = Math.round((matchday / 38) * 100);
    progressBar.style.width = `${pct}%`;
    matchdayEl.textContent = `Journée ${matchday} / 38`;

    // Interruption d'urgence par une crise majeure de mi-saison !
    if (plannedCrisis && matchday === plannedCrisis.matchday && !isCrisisActive) {
      currentCrisisSimMeta = {
        exploitPlayer,
        exploitReason,
        dramaFlopPlayer,
        dramaReason,
        lowCostCount,
        topPlayerCount,
        tacticalSynergyDelta,
        hasFulfilledOrigin,
        matchingOriginPlayer,
        originConstraint
      };
      currentCrisisUserPoints = userPoints;
      currentCrisisFilledCount = filledCount;

      triggerCrisisEvent(plannedCrisis, isInstant);
      return;
    }

    // Roll user match
    const r = Math.random();
    if (r < userProbWin) {
      userPoints += 3;
    } else if (r < userProbWin + probDraw) {
      userPoints += 1;
    }

    // Roll rival matches
    rivals.forEach(riv => {
      const rivProbWin = Math.max(0.04, Math.min(0.82, (riv.target / 38 - 0.25) / 3));
      const rRiv = Math.random();
      if (rRiv < rivProbWin) {
        riv.points += 3;
      } else if (rRiv < rivProbWin + probDraw) {
        riv.points += 1;
      }
    });

    // Real rank
    const rank = rivals.filter(riv => riv.points > userPoints).length + 1;
    virtualRankEl.textContent = `${rank}e / 20`;
    virtualPointsEl.textContent = `(${userPoints} pts)`;

    // Update Live Mini-Standings Widget
    const miniStandingsEl = document.getElementById('sim-mini-standings');
    const miniMatchdayEl = document.getElementById('sim-mini-standings-matchday');
    if (miniMatchdayEl) miniMatchdayEl.textContent = `J${matchday} / 38`;

    if (miniStandingsEl) {
      const allClubs = [
        { name: activeScenario.club, points: userPoints, isUser: true },
        ...rivals.map(r => ({ name: r.name, points: r.points, isUser: false }))
      ];
      allClubs.sort((a, b) => b.points - a.points || (a.isUser ? -1 : 1));

      const userIdx = allClubs.findIndex(c => c.isUser);
      let startIdx = Math.max(0, userIdx - 2);
      let endIdx = Math.min(allClubs.length, startIdx + 5);
      if (endIdx - startIdx < 5) {
        startIdx = Math.max(0, endIdx - 5);
      }
      const visibleClubs = allClubs.slice(startIdx, endIdx);

      miniStandingsEl.innerHTML = visibleClubs.map(c => {
        const cRank = allClubs.indexOf(c) + 1;
        if (c.isUser) {
          return `
            <div class="flex items-center justify-between bg-amber-400/20 border border-amber-400/70 text-amber-300 font-bold px-3 py-1.5 rounded-xl shadow-md transition-all">
              <div class="flex items-center gap-2">
                <span class="w-7 text-center font-mono font-extrabold text-amber-400">${cRank}e</span>
                <span class="truncate max-w-[170px] sm:max-w-[220px]">${c.name}</span>
                <span class="text-[9px] bg-amber-400 text-black px-1.5 py-0.5 rounded font-extrabold uppercase">VOUS</span>
              </div>
              <span class="font-mono font-extrabold text-amber-300">${c.points} pts</span>
            </div>
          `;
        }

        let rankColor = 'text-gray-400';
        if (cRank <= 4) rankColor = 'text-emerald-400 font-bold';
        else if (cRank >= 18) rankColor = 'text-rose-400 font-bold';

        return `
          <div class="flex items-center justify-between bg-gray-900/60 border border-gray-800 text-gray-300 px-3 py-1 rounded-lg transition-all">
            <div class="flex items-center gap-2">
              <span class="w-7 text-center font-mono ${rankColor}">${cRank}e</span>
              <span class="truncate max-w-[170px] sm:max-w-[220px] text-gray-300">${c.name}</span>
            </div>
            <span class="font-mono text-gray-400">${c.points} pts</span>
          </div>
        `;
      }).join('');
    }

    const ev = dynamicTicker.find(e => e.j === matchday);
    if (ev) {
      tickerIcon.textContent = ev.icon;
      tickerText.textContent = ev.text;
      if (!isInstant) audio.play('sms_in');
    }

    if (matchday >= 38) {
      if (currentSimInterval) {
        clearInterval(currentSimInterval);
        currentSimInterval = null;
      }
      currentSimStepFn = null;
      const delay = isInstant ? 50 : 800;
      setTimeout(() => {
        showRecapScreen(userPoints, rank, filledCount, neededPositions.length, {
          exploitPlayer,
          exploitReason,
          dramaFlopPlayer,
          dramaReason,
          lowCostCount,
          topPlayerCount,
          tacticalSynergyDelta,
          hasFulfilledOrigin,
          matchingOriginPlayer,
          originConstraint
        });
      }, delay);
    }
  };

  currentSimInterval = setInterval(() => currentSimStepFn(false), currentSimSpeed);
}

// ==============================================================
// 8. BILAN FINAL AVEC NARRATIVE ET ÉVALUATION RIGOUREUSE
// ==============================================================

function showRecapScreen(points, finalRank, filledCount, totalNeeded, simMeta = {}) {
  audio.init();

  const {
    exploitPlayer,
    exploitReason,
    dramaFlopPlayer,
    dramaReason,
    lowCostCount = 0,
    topPlayerCount = 0,
    crisisGameOver = null,
    tacticalSynergyDelta = 0,
    hasFulfilledOrigin = true,
    matchingOriginPlayer = null,
    originConstraint = null
  } = simMeta;

  const outcomeBanner = document.getElementById('recap-outcome-banner');
  const outcomeIcon = document.getElementById('recap-outcome-icon');
  const outcomeTitle = document.getElementById('recap-outcome-title');
  const outcomeSub = document.getElementById('recap-outcome-sub');
  const finalRankEl = document.getElementById('recap-final-rank');
  const managerScoreEl = document.getElementById('recap-manager-score');
  const starsEl = document.getElementById('recap-stars');
  const coachCritiqueEl = document.getElementById('recap-coach-critique');
  const signingsContainer = document.getElementById('recap-signings-report');

  showScreen('screen-recap');

  // GESTION DU GAME OVER PAR CRISE MAJEURE (FAILLITE, DNCG, DISQUALIFICATION, ETC.)
  if (crisisGameOver) {
    audio.play('fail');
    outcomeBanner.className = 'p-6 rounded-2xl border-2 border-rose-600 bg-gradient-to-b from-rose-950/60 to-black text-center mb-6 text-rose-400 shadow-[0_0_40px_rgba(225,29,72,0.3)]';
    outcomeIcon.textContent = '💀';
    outcomeTitle.textContent = 'CRISE FATALE : SAISON AVORTÉE !';
    outcomeSub.textContent = `Interruption définitive à la J${crisisGameOver.matchday} suite à : "${crisisGameOver.title}". Le club est disqualifié et votre mandat prend fin prématurément.`;

    finalRankEl.textContent = `DISQUALIFIÉ (J${crisisGameOver.matchday})`;
    starsEl.textContent = '❌ 0 Étoile (Saison Avortée)';
    managerScoreEl.textContent = `F (0%)`;

    coachCritiqueEl.className = 'mb-6 bg-rose-950/40 border border-rose-500/50 p-4 rounded-xl text-xs leading-relaxed text-rose-300';
    coachCritiqueEl.innerHTML = `
      <strong class="font-bold text-rose-400 block mb-1 text-sm">📰 ÉDITION SPÉCIALE : "Séisme à ${activeScenario.club} !"</strong>
      <p class="mb-2.5">${crisisGameOver.pressReport}</p>
      <div class="mt-2.5 p-3 bg-black/60 border border-rose-600/40 rounded-xl text-rose-200">
        💀 <strong>SANCTION ADMINISTRATIVE IRRÉVOCABLE :</strong> ${crisisGameOver.fatalVerdict}
      </div>
    `;

    if (signingsContainer) {
      if (currentSignedPlayers.length === 0) {
        signingsContainer.innerHTML = `
          <p class="text-xs text-rose-400 italic bg-rose-950/20 p-3 rounded-xl border border-rose-900/40">
            ⚠️ Zéro signature sur cette Deadline Day. Le groupe n'a pas été renouvelé.
          </p>
        `;
      } else {
        signingsContainer.innerHTML = currentSignedPlayers.map(p => `
          <div class="p-3 bg-gray-900/70 border border-gray-800 rounded-xl text-xs flex items-center justify-between">
            <div>
              <span class="font-bold text-gray-200 block">${p.name} (${p.subPos || p.pos})</span>
              <span class="text-[10px] text-gray-400">${p.club} • Contrat suspendu suite à la crise</span>
            </div>
            <span class="font-mono font-bold text-rose-400">${p.agreedPrice.toFixed(1)} M€</span>
          </div>
        `).join('');
      }
    }
    return;
  }

  const isDauphinSuccess = (activeScenario.difficulty === 'facile' && finalRank <= 2 && points >= 80);
  const isSuccess = (finalRank <= activeScenario.targetRank) || isDauphinSuccess;

  finalRankEl.textContent = `${finalRank}e / 20 (${points} pts)`;

  let stars = 1;
  let scorePct = 70;
  let grade = 'B';

  if (isSuccess) {
    audio.play('deal_signed');
    outcomeBanner.className = 'p-6 rounded-2xl border border-emerald-500/50 bg-emerald-950/30 text-center mb-6 text-emerald-400';
    outcomeIcon.textContent = '🏆';
    outcomeTitle.textContent = isDauphinSuccess && finalRank > activeScenario.targetRank ? 'PODIUM & QUALIFICATION C1 !' : 'MISSION ACCOMPLIE !';
    outcomeSub.textContent = `Félicitations ! Vous terminez ${finalRank}e avec ${points} points et validez l'objectif : "${activeScenario.objective}".`;

    const targetRank = activeScenario.targetRank || 10;
    const rankGain = targetRank - finalRank; // Ex: objectif 14e, termine 8e => rankGain = +6

    // CRITÈRES TRÈS EXIGEANTS POUR DÉCROCHER LES 3 ÉTOILES ⭐⭐⭐ (Rare ~10-15%)
    const isFlawlessMercato = (filledCount >= totalNeeded) && (lowCostCount === 0) && (!dramaFlopPlayer) && (tacticalSynergyDelta >= 1);
    const isMajorChampion = (finalRank === 1);
    const isSurprisePodium = (finalRank <= 3 && targetRank >= 6);
    const isCrushedObjective = (rankGain >= 4 && points >= (activeScenario.difficulty === 'difficile' ? 44 : (activeScenario.difficulty === 'moyen' ? 62 : 84)));
    const isDominantTop = (targetRank <= 2 && finalRank <= targetRank && points >= 86);

    const qualifiesFor3Stars = !!exploitPlayer || (isFlawlessMercato && topPlayerCount >= 1 && (isMajorChampion || isSurprisePodium || isCrushedObjective || isDominantTop));

    // CRITÈRES POUR LES 2 ÉTOILES ⭐⭐ (Exige 100% des postes comblés)
    const qualifiesFor2Stars = (
      (rankGain >= 2 || (targetRank <= 4 && finalRank <= targetRank) || isDauphinSuccess) &&
      (filledCount >= totalNeeded) &&
      (lowCostCount <= 1) &&
      (!dramaFlopPlayer)
    );

    if (qualifiesFor3Stars) {
      stars = 3;
      scorePct = 94 + Math.floor(Math.random() * 6);
      grade = 'A+';
      coachCritiqueEl.className = 'mb-6 bg-emerald-950/30 border border-emerald-500/40 p-4 rounded-xl text-xs leading-relaxed text-emerald-300';
      
      if (exploitPlayer) {
        coachCritiqueEl.innerHTML = `
          <strong class="font-bold text-emerald-400 block mb-1">🗣️ Bilan du Coach : "Le Coup de Génie du Siècle (3 Étoiles ⭐⭐⭐) !"</strong>
          "Personne n'y croyait... Votre recrue à bas coût <strong>${exploitPlayer.name}</strong> (${exploitPlayer.agreedPrice.toFixed(1)} M€) s'est transcendée pour devenir la sensation absolue de la saison ! L'équipe a survolé les débats avec ${points} points !"
          <div class="mt-2.5 p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300">
            🚀 <strong>RÉVÉLATION HISTORIQUE :</strong> ${exploitPlayer.name} a déjoué tous les pronostics et fait exploser notre plafond de verre !
          </div>
        `;
      } else if (isMajorChampion) {
        coachCritiqueEl.innerHTML = `
          <strong class="font-bold text-emerald-400 block mb-1">🗣️ Bilan du Coach : "CHAMPIONS ! Une Saison dans la Légende (3 Étoiles ⭐⭐⭐) !"</strong>
          "Quel accomplissement monumental ! Nous terminons 1er du championnat avec ${points} points. Votre mercato a été un sans-faute chirurgical : leadership, profondeur et alchimie totale sur le terrain !"
        `;
      } else if (isSurprisePodium) {
        coachCritiqueEl.innerHTML = `
          <strong class="font-bold text-emerald-400 block mb-1">🗣️ Bilan du Coach : "Podium Inattendu & Qualification C1 (3 Étoiles ⭐⭐⭐) !"</strong>
          "Un exploit retentissant ! Alors que nous visions simplement le maintien ou le ventre mou (${targetRank}e), l'équipe termine ${finalRank}e (${points} pts) et décroche l'Europe grâce à des recrues de tout premier ordre !"
        `;
      } else {
        coachCritiqueEl.innerHTML = `
          <strong class="font-bold text-emerald-400 block mb-1">🗣️ Bilan du Coach : "Masterclass Stratégique (3 Étoiles ⭐⭐⭐) !"</strong>
          "Recrutement d'orfèvre. Vos choix de calibres supérieurs ont totalement métamorphosé notre jeu collectif. L'équipe termine ${finalRank}e (${points} pts) en pulvérisant les attentes du conseil d'administration !"
        `;
      }

    } else if (qualifiesFor2Stars) {
      stars = 2;
      scorePct = 82 + Math.floor(Math.random() * 8);
      grade = 'A';
      coachCritiqueEl.className = 'mb-6 bg-emerald-950/30 border border-emerald-500/40 p-4 rounded-xl text-xs leading-relaxed text-emerald-300';
      
      if (isDauphinSuccess && finalRank > activeScenario.targetRank) {
        coachCritiqueEl.innerHTML = `
          <strong class="font-bold text-emerald-400 block mb-1">🗣️ Bilan du Coach : "Dauphin Héroïque & Podium Européen (2 Étoiles ⭐⭐) !"</strong>
          "Nous finissons 2e avec un total magistral de ${points} points ! Même si le titre nous échappe d'un souffle face à un rival en surrégime, notre saison est éclatante et nous validons notre billet direct pour la Ligue des Champions !"
        `;
      } else {
        coachCritiqueEl.innerHTML = `
          <strong class="font-bold text-emerald-400 block mb-1">🗣️ Bilan du Coach : "Très Bon Mercato & Objectif Rempli (2 Étoiles ⭐⭐) !"</strong>
          "L'équipe avait la solidité requise. Vos recrues ont apporté le supplément de consistance nécessaire pour aller chercher cette ${finalRank}e place (${points} pts). Mission accomplie avec maîtrise !"
        `;
      }

    } else {
      // 1 ÉTOILE ⭐ : Objectif validé mais sur le fil ou avec des lacunes évidentes
      stars = 1;
      scorePct = 71 + Math.floor(Math.random() * 7);
      grade = 'B';
      coachCritiqueEl.className = 'mb-6 bg-amber-950/30 border border-amber-500/40 p-4 rounded-xl text-xs leading-relaxed text-amber-300';

      if (dramaFlopPlayer) {
        coachCritiqueEl.innerHTML = `
          <strong class="font-bold text-amber-400 block mb-1">🗣️ Bilan du Coach : "Sauvetage Héroïque malgré le Coup du Sort (1 Étoile ⭐) !"</strong>
          "Notre recrue phare ${dramaFlopPlayer.name} a été victime d'un coup dur (${dramaReason}), mais le groupe a fait bloc pour arracher cette ${finalRank}e place (${points} pts). L'objectif est validé dans la douleur !"
          <div class="mt-2.5 p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-200 text-[11px]">
            ⚠️ L'équipe a compensé le manque de rendement de la recrue vedette par un courage exemplaire.
          </div>
        `;
      } else if (lowCostCount >= 2) {
        coachCritiqueEl.innerHTML = `
          <strong class="font-bold text-amber-400 block mb-1">🗣️ Bilan du Coach : "Objectif Validé... Mais Trop Limite (1 Étoile ⭐) !"</strong>
          "L'effectif a tenu bon pour terminer ${finalRank}e (${points} pts), mais votre pari sur des recrues discount a failli nous coûter cher. Les limites techniques étaient criantes face aux équipes du haut de tableau."
          <div class="mt-2.5 p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-200 text-[11px]">
            ⚠️ <strong>BRICOLAGE :</strong> Plusieurs joueurs au rabais ont manqué d'impact pour viser plus haut.
          </div>
        `;
      } else if (filledCount < totalNeeded) {
        coachCritiqueEl.innerHTML = `
          <strong class="font-bold text-amber-400 block mb-1">🗣️ Bilan du Coach : "Des Trous dans l'Effectif Comblés au Courage (1 Étoile ⭐) !"</strong>
          "Nous finissons ${finalRank}e (${points} pts) et l'objectif est atteint. Cependant, ne pas avoir signé de joueur sur tous les postes prioritaires demandés nous a obligés à bricoler toute la saison."
        `;
      } else if (tacticalSynergyDelta < 0) {
        coachCritiqueEl.innerHTML = `
          <strong class="font-bold text-amber-400 block mb-1">🗣️ Bilan du Coach : "Dissonance Tactique & Résultats Poussifs (1 Étoile ⭐) !"</strong>
          "L'objectif est validé (${finalRank}e, ${points} pts), mais certaines recrues ne correspondaient pas du tout à l'identité de jeu voulue. Le collectif a manqué de fluidité."
        `;
      } else {
        coachCritiqueEl.innerHTML = `
          <strong class="font-bold text-amber-400 block mb-1">🗣️ Bilan du Coach : "Objectif Validé sur le Fil (1 Étoile ⭐) !"</strong>
          "C'était irrespirable jusqu'au bout ! Nous finissons ${finalRank}e avec ${points} points, tout juste à hauteur de notre objectif (${targetRank}e). La marge de manœuvre était infime, il faudra viser plus d'envergure au prochain mercato !"
        `;
      }
    }
  } else {
    audio.play('fail');
    const isReligated = finalRank >= 17;
    const isNarrowMiss = finalRank <= activeScenario.targetRank + 2;

    outcomeBanner.className = 'p-6 rounded-2xl border border-rose-500/50 bg-rose-950/30 text-center mb-6 text-rose-400';
    outcomeIcon.textContent = isReligated ? '💀' : '❌';
    outcomeTitle.textContent = isReligated ? 'RELÉGUÉ EN DIVISION INFÉRIEURE !' : 'OBJECTIF NON ATTEINT...';
    outcomeSub.textContent = `Vous terminez ${finalRank}e avec seulement ${points} pts (objectif exigé : ${activeScenario.targetRank}e). La direction est furieuse.`;

    stars = 0;
    scorePct = Math.max(30, Math.min(62, Math.round((points / 60) * 100)));
    grade = scorePct >= 50 ? 'C' : 'D';

    coachCritiqueEl.className = 'mb-6 bg-rose-950/30 border border-rose-500/40 p-4 rounded-xl text-xs leading-relaxed text-rose-300';

    if (lowCostCount >= 2 && !exploitPlayer) {
      // ÉCHEC DU AU LOW-COST / RECRU AU RABAIS
      coachCritiqueEl.innerHTML = `
        <strong class="font-bold text-rose-400 block mb-1">🗣️ Bilan du Coach : "Le Piège du Low-Cost !"</strong>
        "Vous avez voulu faire des économies de bouts de chandelle en empilant des joueurs au rabais qui n'avaient absolument pas le niveau requis pour cette division ! L'équipe a coulé dès l'automne. C'est impardonnable !"
        <div class="mt-2.5 p-2.5 bg-rose-500/20 border border-rose-500/30 rounded-lg text-rose-200">
          ⚠️ <strong>NIVEAU INSUFFISANT :</strong> Vos recrues discount n'ont pas fait le poids face aux cadors de la ligue.
        </div>
      `;
    } else if (dramaFlopPlayer) {
      // COUP DU SORT : RECRUE PHARE TOUCHÉE PAR UN DRAME
      coachCritiqueEl.innerHTML = `
        <strong class="font-bold text-rose-400 block mb-1">🗣️ Bilan du Coach : "Le Coup du Sort Fatal !"</strong>
        "Tout notre plan reposait sur notre recrue phare <strong>${dramaFlopPlayer.name}</strong>, mais le destin a frappé : <em>${dramaReason}</em>. Privée de son leader, l'équipe a sombré dans la spirale de l'échec."
        <div class="mt-2.5 p-2.5 bg-rose-500/20 border border-rose-500/30 rounded-lg text-rose-200">
          💔 <strong>DRAME SPORTIF :</strong> Sans le rendement attendu de ${dramaFlopPlayer.name}, la saison est gâchée.
        </div>
      `;
    } else if (isNarrowMiss) {
      coachCritiqueEl.innerHTML = `
        <strong class="font-bold text-rose-400 block mb-1">🗣️ Bilan du Coach : "La pièce est retombée du mauvais côté"</strong>
        "Il ne nous manquait qu'un ou deux points pour valider l'objectif. Le manque de profondeur et les lacunes sur certains postes coûtent très cher sur la durée d'une saison."
      `;
    } else {
      coachCritiqueEl.innerHTML = `
        <strong class="font-bold text-rose-400 block mb-1">🗣️ Bilan du Coach : "Naufrage Collectif"</strong>
        "Le recrutement n'a pas permis d'élever notre niveau de jeu. L'équipe a été dominée de bout en bout et n'a jamais su répondre aux exigences de la division."
      `;
    }
  }

  // Bilan de la consigne de provenance / filière du coach
  if (originConstraint && originConstraint.code !== 'FREE' && currentSignedPlayers.length > 0) {
    let originFeedbackHtml = '';
    if (hasFulfilledOrigin && matchingOriginPlayer) {
      const pFlag = matchingOriginPlayer.nationality ? `${matchingOriginPlayer.nationality.flag} ` : '📍 ';
      originFeedbackHtml = `
        <div class="mt-2.5 p-2.5 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
          <span class="text-base">${pFlag}</span>
          <div>
            <strong>Filière respectée (${originConstraint.label}) :</strong> L'arrivée de <strong>${matchingOriginPlayer.name}</strong> cadre parfaitement avec les exigences géographiques du coach (+3 pts synergie tactique).
          </div>
        </div>
      `;
    } else {
      originFeedbackHtml = `
        <div class="mt-2.5 p-2.5 bg-amber-500/15 border border-amber-500/30 rounded-xl text-amber-300 text-xs flex items-center gap-2">
          <span class="text-base">⚠️</span>
          <div>
            <strong>Filière délaissée (${originConstraint.label}) :</strong> Aucune recrue issue de la filière réclamée par le coach (${originConstraint.hint}). Un léger déficit d'alchimie tactique (-2 pts synergie).
          </div>
        </div>
      `;
    }
    coachCritiqueEl.innerHTML += originFeedbackHtml;
  }

  managerScoreEl.textContent = `${grade} (${scorePct}%)`;
  starsEl.textContent = stars > 0 ? '⭐'.repeat(stars) : '❌ 0 Étoile';

  if (isSuccess) {
    saveScenarioSuccess(activeScenario.id, {
      score: scorePct,
      grade,
      stars,
      finalRank,
      points: points
    });

    // Check season-end Secret Badges
    if (currentSignedPlayers.some(p => p.traits && p.traits.includes('Genou en cristal'))) {
      unlockAchievement('doc_temeraire');
    }
    if (currentSignedPlayers.some(p => p.traits && p.traits.includes('Fêtard invétéré'))) {
      unlockAchievement('dompteur_nuit');
    }
    if (currentSignedPlayers.length === 1 && currentSignedPlayers[0].pos === 'DEF') {
      unlockAchievement('mur_solitaire');
    }
    if (activeScenario.difficulty === 'facile' && stars === 3) {
      unlockAchievement('grand_chelem');
    }
    if (activeScenario.difficulty === 'difficile' && activeScenario.budget <= 9.0) {
      unlockAchievement('genie_debrouille');
    }
  }

  if (signingsContainer) {
    if (currentSignedPlayers.length === 0) {
    signingsContainer.innerHTML = `
      <p class="text-xs text-rose-400 italic bg-rose-950/20 p-3 rounded-xl border border-rose-900/40">
        ⚠️ Zéro signature sur cette Deadline Day. Le groupe n'a pas été renouvelé.
      </p>
    `;
  } else {
    signingsContainer.innerHTML = currentSignedPlayers.map(p => {
      const evalResult = generatePlayerSeasonEvaluation(p, {
        isSuccess,
        finalRank,
        points,
        isReligated: finalRank >= 17,
        isPodium: finalRank <= 3,
        difficulty: activeScenario.difficulty || 'moyen',
        dramaReason
      });

      let tacticalNoteHtml = '';
      if (p.isTacticalMisfit) {
        tacticalNoteHtml = `<div class="mt-1.5 text-[11px] text-rose-400 font-semibold flex items-center gap-1"><span>⚠️ Dissonance tactique :</span> profil en décalage avec les exigences du coach.</div>`;
      } else if (p.isTacticalFit) {
        tacticalNoteHtml = `<div class="mt-1.5 text-[11px] text-emerald-400 font-semibold flex items-center gap-1"><span>✨ Alchimie tactique :</span> profil taillé sur mesure pour la philosophie du club.</div>`;
      }

      return `
        <div class="bg-gray-800/80 border border-gray-700/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
          <div class="flex-1">
            <h5 class="text-sm font-bold text-white flex flex-wrap items-center gap-1.5">
              ${p.nationality ? `<span class="inline-flex items-center shrink-0">${renderFlag(p.nationality.flag, p.nationality.name)}</span>` : ''}
              <span>${p.name}</span>
              <span class="text-xs text-amber-400 font-normal">(${p.reputation} • ${p.subPosName || p.subPos || p.pos}${p.nationality ? ' • ' + p.nationality.name : ''}${p.versatility ? ' • ' + p.versatility : ''} • ${p.agreedPrice.toFixed(1)} M€)</span>
            </h5>
            <p class="text-xs text-gray-300 mt-1.5 leading-relaxed">${evalResult.narrative}</p>
            ${tacticalNoteHtml}
          </div>
          <span class="text-xs font-bold px-2.5 py-1 rounded ${evalResult.badgeClass} border whitespace-nowrap self-start sm:self-auto shrink-0 shadow-sm">
            ${evalResult.badgeLabel}
          </span>
        </div>
      `;
    }).join('');
    }
  }

  showScreen('screen-recap');
}

function backToHomeGrid() {
  updateHeaderStats();
  showScreen('screen-home');
}

function replayCurrentScenario() {
  if (activeScenario) {
    startMercatoRun();
  }
}

function shareRecapWithFriends() {
  audio.play('deal_signed');
  const sc = activeScenario;
  if (!sc) return;

  const rank = document.getElementById('recap-final-rank').textContent;
  const grade = document.getElementById('recap-manager-score').textContent;
  const stars = document.getElementById('recap-stars').textContent;

  const shareText = `⚽ DEADLINE DAY PANIC ⏱️\nJe viens de terminer mon mercato avec ${sc.logo} ${sc.club} (${sc.country}) !\n🏆 Classement : ${rank}\n⭐ Étoiles : ${stars} | Note : ${grade}\nTu penses faire mieux en 5 minutes ? Teste le jeu ici : ${window.location.href}`;

  if (navigator.share) {
    navigator.share({
      title: 'Mon Bilan Deadline Day Panic !',
      text: shareText,
      url: window.location.href
    }).catch(() => {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(shareText).then(() => {
      showToast("📋 Bilan copié dans le presse-papier !", "success");
    }).catch(() => {
      prompt("Copie ton bilan pour tes amis :", shareText);
    });
  } else {
    prompt("Copie ton bilan pour tes amis :", shareText);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateHeaderStats();

  const urlParams = new URLSearchParams(window.location.search);
  const duelCode = urlParams.get('duel');
  if (duelCode) {
    openDuelPortal();
    const codeInput = document.getElementById('duel-code-input');
    if (codeInput) codeInput.value = duelCode.toUpperCase();
    showToast(`Code de salon ${duelCode.toUpperCase()} pré-rempli ! Cliquez sur Rejoindre.`, 'info');
  } else {
    showScreen('screen-portal');
  }
});
