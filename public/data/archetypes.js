// ==============================================================
// BASE DE DONNÉES DES ARCHÉTYPES & PROFILS PSYCHOLOGIQUES v1.0
// FORCES, SACRIFICES TACTIQUES & COMPORTEMENTS DE VESTIAIRE
// ==============================================================

const ARCHETYPES_BY_POS = {
  //  GARDIENS DE BUT
  GAR: [
    {
      code: 'GAR_MUR',
      name: 'Mur sur sa Ligne',
      icon: '',
      roleDesc: 'Réflexes félins sur sa ligne de but',
      strength: 'Infranchissable à bout portant et sur tirs réflexes',
      sacrifice: 'Fébrile dans les sorties aériennes et relance au pied médiocre',
      preferredPhilosophy: ['Catenaccio & Verrouillage', 'Pragmatisme du Maintien', 'Commando Maintien'],
      misfitPhilosophy: ['Tiki-Taka & Jeu de Position', 'Tiki-Taka & Maîtrise']
    },
    {
      code: 'GAR_SWEEPER',
      name: 'Gardien Moderne (Sweeper Keeper)',
      icon: '‍️',
      roleDesc: 'Libéro ganté participant au jeu court',
      strength: 'Relance court sous pression et permet au bloc de jouer très haut',
      sacrifice: 'Exposé aux frappes lointaines lobées et aux boulettes de relance',
      preferredPhilosophy: ['Tiki-Taka & Jeu de Position', 'Gegenpressing & Intensité', 'Domination & Standing'],
      misfitPhilosophy: ['Catenaccio & Verrouillage', 'Commando Maintien']
    },
    {
      code: 'GAR_COLOSSE',
      name: 'Colosse Aérien des 6 Mètres',
      icon: '',
      roleDesc: '1m95 régnant en maître sur les airs',
      strength: 'Capte tous les centres et sécurise les coups de pied arrêtés',
      sacrifice: 'Lenteur pour plonger au sol au ras du poteau',
      preferredPhilosophy: ['Pragmatisme du Maintien', 'Commando Maintien', 'Transition Éclair & Contre-Attaque'],
      misfitPhilosophy: ['Tiki-Taka & Jeu de Position']
    },
    {
      code: 'GAR_VETERAN',
      name: 'Vétéran Aboyeur',
      icon: '',
      roleDesc: 'Patron d\'expérience qui replace toute la ligne',
      strength: 'Zéro panique, guide ses défenseurs et calme les temps faibles',
      sacrifice: 'Détente en déclin, salaire imposant, impuissant sur frappes puissantes',
      preferredPhilosophy: ['Commando Maintien', 'Pragmatisme du Maintien', 'Domination & Standing'],
      misfitPhilosophy: ['Pari Jeunesse & Pépites']
    }
  ],

  // ️ DÉFENSEURS CENTRAUX
  DC: [
    {
      code: 'DC_STOPPEUR_BRUTAL',
      name: 'Stoppeur Brutal',
      icon: '',
      roleDesc: 'Déménageur physique qui terrorise les attaquants',
      strength: 'Intraitable au duel au corps-à-corps et dans les tacles virils',
      sacrifice: 'Relance aveugle en touche, risque de penaltys et de cartons rouges',
      preferredPhilosophy: ['Commando Maintien', 'Catenaccio & Verrouillage', 'Pragmatisme du Maintien'],
      misfitPhilosophy: ['Tiki-Taka & Jeu de Position', 'Tiki-Taka & Maîtrise']
    },
    {
      code: 'DC_LIBERO_RELANCEUR',
      name: 'Libéro Relanceur',
      icon: '',
      roleDesc: 'Relanceur soyeux qui casse les lignes à la passe',
      strength: 'Sorties de balle parfaites sous pression et vision laser',
      sacrifice: 'Manque d\'impact athlétique, se fait dominer par les pivots rugueux',
      preferredPhilosophy: ['Tiki-Taka & Jeu de Position', 'Tiki-Taka & Maîtrise', 'Domination & Standing'],
      misfitPhilosophy: ['Commando Maintien', 'Catenaccio & Verrouillage']
    },
    {
      code: 'DC_COUVREUR_RAPIDE',
      name: 'Stoppeur Couvreur Rapide',
      icon: '',
      roleDesc: 'Fusée défensive qui compense la profondeur',
      strength: 'Rattrape les ailiers vifs et verrouille la profondeur',
      sacrifice: 'Moins souverain dans le jeu aérien statique sur corner',
      preferredPhilosophy: ['Gegenpressing & Intensité', 'Transition Éclair & Contre-Attaque', 'Pari Jeunesse & Pépites'],
      misfitPhilosophy: ['Catenaccio & Verrouillage']
    },
    {
      code: 'DC_LEADER_VOCAL',
      name: 'Leader Vocal de Ligne',
      icon: '️',
      roleDesc: 'Commandant de la ligne défensive et du hors-jeu',
      strength: 'Discipline tactique infaillible et solidarité collective',
      sacrifice: 'Lenteur en fin de match face aux attaques véloces, salaire élevé',
      preferredPhilosophy: ['Catenaccio & Verrouillage', 'Domination & Standing', 'Commando Maintien'],
      misfitPhilosophy: ['Pari Jeunesse & Pépites']
    }
  ],

  //  LATÉRAUX / PISTONS (DD, DG)
  LATERAL: [
    {
      code: 'LAT_PISTON_TGV',
      name: 'Piston TGV Débordeur',
      icon: '',
      roleDesc: 'Machine à dédoubler sur tout le couloir',
      strength: 'Centres tranchants et surnombre permanent dans les 30 derniers mètres',
      sacrifice: 'Oublie son repli, laisse un boulevard béant dans son dos',
      preferredPhilosophy: ['Transition Éclair & Contre-Attaque', 'Gegenpressing & Intensité', 'Tiki-Taka & Jeu de Position'],
      misfitPhilosophy: ['Catenaccio & Verrouillage', 'Commando Maintien']
    },
    {
      code: 'LAT_CADENAS_DEF',
      name: 'Latéral Cadenas Défensif',
      icon: '',
      roleDesc: 'Défenseur latéral strict impossible à déborder',
      strength: 'Neutralise l\'ailier vedette adverse et gagne tous ses duels',
      sacrifice: 'Apport offensif quasi nul, passes en retrait systématiques',
      preferredPhilosophy: ['Catenaccio & Verrouillage', 'Commando Maintien', 'Pragmatisme du Maintien'],
      misfitPhilosophy: ['Tiki-Taka & Jeu de Position', 'Transition Éclair & Contre-Attaque']
    },
    {
      code: 'LAT_INVERTED',
      name: 'Faux Latéral Intérieur',
      icon: '',
      roleDesc: 'Repique dans l\'axe comme milieu supplémentaire',
      strength: 'Crée un surnombre technique au cœur du jeu et contrôle la possession',
      sacrifice: 'Laisse le couloir vide face aux contres adverses',
      preferredPhilosophy: ['Tiki-Taka & Jeu de Position', 'Tiki-Taka & Maîtrise', 'Domination & Standing'],
      misfitPhilosophy: ['Commando Maintien', 'Pragmatisme du Maintien']
    }
  ],

  //  MILIEUX DÉFENSIFS / SENTINELLES (MDF)
  MDF: [
    {
      code: 'MDF_RATISSEUR',
      name: 'Râtisseur Destructeur',
      icon: '️',
      roleDesc: 'Chien de garde infatigable devant la défense',
      strength: 'Interceptions à la pelle et pressing physique continu',
      sacrifice: 'Déchet technique sous la pression, accumulation de cartons',
      preferredPhilosophy: ['Gegenpressing & Intensité', 'Commando Maintien', 'Pragmatisme du Maintien'],
      misfitPhilosophy: ['Tiki-Taka & Jeu de Position', 'Tiki-Taka & Maîtrise']
    },
    {
      code: 'MDF_REGISTA',
      name: 'Regista / Plaque Tournante',
      icon: '',
      roleDesc: 'Maestro devant la défense qui distribue le jeu',
      strength: 'Transversales laser, oriente le tempo et lance les offensives',
      sacrifice: 'Léger au duel physique, mangé face à un milieu rugueux',
      preferredPhilosophy: ['Tiki-Taka & Jeu de Position', 'Tiki-Taka & Maîtrise', 'Domination & Standing'],
      misfitPhilosophy: ['Commando Maintien', 'Catenaccio & Verrouillage']
    },
    {
      code: 'MDF_COLOSSE',
      name: 'Sentinelle Colosse Aérien',
      icon: '',
      roleDesc: 'Rempart athlétique dominant les seconds ballons',
      strength: 'Jeu de tête souverain et impact physique intimidant',
      sacrifice: 'Mobilité latérale limitée, pivote lourdement en contre',
      preferredPhilosophy: ['Catenaccio & Verrouillage', 'Commando Maintien', 'Pragmatisme du Maintien'],
      misfitPhilosophy: ['Tiki-Taka & Jeu de Position']
    }
  ],

  //  MILIEUX CENTRAUX / RELAYEURS (MC)
  MC: [
    {
      code: 'MC_BOX_TO_BOX',
      name: 'Box-to-Box Infatigable',
      icon: '',
      roleDesc: 'Poumons d\'acier arpentant les deux surfaces',
      strength: 'Gros volume de jeu, pressing et projection offensive',
      sacrifice: 'Manque de lucidité dans le dernier geste par excès de débauche',
      preferredPhilosophy: ['Gegenpressing & Intensité', 'Transition Éclair & Contre-Attaque', 'Commando Maintien'],
      misfitPhilosophy: ['Catenaccio & Verrouillage']
    },
    {
      code: 'MC_METRONOME',
      name: 'Métronome de Possession',
      icon: '⏱️',
      roleDesc: '92% de passes réussies et boussole du milieu',
      strength: 'Conserve le cuir, temporise et fluidifie les circuits',
      sacrifice: 'Ne prend aucun risque vers l\'avant, tirs et percussion inexistants',
      preferredPhilosophy: ['Tiki-Taka & Jeu de Position', 'Tiki-Taka & Maîtrise', 'Domination & Standing'],
      misfitPhilosophy: ['Commando Maintien', 'Transition Éclair & Contre-Attaque']
    },
    {
      code: 'MC_PERCUTEUR',
      name: 'Percuteur Balle au Pied',
      icon: '',
      roleDesc: 'Dynamiteur de lignes balle collée au pied',
      strength: 'Casse le premier rideau par ses accélérations dévastatrices',
      sacrifice: 'Garde trop la balle et s\'empale parfois sur le bloc adverse',
      preferredPhilosophy: ['Transition Éclair & Contre-Attaque', 'Pari Jeunesse & Pépites', 'Domination & Standing'],
      misfitPhilosophy: ['Catenaccio & Verrouillage']
    }
  ],

  //  MILIEUX OFFENSIFS / MENEURS (MO)
  MO: [
    {
      code: 'MO_MAGICIEN',
      name: 'Magicien Créatif (10 pur)',
      icon: '',
      roleDesc: 'Artiste de la dernière passe et caviars sur mesure',
      strength: 'Débloque les défenses regroupées par une passe d\'anthologie',
      sacrifice: 'Zéro repli défensif, fantomatique quand l\'équipe subit sans ballon',
      preferredPhilosophy: ['Tiki-Taka & Maîtrise', 'Domination & Standing', 'Pari Jeunesse & Pépites'],
      misfitPhilosophy: ['Commando Maintien', 'Gegenpressing & Intensité']
    },
    {
      code: 'MO_PRESSING',
      name: 'Meneur Pressant de Travail',
      icon: '',
      roleDesc: 'Premier harceleur défensif et joueur d\'équipe',
      strength: 'Griffe des ballons hauts et joue vite pour ses partenaires',
      sacrifice: 'Moins de génie individuel et d\'étincelle dans les 16 mètres',
      preferredPhilosophy: ['Gegenpressing & Intensité', 'Commando Maintien', 'Pragmatisme du Maintien'],
      misfitPhilosophy: ['Tiki-Taka & Maîtrise']
    },
    {
      code: 'MO_SNIPER',
      name: 'Sniper des 25 Mètres',
      icon: '',
      roleDesc: 'Danger permanent sur coups francs et frappes lourdes',
      strength: 'Peut marquer de nulle part d\'un missile téléguidé',
      sacrifice: 'Force trop ses frappes au détriment de la passe simple',
      preferredPhilosophy: ['Transition Éclair & Contre-Attaque', 'Commando Maintien', 'Domination & Standing'],
      misfitPhilosophy: ['Tiki-Taka & Jeu de Position']
    }
  ],

  //  AILIERS (AD, AG)
  AILIER: [
    {
      code: 'AIL_FLECHE_LIGNE',
      name: 'Flèche de Débordement',
      icon: '️',
      roleDesc: 'Vitesse pure le long de la craie et centres tendus',
      strength: 'Prend la profondeur et dépose son vis-à-vis sur 20 mètres',
      sacrifice: 'Prévisible, pied opposé faible, peu dangereux en frappe axiale',
      preferredPhilosophy: ['Transition Éclair & Contre-Attaque', 'Gegenpressing & Intensité', 'Pari Jeunesse & Pépites'],
      misfitPhilosophy: ['Catenaccio & Verrouillage', 'Tiki-Taka & Jeu de Position']
    },
    {
      code: 'AIL_INTERIEUR_BUTEUR',
      name: 'Ailier Intérieur Buteur',
      icon: '',
      roleDesc: 'Repique sur son bon pied pour allumer la cage',
      strength: 'Gros total de buts, élimine vers l\'intérieur et enroule',
      sacrifice: 'Individualiste forcené, oublie souvent de servir son numéro 9',
      preferredPhilosophy: ['Domination & Standing', 'Tiki-Taka & Jeu de Position', 'Transition Éclair & Contre-Attaque'],
      misfitPhilosophy: ['Commando Maintien', 'Pragmatisme du Maintien']
    },
    {
      code: 'AIL_SOLISTE_DRIBBLEUR',
      name: 'Soliste Dribbleur',
      icon: '',
      roleDesc: 'Virtuose du un-contre-un et feintes déroutantes',
      strength: 'Fait chavirer le stade, provoque fautes et cartons adverses',
      sacrifice: 'Perd des ballons chauds en tentant le geste de trop, agace ses partenaires',
      preferredPhilosophy: ['Pari Jeunesse & Pépites', 'Domination & Standing', 'Tiki-Taka & Maîtrise'],
      misfitPhilosophy: ['Commando Maintien', 'Catenaccio & Verrouillage']
    }
  ],

  //  BUTEURS / AVANT-CENTRES (BU)
  BU: [
    {
      code: 'BU_RENARD_CLINIQUE',
      name: 'Renard Clinique des 16m',
      icon: '',
      roleDesc: 'Finition chirurgicale à une ou deux touches',
      strength: 'Transformation clinique des demi-occasions en buts décisifs',
      sacrifice: 'Inexistant dans le jeu de passe, inutile si l\'équipe ne centre pas',
      preferredPhilosophy: ['Transition Éclair & Contre-Attaque', 'Domination & Standing', 'Pragmatisme du Maintien'],
      misfitPhilosophy: ['Gegenpressing & Intensité', 'Tiki-Taka & Jeu de Position']
    },
    {
      code: 'BU_PIVOT_ATHLETIQUE',
      name: 'Pivot Mur Athlétique',
      icon: '',
      roleDesc: '1m93 jouant dos au but et remises de la tête',
      strength: 'Gagne tous les dégagements, fait monter le bloc et pèse lourd',
      sacrifice: 'Lourd en contre-attaque, maladroit dans les un-contre-un rapides',
      preferredPhilosophy: ['Commando Maintien', 'Pragmatisme du Maintien', 'Catenaccio & Verrouillage'],
      misfitPhilosophy: ['Tiki-Taka & Jeu de Position', 'Tiki-Taka & Maîtrise']
    },
    {
      code: 'BU_FAUX_NEUF',
      name: 'Faux 9 Décrocheur',
      icon: '',
      roleDesc: 'Attaquant manieur de ballon libérant les ailes',
      strength: 'Crée des boulevards pour les ailiers et participe au jeu combiné',
      sacrifice: 'Manque de présence physique dans les 6 mètres sur les centres',
      preferredPhilosophy: ['Tiki-Taka & Jeu de Position', 'Tiki-Taka & Maîtrise', 'Gegenpressing & Intensité'],
      misfitPhilosophy: ['Commando Maintien', 'Pragmatisme du Maintien']
    },
    {
      code: 'BU_TETE_BRULEE',
      name: 'Buteur d\'Instinct (Tête Brûlée)',
      icon: '',
      roleDesc: 'Folie pure capable d\'un coup de génie à la 92e',
      strength: 'Marque des buts impossibles quand tout semble perdu',
      sacrifice: 'Égo démesuré, boude s\'il ne tire pas les penaltys, clash possible',
      preferredPhilosophy: ['Commando Maintien', 'Transition Éclair & Contre-Attaque', 'Pari Jeunesse & Pépites'],
      misfitPhilosophy: ['Catenaccio & Verrouillage']
    }
  ]
};

// PROFILS PSYCHOLOGIQUES DU JOUEUR (BADGE SECONDAIRE VISIBLE AU MERCATO)
const PSYCHOLOGICAL_PROFILES = [
  {
    code: 'SOLDAT_COLLECTIF',
    label: ' Soldat Collectif',
    icon: '',
    badgeClass: 'bg-indigo-950/80 text-indigo-300 border border-indigo-700/80',
    summary: 'Régularité exemplaire, respectueux des consignes, stabilise le vestiaire (+1 pt alchimie).',
    malusRisk: 'Aucun'
  },
  {
    code: 'GENIE_TOXIQUE',
    label: ' Génie Toxique',
    icon: '',
    badgeClass: 'bg-purple-950/80 text-purple-300 border border-purple-700/80',
    summary: 'Talent hors-norme bradé en prix, mais égo volcanique. Risque de clash si mis sur le banc.',
    malusRisk: '30% risque d\'incident de vestiaire (-3 pts)'
  },
  {
    code: 'PARI_MEDICAL',
    label: ' Pari Médical Bradé',
    icon: '',
    badgeClass: 'bg-rose-950/80 text-rose-300 border border-rose-700/80',
    summary: 'Niveau Ligue des Champions vendu pour des miettes suite à une blessure passée.',
    malusRisk: '35% risque de rechute physique en hiver (-4 pts)'
  },
  {
    code: 'LEADER_EXEMPLAIRE',
    label: ' Leader Exemplaire',
    icon: '',
    badgeClass: 'bg-amber-950/80 text-amber-300 border border-amber-600/80',
    summary: 'Caractère de champion. Galvanise ses partenaires dans le dernier quart d\'heure et les derbys.',
    malusRisk: 'Gourmand en salaire'
  },
  {
    code: 'DIAMANT_BRUT',
    label: ' Diamant Brut U21',
    icon: '',
    badgeClass: 'bg-cyan-950/80 text-cyan-300 border border-cyan-700/80',
    summary: 'Moins de 21 ans, fulgurances spectaculaires, mais inconstant face aux défenses rugueuses.',
    malusRisk: 'Peut passer à côté des matchs sous pression'
  },
  {
    code: 'MERCENAIRE_FROID',
    label: ' Mercenaire Froid',
    icon: '',
    badgeClass: 'bg-slate-900 text-slate-300 border border-slate-700',
    summary: 'Professionnel détaché : fait son travail mais ne mouille pas le maillot pour le club.',
    malusRisk: 'Transparent dans les derbys sous tension'
  },
  {
    code: 'TETE_BRULEE',
    label: ' Tête Brûlée Impulsive',
    icon: '',
    badgeClass: 'bg-red-950/80 text-red-300 border border-red-700/80',
    summary: 'Guerrier sanguin qui ne recule devant rien. Capable d\'un exploit comme d\'un coup de sang.',
    malusRisk: 'Risque de suspension et cartons rouges'
  }
];

function checkPhilosophyMatch(targetPhilo, coachPhilo) {
  if (!targetPhilo || !coachPhilo) return false;
  const cp = coachPhilo.toLowerCase();
  if (Array.isArray(targetPhilo)) {
    return targetPhilo.some(item => typeof item === 'string' && cp.includes(item.toLowerCase()));
  }
  if (typeof targetPhilo === 'string') {
    return cp.includes(targetPhilo.toLowerCase());
  }
  return false;
}

if (typeof module !== 'undefined') {
  module.exports = { ARCHETYPES_BY_POS, PSYCHOLOGICAL_PROFILES, checkPhilosophyMatch };
}
