// ==============================================================
// GÉNÉRATEUR PROCÉDURAL DE JOUEURS DU MERCATO v6.0
// NATIONALITÉS DES JOUEURS, ARCHÉTYPES & PROFILS PSYCHOLOGIQUES
// ==============================================================

let ARCHETYPES_BY_POS_REF = typeof ARCHETYPES_BY_POS !== 'undefined' ? ARCHETYPES_BY_POS : null;
let PSYCHOLOGICAL_PROFILES_REF = typeof PSYCHOLOGICAL_PROFILES !== 'undefined' ? PSYCHOLOGICAL_PROFILES : null;
if (!ARCHETYPES_BY_POS_REF && typeof require !== 'undefined') {
  try {
    const archModule = require('./archetypes.js');
    ARCHETYPES_BY_POS_REF = archModule.ARCHETYPES_BY_POS;
    PSYCHOLOGICAL_PROFILES_REF = archModule.PSYCHOLOGICAL_PROFILES;
  } catch (e) {}
}

function resolvePlayerArchetype(pos, subPosKey, slotIndex) {
  if (!ARCHETYPES_BY_POS_REF) return null;
  let pool = null;
  if (pos === 'GAR' || subPosKey === 'GAR') {
    pool = ARCHETYPES_BY_POS_REF.GAR;
  } else if (['DC'].includes(subPosKey)) {
    pool = ARCHETYPES_BY_POS_REF.DC;
  } else if (['DG', 'DD'].includes(subPosKey) || (pos === 'DEF' && subPosKey !== 'DC')) {
    pool = ARCHETYPES_BY_POS_REF.LATERAL;
  } else if (['MDF'].includes(subPosKey)) {
    pool = ARCHETYPES_BY_POS_REF.MDF;
  } else if (['MC'].includes(subPosKey)) {
    pool = ARCHETYPES_BY_POS_REF.MC;
  } else if (['MO'].includes(subPosKey)) {
    pool = ARCHETYPES_BY_POS_REF.MO;
  } else if (['AG', 'AD'].includes(subPosKey)) {
    pool = ARCHETYPES_BY_POS_REF.AILIER;
  } else if (['BU'].includes(subPosKey) || pos === 'ATT') {
    pool = ARCHETYPES_BY_POS_REF.BU;
  } else if (pos === 'MIL') {
    pool = ARCHETYPES_BY_POS_REF.MC;
  } else {
    pool = ARCHETYPES_BY_POS_REF.DC;
  }

  if (!pool || pool.length === 0) return null;
  return { ...pool[slotIndex % pool.length] };
}

function resolvePlayerPsychology(tier, slotIndex, age) {
  if (!PSYCHOLOGICAL_PROFILES_REF || PSYCHOLOGICAL_PROFILES_REF.length === 0) return null;
  
  if (tier === 'BARGAIN_RISK') {
    const riskCodes = ['GENIE_TOXIQUE', 'PARI_MEDICAL', 'TETE_BRULEE'];
    const code = riskCodes[slotIndex % riskCodes.length];
    return { ...PSYCHOLOGICAL_PROFILES_REF.find(p => p.code === code) };
  }
  if (tier === 'CHEAP_WRONG') {
    const cheapCodes = ['MERCENAIRE_FROID', 'TETE_BRULEE', 'DIAMANT_BRUT'];
    const code = cheapCodes[slotIndex % cheapCodes.length];
    return { ...PSYCHOLOGICAL_PROFILES_REF.find(p => p.code === code) };
  }
  if (age <= 21) {
    return { ...PSYCHOLOGICAL_PROFILES_REF.find(p => p.code === 'DIAMANT_BRUT') };
  }
  if (tier === 'TOP_TARGET') {
    const topCodes = ['LEADER_EXEMPLAIRE', 'SOLDAT_COLLECTIF', 'GENIE_TOXIQUE'];
    const code = topCodes[slotIndex % topCodes.length];
    return { ...PSYCHOLOGICAL_PROFILES_REF.find(p => p.code === code) };
  }
  
  const solidCodes = ['SOLDAT_COLLECTIF', 'SOLDAT_COLLECTIF', 'LEADER_EXEMPLAIRE', 'MERCENAIRE_FROID'];
  const code = solidCodes[slotIndex % solidCodes.length];
  return { ...PSYCHOLOGICAL_PROFILES_REF.find(p => p.code === code) };
}

const NATIONALITIES_DB = [
  // Europe de l'Ouest & Sud
  { name: 'France', flag: '🇫🇷', region: 'DOMESTIC_FR', continent: 'Europe' },
  { name: 'Espagne', flag: '🇪🇸', region: 'DOMESTIC_ES', continent: 'Europe' },
  { name: 'Angleterre', flag: '󠁧󠁢󠁥󠁮󠁧󠁿', region: 'DOMESTIC_EN', continent: 'Europe' },
  { name: 'Italie', flag: '🇮🇹', region: 'DOMESTIC_IT', continent: 'Europe' },
  { name: 'Allemagne', flag: '🇩🇪', region: 'DOMESTIC_DE', continent: 'Europe' },
  { name: 'Portugal', flag: '🇵🇹', region: 'EURO_TACTICAL', continent: 'Europe' },
  { name: 'Pays-Bas', flag: '🇳🇱', region: 'EURO_TACTICAL', continent: 'Europe' },
  { name: 'Belgique', flag: '🇧🇪', region: 'EURO_TACTICAL', continent: 'Europe' },
  { name: 'Suisse', flag: '🇨🇭', region: 'EURO_TACTICAL', continent: 'Europe' },

  // Réseau Amérique du Sud (CONMEBOL)
  { name: 'Brésil', flag: '🇧🇷', region: 'SOUTH_AMERICA', continent: 'Amérique du Sud' },
  { name: 'Argentine', flag: '🇦🇷', region: 'SOUTH_AMERICA', continent: 'Amérique du Sud' },
  { name: 'Uruguay', flag: '🇺🇾', region: 'SOUTH_AMERICA', continent: 'Amérique du Sud' },
  { name: 'Colombie', flag: '🇨🇴', region: 'SOUTH_AMERICA', continent: 'Amérique du Sud' },
  { name: 'Chili', flag: '🇨🇱', region: 'SOUTH_AMERICA', continent: 'Amérique du Sud' },

  // Afrique (Puissance & Vitesse)
  { name: 'Sénégal', flag: '🇸🇳', region: 'AFRICA', continent: 'Afrique' },
  { name: 'Côte d\'Ivoire', flag: '🇨🇮', region: 'AFRICA', continent: 'Afrique' },
  { name: 'Maroc', flag: '🇲🇦', region: 'AFRICA', continent: 'Afrique' },
  { name: 'Algérie', flag: '🇩🇿', region: 'AFRICA', continent: 'Afrique' },
  { name: 'Cameroun', flag: '🇨🇲', region: 'AFRICA', continent: 'Afrique' },
  { name: 'Nigéria', flag: '🇳🇬', region: 'AFRICA', continent: 'Afrique' },
  { name: 'Mali', flag: '🇲🇱', region: 'AFRICA', continent: 'Afrique' },
  { name: 'Égypte', flag: '🇪🇬', region: 'AFRICA', continent: 'Afrique' },
  { name: 'Tunisie', flag: '🇹🇳', region: 'AFRICA', continent: 'Afrique' },

  // Nordique & Europe de l'Est
  { name: 'Danemark', flag: '🇩🇰', region: 'NORDIC_EAST', continent: 'Europe' },
  { name: 'Suède', flag: '🇸🇪', region: 'NORDIC_EAST', continent: 'Europe' },
  { name: 'Norvège', flag: '🇳🇴', region: 'NORDIC_EAST', continent: 'Europe' },
  { name: 'Croatie', flag: '🇭🇷', region: 'NORDIC_EAST', continent: 'Europe' },
  { name: 'Serbie', flag: '🇷🇸', region: 'NORDIC_EAST', continent: 'Europe' },
  { name: 'Pologne', flag: '🇵🇱', region: 'NORDIC_EAST', continent: 'Europe' },

  // Asie & Amériques
  { name: 'Japon', flag: '🇯🇵', region: 'INTERNATIONAL_MIX', continent: 'Asie' },
  { name: 'Corée du Sud', flag: '🇰🇷', region: 'INTERNATIONAL_MIX', continent: 'Asie' },
  { name: 'États-Unis', flag: '🇺🇸', region: 'INTERNATIONAL_MIX', continent: 'Amérique du Nord' }
];

const FIRST_NAMES = [
  'Lucas', 'Matteo', 'Kylian', 'Viktor', 'Dmitri', 'Kofi', 'Julian', 'Thiago', 'Sami', 'Diego',
  'Enzo', 'Bastien', 'Hiroshi', 'Ezekiel', 'Gianluigi', 'Mamadou', 'Gonzalo', 'Stanislav', 'Billy',
  'Alexis', 'Hassan', 'Mateo', 'Florian', 'Kevin', 'Rami', 'Daniele', 'Cheick', 'Alvaro', 'Igor',
  'Pablo', 'Rasmus', 'Luka', 'Gabriel', 'Hakim', 'Arthur', 'Emil', 'Dusan', 'Yassine', 'Nico', 'Jonas',
  'Romain', 'Valentin', 'Adrien', 'Federico', 'Lorenzo', 'Sébastien', 'Goran', 'Milan', 'Tariq', 'Milos',
  'Stéphane', 'Loris', 'Théo', 'Yousri', 'Léo', 'Karim', 'Sadio', 'Santiago', 'Hwang', 'Takehiro'
];

const LAST_NAMES = [
  'Vane', 'Lindqvist', 'Petrov', 'Mensah', 'Silva', 'Bianchi', 'Marchand', 'Tanaka', 'Cole',
  'Rossi', 'Diaby', 'Morales', 'Baxter', 'Gomez', 'Al-Zahrani', 'Benitez', 'Weber', 'O\'Connor',
  'Benali', 'Traoré', 'Soler', 'Dragovic', 'Kovacevic', 'Morel', 'Lindner', 'Khedirsson',
  'Santos', 'Kamara', 'Carvalho', 'N\'Guessan', 'Fischer', 'Larsson', 'Navarro', 'Diallo', 'Müller',
  'Kone', 'Guerrier', 'Novak', 'Stankovic', 'Duarte', 'Borges', 'Pavlovic', 'Fontaine', 'Vargas',
  'Shalaby', 'Torti', 'Dessaix-Walger', 'Hazgui', 'Camara', 'Ibrahimovic', 'Odegaard', 'Valverde', 'Koulibaly', 'Endo', 'Son'
];

const NICKNAMES = [
  'El Muro', 'Le TGV', 'Le Magicien', 'Le Cyborg', 'Casseur de lignes', 'Le Pitbull',
  'Le Poète', 'La Foudre', 'Le Renard', 'Tête d\'Or', 'Le Shérif', 'Pied Soyeux',
  'Le Métronome', 'Mains de Fer', 'La Panthère', 'Mister Derby', 'L\'Artificier', 'Le Sniper'
];

const CLUBS_VENDORS = [
  'Porto Dragons', 'Sevilla Rojiblancos', 'Amsterdam Sons', 'Bayer Leverkusen', 'Atalanta Bergamo',
  'Celtic Glasgow', 'Fiorentina Viola', 'Sporting Lions', 'LOSC Dogues', 'Union Berlin',
  'Real Betis', 'Feyenoord Port', 'Sao Paulo Tricolor', 'Benfica Seixal', 'Torino Granata',
  'Anderlecht Mauves', 'Boca Juniors', 'River Plate', 'Braga Guerreiros', 'Zagreb Dinamo'
];

const NEGATIVE_TRAITS = [
  'Fêtard invétéré',
  'Genou en cristal',
  'Égo surdimensionné',
  'Mauvais perdant',
  'Irrégulier',
  'Gourmand en salaire',
  'Allergique au repli',
  'Capricieux sous pression'
];

const OFF_TARGET_TRAITS = [
  'Dribbleur solitaire',
  'Manque de puissance',
  'Relance hasardeuse',
  'Discret dans les grands matchs',
  'Lent au démarrage',
  'Profil brut non formé',
  'Fragilité musculaire'
];

const SUBPOS_CATALOG = {
  // DEF
  DC: { pos: 'DEF', name: 'Défenseur Central', icon: '️', versatilities: ['Polyvalent 6 / DC', 'Polyvalent DC / DD', null, null] },
  DG: { pos: 'DEF', name: 'Latéral Gauche', icon: '', versatilities: ['Polyvalent DG / DD', 'Piston DG / Ailier', null, null] },
  DD: { pos: 'DEF', name: 'Latéral Droit', icon: '‍️', versatilities: ['Polyvalent DD / DG', 'Polyvalent DD / DC', null, null] },
  
  // MIL
  MDF: { pos: 'MIL', name: 'Sentinelle (6)', icon: '', versatilities: ['Polyvalent 6 / DC', 'Polyvalent 6 / 8', null, null] },
  MC: { pos: 'MIL', name: 'Milieu Relayeur (8)', icon: '', versatilities: ['Polyvalent 8 / 6', 'Polyvalent 8 / 10', null, null] },
  MO: { pos: 'MIL', name: 'Meneur de Jeu (10)', icon: '', versatilities: ['Polyvalent 10 / Ailier', 'Polyvalent 10 / BU', null, null] },
  
  // ATT
  BU: { pos: 'ATT', name: 'Buteur (9)', icon: '', versatilities: ['Polyvalent BU / Ailier', null, null] },
  AG: { pos: 'ATT', name: 'Ailier Gauche', icon: '', versatilities: ['Polyvalent AG / AD', 'Polyvalent AG / BU', null, null] },
  AD: { pos: 'ATT', name: 'Ailier Droit', icon: '', versatilities: ['Polyvalent AD / AG', 'Polyvalent AD / DD', null, null] },
  
  // GAR
  GAR: { pos: 'GAR', name: 'Gardien de But', icon: '', versatilities: [null] }
};

/**
 * Convertit un code de besoin de scénario en configuration de cible joueur
 */
function resolveNeedTarget(need) {
  const code = (typeof need === 'object' && need.code) ? need.code : need;

  if (SUBPOS_CATALOG[code]) {
    return { subPos: code, forceVersatile: null, forceU21: false };
  }
  if (code === 'POLYVALENT_6_DC') {
    return { subPos: Math.random() > 0.5 ? 'DC' : 'MDF', forceVersatile: 'Polyvalent 6 / DC', forceU21: false };
  }
  if (code === 'POLYVALENT_DG_DD' || code === 'LATERAL' || code === 'POLYVALENT_LATERAUX') {
    const randomSub = Math.random() > 0.5 ? 'DG' : 'DD';
    return { subPos: randomSub, forceVersatile: 'Polyvalent DG / DD', forceU21: false };
  }
  if (code === 'POLYVALENT_PISTON_AILIER') {
    const isLeft = Math.random() > 0.5;
    return { subPos: isLeft ? 'DG' : 'DD', forceVersatile: isLeft ? 'Piston DG / Ailier' : 'Piston Droit AD / DD', forceU21: false };
  }
  if (code === 'POLYVALENT_6_8') {
    return { subPos: Math.random() > 0.5 ? 'MDF' : 'MC', forceVersatile: 'Polyvalent 6 / 8', forceU21: false };
  }
  if (code === 'POLYVALENT_8_10') {
    return { subPos: Math.random() > 0.5 ? 'MC' : 'MO', forceVersatile: 'Polyvalent 8 / 10', forceU21: false };
  }
  if (code === 'POLYVALENT_10_AILIER') {
    return { subPos: Math.random() > 0.5 ? 'MO' : 'AG', forceVersatile: 'Polyvalent 10 / Ailier', forceU21: false };
  }
  if (code === 'POLYVALENT_DEUX_AILES') {
    return { subPos: Math.random() > 0.5 ? 'AG' : 'AD', forceVersatile: 'Polyvalent AG / AD', forceU21: false };
  }
  if (code === 'POLYVALENT_ATTAQUE') {
    return { subPos: Math.random() > 0.5 ? 'BU' : 'AG', forceVersatile: 'Polyvalent BU / Ailier', forceU21: false };
  }
  if (code === 'POLYVALENT_DC_LATERAL') {
    const sub = Math.random() > 0.5 ? 'DC' : (Math.random() > 0.5 ? 'DD' : 'DG');
    return { subPos: sub, forceVersatile: 'Polyvalent DC / DD', forceU21: false };
  }
  if (code === 'PEPITE_U21') {
    const randomSub = ['BU', 'AG', 'MC', 'DC', 'DG'][Math.floor(Math.random() * 5)];
    return { subPos: randomSub, forceVersatile: null, forceU21: true };
  }

  // Fallback broad
  if (code === 'DEF') return { subPos: 'DC', forceVersatile: null, forceU21: false };
  if (code === 'ATT') return { subPos: 'BU', forceVersatile: null, forceU21: false };
  if (code === 'MIL') return { subPos: 'MC', forceVersatile: null, forceU21: false };
  return { subPos: 'DC', forceVersatile: null, forceU21: false };
}

/**
 * Génère 21 joueurs ciblés pour les 3 besoins du scénario.
 * Prix calibrés pour permettre 3 signatures stratégiques.
 */
function generateProceduralMarket(clubBudget = 50, scenario = null) {
  const players = [];
  const needs = (scenario && scenario.needs) || [
    { code: 'DC', name: 'Défenseur Central' },
    { code: 'BU', name: 'Buteur (9)' },
    { code: 'MDF', name: 'Sentinelle (6)' }
  ];

  const originConstraint = (scenario && scenario.originConstraint) ? scenario.originConstraint : null;
  const clubCountry = (scenario && scenario.country) ? scenario.country : '';

  const target1 = resolveNeedTarget(needs[0] || 'DC');
  const target2 = resolveNeedTarget(needs[1] || 'BU');
  const target3 = resolveNeedTarget(needs[2] || 'MDF');

  const slots = [
    // 6 joueurs pour Besoin 1
    { target: target1, tier: 'TOP_TARGET', roleNeedIndex: 0 },
    { target: target1, tier: 'SOLID', roleNeedIndex: 0 },
    { target: target1, tier: 'SOLID', roleNeedIndex: 0 },
    { target: target1, tier: 'MID_ROTATION', roleNeedIndex: 0 },
    { target: target1, tier: 'BARGAIN_RISK', roleNeedIndex: 0 },
    { target: target1, tier: 'CHEAP_WRONG', roleNeedIndex: 0 },

    // 6 joueurs pour Besoin 2
    { target: target2, tier: 'TOP_TARGET', roleNeedIndex: 1 },
    { target: target2, tier: 'SOLID', roleNeedIndex: 1 },
    { target: target2, tier: 'SOLID', roleNeedIndex: 1 },
    { target: target2, tier: 'MID_ROTATION', roleNeedIndex: 1 },
    { target: target2, tier: 'BARGAIN_RISK', roleNeedIndex: 1 },
    { target: target2, tier: 'CHEAP_WRONG', roleNeedIndex: 1 },

    // 6 joueurs pour Besoin 3
    { target: target3, tier: 'TOP_TARGET', roleNeedIndex: 2 },
    { target: target3, tier: 'SOLID', roleNeedIndex: 2 },
    { target: target3, tier: 'SOLID', roleNeedIndex: 2 },
    { target: target3, tier: 'MID_ROTATION', roleNeedIndex: 2 },
    { target: target3, tier: 'BARGAIN_RISK', roleNeedIndex: 2 },
    { target: target3, tier: 'CHEAP_WRONG', roleNeedIndex: 2 },

    // 3 joueurs Wildcards (autres postes pour créer de la variété)
    { target: { subPos: 'GAR', forceVersatile: null, forceU21: false }, tier: 'WILDCARD', roleNeedIndex: -1 },
    { target: { subPos: 'MC', forceVersatile: 'Polyvalent 8 / 10', forceU21: false }, tier: 'WILDCARD', roleNeedIndex: -1 },
    { target: { subPos: 'AG', forceVersatile: 'Polyvalent AG / AD', forceU21: false }, tier: 'WILDCARD', roleNeedIndex: -1 }
  ];

  // POOL DES JOUEURS PERSONNALISÉS (Shalaby, Torti, Dessaix-Walger, Hazgui, Marchand)
  // Apparition aléatoire comme tout le monde (pas à chaque partie)
  // et profil 100% dynamique (poste, âge, prix, club, traits changent à chaque partie)
  const VIP_CUSTOM_PLAYERS = [
    { name: 'Stéphane Shalaby', nationality: { name: 'Égypte', flag: '🇪🇬', region: 'AFRICA', continent: 'Afrique' } },
    { name: 'Loris Torti', nationality: { name: 'Italie', flag: '🇮🇹', region: 'DOMESTIC_IT', continent: 'Europe' } },
    { name: 'Théo Dessaix-Walger', nationality: { name: 'France', flag: '🇫🇷', region: 'DOMESTIC_FR', continent: 'Europe' } },
    { name: 'Yousri Hazgui', nationality: { name: 'Tunisie', flag: '🇹🇳', region: 'AFRICA', continent: 'Afrique' } },
    { name: 'Léo Marchand', nationality: { name: 'France', flag: '🇫🇷', region: 'DOMESTIC_FR', continent: 'Europe' } }
  ];

  const availableIndices = Array.from({ length: slots.length }, (_, i) => i);
  for (let i = availableIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
  }

  const shuffledVips = [...VIP_CUSTOM_PLAYERS];
  for (let i = shuffledVips.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledVips[i], shuffledVips[j]] = [shuffledVips[j], shuffledVips[i]];
  }

  // Tirage au sort réaliste :
  // ~45% de chances d'avoir 0 joueur personnalisé (marché classique)
  // ~40% de chances d'avoir 1 joueur personnalisé aléatoire
  // ~15% de chances d'en croiser 2
  const rollVip = Math.random();
  let numVips = 0;
  if (rollVip < 0.45) {
    numVips = 0;
  } else if (rollVip < 0.85) {
    numVips = 1;
  } else {
    numVips = 2;
  }

  const activeVipMap = new Map();
  for (let i = 0; i < numVips; i++) {
    activeVipMap.set(availableIndices[i], shuffledVips[i]);
  }

  slots.forEach((slot, idx) => {
    const subPosKey = slot.target.subPos || 'DC';
    const subPosDef = SUBPOS_CATALOG[subPosKey] || SUBPOS_CATALOG.DC;
    const pos = subPosDef.pos;
    const tier = slot.tier;

    let firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    let lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    let hasNickname = Math.random() > 0.65;
    let nickname = hasNickname ? `"${NICKNAMES[Math.floor(Math.random() * NICKNAMES.length)]}" ` : '';
    let fullName = `${firstName} ${nickname}${lastName}`;
    const club = CLUBS_VENDORS[Math.floor(Math.random() * CLUBS_VENDORS.length)];

    let nationality = null;

    if (activeVipMap.has(idx)) {
      const vip = activeVipMap.get(idx);
      fullName = vip.name;
      nationality = vip.nationality;
    } else {
      // Consigne géographique du coach : assurer des candidats éligibles
      if (originConstraint && originConstraint.code !== 'FREE' && (idx % 3 === 0 || idx === 1 || idx === 7 || idx === 13)) {
        if (originConstraint.code === 'DOMESTIC') {
          if (clubCountry.includes('France')) nationality = { name: 'France', flag: '🇫🇷', region: 'DOMESTIC_FR', continent: 'Europe' };
          else if (clubCountry.includes('Espagne')) nationality = { name: 'Espagne', flag: '🇪🇸', region: 'DOMESTIC_ES', continent: 'Europe' };
          else if (clubCountry.includes('Angleterre')) nationality = { name: 'Angleterre', flag: '󠁧󠁢󠁥󠁮󠁧󠁿', region: 'DOMESTIC_EN', continent: 'Europe' };
          else if (clubCountry.includes('Italie')) nationality = { name: 'Italie', flag: '🇮🇹', region: 'DOMESTIC_IT', continent: 'Europe' };
          else if (clubCountry.includes('Allemagne')) nationality = { name: 'Allemagne', flag: '🇩🇪', region: 'DOMESTIC_DE', continent: 'Europe' };
          else if (clubCountry.includes('Portugal')) nationality = { name: 'Portugal', flag: '🇵🇹', region: 'EURO_TACTICAL', continent: 'Europe' };
          else if (clubCountry.includes('Pays-Bas')) nationality = { name: 'Pays-Bas', flag: '🇳🇱', region: 'EURO_TACTICAL', continent: 'Europe' };
          else if (clubCountry.includes('Écosse') || clubCountry.includes('Premiership')) nationality = { name: 'Écosse', flag: '󠁧󠁢󠁳󠁣󠁴󠁿', region: 'DOMESTIC_EN', continent: 'Europe' };
          else if (clubCountry.includes('Turquie') || clubCountry.includes('Süper Lig')) nationality = { name: 'Turquie', flag: '🇹🇷', region: 'EURO_TACTICAL', continent: 'Europe' };
          else if (clubCountry.includes('Brésil') || clubCountry.includes('Brasileirão')) nationality = { name: 'Brésil', flag: '🇧🇷', region: 'SOUTH_AMERICA', continent: 'Amérique du Sud' };
          else if (clubCountry.includes('Argentine') || clubCountry.includes('Primera División')) nationality = { name: 'Argentine', flag: '🇦🇷', region: 'SOUTH_AMERICA', continent: 'Amérique du Sud' };
          else if (clubCountry.includes('Saudi') || clubCountry.includes('Saoudite')) nationality = { name: 'Arabie Saoudite', flag: '🇸🇦', region: 'EURO_TACTICAL', continent: 'Asie' };
          else if (clubCountry.includes('Major League Soccer') || clubCountry.includes('MLS')) nationality = { name: 'USA', flag: '🇺🇸', region: 'EURO_TACTICAL', continent: 'Amérique du Nord' };
        } else if (originConstraint.code === 'SOUTH_AMERICA') {
          const saPool = NATIONALITIES_DB.filter(n => n.continent === 'Amérique du Sud');
          nationality = saPool[Math.floor(Math.random() * saPool.length)];
        } else if (originConstraint.code === 'AFRICA') {
          const afPool = NATIONALITIES_DB.filter(n => n.continent === 'Afrique');
          nationality = afPool[Math.floor(Math.random() * afPool.length)];
        } else if (originConstraint.code === 'EURO_TACTICAL') {
          const euPool = NATIONALITIES_DB.filter(n => n.continent === 'Europe');
          nationality = euPool[Math.floor(Math.random() * euPool.length)];
        } else if (originConstraint.code === 'NORDIC_EAST') {
          const nePool = NATIONALITIES_DB.filter(n => n.region === 'NORDIC_EAST');
          nationality = nePool[Math.floor(Math.random() * nePool.length)];
        } else if (originConstraint.code === 'EXPATRIATE') {
          const expatPool = NATIONALITIES_DB.filter(n => !clubCountry.includes(n.name));
          nationality = expatPool[Math.floor(Math.random() * expatPool.length)];
        }
      }

      if (!nationality) {
        nationality = NATIONALITIES_DB[Math.floor(Math.random() * NATIONALITIES_DB.length)];
      }
    }

    let versatility = slot.target.forceVersatile;
    if (!versatility && subPosDef.versatilities) {
      const vOptions = subPosDef.versatilities;
      versatility = vOptions[Math.floor(Math.random() * vOptions.length)];
    }

    let priceRatio = 0.30;
    let stance = { text: 'Négociation ouverte', factor: 1.10, profile: 'greedy' };
    let reputation = 'Joueur de rotation';
    let caliberLabel = ' Rotation';
    let caliberBadgeStyle = 'bg-blue-950/60 text-blue-300 border border-blue-800';
    let age = slot.target.forceU21 ? (18 + Math.floor(Math.random() * 4)) : (22 + Math.floor(Math.random() * 8));
    let playerTraits = [];

    // Traits spécifiques par poste
    const posTraitsGood = {
      DC: ['Roc défensif', 'Relance propre', 'Patron aérien', 'Leader vocal', 'Discipline tactique'],
      DG: ['Vitesse supersonique', 'Centres millimétrés', 'Infatigable', 'Piston moderne'],
      DD: ['Infatigable', 'Solide au duel', 'Vitesse supersonique', 'Centres précis'],
      MDF: ['Râtisseur infatigable', 'Passeur laser', 'Sentinelle rugueuse', 'Impact physique'],
      MC: ['Vision laser', 'Maestro du tempo', 'Box-to-box endurant', 'Plaque tournante'],
      MO: ['Maestro créatif', 'Vision laser', 'Tireur de coup franc', 'Dribbleur soyeux'],
      BU: ['Tueur clinique', 'Renard des surfaces', 'Finition chirurgicale', 'Sens du but'],
      AG: ['Ailier supersonique', 'Dribbleur déroutant', 'Pied soyeux', 'Vitesse pure'],
      AD: ['Ailier supersonique', 'Pied soyeux', 'Dribbleur percutant', 'Centres tendus'],
      GAR: ['Mains de fer', 'Réflexes félins', 'Autorité aérienne', 'Gardien libéro']
    };

    const goodOptions = posTraitsGood[subPosKey] || ['Collectif avant tout', 'Discipline tactique'];
    const diff = (scenario && scenario.difficulty) ? scenario.difficulty : 'moyen';

    if (tier === 'TOP_TARGET') {
      // LEADER OU STAR SELON LE STANDING DU CLUB
      if (diff === 'difficile') {
        // Club maintien : Vétéran revanchard ou leader de vestiaire D1
        priceRatio = 0.40 + Math.random() * 0.10;
        reputation = 'Leader de maintien';
        caliberLabel = 'Leader de Maintien';
        caliberBadgeStyle = 'bg-amber-950/60 text-amber-300 border border-amber-700/60 font-bold';
        playerTraits = [goodOptions[0] || 'Roc défensif', 'Leader vocal'];
        stance = { text: 'Cadre indispensable', factor: 1.20, profile: 'aggressive' };
        if (!slot.target.forceU21) age = 27 + Math.floor(Math.random() * 5);
      } else if (diff === 'moyen') {
        // Club milieu : Tête d'affiche internationale
        priceRatio = 0.38 + Math.random() * 0.10;
        reputation = 'Tête d\'affiche D1';
        caliberLabel = 'Recrue Phare';
        caliberBadgeStyle = 'bg-amber-950/60 text-amber-300 border border-amber-700/60 font-bold';
        playerTraits = [goodOptions[0], goodOptions[1] || 'Vision laser'];
        stance = { text: 'Star de l\'équipe', factor: 1.25, profile: 'aggressive' };
        if (!slot.target.forceU21) age = 24 + Math.floor(Math.random() * 5);
      } else {
        // Top club : Superstar mondiale
        priceRatio = 0.42 + Math.random() * 0.12;
        reputation = 'Superstar Mondiale';
        caliberLabel = 'Superstar Mondiale';
        caliberBadgeStyle = 'bg-amber-950/80 text-amber-200 border border-amber-400 font-extrabold shadow-sm';
        playerTraits = [goodOptions[0], 'Sang-froid clinique'];
        stance = { text: 'Intransférable en théorie', factor: 1.30, profile: 'aggressive' };
        if (!slot.target.forceU21) age = 24 + Math.floor(Math.random() * 5);
      }

    } else if (tier === 'SOLID') {
      // TITULAIRE ÉPROUVÉ
      priceRatio = 0.28 + Math.random() * 0.08;
      if (diff === 'difficile') {
        reputation = 'Soldat de D1';
        caliberLabel = ' Bon Soldat de D1';
      } else if (diff === 'moyen') {
        reputation = 'Titulaire régulier';
        caliberLabel = ' Titulaire Fiable';
      } else {
        reputation = 'Titulaire Élite LDC';
        caliberLabel = ' Titulaire Élite';
      }
      caliberBadgeStyle = 'bg-emerald-950/60 text-emerald-300 border border-emerald-700/60 font-semibold';
      playerTraits = [goodOptions[Math.floor(Math.random() * goodOptions.length)], 'Collectif avant tout'];
      stance = { text: 'Négociation ouverte', factor: 1.15, profile: 'greedy' };
      if (!slot.target.forceU21) age = 23 + Math.floor(Math.random() * 6);

    } else if (tier === 'MID_ROTATION') {
      // JOUEUR DE ROTATION / COMPROMIS
      priceRatio = 0.17 + Math.random() * 0.07;
      reputation = diff === 'difficile' ? 'Rotation D1' : 'Joueur de rotation';
      caliberLabel = ' Rotation Fiable';
      caliberBadgeStyle = 'bg-blue-950/60 text-blue-300 border border-blue-800';
      playerTraits = ['Discipline tactique', 'Infatigable'];
      stance = { text: 'Sur la liste des transferts', factor: 0.95, profile: 'relaxed' };
      if (!slot.target.forceU21) age = 23 + Math.floor(Math.random() * 6);

    } else if (tier === 'BARGAIN_RISK') {
      // TALENT REVANCHARD / RISQUÉ MAIS ABORDABLE
      priceRatio = 0.11 + Math.random() * 0.06;
      const toxic = NEGATIVE_TRAITS[Math.floor(Math.random() * NEGATIVE_TRAITS.length)];
      playerTraits = [goodOptions[0] || 'Sens du but', toxic];
      reputation = 'Pari risqué';
      caliberLabel = ' Pari à Risque';
      caliberBadgeStyle = 'bg-purple-950/60 text-purple-300 border border-purple-800';
      stance = { text: 'En froid avec le club', factor: 0.85, profile: 'desperate' };
      if (!slot.target.forceU21) age = 21 + Math.floor(Math.random() * 7);

    } else if (tier === 'CHEAP_WRONG') {
      // DÉPANNAGE AU RABAIS (LE PIÈGE LOW-COST)
      priceRatio = 0.06 + Math.random() * 0.05;
      playerTraits = [
        OFF_TARGET_TRAITS[Math.floor(Math.random() * OFF_TARGET_TRAITS.length)],
        'Irrégulier'
      ];
      reputation = diff === 'difficile' ? 'Dépannage Low-Cost' : 'Complément très limité';
      caliberLabel = '️ Dépannage Low-Cost';
      caliberBadgeStyle = 'bg-rose-950/60 text-rose-300 border border-rose-900/60';
      stance = { text: 'Libre de partir à prix bradé', factor: 0.78, profile: 'desperate' };
      age = Math.random() > 0.5 ? (18 + Math.floor(Math.random() * 3)) : 33;

    } else {
      // WILDCARD
      priceRatio = 0.15 + Math.random() * 0.15;
      playerTraits = ['Discipline tactique', 'Polyvalent'];
      reputation = 'Joueur de complément';
      caliberLabel = ' Profil Complément';
      caliberBadgeStyle = 'bg-gray-800 text-gray-300 border border-gray-700';
    }

    // Référence de prix marché des joueurs indépendante du budget réduit du club
    let marketPricingBase = clubBudget;
    if (diff === 'moyen') {
      marketPricingBase = 56;
    } else if (diff === 'difficile') {
      marketPricingBase = Math.max(8.5, Math.min(13.5, clubBudget * 1.15));
    } else if (diff === 'facile') {
      marketPricingBase = Math.max(160, clubBudget);
    }

    const estimatedValue = Math.max(0.6, Math.round(marketPricingBase * priceRatio * 10) / 10);
    const hiddenRealPrice = Math.max(0.5, Math.round(estimatedValue * stance.factor * 10) / 10);

    const playerArchetype = resolvePlayerArchetype(pos, subPosKey, idx);
    const playerPsychology = resolvePlayerPsychology(tier, idx, age);

    players.push({
      id: `proc_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 5)}`,
      name: fullName,
      nationality: nationality,
      pos: pos,
      subPos: subPosKey,
      subPosName: subPosDef.name,
      subPosIcon: subPosDef.icon,
      archetype: playerArchetype,
      psychology: playerPsychology,
      versatility: versatility,
      age: age,
      reputation: reputation,
      caliberTier: tier,
      caliberLabel: caliberLabel,
      caliberBadgeStyle: caliberBadgeStyle,
      estimatedPrice: estimatedValue,
      hiddenRealPrice: hiddenRealPrice,
      club: club,
      availability: stance.text,
      sellerProfile: stance.profile,
      traits: playerTraits,
      isSoldToRival: false,
      rivalBidClub: null,
      isNegotiationFailed: false,
      targetNeedIndex: slot.roleNeedIndex
    });
  });

  return players.sort((a, b) => a.estimatedPrice - b.estimatedPrice);
}

if (typeof module !== 'undefined') {
  module.exports = { generateProceduralMarket, SUBPOS_CATALOG };
}
