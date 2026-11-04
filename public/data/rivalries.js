// ==============================================================
// CATALOGUE DES RIVALITÉS & DERBYS DU MODE DUEL 1V1 (v1.0)
// 47 DUOS EMBLÉMATIQUES À TRAVERS 13 CHAMPIONNATS MONDIAUX
// ==============================================================

const DUEL_RIVALRIES = [
  // ==========================================
  // 🇫🇷 LIGUE 1 (FRANCE)
  // ==========================================
  {
    id: 'l1-classique',
    league: '🇫🇷 Ligue 1 (France)',
    rivalryName: '⚔️ LE CLASSIQUE',
    rivalryTag: 'Rivalité Historique & Électrique',
    clubA_name: 'Paris Capitale SG',
    clubB_name: 'Marseille Phocéens FC',
    tier: 'titre'
  },
  {
    id: 'l1-derby-rhone',
    league: '🇫🇷 Ligue 1 (France)',
    rivalryName: '⚔️ DERBY RHÔNE-ALPES',
    rivalryTag: 'Guerre des Gones & des Verts',
    clubA_name: 'Olympique de Paname',
    clubB_name: 'Saint-Étienne Verts',
    tier: 'europe'
  },
  {
    id: 'l1-derby-nord',
    league: '🇫🇷 Ligue 1 (France)',
    rivalryName: '⚔️ DERBY DU NORD',
    rivalryTag: 'Sang et Or vs Dogues • Ferveur Populaire Pure',
    clubA_name: 'Lens Sang et Or',
    clubB_name: 'LOSC Dogues',
    tier: 'europe'
  },
  {
    id: 'l1-mediterranee',
    league: '🇫🇷 Ligue 1 (France)',
    rivalryName: '⚔️ CHOC MÉDITERRANÉEN',
    rivalryTag: 'Rocher Princier vs Volcan Phocéen',
    clubA_name: 'AS Monaco Rock FC',
    clubB_name: 'Marseille Phocéens FC',
    tier: 'titre'
  },
  {
    id: 'l1-bretagne',
    league: '🇫🇷 Ligue 1 (France)',
    rivalryName: '⚔️ DERBY BRETON',
    rivalryTag: 'Roazhon vs Ti-Zef • Fierté Armoricaine',
    clubA_name: 'Rennes Celtes',
    clubB_name: 'Brest Pirates',
    tier: 'europe'
  },
  {
    id: 'l1-maintien-est',
    league: '🇫🇷 Ligue 1 (France)',
    rivalryName: '⚔️ DUEL DE TRADITION & MAINTIEN',
    rivalryTag: 'Bataille de l\'Est & Bastions Historiques',
    clubA_name: 'Auxerre Abbé Deschamps',
    clubB_name: 'Metz Grenats',
    tier: 'maintien'
  },
  {
    id: 'l1-maintien-survie',
    league: '🇫🇷 Ligue 1 (France)',
    rivalryName: '⚔️ COMMANDO DE LA SURVIE',
    rivalryTag: 'Doyens Normands vs Scoïstes d\'Anjou',
    clubA_name: 'Le Havre Doyens',
    clubB_name: 'Angers Scoïstes',
    tier: 'maintien'
  },
  {
    id: 'l1-redstar-clermont',
    league: '🇫🇷 Ligue 1 (France)',
    rivalryName: '⚔️ CHOC DU PEUPLE & VOLCANS',
    rivalryTag: 'Étoile Rouge de Saint-Ouen vs Auvergne',
    clubA_name: 'Red Star Saint-Ouen',
    clubB_name: 'Clermont Foot',
    tier: 'maintien'
  },

  // ==========================================
  // 🏴󠁧󠁢󠁥󠁮󠁧󠁿 PREMIER LEAGUE (ANGLETERRE)
  // ==========================================
  {
    id: 'pl-north-london',
    league: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)',
    rivalryName: '⚔️ NORTH LONDON DERBY',
    rivalryTag: 'Gunners vs Spurs • La Haine de Londres',
    clubA_name: 'Arsenal Cannon FC',
    clubB_name: 'Tottenham Cockerels FC',
    tier: 'titre'
  },
  {
    id: 'pl-north-west',
    league: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)',
    rivalryName: '⚔️ THE NORTH WEST DERBY',
    rivalryTag: 'Les Deux Plus Grands Palmarès d\'Angleterre',
    clubA_name: 'Liverpool Port FC',
    clubB_name: 'Manchester Red Devils',
    tier: 'titre'
  },
  {
    id: 'pl-manchester',
    league: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)',
    rivalryName: '⚔️ MANCHESTER DERBY',
    rivalryTag: 'Red Devils vs Sky Blues • Suprématie Urbaine',
    clubA_name: 'Manchester Sky Blues FC',
    clubB_name: 'Manchester Red Devils',
    tier: 'titre'
  },
  {
    id: 'pl-london-clash',
    league: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)',
    rivalryName: '⚔️ LONDON SUPREMACY',
    rivalryTag: 'Blues vs Gunners • Prestige de la Capitale',
    clubA_name: 'London Blue Royals',
    clubB_name: 'Arsenal Cannon FC',
    tier: 'titre'
  },
  {
    id: 'pl-merseyside',
    league: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)',
    rivalryName: '⚔️ MERSEYSIDE DERBY',
    rivalryTag: 'Anfield vs Goodison • Duel Centenaire de Liverpool',
    clubA_name: 'Liverpool Port FC',
    clubB_name: 'Everton Toffees',
    tier: 'europe'
  },
  {
    id: 'pl-challengers',
    league: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)',
    rivalryName: '⚔️ BATTLE OF THE NEW POWER',
    rivalryTag: 'Magpies vs Villans • Ambition Européenne',
    clubA_name: 'Newcastle Magpies FC',
    clubB_name: 'Aston Birmingham FC',
    tier: 'titre'
  },
  {
    id: 'pl-london-mid',
    league: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)',
    rivalryName: '⚔️ LONDON UNDERGROUND DERBY',
    rivalryTag: 'Hammers de l\'Est vs Eagles du Sud',
    clubA_name: 'West Ham Hammers',
    clubB_name: 'Crystal Palace',
    tier: 'europe'
  },
  {
    id: 'pl-dogfight',
    league: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)',
    rivalryName: '⚔️ RELEGATION DOGFIGHT',
    rivalryTag: 'Bataille Féroce dans la Boue Anglaise',
    clubA_name: 'Luton Brick Miners',
    clubB_name: 'Burnley Turf',
    tier: 'maintien'
  },
  {
    id: 'pl-steel-saints',
    league: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)',
    rivalryName: '⚔️ DUEL DE FER DES OUTSIDERS',
    rivalryTag: 'Acier de Sheffield vs Saints du Sud',
    clubA_name: 'Sheffield Steel',
    clubB_name: 'Southampton Saints',
    tier: 'maintien'
  },

  // ==========================================
  // 🇪🇸 LA LIGA (ESPAGNE)
  // ==========================================
  {
    id: 'liga-clasico',
    league: '🇪🇸 La Liga (Espagne)',
    rivalryName: '⚔️ EL CLÁSICO',
    rivalryTag: 'Le Plus Grand Choc de la Planète Football',
    clubA_name: 'Galaxia Madrid FC',
    clubB_name: 'Barca Catalunya FC',
    tier: 'titre'
  },
  {
    id: 'liga-madrid',
    league: '🇪🇸 La Liga (Espagne)',
    rivalryName: '⚔️ DERBI MADRILEÑO',
    rivalryTag: 'Galactiques vs Colchoneros • Ferveur Capitale',
    clubA_name: 'Galaxia Madrid FC',
    clubB_name: 'Madrid Colchoneros FC',
    tier: 'titre'
  },
  {
    id: 'liga-seville',
    league: '🇪🇸 La Liga (Espagne)',
    rivalryName: '⚔️ EL GRAN DERBI',
    rivalryTag: 'Séville Nervión vs Real Bétis • Fournaise Andalouse',
    clubA_name: 'Sevilla Nervion',
    clubB_name: 'Real Betis',
    tier: 'europe'
  },
  {
    id: 'liga-vasco',
    league: '🇪🇸 La Liga (Espagne)',
    rivalryName: '⚔️ DERBI VASCO',
    rivalryTag: 'Lions de Bilbao vs Txuri-Urdin • Fierté Basque',
    clubA_name: 'Athletic Bilbao',
    clubB_name: 'Real Sociedad',
    tier: 'europe'
  },
  {
    id: 'liga-valencia',
    league: '🇪🇸 La Liga (Espagne)',
    rivalryName: '⚔️ DERBI DE LA COMUNITAT',
    rivalryTag: 'Murciélagos de Valence vs Sous-Marin Jaune',
    clubA_name: 'Valencia Che',
    clubB_name: 'Villarreal Amarillo',
    tier: 'europe'
  },
  {
    id: 'liga-derbi-barcelona',
    league: '🇪🇸 La Liga (Espagne)',
    rivalryName: '⚔️ DERBI BARCELONÍ',
    rivalryTag: 'Blaugranas vs Pericos • Conflit Catalan',
    clubA_name: 'Barca Catalunya FC',
    clubB_name: 'Espanyol Pericos',
    tier: 'europe'
  },
  {
    id: 'liga-maintien-andalou',
    league: '🇪🇸 La Liga (Espagne)',
    rivalryName: '⚔️ BATAILLE ANDALOUSE DU MAINTIEN',
    rivalryTag: 'Pirates de Cadix vs Indálicos d\'Almería',
    clubA_name: 'Cadiz Piratas',
    clubB_name: 'Almeria Indalicos',
    tier: 'maintien'
  },
  {
    id: 'liga-madrid-banlieue',
    league: '🇪🇸 La Liga (Espagne)',
    rivalryName: '⚔️ DERBI DE LA BANLIEUE DE MADRID',
    rivalryTag: 'Franjirrojos de Vallecas vs Azulones de Getafe',
    clubA_name: 'Rayo Vallecano',
    clubB_name: 'Getafe Azulones',
    tier: 'maintien'
  },

  // ==========================================
  // 🇮🇹 SERIE A (ITALIE)
  // ==========================================
  {
    id: 'sa-madonnina',
    league: '🇮🇹 Serie A (Italie)',
    rivalryName: '⚔️ DERBY DELLA MADONNINA',
    rivalryTag: 'Nerazzurri vs Rossoneri • San Siro Divisé en Deux',
    clubA_name: 'Inter Milano Nero FC',
    clubB_name: 'AC Rossoneri Milan FC',
    tier: 'titre'
  },
  {
    id: 'sa-ditalia',
    league: '🇮🇹 Serie A (Italie)',
    rivalryName: '⚔️ DERBY D\'ITALIA',
    rivalryTag: 'Vieille Dame vs Inter • Rivalité Éternelle',
    clubA_name: 'Juventus Piemonte FC',
    clubB_name: 'Inter Milano Nero FC',
    tier: 'titre'
  },
  {
    id: 'sa-sole',
    league: '🇮🇹 Serie A (Italie)',
    rivalryName: '⚔️ DERBY DEL SOLE & PASSION',
    rivalryTag: 'Naples Volcanique vs Piémont Impérial',
    clubA_name: 'Napoli Partenopei FC',
    clubB_name: 'Juventus Piemonte FC',
    tier: 'titre'
  },
  {
    id: 'sa-capitale-alt',
    league: '🇮🇹 Serie A (Italie)',
    rivalryName: '⚔️ DERBY DES AMBITIEUX',
    rivalryTag: 'Aigles Romains vs Viola de Florence',
    clubA_name: 'Lazio Aquile Roma',
    clubB_name: 'Fiorentina Viola',
    tier: 'europe'
  },
  {
    id: 'sa-mole',
    league: '🇮🇹 Serie A (Italie)',
    rivalryName: '⚔️ DERBY DELLA MOLE',
    rivalryTag: 'Juventus vs Torino • Le Duel de Turin',
    clubA_name: 'Juventus Piemonte FC',
    clubB_name: 'Torino Granata',
    tier: 'europe'
  },
  {
    id: 'sa-nord-tactique',
    league: '🇮🇹 Serie A (Italie)',
    rivalryName: '⚔️ DUEL TACTIQUE DU NORD',
    rivalryTag: 'Dea de Bergame vs Rossoblù de Bologne',
    clubA_name: 'Atalanta Bergamo',
    clubB_name: 'Bologna Rossoblu',
    tier: 'europe'
  },
  {
    id: 'sa-survie-sud',
    league: '🇮🇹 Serie A (Italie)',
    rivalryName: '⚔️ BATAILLE CALCIO DE SURVIE',
    rivalryTag: 'Arechi en Flammes vs Salentini de Lecce',
    clubA_name: 'Salernitana Granata',
    clubB_name: 'Lecce Salentini',
    tier: 'maintien'
  },
  {
    id: 'sa-empoli-cagliari',
    league: '🇮🇹 Serie A (Italie)',
    rivalryName: '⚔️ COMBAT POUR LA SERIE A',
    rivalryTag: 'Azzurri Toscans vs Guerriers de Sardaigne',
    clubA_name: 'Empoli Azzurri',
    clubB_name: 'Cagliari Sardaigne',
    tier: 'maintien'
  },

  // ==========================================
  // 🇩🇪 BUNDESLIGA (ALLEMAGNE)
  // ==========================================
  {
    id: 'bl-klassiker',
    league: '🇩🇪 Bundesliga (Allemagne)',
    rivalryName: '⚔️ DER KLASSIKER',
    rivalryTag: 'Géant Bavarois vs Mur Jaune de Dortmund',
    clubA_name: 'Bayern Münchenberg',
    clubB_name: 'Dortmund Gelbe Wand FC',
    tier: 'titre'
  },
  {
    id: 'bl-moderne',
    league: '🇩🇪 Bundesliga (Allemagne)',
    rivalryName: '⚔️ CHOC MODERNE POUR LE TITRE',
    rivalryTag: 'Ogre de Munich vs Werkself Invincible',
    clubA_name: 'Bayern Münchenberg',
    clubB_name: 'Bayer Leverkusen FC',
    tier: 'titre'
  },
  {
    id: 'bl-bvb-rb',
    league: '🇩🇪 Bundesliga (Allemagne)',
    rivalryName: '⚔️ DUEL DE HAUTE INTENSITÉ',
    rivalryTag: 'Tradition BVB vs Taureaux Rouges de Leipzig',
    clubA_name: 'Dortmund Gelbe Wand FC',
    clubB_name: 'Leipzig Red Bullen FC',
    tier: 'titre'
  },
  {
    id: 'bl-sud-ouest',
    league: '🇩🇪 Bundesliga (Allemagne)',
    rivalryName: '⚔️ DERBY DU SUD-OUEST',
    rivalryTag: 'Schwaben de Stuttgart vs Aigles de Francfort',
    clubA_name: 'Stuttgart Schwaben',
    clubB_name: 'Eintracht Frankfurt',
    tier: 'europe'
  },
  {
    id: 'bl-culte-ruhr',
    league: '🇩🇪 Bundesliga (Allemagne)',
    rivalryName: '⚔️ CHOC CULTE & POPULAIRE',
    rivalryTag: 'Pirates de St Pauli vs Combattants de la Ruhr',
    clubA_name: 'St Pauli Piraten',
    clubB_name: 'Bochum Ruhr',
    tier: 'maintien'
  },

  // ==========================================
  // 🇵🇹 LIGA PORTUGAL
  // ==========================================
  {
    id: 'pt-classico',
    league: '🇵🇹 Liga Portugal',
    rivalryName: '⚔️ O CLÁSSICO',
    rivalryTag: 'Dragons de Porto vs Aigles de Lisbonne • Haine Brûlante',
    clubA_name: 'Porto Dragons FC',
    clubB_name: 'Lisboa Eagles FC',
    tier: 'titre'
  },
  {
    id: 'pt-lisboa',
    league: '🇵🇹 Liga Portugal',
    rivalryName: '⚔️ DÉRBI DA CAPITAL',
    rivalryTag: 'Aigles de Benfica vs Lions du Sporting • Duel Lisboète',
    clubA_name: 'Lisboa Eagles FC',
    clubB_name: 'Sporting Lions FC',
    tier: 'titre'
  },

  // ==========================================
  // 🇳🇱 EREDIVISIE (PAYS-BAS)
  // ==========================================
  {
    id: 'nl-klassieker',
    league: '🇳🇱 Eredivisie (Pays-Bas)',
    rivalryName: '⚔️ DE KLASSIEKER',
    rivalryTag: 'Artistes d\'Amsterdam vs Ouvriers du Port de Rotterdam',
    clubA_name: 'Amsterdam Sons FC',
    clubB_name: 'Feyenoord Port FC',
    tier: 'titre'
  },

  // ==========================================
  // 🇹🇷 SÜPER LIG (TURQUIE)
  // ==========================================
  {
    id: 'tr-intercontinental',
    league: '🇹🇷 Süper Lig (Turquie)',
    rivalryName: '⚔️ KITALARARASI DERBİ (INTERCONTINENTAL)',
    rivalryTag: 'Europe vs Asie • Ferveur & Enfers d\'Istanbul',
    clubA_name: 'Galatasaray Lions FC',
    clubB_name: 'Fenerbahce Bosphore FC',
    tier: 'titre'
  },

  // ==========================================
  // 🏴󠁧󠁢󠁳󠁣󠁴󠁿 SCOTTISH PREMIERSHIP (ÉCOSSE)
  // ==========================================
  {
    id: 'sc-old-firm',
    league: '🏴󠁧󠁢󠁳󠁣󠁴󠁿 Premiership (Écosse)',
    rivalryName: '⚔️ THE OLD FIRM',
    rivalryTag: 'Celtic Vert & Blanc vs Rangers Bleu Royal • Guerre Centenaire',
    clubA_name: 'Celtic Glasgow FC',
    clubB_name: 'Glasgow Blue Rangers FC',
    tier: 'titre'
  },

  // ==========================================
  // 🇦🇷 PRIMERA DIVISIÓN (ARGENTINE)
  // ==========================================
  {
    id: 'ar-superclasico',
    league: '🇦🇷 Primera División (Argentine)',
    rivalryName: '⚔️ EL SUPERCLÁSICO ARGENTINO',
    rivalryTag: 'La Bombonera de Boca vs Le Monumental de River • Passion Pure',
    clubA_name: 'Buenos Aires Boca Xeneizes',
    clubB_name: 'Buenos Aires River Millonarios',
    tier: 'titre'
  },

  // ==========================================
  // 🇧🇷 BRASILEIRÃO (BRÉSIL)
  // ==========================================
  {
    id: 'br-classico',
    league: '🇧🇷 Brasileirão (Brésil)',
    rivalryName: '⚔️ O CLÁSSICO DO POVO',
    rivalryTag: 'Tricolor de São Paulo vs Nação Mengão de Rio • Samba & Fierté',
    clubA_name: 'Sao Paulo Tricolor FC',
    clubB_name: 'Rio Mengão FC',
    tier: 'titre'
  },

  // ==========================================
  // 🇸🇦 SAUDI PRO LEAGUE
  // ==========================================
  {
    id: 'sa-riyadh-derby',
    league: '🇸🇦 Saudi Pro League',
    rivalryName: '⚔️ THE RIYADH DERBY',
    rivalryTag: 'Gold Stars vs Blue Crescent • La Suprématie de Riyad',
    clubA_name: 'Riyadh Gold Stars FC',
    clubB_name: 'Riyadh Blue Crescent FC',
    tier: 'titre'
  },

  // ==========================================
  // 🇺🇸 MAJOR LEAGUE SOCCER
  // ==========================================
  {
    id: 'us-mls-showcase',
    league: '🇺🇸 Major League Soccer',
    rivalryName: '⚔️ COAST TO COAST SHOWCASE',
    rivalryTag: 'Flamingo de Miami vs Hollywood Angels de Los Angeles',
    clubA_name: 'Miami Flamingo FC',
    clubB_name: 'Los Angeles Angels FC',
    tier: 'titre'
  }
];

if (typeof module !== 'undefined') {
  module.exports = { DUEL_RIVALRIES };
}
