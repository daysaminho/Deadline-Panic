
function closeMobileNegotiation() {
  const negoCol = document.getElementById('in-game-negotiation-col');
  if (negoCol) {
    negoCol.classList.remove('mobile-nego-active');
  }
}
window.closeMobileNegotiation = closeMobileNegotiation;

// ==============================================================
// DEADLINE DAY PANIC - CORE APPLICATION ENGINE v4.0
// Double besoin obligatoire • 1 seule chance de négociation par joueur
// ==============================================================

// ==============================================================
// GESTION UNIVERSELLE DES DRAPEAUX HD (PC WINDOWS & MOBILE)
const COUNTRY_TO_ISO = {
  'france': 'fr', 'espagne': 'es', 'angleterre': 'gb-eng', 'italie': 'it', 'allemagne': 'de',
  'portugal': 'pt', 'pays-bas': 'nl', 'belgique': 'be', 'suisse': 'ch', 'bresil': 'br', 'brésil': 'br',
  'argentine': 'ar', 'uruguay': 'uy', 'colombie': 'co', 'chili': 'cl', 'senegal': 'sn', 'sénégal': 'sn',
  'cote d\'ivoire': 'ci', 'côte d\'ivoire': 'ci', 'maroc': 'ma', 'algerie': 'dz', 'algérie': 'dz',
  'cameroun': 'cm', 'nigeria': 'ng', 'nigéria': 'ng', 'mali': 'ml', 'egypte': 'eg', 'égypte': 'eg',
  'tunisie': 'tn', 'danemark': 'dk', 'suede': 'se', 'suède': 'se', 'norvege': 'no', 'norvège': 'no',
  'croatie': 'hr', 'serbie': 'rs', 'pologne': 'pl', 'japon': 'jp', 'coree du sud': 'kr', 'corée du sud': 'kr',
  'etats-unis': 'us', 'états-unis': 'us', 'usa': 'us', 'ecosse': 'gb-sct', 'écosse': 'gb-sct',
  'pays de galles': 'gb-wls', 'turquie': 'tr', 'arabie saoudite': 'sa', 'autriche': 'at', 'grece': 'gr',
  'grèce': 'gr', 'republique tcheque': 'cz', 'république tchèque': 'cz', 'roumanie': 'ro',
  'slovaquie': 'sk', 'ukraine': 'ua', 'mexique': 'mx', 'ghana': 'gh', 'irlande': 'ie', 'finlande': 'fi', 'islande': 'is'
};

const GLOBE_SVG_ICON = `<svg class="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`;

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

function renderFlag(input, alt = '', cls = '') {
  let countryName = '';
  let flagEmoji = '';

  if (typeof input === 'object' && input !== null) {
    countryName = input.name || '';
    flagEmoji = input.flag || '';
  } else if (typeof input === 'string') {
    if (getCountryCodeFromEmoji(input)) {
      flagEmoji = input;
    } else {
      countryName = input;
    }
  }

  let code = null;
  if (countryName) {
    const normalized = countryName.toLowerCase().trim();
    code = COUNTRY_TO_ISO[normalized] || COUNTRY_TO_ISO[normalized.normalize("NFD").replace(/[\u0300-\u036f]/g, "")];
    // Support direct ISO codes like 'fr', 'es', 'gb-eng', 'de', 'it', 'ar', 'br', etc.
    if (!code) {
      if (/^[a-z]{2}(-[a-z]{2,4})?$/.test(normalized)) {
        code = normalized;
      }
    }
  }
  if (!code && flagEmoji) {
    code = getCountryCodeFromEmoji(flagEmoji);
  }

  const label = alt || countryName || 'Nationalité';

  if (!code) {
    // Fallback obligatoire : icône générique de globe terrestre dans conteneur fixe 24px
    return `<span class="inline-flex items-center justify-center shrink-0 w-6 min-w-[24px] max-w-[24px] select-none text-center ${cls}" style="width: 24px; min-width: 24px; flex-shrink: 0;" title="${label}">${GLOBE_SVG_ICON}</span>`;
  }

  return `<span class="inline-flex items-center justify-center shrink-0 w-6 min-w-[24px] max-w-[24px] select-none text-center ${cls}" style="width: 24px; min-width: 24px; flex-shrink: 0;" title="${label}"><img src="https://flagcdn.com/24x18/${code}.png" srcset="https://flagcdn.com/48x36/${code}.png 2x" width="18" height="13.5" alt="${label}" class="inline-block rounded-xs shadow-xs" style="display:inline-block; vertical-align:middle;" loading="lazy" onerror="this.style.display='none';if(this.nextElementSibling)this.nextElementSibling.style.display='inline-flex'"><span style="display:none;width:24px;height:18px;align-items:center;justify-content:center;">${GLOBE_SVG_ICON}</span></span>`;
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
  const typeConfig = {
    success: {
      card: 'bg-white dark:bg-[#121826] border border-emerald-500/30 text-slate-800 dark:text-white shadow-xl shadow-emerald-500/10',
      badge: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
      svg: (typeof getSvgIcon === 'function') ? getSvgIcon('check', 'w-3.5 h-3.5') : '<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>'
    },
    error: {
      card: 'bg-white dark:bg-[#121826] border border-rose-500/30 text-slate-800 dark:text-white shadow-xl shadow-rose-500/10',
      badge: 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400',
      svg: (typeof getSvgIcon === 'function') ? getSvgIcon('x', 'w-3.5 h-3.5') : '<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
    },
    info: {
      card: 'bg-white dark:bg-[#121826] border border-blue-500/30 text-slate-800 dark:text-white shadow-xl shadow-blue-500/10',
      badge: 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400',
      svg: (typeof getSvgIcon === 'function') ? getSvgIcon('info', 'w-3.5 h-3.5') : '<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
    }
  };

  const cfg = typeConfig[type] || typeConfig.info;
  const cleanMsg = (message || '').replace(/^[\uD800-\uDBFF\uDC00-\uDFFF\u2600-\u27BF\u2300-\u23FF\s]+/, '').trim();

  toast.className = `pointer-events-auto transform -translate-y-4 opacity-0 transition-all duration-300 px-4 py-2.5 rounded-2xl flex items-center gap-3 text-xs font-semibold backdrop-blur-md ${cfg.card}`;
  toast.innerHTML = `
    <span class="w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${cfg.badge}">${cfg.svg}</span>
    <span class="flex-1 leading-snug font-medium">${cleanMsg || message}</span>
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
  if (completedCount >= 50) return { title: 'Légende Absolue du Football', shortTitle: 'Légende', tier: 'legende' };
  if (completedCount >= 30) return { title: 'Maître du Mercato', shortTitle: 'Maître', tier: 'maitre' };
  if (completedCount >= 16) return { title: 'Directeur Sportif Confirmé', shortTitle: 'Directeur', tier: 'directeur' };
  if (completedCount >= 8) return { title: 'Négociateur Averti', shortTitle: 'Négociateur', tier: 'negociateur' };
  if (completedCount >= 3) return { title: 'Scout Prometteur', shortTitle: 'Scout', tier: 'scout' };
  return { title: 'Stagiaire de la Deadline Day', shortTitle: 'Stagiaire', tier: 'stagiaire' };
}

function getManagerRankSvg(tier, size = 'sm') {
  const sizeClass = size === 'lg' ? 'w-8 h-8' : (size === 'md' ? 'w-5 h-5' : 'w-3.5 h-3.5');

  if (tier === 'legende' || tier === 'maitre') {
    return `
      <svg class="${sizeClass} text-amber-500 dark:text-amber-400 inline-block shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2"/>
        <path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2"/>
        <path d="M4 3h16v6a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6V3z"/>
        <path d="M12 15v4"/>
        <path d="M8 21h8"/>
      </svg>
    `;
  } else if (tier === 'directeur') {
    return `
      <svg class="${sizeClass} text-indigo-500 dark:text-indigo-400 inline-block shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    `;
  } else {
    // Médaille vectorielle élégante (Stagiaire, Scout, Négociateur)
    const colorClass = tier === 'negociateur' ? 'text-amber-500 dark:text-amber-400' : (tier === 'scout' ? 'text-slate-400 dark:text-slate-300' : 'text-amber-600 dark:text-amber-500');
    return `
      <svg class="${sizeClass} ${colorClass} inline-block shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="8" r="6"/>
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    `;
  }
}
window.getManagerRankSvg = getManagerRankSvg;

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
window.showScreen = showScreen;
function showScreen(screenId) {
  if (screenId === 'screen-home') {
    screenId = 'screen-portal';
  }

  const allScreenIds = [
    'screen-portal',
    'screen-modes',
    'screen-duel-portal',
    'screen-duel-lobby',
    'screen-home',
    'screen-gallery',
    'screen-mercato',
    'screen-simulation',
    'screen-recap',
    'screen-duel-recap'
  ];

  // 1. Masquage strict de tous les écrans enregistrés
  allScreenIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.add('hidden');
      el.style.display = 'none';
    }
  });

  // 2. Nettoyage DOM préventif sur tous les conteneurs <main id^="screen-">
  document.querySelectorAll('main[id^="screen-"]').forEach(scr => {
    if (scr.id !== screenId) {
      scr.classList.add('hidden');
      scr.style.display = 'none';
    }
  });

  // 3. Affichage unique de l'écran cible
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.remove('hidden');
    target.style.display = '';
  }

  // Gestion responsive de la classe body.in-mercato pour masquer le header global sur mobile
  if (screenId === 'screen-mercato') {
    document.body.classList.add('in-mercato');
  } else {
    document.body.classList.remove('in-mercato');
    const screenMercato = document.getElementById('screen-mercato');
    if (screenMercato) {
      screenMercato.classList.add('hidden');
      screenMercato.style.display = 'none';
    }
    if (typeof closeMobileNegotiation === 'function') {
      closeMobileNegotiation();
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // Annulation préventive de la simulation de saison si on quitte l'écran
  if (screenId !== 'screen-simulation') {
    currentSimulationRunId++;
    if (crisisResumeResolver) {
      crisisResumeResolver('aborted');
      crisisResumeResolver = null;
    }
  }

  // 4. Fermeture préventive de toute modale de sélection de club / briefing résiduelle
  const clubPickerModal = document.getElementById('modal-club-picker');
  if (clubPickerModal && screenId === 'screen-mercato') clubPickerModal.classList.add('hidden');
  const briefingModal = document.getElementById('modal-briefing');
  if (briefingModal && screenId === 'screen-mercato') briefingModal.classList.add('hidden');

  if (screenId === 'screen-gallery') {
    if (currentGalleryTab === 'crises') {
      renderCrisesList();
    } else if (currentGalleryTab === 'achievements') {
      renderAchievementsList();
    } else {
      renderGallery();
    }
  }

  // 5. Repositionnement immédiat et strict tout en haut de l'écran
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  if (document.body) document.body.scrollTop = 0;
  if (document.documentElement) document.documentElement.scrollTop = 0;
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
  if (rankEl) {
    rankEl.style.display = 'inline-flex';
    rankEl.style.alignItems = 'center';
    rankEl.style.gap = '8px';
    rankEl.innerHTML = `${getManagerRankSvg(rankInfo.tier, 'sm')} <span class="leading-none">${rankInfo.shortTitle}</span>`;
  }
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
    facile: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50',
    moyen: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/50',
    difficile: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/50'
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
// Générateur dynamique d'avatar typographique (initiales du club)
function getClubInitials(name) {
  if (!name || typeof name !== 'string') return 'FC';
  
  const stopWords = new Set(['FC', 'CF', 'AS', 'AC', 'SC', 'UD', 'US', 'RC', 'OGC', 'SSC', 'SK', 'RB', 'TSG', 'SV', 'VFL', 'BSC', 'FK', 'CSKA', 'SL', 'CP']);
  
  const words = name
    .replace(/[()]/g, '')
    .trim()
    .split(/[\s-]+/)
    .filter(w => w.length > 0);

  const significant = words.filter(w => !stopWords.has(w.toUpperCase()));
  
  if (significant.length >= 2) {
    return (significant[0][0] + significant[1][0]).toUpperCase();
  }
  if (significant.length === 1) {
    const single = significant[0];
    if (single.length >= 2) {
      return single.slice(0, 2).toUpperCase();
    }
    return (single + 'C').toUpperCase();
  }
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  if (words.length === 1) {
    return (words[0].slice(0, 2)).toUpperCase();
  }
  return 'FC';
}

if (typeof window !== 'undefined') {
  window.getClubInitials = getClubInitials;
}

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
    const initials = getClubInitials(sc.club);

    return `
      <div onclick="selectClubFromPicker(${sc.id})" class="cursor-pointer group bg-slate-50/70 hover:bg-white dark:bg-slate-900/50 dark:hover:bg-slate-800/80 border border-slate-200/80 hover:border-blue-500/50 dark:border-slate-800 dark:hover:border-blue-500/50 rounded-2xl p-3.5 sm:p-4 transition-all duration-200 flex items-center justify-between gap-3 sm:gap-4 shadow-xs hover:shadow-md">
        <div class="flex items-center space-x-3 sm:space-x-3.5 min-w-0 flex-1">
          <div class="w-14 h-14 min-w-[56px] min-h-[56px] shrink-0 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center font-display font-black text-base tracking-wider shadow-xs group-hover:scale-105 transition-transform duration-200 select-none" style="width: 56px; height: 56px; min-width: 56px; min-height: 56px; flex-shrink: 0;">
            ${initials}
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-1.5 sm:gap-2 mb-0.5 flex-wrap sm:flex-nowrap">
              <h4 class="font-display font-black text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition truncate">${sc.club}</h4>
              <span class="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap inline-flex items-center gap-1">• ${formatWithFlags(sc.country)}</span>
              ${isDone ? `<span class="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/40 whitespace-nowrap inline-flex items-center gap-1"><svg class="w-2.5 h-2.5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Validé</span>` : ''}
            </div>
            ${sc.tacticalPhilosophy ? `
              <div class="flex items-center gap-1.5 mb-1 flex-wrap">
                <span class="text-[9px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 px-2 py-0.5 rounded-md">${sc.tacticalPhilosophy}</span>
                <span class="text-[10px] text-slate-400 dark:text-slate-500">• ${sc.tacticalTag || ''}</span>
              </div>
            ` : ''}
            <p class="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 italic line-clamp-1 mb-1.5">
              ${sc.coachDemand}
            </p>
            <div class="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 flex-wrap">
              <span>Budget : <strong class="text-emerald-600 dark:text-emerald-400 font-mono font-bold">${sc.budget} M€</strong></span>
              <span class="text-slate-300 dark:text-slate-700">•</span>
              <div class="inline-flex items-center gap-1.5 flex-wrap">
                <span class="text-slate-400 dark:text-slate-500 text-[10px] uppercase font-bold">Missions :</span>
                ${(sc.needs || []).map(n => {
                  const info = getNeedDisplay(n);
                  const isPoly = info.code.startsWith('POLYVALENT');
                  const isU21 = info.code === 'PEPITE_U21';
                  const badgeColor = isPoly
                    ? 'border-indigo-200 dark:border-indigo-900/50 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                    : (isU21
                      ? 'border-purple-200 dark:border-purple-900/50 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300');
                  return `<span class="inline-flex items-center gap-1 border ${badgeColor} px-2 py-0.5 rounded-md text-[10px] font-bold shadow-xs whitespace-nowrap">
                    <span>${info.shortLabel}</span>
                  </span>`;
                }).join('')}
              </div>
            </div>
          </div>
        </div>

        <button class="px-3.5 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-display font-bold text-xs rounded-xl shadow-xs transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 group-hover:shadow-sm">
          <span>Choisir</span>
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
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
        <div onclick="openCrisisDetailModal('${crisis.id}')" class="bg-gradient-to-br from-rose-950/30 via-gray-900 to-black border-2 border-rose-500/40 hover:border-rose-500 rounded-2xl p-4 shadow-xl flex flex-col justify-between gap-3 relative overflow-hidden transition cursor-pointer hover:scale-[1.01] group">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center space-x-3.5">
              <div class="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/40 flex items-center justify-center text-2xl shadow-inner shrink-0">
                ${crisis.icon}
              </div>
              <div>
                <div class="flex flex-wrap items-center gap-1.5 mb-1">
                  ${diffBadges}
                </div>
                <h4 class="font-display font-extrabold text-sm text-white group-hover:text-rose-300 transition">${crisis.title}</h4>
              </div>
            </div>
            <span class="inline-flex items-center gap-1 text-[11px] font-bold text-rose-400 bg-rose-950/80 px-2.5 py-1 rounded-lg border border-rose-800 whitespace-nowrap shrink-0">
              ${typeof getSvgIcon === 'function' ? getSvgIcon('beacon', 'w-3.5 h-3.5 text-rose-400') : '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v3M4.93 4.93l2.12 2.12M19.07 4.93l-2.12 2.12M6 18h12M7 18a5 5 0 0 1 10 0M9 22h6"/></svg>'}
              <span>Découvert</span>
            </span>
          </div>

          <p class="text-xs text-gray-300 leading-relaxed bg-black/40 p-2.5 rounded-xl border border-rose-950/60 line-clamp-2">
            ${typeof crisis.description === 'function' ? crisis.description('votre club') : crisis.description}
          </p>

          <div class="text-[11px] bg-rose-950/20 border border-rose-900/40 rounded-xl p-2.5 flex flex-col gap-1 text-gray-300">
            <div class="flex items-center justify-between text-[10px] text-gray-400 font-mono">
              <span>RISQUE D'ÉCHEC FATAL</span>
              <span class="text-rose-400 font-bold">${crisis.failureRate ? `Difficile ${Math.round((crisis.failureRate.difficile || 0.5)*100)}% • Moyen ${Math.round((crisis.failureRate.moyen || 0.3)*100)}%` : 'Élevé'}</span>
            </div>
            <div class="text-rose-300 italic text-[11px] truncate">
              [FATAL] ${crisis.fatalVerdict}
            </div>
          </div>
          <div class="flex items-center justify-between text-[10px] text-rose-400 font-bold pt-0.5 group-hover:text-rose-300">
            <span>Consulter le dossier intégral</span>
            <svg class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
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

// ==============================================================
// GESTION DES ICÔNES SVG THÉMATIQUES DES TROPHÉES & BADGES
// ==============================================================
function getAchievementSvg(achId, isUnlocked = true) {
  if (!isUnlocked) {
    // Cadenas fermé élégant avec la même bibliothèque et stroke-width: 2
    return `
      <svg class="w-6 h-6 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
    `;
  }

  // Icône SVG moderne, minimaliste et thématique pour chaque trophée débloqué (vert émeraude)
  switch (achId) {
    case 'doc_temeraire':
      // Docteur Téméraire : Cœur avec électrocardiogramme / pulsation
      return `
        <svg class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          <path d="M3.22 12H9.5l1.5-3 2 6.5 1.5-3.5h6.28" />
        </svg>
      `;

    case 'mur_solitaire':
      // Le Mur Solitaire : Bouclier défensif infranchissable
      return `
        <svg class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 8v8m-4-4h8" />
        </svg>
      `;

    case 'gong_minuit':
      // Gong de Minuit : Chronomètre / horloge des dernières secondes
      return `
        <svg class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="14" r="8" />
          <path d="M12 10v4l2.5 2" />
          <path d="M10 2h4" />
          <path d="M12 2v4" />
        </svg>
      `;

    case 'as_bluff':
      // As du Bluff : Carte / étincelle de poker
      return `
        <svg class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="3" />
          <path d="M12 7l1.5 2.5 3 .5-2 2 .5 3-3-1.5-3 1.5.5-3-2-2 3-.5z" />
        </svg>
      `;

    case 'maitre_clauses':
      // Maître des Clauses : Contrat officiel paraphé
      return `
        <svg class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      `;

    case 'grand_chelem':
      // Grand Chelem C1 : Trophée d'élite / Coupe des Champions
      return `
        <svg class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2" />
          <path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" />
          <path d="M4 3h16v6a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6V3z" />
          <path d="M12 15v4" />
          <path d="M8 21h8" />
        </svg>
      `;

    case 'genie_debrouille':
      // Génie de la Débrouille : Ampoule allumée / étincelle d'ingéniosité
      return `
        <svg class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
          <path d="M9 18h6" />
          <path d="M10 22h4" />
        </svg>
      `;

    case 'dompteur_nuit':
      // Dompteur de Fauves : Maîtrise de la vie nocturne (lune & étoile)
      return `
        <svg class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          <path d="M19 3v4m2-2h-4" />
        </svg>
      `;

    case 'livre_noir':
      // Le Livre Noir du Football : Grimoire des crises et secrets
      return `
        <svg class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      `;

    default:
      // Trophée générique épuré
      return `
        <svg class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2" />
          <path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" />
          <path d="M4 3h16v6a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6V3z" />
          <path d="M12 15v4" />
          <path d="M8 21h8" />
        </svg>
      `;
  }
}
window.getAchievementSvg = getAchievementSvg;

function renderAchievementsList() {
  const container = document.getElementById('achievements-list');
  if (!container) return;

  const unlocked = getAchievementsProgress();

  container.innerHTML = ACHIEVEMENTS_DEF.map(ach => {
    const isUnlocked = unlocked.includes(ach.id);

    if (isUnlocked) {
      return `
        <div class="bg-white dark:bg-[#121826] border border-emerald-500/30 dark:border-emerald-500/20 rounded-2xl p-4 sm:p-5 shadow-xs flex items-center justify-between gap-4 transition-all hover:border-emerald-500/50">
          <div class="flex items-center space-x-3.5 min-w-0">
            <!-- Fond circulaire très légèrement teinté en vert sans bordure -->
            <div class="w-12 h-12 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 flex items-center justify-center shrink-0">
              ${getAchievementSvg(ach.id, true)}
            </div>
            <div class="min-w-0">
              <h4 class="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight truncate">${ach.title}</h4>
              <p class="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">${ach.desc}</p>
            </div>
          </div>
          <span class="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full whitespace-nowrap shrink-0">
            ✓ Débloqué
          </span>
        </div>
      `;
    } else {
      return `
        <div class="bg-slate-50/70 dark:bg-[#121826]/40 border border-slate-200/80 dark:border-slate-800/60 rounded-2xl p-4 sm:p-5 opacity-70 flex items-center justify-between gap-4 select-none transition-all">
          <div class="flex items-center space-x-3.5 min-w-0">
            <!-- Fond circulaire gris sans bordure avec cadenas même stroke-width -->
            <div class="w-12 h-12 rounded-full bg-slate-200/60 dark:bg-slate-800/60 flex items-center justify-center shrink-0">
              ${getAchievementSvg(ach.id, false)}
            </div>
            <div class="min-w-0">
              <h4 class="font-bold text-sm text-slate-700 dark:text-slate-300 tracking-tight truncate">${ach.title}</h4>
              <p class="text-xs text-slate-400 dark:text-slate-500 mt-0.5 leading-relaxed">${ach.desc}</p>
            </div>
          </div>
          <span class="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full whitespace-nowrap shrink-0">
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

  if (managerAvatarEl) managerAvatarEl.innerHTML = getManagerRankSvg(rankInfo.tier, 'md');
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
              <span class="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center text-xs font-black tracking-wider shadow-xs">${getClubInitials(sc.club)}</span>
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
  const currentDiff = (activeScenario && activeScenario.difficulty) ? activeScenario.difficulty : (currentPickedDiff || 'moyen');
  const saved = getSavedProgress();
  const uncompleted = SCENARIOS.filter(s => s.difficulty === currentDiff && !saved[s.id] && (!activeScenario || s.id !== activeScenario.id));
  const pool = uncompleted.length > 0 ? uncompleted : SCENARIOS.filter(s => s.difficulty === currentDiff);
  const picked = pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : SCENARIOS[0];

  currentPickedDiff = picked.difficulty;
  openScenarioBriefing(picked.id, true);
}

function openScenarioBriefing(id, isRandom = false) {
  audio.init();
  const sc = SCENARIOS.find(s => s.id === id);
  if (!sc) return;

  // Clone scenario to allow modifier without corrupting database
  activeScenario = JSON.parse(JSON.stringify(sc));
  enrichScenarioTacticalDemands(activeScenario);

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

  const briefingLogoEl = document.getElementById('briefing-logo');
  if (briefingLogoEl) briefingLogoEl.textContent = getClubInitials(activeScenario.club);
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
      originTextEl.innerHTML = `Réseau ciblé : <strong class="text-amber-300 font-bold">${activeScenario.originConstraint.name}</strong> • <span class="italic text-gray-300">${activeScenario.originConstraint.shortDesc}</span>`;
      originEl.classList.remove('hidden');
    } else {
      originIconEl.textContent = '🌍';
      originTextEl.innerHTML = `Réseau : <strong class="text-gray-300">Scouting International</strong> • Aucun quota géographique imposé`;
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
      modName.textContent = `Contexte Favorable : ${activeRunModifier.name}`;
    } else {
      modBox.className = 'mb-4 p-3 rounded-xl bg-rose-950/40 border border-rose-500/50 flex items-center gap-3 text-xs text-rose-200 shadow-sm';
      modName.className = 'font-extrabold block text-[10px] uppercase text-rose-400';
      modName.textContent = `Contexte Défavorable : ${activeRunModifier.name}`;
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
  if (activeScenario && typeof enrichScenarioTacticalDemands === 'function') {
    enrichScenarioTacticalDemands(activeScenario);
  }
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

    // Réinitialisation complète de l'état de négociation
    activeNegotiation = {
      player: null,
      sellerName: '',
      patience: 100,
      history: [],
      usedClause: false,
      isOver: true
    };
    pendingDeal = null;

    // Réinitialisation de l'affichage de négociation (bureau d'attente/idle)
    const chatHistory = document.getElementById('nego-chat-history');
    if (chatHistory) chatHistory.innerHTML = '';
    const choicesBox = document.getElementById('nego-choices-box');
    if (choicesBox) choicesBox.innerHTML = '';
    const activeState = document.getElementById('nego-active-state');
    if (activeState) activeState.classList.add('hidden');
    const idleState = document.getElementById('nego-idle-state');
    if (idleState) idleState.classList.remove('hidden');
    const stampOverlay = document.getElementById('nego-success-overlay');
    if (stampOverlay) {
      stampOverlay.classList.add('hidden', 'opacity-0', 'pointer-events-none');
      stampOverlay.classList.remove('opacity-100');
    }

    // Initialisation responsive des accordéons coach et signatures
    const isDesktop = window.innerWidth >= 1024;
    const coachDetails = document.getElementById('mercato-coach-details');
    if (coachDetails) coachDetails.open = isDesktop;
    const sigDetails = document.getElementById('mercato-signatures-details');
    if (sigDetails) sigDetails.open = isDesktop;
    if (typeof closeMobileNegotiation === 'function') closeMobileNegotiation();

    currentMarketPlayers = generateProceduralMarket(activeScenario.budget, activeScenario);

    // Mise à jour du rappel permanent de budget dans la pop-up / desk de négociation
  const budgetStr = `${currentRemainingBudget.toFixed(1)} M€`;
  const elNegoBudget = document.getElementById('nego-budget-amount');
  if (elNegoBudget) elNegoBudget.textContent = budgetStr;
  const elNegoMobBudget = document.getElementById('nego-mobile-budget');
  if (elNegoMobBudget) elNegoMobBudget.textContent = budgetStr;

  const badgeEl = document.getElementById('mercato-club-badge');
    if (badgeEl) badgeEl.textContent = getClubInitials(activeScenario.club);

    const titleEl = document.getElementById('mercato-club-title');
    if (titleEl) titleEl.textContent = activeScenario.club || '';

    // Cohérence stricte de l'objectif selon le niveau de difficulté
    const objEl = document.getElementById('mercato-club-objective');
    if (objEl) {
      let targetObj = activeScenario.objective;
      if (activeScenario.difficulty === 'difficile') {
        if (!targetObj || targetObj.toLowerCase().includes('c1') || targetObj.toLowerCase().includes('titre') || targetObj.toLowerCase().includes('podium')) {
          targetObj = "Maintien héroïque & Éviter la relégation";
          activeScenario.objective = targetObj;
        }
      } else if (activeScenario.difficulty === 'moyen') {
        if (!targetObj || targetObj.toLowerCase().includes('c1') || targetObj.toLowerCase().includes('titre')) {
          targetObj = "Top 6 & Qualification Européenne";
          activeScenario.objective = targetObj;
        }
      } else {
        if (!targetObj) {
          targetObj = "Course au Titre & Qualification C1";
          activeScenario.objective = targetObj;
        }
      }
      objEl.textContent = `Objectif : ${targetObj}`;
    }

    const originNote = (activeScenario.originConstraint && activeScenario.originConstraint.code !== 'FREE')
      ? `<span class="block mt-1 font-bold text-amber-300 not-italic">Réseau prioritaire : ${activeScenario.originConstraint.name} (${activeScenario.originConstraint.shortDesc})</span>`
      : '';
    const tacticalClues = (activeScenario.needs && activeScenario.needs.length > 0)
      ? activeScenario.needs.map((n, i) => {
          const posInfo = formatNeedPositionLabels(n);
          return `<span class="block mt-1 font-normal text-blue-100 text-xs sm:text-[13px] leading-relaxed">• <strong>${posInfo.fullConcatenated}</strong> : ${n.tacticalClue || n.name}</span>`;
        }).join('')
      : activeScenario.coachDemand;

    const reminderEl = document.getElementById('mercato-coach-reminder');
    if (reminderEl) {
      reminderEl.innerHTML = `<span class="font-extrabold text-white block mb-1">"Voici mes exigences tactiques impératives :"</span>${tacticalClues}${originNote}`;
    }

    updateMercatoHUD();
    renderSignedPlayers();
    renderMarketPlayers();

    const btnClose = document.getElementById('btn-close-mercato');
    if (btnClose) btnClose.classList.remove('hidden');
    const btnCloseMob = document.getElementById('btn-close-mercato-mobile');
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
      showToast('Gong Final : La Deadline Day est terminée !', 'info', 2000);
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
  const iconWrapper = document.getElementById('madness-icon-wrapper');

  if (!modal || !titleEl || !descEl || !actionsEl) return;

  const isSaleOffer = Math.random() < 0.65;

  if (isSaleOffer) {
    const BUYERS = ['Al-Nassr FC', 'Chelsea FC', 'Paris SG', 'Al-Hilal', 'Manchester City', 'Bayern München'];
    const buyer = BUYERS[Math.floor(Math.random() * BUYERS.length)];

    let cashBonus = 3.0;
    if (activeScenario && activeScenario.difficulty === 'facile') cashBonus = 25.0;
    else if (activeScenario && activeScenario.difficulty === 'moyen') cashBonus = 7.5;
    else cashBonus = 2.8;

    if (iconWrapper) {
      iconWrapper.className = 'w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-xs';
      iconWrapper.innerHTML = `
        <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      `;
    }

    titleEl.textContent = `Offre Inattendue : Achat Express (${buyer})`;
    descEl.innerHTML = `
      Un émissaire de <strong>${buyer}</strong> débarque en urgence à 23h30 !<br><br>
      Ils cherchent un joueur de complément et formulent une offre ferme et immédiate pour racheter l'un de vos remplaçants.<br><br>
      Si vous acceptez, le club encaisse immédiatement <strong class="text-emerald-600 dark:text-emerald-400 font-bold">+${cashBonus.toFixed(1)} M€</strong> sur vos liquidités disponibles pour le sprint final !
    `;

    // Choix interactif : Bouton primaire 'Accepter l'offre' + Bouton secondaire 'Refuser'
    actionsEl.innerHTML = `
      <button onclick="acceptMadnessSale(${cashBonus})" class="flex-1 py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition">
        Accepter l'offre (+${cashBonus.toFixed(1)} M€)
      </button>
      <button onclick="closeMadnessModal()" class="flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition">
        Refuser
      </button>
    `;
  } else {
    // Braderie Flash du vendeur (-35%)
    const available = currentMarketPlayers.filter(p => !p.isSoldToRival && !p.isNegotiationFailed && !currentSignedPlayers.some(sp => sp.id === p.id));
    if (available.length === 0) {
      if (iconWrapper) {
        iconWrapper.className = 'w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3 shadow-xs';
      }
      titleEl.textContent = "Offre Inattendue : Opportunité Marché";
      descEl.innerHTML = "Une vague de rumeurs secoue les dernières minutes du marché des transferts. Restez vigilant sur vos cibles prioritaires.";
      actionsEl.innerHTML = `
        <button onclick="closeMadnessModal()" class="w-full py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm shadow-xs transition">
          Compris
        </button>
      `;
      modal.classList.remove('hidden');
      return;
    }

    const target = available[Math.floor(Math.random() * available.length)];
    const oldPrice = target.estimatedPrice;
    const newPrice = Math.round(target.estimatedPrice * 0.65 * 10) / 10;
    target.estimatedPrice = newPrice;
    target.hiddenRealPrice = Math.round(target.hiddenRealPrice * 0.65 * 10) / 10;
    target.availability = 'BRADERIE FLASH (-35%)';

    if (iconWrapper) {
      iconWrapper.className = 'w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-3 shadow-xs';
      iconWrapper.innerHTML = `
        <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
          <polyline points="17 6 23 6 23 12"/>
        </svg>
      `;
    }

    titleEl.textContent = `Offre Inattendue : Braderie Flash (${target.club})`;
    descEl.innerHTML = `
      Le directeur sportif de <strong>${target.club}</strong> est aux abois avant la fermeture du marché !<br><br>
      Pour éviter de conserver son joueur mécontent, il brade <strong>${target.name}</strong> (${target.pos} • ${target.reputation}) pour seulement <strong class="text-emerald-600 dark:text-emerald-400 font-bold">${newPrice.toFixed(1)} M€</strong> (au lieu de ${oldPrice.toFixed(1)} M€) !<br><br>
      Profitez de cette opportunité en or sur le marché avant minuit !
    `;

    // Simple information / opportunité : Bouton primaire 'Voir la recrue' + Bouton secondaire 'Ignorer'
    actionsEl.innerHTML = `
      <button onclick="closeMadnessModal(); filterMarketPosition('${target.pos}')" class="flex-1 py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-xs transition">
        Voir la recrue (${newPrice.toFixed(1)} M€)
      </button>
      <button onclick="closeMadnessModal()" class="flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition">
        Ignorer
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
  if (banner && bannerText) {
    bannerText.textContent = `VENTE CONFIRMÉE : +${cashBonus.toFixed(1)} M€ ajoutés à vos liquidités pour le sprint final !`;
    banner.classList.remove('hidden');
    setTimeout(() => banner.classList.add('hidden'), 5000);
  }
}

function closeMadnessModal() {
  const modal = document.getElementById('modal-deadline-madness');
  if (modal) modal.classList.add('hidden');
}
window.closeMadnessModal = closeMadnessModal;
window.acceptMadnessSale = acceptMadnessSale;

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

function formatNeedPositionLabels(need) {
  if (!need) return { fullPos: '', shortPos: '', profile: '', fullConcatenated: '', shortConcatenated: '' };
  const code = (typeof need === 'object' ? (need.code || '') : need).toUpperCase();
  let fullPos = '';
  let shortPos = '';

  if (code === 'DC') {
    fullPos = 'Défenseur Central (DC)';
    shortPos = 'DC';
  } else if (code === 'DD') {
    fullPos = 'Latéral Droit (DD)';
    shortPos = 'DD';
  } else if (code === 'DG') {
    fullPos = 'Latéral Gauche (DG)';
    shortPos = 'DG';
  } else if (code === 'MDF') {
    fullPos = 'Sentinelle (MDF)';
    shortPos = 'MDF';
  } else if (code === 'MC') {
    fullPos = 'Milieu Relayeur (MC)';
    shortPos = 'MC';
  } else if (code === 'MO') {
    fullPos = 'Meneur de Jeu (MO)';
    shortPos = 'MO';
  } else if (code === 'BU') {
    fullPos = 'Buteur (BU)';
    shortPos = 'BU';
  } else if (code === 'AG') {
    fullPos = 'Ailier Gauche (AG)';
    shortPos = 'AG';
  } else if (code === 'AD') {
    fullPos = 'Ailier Droit (AD)';
    shortPos = 'AD';
  } else if (code === 'GAR' || code === 'GB') {
    fullPos = 'Gardien de But (GB)';
    shortPos = 'GB';
  } else if (code.includes('6_DC')) {
    fullPos = 'Polyvalent (6 / DC)';
    shortPos = '6 / DC';
  } else if (code.includes('DG_DD') || code === 'LATERAL' || code.includes('LATERAUX')) {
    fullPos = 'Latéral Deux Côtés (DG / DD)';
    shortPos = 'DG / DD';
  } else if (code.includes('PISTON')) {
    fullPos = 'Piston / Ailier';
    shortPos = 'Piston';
  } else if (code.includes('6_8')) {
    fullPos = 'Polyvalent (6 & 8)';
    shortPos = '6 / 8';
  } else if (code.includes('8_10')) {
    fullPos = 'Polyvalent (8 & 10)';
    shortPos = '8 / 10';
  } else if (code.includes('10_AILIER')) {
    fullPos = 'Polyvalent (10 / Ailier)';
    shortPos = '10 / Ailier';
  } else if (code.includes('DEUX_AILES')) {
    fullPos = 'Polyvalent (Deux Ailes)';
    shortPos = 'AG / AD';
  } else if (code.includes('ATTAQUE') || code.includes('BU_AILIER')) {
    fullPos = 'Polyvalent (Buteur / Ailier)';
    shortPos = 'BU / Ailier';
  } else if (code.includes('U21')) {
    fullPos = 'Pépite U21 (-21 ans)';
    shortPos = 'U21';
  } else {
    fullPos = need.name || code;
    shortPos = code;
  }

  const profile = need.tacticalTitle || need.name || code;
  let fullConcatenated = profile;
  let shortConcatenated = profile;

  if (profile && fullPos && !profile.toLowerCase().includes(shortPos.toLowerCase())) {
    fullConcatenated = `${fullPos} - ${profile}`;
    shortConcatenated = `${shortPos} - ${profile}`;
  } else {
    fullConcatenated = profile || fullPos;
    shortConcatenated = profile || shortPos;
  }

  return { fullPos, shortPos, profile, fullConcatenated, shortConcatenated };
}

// VÉRIFICATION DE CORRESPONDANCE DES 3 BESOINS (POSTES, RÔLES, POLYVALENCE)
// ==============================================================

// ==============================================================
// BASE DE DONNÉES DES PROFILS TACTIQUES & INDICES DU COACH
// ==============================================================
const TACTICAL_PROFILES_BY_POS = {
  GAR: [
    {
      tacticalTitle: "Gardien Relanceur",
      archetypeCode: "GAR_SWEEPER",
      clue: "Il me faut un gardien moderne capable de relancer court sous pression pour faire monter notre bloc."
    },
    {
      tacticalTitle: "Mur sur sa Ligne",
      archetypeCode: "GAR_MUR",
      clue: "Je veux un mur sur sa ligne, imbattable à bout portant sur les tirs réflexes."
    },
    {
      tacticalTitle: "Colosse Aérien",
      archetypeCode: "GAR_COLOSSE",
      clue: "Il nous faut un gardien géant dominant dans les airs pour sécuriser tous les centres."
    }
  ],
  DC: [
    {
      tacticalTitle: "Défenseur Relanceur",
      archetypeCode: "DC_LIBERO_RELANCEUR",
      clue: "Un libéro technique avec une relance laser pour ressortir proprement de nos 30 mètres."
    },
    {
      tacticalTitle: "Stoppeur Rugueux",
      archetypeCode: "DC_STOPPEUR_BRUTAL",
      clue: "Un stoppeur viril intraitable au duel physique au corps-à-corps et dans le combat."
    },
    {
      tacticalTitle: "Défenseur Couvreur",
      archetypeCode: "DC_COUVREUR_RAPIDE",
      clue: "Un défenseur rapide pour couvrir la profondeur et rattraper les attaquants lancés."
    },
    {
      tacticalTitle: "Leader de Ligne",
      archetypeCode: "DC_LEADER_VOCAL",
      clue: "Un patron vocal pour commander notre arrière-garde avec une rigueur tactique totale."
    }
  ],
  LATERAL: [
    {
      tacticalTitle: "Piston TGV",
      archetypeCode: "LAT_PISTON_TGV",
      clue: "Un piston supersonique qui déboule dans son couloir pour multiplier les centres tranchants."
    },
    {
      tacticalTitle: "Latéral Cadenas",
      archetypeCode: "LAT_CADENAS_DEF",
      clue: "Un latéral cadenas pour museler l'ailier vedette adverse et verrouiller le couloir."
    },
    {
      tacticalTitle: "Latéral Intérieur",
      archetypeCode: "LAT_INVERTED",
      clue: "Un faux latéral intelligent pour repiquer dans le demi-espace et densifier l'entrejeu."
    }
  ],
  MDF: [
    {
      tacticalTitle: "Sentinelle Râtisseur",
      archetypeCode: "MDF_RATISSEUR",
      clue: "Un râtisseur infatigable qui coupe les trajectoires et presse haut pour étouffer l'adversaire."
    },
    {
      tacticalTitle: "Regista / Maestro",
      archetypeCode: "MDF_REGISTA",
      clue: "Une plaque tournante capable d'orienter le tempo par des transversales millimétrées."
    },
    {
      tacticalTitle: "Sentinelle Physique",
      archetypeCode: "MDF_COLOSSE",
      clue: "Un colosse aérien intimidant pour régner dans les airs et poser un verrou dans l'axe."
    }
  ],
  MC: [
    {
      tacticalTitle: "Milieu Box-to-Box",
      archetypeCode: "MC_BOX_TO_BOX",
      clue: "Un milieu infatigable avec un gros volume de jeu, capable d'attaquer la surface et de se replier."
    },
    {
      tacticalTitle: "Métronome de Possession",
      archetypeCode: "MC_METRONOME",
      clue: "Un métronome technique pour temporiser, conserver le cuir et fluidifier nos circuits."
    },
    {
      tacticalTitle: "Percuteur Balle au Pied",
      archetypeCode: "MC_PERCUTEUR",
      clue: "Un milieu percutant capable de casser les lignes par ses accélérations dévastatrices."
    }
  ],
  MO: [
    {
      tacticalTitle: "Meneur Magicien (10)",
      archetypeCode: "MO_MAGICIEN",
      clue: "Un 10 pur créatif capable de débloquer les défenses regroupées par une passe d'anthologie."
    },
    {
      tacticalTitle: "Meneur Pressant",
      archetypeCode: "MO_PRESSING",
      clue: "Un meneur travailleur qui griffe des ballons hauts et joue vite pour ses partenaires."
    },
    {
      tacticalTitle: "Sniper des 25m",
      archetypeCode: "MO_SNIPER",
      clue: "Un sniper capable de faire basculer une rencontre fermée d'un missile de loin."
    }
  ],
  AILIER: [
    {
      tacticalTitle: "Flèche de Débordement",
      archetypeCode: "AIL_FLECHE_LIGNE",
      clue: "Une flèche supersonique qui prend la profondeur et dépose son vis-à-vis en un contre un."
    },
    {
      tacticalTitle: "Ailier Intérieur Buteur",
      archetypeCode: "AIL_INTERIEUR_BUTEUR",
      clue: "Un ailier percutant qui repique vers l'axe pour enrouler et empiler les buts."
    },
    {
      tacticalTitle: "Dribbleur Provocateur",
      archetypeCode: "AIL_SOLISTE_DRIBBLEUR",
      clue: "Un soliste imprévisible qui déséquilibre les blocs compacts et provoque fautes et cartons."
    }
  ],
  BU: [
    {
      tacticalTitle: "Renard des Surfaces",
      archetypeCode: "BU_RENARD_CLINIQUE",
      clue: "Un renard clinique qui transforme la moindre demi-occasion en but au fond des filets."
    },
    {
      tacticalTitle: "Pivot Athlétique",
      archetypeCode: "BU_PIVOT_ATHLETIQUE",
      clue: "Un pivot athlétique pour gagner tous les dégagements aériens et faire monter notre bloc."
    },
    {
      tacticalTitle: "Faux 9 Décrocheur",
      archetypeCode: "BU_FAUX_NEUF",
      clue: "Un faux 9 combinatoire qui décroche entre les lignes pour ouvrir des boulevards aux ailiers."
    }
  ]
};

function enrichScenarioTacticalDemands(scenario) {
  if (!scenario || !scenario.needs) return;

  const scId = typeof scenario.id === 'number' ? scenario.id : 42;

  scenario.needs.forEach((need, idx) => {
    if (need.tacticalTitle && need.tacticalClue) return;

    const code = (need.code || '').toUpperCase();
    let posKey = null;

    if (code === 'GAR') posKey = 'GAR';
    else if (code === 'DC') posKey = 'DC';
    else if (['DG', 'DD', 'LATERAL'].includes(code)) posKey = 'LATERAL';
    else if (code === 'MDF') posKey = 'MDF';
    else if (code === 'MC') posKey = 'MC';
    else if (code === 'MO') posKey = 'MO';
    else if (['AG', 'AD', 'AILIER'].includes(code)) posKey = 'AILIER';
    else if (code === 'BU' || code === 'ATT') posKey = 'BU';

    if (posKey && TACTICAL_PROFILES_BY_POS[posKey]) {
      const list = TACTICAL_PROFILES_BY_POS[posKey];
      const pickIdx = Math.abs((scId * 7 + idx * 11) % list.length);
      const chosen = list[pickIdx];
      need.tacticalTitle = chosen.tacticalTitle;
      need.archetypeCode = chosen.archetypeCode;
      need.tacticalClue = chosen.clue;
    } else if (code.includes('6_DC')) {
      need.tacticalTitle = "Polyvalent 6 / DC";
      need.tacticalClue = "Un profil hybride capable d'évoluer en Sentinelle (6) et de dépanner en Défenseur Central.";
      need.allowedArchetypes = ['MDF_RATISSEUR', 'MDF_COLOSSE', 'DC_STOPPEUR_BRUTAL', 'DC_LIBERO_RELANCEUR'];
    } else if (code.includes('DG_DD') || code.includes('LATERAUX')) {
      need.tacticalTitle = "Polyvalent Deux Côtés";
      need.tacticalClue = "Un latéral polyvalent capable d'occuper les couloirs gauche (DG) et droit (DD).";
      need.allowedArchetypes = ['LAT_PISTON_TGV', 'LAT_CADENAS_DEF', 'LAT_INVERTED'];
    } else if (code.includes('ATTAQUE') || code.includes('BU_AILIER')) {
      need.tacticalTitle = "Polyvalent Buteur / Ailier";
      need.tacticalClue = "Un attaquant polyvalent à l'aise aussi bien en pointe axiale (9) que sur les ailes.";
      need.allowedArchetypes = ['BU_RENARD_CLINIQUE', 'BU_FAUX_NEUF', 'AIL_INTERIEUR_BUTEUR', 'AIL_FLECHE_LIGNE'];
    } else if (code.includes('6_8')) {
      need.tacticalTitle = "Polyvalent 6 & 8";
      need.tacticalClue = "Un milieu complet capable d'assurer en Sentinelle défensive et en Relayeur box-to-box.";
      need.allowedArchetypes = ['MDF_RATISSEUR', 'MC_BOX_TO_BOX', 'MC_METRONOME'];
    } else if (code.includes('8_10')) {
      need.tacticalTitle = "Polyvalent 8 & 10";
      need.tacticalClue = "Un milieu créatif capable de jouer en Relayeur et de monter d'un cran en Meneur.";
      need.allowedArchetypes = ['MC_METRONOME', 'MC_PERCUTEUR', 'MO_MAGICIEN', 'MO_PRESSING'];
    } else if (code.includes('PISTON')) {
      need.tacticalTitle = "Piston / Ailier";
      need.tacticalClue = "Un coureur de couloir polyvalent capable de jouer Piston et Ailier de débordement.";
      need.allowedArchetypes = ['LAT_PISTON_TGV', 'AIL_FLECHE_LIGNE'];
    } else if (code.includes('U21')) {
      need.tacticalTitle = "Pépite U21";
      need.tacticalClue = "Un jeune diamant brut de moins de 21 ans (U21) avec un fort potentiel de progression.";
    } else {
      need.tacticalTitle = need.name || code;
      need.tacticalClue = `Un profil solide au poste de ${need.name || code}.`;
    }
  });

  // Re-génère la consigne de présentation du coach comme UNIQUE INDICE
  const cluesList = scenario.needs.map((n, i) => {
    const posInfo = formatNeedPositionLabels(n);
    return `${i + 1}. [${posInfo.fullConcatenated}] : ${n.tacticalClue}`;
  }).join(' ');
  scenario.coachDemand = `"Notre plan de jeu est strict. Voici mes exigences tactiques impératives : ${cluesList}"`;
}

// ==============================================================
// VÉRIFICATION DE CORRESPONDANCE DES 3 BESOINS (PROFIL TACTIQUE & RÔLE)
// ==============================================================
function checkPlayerFulfillsNeed(player, need) {
  if (!player || !need) return false;

  // 1. Exigence stricte par Archétype / Rôle précis demandé par le coach
  // Si le coach exige un profil tactique précis (ex: LAT_PISTON_TGV), un autre profil (ex: LAT_INVERTED) NE DOIT PAS être validé
  if (need.archetypeCode) {
    return !!(player.archetype && player.archetype.code === need.archetypeCode);
  }

  // 2. Si le besoin autorise une liste précise d'archétypes (ex: profils polyvalents)
  if (need.allowedArchetypes && Array.isArray(need.allowedArchetypes) && need.allowedArchetypes.length > 0) {
    return !!(player.archetype && need.allowedArchetypes.includes(player.archetype.code));
  }

  // 3. Critère spécial U21
  const needCode = typeof need === 'object' ? need.code : need;
  if (needCode === 'PEPITE_U21' || (need.tacticalTitle && need.tacticalTitle.includes('U21'))) {
    return player.age <= 21;
  }

  // 4. Polyvalences tactiques sans liste d'archétypes stricte
  const v = (player.versatility || '').toUpperCase();
  const sub = player.subPos || player.pos || '';

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
    return (sub === 'DC' && (v.includes('DG') || v.includes('DD') || v.includes('LATÉRAL') || v.includes('LATERAL'))) ||
           ((sub === 'DG' || sub === 'DD') && v.includes('DC'));
  }

  // 5. Fallback uniquement si aucun archétype précis n'était exigé
  if (needCode === 'DC') return sub === 'DC';
  if (needCode === 'DG') return sub === 'DG';
  if (needCode === 'DD') return sub === 'DD';
  if (needCode === 'MDF') return sub === 'MDF';
  if (needCode === 'MC') return sub === 'MC';
  if (needCode === 'MO') return sub === 'MO';
  if (needCode === 'BU') return sub === 'BU';
  if (needCode === 'AG') return sub === 'AG';
  if (needCode === 'AD') return sub === 'AD';
  if (needCode === 'GAR') return sub === 'GAR' || player.pos === 'GAR';

  return false;
}


function updateMercatoHUD() {
  const budgetEl = document.getElementById('mercato-remaining-budget');
  const elMobNegoBud = document.getElementById('nego-mobile-budget');
  if (elMobNegoBud) {
    elMobNegoBud.textContent = `${currentRemainingBudget.toFixed(1)} M€`;
  }

  if (budgetEl) {
    budgetEl.textContent = `${currentRemainingBudget.toFixed(1)} M€`;
    if (currentRemainingBudget <= 0.2) {
      budgetEl.className = 'text-sm sm:text-xl font-display font-bold text-rose-500 animate-pulse';
    } else {
      budgetEl.className = 'text-sm sm:text-xl font-display font-bold text-emerald-400';
    }
  }

  // 3 Besoins & Missions tracker avec titres tactiques et zéro emoji
  const needsBadge = document.getElementById('mercato-needs-badge');
  if (needsBadge && activeScenario && activeScenario.needs) {
    const usedPlayerIds = new Set();
    const badgesHtml = activeScenario.needs.map(n => {
      const match = currentSignedPlayers.find(p => !usedPlayerIds.has(p.id) && checkPlayerFulfillsNeed(p, n));
      const posInfo = formatNeedPositionLabels(n);

      if (match) {
        usedPlayerIds.add(match.id);
        return `<span class="inline-flex items-center gap-1.5 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-[11px] font-bold shadow-xs whitespace-nowrap">
          <span>${posInfo.shortConcatenated}</span>
          <span class="text-slate-400 dark:text-slate-500 font-normal">|</span>
          <span class="bg-emerald-600 text-white text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded">SIGNÉ</span>
        </span>`;
      } else {
        return `<span class="inline-flex items-center gap-1.5 bg-white/90 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-full text-[11px] font-bold shadow-xs whitespace-nowrap">
          <strong class="text-blue-600 dark:text-blue-400 font-extrabold">${posInfo.shortConcatenated}</strong>
          <span class="text-slate-400 dark:text-slate-500 font-normal">|</span>
          <span class="bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded">À POURVOIR</span>
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
    countLabel.textContent = `${activeCount} joueur${activeCount > 1 ? 's' : ''}`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="bg-white dark:bg-[#121826] border border-gray-200 dark:border-slate-800 rounded-2xl p-8 text-center text-gray-400 text-xs">
        Aucun joueur disponible pour ce poste.
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((p, idx) => {
    const subPos = p.subPos || p.pos || 'PRO';
    let posBadgeStyle = 'bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-gray-300 dark:border-slate-700';
    if (['DC', 'DD', 'DG', 'DEF'].includes(subPos)) {
      posBadgeStyle = 'bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
    } else if (['MDF', 'MC', 'MO', 'MIL'].includes(subPos)) {
      posBadgeStyle = 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    } else if (['BU', 'AG', 'AD', 'ATT'].includes(subPos)) {
      posBadgeStyle = 'bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
    } else if (['GAR', 'GB'].includes(subPos)) {
      posBadgeStyle = 'bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
    }

    const flagHtml = renderFlag(p.nationality, p.nationality ? p.nationality.name : '');
    const isLocked = !!p.isLockedByRival;
    const isCurrentlyNegotiating = !!p.isNegotiating;

    if (p.isSoldToRival) {
      return `
        <div class="bg-white/60 dark:bg-[#121826]/40 border border-gray-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 opacity-40 flex items-center justify-between gap-4 min-h-[90px]">
          <div class="shrink-0 flex items-center justify-center">
            <span class="px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold ${posBadgeStyle} border">${subPos}</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; gap: 8px; min-width: 0;">
              ${flagHtml}
              <h4 class="font-extrabold text-sm text-gray-400 line-through truncate">${p.name}</h4>
              <span class="text-xs text-gray-400 font-medium shrink-0 whitespace-nowrap">(${p.age} ans)</span>
            </div>
            <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
              <span class="px-1.5 py-0.5 rounded text-[8.5px] font-bold uppercase tracking-wider bg-red-100 dark:bg-red-950/60 text-red-600 border border-red-200 dark:border-red-800 shrink-0">VENDU À UN CONCURRENT</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; align-items: flex-end; justify-content: center; gap: 6px; flex-shrink: 0;">
            <span class="text-xs font-bold text-gray-400">VENDU</span>
          </div>
        </div>
      `;
    }

    if (p.isNegotiationFailed) {
      return `
        <div class="bg-white/60 dark:bg-[#121826]/40 border border-red-200 dark:border-red-900/30 rounded-2xl p-4 sm:p-5 opacity-50 flex items-center justify-between gap-4 min-h-[90px]">
          <div class="shrink-0 flex items-center justify-center">
            <span class="px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold ${posBadgeStyle} border">${subPos}</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; gap: 8px; min-width: 0;">
              <span class="shrink-0 leading-none">${flagHtml}</span>
              <h4 class="font-extrabold text-sm text-slate-800 dark:text-gray-300 truncate">${p.name}</h4>
              <span class="text-xs text-gray-400 font-medium shrink-0 whitespace-nowrap">(${p.age} ans)</span>
            </div>
            <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
              <span class="px-1.5 py-0.5 rounded text-[8.5px] font-bold uppercase tracking-wider bg-red-100 dark:bg-red-950/60 text-red-600 border border-red-200 dark:border-red-800 shrink-0">NÉGOCIATIONS ROMPUES</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; align-items: flex-end; justify-content: center; gap: 6px; flex-shrink: 0;">
            <span class="text-[10px] font-bold text-red-500 bg-red-50 dark:bg-red-950/40 px-2.5 py-1 rounded-full">Échec</span>
          </div>
        </div>
      `;
    }

    const archetypeLabel = p.archetype ? p.archetype.name : (p.subPosName || 'Titulaire');
    const personalityLabel = (p.psychology && p.psychology.label) ? p.psychology.label.trim() : (Array.isArray(p.traits) && p.traits[0] ? p.traits[0] : '');
    const strengthText = p.archetype && p.archetype.strength ? p.archetype.strength : 'Grande régularité et respect des consignes du coach.';
    const sacrificeText = p.archetype && p.archetype.sacrifice ? p.archetype.sacrifice : 'Rendement limité face aux attaques de très haut niveau.';

    // Construction exclusive des badges de la Ligne 2 : ZÉRO SPOILER CIBLE COACH !
    const badges = [];
    if (p.age <= 21) {
      badges.push('<span class="px-2 py-0.5 rounded text-[8.5px] font-extrabold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60 whitespace-nowrap shrink-0">U21</span>');
    }
    if (p.versatility) {
      badges.push('<span class="px-2 py-0.5 rounded text-[8.5px] font-extrabold uppercase tracking-wider bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/60 whitespace-nowrap shrink-0">POLYVALENT</span>');
    }
    if (p.isRivalBidActive) {
      badges.push('<span class="px-2 py-0.5 rounded text-[8.5px] font-extrabold uppercase tracking-wider bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-red-300 border border-red-200/80 dark:border-red-800/60 whitespace-nowrap shrink-0">OFFRE RIVALE</span>');
    }
    if (badges.length === 0) {
      badges.push('<span class="px-2 py-0.5 rounded text-[8.5px] font-semibold uppercase tracking-wider bg-slate-100/70 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800 whitespace-nowrap shrink-0">DISPONIBLE</span>');
    }

    return `
      <div data-player-id="${p.id}" class="bg-white dark:bg-[#121826] border ${isCurrentlyNegotiating ? 'border-blue-600 ring-2 ring-blue-500/20' : 'border-gray-200/80 dark:border-slate-800'} rounded-2xl p-4 sm:p-5 shadow-sm hover:border-blue-400 dark:hover:border-blue-500/50 transition-all min-h-[92px] flex flex-col justify-center">
        
        <!-- CONTENEUR PRINCIPAL DE LA CARTE -->
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px;">
          
          <!-- PASTILLE DU POSTE (À GAUCHE, CENTRÉE VERTICALEMENT) -->
          <div class="shrink-0 flex items-center justify-center">
            <span class="px-2.5 py-1.5 rounded-xl text-xs font-mono font-black border shadow-xs ${posBadgeStyle}">
              ${subPos}
            </span>
          </div>

          <!-- BLOC CENTRAL (INFORMATIONS DU JOUEUR) -->
          <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; min-width: 0;">
            
            <!-- LIGNE 1 : CONTENEUR DU NOM ET DE L'ÂGE FORCÉS STRICTEMENT SUR LA MÊME LIGNE -->
            <div style="display: flex; align-items: center; gap: 8px; min-width: 0;">
              <span class="shrink-0 leading-none">${flagHtml}</span>
              <h4 class="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight truncate">
                ${p.name}
              </h4>
              <span class="text-xs text-gray-400 dark:text-gray-500 font-semibold shrink-0 whitespace-nowrap">
                (${p.age} ans)
              </span>
            </div>

            <!-- LIGNE 2 : BADGES SANS TRONCATURE RESTRICTIVE -->
            <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
              ${badges.join('')}
            </div>

          </div>

          <!-- CONTENEUR FLEX COMMUN DU BLOC D'ACTION (PRIX CONNECTÉ JUSTE AU-DESSUS DU BOUTON) -->
          <div style="display: flex; flex-direction: column; align-items: flex-end; justify-content: center; gap: 6px; flex-shrink: 0;">
            
            <!-- VALEUR MARCHANDE POSITIONNÉE JUSTE AU-DESSUS, BIEN ALIGNÉE À DROITE -->
            <div class="text-right whitespace-nowrap leading-none">
              <span class="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-sans tracking-tight">
                ${p.estimatedPrice} M€
              </span>
            </div>

            <!-- BOUTON NÉGOCIER + CHEVRON -->
            <div class="flex items-center gap-1.5 sm:gap-2">
              <button onclick="startNegotiation('${p.id}')" ${isLocked ? 'disabled' : ''} class="px-3.5 sm:px-4 py-2 rounded-xl font-bold text-xs transition transform hover:scale-[1.02] shadow-sm whitespace-nowrap ${isCurrentlyNegotiating ? 'bg-blue-600 text-white' : (isLocked ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-black text-white dark:bg-white dark:text-slate-900 dark:hover:bg-gray-100')}">
                ${isCurrentlyNegotiating ? 'En ligne' : (isLocked ? 'Occupé' : 'Négocier')}
              </button>

              <button onclick="togglePlayerAccordion('${p.id}')" class="p-2 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-slate-800 border border-transparent hover:border-gray-200 dark:hover:border-slate-700 transition shrink-0" title="Afficher Profil, Atout & Faille">
                <svg class="w-4 h-4 transition-transform duration-200" id="chevron-${p.id}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
            </div>

          </div>

        </div>

        <!-- ZONE DÉPLIÉE DE LA CARTE (ACCORDÉON ALLÉGÉ SANS FOND GRIS SOUSTRAIT NI BORDURES COLORÉES) -->
        <div id="accordion-${p.id}" class="hidden pt-3 mt-3 border-t border-gray-100 dark:border-slate-800/80 space-y-3">
          
          <!-- LIGNE DE CONTEXTE ÉPURÉE POSÉE DIRECTEMENT SUR LE FOND AVEC POINTS MÉDIANS -->
          <div class="text-xs text-slate-600 dark:text-slate-400 font-medium flex items-center flex-wrap gap-1.5 px-0.5">
            <span class="font-extrabold text-slate-900 dark:text-white">${archetypeLabel}</span>
            ${p.club ? `<span class="text-slate-300 dark:text-slate-600">•</span><span class="text-slate-700 dark:text-slate-300 font-medium">${p.club}</span>` : ''}
            <span class="text-slate-300 dark:text-slate-600">•</span>
            <span class="text-slate-500 dark:text-slate-400 italic">${p.availability || 'Libre de négocier'}</span>
            ${personalityLabel ? `<span class="text-slate-300 dark:text-slate-600">•</span><span class="text-slate-500 dark:text-slate-400 font-medium">${personalityLabel}</span>` : ''}
          </div>

          <!-- GRILLE FLAT-DESIGN 2 COLONNES : SANS BORDURES, REMPLISSAGE SUBTIL & BORDER-RADIUS DOUX -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            <!-- ATOUT MAJEUR (VERT TRÈS PÂLE SANS BORDURE) -->
            <div class="bg-emerald-500/10 dark:bg-emerald-500/10 rounded-2xl p-3.5 sm:p-4 text-xs">
              <div class="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-extrabold text-[11px] uppercase tracking-wide mb-1.5">
                <svg class="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Atout Majeur</span>
              </div>
              <p class="text-slate-700 dark:text-slate-300 text-xs leading-relaxed font-normal">${strengthText}</p>
            </div>

            <!-- POINT FAIBLE TACTIQUE (ROUGE TRÈS PÂLE SANS BORDURE) -->
            <div class="bg-rose-500/10 dark:bg-rose-500/10 rounded-2xl p-3.5 sm:p-4 text-xs">
              <div class="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 font-extrabold text-[11px] uppercase tracking-wide mb-1.5">
                <svg class="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                <span>Point Faible Tactique</span>
              </div>
              <p class="text-slate-700 dark:text-slate-300 text-xs leading-relaxed font-normal">${sacrificeText}</p>
            </div>

          </div>

        </div>

      </div>
    `;
  }).join('');
}

function togglePlayerAccordion(playerId) {
  const el = document.getElementById('accordion-' + playerId);
  const chevron = document.getElementById('chevron-' + playerId);
  if (!el) return;
  const isHidden = el.classList.contains('hidden');
  if (isHidden) {
    el.classList.remove('hidden');
    if (chevron) chevron.style.transform = 'rotate(180deg)';
  } else {
    el.classList.add('hidden');
    if (chevron) chevron.style.transform = 'rotate(0deg)';
  }
}
window.togglePlayerAccordion = togglePlayerAccordion;


function renderSignedPlayers() {
  const container = document.getElementById('signed-players-list');
  const countEl = document.getElementById('signed-count');
  const spentEl = document.getElementById('total-spent');

  if (!container) return;

  if (countEl) {
    countEl.textContent = `${currentSignedPlayers.length} recrue${currentSignedPlayers.length > 1 ? 's' : ''}`;
  }

  let totalSpent = 0;

  if (currentSignedPlayers.length === 0) {
    container.innerHTML = `
      <p class="text-xs text-gray-400 italic p-3 text-center border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl">
        Aucune signature pour le moment.<br>Négociez avant la fin des 5 minutes !
      </p>
    `;
  } else {
    container.innerHTML = currentSignedPlayers.map(p => {
      totalSpent += (p.agreedPrice || 0);

      return `
        <div class="bg-gray-50/80 dark:bg-slate-800/60 border border-gray-100 dark:border-slate-800 rounded-2xl p-3 flex items-center justify-between">
          <div class="min-w-0 flex-1 mr-2">
            <h5 class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 truncate">
              ${p.nationality ? `<span class="inline-flex items-center shrink-0">${renderFlag(p.nationality.flag, p.nationality.name)}</span>` : ''}
              <span class="truncate">${p.name}</span>
            </h5>
            <span class="text-[10px] text-blue-600 dark:text-blue-400 block truncate">${p.subPosName || p.subPos || p.pos}${p.nationality ? ' • ' + p.nationality.name : ''}${p.versatility ? ' (' + p.versatility + ')' : ''}</span>
            ${p.archetype ? `<span class="text-[9px] text-slate-500 dark:text-slate-400 font-semibold block truncate">${p.archetype.name} (✓ ${p.archetype.strength})</span>` : ''}
          </div>
          <span class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">${(p.agreedPrice || 0).toFixed(1)} M€</span>
        </div>
      `;
    }).join('');
  }

  if (spentEl) {
    spentEl.textContent = `${totalSpent.toFixed(1)} M€`;
  }
}

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

  // Si on clique sur le joueur avec qui on négocie déjà activement, ne pas réinitialiser la conversation
  if (activeNegotiation && activeNegotiation.player && activeNegotiation.player.id === p.id && p.isNegotiating) {
    return;
  }

  // 1. DÉVERROUILLAGE ÉVENTUEL DE L'ANCIEN JOUEUR (mode multijoueur Duel)
  if (activeNegotiation && activeNegotiation.player && activeNegotiation.player.id !== p.id) {
    if (typeof isDuelActive !== 'undefined' && isDuelActive && typeof socket !== 'undefined' && socket) {
      socket.emit('unlockPlayerNegotiation', { playerId: activeNegotiation.player.id });
    }
  }

  // 2. NETTOYAGE STRICT DES STATUTS (CLEANUP)
  // Un seul joueur à la fois dans toute la base de données locale peut posséder le booléen isNegotiating: true
  currentMarketPlayers.forEach(pl => {
    pl.isNegotiating = false;
  });
  p.isNegotiating = true;

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

  // 3. ÉCRASEMENT STRICT DE L'ÉTAT (REMPLACEMENT PUR ET SIMPLE SANS FUSION DE DONNÉES)
  activeNegotiation = {
    player: p,
    patience: basePatience,
    step: 1,
    offeredPrice: Math.min(p.estimatedPrice, currentRemainingBudget),
    sellerName: `Directeur Sportif (${p.club})`,
    history: [],
    usedClause: false
  };
  window.currentNegotiation = activeNegotiation;

  // 4. RÉINITIALISATION COMPLÈTE DU CHAT ET DES CONTRÔLES
  const chatHistory = document.getElementById('nego-chat-history');
  if (chatHistory) chatHistory.innerHTML = '';
  const choicesBox = document.getElementById('nego-choices-box');
  if (choicesBox) choicesBox.innerHTML = '';

  const patienceBar = document.getElementById('nego-patience-bar');
  if (patienceBar) {
    patienceBar.style.width = `${activeNegotiation.patience}%`;
    patienceBar.className = 'bg-blue-600 h-full rounded-full transition-all duration-300';
  }
  const patiencePct = document.getElementById('nego-patience-pct');
  if (patiencePct) patiencePct.textContent = `${activeNegotiation.patience}%`;

  const stampOverlay = document.getElementById('nego-success-overlay');
  if (stampOverlay) {
    stampOverlay.classList.add('hidden', 'opacity-0', 'pointer-events-none');
    stampOverlay.classList.remove('opacity-100');
  }

  // En-tête épuré
  const natName = p.nationality ? p.nationality.name : '';
  const roleName = p.subPosName || p.subPos || p.pos || 'Joueur';
  const valText = `Valeur : ${p.estimatedPrice} M€`;
  const subText = [roleName, natName, valText].filter(Boolean).join(' • ');

  const elContact = document.getElementById('nego-contact-name');
  if (elContact) elContact.textContent = activeNegotiation.sellerName;
  const elContactSub = document.getElementById('nego-contact-sub');
  if (elContactSub) elContactSub.innerHTML = `${typeof getSvgIcon === 'function' ? getSvgIcon('liveRadar', 'w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400') : '<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block"></span>'} <span>En direct</span>`;

  // Ligne 1 : Drapeau et Nom du joueur en gras
  const elPName = document.getElementById('nego-player-name');
  if (elPName) {
    elPName.innerHTML = `${p.nationality ? renderFlag(p.nationality.flag, p.nationality.name) + ' ' : ''}<span>${p.name}</span>`;
  }

  // Ligne 2 : Rôle • Nationalité • Valeur (épuré, texte plus petit, grisé)
  const elPSub = document.getElementById('nego-player-sub');
  if (elPSub) {
    elPSub.textContent = subText;
  }
  const elPRep = document.getElementById('nego-player-rep');
  if (elPRep) {
    elPRep.textContent = subText;
  }
  const elPVal = document.getElementById('nego-player-val');
  if (elPVal) {
    elPVal.textContent = '';
  }

  let introMsg = getNegoDialogue('sellerOpeningNeutral', { NAME: p.name, PRICE: p.estimatedPrice });
  if (p.sellerProfile === 'aggressive') {
    introMsg = getNegoDialogue('sellerOpeningAggressive', { NAME: p.name, PRICE: p.estimatedPrice });
  } else if (p.sellerProfile === 'desperate') {
    introMsg = getNegoDialogue('sellerOpeningDesperate', { NAME: p.name, PRICE: p.estimatedPrice });
  }

  addNegoMessage('seller', introMsg);
  audio.play('sms_in');

  showNegoChoicesStep1();
  const elModNego = document.getElementById('modal-negotiation'); if (elModNego) elModNego.classList.remove('hidden');
  const idleState = document.getElementById('nego-idle-state'); if (idleState) idleState.classList.add('hidden');
  const activeState = document.getElementById('nego-active-state'); if (activeState) activeState.classList.remove('hidden');

  // 4b. Activation de l'overlay mobile plein écran et liaison de données du budget
  const negoCol = document.getElementById('in-game-negotiation-col');
  if (negoCol) {
    negoCol.classList.add('mobile-nego-active');
    negoCol.scrollTop = 0;
  }
  const elNegoMobBudget = document.getElementById('nego-mobile-budget');
  if (elNegoMobBudget) {
    const liveVal = typeof currentRemainingBudget === 'number' ? currentRemainingBudget.toFixed(1) : '0.0';
    elNegoMobBudget.textContent = `${liveVal} M€`;
  }

  // 5. RAFRAÎCHISSEMENT IMMÉDIAT DU MARCHÉ (seul le joueur actif portera 'En ligne')
  renderMarketPlayers();
}

function addNegoMessage(sender, text) {
  const container = document.getElementById('nego-chat-history');
  if (!container) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `flex flex-col ${sender === 'me' ? 'items-end' : 'items-start'}`;

  const bubble = document.createElement('div');
  bubble.className = sender === 'me' 
    ? 'bg-blue-600 text-white font-medium text-xs px-3.5 py-2.5 rounded-2xl rounded-tr-none max-w-[85%] shadow-xs leading-relaxed' 
    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-gray-100 font-medium text-xs px-3.5 py-2.5 rounded-2xl rounded-tl-none max-w-[85%] border border-slate-200/60 dark:border-slate-700/60 shadow-xs leading-relaxed';

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
          Négociations rompues (Piste perdue)
        </button>
      `;
    }, 500);
  }
}

function failAndLockNegotiation() {
  isDealSigningLocked = false;
  if (activeNegotiation.player) {
    activeNegotiation.player.isNegotiationFailed = true;
    activeNegotiation.player.isNegotiating = false;
    if (typeof isDuelActive !== 'undefined' && isDuelActive && typeof socket !== 'undefined' && socket) {
      socket.emit('unlockPlayerNegotiation', { playerId: activeNegotiation.player.id });
    }
  }
  activeNegotiation = {
    player: null,
    sellerName: '',
    patience: 100,
    history: [],
    usedClause: false,
    isOver: true
  };
  const activeState = document.getElementById('nego-active-state');
  if (activeState) activeState.classList.add('hidden');
  const idleState = document.getElementById('nego-idle-state');
  if (idleState) idleState.classList.remove('hidden');
  const choicesBox = document.getElementById('nego-choices-box');
  if (choicesBox) choicesBox.innerHTML = '';
  const elModNegoClose = document.getElementById('modal-negotiation');
  if (elModNegoClose) elModNegoClose.classList.add('hidden');
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
        Valeur (${standardOffer} M€) très supérieure à vos fonds restants (${budget.toFixed(1)} M€).
      </div>
      <button onclick="handleDesperateAllInOffer(${budget})" class="w-full text-left p-3 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 transition flex items-center justify-between text-xs mb-1.5">
        <span>Tenter le coup de poker : poser tous nos fonds (<strong>${budget.toFixed(1)} M€</strong>)</span>
        <span class="text-rose-400 font-bold">Chances infimes</span>
      </button>
      <button onclick="declineBecauseTooExpensive()" class="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-display font-bold text-xs rounded-xl border border-gray-700">
        Décliner : Hors de nos moyens financiers
      </button>
    `;
    return;
  }

  const buttons = [];

  if (lowOffer <= budget) {
    buttons.push(`
      <button onclick="handleOfferPrice(${lowOffer}, 'low')" class="w-full text-left p-3 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 transition flex items-center justify-between text-xs">
        <span>Offre au rabais (<strong>${lowOffer} M€</strong>)</span>
        <span class="text-rose-400 font-bold">Risqué</span>
      </button>
    `);
  }

  if (standardOffer <= budget) {
    buttons.push(`
      <button onclick="handleOfferPrice(${standardOffer}, 'standard')" class="w-full text-left p-3 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 transition flex items-center justify-between text-xs">
        <span>Offrir la valeur marchande (<strong>${standardOffer} M€</strong>)</span>
        <span class="text-amber-400 font-bold">Standard</span>
      </button>
    `);
  } else {
    buttons.push(`
      <button onclick="handleOfferPrice(${budget}, 'max_budget')" class="w-full text-left p-3 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 transition flex items-center justify-between text-xs">
        <span>Offrir notre budget max disponible (<strong>${budget.toFixed(1)} M€</strong>)</span>
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
          Clore la négociation (Piste perdue)
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
        Accepter l'exigence du club (${counterPrice.toFixed(1)} M€)
      </button>
    `;
  }

  // Clause 20% à la revente
  if (canAffordSellOn) {
    buttonsHtml += `
      <button onclick="handleClauseSellOn(${counterPrice}, ${sellOnPrice})" class="w-full text-left p-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 border border-emerald-500/40 hover:border-emerald-400 transition flex items-center justify-between text-xs">
        <div>
          <span class="font-bold text-emerald-400">Proposer Clause 20% à la revente</span>
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
          <span class="font-bold text-blue-400">Proposer Bonus Fin de Saison (1.0 M€)</span>
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
        Proposer notre max absolu (${budget.toFixed(1)} M€)
      </button>
    `;
  }

  // Coup de bluff
  buttonsHtml += `
    <button onclick="handleBluffUltimatum()" class="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-rose-400 font-display font-bold text-xs rounded-xl border border-gray-700">
      Coup de Bluff : "À ce prix-là, on quitte la table."
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
let isDealSigningLocked = false;

function showAgentStep(agreedClubPrice) {
  isDealSigningLocked = false;
  const choicesContainer = document.getElementById('nego-choices-box');
  const p = activeNegotiation.player;
  const agentBonus = Math.max(0.6, Math.round(agreedClubPrice * 0.08 * 10) / 10);
  const totalCost = Math.round((agreedClubPrice + agentBonus) * 10) / 10;

  setTimeout(() => {
    // Contact updates to the Agent
    document.getElementById('nego-contact-name').textContent = `Agent de ${p.name}`;
    document.getElementById('nego-contact-sub').innerHTML = `<span class="text-amber-400 font-bold">Conseiller Sportif</span> • <span class="inline-flex items-center gap-1 text-emerald-400 font-semibold">${typeof getSvgIcon === 'function' ? getSvgIcon('liveRadar', 'w-3 h-3 text-emerald-400') : ''} En direct</span>`;

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
        <button id="btn-accept-agent-bonus" onclick="acceptAgentBonus(${totalCost})" class="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-display font-extrabold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-1.5 cursor-pointer">
          <span>Payer la prime & Valider le contrat (${totalCost.toFixed(1)} M€)</span>
        </button>
      ` : `
        <div class="text-[11px] text-rose-400 mb-2 bg-rose-950/30 p-2 rounded-lg border border-rose-900/40">
          La prime ferait dépasser votre budget disponible (${currentRemainingBudget.toFixed(1)} M€ restants).
        </div>
      `}
      <button id="btn-refuse-agent-bonus" onclick="refuseAgentBonus(${agreedClubPrice})" class="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-amber-400 font-display font-bold text-xs rounded-xl border border-gray-700 transition flex items-center justify-center gap-1.5 cursor-pointer">
        <span>Coup de bluff : « À prendre ou à laisser sans prime (${agreedClubPrice.toFixed(1)} M€) ! »</span>
      </button>
    `;
  }, 400);
}

function acceptAgentBonus(totalCost) {
  if (isDealSigningLocked) return;
  isDealSigningLocked = true;

  // Verrouillage et désactivation immédiate des boutons pour éliminer les clics multiples
  const choicesContainer = document.getElementById('nego-choices-box');
  if (choicesContainer) {
    choicesContainer.innerHTML = `
      <div class="py-3 px-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-2">
        <svg class="w-4 h-4 animate-spin text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/></svg>
        <span>Validation du contrat en cours...</span>
      </div>
    `;
  }

  audio.play('sms_out');
  addNegoMessage('me', `D'accord pour la prime. L'important est que le joueur soit pleinement investi dès demain.`);
  setTimeout(() => {
    addNegoMessage('seller', `[Agent] Parfait, accord personnel validé ! Nous finalisons les examens médicaux.`);
    audio.play('sms_in');
    setTimeout(() => {
      proceedToMedicalExam(totalCost);
      isDealSigningLocked = false;
    }, 600);
  }, 600);
}

function refuseAgentBonus(basePrice) {
  if (isDealSigningLocked) return;
  isDealSigningLocked = true;

  // Verrouillage et désactivation immédiate des boutons
  const choicesContainer = document.getElementById('nego-choices-box');
  if (choicesContainer) {
    choicesContainer.innerHTML = `
      <div class="py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold text-center flex items-center justify-center gap-2">
        <svg class="w-4 h-4 animate-spin text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/></svg>
        <span>Attente de la réponse de l'agent...</span>
      </div>
    `;
  }

  audio.play('sms_out');
  const p = activeNegotiation.player;
  addNegoMessage('me', `Hors de question de céder aux surenchères d'agent. C'est l'offre sèche (${basePrice.toFixed(1)} M€) ou nous nous retirons.`);

  setTimeout(() => {
    const success = Math.random() < 0.72;
    if (success) {
      addNegoMessage('seller', `[Agent] Bon... mon client adore le coach et veut absolument rejoindre votre équipe. On signe sans la prime !`);
      audio.play('sms_in');
      setTimeout(() => {
        proceedToMedicalExam(basePrice);
        isDealSigningLocked = false;
      }, 600);
    } else {
      isDealSigningLocked = false;
      addNegoMessage('seller', `[Agent] Dommage. Mon client ne se bradera pas dans ces conditions. Les discussions sont rompues !`);
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
    title: 'Tendon d\'Achille Enflammé',
    desc: (p) => `Le médecin-chef alerte : un épaississement et un nodule inflammatoire sont visibles à l'échographie sur le tendon d'Achille de <strong>${p.name}</strong>. Risque élevé de rupture en cas d'enchaînement de matchs. Prenez-vous le risque de valider le contrat ?`,
    addedTrait: 'Genou en cristal'
  },
  {
    id: 'pubalgie',
    title: 'Pubalgie Chronique Tenace',
    desc: (p) => `L'IRM pelvienne révèle une inflammation symphysaire carabinée chez <strong>${p.name}</strong>. Il a joué sous infiltrations ces derniers mois. Risque d'arrêt de 3 à 5 mois au moindre faux mouvement. Signez-vous quand même ?`,
    addedTrait: 'Genou en cristal'
  },
  {
    id: 'ischios',
    title: 'Fibrose aux Ischio-Jambiers',
    desc: (p) => `Le staff médical relève une cicatrice fibreuse profonde à l'arrière de la cuisse de <strong>${p.name}</strong> suite à un ancien claquage mal soigné. Les accélérations brutales risquent de rouvrir la lésion. Validez-vous ce pari ?`,
    addedTrait: 'Genou en cristal'
  },
  {
    id: 'croises',
    title: 'Laxité du Ligament Croisé Antérieur',
    desc: (p) => `L'examen orthopédique décèle un tiroir antérieur anormal au genou de <strong>${p.name}</strong>. Une rechute ligamentaire majeure n'est pas à exclure lors des chocs hivernaux. Prenez-vous le risque ?`,
    addedTrait: 'Genou en cristal'
  },
  {
    id: 'metatarse',
    title: 'Fissure de Fatigue au Métatarse',
    desc: (p) => `La radiologie osseuse montre une micro-fissure d'usure au pied d'appui de <strong>${p.name}</strong>. S'il enchaîne les 90 minutes sans repos strict, une fracture nette le privera de compétition. Confirmez-vous le transfert ?`,
    addedTrait: 'Genou en cristal'
  },
  {
    id: 'cheville',
    title: 'Instabilité Chronique de la Cheville',
    desc: (p) => `Les antécédents d'entorses à répétition ont provoqué une distension ligamentaire à la cheville de <strong>${p.name}</strong>. Le joueur aura besoin d'infiltrations et d'un protocole renforcé chaque semaine. Prenez-vous le risque ?`,
    addedTrait: 'Genou en cristal'
  },
  {
    id: 'epaule',
    title: 'Séquelles d\'Opération de l\'Épaule',
    desc: (p) => `Le médecin constate une instabilité de la coiffe des rotateurs suite à une ancienne luxation de <strong>${p.name}</strong>. Il sera très vulnérable au moindre duel aérien rugueux. Validez-vous la signature ?`,
    addedTrait: 'Genou en cristal'
  },
  {
    id: 'lombalgie',
    title: 'Pincement Discal L5-S1 (Lombalgie)',
    desc: (p) => `Le scanner vertébral met en évidence une hernie discale naissante chez <strong>${p.name}</strong>. Des douleurs sciatiques invalidantes risquent de le paralyser sur les terrains lourds. Prenez-vous le risque ?`,
    addedTrait: 'Genou en cristal'
  },
  {
    id: 'menisque',
    title: 'Languette Méniscale Fissurée',
    desc: (p) => `Le radiologue repère une petite languette cartilagineuse instable au ménisque interne de <strong>${p.name}</strong>. Un blocage articulaire soudain reste possible à tout moment s'il subit une torsion. Prenez-vous le risque de signer ?`,
    addedTrait: 'Genou en cristal'
  },
  {
    id: 'cardiologie',
    title: 'Alerte Cardiaque : Extrasystoles d\'Effort',
    desc: (p) => `Le cardiologue du club relève une légère arythmie bénigne mais atypique lors du test VO2 max de <strong>${p.name}</strong>. Un protocole physique et des bilans trimestriels devront être scrupuleusement respectés. Signez-vous ?`,
    addedTrait: 'Genou en cristal'
  },
  {
    id: 'nocturne',
    title: 'Vie Nocturne Tumultueuse',
    desc: (p) => `Un rapport d'indicateur révèle que <strong>${p.name}</strong> a écumé plusieurs boîtes de nuit jusqu'à 5h du matin ces dernières semaines. Le coach abhorre ce manque de discipline. Prenez-vous le risque d'enflammer le vestiaire ?`,
    addedTrait: 'Fêtard invétéré'
  },
  {
    id: 'clash_ego',
    title: 'Égo Surdimensionné & Conflit d\'Agent',
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
    const elModNegoClose = document.getElementById('modal-negotiation'); if (elModNegoClose) elModNegoClose.classList.add('hidden');
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
    showToast('Transfert annulé par précaution. La piste est refermée.', 'error');
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
  isDealSigningLocked = false;
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

  player.isSold = true;
  player.isSigned = true;
  player.isNegotiating = false;

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

  if (choicesBox) choicesBox.innerHTML = ''; // Nettoyer immédiatement les boutons de négociation

  if (stampOverlay && stampContent) {
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

    // Fermeture automatique fluide après 1.2s et retour à l'état d'attente (idle)
    setTimeout(() => {
      stampOverlay.classList.add('opacity-0', 'pointer-events-none');
      stampOverlay.classList.remove('opacity-100');

      setTimeout(() => {
        stampOverlay.classList.add('hidden');
        stampContent.classList.remove('animate-stamp');
        if (negoModal) negoModal.classList.add('hidden');

        // Bascule automatique du bureau de négociation vers l'état d'attente (idle)
        const activeState = document.getElementById('nego-active-state');
        if (activeState) activeState.classList.add('hidden');
        const idleState = document.getElementById('nego-idle-state');
        if (idleState) idleState.classList.remove('hidden');

        activeNegotiation = {
          player: null,
          sellerName: '',
          patience: 100,
          history: [],
          usedClause: false,
          isOver: true
        };

        showToast(`Transfert officialisé : ${player.name} (${price.toFixed(1)} M€)`, 'success');
        if (typeof closeMobileNegotiation === 'function') closeMobileNegotiation();
      }, 250);
    }, 1200);
  } else {
    // Si pas de conteneur d'overlay
    const activeState = document.getElementById('nego-active-state');
    if (activeState) activeState.classList.add('hidden');
    const idleState = document.getElementById('nego-idle-state');
    if (idleState) idleState.classList.remove('hidden');
    showToast(`Transfert officialisé : ${player.name} (${price.toFixed(1)} M€)`, 'success');
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
let currentSimulationRunId = 0;
let crisisResumeResolver = null;

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

  if (iconEl) iconEl.textContent = crisis.icon || '';
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
        <span class="text-xl inline-flex">${typeof getSvgIcon === 'function' ? getSvgIcon('skull', 'w-6 h-6 text-rose-400') : '💀'}</span>
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
        <span>${typeof getSvgIcon === 'function' ? getSvgIcon('skull', 'w-4 h-4 text-white') : '💀'}</span>
      </button>
    `;
  } else {
    audio.play('deal_signed');
    verdictBox.className = 'p-4 sm:p-5 rounded-2xl border border-emerald-500/80 bg-emerald-950/40 text-emerald-200 leading-relaxed text-xs sm:text-sm shadow-xl';
    verdictBox.innerHTML = `
      <div class="flex items-center gap-2 mb-2">
        <span class="text-xl inline-flex">${typeof getSvgIcon === 'function' ? getSvgIcon('shield', 'w-6 h-6 text-emerald-400') : '🛡️'}</span>
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

  showToast('Reprise du championnat après la crise.', 'info');

  if (crisisResumeResolver) {
    const resolve = crisisResumeResolver;
    crisisResumeResolver = null;
    resolve('resumed');
  } else if (currentSimStepFn) {
    if (currentSimInterval) clearInterval(currentSimInterval);
    currentSimInterval = setInterval(() => currentSimStepFn(false), currentSimSpeed);
  }
}

function resolveFatalCrisis() {
  const modal = document.getElementById('modal-crisis');
  if (modal) modal.classList.add('hidden');
  isCrisisActive = false;

  if (crisisResumeResolver) {
    const resolve = crisisResumeResolver;
    crisisResumeResolver = null;
    resolve('fatal');
  }

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
      badgeLabel: 'Drame Sportif',
      badgeClass: 'bg-rose-950 text-rose-300 border-rose-800 font-bold',
      narrative
    };
  }

  // 2. CAS BLESSURE MAJEURE (p.wasInjured)
  if (p.wasInjured) {
    const matchesPlayed = 4 + Math.floor(Math.random() * 6);
    const injuryTemplate = INJURY_NARRATIVES[Math.floor(Math.random() * INJURY_NARRATIVES.length)];
    return {
      badgeLabel: 'Saison Tronquée (Infirmerie)',
      badgeClass: 'bg-rose-950 text-rose-300 border-rose-800 font-bold',
      narrative: `Trahison physique : ${injuryTemplate(p, matchesPlayed)} Un investissement de <strong>${priceStr}</strong> passé en grande partie sous perfusion.`
    };
  }

  // 3. CAS SCANDALE EXTRA-SPORTIF (p.hadScandal)
  if (p.hadScandal) {
    const scandalTemplate = SCANDAL_NARRATIVES[Math.floor(Math.random() * SCANDAL_NARRATIVES.length)];
    return {
      badgeLabel: 'Scandale Nocturne',
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
      badgeLabel: 'Pari Médical Réussi',
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
      badgeLabel: 'Flop Low-Cost',
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
      badgeLabel: 'Pari Contrasté',
      badgeClass: 'bg-amber-950/70 text-amber-300 border-amber-800 font-semibold',
      narrative
    };
  }

  // 8. JOUEUR DE ROTATION / DÉPANNAGE (MID_ROTATION)
  if (tier === 'MID_ROTATION') {
    const appearances = 14 + Math.floor(Math.random() * 12);
    let narrative = `Rôle de doublure tenu avec sérieux : <strong>${appearances} apparitions</strong> (souvent en sortie de banc). A apporté de la fraîcheur tactique sans fausse note.`;
    return {
      badgeLabel: 'Doublure Utile',
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
      badgeLabel: 'Titulaire Fiable',
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
    badgeLabel: 'Profil Complément',
    badgeClass: 'bg-gray-800 text-gray-300 border-gray-700',
    narrative: `A fait le métier en apportant une solution tactique d'appoint lors des rotations d'effectif.`
  };
}

async function runSeasonSimulation() {
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
    const flagHtml = renderFlag(activeScenario.flag || activeScenario.country || 'FR', activeScenario.league || 'Ligue', 'w-4 h-3 inline-block');
    leagueTitleEl.innerHTML = `<span class="inline-flex items-center gap-1.5">${flagHtml} <span>${activeScenario.league || 'Ligue'} en direct</span></span>`;
  }

  const tickerTagEl = document.getElementById('sim-ticker-tag');
  if (tickerTagEl) {
    const flagHtml = renderFlag(activeScenario.flag || activeScenario.country || 'FR', activeScenario.league || 'Ligue', 'w-3.5 h-2.5 inline-block');
    tickerTagEl.innerHTML = `<span class="inline-flex items-center gap-1.5">${flagHtml} <span>FLASH MATCHDAY</span></span>`;
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

  const runId = ++currentSimulationRunId;
  // Ralentissement dramatique progressif : défilement rapide initial (80ms), puis tension croissante (300ms à 500ms sur les 5 dernières journées)

  // Initialisation UI
  if (progressBar) progressBar.style.width = '0%';
  if (matchdayEl) matchdayEl.textContent = 'Journée 1 / 38';
  if (virtualRankEl) virtualRankEl.textContent = '--';
  if (virtualPointsEl) virtualPointsEl.textContent = '(0 pts)';
  if (tickerIcon) tickerIcon.textContent = '⚽';
  if (tickerText) tickerText.textContent = "Coup d'envoi du championnat ! Les dés sont jetés.";

  for (let matchday = 1; matchday <= 38; matchday++) {
    // Si la simulation a été interrompue ou réinitialisée, on sort immédiatement
    if (currentSimulationRunId !== runId) return;

    currentSimMatchday = matchday;
    const pct = Math.min(100, Math.round((matchday / 38) * 100));
    if (progressBar) progressBar.style.width = `${pct}%`;
    if (matchdayEl) matchdayEl.textContent = `Journée ${matchday} / 38`;

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

      triggerCrisisEvent(plannedCrisis, false);
      const crisisOutcome = await new Promise(resolve => {
        crisisResumeResolver = resolve;
      });
      if (currentSimulationRunId !== runId || crisisOutcome === 'fatal' || crisisOutcome === 'aborted') {
        return;
      }
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
    if (virtualRankEl) virtualRankEl.textContent = `${rank}e / 20`;
    if (virtualPointsEl) virtualPointsEl.textContent = `(${userPoints} pts)`;

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
            <div class="flex items-center justify-between bg-blue-50/90 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 font-bold px-3 py-1.5 rounded-xl transition-all shadow-xs">
              <div class="flex items-center gap-2">
                <span class="w-6 text-center font-mono font-black text-blue-600 dark:text-blue-400">${cRank}e</span>
                <span class="truncate max-w-[170px] sm:max-w-[220px] font-extrabold">${c.name}</span>
                <span class="text-[9px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-black uppercase">VOUS</span>
              </div>
              <span class="font-mono font-black text-blue-600 dark:text-blue-400">${c.points} pts</span>
            </div>
          `;
        } else {
          return `
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-400 font-medium px-3 py-1 text-xs transition-all hover:bg-gray-100/50 dark:hover:bg-slate-800/40 rounded-lg">
              <div class="flex items-center gap-2">
                <span class="w-6 text-center font-mono text-slate-400 text-xs font-semibold">${cRank}e</span>
                <span class="truncate max-w-[170px] sm:max-w-[220px]">${c.name}</span>
              </div>
              <span class="font-mono font-bold text-slate-700 dark:text-slate-300">${c.points} pts</span>
            </div>
          `;
        }
      }).join('');
    }

    // Dynamic Live Ticker Update
    const tick = dynamicTicker.find(t => t.j === matchday);
    if (tick) {
      if (tickerIcon) tickerIcon.textContent = tick.icon;
      if (tickerText) tickerText.textContent = tick.text;
    }

    // Pause asynchrone non-bloquante pour rythmer la simulation et créer la tension
    // Calcul du délai progressif pour maximiser la tension en fin de saison
    let matchdayDelay = 250; // J1-J30 : Défilement posé et lisible (250ms)
    if (matchday >= 31 && matchday <= 34) matchdayDelay = 350;
    else if (matchday === 35) matchdayDelay = 400;
    else if (matchday === 36) matchdayDelay = 450;
    else if (matchday === 37) matchdayDelay = 500;
    else if (matchday >= 38) matchdayDelay = 550;

    await new Promise(resolve => setTimeout(resolve, matchdayDelay));
  }

  // Fin de la saison : pause dramatique finale avant d'afficher le bilan
  if (currentSimulationRunId === runId) {
    const finalRank = rivals.filter(riv => riv.points > userPoints).length + 1;
    await new Promise(resolve => setTimeout(resolve, 850));
    if (currentSimulationRunId === runId) {
      showRecapScreen(userPoints, finalRank, filledCount, neededPositions.length, {
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
    }
  }
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
    outcomeIcon.innerHTML = typeof getSvgIcon === 'function' ? getSvgIcon('skull', 'w-12 h-12 text-rose-500 mx-auto') : '💀';
    outcomeTitle.textContent = 'CRISE FATALE : SAISON AVORTÉE !';
    outcomeSub.textContent = `Interruption définitive à la J${crisisGameOver.matchday} suite à : "${crisisGameOver.title}". Le club est disqualifié et votre mandat prend fin prématurément.`;

    finalRankEl.textContent = `DISQUALIFIÉ (J${crisisGameOver.matchday})`;
    starsEl.textContent = '❌ 0 Étoile (Saison Avortée)';
    managerScoreEl.textContent = `F (0%)`;

    coachCritiqueEl.className = 'mb-6 bg-rose-950/40 border border-rose-500/50 p-4 rounded-xl text-xs leading-relaxed text-rose-300';
    coachCritiqueEl.innerHTML = `
      <strong class="font-bold text-rose-400 block mb-1 text-sm">ÉDITION SPÉCIALE : "Séisme à ${activeScenario.club} !"</strong>
      <p class="mb-2.5">${crisisGameOver.pressReport}</p>
      <div class="mt-2.5 p-3 bg-black/60 border border-rose-600/40 rounded-xl text-rose-200">
        <strong>SANCTION ADMINISTRATIVE IRRÉVOCABLE :</strong> ${crisisGameOver.fatalVerdict}
      </div>
    `;

    if (signingsContainer) {
      if (currentSignedPlayers.length === 0) {
        signingsContainer.innerHTML = `
          <p class="text-xs text-rose-400 italic bg-rose-950/20 p-3 rounded-xl border border-rose-900/40">
            Zéro signature sur cette Deadline Day. Le groupe n'a pas été renouvelé.
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
    outcomeIcon.innerHTML = typeof getSvgIcon === 'function' ? getSvgIcon('trophy', 'w-12 h-12 text-amber-400 mx-auto') : '🏆';
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
          <strong class="font-bold text-emerald-400 block mb-1">Bilan du Coach : "Le Coup de Génie du Siècle (3 Étoiles ⭐⭐⭐) !"</strong>
          "Personne n'y croyait... Votre recrue à bas coût <strong>${exploitPlayer.name}</strong> (${exploitPlayer.agreedPrice.toFixed(1)} M€) s'est transcendée pour devenir la sensation absolue de la saison ! L'équipe a survolé les débats avec ${points} points !"
          <div class="mt-2.5 p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300">
            <strong>RÉVÉLATION HISTORIQUE :</strong> ${exploitPlayer.name} a déjoué tous les pronostics et fait exploser notre plafond de verre !
          </div>
        `;
      } else if (isMajorChampion) {
        coachCritiqueEl.innerHTML = `
          <strong class="font-bold text-emerald-400 block mb-1">Bilan du Coach : "CHAMPIONS ! Une Saison dans la Légende (3 Étoiles ⭐⭐⭐) !"</strong>
          "Quel accomplissement monumental ! Nous terminons 1er du championnat avec ${points} points. Votre mercato a été un sans-faute chirurgical : leadership, profondeur et alchimie totale sur le terrain !"
        `;
      } else if (isSurprisePodium) {
        coachCritiqueEl.innerHTML = `
          <strong class="font-bold text-emerald-400 block mb-1">Bilan du Coach : "Podium Inattendu & Qualification C1 (3 Étoiles ⭐⭐⭐) !"</strong>
          "Un exploit retentissant ! Alors que nous visions simplement le maintien ou le ventre mou (${targetRank}e), l'équipe termine ${finalRank}e (${points} pts) et décroche l'Europe grâce à des recrues de tout premier ordre !"
        `;
      } else {
        coachCritiqueEl.innerHTML = `
          <strong class="font-bold text-emerald-400 block mb-1">Bilan du Coach : "Masterclass Stratégique (3 Étoiles ⭐⭐⭐) !"</strong>
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
          <strong class="font-bold text-emerald-400 block mb-1">Bilan du Coach : "Dauphin Héroïque & Podium Européen (2 Étoiles ⭐⭐) !"</strong>
          "Nous finissons 2e avec un total magistral de ${points} points ! Même si le titre nous échappe d'un souffle face à un rival en surrégime, notre saison est éclatante et nous validons notre billet direct pour la Ligue des Champions !"
        `;
      } else {
        coachCritiqueEl.innerHTML = `
          <strong class="font-bold text-emerald-400 block mb-1">Bilan du Coach : "Très Bon Mercato & Objectif Rempli (2 Étoiles ⭐⭐) !"</strong>
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
          <strong class="font-bold text-amber-400 block mb-1">Bilan du Coach : "Sauvetage Héroïque malgré le Coup du Sort (1 Étoile ⭐) !"</strong>
          "Notre recrue phare ${dramaFlopPlayer.name} a été victime d'un coup dur (${dramaReason}), mais le groupe a fait bloc pour arracher cette ${finalRank}e place (${points} pts). L'objectif est validé dans la douleur !"
          <div class="mt-2.5 p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-200 text-[11px]">
            ⚠️ L'équipe a compensé le manque de rendement de la recrue vedette par un courage exemplaire.
          </div>
        `;
      } else if (lowCostCount >= 2) {
        coachCritiqueEl.innerHTML = `
          <strong class="font-bold text-amber-400 block mb-1">Bilan du Coach : "Objectif Validé... Mais Trop Limite (1 Étoile ⭐) !"</strong>
          "L'effectif a tenu bon pour terminer ${finalRank}e (${points} pts), mais votre pari sur des recrues discount a failli nous coûter cher. Les limites techniques étaient criantes face aux équipes du haut de tableau."
          <div class="mt-2.5 p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-200 text-[11px]">
            <strong>BRICOLAGE :</strong> Plusieurs joueurs au rabais ont manqué d'impact pour viser plus haut.
          </div>
        `;
      } else if (filledCount < totalNeeded) {
        coachCritiqueEl.innerHTML = `
          <strong class="font-bold text-amber-400 block mb-1">Bilan du Coach : "Des Trous dans l'Effectif Comblés au Courage (1 Étoile ⭐) !"</strong>
          "Nous finissons ${finalRank}e (${points} pts) et l'objectif est atteint. Cependant, ne pas avoir signé de joueur sur tous les postes prioritaires demandés nous a obligés à bricoler toute la saison."
        `;
      } else if (tacticalSynergyDelta < 0) {
        coachCritiqueEl.innerHTML = `
          <strong class="font-bold text-amber-400 block mb-1">Bilan du Coach : "Dissonance Tactique & Résultats Poussifs (1 Étoile ⭐) !"</strong>
          "L'objectif est validé (${finalRank}e, ${points} pts), mais certaines recrues ne correspondaient pas du tout à l'identité de jeu voulue. Le collectif a manqué de fluidité."
        `;
      } else {
        coachCritiqueEl.innerHTML = `
          <strong class="font-bold text-amber-400 block mb-1">Bilan du Coach : "Objectif Validé sur le Fil (1 Étoile ⭐) !"</strong>
          "C'était irrespirable jusqu'au bout ! Nous finissons ${finalRank}e avec ${points} points, tout juste à hauteur de notre objectif (${targetRank}e). La marge de manœuvre était infime, il faudra viser plus d'envergure au prochain mercato !"
        `;
      }
    }
  } else {
    audio.play('fail');
    const isReligated = finalRank >= 17;
    const isNarrowMiss = finalRank <= activeScenario.targetRank + 2;

    outcomeBanner.className = 'p-6 rounded-2xl border border-rose-500/50 bg-rose-950/30 text-center mb-6 text-rose-400';
    outcomeIcon.innerHTML = isReligated ? (typeof getSvgIcon === 'function' ? getSvgIcon('skull', 'w-12 h-12 text-rose-500 mx-auto') : '💀') : (typeof getSvgIcon === 'function' ? getSvgIcon('xCircle', 'w-12 h-12 text-rose-500 mx-auto') : '❌');
    outcomeTitle.textContent = isReligated ? 'RELÉGUÉ EN DIVISION INFÉRIEURE !' : 'OBJECTIF NON ATTEINT...';
    outcomeSub.textContent = `Vous terminez ${finalRank}e avec seulement ${points} pts (objectif exigé : ${activeScenario.targetRank}e). La direction est furieuse.`;

    stars = 0;
    scorePct = Math.max(30, Math.min(62, Math.round((points / 60) * 100)));
    grade = scorePct >= 50 ? 'C' : 'D';

    coachCritiqueEl.className = 'mb-6 bg-rose-950/30 border border-rose-500/40 p-4 rounded-xl text-xs leading-relaxed text-rose-300';

    if (lowCostCount >= 2 && !exploitPlayer) {
      // ÉCHEC DU AU LOW-COST / RECRU AU RABAIS
      coachCritiqueEl.innerHTML = `
        <strong class="font-bold text-rose-400 block mb-1">Bilan du Coach : "Le Piège du Low-Cost !"</strong>
        "Vous avez voulu faire des économies de bouts de chandelle en empilant des joueurs au rabais qui n'avaient absolument pas le niveau requis pour cette division ! L'équipe a coulé dès l'automne. C'est impardonnable !"
        <div class="mt-2.5 p-2.5 bg-rose-500/20 border border-rose-500/30 rounded-lg text-rose-200">
          <strong>NIVEAU INSUFFISANT :</strong> Vos recrues discount n'ont pas fait le poids face aux cadors de la ligue.
        </div>
      `;
    } else if (dramaFlopPlayer) {
      // COUP DU SORT : RECRUE PHARE TOUCHÉE PAR UN DRAME
      coachCritiqueEl.innerHTML = `
        <strong class="font-bold text-rose-400 block mb-1">Bilan du Coach : "Le Coup du Sort Fatal !"</strong>
        "Tout notre plan reposait sur notre recrue phare <strong>${dramaFlopPlayer.name}</strong>, mais le destin a frappé : <em>${dramaReason}</em>. Privée de son leader, l'équipe a sombré dans la spirale de l'échec."
        <div class="mt-2.5 p-2.5 bg-rose-500/20 border border-rose-500/30 rounded-lg text-rose-200">
          <strong>DRAME SPORTIF :</strong> Sans le rendement attendu de ${dramaFlopPlayer.name}, la saison est gâchée.
        </div>
      `;
    } else if (isNarrowMiss) {
      coachCritiqueEl.innerHTML = `
        <strong class="font-bold text-rose-400 block mb-1">Bilan du Coach : "La pièce est retombée du mauvais côté"</strong>
        "Il ne nous manquait qu'un ou deux points pour valider l'objectif. Le manque de profondeur et les lacunes sur certains postes coûtent très cher sur la durée d'une saison."
      `;
    } else {
      coachCritiqueEl.innerHTML = `
        <strong class="font-bold text-rose-400 block mb-1">Bilan du Coach : "Naufrage Collectif"</strong>
        "Le recrutement n'a pas permis d'élever notre niveau de jeu. L'équipe a été dominée de bout en bout et n'a jamais su répondre aux exigences de la division."
      `;
    }
  }

  // Bilan de la consigne de provenance / réseau du coach
  if (originConstraint && originConstraint.code !== 'FREE' && currentSignedPlayers.length > 0) {
    let originFeedbackHtml = '';
    if (hasFulfilledOrigin && matchingOriginPlayer) {
      const pFlag = matchingOriginPlayer.nationality ? `${renderFlag(matchingOriginPlayer.nationality.flag, matchingOriginPlayer.nationality.name)} ` : '📍 ';
      originFeedbackHtml = `
        <div class="mt-2.5 p-2.5 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
          <span class="inline-flex shrink-0">${pFlag}</span>
          <div>
            <strong>Réseau ciblé respecté (${originConstraint.label || originConstraint.name || 'Filière ciblée'}) :</strong> L'arrivée de <strong>${matchingOriginPlayer.name}</strong> cadre parfaitement avec les orientations de recrutement du club (+3 pts synergie tactique).
          </div>
        </div>
      `;
    } else {
      originFeedbackHtml = `
        <div class="mt-2.5 p-2.5 bg-amber-500/15 border border-amber-500/30 rounded-xl text-amber-300 text-xs flex items-center gap-2">
          <span class="text-base">⚠️</span>
          <div>
            <strong>Réseau ciblé non exploité (${originConstraint.label || originConstraint.name || 'Filière ciblée'}) :</strong> Aucune recrue issue du réseau recommandé (${originConstraint.hint || originConstraint.shortDesc || originConstraint.ruleDesc || 'Filière recommandée'}). Un léger déficit d'alchimie tactique (-2 pts synergie).
          </div>
        </div>
      `;
    }
    coachCritiqueEl.innerHTML += originFeedbackHtml;
  }

  finalRankEl.innerHTML = `<span class="text-lg sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white block">${finalRank}e / 20</span><span class="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-semibold block mt-0.5">(${points} pts)</span>`;
  managerScoreEl.innerHTML = `<span class="text-lg sm:text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-400 block">${grade}</span><span class="text-[11px] sm:text-xs text-blue-500/80 dark:text-blue-400/80 font-semibold block mt-0.5">(${scorePct}%)</span>`;
  if (stars > 0) {
    starsEl.innerHTML = `<span class="text-base sm:text-2xl font-black text-amber-500 block tracking-wider">${'★'.repeat(stars)}</span><span class="text-[11px] sm:text-xs text-amber-600/90 dark:text-amber-400/90 font-semibold block mt-0.5">(${stars} Étoile${stars > 1 ? 's' : ''})</span>`;
  } else {
    starsEl.innerHTML = `<span class="text-base sm:text-2xl font-black text-rose-500 block">0 Étoile</span><span class="text-[11px] sm:text-xs text-rose-400 font-semibold block mt-0.5">(Objectif Échoué)</span>`;
  }

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

  const misfitPlayers = currentSignedPlayers.filter(p => p.isTacticalMisfit || p.isArchetypeMisfit);
  if (signingsContainer) {
    if (currentSignedPlayers.length === 0) {
    signingsContainer.innerHTML = `
      <p class="text-xs text-rose-400 italic bg-rose-950/20 p-3 rounded-xl border border-rose-900/40">
        Zéro signature sur cette Deadline Day. Le groupe n'a pas été renouvelé.
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

      const isMisfit = (typeof misfitPlayers !== 'undefined' && misfitPlayers ? misfitPlayers.some(m => m.id === p.id) : (p.isTacticalMisfit || p.isArchetypeMisfit));
      let tacticalNoteHtml = '';
      if (isMisfit || p.isTacticalMisfit) {
        tacticalNoteHtml = `
          <div class="mt-2 p-2 bg-rose-950/40 border border-rose-500/40 rounded-xl text-[11px] text-rose-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span class="inline-flex items-center gap-1.5 font-medium text-rose-300">
              ${typeof getSvgIcon === 'function' ? getSvgIcon('alert', 'w-3.5 h-3.5 text-rose-400') : '⚠️'}
              <span>Son profil (${p.archetype ? p.archetype.name : (p.subPosName || p.subPos)}) ne collait pas au système tactique exigé par le coach.</span>
            </span>
            <span class="bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[9px] font-black uppercase px-2 py-0.5 rounded-md whitespace-nowrap shrink-0">
              Erreur de casting tactique
            </span>
          </div>
        `;
      } else if (p.isTacticalFit) {
        tacticalNoteHtml = `<div class="mt-1.5 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">${typeof getSvgIcon === 'function' ? getSvgIcon('check', 'w-3.5 h-3.5 text-emerald-400') : '✓'} <span>Alchimie tactique :</span> profil taillé sur mesure pour la philosophie du club.</div>`;
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
  showScreen('screen-portal');
}

function replayCurrentScenario() {
  if (!activeScenario) return;

  // 1. Récupération d'une copie fraîche du scénario d'origine
  const originalScenario = SCENARIOS.find(s => s.id === activeScenario.id) || activeScenario;
  activeScenario = JSON.parse(JSON.stringify(originalScenario));
  if (typeof enrichScenarioTacticalDemands === 'function') {
    enrichScenarioTacticalDemands(activeScenario);
  }

  isDealSigningLocked = false;
  activeNegotiation = {
    player: null,
    sellerName: '',
    patience: 100,
    history: [],
    usedClause: false,
    isOver: true
  };
  pendingDeal = null;

  // 2. Nettoyage complet de l'interface
  const chatHistory = document.getElementById('nego-chat-history');
  if (chatHistory) chatHistory.innerHTML = '';
  const choicesBox = document.getElementById('nego-choices-box');
  if (choicesBox) choicesBox.innerHTML = '';
  const activeState = document.getElementById('nego-active-state');
  if (activeState) activeState.classList.add('hidden');
  const idleState = document.getElementById('nego-idle-state');
  if (idleState) idleState.classList.remove('hidden');
  const stampOverlay = document.getElementById('nego-success-overlay');
  if (stampOverlay) {
    stampOverlay.classList.add('hidden', 'opacity-0', 'pointer-events-none');
    stampOverlay.classList.remove('opacity-100');
  }

  const negoModal = document.getElementById('modal-negotiation');
  if (negoModal) negoModal.classList.add('hidden');
  const crisisModal = document.getElementById('modal-crisis-flash');
  if (crisisModal) crisisModal.classList.add('hidden');
  const medicalModal = document.getElementById('modal-medical-dilemma');
  if (medicalModal) medicalModal.classList.add('hidden');

  startMercatoRun();
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
      showToast("Bilan copié dans le presse-papier !", "success");
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


function openCrisisDetailModal(crisisId) {
  const crisis = (typeof CRISIS_SCENARIOS_DB !== 'undefined' ? CRISIS_SCENARIOS_DB : []).find(c => c.id === crisisId);
  const modal = document.getElementById('modal-crisis-detail');
  const body = document.getElementById('crisis-detail-modal-body');
  if (!modal || !body) return;

  if (!crisis) {
    body.innerHTML = `
      <div class="text-center py-6">
        <p class="text-sm text-gray-500">Dossier de crise introuvable.</p>
      </div>
    `;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    return;
  }

  const diffBadges = (crisis.difficulties || []).map(d => {
    const color = d === 'facile' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : (d === 'moyen' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-rose-500/20 text-rose-400 border-rose-500/30');
    return `<span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${color}">${d}</span>`;
  }).join(' ');

  const clubName = (typeof activeScenario !== 'undefined' && activeScenario && activeScenario.club) ? activeScenario.club : 'votre club';
  const desc = typeof crisis.description === 'function' ? crisis.description(clubName) : crisis.description;

  const phasesHtml = (crisis.phases || []).map((phase, idx) => `
    <div class="flex items-start gap-2.5 p-2.5 rounded-xl bg-gray-50 dark:bg-slate-900/60 border border-gray-100 dark:border-slate-800 text-xs">
      <span class="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">${idx + 1}</span>
      <span class="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">${phase}</span>
    </div>
  `).join('');

  body.innerHTML = `
    <div class="flex items-start gap-3.5 mb-5 pr-8">
      <div class="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 shrink-0">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
      </div>
      <div>
        <div class="flex flex-wrap items-center gap-1.5 mb-1">
          ${diffBadges}
          <span class="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">Dossier Noir</span>
        </div>
        <h3 class="text-lg font-black text-slate-900 dark:text-white leading-tight">${crisis.title}</h3>
      </div>
    </div>

    <div class="space-y-4 text-xs text-gray-600 dark:text-gray-300">
      <div class="bg-gray-50 dark:bg-slate-900/40 border border-gray-100 dark:border-slate-800 p-3.5 rounded-2xl">
        <strong class="block text-slate-900 dark:text-white font-bold mb-1 uppercase tracking-wider text-[10px]">Contexte & Enjeux</strong>
        <p class="leading-relaxed">${desc}</p>
      </div>

      <div>
        <strong class="block text-slate-900 dark:text-white font-bold mb-2 uppercase tracking-wider text-[10px]">Phases d'investigation</strong>
        <div class="space-y-1.5">
          ${phasesHtml}
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        <div class="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/30 rounded-xl">
          <span class="text-[10px] uppercase font-black tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">Issue Favorable</span>
          <p class="text-[11px] text-emerald-800 dark:text-emerald-300 leading-snug">${crisis.survivalVerdict || 'Le club s\'en sort indemne.'}</p>
        </div>
        <div class="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-500/30 rounded-xl">
          <span class="text-[10px] uppercase font-black tracking-wider text-rose-600 dark:text-rose-400 block mb-1">Issue Fatale (Game Over)</span>
          <p class="text-[11px] text-rose-800 dark:text-rose-300 leading-snug">${crisis.fatalVerdict || 'Disqualification immédiate.'}</p>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeCrisisDetailModal() {
  const modal = document.getElementById('modal-crisis-detail');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}
window.openCrisisDetailModal = openCrisisDetailModal;
window.closeCrisisDetailModal = closeCrisisDetailModal;


// Expose switchModesTab on window from app.js as safety fallback
if (typeof window.switchModesTab !== 'function') {
  window.switchModesTab = function(mode) {
    const soloPanel = document.getElementById('modes-panel-solo');
    const duelPanel = document.getElementById('modes-panel-duel');
    const soloBtn = document.getElementById('tab-btn-solo');
    const duelBtn = document.getElementById('tab-btn-duel');

    if (mode === 'duel') {
      if (soloPanel) { soloPanel.classList.add('hidden'); soloPanel.style.display = 'none'; }
      if (duelPanel) { duelPanel.classList.remove('hidden'); duelPanel.style.display = 'block'; }
      if (soloBtn) soloBtn.className = 'px-6 py-2.5 rounded-xl text-gray-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white font-extrabold text-xs sm:text-sm transition cursor-pointer select-none';
      if (duelBtn) duelBtn.className = 'px-6 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-black text-xs sm:text-sm shadow-sm transition cursor-pointer select-none';
      if (typeof initDuelSocket === 'function') initDuelSocket();
      const savedNick = localStorage.getItem('ddp_duel_nickname') || '';
      const nickInput = document.getElementById('duel-nickname-input');
      if (nickInput && savedNick && !nickInput.value) nickInput.value = savedNick;
    } else {
      if (duelPanel) { duelPanel.classList.add('hidden'); duelPanel.style.display = 'none'; }
      if (soloPanel) { soloPanel.classList.remove('hidden'); soloPanel.style.display = ''; }
      if (soloBtn) soloBtn.className = 'px-6 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-black text-xs sm:text-sm shadow-sm transition cursor-pointer select-none';
      if (duelBtn) duelBtn.className = 'px-6 py-2.5 rounded-xl text-gray-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white font-extrabold text-xs sm:text-sm transition cursor-pointer select-none';
    }
  };
}
if (typeof window.openDuelPortal !== 'function') {
  window.openDuelPortal = function() {
    showScreen('screen-modes');
    window.switchModesTab('duel');
  };
}


// Attachement strict des événements Touch & Click sur les boutons de mode
document.addEventListener('DOMContentLoaded', () => {
  const tabDuel = document.getElementById('tab-btn-duel');
  if (tabDuel) {
    const triggerDuel = (e) => {
      if (e) {
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();
      }
      if (typeof window.switchModesTab === 'function') window.switchModesTab('duel');
    };
    tabDuel.addEventListener('click', triggerDuel);
    tabDuel.addEventListener('touchend', triggerDuel, { passive: false });
  }

  const tabSolo = document.getElementById('tab-btn-solo');
  if (tabSolo) {
    const triggerSolo = (e) => {
      if (e) {
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();
      }
      if (typeof window.switchModesTab === 'function') window.switchModesTab('solo');
    };
    tabSolo.addEventListener('click', triggerSolo);
    tabSolo.addEventListener('touchend', triggerSolo, { passive: false });
  }
});
