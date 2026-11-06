// ==============================================================
// BASE DE DONNÉES COMPLÈTE : 116 CARRIÈRES ULTRA-DIVERSIFIÉES v7.2
// CONSIGNES DE COACH VARIÉES, FILIÈRES DE PROVENANCE & BUDGETS CALIBRÉS
// ==============================================================

const SCENARIOS = [
  {
    "id": 1,
    "difficulty": "facile",
    "club": "Galaxia Madrid FC",
    "country": "🇪🇸 La Liga (Espagne)",
    "logo": "",
    "budget": 184,
    "wages": 25,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_ATTAQUE",
        "name": "Polyvalent Buteur / Ailier",
        "icon": ""
      }
    ],
    "coachDemand": "\"Zéro touriste sur le pré ! Je veux du contre-pressing immédiat à la perte et des poumons d'acier. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent Buteur / Ailier. Objectif de conformité : intégrer au moins un joueur formé localement (quota national).\"",
    "expectedTraitsByPos": {
      "ATT": [
        "Tueur clinique",
        "Vitesse supersonique",
        "Renard des surfaces"
      ],
      "MIL": [
        "Vision laser",
        "Maestro du tempo",
        "Passeur laser"
      ]
    },
    "forbiddenTraits": [
      "Discret dans les grands matchs",
      "Fragilité mentale",
      "Profil brut non formé",
      "Allergique au repli"
    ],
    "objective": "Course au Titre & Qualification C1 (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent Buteur / Ailier.",
    "targetRank": 2,
    "league": "La Liga",
    "flag": "🇪🇸",
    "tacticalPhilosophy": " Domination & Standing",
    "tacticalTag": "Gegenpressing & Intensité",
    "preferredTraits": [
      "Sang-froid clinique",
      "Cadre international",
      "Tueur clinique",
      "Vision laser",
      "Patron aérien",
      "Infatigable"
    ],
    "targetAgeRule": "star",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 recrue du même pays",
      "ruleDesc": "Le coach tient à l'identité locale du club et exige au moins un renfort national."
    }
  },
  {
    "id": 2,
    "difficulty": "facile",
    "club": "Manchester Red Devils",
    "country": "󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)",
    "logo": "",
    "budget": 201,
    "wages": 30,
    "needs": [
      {
        "code": "DG",
        "name": "Latéral Gauche",
        "icon": ""
      },
      {
        "code": "MC",
        "name": "Milieu Relayeur (8)",
        "icon": ""
      },
      {
        "code": "AG",
        "name": "Ailier Gauche",
        "icon": ""
      }
    ],
    "coachDemand": "\"Un championnat se gagne par la défense. On cadenasse l'axe, on gagne les duels et on ne concède rien. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche. La direction sportive cible au moins un renfort issu du vivier sud-américain (CONMEBOL).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Roc défensif",
        "Tacleur féroce"
      ],
      "ATT": [
        "Vitesse supersonique",
        "Accélération foudroyante",
        "Dribbles chaloupés"
      ]
    },
    "forbiddenTraits": [
      "Déficit technique",
      "Jeu stéréotypé",
      "Tacleur boucher",
      "Relance hasardeuse"
    ],
    "objective": "Podium & Retour au Sommet (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche.",
    "targetRank": 2,
    "league": "Premier League",
    "flag": "󠁧󠁢󠁥󠁮󠁧󠁿",
    "tacticalPhilosophy": " Tiki-Taka & Maîtrise",
    "tacticalTag": "Catenaccio & Verrouillage",
    "preferredTraits": [
      "Vision laser",
      "Maestro créatif",
      "Relance propre",
      "Plaque tournante",
      "Dribbleur soyeux",
      "Discipline tactique"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "SOUTH_AMERICA",
      "name": "Réseau Amérique du Sud (CONMEBOL)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu du vivier sud-américain (Brésil, Argentine...)",
      "ruleDesc": "La cellule de détection cible en priorité les championnats sud-américains."
    }
  },
  {
    "id": 3,
    "difficulty": "facile",
    "club": "Paris Capitale SG",
    "country": "🇫🇷 Ligue 1 (France)",
    "logo": "",
    "budget": 195,
    "wages": 28,
    "needs": [
      {
        "code": "DD",
        "name": "Latéral Droit",
        "icon": ""
      },
      {
        "code": "MDF",
        "name": "Sentinelle (6)",
        "icon": ""
      },
      {
        "code": "PEPITE_U21",
        "name": "Pépite U21 (-21 ans)",
        "icon": ""
      }
    ],
    "coachDemand": "\"On attend le bon moment pour piquer à 200 km/h. Il me faut de la dynamite dans les couloirs et de la verticalité. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans). La cellule de scouting recommande d'activer notre filière de recrutement sur les championnats africains.\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Vision laser",
        "Passeur laser",
        "Maestro du tempo"
      ],
      "DEF": [
        "Infatigable",
        "Relance propre",
        "Centres millimétrés"
      ]
    },
    "forbiddenTraits": [
      "Vétéran déclinant",
      "Lent au démarrage",
      "Mauvaise hygiène de vie"
    ],
    "objective": "Sacre National & Finale Européenne (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans).",
    "targetRank": 2,
    "league": "Ligue 1",
    "flag": "🇫🇷",
    "tacticalPhilosophy": " Projet Trading & Jeunesse",
    "tacticalTag": "Transition Éclair & Contre-Attaque",
    "preferredTraits": [
      "Pépite U21",
      "Ailier supersonique",
      "Dribbleur déroutant",
      "Finition chirurgicale",
      "Vitesse supersonique"
    ],
    "targetAgeRule": "u21",
    "originConstraint": {
      "code": "AFRICA",
      "name": "Réseau Afrique (Partenariats CAF)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des académies ou sélections africaines",
      "ruleDesc": "Priorité accordée aux partenariats de scouting établis sur le continent africain."
    }
  },
  {
    "id": 4,
    "difficulty": "facile",
    "club": "Bayern Münchenberg",
    "country": "🇩🇪 Bundesliga (Allemagne)",
    "logo": "",
    "budget": 161,
    "wages": 22,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "MO",
        "name": "Meneur de Jeu (10)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Le ballon est notre meilleur allié. Ceux qui balancent des chandelles vont sur le banc, je veux de la vista et de la finesse. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9). Expérience requise au sein des championnats majeurs européens pour une adaptation immédiate.\"",
    "expectedTraitsByPos": {
      "ATT": [
        "Pivot solide",
        "Force brute",
        "Sens du but",
        "Tueur clinique"
      ],
      "GAR": [
        "Jeu au pied moderne",
        "Arrêts miracles",
        "Calme olympien"
      ]
    },
    "forbiddenTraits": [
      "Discret dans les grands matchs",
      "Fragilité mentale",
      "Profil brut non formé"
    ],
    "objective": "Course au Titre & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9).",
    "targetRank": 2,
    "league": "Bundesliga",
    "flag": "🇩🇪",
    "tacticalPhilosophy": " Domination & Standing",
    "tacticalTag": "Tiki-Taka & Jeu de Position",
    "preferredTraits": [
      "Sang-froid clinique",
      "Cadre international",
      "Tueur clinique",
      "Vision laser",
      "Patron aérien"
    ],
    "targetAgeRule": "star",
    "originConstraint": {
      "code": "EURO_TACTICAL",
      "name": "Filière Championnats Majeurs (UEFA)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur formé ou aguerri dans les grands championnats européens",
      "ruleDesc": "Le coach privilégie la rigueur tactique, le placement et la lecture de jeu européenne."
    }
  },
  {
    "id": 5,
    "difficulty": "facile",
    "club": "London Blue Royals",
    "country": "󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)",
    "logo": "",
    "budget": 178,
    "wages": 26,
    "needs": [
      {
        "code": "GAR",
        "name": "Gardien de But",
        "icon": ""
      },
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "AD",
        "name": "Ailier Droit",
        "icon": ""
      }
    ],
    "coachDemand": "\"Ici on joue avec les tripes. Je refuse catégoriquement les divas et les égos surdimensionnés. Nos 3 besoins prioritaires à pourvoir avant minuit : Gardien de But, Défenseur Central, Ailier Droit. Priorité à un profil athlétique et rigoureux issu des championnats nordiques ou d'Europe de l'Est.\"",
    "expectedTraitsByPos": {
      "GAR": [
        "Réflexes félins",
        "Arrêts miracles",
        "Mains de fer"
      ],
      "DEF": [
        "Impact physique",
        "Tacleur féroce",
        "Guerrier"
      ]
    },
    "forbiddenTraits": [
      "Déficit technique",
      "Jeu stéréotypé",
      "Tacleur boucher",
      "Égo surdimensionné"
    ],
    "objective": "Top 2 et Finale Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Gardien de But, Défenseur Central, Ailier Droit.",
    "targetRank": 2,
    "league": "Premier League",
    "flag": "󠁧󠁢󠁥󠁮󠁧󠁿",
    "tacticalPhilosophy": " Tiki-Taka & Maîtrise",
    "tacticalTag": "Meneur d'Hommes & Sang Chaud",
    "preferredTraits": [
      "Vision laser",
      "Maestro créatif",
      "Relance propre",
      "Plaque tournante",
      "Dribbleur soyeux",
      "Leader vocal"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "NORDIC_EAST",
      "name": "Réseau Europe du Nord & de l'Est",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des ligues nordiques ou d'Europe de l'Est",
      "ruleDesc": "Détection active sur les championnats scandinaves et d'Europe centrale/orientale."
    }
  },
  {
    "id": 6,
    "difficulty": "facile",
    "club": "Juventus Piemonte FC",
    "country": "🇮🇹 Serie A (Italie)",
    "logo": "",
    "budget": 140,
    "wages": 15,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_PISTON_AILIER",
        "name": "Piston / Ailier",
        "icon": ""
      }
    ],
    "coachDemand": "\"Place à l'audace ! Je préfère un jeune mort de faim qu'un nom ronflant en préretraite. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Piston / Ailier. Objectif de conformité : intégrer au moins un joueur formé localement (quota national).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Roc défensif",
        "Tacleur féroce"
      ],
      "ATT": [
        "Vitesse supersonique",
        "Accélération foudroyante",
        "Dribbles chaloupés"
      ]
    },
    "forbiddenTraits": [
      "Vétéran déclinant",
      "Lent au démarrage",
      "Mauvaise hygiène de vie",
      "Vétéran cramé"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Piston / Ailier.",
    "targetRank": 2,
    "league": "Serie A",
    "flag": "🇮🇹",
    "tacticalPhilosophy": " Projet Trading & Jeunesse",
    "tacticalTag": "Pari Jeunesse & Pépites",
    "preferredTraits": [
      "Pépite U21",
      "Ailier supersonique",
      "Dribbleur déroutant",
      "Finition chirurgicale",
      "Jeune prodige"
    ],
    "targetAgeRule": "u21",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 recrue du même pays",
      "ruleDesc": "Le coach tient à l'identité locale du club et exige au moins un renfort national."
    }
  },
  {
    "id": 7,
    "difficulty": "facile",
    "club": "Barca Catalunya FC",
    "country": "🇪🇸 La Liga (Espagne)",
    "logo": "",
    "budget": 140,
    "wages": 18,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_10_AILIER",
        "name": "Polyvalent 10 & Ailier",
        "icon": ""
      }
    ],
    "coachDemand": "\"Chaque match est une bataille tactique pour assurer notre maintien. Il me faut des joueurs avec un gros volume de jeu et une vraie solidité dans les duels. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent 10 & Ailier. Objectif de conformité : intégrer au moins un joueur formé localement (quota national).\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Infatigable",
        "Poumons d'acier",
        "Guerrier"
      ],
      "ATT": [
        "Renard des surfaces",
        "Sens du but",
        "Tueur clinique"
      ]
    },
    "forbiddenTraits": [
      "Discret dans les grands matchs",
      "Fragilité mentale",
      "Profil brut non formé"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent 10 & Ailier.",
    "targetRank": 2,
    "league": "La Liga",
    "flag": "🇪🇸",
    "tacticalPhilosophy": " Domination & Standing",
    "tacticalTag": "Pragmatisme du Maintien",
    "preferredTraits": [
      "Sang-froid clinique",
      "Cadre international",
      "Tueur clinique",
      "Vision laser",
      "Patron aérien",
      "Impact physique"
    ],
    "targetAgeRule": "star",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 recrue du même pays",
      "ruleDesc": "Le coach tient à l'identité locale du club et exige au moins un renfort national."
    }
  },
  {
    "id": 8,
    "difficulty": "facile",
    "club": "Liverpool Port FC",
    "country": "󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)",
    "logo": "",
    "budget": 144,
    "wages": 21,
    "needs": [
      {
        "code": "DG",
        "name": "Latéral Gauche",
        "icon": ""
      },
      {
        "code": "MC",
        "name": "Milieu Relayeur (8)",
        "icon": ""
      },
      {
        "code": "AG",
        "name": "Ailier Gauche",
        "icon": ""
      }
    ],
    "coachDemand": "\"Je préfère gagner 4-3 que 1-0. Apportez-moi de la percussion, du culot et des frappes chirurgicales. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche. La direction sportive cible au moins un renfort issu du vivier sud-américain (CONMEBOL).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Tacleur féroce",
        "Impact physique",
        "Roc défensif"
      ],
      "MIL": [
        "Vision laser",
        "Maestro du tempo",
        "Passeur laser"
      ]
    },
    "forbiddenTraits": [
      "Déficit technique",
      "Jeu stéréotypé",
      "Tacleur boucher",
      "Capricieux sous pression"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche.",
    "targetRank": 2,
    "league": "Premier League",
    "flag": "󠁧󠁢󠁥󠁮󠁧󠁿",
    "tacticalPhilosophy": " Tiki-Taka & Maîtrise",
    "tacticalTag": "Folie Offensive Champagne",
    "preferredTraits": [
      "Vision laser",
      "Maestro créatif",
      "Relance propre",
      "Plaque tournante",
      "Dribbleur soyeux",
      "Tueur clinique"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "SOUTH_AMERICA",
      "name": "Réseau Amérique du Sud (CONMEBOL)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu du vivier sud-américain (Brésil, Argentine...)",
      "ruleDesc": "La cellule de détection cible en priorité les championnats sud-américains."
    }
  },
  {
    "id": 9,
    "difficulty": "facile",
    "club": "Manchester Sky Blues FC",
    "country": "󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)",
    "logo": "",
    "budget": 161,
    "wages": 24,
    "needs": [
      {
        "code": "DD",
        "name": "Latéral Droit",
        "icon": ""
      },
      {
        "code": "MDF",
        "name": "Sentinelle (6)",
        "icon": ""
      },
      {
        "code": "PEPITE_U21",
        "name": "Pépite U21 (-21 ans)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Zéro touriste sur le pré ! Je veux du contre-pressing immédiat à la perte et des poumons d'acier. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans). La cellule de scouting recommande d'activer notre filière de recrutement sur les championnats africains.\"",
    "expectedTraitsByPos": {
      "GAR": [
        "Arrêts miracles",
        "Réflexes félins",
        "Mains de fer"
      ],
      "ATT": [
        "Tueur clinique",
        "Sens du but",
        "Renard des surfaces"
      ]
    },
    "forbiddenTraits": [
      "Vétéran déclinant",
      "Lent au démarrage",
      "Mauvaise hygiène de vie",
      "Allergique au repli"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans).",
    "targetRank": 2,
    "league": "Premier League",
    "flag": "󠁧󠁢󠁥󠁮󠁧󠁿",
    "tacticalPhilosophy": " Projet Trading & Jeunesse",
    "tacticalTag": "Gegenpressing & Intensité",
    "preferredTraits": [
      "Pépite U21",
      "Ailier supersonique",
      "Dribbleur déroutant",
      "Finition chirurgicale",
      "Infatigable"
    ],
    "targetAgeRule": "u21",
    "originConstraint": {
      "code": "AFRICA",
      "name": "Réseau Afrique (Partenariats CAF)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des académies ou sélections africaines",
      "ruleDesc": "Priorité accordée aux partenariats de scouting établis sur le continent africain."
    }
  },
  {
    "id": 10,
    "difficulty": "facile",
    "club": "Inter Milano Nero FC",
    "country": "🇮🇹 Serie A (Italie)",
    "logo": "",
    "budget": 178,
    "wages": 15,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "MO",
        "name": "Meneur de Jeu (10)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Un championnat se gagne par la défense. On cadenasse l'axe, on gagne les duels et on ne concède rien. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9). Expérience requise au sein des championnats majeurs européens pour une adaptation immédiate.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Roc défensif",
        "Tacleur féroce"
      ],
      "ATT": [
        "Vitesse supersonique",
        "Accélération foudroyante",
        "Dribbles chaloupés"
      ]
    },
    "forbiddenTraits": [
      "Discret dans les grands matchs",
      "Fragilité mentale",
      "Profil brut non formé",
      "Relance hasardeuse"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9).",
    "targetRank": 2,
    "league": "Serie A",
    "flag": "🇮🇹",
    "tacticalPhilosophy": " Domination & Standing",
    "tacticalTag": "Catenaccio & Verrouillage",
    "preferredTraits": [
      "Sang-froid clinique",
      "Cadre international",
      "Tueur clinique",
      "Vision laser",
      "Patron aérien",
      "Discipline tactique"
    ],
    "targetAgeRule": "star",
    "originConstraint": {
      "code": "EURO_TACTICAL",
      "name": "Filière Championnats Majeurs (UEFA)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur formé ou aguerri dans les grands championnats européens",
      "ruleDesc": "Le coach privilégie la rigueur tactique, le placement et la lecture de jeu européenne."
    }
  },
  {
    "id": 11,
    "difficulty": "facile",
    "club": "Arsenal Cannon FC",
    "country": "󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)",
    "logo": "",
    "budget": 195,
    "wages": 18,
    "needs": [
      {
        "code": "GAR",
        "name": "Gardien de But",
        "icon": ""
      },
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "AD",
        "name": "Ailier Droit",
        "icon": ""
      }
    ],
    "coachDemand": "\"On attend le bon moment pour piquer à 200 km/h. Il me faut de la dynamite dans les couloirs et de la verticalité. Nos 3 besoins prioritaires à pourvoir avant minuit : Gardien de But, Défenseur Central, Ailier Droit. Priorité à un profil athlétique et rigoureux issu des championnats nordiques ou d'Europe de l'Est.\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Infatigable",
        "Poumons d'acier",
        "Guerrier"
      ],
      "ATT": [
        "Renard des surfaces",
        "Sens du but",
        "Tueur clinique"
      ]
    },
    "forbiddenTraits": [
      "Déficit technique",
      "Jeu stéréotypé",
      "Tacleur boucher",
      "Lent au démarrage"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Gardien de But, Défenseur Central, Ailier Droit.",
    "targetRank": 2,
    "league": "Premier League",
    "flag": "󠁧󠁢󠁥󠁮󠁧󠁿",
    "tacticalPhilosophy": " Tiki-Taka & Maîtrise",
    "tacticalTag": "Transition Éclair & Contre-Attaque",
    "preferredTraits": [
      "Vision laser",
      "Maestro créatif",
      "Relance propre",
      "Plaque tournante",
      "Dribbleur soyeux",
      "Vitesse supersonique"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "NORDIC_EAST",
      "name": "Réseau Europe du Nord & de l'Est",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des ligues nordiques ou d'Europe de l'Est",
      "ruleDesc": "Détection active sur les championnats scandinaves et d'Europe centrale/orientale."
    }
  },
  {
    "id": 12,
    "difficulty": "facile",
    "club": "Lisboa Eagles FC",
    "country": "🇵🇹 Liga Portugal",
    "logo": "",
    "budget": 140,
    "wages": 21,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_8_10",
        "name": "Polyvalent 8 & 10",
        "icon": ""
      }
    ],
    "coachDemand": "\"Le ballon est notre meilleur allié. Ceux qui balancent des chandelles vont sur le banc, je veux de la vista et de la finesse. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent 8 & 10. Objectif de conformité : intégrer au moins un joueur formé localement (quota national).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Tacleur féroce",
        "Impact physique",
        "Roc défensif"
      ],
      "MIL": [
        "Vision laser",
        "Maestro du tempo",
        "Passeur laser"
      ]
    },
    "forbiddenTraits": [
      "Vétéran déclinant",
      "Lent au démarrage",
      "Mauvaise hygiène de vie",
      "Profil brut non formé"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent 8 & 10.",
    "targetRank": 2,
    "league": "Liga Portugal",
    "flag": "🇵🇹",
    "tacticalPhilosophy": " Projet Trading & Jeunesse",
    "tacticalTag": "Tiki-Taka & Jeu de Position",
    "preferredTraits": [
      "Pépite U21",
      "Ailier supersonique",
      "Dribbleur déroutant",
      "Finition chirurgicale",
      "Vision laser"
    ],
    "targetAgeRule": "u21",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 recrue du même pays",
      "ruleDesc": "Le coach tient à l'identité locale du club et exige au moins un renfort national."
    }
  },
  {
    "id": 13,
    "difficulty": "facile",
    "club": "Amsterdam Sons FC",
    "country": "🇳🇱 Eredivisie (Pays-Bas)",
    "logo": "",
    "budget": 140,
    "wages": 24,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_ATTAQUE",
        "name": "Polyvalent Buteur / Ailier",
        "icon": ""
      }
    ],
    "coachDemand": "\"Ici on joue avec les tripes. Je refuse catégoriquement les divas et les égos surdimensionnés. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent Buteur / Ailier. Objectif de conformité : intégrer au moins un joueur formé localement (quota national).\"",
    "expectedTraitsByPos": {
      "GAR": [
        "Arrêts miracles",
        "Réflexes félins",
        "Mains de fer"
      ],
      "ATT": [
        "Tueur clinique",
        "Sens du but",
        "Renard des surfaces"
      ]
    },
    "forbiddenTraits": [
      "Discret dans les grands matchs",
      "Fragilité mentale",
      "Profil brut non formé",
      "Égo surdimensionné"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent Buteur / Ailier.",
    "targetRank": 2,
    "league": "Eredivisie",
    "flag": "🇳🇱",
    "tacticalPhilosophy": " Domination & Standing",
    "tacticalTag": "Meneur d'Hommes & Sang Chaud",
    "preferredTraits": [
      "Sang-froid clinique",
      "Cadre international",
      "Tueur clinique",
      "Vision laser",
      "Patron aérien",
      "Leader vocal"
    ],
    "targetAgeRule": "star",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 recrue du même pays",
      "ruleDesc": "Le coach tient à l'identité locale du club et exige au moins un renfort national."
    }
  },
  {
    "id": 14,
    "difficulty": "facile",
    "club": "Riyadh Gold Stars FC",
    "country": "🇸🇦 Saudi Pro League",
    "logo": "",
    "budget": 144,
    "wages": 15,
    "needs": [
      {
        "code": "DG",
        "name": "Latéral Gauche",
        "icon": ""
      },
      {
        "code": "MC",
        "name": "Milieu Relayeur (8)",
        "icon": ""
      },
      {
        "code": "AG",
        "name": "Ailier Gauche",
        "icon": ""
      }
    ],
    "coachDemand": "\"Place à l'audace ! Je préfère un jeune mort de faim qu'un nom ronflant en préretraite. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche. La direction sportive cible au moins un renfort issu du vivier sud-américain (CONMEBOL).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Roc défensif",
        "Tacleur féroce"
      ],
      "ATT": [
        "Vitesse supersonique",
        "Accélération foudroyante",
        "Dribbles chaloupés"
      ]
    },
    "forbiddenTraits": [
      "Déficit technique",
      "Jeu stéréotypé",
      "Tacleur boucher",
      "Vétéran cramé"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche.",
    "targetRank": 2,
    "league": "Saudi Pro League",
    "flag": "🇸🇦",
    "tacticalPhilosophy": " Tiki-Taka & Maîtrise",
    "tacticalTag": "Pari Jeunesse & Pépites",
    "preferredTraits": [
      "Vision laser",
      "Maestro créatif",
      "Relance propre",
      "Plaque tournante",
      "Dribbleur soyeux",
      "Jeune prodige"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "SOUTH_AMERICA",
      "name": "Réseau Amérique du Sud (CONMEBOL)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu du vivier sud-américain (Brésil, Argentine...)",
      "ruleDesc": "La cellule de détection cible en priorité les championnats sud-américains."
    }
  },
  {
    "id": 15,
    "difficulty": "facile",
    "club": "Miami Flamingo FC",
    "country": "🇺🇸 Major League Soccer",
    "logo": "",
    "budget": 161,
    "wages": 18,
    "needs": [
      {
        "code": "DD",
        "name": "Latéral Droit",
        "icon": ""
      },
      {
        "code": "MDF",
        "name": "Sentinelle (6)",
        "icon": ""
      },
      {
        "code": "PEPITE_U21",
        "name": "Pépite U21 (-21 ans)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Chaque match est une bataille tactique pour assurer notre maintien. Il me faut des joueurs avec un gros volume de jeu et une vraie solidité dans les duels. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans). La cellule de scouting recommande d'activer notre filière de recrutement sur les championnats africains.\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Infatigable",
        "Poumons d'acier",
        "Guerrier"
      ],
      "ATT": [
        "Renard des surfaces",
        "Sens du but",
        "Tueur clinique"
      ]
    },
    "forbiddenTraits": [
      "Vétéran déclinant",
      "Lent au démarrage",
      "Mauvaise hygiène de vie",
      "Discret dans les grands matchs"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans).",
    "targetRank": 2,
    "league": "MLS",
    "flag": "🇺🇸",
    "tacticalPhilosophy": " Projet Trading & Jeunesse",
    "tacticalTag": "Pragmatisme du Maintien",
    "preferredTraits": [
      "Pépite U21",
      "Ailier supersonique",
      "Dribbleur déroutant",
      "Finition chirurgicale",
      "Impact physique"
    ],
    "targetAgeRule": "u21",
    "originConstraint": {
      "code": "AFRICA",
      "name": "Réseau Afrique (Partenariats CAF)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des académies ou sélections africaines",
      "ruleDesc": "Priorité accordée aux partenariats de scouting établis sur le continent africain."
    }
  },
  {
    "id": 16,
    "difficulty": "facile",
    "club": "Madrid Colchoneros FC",
    "country": "🇪🇸 La Liga (Espagne)",
    "logo": "",
    "budget": 178,
    "wages": 21,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "MO",
        "name": "Meneur de Jeu (10)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Je préfère gagner 4-3 que 1-0. Apportez-moi de la percussion, du culot et des frappes chirurgicales. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9). Expérience requise au sein des championnats majeurs européens pour une adaptation immédiate.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Tacleur féroce",
        "Impact physique",
        "Roc défensif"
      ],
      "MIL": [
        "Vision laser",
        "Maestro du tempo",
        "Passeur laser"
      ]
    },
    "forbiddenTraits": [
      "Discret dans les grands matchs",
      "Fragilité mentale",
      "Profil brut non formé",
      "Capricieux sous pression"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9).",
    "targetRank": 2,
    "league": "La Liga",
    "flag": "🇪🇸",
    "tacticalPhilosophy": " Domination & Standing",
    "tacticalTag": "Folie Offensive Champagne",
    "preferredTraits": [
      "Sang-froid clinique",
      "Cadre international",
      "Tueur clinique",
      "Vision laser",
      "Patron aérien"
    ],
    "targetAgeRule": "star",
    "originConstraint": {
      "code": "EURO_TACTICAL",
      "name": "Filière Championnats Majeurs (UEFA)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur formé ou aguerri dans les grands championnats européens",
      "ruleDesc": "Le coach privilégie la rigueur tactique, le placement et la lecture de jeu européenne."
    }
  },
  {
    "id": 17,
    "difficulty": "facile",
    "club": "Dortmund Gelbe Wand FC",
    "country": "🇩🇪 Bundesliga (Allemagne)",
    "logo": "",
    "budget": 195,
    "wages": 24,
    "needs": [
      {
        "code": "GAR",
        "name": "Gardien de But",
        "icon": ""
      },
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "AD",
        "name": "Ailier Droit",
        "icon": ""
      }
    ],
    "coachDemand": "\"Zéro touriste sur le pré ! Je veux du contre-pressing immédiat à la perte et des poumons d'acier. Nos 3 besoins prioritaires à pourvoir avant minuit : Gardien de But, Défenseur Central, Ailier Droit. Priorité à un profil athlétique et rigoureux issu des championnats nordiques ou d'Europe de l'Est.\"",
    "expectedTraitsByPos": {
      "GAR": [
        "Arrêts miracles",
        "Réflexes félins",
        "Mains de fer"
      ],
      "ATT": [
        "Tueur clinique",
        "Sens du but",
        "Renard des surfaces"
      ]
    },
    "forbiddenTraits": [
      "Déficit technique",
      "Jeu stéréotypé",
      "Tacleur boucher",
      "Allergique au repli"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Gardien de But, Défenseur Central, Ailier Droit.",
    "targetRank": 2,
    "league": "Bundesliga",
    "flag": "🇩🇪",
    "tacticalPhilosophy": " Tiki-Taka & Maîtrise",
    "tacticalTag": "Gegenpressing & Intensité",
    "preferredTraits": [
      "Vision laser",
      "Maestro créatif",
      "Relance propre",
      "Plaque tournante",
      "Dribbleur soyeux",
      "Infatigable"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "NORDIC_EAST",
      "name": "Réseau Europe du Nord & de l'Est",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des ligues nordiques ou d'Europe de l'Est",
      "ruleDesc": "Détection active sur les championnats scandinaves et d'Europe centrale/orientale."
    }
  },
  {
    "id": 18,
    "difficulty": "facile",
    "club": "Porto Dragons FC",
    "country": "🇵🇹 Liga Portugal",
    "logo": "",
    "budget": 140,
    "wages": 15,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_PISTON_AILIER",
        "name": "Piston / Ailier",
        "icon": ""
      }
    ],
    "coachDemand": "\"Un championnat se gagne par la défense. On cadenasse l'axe, on gagne les duels et on ne concède rien. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Piston / Ailier. Objectif de conformité : intégrer au moins un joueur formé localement (quota national).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Roc défensif",
        "Tacleur féroce"
      ],
      "ATT": [
        "Vitesse supersonique",
        "Accélération foudroyante",
        "Dribbles chaloupés"
      ]
    },
    "forbiddenTraits": [
      "Vétéran déclinant",
      "Lent au démarrage",
      "Mauvaise hygiène de vie",
      "Relance hasardeuse"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Piston / Ailier.",
    "targetRank": 2,
    "league": "Liga Portugal",
    "flag": "🇵🇹",
    "tacticalPhilosophy": " Projet Trading & Jeunesse",
    "tacticalTag": "Catenaccio & Verrouillage",
    "preferredTraits": [
      "Pépite U21",
      "Ailier supersonique",
      "Dribbleur déroutant",
      "Finition chirurgicale",
      "Discipline tactique"
    ],
    "targetAgeRule": "u21",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 recrue du même pays",
      "ruleDesc": "Le coach tient à l'identité locale du club et exige au moins un renfort national."
    }
  },
  {
    "id": 19,
    "difficulty": "facile",
    "club": "AC Rossoneri Milan FC",
    "country": "🇮🇹 Serie A (Italie)",
    "logo": "",
    "budget": 140,
    "wages": 18,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_10_AILIER",
        "name": "Polyvalent 10 & Ailier",
        "icon": ""
      }
    ],
    "coachDemand": "\"On attend le bon moment pour piquer à 200 km/h. Il me faut de la dynamite dans les couloirs et de la verticalité. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent 10 & Ailier. Objectif de conformité : intégrer au moins un joueur formé localement (quota national).\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Infatigable",
        "Poumons d'acier",
        "Guerrier"
      ],
      "ATT": [
        "Renard des surfaces",
        "Sens du but",
        "Tueur clinique"
      ]
    },
    "forbiddenTraits": [
      "Discret dans les grands matchs",
      "Fragilité mentale",
      "Profil brut non formé",
      "Lent au démarrage"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent 10 & Ailier.",
    "targetRank": 2,
    "league": "Serie A",
    "flag": "🇮🇹",
    "tacticalPhilosophy": " Domination & Standing",
    "tacticalTag": "Transition Éclair & Contre-Attaque",
    "preferredTraits": [
      "Sang-froid clinique",
      "Cadre international",
      "Tueur clinique",
      "Vision laser",
      "Patron aérien",
      "Vitesse supersonique"
    ],
    "targetAgeRule": "star",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 recrue du même pays",
      "ruleDesc": "Le coach tient à l'identité locale du club et exige au moins un renfort national."
    }
  },
  {
    "id": 20,
    "difficulty": "facile",
    "club": "Newcastle Magpies FC",
    "country": "󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)",
    "logo": "",
    "budget": 144,
    "wages": 21,
    "needs": [
      {
        "code": "DG",
        "name": "Latéral Gauche",
        "icon": ""
      },
      {
        "code": "MC",
        "name": "Milieu Relayeur (8)",
        "icon": ""
      },
      {
        "code": "AG",
        "name": "Ailier Gauche",
        "icon": ""
      }
    ],
    "coachDemand": "\"Le ballon est notre meilleur allié. Ceux qui balancent des chandelles vont sur le banc, je veux de la vista et de la finesse. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche. La direction sportive cible au moins un renfort issu du vivier sud-américain (CONMEBOL).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Tacleur féroce",
        "Impact physique",
        "Roc défensif"
      ],
      "MIL": [
        "Vision laser",
        "Maestro du tempo",
        "Passeur laser"
      ]
    },
    "forbiddenTraits": [
      "Déficit technique",
      "Jeu stéréotypé",
      "Tacleur boucher",
      "Profil brut non formé"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche.",
    "targetRank": 2,
    "league": "Premier League",
    "flag": "󠁧󠁢󠁥󠁮󠁧󠁿",
    "tacticalPhilosophy": " Tiki-Taka & Maîtrise",
    "tacticalTag": "Tiki-Taka & Jeu de Position",
    "preferredTraits": [
      "Vision laser",
      "Maestro créatif",
      "Relance propre",
      "Plaque tournante",
      "Dribbleur soyeux"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "SOUTH_AMERICA",
      "name": "Réseau Amérique du Sud (CONMEBOL)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu du vivier sud-américain (Brésil, Argentine...)",
      "ruleDesc": "La cellule de détection cible en priorité les championnats sud-américains."
    }
  },
  {
    "id": 21,
    "difficulty": "facile",
    "club": "Tottenham Cockerels FC",
    "country": "󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)",
    "logo": "",
    "budget": 161,
    "wages": 24,
    "needs": [
      {
        "code": "DD",
        "name": "Latéral Droit",
        "icon": ""
      },
      {
        "code": "MDF",
        "name": "Sentinelle (6)",
        "icon": ""
      },
      {
        "code": "PEPITE_U21",
        "name": "Pépite U21 (-21 ans)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Ici on joue avec les tripes. Je refuse catégoriquement les divas et les égos surdimensionnés. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans). La cellule de scouting recommande d'activer notre filière de recrutement sur les championnats africains.\"",
    "expectedTraitsByPos": {
      "GAR": [
        "Arrêts miracles",
        "Réflexes félins",
        "Mains de fer"
      ],
      "ATT": [
        "Tueur clinique",
        "Sens du but",
        "Renard des surfaces"
      ]
    },
    "forbiddenTraits": [
      "Vétéran déclinant",
      "Lent au démarrage",
      "Mauvaise hygiène de vie",
      "Égo surdimensionné"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans).",
    "targetRank": 2,
    "league": "Premier League",
    "flag": "󠁧󠁢󠁥󠁮󠁧󠁿",
    "tacticalPhilosophy": " Projet Trading & Jeunesse",
    "tacticalTag": "Meneur d'Hommes & Sang Chaud",
    "preferredTraits": [
      "Pépite U21",
      "Ailier supersonique",
      "Dribbleur déroutant",
      "Finition chirurgicale",
      "Leader vocal"
    ],
    "targetAgeRule": "u21",
    "originConstraint": {
      "code": "AFRICA",
      "name": "Réseau Afrique (Partenariats CAF)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des académies ou sélections africaines",
      "ruleDesc": "Priorité accordée aux partenariats de scouting établis sur le continent africain."
    }
  },
  {
    "id": 22,
    "difficulty": "facile",
    "club": "Napoli Partenopei FC",
    "country": "🇮🇹 Serie A (Italie)",
    "logo": "",
    "budget": 178,
    "wages": 15,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "MO",
        "name": "Meneur de Jeu (10)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Place à l'audace ! Je préfère un jeune mort de faim qu'un nom ronflant en préretraite. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9). Expérience requise au sein des championnats majeurs européens pour une adaptation immédiate.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Roc défensif",
        "Tacleur féroce"
      ],
      "ATT": [
        "Vitesse supersonique",
        "Accélération foudroyante",
        "Dribbles chaloupés"
      ]
    },
    "forbiddenTraits": [
      "Discret dans les grands matchs",
      "Fragilité mentale",
      "Profil brut non formé",
      "Vétéran cramé"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9).",
    "targetRank": 2,
    "league": "Serie A",
    "flag": "🇮🇹",
    "tacticalPhilosophy": " Domination & Standing",
    "tacticalTag": "Pari Jeunesse & Pépites",
    "preferredTraits": [
      "Sang-froid clinique",
      "Cadre international",
      "Tueur clinique",
      "Vision laser",
      "Patron aérien",
      "Jeune prodige"
    ],
    "targetAgeRule": "star",
    "originConstraint": {
      "code": "EURO_TACTICAL",
      "name": "Filière Championnats Majeurs (UEFA)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur formé ou aguerri dans les grands championnats européens",
      "ruleDesc": "Le coach privilégie la rigueur tactique, le placement et la lecture de jeu européenne."
    }
  },
  {
    "id": 23,
    "difficulty": "facile",
    "club": "Leipzig Red Bullen FC",
    "country": "🇩🇪 Bundesliga (Allemagne)",
    "logo": "",
    "budget": 195,
    "wages": 18,
    "needs": [
      {
        "code": "GAR",
        "name": "Gardien de But",
        "icon": ""
      },
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "AD",
        "name": "Ailier Droit",
        "icon": ""
      }
    ],
    "coachDemand": "\"Chaque match est une bataille tactique pour assurer notre maintien. Il me faut des joueurs avec un gros volume de jeu et une vraie solidité dans les duels. Nos 3 besoins prioritaires à pourvoir avant minuit : Gardien de But, Défenseur Central, Ailier Droit. Priorité à un profil athlétique et rigoureux issu des championnats nordiques ou d'Europe de l'Est.\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Infatigable",
        "Poumons d'acier",
        "Guerrier"
      ],
      "ATT": [
        "Renard des surfaces",
        "Sens du but",
        "Tueur clinique"
      ]
    },
    "forbiddenTraits": [
      "Déficit technique",
      "Jeu stéréotypé",
      "Tacleur boucher",
      "Discret dans les grands matchs"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Gardien de But, Défenseur Central, Ailier Droit.",
    "targetRank": 2,
    "league": "Bundesliga",
    "flag": "🇩🇪",
    "tacticalPhilosophy": " Tiki-Taka & Maîtrise",
    "tacticalTag": "Pragmatisme du Maintien",
    "preferredTraits": [
      "Vision laser",
      "Maestro créatif",
      "Relance propre",
      "Plaque tournante",
      "Dribbleur soyeux",
      "Impact physique"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "NORDIC_EAST",
      "name": "Réseau Europe du Nord & de l'Est",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des ligues nordiques ou d'Europe de l'Est",
      "ruleDesc": "Détection active sur les championnats scandinaves et d'Europe centrale/orientale."
    }
  },
  {
    "id": 24,
    "difficulty": "facile",
    "club": "Marseille Phocéens FC",
    "country": "🇫🇷 Ligue 1 (France)",
    "logo": "",
    "budget": 140,
    "wages": 21,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_8_10",
        "name": "Polyvalent 8 & 10",
        "icon": ""
      }
    ],
    "coachDemand": "\"Je préfère gagner 4-3 que 1-0. Apportez-moi de la percussion, du culot et des frappes chirurgicales. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent 8 & 10. Objectif de conformité : intégrer au moins un joueur formé localement (quota national).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Tacleur féroce",
        "Impact physique",
        "Roc défensif"
      ],
      "MIL": [
        "Vision laser",
        "Maestro du tempo",
        "Passeur laser"
      ]
    },
    "forbiddenTraits": [
      "Vétéran déclinant",
      "Lent au démarrage",
      "Mauvaise hygiène de vie",
      "Capricieux sous pression"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent 8 & 10.",
    "targetRank": 2,
    "league": "Ligue 1",
    "flag": "🇫🇷",
    "tacticalPhilosophy": " Projet Trading & Jeunesse",
    "tacticalTag": "Folie Offensive Champagne",
    "preferredTraits": [
      "Pépite U21",
      "Ailier supersonique",
      "Dribbleur déroutant",
      "Finition chirurgicale",
      "Tueur clinique"
    ],
    "targetAgeRule": "u21",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 recrue du même pays",
      "ruleDesc": "Le coach tient à l'identité locale du club et exige au moins un renfort national."
    }
  },
  {
    "id": 25,
    "difficulty": "facile",
    "club": "Bayer Leverkusen FC",
    "country": "🇩🇪 Bundesliga (Allemagne)",
    "logo": "",
    "budget": 140,
    "wages": 24,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_ATTAQUE",
        "name": "Polyvalent Buteur / Ailier",
        "icon": ""
      }
    ],
    "coachDemand": "\"Zéro touriste sur le pré ! Je veux du contre-pressing immédiat à la perte et des poumons d'acier. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent Buteur / Ailier. Objectif de conformité : intégrer au moins un joueur formé localement (quota national).\"",
    "expectedTraitsByPos": {
      "GAR": [
        "Arrêts miracles",
        "Réflexes félins",
        "Mains de fer"
      ],
      "ATT": [
        "Tueur clinique",
        "Sens du but",
        "Renard des surfaces"
      ]
    },
    "forbiddenTraits": [
      "Discret dans les grands matchs",
      "Fragilité mentale",
      "Profil brut non formé",
      "Allergique au repli"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent Buteur / Ailier.",
    "targetRank": 2,
    "league": "Bundesliga",
    "flag": "🇩🇪",
    "tacticalPhilosophy": " Domination & Standing",
    "tacticalTag": "Gegenpressing & Intensité",
    "preferredTraits": [
      "Sang-froid clinique",
      "Cadre international",
      "Tueur clinique",
      "Vision laser",
      "Patron aérien",
      "Infatigable"
    ],
    "targetAgeRule": "star",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 recrue du même pays",
      "ruleDesc": "Le coach tient à l'identité locale du club et exige au moins un renfort national."
    }
  },
  {
    "id": 26,
    "difficulty": "facile",
    "club": "Aston Birmingham FC",
    "country": "󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)",
    "logo": "",
    "budget": 144,
    "wages": 15,
    "needs": [
      {
        "code": "DG",
        "name": "Latéral Gauche",
        "icon": ""
      },
      {
        "code": "MC",
        "name": "Milieu Relayeur (8)",
        "icon": ""
      },
      {
        "code": "AG",
        "name": "Ailier Gauche",
        "icon": ""
      }
    ],
    "coachDemand": "\"Un championnat se gagne par la défense. On cadenasse l'axe, on gagne les duels et on ne concède rien. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche. La direction sportive cible au moins un renfort issu du vivier sud-américain (CONMEBOL).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Roc défensif",
        "Tacleur féroce"
      ],
      "ATT": [
        "Vitesse supersonique",
        "Accélération foudroyante",
        "Dribbles chaloupés"
      ]
    },
    "forbiddenTraits": [
      "Déficit technique",
      "Jeu stéréotypé",
      "Tacleur boucher",
      "Relance hasardeuse"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche.",
    "targetRank": 2,
    "league": "Premier League",
    "flag": "󠁧󠁢󠁥󠁮󠁧󠁿",
    "tacticalPhilosophy": " Tiki-Taka & Maîtrise",
    "tacticalTag": "Catenaccio & Verrouillage",
    "preferredTraits": [
      "Vision laser",
      "Maestro créatif",
      "Relance propre",
      "Plaque tournante",
      "Dribbleur soyeux",
      "Discipline tactique"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "SOUTH_AMERICA",
      "name": "Réseau Amérique du Sud (CONMEBOL)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu du vivier sud-américain (Brésil, Argentine...)",
      "ruleDesc": "La cellule de détection cible en priorité les championnats sud-américains."
    }
  },
  {
    "id": 27,
    "difficulty": "facile",
    "club": "Fenerbahce Bosphore FC",
    "country": "🇹🇷 Süper Lig (Turquie)",
    "logo": "",
    "budget": 161,
    "wages": 18,
    "needs": [
      {
        "code": "DD",
        "name": "Latéral Droit",
        "icon": ""
      },
      {
        "code": "MDF",
        "name": "Sentinelle (6)",
        "icon": ""
      },
      {
        "code": "PEPITE_U21",
        "name": "Pépite U21 (-21 ans)",
        "icon": ""
      }
    ],
    "coachDemand": "\"On attend le bon moment pour piquer à 200 km/h. Il me faut de la dynamite dans les couloirs et de la verticalité. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans). La cellule de scouting recommande d'activer notre filière de recrutement sur les championnats africains.\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Infatigable",
        "Poumons d'acier",
        "Guerrier"
      ],
      "ATT": [
        "Renard des surfaces",
        "Sens du but",
        "Tueur clinique"
      ]
    },
    "forbiddenTraits": [
      "Vétéran déclinant",
      "Lent au démarrage",
      "Mauvaise hygiène de vie"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans).",
    "targetRank": 2,
    "league": "Süper Lig",
    "flag": "🇹🇷",
    "tacticalPhilosophy": " Projet Trading & Jeunesse",
    "tacticalTag": "Transition Éclair & Contre-Attaque",
    "preferredTraits": [
      "Pépite U21",
      "Ailier supersonique",
      "Dribbleur déroutant",
      "Finition chirurgicale",
      "Vitesse supersonique"
    ],
    "targetAgeRule": "u21",
    "originConstraint": {
      "code": "AFRICA",
      "name": "Réseau Afrique (Partenariats CAF)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des académies ou sélections africaines",
      "ruleDesc": "Priorité accordée aux partenariats de scouting établis sur le continent africain."
    }
  },
  {
    "id": 28,
    "difficulty": "facile",
    "club": "Galatasaray Lions FC",
    "country": "🇹🇷 Süper Lig (Turquie)",
    "logo": "",
    "budget": 178,
    "wages": 21,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "MO",
        "name": "Meneur de Jeu (10)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Le ballon est notre meilleur allié. Ceux qui balancent des chandelles vont sur le banc, je veux de la vista et de la finesse. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9). Expérience requise au sein des championnats majeurs européens pour une adaptation immédiate.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Tacleur féroce",
        "Impact physique",
        "Roc défensif"
      ],
      "MIL": [
        "Vision laser",
        "Maestro du tempo",
        "Passeur laser"
      ]
    },
    "forbiddenTraits": [
      "Discret dans les grands matchs",
      "Fragilité mentale",
      "Profil brut non formé"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9).",
    "targetRank": 2,
    "league": "Süper Lig",
    "flag": "🇹🇷",
    "tacticalPhilosophy": " Domination & Standing",
    "tacticalTag": "Tiki-Taka & Jeu de Position",
    "preferredTraits": [
      "Sang-froid clinique",
      "Cadre international",
      "Tueur clinique",
      "Vision laser",
      "Patron aérien"
    ],
    "targetAgeRule": "star",
    "originConstraint": {
      "code": "EURO_TACTICAL",
      "name": "Filière Championnats Majeurs (UEFA)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur formé ou aguerri dans les grands championnats européens",
      "ruleDesc": "Le coach privilégie la rigueur tactique, le placement et la lecture de jeu européenne."
    }
  },
  {
    "id": 29,
    "difficulty": "facile",
    "club": "Sporting Lions FC",
    "country": "🇵🇹 Liga Portugal",
    "logo": "",
    "budget": 195,
    "wages": 24,
    "needs": [
      {
        "code": "GAR",
        "name": "Gardien de But",
        "icon": ""
      },
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "AD",
        "name": "Ailier Droit",
        "icon": ""
      }
    ],
    "coachDemand": "\"Ici on joue avec les tripes. Je refuse catégoriquement les divas et les égos surdimensionnés. Nos 3 besoins prioritaires à pourvoir avant minuit : Gardien de But, Défenseur Central, Ailier Droit. Priorité à un profil athlétique et rigoureux issu des championnats nordiques ou d'Europe de l'Est.\"",
    "expectedTraitsByPos": {
      "GAR": [
        "Arrêts miracles",
        "Réflexes félins",
        "Mains de fer"
      ],
      "ATT": [
        "Tueur clinique",
        "Sens du but",
        "Renard des surfaces"
      ]
    },
    "forbiddenTraits": [
      "Déficit technique",
      "Jeu stéréotypé",
      "Tacleur boucher",
      "Égo surdimensionné"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Gardien de But, Défenseur Central, Ailier Droit.",
    "targetRank": 2,
    "league": "Liga Portugal",
    "flag": "🇵🇹",
    "tacticalPhilosophy": " Tiki-Taka & Maîtrise",
    "tacticalTag": "Meneur d'Hommes & Sang Chaud",
    "preferredTraits": [
      "Vision laser",
      "Maestro créatif",
      "Relance propre",
      "Plaque tournante",
      "Dribbleur soyeux",
      "Leader vocal"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "NORDIC_EAST",
      "name": "Réseau Europe du Nord & de l'Est",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des ligues nordiques ou d'Europe de l'Est",
      "ruleDesc": "Détection active sur les championnats scandinaves et d'Europe centrale/orientale."
    }
  },
  {
    "id": 30,
    "difficulty": "facile",
    "club": "Celtic Glasgow FC",
    "country": "󠁧󠁢󠁳󠁣󠁴󠁿 Premiership (Écosse)",
    "logo": "",
    "budget": 140,
    "wages": 15,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_PISTON_AILIER",
        "name": "Piston / Ailier",
        "icon": ""
      }
    ],
    "coachDemand": "\"Place à l'audace ! Je préfère un jeune mort de faim qu'un nom ronflant en préretraite. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Piston / Ailier. Objectif de conformité : intégrer au moins un joueur formé localement (quota national).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Roc défensif",
        "Tacleur féroce"
      ],
      "ATT": [
        "Vitesse supersonique",
        "Accélération foudroyante",
        "Dribbles chaloupés"
      ]
    },
    "forbiddenTraits": [
      "Vétéran déclinant",
      "Lent au démarrage",
      "Mauvaise hygiène de vie",
      "Vétéran cramé"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Piston / Ailier.",
    "targetRank": 2,
    "league": "Scottish Premiership",
    "flag": "󠁧󠁢󠁳󠁣󠁴󠁿",
    "tacticalPhilosophy": " Projet Trading & Jeunesse",
    "tacticalTag": "Pari Jeunesse & Pépites",
    "preferredTraits": [
      "Pépite U21",
      "Ailier supersonique",
      "Dribbleur déroutant",
      "Finition chirurgicale",
      "Jeune prodige"
    ],
    "targetAgeRule": "u21",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 recrue du même pays",
      "ruleDesc": "Le coach tient à l'identité locale du club et exige au moins un renfort national."
    }
  },
  {
    "id": 31,
    "difficulty": "facile",
    "club": "AS Monaco Rock FC",
    "country": "🇫🇷 Ligue 1 (France)",
    "logo": "",
    "budget": 140,
    "wages": 18,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_10_AILIER",
        "name": "Polyvalent 10 & Ailier",
        "icon": ""
      }
    ],
    "coachDemand": "\"Chaque match est une bataille tactique pour assurer notre maintien. Il me faut des joueurs avec un gros volume de jeu et une vraie solidité dans les duels. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent 10 & Ailier. Objectif de conformité : intégrer au moins un joueur formé localement (quota national).\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Infatigable",
        "Poumons d'acier",
        "Guerrier"
      ],
      "ATT": [
        "Renard des surfaces",
        "Sens du but",
        "Tueur clinique"
      ]
    },
    "forbiddenTraits": [
      "Discret dans les grands matchs",
      "Fragilité mentale",
      "Profil brut non formé"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent 10 & Ailier.",
    "targetRank": 2,
    "league": "Ligue 1",
    "flag": "🇫🇷",
    "tacticalPhilosophy": " Domination & Standing",
    "tacticalTag": "Pragmatisme du Maintien",
    "preferredTraits": [
      "Sang-froid clinique",
      "Cadre international",
      "Tueur clinique",
      "Vision laser",
      "Patron aérien",
      "Impact physique"
    ],
    "targetAgeRule": "star",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 recrue du même pays",
      "ruleDesc": "Le coach tient à l'identité locale du club et exige au moins un renfort national."
    }
  },
  {
    "id": 32,
    "difficulty": "facile",
    "club": "Benfica Seixal FC",
    "country": "🇵🇹 Liga Portugal",
    "logo": "",
    "budget": 144,
    "wages": 21,
    "needs": [
      {
        "code": "DG",
        "name": "Latéral Gauche",
        "icon": ""
      },
      {
        "code": "MC",
        "name": "Milieu Relayeur (8)",
        "icon": ""
      },
      {
        "code": "AG",
        "name": "Ailier Gauche",
        "icon": ""
      }
    ],
    "coachDemand": "\"Je préfère gagner 4-3 que 1-0. Apportez-moi de la percussion, du culot et des frappes chirurgicales. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche. La direction sportive cible au moins un renfort issu du vivier sud-américain (CONMEBOL).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Tacleur féroce",
        "Impact physique",
        "Roc défensif"
      ],
      "MIL": [
        "Vision laser",
        "Maestro du tempo",
        "Passeur laser"
      ]
    },
    "forbiddenTraits": [
      "Déficit technique",
      "Jeu stéréotypé",
      "Tacleur boucher",
      "Capricieux sous pression"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche.",
    "targetRank": 2,
    "league": "Liga Portugal",
    "flag": "🇵🇹",
    "tacticalPhilosophy": " Tiki-Taka & Maîtrise",
    "tacticalTag": "Folie Offensive Champagne",
    "preferredTraits": [
      "Vision laser",
      "Maestro créatif",
      "Relance propre",
      "Plaque tournante",
      "Dribbleur soyeux",
      "Tueur clinique"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "SOUTH_AMERICA",
      "name": "Réseau Amérique du Sud (CONMEBOL)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu du vivier sud-américain (Brésil, Argentine...)",
      "ruleDesc": "La cellule de détection cible en priorité les championnats sud-américains."
    }
  },
  {
    "id": 33,
    "difficulty": "facile",
    "club": "Feyenoord Port FC",
    "country": "🇳🇱 Eredivisie (Pays-Bas)",
    "logo": "",
    "budget": 161,
    "wages": 24,
    "needs": [
      {
        "code": "DD",
        "name": "Latéral Droit",
        "icon": ""
      },
      {
        "code": "MDF",
        "name": "Sentinelle (6)",
        "icon": ""
      },
      {
        "code": "PEPITE_U21",
        "name": "Pépite U21 (-21 ans)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Zéro touriste sur le pré ! Je veux du contre-pressing immédiat à la perte et des poumons d'acier. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans). La cellule de scouting recommande d'activer notre filière de recrutement sur les championnats africains.\"",
    "expectedTraitsByPos": {
      "GAR": [
        "Arrêts miracles",
        "Réflexes félins",
        "Mains de fer"
      ],
      "ATT": [
        "Tueur clinique",
        "Sens du but",
        "Renard des surfaces"
      ]
    },
    "forbiddenTraits": [
      "Vétéran déclinant",
      "Lent au démarrage",
      "Mauvaise hygiène de vie",
      "Allergique au repli"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans).",
    "targetRank": 2,
    "league": "Eredivisie",
    "flag": "🇳🇱",
    "tacticalPhilosophy": " Projet Trading & Jeunesse",
    "tacticalTag": "Gegenpressing & Intensité",
    "preferredTraits": [
      "Pépite U21",
      "Ailier supersonique",
      "Dribbleur déroutant",
      "Finition chirurgicale",
      "Infatigable"
    ],
    "targetAgeRule": "u21",
    "originConstraint": {
      "code": "AFRICA",
      "name": "Réseau Afrique (Partenariats CAF)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des académies ou sélections africaines",
      "ruleDesc": "Priorité accordée aux partenariats de scouting établis sur le continent africain."
    }
  },
  {
    "id": 34,
    "difficulty": "facile",
    "club": "Sao Paulo Tricolor FC",
    "country": "🇧🇷 Brasileirão (Brésil)",
    "logo": "",
    "budget": 178,
    "wages": 15,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "MO",
        "name": "Meneur de Jeu (10)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Un championnat se gagne par la défense. On cadenasse l'axe, on gagne les duels et on ne concède rien. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9). Expérience requise au sein des championnats majeurs européens pour une adaptation immédiate.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Roc défensif",
        "Tacleur féroce"
      ],
      "ATT": [
        "Vitesse supersonique",
        "Accélération foudroyante",
        "Dribbles chaloupés"
      ]
    },
    "forbiddenTraits": [
      "Discret dans les grands matchs",
      "Fragilité mentale",
      "Profil brut non formé",
      "Relance hasardeuse"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9).",
    "targetRank": 2,
    "league": "Brasileirão",
    "flag": "🇧🇷",
    "tacticalPhilosophy": " Domination & Standing",
    "tacticalTag": "Catenaccio & Verrouillage",
    "preferredTraits": [
      "Sang-froid clinique",
      "Cadre international",
      "Tueur clinique",
      "Vision laser",
      "Patron aérien",
      "Discipline tactique"
    ],
    "targetAgeRule": "star",
    "originConstraint": {
      "code": "EURO_TACTICAL",
      "name": "Filière Championnats Majeurs (UEFA)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur formé ou aguerri dans les grands championnats européens",
      "ruleDesc": "Le coach privilégie la rigueur tactique, le placement et la lecture de jeu européenne."
    }
  },
  {
    "id": 35,
    "difficulty": "moyen",
    "club": "Olympique de Paname",
    "country": "🇫🇷 Ligue 1 (France)",
    "logo": "",
    "budget": 28,
    "wages": 5,
    "needs": [
      {
        "code": "GAR",
        "name": "Gardien de But",
        "icon": ""
      },
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "AD",
        "name": "Ailier Droit",
        "icon": ""
      }
    ],
    "coachDemand": "\"On attend le bon moment pour piquer à 200 km/h. Il me faut de la dynamite dans les couloirs et de la verticalité. Nos 3 besoins prioritaires à pourvoir avant minuit : Gardien de But, Défenseur Central, Ailier Droit. Priorité à un profil athlétique et rigoureux issu des championnats nordiques ou d'Europe de l'Est.\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Infatigable",
        "Poumons d'acier",
        "Guerrier"
      ],
      "ATT": [
        "Renard des surfaces",
        "Sens du but",
        "Tueur clinique"
      ]
    },
    "forbiddenTraits": [
      "Déficit technique",
      "Jeu stéréotypé",
      "Tacleur boucher",
      "Lent au démarrage"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Gardien de But, Défenseur Central, Ailier Droit.",
    "targetRank": 6,
    "league": "Ligue 1",
    "flag": "🇫🇷",
    "tacticalPhilosophy": " Tiki-Taka & Maîtrise",
    "tacticalTag": "Transition Éclair & Contre-Attaque",
    "preferredTraits": [
      "Vision laser",
      "Maestro créatif",
      "Relance propre",
      "Plaque tournante",
      "Dribbleur soyeux",
      "Vitesse supersonique"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "NORDIC_EAST",
      "name": "Réseau Europe du Nord & de l'Est",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des ligues nordiques ou d'Europe de l'Est",
      "ruleDesc": "Détection active sur les championnats scandinaves et d'Europe centrale/orientale."
    }
  },
  {
    "id": 36,
    "difficulty": "moyen",
    "club": "Sevilla Nervion",
    "country": "🇪🇸 La Liga (Espagne)",
    "logo": "",
    "budget": 28,
    "wages": 6.5,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_DG_DD",
        "name": "Polyvalent DG / DD",
        "icon": ""
      }
    ],
    "coachDemand": "\"Le ballon est notre meilleur allié. Ceux qui balancent des chandelles vont sur le banc, je veux de la vista et de la finesse. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent DG / DD.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Tacleur féroce",
        "Impact physique",
        "Roc défensif"
      ],
      "MIL": [
        "Vision laser",
        "Maestro du tempo",
        "Passeur laser"
      ]
    },
    "forbiddenTraits": [
      "Lent au démarrage",
      "Passeur latéral stérile",
      "Profil brut non formé"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent DG / DD.",
    "targetRank": 6,
    "league": "La Liga",
    "flag": "🇪🇸",
    "tacticalPhilosophy": " Transition Éclair",
    "tacticalTag": "Tiki-Taka & Jeu de Position",
    "preferredTraits": [
      "Vitesse supersonique",
      "Ailier supersonique",
      "Tueur clinique",
      "Renard des surfaces",
      "Piston moderne",
      "Vision laser"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "FREE",
      "name": "Scouting Libre & Sans Frontières",
      "icon": "",
      "shortDesc": "Aucune restriction géographique imposée",
      "ruleDesc": "Le coach ne regarde que la valeur intrinsèque et l'alchimie tactique."
    }
  },
  {
    "id": 37,
    "difficulty": "moyen",
    "club": "West Ham Hammers",
    "country": "󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)",
    "logo": "",
    "budget": 32,
    "wages": 8,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_DEUX_AILES",
        "name": "Polyvalent Deux Ailes (AG / AD)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Ici on joue avec les tripes. Je refuse catégoriquement les divas et les égos surdimensionnés. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent Deux Ailes (AG / AD). Objectif de conformité : intégrer au moins un joueur formé localement (quota national).\"",
    "expectedTraitsByPos": {
      "GAR": [
        "Arrêts miracles",
        "Réflexes félins",
        "Mains de fer"
      ],
      "ATT": [
        "Tueur clinique",
        "Sens du but",
        "Renard des surfaces"
      ]
    },
    "forbiddenTraits": [
      "Vétéran déclinant",
      "Lent au démarrage",
      "Mauvaise hygiène de vie",
      "Égo surdimensionné"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent Deux Ailes (AG / AD).",
    "targetRank": 6,
    "league": "Premier League",
    "flag": "󠁧󠁢󠁥󠁮󠁧󠁿",
    "tacticalPhilosophy": " Projet Trading & Jeunesse",
    "tacticalTag": "Meneur d'Hommes & Sang Chaud",
    "preferredTraits": [
      "Pépite U21",
      "Ailier supersonique",
      "Dribbleur déroutant",
      "Finition chirurgicale",
      "Leader vocal"
    ],
    "targetAgeRule": "u21",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 recrue du même pays",
      "ruleDesc": "Le coach tient à l'identité locale du club et exige au moins un renfort national."
    }
  },
  {
    "id": 38,
    "difficulty": "moyen",
    "club": "Fiorentina Viola",
    "country": "🇮🇹 Serie A (Italie)",
    "logo": "",
    "budget": 35,
    "wages": 5,
    "needs": [
      {
        "code": "DG",
        "name": "Latéral Gauche",
        "icon": ""
      },
      {
        "code": "MC",
        "name": "Milieu Relayeur (8)",
        "icon": ""
      },
      {
        "code": "AG",
        "name": "Ailier Gauche",
        "icon": ""
      }
    ],
    "coachDemand": "\"Place à l'audace ! Je préfère un jeune mort de faim qu'un nom ronflant en préretraite. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche. La direction sportive cible au moins un renfort issu du vivier sud-américain (CONMEBOL).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Roc défensif",
        "Tacleur féroce"
      ],
      "ATT": [
        "Vitesse supersonique",
        "Accélération foudroyante",
        "Dribbles chaloupés"
      ]
    },
    "forbiddenTraits": [
      "Déficit technique",
      "Jeu stéréotypé",
      "Tacleur boucher",
      "Vétéran cramé"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche.",
    "targetRank": 6,
    "league": "Serie A",
    "flag": "🇮🇹",
    "tacticalPhilosophy": " Tiki-Taka & Maîtrise",
    "tacticalTag": "Pari Jeunesse & Pépites",
    "preferredTraits": [
      "Vision laser",
      "Maestro créatif",
      "Relance propre",
      "Plaque tournante",
      "Dribbleur soyeux",
      "Jeune prodige"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "SOUTH_AMERICA",
      "name": "Réseau Amérique du Sud (CONMEBOL)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu du vivier sud-américain (Brésil, Argentine...)",
      "ruleDesc": "La cellule de détection cible en priorité les championnats sud-américains."
    }
  },
  {
    "id": 39,
    "difficulty": "moyen",
    "club": "Real Betis",
    "country": "🇪🇸 La Liga (Espagne)",
    "logo": "",
    "budget": 38,
    "wages": 6.5,
    "needs": [
      {
        "code": "DD",
        "name": "Latéral Droit",
        "icon": ""
      },
      {
        "code": "MDF",
        "name": "Sentinelle (6)",
        "icon": ""
      },
      {
        "code": "PEPITE_U21",
        "name": "Pépite U21 (-21 ans)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Chaque match est une bataille tactique pour assurer notre maintien. Il me faut des joueurs avec un gros volume de jeu et une vraie solidité dans les duels. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans). La cellule de scouting recommande d'activer notre filière de recrutement sur les championnats africains.\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Infatigable",
        "Poumons d'acier",
        "Guerrier"
      ],
      "ATT": [
        "Renard des surfaces",
        "Sens du but",
        "Tueur clinique"
      ]
    },
    "forbiddenTraits": [
      "Lent au démarrage",
      "Passeur latéral stérile",
      "Discret dans les grands matchs"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans).",
    "targetRank": 6,
    "league": "La Liga",
    "flag": "🇪🇸",
    "tacticalPhilosophy": " Transition Éclair",
    "tacticalTag": "Pragmatisme du Maintien",
    "preferredTraits": [
      "Vitesse supersonique",
      "Ailier supersonique",
      "Tueur clinique",
      "Renard des surfaces",
      "Piston moderne",
      "Impact physique"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "AFRICA",
      "name": "Réseau Afrique (Partenariats CAF)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des académies ou sélections africaines",
      "ruleDesc": "Priorité accordée aux partenariats de scouting établis sur le continent africain."
    }
  },
  {
    "id": 40,
    "difficulty": "moyen",
    "club": "Lazio Aquile Roma",
    "country": "🇮🇹 Serie A (Italie)",
    "logo": "",
    "budget": 28,
    "wages": 8,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "MO",
        "name": "Meneur de Jeu (10)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Je préfère gagner 4-3 que 1-0. Apportez-moi de la percussion, du culot et des frappes chirurgicales. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9). Expérience requise au sein des championnats majeurs européens pour une adaptation immédiate.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Tacleur féroce",
        "Impact physique",
        "Roc défensif"
      ],
      "MIL": [
        "Vision laser",
        "Maestro du tempo",
        "Passeur laser"
      ]
    },
    "forbiddenTraits": [
      "Vétéran déclinant",
      "Lent au démarrage",
      "Mauvaise hygiène de vie",
      "Capricieux sous pression"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9).",
    "targetRank": 6,
    "league": "Serie A",
    "flag": "🇮🇹",
    "tacticalPhilosophy": " Projet Trading & Jeunesse",
    "tacticalTag": "Folie Offensive Champagne",
    "preferredTraits": [
      "Pépite U21",
      "Ailier supersonique",
      "Dribbleur déroutant",
      "Finition chirurgicale",
      "Tueur clinique"
    ],
    "targetAgeRule": "u21",
    "originConstraint": {
      "code": "EURO_TACTICAL",
      "name": "Filière Championnats Majeurs (UEFA)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur formé ou aguerri dans les grands championnats européens",
      "ruleDesc": "Le coach privilégie la rigueur tactique, le placement et la lecture de jeu européenne."
    }
  },
  {
    "id": 41,
    "difficulty": "moyen",
    "club": "Athletic Bilbao",
    "country": "🇪🇸 La Liga (Espagne)",
    "logo": "",
    "budget": 28,
    "wages": 5,
    "needs": [
      {
        "code": "GAR",
        "name": "Gardien de But",
        "icon": ""
      },
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "AD",
        "name": "Ailier Droit",
        "icon": ""
      }
    ],
    "coachDemand": "\"Zéro touriste sur le pré ! Je veux du contre-pressing immédiat à la perte et des poumons d'acier. Nos 3 besoins prioritaires à pourvoir avant minuit : Gardien de But, Défenseur Central, Ailier Droit. Priorité à un profil athlétique et rigoureux issu des championnats nordiques ou d'Europe de l'Est.\"",
    "expectedTraitsByPos": {
      "GAR": [
        "Arrêts miracles",
        "Réflexes félins",
        "Mains de fer"
      ],
      "ATT": [
        "Tueur clinique",
        "Sens du but",
        "Renard des surfaces"
      ]
    },
    "forbiddenTraits": [
      "Déficit technique",
      "Jeu stéréotypé",
      "Tacleur boucher",
      "Allergique au repli"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Gardien de But, Défenseur Central, Ailier Droit.",
    "targetRank": 6,
    "league": "La Liga",
    "flag": "🇪🇸",
    "tacticalPhilosophy": " Tiki-Taka & Maîtrise",
    "tacticalTag": "Gegenpressing & Intensité",
    "preferredTraits": [
      "Vision laser",
      "Maestro créatif",
      "Relance propre",
      "Plaque tournante",
      "Dribbleur soyeux",
      "Infatigable"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "NORDIC_EAST",
      "name": "Réseau Europe du Nord & de l'Est",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des ligues nordiques ou d'Europe de l'Est",
      "ruleDesc": "Détection active sur les championnats scandinaves et d'Europe centrale/orientale."
    }
  },
  {
    "id": 42,
    "difficulty": "moyen",
    "club": "Brighton Seagulls",
    "country": "󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)",
    "logo": "",
    "budget": 32,
    "wages": 6.5,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_DEUX_AILES",
        "name": "Polyvalent Deux Ailes (AG / AD)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Un championnat se gagne par la défense. On cadenasse l'axe, on gagne les duels et on ne concède rien. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent Deux Ailes (AG / AD).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Roc défensif",
        "Tacleur féroce"
      ],
      "ATT": [
        "Vitesse supersonique",
        "Accélération foudroyante",
        "Dribbles chaloupés"
      ]
    },
    "forbiddenTraits": [
      "Lent au démarrage",
      "Passeur latéral stérile",
      "Relance hasardeuse"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent Deux Ailes (AG / AD).",
    "targetRank": 6,
    "league": "Premier League",
    "flag": "󠁧󠁢󠁥󠁮󠁧󠁿",
    "tacticalPhilosophy": " Transition Éclair",
    "tacticalTag": "Catenaccio & Verrouillage",
    "preferredTraits": [
      "Vitesse supersonique",
      "Ailier supersonique",
      "Tueur clinique",
      "Renard des surfaces",
      "Piston moderne",
      "Discipline tactique"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "FREE",
      "name": "Scouting Libre & Sans Frontières",
      "icon": "",
      "shortDesc": "Aucune restriction géographique imposée",
      "ruleDesc": "Le coach ne regarde que la valeur intrinsèque et l'alchimie tactique."
    }
  },
  {
    "id": 43,
    "difficulty": "moyen",
    "club": "Villarreal Amarillo",
    "country": "🇪🇸 La Liga (Espagne)",
    "logo": "",
    "budget": 35,
    "wages": 8,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_ATTAQUE",
        "name": "Polyvalent Buteur / Ailier",
        "icon": ""
      }
    ],
    "coachDemand": "\"On attend le bon moment pour piquer à 200 km/h. Il me faut de la dynamite dans les couloirs et de la verticalité. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent Buteur / Ailier. Objectif de conformité : intégrer au moins un joueur formé localement (quota national).\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Infatigable",
        "Poumons d'acier",
        "Guerrier"
      ],
      "ATT": [
        "Renard des surfaces",
        "Sens du but",
        "Tueur clinique"
      ]
    },
    "forbiddenTraits": [
      "Vétéran déclinant",
      "Lent au démarrage",
      "Mauvaise hygiène de vie"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent Buteur / Ailier.",
    "targetRank": 6,
    "league": "La Liga",
    "flag": "🇪🇸",
    "tacticalPhilosophy": " Projet Trading & Jeunesse",
    "tacticalTag": "Transition Éclair & Contre-Attaque",
    "preferredTraits": [
      "Pépite U21",
      "Ailier supersonique",
      "Dribbleur déroutant",
      "Finition chirurgicale",
      "Vitesse supersonique"
    ],
    "targetAgeRule": "u21",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 recrue du même pays",
      "ruleDesc": "Le coach tient à l'identité locale du club et exige au moins un renfort national."
    }
  },
  {
    "id": 44,
    "difficulty": "moyen",
    "club": "Atalanta Bergamo",
    "country": "🇮🇹 Serie A (Italie)",
    "logo": "",
    "budget": 38,
    "wages": 5,
    "needs": [
      {
        "code": "DG",
        "name": "Latéral Gauche",
        "icon": ""
      },
      {
        "code": "MC",
        "name": "Milieu Relayeur (8)",
        "icon": ""
      },
      {
        "code": "AG",
        "name": "Ailier Gauche",
        "icon": ""
      }
    ],
    "coachDemand": "\"Le ballon est notre meilleur allié. Ceux qui balancent des chandelles vont sur le banc, je veux de la vista et de la finesse. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche. La direction sportive cible au moins un renfort issu du vivier sud-américain (CONMEBOL).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Tacleur féroce",
        "Impact physique",
        "Roc défensif"
      ],
      "MIL": [
        "Vision laser",
        "Maestro du tempo",
        "Passeur laser"
      ]
    },
    "forbiddenTraits": [
      "Déficit technique",
      "Jeu stéréotypé",
      "Tacleur boucher",
      "Profil brut non formé"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche.",
    "targetRank": 6,
    "league": "Serie A",
    "flag": "🇮🇹",
    "tacticalPhilosophy": " Tiki-Taka & Maîtrise",
    "tacticalTag": "Tiki-Taka & Jeu de Position",
    "preferredTraits": [
      "Vision laser",
      "Maestro créatif",
      "Relance propre",
      "Plaque tournante",
      "Dribbleur soyeux"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "SOUTH_AMERICA",
      "name": "Réseau Amérique du Sud (CONMEBOL)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu du vivier sud-américain (Brésil, Argentine...)",
      "ruleDesc": "La cellule de détection cible en priorité les championnats sud-américains."
    }
  },
  {
    "id": 45,
    "difficulty": "moyen",
    "club": "LOSC Dogues",
    "country": "🇫🇷 Ligue 1 (France)",
    "logo": "",
    "budget": 28,
    "wages": 6.5,
    "needs": [
      {
        "code": "DD",
        "name": "Latéral Droit",
        "icon": ""
      },
      {
        "code": "MDF",
        "name": "Sentinelle (6)",
        "icon": ""
      },
      {
        "code": "PEPITE_U21",
        "name": "Pépite U21 (-21 ans)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Ici on joue avec les tripes. Je refuse catégoriquement les divas et les égos surdimensionnés. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans). La cellule de scouting recommande d'activer notre filière de recrutement sur les championnats africains.\"",
    "expectedTraitsByPos": {
      "GAR": [
        "Arrêts miracles",
        "Réflexes félins",
        "Mains de fer"
      ],
      "ATT": [
        "Tueur clinique",
        "Sens du but",
        "Renard des surfaces"
      ]
    },
    "forbiddenTraits": [
      "Lent au démarrage",
      "Passeur latéral stérile",
      "Égo surdimensionné"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans).",
    "targetRank": 6,
    "league": "Ligue 1",
    "flag": "🇫🇷",
    "tacticalPhilosophy": " Transition Éclair",
    "tacticalTag": "Meneur d'Hommes & Sang Chaud",
    "preferredTraits": [
      "Vitesse supersonique",
      "Ailier supersonique",
      "Tueur clinique",
      "Renard des surfaces",
      "Piston moderne",
      "Leader vocal"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "AFRICA",
      "name": "Réseau Afrique (Partenariats CAF)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des académies ou sélections africaines",
      "ruleDesc": "Priorité accordée aux partenariats de scouting établis sur le continent africain."
    }
  },
  {
    "id": 46,
    "difficulty": "moyen",
    "club": "Stuttgart Schwaben",
    "country": "🇩🇪 Bundesliga (Allemagne)",
    "logo": "",
    "budget": 28,
    "wages": 8,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "MO",
        "name": "Meneur de Jeu (10)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Place à l'audace ! Je préfère un jeune mort de faim qu'un nom ronflant en préretraite. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9). Expérience requise au sein des championnats majeurs européens pour une adaptation immédiate.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Roc défensif",
        "Tacleur féroce"
      ],
      "ATT": [
        "Vitesse supersonique",
        "Accélération foudroyante",
        "Dribbles chaloupés"
      ]
    },
    "forbiddenTraits": [
      "Vétéran déclinant",
      "Lent au démarrage",
      "Mauvaise hygiène de vie",
      "Vétéran cramé"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9).",
    "targetRank": 6,
    "league": "Bundesliga",
    "flag": "🇩🇪",
    "tacticalPhilosophy": " Projet Trading & Jeunesse",
    "tacticalTag": "Pari Jeunesse & Pépites",
    "preferredTraits": [
      "Pépite U21",
      "Ailier supersonique",
      "Dribbleur déroutant",
      "Finition chirurgicale",
      "Jeune prodige"
    ],
    "targetAgeRule": "u21",
    "originConstraint": {
      "code": "EURO_TACTICAL",
      "name": "Filière Championnats Majeurs (UEFA)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur formé ou aguerri dans les grands championnats européens",
      "ruleDesc": "Le coach privilégie la rigueur tactique, le placement et la lecture de jeu européenne."
    }
  },
  {
    "id": 47,
    "difficulty": "moyen",
    "club": "Wolverhampton Wolves",
    "country": "󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)",
    "logo": "",
    "budget": 32,
    "wages": 5,
    "needs": [
      {
        "code": "GAR",
        "name": "Gardien de But",
        "icon": ""
      },
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "AD",
        "name": "Ailier Droit",
        "icon": ""
      }
    ],
    "coachDemand": "\"Chaque match est une bataille tactique pour assurer notre maintien. Il me faut des joueurs avec un gros volume de jeu et une vraie solidité dans les duels. Nos 3 besoins prioritaires à pourvoir avant minuit : Gardien de But, Défenseur Central, Ailier Droit. Priorité à un profil athlétique et rigoureux issu des championnats nordiques ou d'Europe de l'Est.\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Infatigable",
        "Poumons d'acier",
        "Guerrier"
      ],
      "ATT": [
        "Renard des surfaces",
        "Sens du but",
        "Tueur clinique"
      ]
    },
    "forbiddenTraits": [
      "Déficit technique",
      "Jeu stéréotypé",
      "Tacleur boucher",
      "Discret dans les grands matchs"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Gardien de But, Défenseur Central, Ailier Droit.",
    "targetRank": 6,
    "league": "Premier League",
    "flag": "󠁧󠁢󠁥󠁮󠁧󠁿",
    "tacticalPhilosophy": " Tiki-Taka & Maîtrise",
    "tacticalTag": "Pragmatisme du Maintien",
    "preferredTraits": [
      "Vision laser",
      "Maestro créatif",
      "Relance propre",
      "Plaque tournante",
      "Dribbleur soyeux",
      "Impact physique"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "NORDIC_EAST",
      "name": "Réseau Europe du Nord & de l'Est",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des ligues nordiques ou d'Europe de l'Est",
      "ruleDesc": "Détection active sur les championnats scandinaves et d'Europe centrale/orientale."
    }
  },
  {
    "id": 48,
    "difficulty": "moyen",
    "club": "Real Sociedad",
    "country": "🇪🇸 La Liga (Espagne)",
    "logo": "",
    "budget": 35,
    "wages": 6.5,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_DG_DD",
        "name": "Polyvalent DG / DD",
        "icon": ""
      }
    ],
    "coachDemand": "\"Je préfère gagner 4-3 que 1-0. Apportez-moi de la percussion, du culot et des frappes chirurgicales. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent DG / DD.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Tacleur féroce",
        "Impact physique",
        "Roc défensif"
      ],
      "MIL": [
        "Vision laser",
        "Maestro du tempo",
        "Passeur laser"
      ]
    },
    "forbiddenTraits": [
      "Lent au démarrage",
      "Passeur latéral stérile",
      "Capricieux sous pression"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent DG / DD.",
    "targetRank": 6,
    "league": "La Liga",
    "flag": "🇪🇸",
    "tacticalPhilosophy": " Transition Éclair",
    "tacticalTag": "Folie Offensive Champagne",
    "preferredTraits": [
      "Vitesse supersonique",
      "Ailier supersonique",
      "Tueur clinique",
      "Renard des surfaces",
      "Piston moderne"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "FREE",
      "name": "Scouting Libre & Sans Frontières",
      "icon": "",
      "shortDesc": "Aucune restriction géographique imposée",
      "ruleDesc": "Le coach ne regarde que la valeur intrinsèque et l'alchimie tactique."
    }
  },
  {
    "id": 49,
    "difficulty": "moyen",
    "club": "Torino Granata",
    "country": "🇮🇹 Serie A (Italie)",
    "logo": "",
    "budget": 38,
    "wages": 8,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_DEUX_AILES",
        "name": "Polyvalent Deux Ailes (AG / AD)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Zéro touriste sur le pré ! Je veux du contre-pressing immédiat à la perte et des poumons d'acier. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent Deux Ailes (AG / AD). Objectif de conformité : intégrer au moins un joueur formé localement (quota national).\"",
    "expectedTraitsByPos": {
      "GAR": [
        "Arrêts miracles",
        "Réflexes félins",
        "Mains de fer"
      ],
      "ATT": [
        "Tueur clinique",
        "Sens du but",
        "Renard des surfaces"
      ]
    },
    "forbiddenTraits": [
      "Vétéran déclinant",
      "Lent au démarrage",
      "Mauvaise hygiène de vie",
      "Allergique au repli"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent Deux Ailes (AG / AD).",
    "targetRank": 6,
    "league": "Serie A",
    "flag": "🇮🇹",
    "tacticalPhilosophy": " Projet Trading & Jeunesse",
    "tacticalTag": "Gegenpressing & Intensité",
    "preferredTraits": [
      "Pépite U21",
      "Ailier supersonique",
      "Dribbleur déroutant",
      "Finition chirurgicale",
      "Infatigable"
    ],
    "targetAgeRule": "u21",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 recrue du même pays",
      "ruleDesc": "Le coach tient à l'identité locale du club et exige au moins un renfort national."
    }
  },
  {
    "id": 50,
    "difficulty": "moyen",
    "club": "Eintracht Frankfurt",
    "country": "🇩🇪 Bundesliga (Allemagne)",
    "logo": "",
    "budget": 28,
    "wages": 5,
    "needs": [
      {
        "code": "DG",
        "name": "Latéral Gauche",
        "icon": ""
      },
      {
        "code": "MC",
        "name": "Milieu Relayeur (8)",
        "icon": ""
      },
      {
        "code": "AG",
        "name": "Ailier Gauche",
        "icon": ""
      }
    ],
    "coachDemand": "\"Un championnat se gagne par la défense. On cadenasse l'axe, on gagne les duels et on ne concède rien. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche. La direction sportive cible au moins un renfort issu du vivier sud-américain (CONMEBOL).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Roc défensif",
        "Tacleur féroce"
      ],
      "ATT": [
        "Vitesse supersonique",
        "Accélération foudroyante",
        "Dribbles chaloupés"
      ]
    },
    "forbiddenTraits": [
      "Déficit technique",
      "Jeu stéréotypé",
      "Tacleur boucher",
      "Relance hasardeuse"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche.",
    "targetRank": 6,
    "league": "Bundesliga",
    "flag": "🇩🇪",
    "tacticalPhilosophy": " Tiki-Taka & Maîtrise",
    "tacticalTag": "Catenaccio & Verrouillage",
    "preferredTraits": [
      "Vision laser",
      "Maestro créatif",
      "Relance propre",
      "Plaque tournante",
      "Dribbleur soyeux",
      "Discipline tactique"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "SOUTH_AMERICA",
      "name": "Réseau Amérique du Sud (CONMEBOL)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu du vivier sud-américain (Brésil, Argentine...)",
      "ruleDesc": "La cellule de détection cible en priorité les championnats sud-américains."
    }
  },
  {
    "id": 51,
    "difficulty": "moyen",
    "club": "Crystal Palace",
    "country": "󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)",
    "logo": "",
    "budget": 28,
    "wages": 6.5,
    "needs": [
      {
        "code": "DD",
        "name": "Latéral Droit",
        "icon": ""
      },
      {
        "code": "MDF",
        "name": "Sentinelle (6)",
        "icon": ""
      },
      {
        "code": "PEPITE_U21",
        "name": "Pépite U21 (-21 ans)",
        "icon": ""
      }
    ],
    "coachDemand": "\"On attend le bon moment pour piquer à 200 km/h. Il me faut de la dynamite dans les couloirs et de la verticalité. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans). La cellule de scouting recommande d'activer notre filière de recrutement sur les championnats africains.\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Infatigable",
        "Poumons d'acier",
        "Guerrier"
      ],
      "ATT": [
        "Renard des surfaces",
        "Sens du but",
        "Tueur clinique"
      ]
    },
    "forbiddenTraits": [
      "Lent au démarrage",
      "Passeur latéral stérile"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans).",
    "targetRank": 6,
    "league": "Premier League",
    "flag": "󠁧󠁢󠁥󠁮󠁧󠁿",
    "tacticalPhilosophy": " Transition Éclair",
    "tacticalTag": "Transition Éclair & Contre-Attaque",
    "preferredTraits": [
      "Vitesse supersonique",
      "Ailier supersonique",
      "Tueur clinique",
      "Renard des surfaces",
      "Piston moderne"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "AFRICA",
      "name": "Réseau Afrique (Partenariats CAF)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des académies ou sélections africaines",
      "ruleDesc": "Priorité accordée aux partenariats de scouting établis sur le continent africain."
    }
  },
  {
    "id": 52,
    "difficulty": "moyen",
    "club": "Bologna Rossoblu",
    "country": "🇮🇹 Serie A (Italie)",
    "logo": "",
    "budget": 32,
    "wages": 8,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "MO",
        "name": "Meneur de Jeu (10)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Le ballon est notre meilleur allié. Ceux qui balancent des chandelles vont sur le banc, je veux de la vista et de la finesse. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9). Expérience requise au sein des championnats majeurs européens pour une adaptation immédiate.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Tacleur féroce",
        "Impact physique",
        "Roc défensif"
      ],
      "MIL": [
        "Vision laser",
        "Maestro du tempo",
        "Passeur laser"
      ]
    },
    "forbiddenTraits": [
      "Vétéran déclinant",
      "Lent au démarrage",
      "Mauvaise hygiène de vie",
      "Profil brut non formé"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9).",
    "targetRank": 6,
    "league": "Serie A",
    "flag": "🇮🇹",
    "tacticalPhilosophy": " Projet Trading & Jeunesse",
    "tacticalTag": "Tiki-Taka & Jeu de Position",
    "preferredTraits": [
      "Pépite U21",
      "Ailier supersonique",
      "Dribbleur déroutant",
      "Finition chirurgicale",
      "Vision laser"
    ],
    "targetAgeRule": "u21",
    "originConstraint": {
      "code": "EURO_TACTICAL",
      "name": "Filière Championnats Majeurs (UEFA)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur formé ou aguerri dans les grands championnats européens",
      "ruleDesc": "Le coach privilégie la rigueur tactique, le placement et la lecture de jeu européenne."
    }
  },
  {
    "id": 53,
    "difficulty": "moyen",
    "club": "Rennes Celtes",
    "country": "🇫🇷 Ligue 1 (France)",
    "logo": "",
    "budget": 35,
    "wages": 5,
    "needs": [
      {
        "code": "GAR",
        "name": "Gardien de But",
        "icon": ""
      },
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "AD",
        "name": "Ailier Droit",
        "icon": ""
      }
    ],
    "coachDemand": "\"Ici on joue avec les tripes. Je refuse catégoriquement les divas et les égos surdimensionnés. Nos 3 besoins prioritaires à pourvoir avant minuit : Gardien de But, Défenseur Central, Ailier Droit. Priorité à un profil athlétique et rigoureux issu des championnats nordiques ou d'Europe de l'Est.\"",
    "expectedTraitsByPos": {
      "GAR": [
        "Arrêts miracles",
        "Réflexes félins",
        "Mains de fer"
      ],
      "ATT": [
        "Tueur clinique",
        "Sens du but",
        "Renard des surfaces"
      ]
    },
    "forbiddenTraits": [
      "Déficit technique",
      "Jeu stéréotypé",
      "Tacleur boucher",
      "Égo surdimensionné"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Gardien de But, Défenseur Central, Ailier Droit.",
    "targetRank": 6,
    "league": "Ligue 1",
    "flag": "🇫🇷",
    "tacticalPhilosophy": " Tiki-Taka & Maîtrise",
    "tacticalTag": "Meneur d'Hommes & Sang Chaud",
    "preferredTraits": [
      "Vision laser",
      "Maestro créatif",
      "Relance propre",
      "Plaque tournante",
      "Dribbleur soyeux",
      "Leader vocal"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "NORDIC_EAST",
      "name": "Réseau Europe du Nord & de l'Est",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des ligues nordiques ou d'Europe de l'Est",
      "ruleDesc": "Détection active sur les championnats scandinaves et d'Europe centrale/orientale."
    }
  },
  {
    "id": 54,
    "difficulty": "moyen",
    "club": "Fulham Cottagers",
    "country": "󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)",
    "logo": "",
    "budget": 38,
    "wages": 6.5,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_DEUX_AILES",
        "name": "Polyvalent Deux Ailes (AG / AD)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Place à l'audace ! Je préfère un jeune mort de faim qu'un nom ronflant en préretraite. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent Deux Ailes (AG / AD).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Roc défensif",
        "Tacleur féroce"
      ],
      "ATT": [
        "Vitesse supersonique",
        "Accélération foudroyante",
        "Dribbles chaloupés"
      ]
    },
    "forbiddenTraits": [
      "Lent au démarrage",
      "Passeur latéral stérile",
      "Vétéran cramé"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent Deux Ailes (AG / AD).",
    "targetRank": 6,
    "league": "Premier League",
    "flag": "󠁧󠁢󠁥󠁮󠁧󠁿",
    "tacticalPhilosophy": " Transition Éclair",
    "tacticalTag": "Pari Jeunesse & Pépites",
    "preferredTraits": [
      "Vitesse supersonique",
      "Ailier supersonique",
      "Tueur clinique",
      "Renard des surfaces",
      "Piston moderne",
      "Jeune prodige"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "FREE",
      "name": "Scouting Libre & Sans Frontières",
      "icon": "",
      "shortDesc": "Aucune restriction géographique imposée",
      "ruleDesc": "Le coach ne regarde que la valeur intrinsèque et l'alchimie tactique."
    }
  },
  {
    "id": 55,
    "difficulty": "moyen",
    "club": "Girona Kataluna",
    "country": "🇪🇸 La Liga (Espagne)",
    "logo": "",
    "budget": 28,
    "wages": 8,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_ATTAQUE",
        "name": "Polyvalent Buteur / Ailier",
        "icon": ""
      }
    ],
    "coachDemand": "\"Chaque match est une bataille tactique pour assurer notre maintien. Il me faut des joueurs avec un gros volume de jeu et une vraie solidité dans les duels. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent Buteur / Ailier. Objectif de conformité : intégrer au moins un joueur formé localement (quota national).\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Infatigable",
        "Poumons d'acier",
        "Guerrier"
      ],
      "ATT": [
        "Renard des surfaces",
        "Sens du but",
        "Tueur clinique"
      ]
    },
    "forbiddenTraits": [
      "Vétéran déclinant",
      "Lent au démarrage",
      "Mauvaise hygiène de vie",
      "Discret dans les grands matchs"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent Buteur / Ailier.",
    "targetRank": 6,
    "league": "La Liga",
    "flag": "🇪🇸",
    "tacticalPhilosophy": " Projet Trading & Jeunesse",
    "tacticalTag": "Pragmatisme du Maintien",
    "preferredTraits": [
      "Pépite U21",
      "Ailier supersonique",
      "Dribbleur déroutant",
      "Finition chirurgicale",
      "Impact physique"
    ],
    "targetAgeRule": "u21",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 recrue du même pays",
      "ruleDesc": "Le coach tient à l'identité locale du club et exige au moins un renfort national."
    }
  },
  {
    "id": 56,
    "difficulty": "moyen",
    "club": "Lens Sang et Or",
    "country": "🇫🇷 Ligue 1 (France)",
    "logo": "",
    "budget": 28,
    "wages": 5,
    "needs": [
      {
        "code": "DG",
        "name": "Latéral Gauche",
        "icon": ""
      },
      {
        "code": "MC",
        "name": "Milieu Relayeur (8)",
        "icon": ""
      },
      {
        "code": "AG",
        "name": "Ailier Gauche",
        "icon": ""
      }
    ],
    "coachDemand": "\"Je préfère gagner 4-3 que 1-0. Apportez-moi de la percussion, du culot et des frappes chirurgicales. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche. La direction sportive cible au moins un renfort issu du vivier sud-américain (CONMEBOL).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Tacleur féroce",
        "Impact physique",
        "Roc défensif"
      ],
      "MIL": [
        "Vision laser",
        "Maestro du tempo",
        "Passeur laser"
      ]
    },
    "forbiddenTraits": [
      "Déficit technique",
      "Jeu stéréotypé",
      "Tacleur boucher",
      "Capricieux sous pression"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche.",
    "targetRank": 6,
    "league": "Ligue 1",
    "flag": "🇫🇷",
    "tacticalPhilosophy": " Tiki-Taka & Maîtrise",
    "tacticalTag": "Folie Offensive Champagne",
    "preferredTraits": [
      "Vision laser",
      "Maestro créatif",
      "Relance propre",
      "Plaque tournante",
      "Dribbleur soyeux",
      "Tueur clinique"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "SOUTH_AMERICA",
      "name": "Réseau Amérique du Sud (CONMEBOL)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu du vivier sud-américain (Brésil, Argentine...)",
      "ruleDesc": "La cellule de détection cible en priorité les championnats sud-américains."
    }
  },
  {
    "id": 57,
    "difficulty": "moyen",
    "club": "Everton Toffees",
    "country": "󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)",
    "logo": "",
    "budget": 32,
    "wages": 6.5,
    "needs": [
      {
        "code": "DD",
        "name": "Latéral Droit",
        "icon": ""
      },
      {
        "code": "MDF",
        "name": "Sentinelle (6)",
        "icon": ""
      },
      {
        "code": "PEPITE_U21",
        "name": "Pépite U21 (-21 ans)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Zéro touriste sur le pré ! Je veux du contre-pressing immédiat à la perte et des poumons d'acier. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans). La cellule de scouting recommande d'activer notre filière de recrutement sur les championnats africains.\"",
    "expectedTraitsByPos": {
      "GAR": [
        "Arrêts miracles",
        "Réflexes félins",
        "Mains de fer"
      ],
      "ATT": [
        "Tueur clinique",
        "Sens du but",
        "Renard des surfaces"
      ]
    },
    "forbiddenTraits": [
      "Lent au démarrage",
      "Passeur latéral stérile",
      "Allergique au repli"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans).",
    "targetRank": 6,
    "league": "Premier League",
    "flag": "󠁧󠁢󠁥󠁮󠁧󠁿",
    "tacticalPhilosophy": " Transition Éclair",
    "tacticalTag": "Gegenpressing & Intensité",
    "preferredTraits": [
      "Vitesse supersonique",
      "Ailier supersonique",
      "Tueur clinique",
      "Renard des surfaces",
      "Piston moderne",
      "Infatigable"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "AFRICA",
      "name": "Réseau Afrique (Partenariats CAF)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des académies ou sélections africaines",
      "ruleDesc": "Priorité accordée aux partenariats de scouting établis sur le continent africain."
    }
  },
  {
    "id": 58,
    "difficulty": "moyen",
    "club": "Hoffenheim",
    "country": "🇩🇪 Bundesliga (Allemagne)",
    "logo": "",
    "budget": 35,
    "wages": 8,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "MO",
        "name": "Meneur de Jeu (10)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Un championnat se gagne par la défense. On cadenasse l'axe, on gagne les duels et on ne concède rien. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9). Expérience requise au sein des championnats majeurs européens pour une adaptation immédiate.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Roc défensif",
        "Tacleur féroce"
      ],
      "ATT": [
        "Vitesse supersonique",
        "Accélération foudroyante",
        "Dribbles chaloupés"
      ]
    },
    "forbiddenTraits": [
      "Vétéran déclinant",
      "Lent au démarrage",
      "Mauvaise hygiène de vie",
      "Relance hasardeuse"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9).",
    "targetRank": 6,
    "league": "Bundesliga",
    "flag": "🇩🇪",
    "tacticalPhilosophy": " Projet Trading & Jeunesse",
    "tacticalTag": "Catenaccio & Verrouillage",
    "preferredTraits": [
      "Pépite U21",
      "Ailier supersonique",
      "Dribbleur déroutant",
      "Finition chirurgicale",
      "Discipline tactique"
    ],
    "targetAgeRule": "u21",
    "originConstraint": {
      "code": "EURO_TACTICAL",
      "name": "Filière Championnats Majeurs (UEFA)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur formé ou aguerri dans les grands championnats européens",
      "ruleDesc": "Le coach privilégie la rigueur tactique, le placement et la lecture de jeu européenne."
    }
  },
  {
    "id": 59,
    "difficulty": "moyen",
    "club": "Valencia Che",
    "country": "🇪🇸 La Liga (Espagne)",
    "logo": "",
    "budget": 38,
    "wages": 5,
    "needs": [
      {
        "code": "GAR",
        "name": "Gardien de But",
        "icon": ""
      },
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "AD",
        "name": "Ailier Droit",
        "icon": ""
      }
    ],
    "coachDemand": "\"On attend le bon moment pour piquer à 200 km/h. Il me faut de la dynamite dans les couloirs et de la verticalité. Nos 3 besoins prioritaires à pourvoir avant minuit : Gardien de But, Défenseur Central, Ailier Droit. Priorité à un profil athlétique et rigoureux issu des championnats nordiques ou d'Europe de l'Est.\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Infatigable",
        "Poumons d'acier",
        "Guerrier"
      ],
      "ATT": [
        "Renard des surfaces",
        "Sens du but",
        "Tueur clinique"
      ]
    },
    "forbiddenTraits": [
      "Déficit technique",
      "Jeu stéréotypé",
      "Tacleur boucher",
      "Lent au démarrage"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Gardien de But, Défenseur Central, Ailier Droit.",
    "targetRank": 6,
    "league": "La Liga",
    "flag": "🇪🇸",
    "tacticalPhilosophy": " Tiki-Taka & Maîtrise",
    "tacticalTag": "Transition Éclair & Contre-Attaque",
    "preferredTraits": [
      "Vision laser",
      "Maestro créatif",
      "Relance propre",
      "Plaque tournante",
      "Dribbleur soyeux",
      "Vitesse supersonique"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "NORDIC_EAST",
      "name": "Réseau Europe du Nord & de l'Est",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des ligues nordiques ou d'Europe de l'Est",
      "ruleDesc": "Détection active sur les championnats scandinaves et d'Europe centrale/orientale."
    }
  },
  {
    "id": 60,
    "difficulty": "moyen",
    "club": "Bournemouth Cherries",
    "country": "󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)",
    "logo": "",
    "budget": 28,
    "wages": 6.5,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_DG_DD",
        "name": "Polyvalent DG / DD",
        "icon": ""
      }
    ],
    "coachDemand": "\"Le ballon est notre meilleur allié. Ceux qui balancent des chandelles vont sur le banc, je veux de la vista et de la finesse. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent DG / DD.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Tacleur féroce",
        "Impact physique",
        "Roc défensif"
      ],
      "MIL": [
        "Vision laser",
        "Maestro du tempo",
        "Passeur laser"
      ]
    },
    "forbiddenTraits": [
      "Lent au démarrage",
      "Passeur latéral stérile",
      "Profil brut non formé"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent DG / DD.",
    "targetRank": 6,
    "league": "Premier League",
    "flag": "󠁧󠁢󠁥󠁮󠁧󠁿",
    "tacticalPhilosophy": " Transition Éclair",
    "tacticalTag": "Tiki-Taka & Jeu de Position",
    "preferredTraits": [
      "Vitesse supersonique",
      "Ailier supersonique",
      "Tueur clinique",
      "Renard des surfaces",
      "Piston moderne",
      "Vision laser"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "FREE",
      "name": "Scouting Libre & Sans Frontières",
      "icon": "",
      "shortDesc": "Aucune restriction géographique imposée",
      "ruleDesc": "Le coach ne regarde que la valeur intrinsèque et l'alchimie tactique."
    }
  },
  {
    "id": 61,
    "difficulty": "moyen",
    "club": "SC Freiburg",
    "country": "🇩🇪 Bundesliga (Allemagne)",
    "logo": "",
    "budget": 28,
    "wages": 8,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_DEUX_AILES",
        "name": "Polyvalent Deux Ailes (AG / AD)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Ici on joue avec les tripes. Je refuse catégoriquement les divas et les égos surdimensionnés. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent Deux Ailes (AG / AD). Objectif de conformité : intégrer au moins un joueur formé localement (quota national).\"",
    "expectedTraitsByPos": {
      "GAR": [
        "Arrêts miracles",
        "Réflexes félins",
        "Mains de fer"
      ],
      "ATT": [
        "Tueur clinique",
        "Sens du but",
        "Renard des surfaces"
      ]
    },
    "forbiddenTraits": [
      "Vétéran déclinant",
      "Lent au démarrage",
      "Mauvaise hygiène de vie",
      "Égo surdimensionné"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent Deux Ailes (AG / AD).",
    "targetRank": 6,
    "league": "Bundesliga",
    "flag": "🇩🇪",
    "tacticalPhilosophy": " Projet Trading & Jeunesse",
    "tacticalTag": "Meneur d'Hommes & Sang Chaud",
    "preferredTraits": [
      "Pépite U21",
      "Ailier supersonique",
      "Dribbleur déroutant",
      "Finition chirurgicale",
      "Leader vocal"
    ],
    "targetAgeRule": "u21",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 recrue du même pays",
      "ruleDesc": "Le coach tient à l'identité locale du club et exige au moins un renfort national."
    }
  },
  {
    "id": 62,
    "difficulty": "moyen",
    "club": "Brest Pirates",
    "country": "🇫🇷 Ligue 1 (France)",
    "logo": "",
    "budget": 32,
    "wages": 5,
    "needs": [
      {
        "code": "DG",
        "name": "Latéral Gauche",
        "icon": ""
      },
      {
        "code": "MC",
        "name": "Milieu Relayeur (8)",
        "icon": ""
      },
      {
        "code": "AG",
        "name": "Ailier Gauche",
        "icon": ""
      }
    ],
    "coachDemand": "\"Place à l'audace ! Je préfère un jeune mort de faim qu'un nom ronflant en préretraite. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche. La direction sportive cible au moins un renfort issu du vivier sud-américain (CONMEBOL).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Roc défensif",
        "Tacleur féroce"
      ],
      "ATT": [
        "Vitesse supersonique",
        "Accélération foudroyante",
        "Dribbles chaloupés"
      ]
    },
    "forbiddenTraits": [
      "Déficit technique",
      "Jeu stéréotypé",
      "Tacleur boucher",
      "Vétéran cramé"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche.",
    "targetRank": 6,
    "league": "Ligue 1",
    "flag": "🇫🇷",
    "tacticalPhilosophy": " Tiki-Taka & Maîtrise",
    "tacticalTag": "Pari Jeunesse & Pépites",
    "preferredTraits": [
      "Vision laser",
      "Maestro créatif",
      "Relance propre",
      "Plaque tournante",
      "Dribbleur soyeux",
      "Jeune prodige"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "SOUTH_AMERICA",
      "name": "Réseau Amérique du Sud (CONMEBOL)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu du vivier sud-américain (Brésil, Argentine...)",
      "ruleDesc": "La cellule de détection cible en priorité les championnats sud-américains."
    }
  },
  {
    "id": 63,
    "difficulty": "moyen",
    "club": "Genoa Grifone",
    "country": "🇮🇹 Serie A (Italie)",
    "logo": "",
    "budget": 35,
    "wages": 6.5,
    "needs": [
      {
        "code": "DD",
        "name": "Latéral Droit",
        "icon": ""
      },
      {
        "code": "MDF",
        "name": "Sentinelle (6)",
        "icon": ""
      },
      {
        "code": "PEPITE_U21",
        "name": "Pépite U21 (-21 ans)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Chaque match est une bataille tactique pour assurer notre maintien. Il me faut des joueurs avec un gros volume de jeu et une vraie solidité dans les duels. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans). La cellule de scouting recommande d'activer notre filière de recrutement sur les championnats africains.\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Infatigable",
        "Poumons d'acier",
        "Guerrier"
      ],
      "ATT": [
        "Renard des surfaces",
        "Sens du but",
        "Tueur clinique"
      ]
    },
    "forbiddenTraits": [
      "Lent au démarrage",
      "Passeur latéral stérile",
      "Discret dans les grands matchs"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans).",
    "targetRank": 6,
    "league": "Serie A",
    "flag": "🇮🇹",
    "tacticalPhilosophy": " Transition Éclair",
    "tacticalTag": "Pragmatisme du Maintien",
    "preferredTraits": [
      "Vitesse supersonique",
      "Ailier supersonique",
      "Tueur clinique",
      "Renard des surfaces",
      "Piston moderne",
      "Impact physique"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "AFRICA",
      "name": "Réseau Afrique (Partenariats CAF)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des académies ou sélections africaines",
      "ruleDesc": "Priorité accordée aux partenariats de scouting établis sur le continent africain."
    }
  },
  {
    "id": 64,
    "difficulty": "moyen",
    "club": "Augsburg Fugger",
    "country": "🇩🇪 Bundesliga (Allemagne)",
    "logo": "",
    "budget": 38,
    "wages": 8,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "MO",
        "name": "Meneur de Jeu (10)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Je préfère gagner 4-3 que 1-0. Apportez-moi de la percussion, du culot et des frappes chirurgicales. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9). Expérience requise au sein des championnats majeurs européens pour une adaptation immédiate.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Tacleur féroce",
        "Impact physique",
        "Roc défensif"
      ],
      "MIL": [
        "Vision laser",
        "Maestro du tempo",
        "Passeur laser"
      ]
    },
    "forbiddenTraits": [
      "Vétéran déclinant",
      "Lent au démarrage",
      "Mauvaise hygiène de vie",
      "Capricieux sous pression"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9).",
    "targetRank": 6,
    "league": "Bundesliga",
    "flag": "🇩🇪",
    "tacticalPhilosophy": " Projet Trading & Jeunesse",
    "tacticalTag": "Folie Offensive Champagne",
    "preferredTraits": [
      "Pépite U21",
      "Ailier supersonique",
      "Dribbleur déroutant",
      "Finition chirurgicale",
      "Tueur clinique"
    ],
    "targetAgeRule": "u21",
    "originConstraint": {
      "code": "EURO_TACTICAL",
      "name": "Filière Championnats Majeurs (UEFA)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur formé ou aguerri dans les grands championnats européens",
      "ruleDesc": "Le coach privilégie la rigueur tactique, le placement et la lecture de jeu européenne."
    }
  },
  {
    "id": 65,
    "difficulty": "moyen",
    "club": "Mallorca Barralets",
    "country": "🇪🇸 La Liga (Espagne)",
    "logo": "",
    "budget": 28,
    "wages": 5,
    "needs": [
      {
        "code": "GAR",
        "name": "Gardien de But",
        "icon": ""
      },
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "AD",
        "name": "Ailier Droit",
        "icon": ""
      }
    ],
    "coachDemand": "\"Zéro touriste sur le pré ! Je veux du contre-pressing immédiat à la perte et des poumons d'acier. Nos 3 besoins prioritaires à pourvoir avant minuit : Gardien de But, Défenseur Central, Ailier Droit. Priorité à un profil athlétique et rigoureux issu des championnats nordiques ou d'Europe de l'Est.\"",
    "expectedTraitsByPos": {
      "GAR": [
        "Arrêts miracles",
        "Réflexes félins",
        "Mains de fer"
      ],
      "ATT": [
        "Tueur clinique",
        "Sens du but",
        "Renard des surfaces"
      ]
    },
    "forbiddenTraits": [
      "Déficit technique",
      "Jeu stéréotypé",
      "Tacleur boucher",
      "Allergique au repli"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Gardien de But, Défenseur Central, Ailier Droit.",
    "targetRank": 6,
    "league": "La Liga",
    "flag": "🇪🇸",
    "tacticalPhilosophy": " Tiki-Taka & Maîtrise",
    "tacticalTag": "Gegenpressing & Intensité",
    "preferredTraits": [
      "Vision laser",
      "Maestro créatif",
      "Relance propre",
      "Plaque tournante",
      "Dribbleur soyeux",
      "Infatigable"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "NORDIC_EAST",
      "name": "Réseau Europe du Nord & de l'Est",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des ligues nordiques ou d'Europe de l'Est",
      "ruleDesc": "Détection active sur les championnats scandinaves et d'Europe centrale/orientale."
    }
  },
  {
    "id": 66,
    "difficulty": "moyen",
    "club": "Toulouse Violettes",
    "country": "🇫🇷 Ligue 1 (France)",
    "logo": "",
    "budget": 28,
    "wages": 6.5,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_DEUX_AILES",
        "name": "Polyvalent Deux Ailes (AG / AD)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Un championnat se gagne par la défense. On cadenasse l'axe, on gagne les duels et on ne concède rien. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent Deux Ailes (AG / AD).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Roc défensif",
        "Tacleur féroce"
      ],
      "ATT": [
        "Vitesse supersonique",
        "Accélération foudroyante",
        "Dribbles chaloupés"
      ]
    },
    "forbiddenTraits": [
      "Lent au démarrage",
      "Passeur latéral stérile",
      "Relance hasardeuse"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent Deux Ailes (AG / AD).",
    "targetRank": 6,
    "league": "Ligue 1",
    "flag": "🇫🇷",
    "tacticalPhilosophy": " Transition Éclair",
    "tacticalTag": "Catenaccio & Verrouillage",
    "preferredTraits": [
      "Vitesse supersonique",
      "Ailier supersonique",
      "Tueur clinique",
      "Renard des surfaces",
      "Piston moderne",
      "Discipline tactique"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "FREE",
      "name": "Scouting Libre & Sans Frontières",
      "icon": "",
      "shortDesc": "Aucune restriction géographique imposée",
      "ruleDesc": "Le coach ne regarde que la valeur intrinsèque et l'alchimie tactique."
    }
  },
  {
    "id": 67,
    "difficulty": "moyen",
    "club": "Union Berlin",
    "country": "🇩🇪 Bundesliga (Allemagne)",
    "logo": "",
    "budget": 32,
    "wages": 8,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_ATTAQUE",
        "name": "Polyvalent Buteur / Ailier",
        "icon": ""
      }
    ],
    "coachDemand": "\"On attend le bon moment pour piquer à 200 km/h. Il me faut de la dynamite dans les couloirs et de la verticalité. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent Buteur / Ailier. Objectif de conformité : intégrer au moins un joueur formé localement (quota national).\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Infatigable",
        "Poumons d'acier",
        "Guerrier"
      ],
      "ATT": [
        "Renard des surfaces",
        "Sens du but",
        "Tueur clinique"
      ]
    },
    "forbiddenTraits": [
      "Vétéran déclinant",
      "Lent au démarrage",
      "Mauvaise hygiène de vie"
    ],
    "objective": "Top 6 & Qualification Européenne",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent Buteur / Ailier.",
    "targetRank": 6,
    "league": "Bundesliga",
    "flag": "🇩🇪",
    "tacticalPhilosophy": " Projet Trading & Jeunesse",
    "tacticalTag": "Transition Éclair & Contre-Attaque",
    "preferredTraits": [
      "Pépite U21",
      "Ailier supersonique",
      "Dribbleur déroutant",
      "Finition chirurgicale",
      "Vitesse supersonique"
    ],
    "targetAgeRule": "u21",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 recrue du même pays",
      "ruleDesc": "Le coach tient à l'identité locale du club et exige au moins un renfort national."
    }
  },
  {
    "id": 68,
    "difficulty": "difficile",
    "club": "Red Star Saint-Ouen",
    "country": "🇫🇷 Ligue 1 (France)",
    "logo": "",
    "budget": 5.5,
    "wages": 1.8,
    "needs": [
      {
        "code": "DG",
        "name": "Latéral Gauche",
        "icon": ""
      },
      {
        "code": "MC",
        "name": "Milieu Relayeur (8)",
        "icon": ""
      },
      {
        "code": "AG",
        "name": "Ailier Gauche",
        "icon": ""
      }
    ],
    "coachDemand": "\"Le ballon est notre meilleur allié. Ceux qui balancent des chandelles vont sur le banc, je veux de la vista et de la finesse. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche. La direction sportive cible au moins un renfort issu du vivier sud-américain (CONMEBOL).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Tacleur féroce",
        "Impact physique",
        "Roc défensif"
      ],
      "MIL": [
        "Vision laser",
        "Maestro du tempo",
        "Passeur laser"
      ]
    },
    "forbiddenTraits": [
      "Fragilité musculaire",
      "Fêtard invétéré",
      "Individualiste",
      "Profil brut non formé"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche.",
    "targetRank": 16,
    "league": "Ligue 1",
    "flag": "🇫🇷",
    "tacticalPhilosophy": " Catenaccio & Bloc Bas",
    "tacticalTag": "Tiki-Taka & Jeu de Position",
    "preferredTraits": [
      "Roc défensif",
      "Tacleur féroce",
      "Discipline tactique",
      "Infatigable",
      "Patron aérien",
      "Vision laser"
    ],
    "targetAgeRule": "mature",
    "originConstraint": {
      "code": "SOUTH_AMERICA",
      "name": "Réseau Amérique du Sud (CONMEBOL)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu du vivier sud-américain (Brésil, Argentine...)",
      "ruleDesc": "La cellule de détection cible en priorité les championnats sud-américains."
    }
  },
  {
    "id": 69,
    "difficulty": "difficile",
    "club": "Luton Brick Miners",
    "country": "󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)",
    "logo": "",
    "budget": 6,
    "wages": 1.8,
    "needs": [
      {
        "code": "DD",
        "name": "Latéral Droit",
        "icon": ""
      },
      {
        "code": "MDF",
        "name": "Sentinelle (6)",
        "icon": ""
      },
      {
        "code": "PEPITE_U21",
        "name": "Pépite U21 (-21 ans)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Ici on joue avec les tripes. Je refuse catégoriquement les divas et les égos surdimensionnés. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans). La cellule de scouting recommande d'activer notre filière de recrutement sur les championnats africains.\"",
    "expectedTraitsByPos": {
      "GAR": [
        "Arrêts miracles",
        "Réflexes félins",
        "Mains de fer"
      ],
      "ATT": [
        "Tueur clinique",
        "Sens du but",
        "Renard des surfaces"
      ]
    },
    "forbiddenTraits": [
      "Lent au démarrage",
      "Passeur latéral stérile",
      "Égo surdimensionné"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans).",
    "targetRank": 16,
    "league": "Premier League",
    "flag": "󠁧󠁢󠁥󠁮󠁧󠁿",
    "tacticalPhilosophy": " Transition Éclair",
    "tacticalTag": "Meneur d'Hommes & Sang Chaud",
    "preferredTraits": [
      "Vitesse supersonique",
      "Ailier supersonique",
      "Tueur clinique",
      "Renard des surfaces",
      "Piston moderne",
      "Leader vocal"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "AFRICA",
      "name": "Réseau Afrique (Partenariats CAF)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des académies ou sélections africaines",
      "ruleDesc": "Priorité accordée aux partenariats de scouting établis sur le continent africain."
    }
  },
  {
    "id": 70,
    "difficulty": "difficile",
    "club": "Cadiz Piratas",
    "country": "🇪🇸 La Liga (Espagne)",
    "logo": "",
    "budget": 6.2,
    "wages": 1.8,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "MO",
        "name": "Meneur de Jeu (10)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Place à l'audace ! Je préfère un jeune mort de faim qu'un nom ronflant en préretraite. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9). Expérience requise au sein des championnats majeurs européens pour une adaptation immédiate.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Roc défensif",
        "Tacleur féroce"
      ],
      "ATT": [
        "Vitesse supersonique",
        "Accélération foudroyante",
        "Dribbles chaloupés"
      ]
    },
    "forbiddenTraits": [
      "Fêtard invétéré",
      "Discret dans les grands matchs",
      "Mercenaire",
      "Vétéran cramé"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9).",
    "targetRank": 16,
    "league": "La Liga",
    "flag": "🇪🇸",
    "tacticalPhilosophy": "️ Commando Maintien",
    "tacticalTag": "Pari Jeunesse & Pépites",
    "preferredTraits": [
      "Leader vocal",
      "Solide au duel",
      "Collectif avant tout",
      "Gros volume de jeu",
      "Leader de vestiaire",
      "Jeune prodige"
    ],
    "targetAgeRule": "mature",
    "originConstraint": {
      "code": "EURO_TACTICAL",
      "name": "Filière Championnats Majeurs (UEFA)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur formé ou aguerri dans les grands championnats européens",
      "ruleDesc": "Le coach privilégie la rigueur tactique, le placement et la lecture de jeu européenne."
    }
  },
  {
    "id": 71,
    "difficulty": "difficile",
    "club": "Darmstadt Lilies",
    "country": "🇩🇪 Bundesliga (Allemagne)",
    "logo": "",
    "budget": 6.5,
    "wages": 1.8,
    "needs": [
      {
        "code": "GAR",
        "name": "Gardien de But",
        "icon": ""
      },
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "AD",
        "name": "Ailier Droit",
        "icon": ""
      }
    ],
    "coachDemand": "\"Chaque match est une bataille tactique pour assurer notre maintien. Il me faut des joueurs avec un gros volume de jeu et une vraie solidité dans les duels. Nos 3 besoins prioritaires à pourvoir avant minuit : Gardien de But, Défenseur Central, Ailier Droit. Priorité à un profil athlétique et rigoureux issu des championnats nordiques ou d'Europe de l'Est.\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Infatigable",
        "Poumons d'acier",
        "Guerrier"
      ],
      "ATT": [
        "Renard des surfaces",
        "Sens du but",
        "Tueur clinique"
      ]
    },
    "forbiddenTraits": [
      "Fragilité musculaire",
      "Fêtard invétéré",
      "Individualiste",
      "Discret dans les grands matchs"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Gardien de But, Défenseur Central, Ailier Droit.",
    "targetRank": 16,
    "league": "Bundesliga",
    "flag": "🇩🇪",
    "tacticalPhilosophy": " Catenaccio & Bloc Bas",
    "tacticalTag": "Pragmatisme du Maintien",
    "preferredTraits": [
      "Roc défensif",
      "Tacleur féroce",
      "Discipline tactique",
      "Infatigable",
      "Patron aérien",
      "Impact physique"
    ],
    "targetAgeRule": "mature",
    "originConstraint": {
      "code": "NORDIC_EAST",
      "name": "Réseau Europe du Nord & de l'Est",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des ligues nordiques ou d'Europe de l'Est",
      "ruleDesc": "Détection active sur les championnats scandinaves et d'Europe centrale/orientale."
    }
  },
  {
    "id": 72,
    "difficulty": "difficile",
    "club": "Salernitana Granata",
    "country": "🇮🇹 Serie A (Italie)",
    "logo": "",
    "budget": 6.8,
    "wages": 1.9,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_DG_DD",
        "name": "Polyvalent DG / DD",
        "icon": ""
      }
    ],
    "coachDemand": "\"Je préfère gagner 4-3 que 1-0. Apportez-moi de la percussion, du culot et des frappes chirurgicales. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent DG / DD.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Tacleur féroce",
        "Impact physique",
        "Roc défensif"
      ],
      "MIL": [
        "Vision laser",
        "Maestro du tempo",
        "Passeur laser"
      ]
    },
    "forbiddenTraits": [
      "Lent au démarrage",
      "Passeur latéral stérile",
      "Capricieux sous pression"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent DG / DD.",
    "targetRank": 16,
    "league": "Serie A",
    "flag": "🇮🇹",
    "tacticalPhilosophy": " Transition Éclair",
    "tacticalTag": "Folie Offensive Champagne",
    "preferredTraits": [
      "Vitesse supersonique",
      "Ailier supersonique",
      "Tueur clinique",
      "Renard des surfaces",
      "Piston moderne"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "FREE",
      "name": "Scouting Libre & Sans Frontières",
      "icon": "",
      "shortDesc": "Aucune restriction géographique imposée",
      "ruleDesc": "Le coach ne regarde que la valeur intrinsèque et l'alchimie tactique."
    }
  },
  {
    "id": 73,
    "difficulty": "difficile",
    "club": "Le Havre Doyens",
    "country": "🇫🇷 Ligue 1 (France)",
    "logo": "",
    "budget": 7,
    "wages": 2,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_6_DC",
        "name": "Polyvalent 6 & DC",
        "icon": ""
      }
    ],
    "coachDemand": "\"Zéro touriste sur le pré ! Je veux du contre-pressing immédiat à la perte et des poumons d'acier. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent 6 & DC. Objectif de conformité : intégrer au moins un joueur formé localement (quota national).\"",
    "expectedTraitsByPos": {
      "GAR": [
        "Arrêts miracles",
        "Réflexes félins",
        "Mains de fer"
      ],
      "ATT": [
        "Tueur clinique",
        "Sens du but",
        "Renard des surfaces"
      ]
    },
    "forbiddenTraits": [
      "Fêtard invétéré",
      "Discret dans les grands matchs",
      "Mercenaire",
      "Allergique au repli"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent 6 & DC.",
    "targetRank": 16,
    "league": "Ligue 1",
    "flag": "🇫🇷",
    "tacticalPhilosophy": "️ Commando Maintien",
    "tacticalTag": "Gegenpressing & Intensité",
    "preferredTraits": [
      "Leader vocal",
      "Solide au duel",
      "Collectif avant tout",
      "Gros volume de jeu",
      "Leader de vestiaire",
      "Infatigable"
    ],
    "targetAgeRule": "mature",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 recrue du même pays",
      "ruleDesc": "Le coach tient à l'identité locale du club et exige au moins un renfort national."
    }
  },
  {
    "id": 74,
    "difficulty": "difficile",
    "club": "Sheffield Steel",
    "country": "󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)",
    "logo": "",
    "budget": 7.2,
    "wages": 2,
    "needs": [
      {
        "code": "DG",
        "name": "Latéral Gauche",
        "icon": ""
      },
      {
        "code": "MC",
        "name": "Milieu Relayeur (8)",
        "icon": ""
      },
      {
        "code": "AG",
        "name": "Ailier Gauche",
        "icon": ""
      }
    ],
    "coachDemand": "\"Un championnat se gagne par la défense. On cadenasse l'axe, on gagne les duels et on ne concède rien. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche. La direction sportive cible au moins un renfort issu du vivier sud-américain (CONMEBOL).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Roc défensif",
        "Tacleur féroce"
      ],
      "ATT": [
        "Vitesse supersonique",
        "Accélération foudroyante",
        "Dribbles chaloupés"
      ]
    },
    "forbiddenTraits": [
      "Fragilité musculaire",
      "Fêtard invétéré",
      "Individualiste",
      "Relance hasardeuse"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche.",
    "targetRank": 16,
    "league": "Premier League",
    "flag": "󠁧󠁢󠁥󠁮󠁧󠁿",
    "tacticalPhilosophy": " Catenaccio & Bloc Bas",
    "tacticalTag": "Catenaccio & Verrouillage",
    "preferredTraits": [
      "Roc défensif",
      "Tacleur féroce",
      "Discipline tactique",
      "Infatigable",
      "Patron aérien"
    ],
    "targetAgeRule": "mature",
    "originConstraint": {
      "code": "SOUTH_AMERICA",
      "name": "Réseau Amérique du Sud (CONMEBOL)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu du vivier sud-américain (Brésil, Argentine...)",
      "ruleDesc": "La cellule de détection cible en priorité les championnats sud-américains."
    }
  },
  {
    "id": 75,
    "difficulty": "difficile",
    "club": "Frosinone Calcio",
    "country": "🇮🇹 Serie A (Italie)",
    "logo": "",
    "budget": 7.5,
    "wages": 2.1,
    "needs": [
      {
        "code": "DD",
        "name": "Latéral Droit",
        "icon": ""
      },
      {
        "code": "MDF",
        "name": "Sentinelle (6)",
        "icon": ""
      },
      {
        "code": "PEPITE_U21",
        "name": "Pépite U21 (-21 ans)",
        "icon": ""
      }
    ],
    "coachDemand": "\"On attend le bon moment pour piquer à 200 km/h. Il me faut de la dynamite dans les couloirs et de la verticalité. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans). La cellule de scouting recommande d'activer notre filière de recrutement sur les championnats africains.\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Infatigable",
        "Poumons d'acier",
        "Guerrier"
      ],
      "ATT": [
        "Renard des surfaces",
        "Sens du but",
        "Tueur clinique"
      ]
    },
    "forbiddenTraits": [
      "Lent au démarrage",
      "Passeur latéral stérile"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans).",
    "targetRank": 16,
    "league": "Serie A",
    "flag": "🇮🇹",
    "tacticalPhilosophy": " Transition Éclair",
    "tacticalTag": "Transition Éclair & Contre-Attaque",
    "preferredTraits": [
      "Vitesse supersonique",
      "Ailier supersonique",
      "Tueur clinique",
      "Renard des surfaces",
      "Piston moderne"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "AFRICA",
      "name": "Réseau Afrique (Partenariats CAF)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des académies ou sélections africaines",
      "ruleDesc": "Priorité accordée aux partenariats de scouting établis sur le continent africain."
    }
  },
  {
    "id": 76,
    "difficulty": "difficile",
    "club": "Heidenheim Schloss",
    "country": "🇩🇪 Bundesliga (Allemagne)",
    "logo": "",
    "budget": 7.8,
    "wages": 2.2,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "MO",
        "name": "Meneur de Jeu (10)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Le ballon est notre meilleur allié. Ceux qui balancent des chandelles vont sur le banc, je veux de la vista et de la finesse. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9). Expérience requise au sein des championnats majeurs européens pour une adaptation immédiate.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Tacleur féroce",
        "Impact physique",
        "Roc défensif"
      ],
      "MIL": [
        "Vision laser",
        "Maestro du tempo",
        "Passeur laser"
      ]
    },
    "forbiddenTraits": [
      "Fêtard invétéré",
      "Discret dans les grands matchs",
      "Mercenaire",
      "Profil brut non formé"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9).",
    "targetRank": 16,
    "league": "Bundesliga",
    "flag": "🇩🇪",
    "tacticalPhilosophy": "️ Commando Maintien",
    "tacticalTag": "Tiki-Taka & Jeu de Position",
    "preferredTraits": [
      "Leader vocal",
      "Solide au duel",
      "Collectif avant tout",
      "Gros volume de jeu",
      "Leader de vestiaire",
      "Vision laser"
    ],
    "targetAgeRule": "mature",
    "originConstraint": {
      "code": "EURO_TACTICAL",
      "name": "Filière Championnats Majeurs (UEFA)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur formé ou aguerri dans les grands championnats européens",
      "ruleDesc": "Le coach privilégie la rigueur tactique, le placement et la lecture de jeu européenne."
    }
  },
  {
    "id": 77,
    "difficulty": "difficile",
    "club": "Almeria Indalicos",
    "country": "🇪🇸 La Liga (Espagne)",
    "logo": "",
    "budget": 8,
    "wages": 2.2,
    "needs": [
      {
        "code": "GAR",
        "name": "Gardien de But",
        "icon": ""
      },
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "AD",
        "name": "Ailier Droit",
        "icon": ""
      }
    ],
    "coachDemand": "\"Ici on joue avec les tripes. Je refuse catégoriquement les divas et les égos surdimensionnés. Nos 3 besoins prioritaires à pourvoir avant minuit : Gardien de But, Défenseur Central, Ailier Droit. Priorité à un profil athlétique et rigoureux issu des championnats nordiques ou d'Europe de l'Est.\"",
    "expectedTraitsByPos": {
      "GAR": [
        "Arrêts miracles",
        "Réflexes félins",
        "Mains de fer"
      ],
      "ATT": [
        "Tueur clinique",
        "Sens du but",
        "Renard des surfaces"
      ]
    },
    "forbiddenTraits": [
      "Fragilité musculaire",
      "Fêtard invétéré",
      "Individualiste",
      "Égo surdimensionné"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Gardien de But, Défenseur Central, Ailier Droit.",
    "targetRank": 16,
    "league": "La Liga",
    "flag": "🇪🇸",
    "tacticalPhilosophy": " Catenaccio & Bloc Bas",
    "tacticalTag": "Meneur d'Hommes & Sang Chaud",
    "preferredTraits": [
      "Roc défensif",
      "Tacleur féroce",
      "Discipline tactique",
      "Infatigable",
      "Patron aérien",
      "Leader vocal"
    ],
    "targetAgeRule": "mature",
    "originConstraint": {
      "code": "NORDIC_EAST",
      "name": "Réseau Europe du Nord & de l'Est",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des ligues nordiques ou d'Europe de l'Est",
      "ruleDesc": "Détection active sur les championnats scandinaves et d'Europe centrale/orientale."
    }
  },
  {
    "id": 78,
    "difficulty": "difficile",
    "club": "Metz Grenats",
    "country": "🇫🇷 Ligue 1 (France)",
    "logo": "",
    "budget": 8.2,
    "wages": 2.3,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_DEUX_AILES",
        "name": "Polyvalent Deux Ailes (AG / AD)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Place à l'audace ! Je préfère un jeune mort de faim qu'un nom ronflant en préretraite. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent Deux Ailes (AG / AD).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Roc défensif",
        "Tacleur féroce"
      ],
      "ATT": [
        "Vitesse supersonique",
        "Accélération foudroyante",
        "Dribbles chaloupés"
      ]
    },
    "forbiddenTraits": [
      "Lent au démarrage",
      "Passeur latéral stérile",
      "Vétéran cramé"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent Deux Ailes (AG / AD).",
    "targetRank": 16,
    "league": "Ligue 1",
    "flag": "🇫🇷",
    "tacticalPhilosophy": " Transition Éclair",
    "tacticalTag": "Pari Jeunesse & Pépites",
    "preferredTraits": [
      "Vitesse supersonique",
      "Ailier supersonique",
      "Tueur clinique",
      "Renard des surfaces",
      "Piston moderne",
      "Jeune prodige"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "FREE",
      "name": "Scouting Libre & Sans Frontières",
      "icon": "",
      "shortDesc": "Aucune restriction géographique imposée",
      "ruleDesc": "Le coach ne regarde que la valeur intrinsèque et l'alchimie tactique."
    }
  },
  {
    "id": 79,
    "difficulty": "difficile",
    "club": "Burnley Turf",
    "country": "󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)",
    "logo": "",
    "budget": 8.5,
    "wages": 2.4,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_DG_DD",
        "name": "Polyvalent DG / DD",
        "icon": ""
      }
    ],
    "coachDemand": "\"Chaque match est une bataille tactique pour assurer notre maintien. Il me faut des joueurs avec un gros volume de jeu et une vraie solidité dans les duels. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent DG / DD. Objectif de conformité : intégrer au moins un joueur formé localement (quota national).\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Infatigable",
        "Poumons d'acier",
        "Guerrier"
      ],
      "ATT": [
        "Renard des surfaces",
        "Sens du but",
        "Tueur clinique"
      ]
    },
    "forbiddenTraits": [
      "Fêtard invétéré",
      "Discret dans les grands matchs",
      "Mercenaire"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent DG / DD.",
    "targetRank": 16,
    "league": "Premier League",
    "flag": "󠁧󠁢󠁥󠁮󠁧󠁿",
    "tacticalPhilosophy": "️ Commando Maintien",
    "tacticalTag": "Pragmatisme du Maintien",
    "preferredTraits": [
      "Leader vocal",
      "Solide au duel",
      "Collectif avant tout",
      "Gros volume de jeu",
      "Leader de vestiaire",
      "Impact physique"
    ],
    "targetAgeRule": "mature",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 recrue du même pays",
      "ruleDesc": "Le coach tient à l'identité locale du club et exige au moins un renfort national."
    }
  },
  {
    "id": 80,
    "difficulty": "difficile",
    "club": "Granada Nazaries",
    "country": "🇪🇸 La Liga (Espagne)",
    "logo": "",
    "budget": 8.8,
    "wages": 2.5,
    "needs": [
      {
        "code": "DG",
        "name": "Latéral Gauche",
        "icon": ""
      },
      {
        "code": "MC",
        "name": "Milieu Relayeur (8)",
        "icon": ""
      },
      {
        "code": "AG",
        "name": "Ailier Gauche",
        "icon": ""
      }
    ],
    "coachDemand": "\"Je préfère gagner 4-3 que 1-0. Apportez-moi de la percussion, du culot et des frappes chirurgicales. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche. La direction sportive cible au moins un renfort issu du vivier sud-américain (CONMEBOL).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Tacleur féroce",
        "Impact physique",
        "Roc défensif"
      ],
      "MIL": [
        "Vision laser",
        "Maestro du tempo",
        "Passeur laser"
      ]
    },
    "forbiddenTraits": [
      "Fragilité musculaire",
      "Fêtard invétéré",
      "Individualiste",
      "Capricieux sous pression"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche.",
    "targetRank": 16,
    "league": "La Liga",
    "flag": "🇪🇸",
    "tacticalPhilosophy": " Catenaccio & Bloc Bas",
    "tacticalTag": "Folie Offensive Champagne",
    "preferredTraits": [
      "Roc défensif",
      "Tacleur féroce",
      "Discipline tactique",
      "Infatigable",
      "Patron aérien",
      "Tueur clinique"
    ],
    "targetAgeRule": "mature",
    "originConstraint": {
      "code": "SOUTH_AMERICA",
      "name": "Réseau Amérique du Sud (CONMEBOL)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu du vivier sud-américain (Brésil, Argentine...)",
      "ruleDesc": "La cellule de détection cible en priorité les championnats sud-américains."
    }
  },
  {
    "id": 81,
    "difficulty": "difficile",
    "club": "Empoli Azzurri",
    "country": "🇮🇹 Serie A (Italie)",
    "logo": "",
    "budget": 9,
    "wages": 2.5,
    "needs": [
      {
        "code": "DD",
        "name": "Latéral Droit",
        "icon": ""
      },
      {
        "code": "MDF",
        "name": "Sentinelle (6)",
        "icon": ""
      },
      {
        "code": "PEPITE_U21",
        "name": "Pépite U21 (-21 ans)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Zéro touriste sur le pré ! Je veux du contre-pressing immédiat à la perte et des poumons d'acier. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans). La cellule de scouting recommande d'activer notre filière de recrutement sur les championnats africains.\"",
    "expectedTraitsByPos": {
      "GAR": [
        "Arrêts miracles",
        "Réflexes félins",
        "Mains de fer"
      ],
      "ATT": [
        "Tueur clinique",
        "Sens du but",
        "Renard des surfaces"
      ]
    },
    "forbiddenTraits": [
      "Lent au démarrage",
      "Passeur latéral stérile",
      "Allergique au repli"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans).",
    "targetRank": 16,
    "league": "Serie A",
    "flag": "🇮🇹",
    "tacticalPhilosophy": " Transition Éclair",
    "tacticalTag": "Gegenpressing & Intensité",
    "preferredTraits": [
      "Vitesse supersonique",
      "Ailier supersonique",
      "Tueur clinique",
      "Renard des surfaces",
      "Piston moderne",
      "Infatigable"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "AFRICA",
      "name": "Réseau Afrique (Partenariats CAF)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des académies ou sélections africaines",
      "ruleDesc": "Priorité accordée aux partenariats de scouting établis sur le continent africain."
    }
  },
  {
    "id": 82,
    "difficulty": "difficile",
    "club": "Bochum Ruhr",
    "country": "🇩🇪 Bundesliga (Allemagne)",
    "logo": "",
    "budget": 9.2,
    "wages": 2.6,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "MO",
        "name": "Meneur de Jeu (10)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Un championnat se gagne par la défense. On cadenasse l'axe, on gagne les duels et on ne concède rien. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9). Expérience requise au sein des championnats majeurs européens pour une adaptation immédiate.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Roc défensif",
        "Tacleur féroce"
      ],
      "ATT": [
        "Vitesse supersonique",
        "Accélération foudroyante",
        "Dribbles chaloupés"
      ]
    },
    "forbiddenTraits": [
      "Fêtard invétéré",
      "Discret dans les grands matchs",
      "Mercenaire",
      "Relance hasardeuse"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9).",
    "targetRank": 16,
    "league": "Bundesliga",
    "flag": "🇩🇪",
    "tacticalPhilosophy": "️ Commando Maintien",
    "tacticalTag": "Catenaccio & Verrouillage",
    "preferredTraits": [
      "Leader vocal",
      "Solide au duel",
      "Collectif avant tout",
      "Gros volume de jeu",
      "Leader de vestiaire",
      "Discipline tactique"
    ],
    "targetAgeRule": "mature",
    "originConstraint": {
      "code": "EURO_TACTICAL",
      "name": "Filière Championnats Majeurs (UEFA)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur formé ou aguerri dans les grands championnats européens",
      "ruleDesc": "Le coach privilégie la rigueur tactique, le placement et la lecture de jeu européenne."
    }
  },
  {
    "id": 83,
    "difficulty": "difficile",
    "club": "Clermont Foot",
    "country": "🇫🇷 Ligue 1 (France)",
    "logo": "",
    "budget": 9.5,
    "wages": 2.7,
    "needs": [
      {
        "code": "GAR",
        "name": "Gardien de But",
        "icon": ""
      },
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "AD",
        "name": "Ailier Droit",
        "icon": ""
      }
    ],
    "coachDemand": "\"On attend le bon moment pour piquer à 200 km/h. Il me faut de la dynamite dans les couloirs et de la verticalité. Nos 3 besoins prioritaires à pourvoir avant minuit : Gardien de But, Défenseur Central, Ailier Droit. Priorité à un profil athlétique et rigoureux issu des championnats nordiques ou d'Europe de l'Est.\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Infatigable",
        "Poumons d'acier",
        "Guerrier"
      ],
      "ATT": [
        "Renard des surfaces",
        "Sens du but",
        "Tueur clinique"
      ]
    },
    "forbiddenTraits": [
      "Fragilité musculaire",
      "Fêtard invétéré",
      "Individualiste",
      "Lent au démarrage"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Gardien de But, Défenseur Central, Ailier Droit.",
    "targetRank": 16,
    "league": "Ligue 1",
    "flag": "🇫🇷",
    "tacticalPhilosophy": " Catenaccio & Bloc Bas",
    "tacticalTag": "Transition Éclair & Contre-Attaque",
    "preferredTraits": [
      "Roc défensif",
      "Tacleur féroce",
      "Discipline tactique",
      "Infatigable",
      "Patron aérien",
      "Vitesse supersonique"
    ],
    "targetAgeRule": "mature",
    "originConstraint": {
      "code": "NORDIC_EAST",
      "name": "Réseau Europe du Nord & de l'Est",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des ligues nordiques ou d'Europe de l'Est",
      "ruleDesc": "Détection active sur les championnats scandinaves et d'Europe centrale/orientale."
    }
  },
  {
    "id": 84,
    "difficulty": "difficile",
    "club": "Cagliari Sardaigne",
    "country": "🇮🇹 Serie A (Italie)",
    "logo": "",
    "budget": 9.8,
    "wages": 2.7,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_DG_DD",
        "name": "Polyvalent DG / DD",
        "icon": ""
      }
    ],
    "coachDemand": "\"Le ballon est notre meilleur allié. Ceux qui balancent des chandelles vont sur le banc, je veux de la vista et de la finesse. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent DG / DD.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Tacleur féroce",
        "Impact physique",
        "Roc défensif"
      ],
      "MIL": [
        "Vision laser",
        "Maestro du tempo",
        "Passeur laser"
      ]
    },
    "forbiddenTraits": [
      "Lent au démarrage",
      "Passeur latéral stérile",
      "Profil brut non formé"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent DG / DD.",
    "targetRank": 16,
    "league": "Serie A",
    "flag": "🇮🇹",
    "tacticalPhilosophy": " Transition Éclair",
    "tacticalTag": "Tiki-Taka & Jeu de Position",
    "preferredTraits": [
      "Vitesse supersonique",
      "Ailier supersonique",
      "Tueur clinique",
      "Renard des surfaces",
      "Piston moderne",
      "Vision laser"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "FREE",
      "name": "Scouting Libre & Sans Frontières",
      "icon": "",
      "shortDesc": "Aucune restriction géographique imposée",
      "ruleDesc": "Le coach ne regarde que la valeur intrinsèque et l'alchimie tactique."
    }
  },
  {
    "id": 85,
    "difficulty": "difficile",
    "club": "St Pauli Piraten",
    "country": "🇩🇪 Bundesliga (Allemagne)",
    "logo": "",
    "budget": 10,
    "wages": 2.8,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_6_DC",
        "name": "Polyvalent 6 & DC",
        "icon": ""
      }
    ],
    "coachDemand": "\"Ici on joue avec les tripes. Je refuse catégoriquement les divas et les égos surdimensionnés. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent 6 & DC. Objectif de conformité : intégrer au moins un joueur formé localement (quota national).\"",
    "expectedTraitsByPos": {
      "GAR": [
        "Arrêts miracles",
        "Réflexes félins",
        "Mains de fer"
      ],
      "ATT": [
        "Tueur clinique",
        "Sens du but",
        "Renard des surfaces"
      ]
    },
    "forbiddenTraits": [
      "Fêtard invétéré",
      "Discret dans les grands matchs",
      "Mercenaire",
      "Égo surdimensionné"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent 6 & DC.",
    "targetRank": 16,
    "league": "Bundesliga",
    "flag": "🇩🇪",
    "tacticalPhilosophy": "️ Commando Maintien",
    "tacticalTag": "Meneur d'Hommes & Sang Chaud",
    "preferredTraits": [
      "Leader vocal",
      "Solide au duel",
      "Collectif avant tout",
      "Gros volume de jeu",
      "Leader de vestiaire"
    ],
    "targetAgeRule": "mature",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 recrue du même pays",
      "ruleDesc": "Le coach tient à l'identité locale du club et exige au moins un renfort national."
    }
  },
  {
    "id": 86,
    "difficulty": "difficile",
    "club": "Las Palmas Canaries",
    "country": "🇪🇸 La Liga (Espagne)",
    "logo": "",
    "budget": 10.2,
    "wages": 2.9,
    "needs": [
      {
        "code": "DG",
        "name": "Latéral Gauche",
        "icon": ""
      },
      {
        "code": "MC",
        "name": "Milieu Relayeur (8)",
        "icon": ""
      },
      {
        "code": "AG",
        "name": "Ailier Gauche",
        "icon": ""
      }
    ],
    "coachDemand": "\"Place à l'audace ! Je préfère un jeune mort de faim qu'un nom ronflant en préretraite. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche. La direction sportive cible au moins un renfort issu du vivier sud-américain (CONMEBOL).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Roc défensif",
        "Tacleur féroce"
      ],
      "ATT": [
        "Vitesse supersonique",
        "Accélération foudroyante",
        "Dribbles chaloupés"
      ]
    },
    "forbiddenTraits": [
      "Fragilité musculaire",
      "Fêtard invétéré",
      "Individualiste",
      "Vétéran cramé"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche.",
    "targetRank": 16,
    "league": "La Liga",
    "flag": "🇪🇸",
    "tacticalPhilosophy": " Catenaccio & Bloc Bas",
    "tacticalTag": "Pari Jeunesse & Pépites",
    "preferredTraits": [
      "Roc défensif",
      "Tacleur féroce",
      "Discipline tactique",
      "Infatigable",
      "Patron aérien",
      "Jeune prodige"
    ],
    "targetAgeRule": "mature",
    "originConstraint": {
      "code": "SOUTH_AMERICA",
      "name": "Réseau Amérique du Sud (CONMEBOL)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu du vivier sud-américain (Brésil, Argentine...)",
      "ruleDesc": "La cellule de détection cible en priorité les championnats sud-américains."
    }
  },
  {
    "id": 87,
    "difficulty": "difficile",
    "club": "Monza Brianzoli",
    "country": "🇮🇹 Serie A (Italie)",
    "logo": "",
    "budget": 10.5,
    "wages": 2.9,
    "needs": [
      {
        "code": "DD",
        "name": "Latéral Droit",
        "icon": ""
      },
      {
        "code": "MDF",
        "name": "Sentinelle (6)",
        "icon": ""
      },
      {
        "code": "PEPITE_U21",
        "name": "Pépite U21 (-21 ans)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Chaque match est une bataille tactique pour assurer notre maintien. Il me faut des joueurs avec un gros volume de jeu et une vraie solidité dans les duels. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans). La cellule de scouting recommande d'activer notre filière de recrutement sur les championnats africains.\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Infatigable",
        "Poumons d'acier",
        "Guerrier"
      ],
      "ATT": [
        "Renard des surfaces",
        "Sens du but",
        "Tueur clinique"
      ]
    },
    "forbiddenTraits": [
      "Lent au démarrage",
      "Passeur latéral stérile",
      "Discret dans les grands matchs"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans).",
    "targetRank": 16,
    "league": "Serie A",
    "flag": "🇮🇹",
    "tacticalPhilosophy": " Transition Éclair",
    "tacticalTag": "Pragmatisme du Maintien",
    "preferredTraits": [
      "Vitesse supersonique",
      "Ailier supersonique",
      "Tueur clinique",
      "Renard des surfaces",
      "Piston moderne",
      "Impact physique"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "AFRICA",
      "name": "Réseau Afrique (Partenariats CAF)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des académies ou sélections africaines",
      "ruleDesc": "Priorité accordée aux partenariats de scouting établis sur le continent africain."
    }
  },
  {
    "id": 88,
    "difficulty": "difficile",
    "club": "Auxerre Abbé Deschamps",
    "country": "🇫🇷 Ligue 1 (France)",
    "logo": "",
    "budget": 10.8,
    "wages": 3,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "MO",
        "name": "Meneur de Jeu (10)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Je préfère gagner 4-3 que 1-0. Apportez-moi de la percussion, du culot et des frappes chirurgicales. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9). Expérience requise au sein des championnats majeurs européens pour une adaptation immédiate.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Tacleur féroce",
        "Impact physique",
        "Roc défensif"
      ],
      "MIL": [
        "Vision laser",
        "Maestro du tempo",
        "Passeur laser"
      ]
    },
    "forbiddenTraits": [
      "Fêtard invétéré",
      "Discret dans les grands matchs",
      "Mercenaire",
      "Capricieux sous pression"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9).",
    "targetRank": 16,
    "league": "Ligue 1",
    "flag": "🇫🇷",
    "tacticalPhilosophy": "️ Commando Maintien",
    "tacticalTag": "Folie Offensive Champagne",
    "preferredTraits": [
      "Leader vocal",
      "Solide au duel",
      "Collectif avant tout",
      "Gros volume de jeu",
      "Leader de vestiaire",
      "Tueur clinique"
    ],
    "targetAgeRule": "mature",
    "originConstraint": {
      "code": "EURO_TACTICAL",
      "name": "Filière Championnats Majeurs (UEFA)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur formé ou aguerri dans les grands championnats européens",
      "ruleDesc": "Le coach privilégie la rigueur tactique, le placement et la lecture de jeu européenne."
    }
  },
  {
    "id": 89,
    "difficulty": "difficile",
    "club": "Ipswich Tractor",
    "country": "󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)",
    "logo": "",
    "budget": 11,
    "wages": 3.1,
    "needs": [
      {
        "code": "GAR",
        "name": "Gardien de But",
        "icon": ""
      },
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "AD",
        "name": "Ailier Droit",
        "icon": ""
      }
    ],
    "coachDemand": "\"Zéro touriste sur le pré ! Je veux du contre-pressing immédiat à la perte et des poumons d'acier. Nos 3 besoins prioritaires à pourvoir avant minuit : Gardien de But, Défenseur Central, Ailier Droit. Priorité à un profil athlétique et rigoureux issu des championnats nordiques ou d'Europe de l'Est.\"",
    "expectedTraitsByPos": {
      "GAR": [
        "Arrêts miracles",
        "Réflexes félins",
        "Mains de fer"
      ],
      "ATT": [
        "Tueur clinique",
        "Sens du but",
        "Renard des surfaces"
      ]
    },
    "forbiddenTraits": [
      "Fragilité musculaire",
      "Fêtard invétéré",
      "Individualiste",
      "Allergique au repli"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Gardien de But, Défenseur Central, Ailier Droit.",
    "targetRank": 16,
    "league": "Premier League",
    "flag": "󠁧󠁢󠁥󠁮󠁧󠁿",
    "tacticalPhilosophy": " Catenaccio & Bloc Bas",
    "tacticalTag": "Gegenpressing & Intensité",
    "preferredTraits": [
      "Roc défensif",
      "Tacleur féroce",
      "Discipline tactique",
      "Infatigable",
      "Patron aérien"
    ],
    "targetAgeRule": "mature",
    "originConstraint": {
      "code": "NORDIC_EAST",
      "name": "Réseau Europe du Nord & de l'Est",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des ligues nordiques ou d'Europe de l'Est",
      "ruleDesc": "Détection active sur les championnats scandinaves et d'Europe centrale/orientale."
    }
  },
  {
    "id": 90,
    "difficulty": "difficile",
    "club": "Verona Mastini",
    "country": "🇮🇹 Serie A (Italie)",
    "logo": "",
    "budget": 11.2,
    "wages": 3.1,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_DEUX_AILES",
        "name": "Polyvalent Deux Ailes (AG / AD)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Un championnat se gagne par la défense. On cadenasse l'axe, on gagne les duels et on ne concède rien. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent Deux Ailes (AG / AD).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Roc défensif",
        "Tacleur féroce"
      ],
      "ATT": [
        "Vitesse supersonique",
        "Accélération foudroyante",
        "Dribbles chaloupés"
      ]
    },
    "forbiddenTraits": [
      "Lent au démarrage",
      "Passeur latéral stérile",
      "Relance hasardeuse"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent Deux Ailes (AG / AD).",
    "targetRank": 16,
    "league": "Serie A",
    "flag": "🇮🇹",
    "tacticalPhilosophy": " Transition Éclair",
    "tacticalTag": "Catenaccio & Verrouillage",
    "preferredTraits": [
      "Vitesse supersonique",
      "Ailier supersonique",
      "Tueur clinique",
      "Renard des surfaces",
      "Piston moderne",
      "Discipline tactique"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "FREE",
      "name": "Scouting Libre & Sans Frontières",
      "icon": "",
      "shortDesc": "Aucune restriction géographique imposée",
      "ruleDesc": "Le coach ne regarde que la valeur intrinsèque et l'alchimie tactique."
    }
  },
  {
    "id": 91,
    "difficulty": "difficile",
    "club": "Kiel Störche",
    "country": "🇩🇪 Bundesliga (Allemagne)",
    "logo": "",
    "budget": 11.5,
    "wages": 3.2,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_DG_DD",
        "name": "Polyvalent DG / DD",
        "icon": ""
      }
    ],
    "coachDemand": "\"On attend le bon moment pour piquer à 200 km/h. Il me faut de la dynamite dans les couloirs et de la verticalité. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent DG / DD. Objectif de conformité : intégrer au moins un joueur formé localement (quota national).\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Infatigable",
        "Poumons d'acier",
        "Guerrier"
      ],
      "ATT": [
        "Renard des surfaces",
        "Sens du but",
        "Tueur clinique"
      ]
    },
    "forbiddenTraits": [
      "Fêtard invétéré",
      "Discret dans les grands matchs",
      "Mercenaire",
      "Lent au démarrage"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent DG / DD.",
    "targetRank": 16,
    "league": "Bundesliga",
    "flag": "🇩🇪",
    "tacticalPhilosophy": "️ Commando Maintien",
    "tacticalTag": "Transition Éclair & Contre-Attaque",
    "preferredTraits": [
      "Leader vocal",
      "Solide au duel",
      "Collectif avant tout",
      "Gros volume de jeu",
      "Leader de vestiaire",
      "Vitesse supersonique"
    ],
    "targetAgeRule": "mature",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 recrue du même pays",
      "ruleDesc": "Le coach tient à l'identité locale du club et exige au moins un renfort national."
    }
  },
  {
    "id": 92,
    "difficulty": "difficile",
    "club": "Rayo Vallecano",
    "country": "🇪🇸 La Liga (Espagne)",
    "logo": "",
    "budget": 11.8,
    "wages": 3.3,
    "needs": [
      {
        "code": "DG",
        "name": "Latéral Gauche",
        "icon": ""
      },
      {
        "code": "MC",
        "name": "Milieu Relayeur (8)",
        "icon": ""
      },
      {
        "code": "AG",
        "name": "Ailier Gauche",
        "icon": ""
      }
    ],
    "coachDemand": "\"Le ballon est notre meilleur allié. Ceux qui balancent des chandelles vont sur le banc, je veux de la vista et de la finesse. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche. La direction sportive cible au moins un renfort issu du vivier sud-américain (CONMEBOL).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Tacleur féroce",
        "Impact physique",
        "Roc défensif"
      ],
      "MIL": [
        "Vision laser",
        "Maestro du tempo",
        "Passeur laser"
      ]
    },
    "forbiddenTraits": [
      "Fragilité musculaire",
      "Fêtard invétéré",
      "Individualiste",
      "Profil brut non formé"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche.",
    "targetRank": 16,
    "league": "La Liga",
    "flag": "🇪🇸",
    "tacticalPhilosophy": " Catenaccio & Bloc Bas",
    "tacticalTag": "Tiki-Taka & Jeu de Position",
    "preferredTraits": [
      "Roc défensif",
      "Tacleur féroce",
      "Discipline tactique",
      "Infatigable",
      "Patron aérien",
      "Vision laser"
    ],
    "targetAgeRule": "mature",
    "originConstraint": {
      "code": "SOUTH_AMERICA",
      "name": "Réseau Amérique du Sud (CONMEBOL)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu du vivier sud-américain (Brésil, Argentine...)",
      "ruleDesc": "La cellule de détection cible en priorité les championnats sud-américains."
    }
  },
  {
    "id": 93,
    "difficulty": "difficile",
    "club": "Angers Scoïstes",
    "country": "🇫🇷 Ligue 1 (France)",
    "logo": "",
    "budget": 12,
    "wages": 3.4,
    "needs": [
      {
        "code": "DD",
        "name": "Latéral Droit",
        "icon": ""
      },
      {
        "code": "MDF",
        "name": "Sentinelle (6)",
        "icon": ""
      },
      {
        "code": "PEPITE_U21",
        "name": "Pépite U21 (-21 ans)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Ici on joue avec les tripes. Je refuse catégoriquement les divas et les égos surdimensionnés. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans). La cellule de scouting recommande d'activer notre filière de recrutement sur les championnats africains.\"",
    "expectedTraitsByPos": {
      "GAR": [
        "Arrêts miracles",
        "Réflexes félins",
        "Mains de fer"
      ],
      "ATT": [
        "Tueur clinique",
        "Sens du but",
        "Renard des surfaces"
      ]
    },
    "forbiddenTraits": [
      "Lent au démarrage",
      "Passeur latéral stérile",
      "Égo surdimensionné"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans).",
    "targetRank": 16,
    "league": "Ligue 1",
    "flag": "🇫🇷",
    "tacticalPhilosophy": " Transition Éclair",
    "tacticalTag": "Meneur d'Hommes & Sang Chaud",
    "preferredTraits": [
      "Vitesse supersonique",
      "Ailier supersonique",
      "Tueur clinique",
      "Renard des surfaces",
      "Piston moderne",
      "Leader vocal"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "AFRICA",
      "name": "Réseau Afrique (Partenariats CAF)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des académies ou sélections africaines",
      "ruleDesc": "Priorité accordée aux partenariats de scouting établis sur le continent africain."
    }
  },
  {
    "id": 94,
    "difficulty": "difficile",
    "club": "Southampton Saints",
    "country": "󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Angleterre)",
    "logo": "",
    "budget": 12.2,
    "wages": 3.4,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "MO",
        "name": "Meneur de Jeu (10)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Place à l'audace ! Je préfère un jeune mort de faim qu'un nom ronflant en préretraite. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9). Expérience requise au sein des championnats majeurs européens pour une adaptation immédiate.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Roc défensif",
        "Tacleur féroce"
      ],
      "ATT": [
        "Vitesse supersonique",
        "Accélération foudroyante",
        "Dribbles chaloupés"
      ]
    },
    "forbiddenTraits": [
      "Fêtard invétéré",
      "Discret dans les grands matchs",
      "Mercenaire",
      "Vétéran cramé"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9).",
    "targetRank": 16,
    "league": "Premier League",
    "flag": "󠁧󠁢󠁥󠁮󠁧󠁿",
    "tacticalPhilosophy": "️ Commando Maintien",
    "tacticalTag": "Pari Jeunesse & Pépites",
    "preferredTraits": [
      "Leader vocal",
      "Solide au duel",
      "Collectif avant tout",
      "Gros volume de jeu",
      "Leader de vestiaire",
      "Jeune prodige"
    ],
    "targetAgeRule": "mature",
    "originConstraint": {
      "code": "EURO_TACTICAL",
      "name": "Filière Championnats Majeurs (UEFA)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur formé ou aguerri dans les grands championnats européens",
      "ruleDesc": "Le coach privilégie la rigueur tactique, le placement et la lecture de jeu européenne."
    }
  },
  {
    "id": 95,
    "difficulty": "difficile",
    "club": "Lecce Salentini",
    "country": "🇮🇹 Serie A (Italie)",
    "logo": "",
    "budget": 12.5,
    "wages": 3.5,
    "needs": [
      {
        "code": "GAR",
        "name": "Gardien de But",
        "icon": ""
      },
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "AD",
        "name": "Ailier Droit",
        "icon": ""
      }
    ],
    "coachDemand": "\"Chaque match est une bataille tactique pour assurer notre maintien. Il me faut des joueurs avec un gros volume de jeu et une vraie solidité dans les duels. Nos 3 besoins prioritaires à pourvoir avant minuit : Gardien de But, Défenseur Central, Ailier Droit. Priorité à un profil athlétique et rigoureux issu des championnats nordiques ou d'Europe de l'Est.\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Infatigable",
        "Poumons d'acier",
        "Guerrier"
      ],
      "ATT": [
        "Renard des surfaces",
        "Sens du but",
        "Tueur clinique"
      ]
    },
    "forbiddenTraits": [
      "Fragilité musculaire",
      "Fêtard invétéré",
      "Individualiste",
      "Discret dans les grands matchs"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Gardien de But, Défenseur Central, Ailier Droit.",
    "targetRank": 16,
    "league": "Serie A",
    "flag": "🇮🇹",
    "tacticalPhilosophy": " Catenaccio & Bloc Bas",
    "tacticalTag": "Pragmatisme du Maintien",
    "preferredTraits": [
      "Roc défensif",
      "Tacleur féroce",
      "Discipline tactique",
      "Infatigable",
      "Patron aérien",
      "Impact physique"
    ],
    "targetAgeRule": "mature",
    "originConstraint": {
      "code": "NORDIC_EAST",
      "name": "Réseau Europe du Nord & de l'Est",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des ligues nordiques ou d'Europe de l'Est",
      "ruleDesc": "Détection active sur les championnats scandinaves et d'Europe centrale/orientale."
    }
  },
  {
    "id": 96,
    "difficulty": "difficile",
    "club": "Getafe Azulones",
    "country": "🇪🇸 La Liga (Espagne)",
    "logo": "",
    "budget": 7.5,
    "wages": 2.1,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_DG_DD",
        "name": "Polyvalent DG / DD",
        "icon": ""
      }
    ],
    "coachDemand": "\"Je préfère gagner 4-3 que 1-0. Apportez-moi de la percussion, du culot et des frappes chirurgicales. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent DG / DD.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Tacleur féroce",
        "Impact physique",
        "Roc défensif"
      ],
      "MIL": [
        "Vision laser",
        "Maestro du tempo",
        "Passeur laser"
      ]
    },
    "forbiddenTraits": [
      "Lent au démarrage",
      "Passeur latéral stérile",
      "Capricieux sous pression"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent DG / DD.",
    "targetRank": 16,
    "league": "La Liga",
    "flag": "🇪🇸",
    "tacticalPhilosophy": " Transition Éclair",
    "tacticalTag": "Folie Offensive Champagne",
    "preferredTraits": [
      "Vitesse supersonique",
      "Ailier supersonique",
      "Tueur clinique",
      "Renard des surfaces",
      "Piston moderne"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "FREE",
      "name": "Scouting Libre & Sans Frontières",
      "icon": "",
      "shortDesc": "Aucune restriction géographique imposée",
      "ruleDesc": "Le coach ne regarde que la valeur intrinsèque et l'alchimie tactique."
    }
  },
  {
    "id": 97,
    "difficulty": "difficile",
    "club": "Saint-Étienne Verts",
    "country": "🇫🇷 Ligue 1 (France)",
    "logo": "",
    "budget": 8,
    "wages": 2.2,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "POLYVALENT_6_DC",
        "name": "Polyvalent 6 & DC",
        "icon": ""
      }
    ],
    "coachDemand": "\"Zéro touriste sur le pré ! Je veux du contre-pressing immédiat à la perte et des poumons d'acier. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Buteur (9), Polyvalent 6 & DC. Objectif de conformité : intégrer au moins un joueur formé localement (quota national).\"",
    "expectedTraitsByPos": {
      "GAR": [
        "Arrêts miracles",
        "Réflexes félins",
        "Mains de fer"
      ],
      "ATT": [
        "Tueur clinique",
        "Sens du but",
        "Renard des surfaces"
      ]
    },
    "forbiddenTraits": [
      "Fêtard invétéré",
      "Discret dans les grands matchs",
      "Mercenaire",
      "Allergique au repli"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Buteur (9), Polyvalent 6 & DC.",
    "targetRank": 16,
    "league": "Ligue 1",
    "flag": "🇫🇷",
    "tacticalPhilosophy": "️ Commando Maintien",
    "tacticalTag": "Gegenpressing & Intensité",
    "preferredTraits": [
      "Leader vocal",
      "Solide au duel",
      "Collectif avant tout",
      "Gros volume de jeu",
      "Leader de vestiaire",
      "Infatigable"
    ],
    "targetAgeRule": "mature",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 recrue du même pays",
      "ruleDesc": "Le coach tient à l'identité locale du club et exige au moins un renfort national."
    }
  },
  {
    "id": 98,
    "difficulty": "difficile",
    "club": "Leganes Pepineros",
    "country": "🇪🇸 La Liga (Espagne)",
    "logo": "",
    "budget": 8.5,
    "wages": 2.4,
    "needs": [
      {
        "code": "DG",
        "name": "Latéral Gauche",
        "icon": ""
      },
      {
        "code": "MC",
        "name": "Milieu Relayeur (8)",
        "icon": ""
      },
      {
        "code": "AG",
        "name": "Ailier Gauche",
        "icon": ""
      }
    ],
    "coachDemand": "\"Un championnat se gagne par la défense. On cadenasse l'axe, on gagne les duels et on ne concède rien. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche. La direction sportive cible au moins un renfort issu du vivier sud-américain (CONMEBOL).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Roc défensif",
        "Tacleur féroce"
      ],
      "ATT": [
        "Vitesse supersonique",
        "Accélération foudroyante",
        "Dribbles chaloupés"
      ]
    },
    "forbiddenTraits": [
      "Fragilité musculaire",
      "Fêtard invétéré",
      "Individualiste",
      "Relance hasardeuse"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche.",
    "targetRank": 16,
    "league": "La Liga",
    "flag": "🇪🇸",
    "tacticalPhilosophy": " Catenaccio & Bloc Bas",
    "tacticalTag": "Catenaccio & Verrouillage",
    "preferredTraits": [
      "Roc défensif",
      "Tacleur féroce",
      "Discipline tactique",
      "Infatigable",
      "Patron aérien"
    ],
    "targetAgeRule": "mature",
    "originConstraint": {
      "code": "SOUTH_AMERICA",
      "name": "Réseau Amérique du Sud (CONMEBOL)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu du vivier sud-américain (Brésil, Argentine...)",
      "ruleDesc": "La cellule de détection cible en priorité les championnats sud-américains."
    }
  },
  {
    "id": 99,
    "difficulty": "difficile",
    "club": "Venezia Laguna",
    "country": "🇮🇹 Serie A (Italie)",
    "logo": "",
    "budget": 9,
    "wages": 2.5,
    "needs": [
      {
        "code": "DD",
        "name": "Latéral Droit",
        "icon": ""
      },
      {
        "code": "MDF",
        "name": "Sentinelle (6)",
        "icon": ""
      },
      {
        "code": "PEPITE_U21",
        "name": "Pépite U21 (-21 ans)",
        "icon": ""
      }
    ],
    "coachDemand": "\"On attend le bon moment pour piquer à 200 km/h. Il me faut de la dynamite dans les couloirs et de la verticalité. Nos 3 besoins prioritaires à pourvoir avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans). La cellule de scouting recommande d'activer notre filière de recrutement sur les championnats africains.\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Infatigable",
        "Poumons d'acier",
        "Guerrier"
      ],
      "ATT": [
        "Renard des surfaces",
        "Sens du but",
        "Tueur clinique"
      ]
    },
    "forbiddenTraits": [
      "Lent au démarrage",
      "Passeur latéral stérile"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Droit, Sentinelle (6), Pépite U21 (-21 ans).",
    "targetRank": 16,
    "league": "Serie A",
    "flag": "🇮🇹",
    "tacticalPhilosophy": " Transition Éclair",
    "tacticalTag": "Transition Éclair & Contre-Attaque",
    "preferredTraits": [
      "Vitesse supersonique",
      "Ailier supersonique",
      "Tueur clinique",
      "Renard des surfaces",
      "Piston moderne"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "AFRICA",
      "name": "Réseau Afrique (Partenariats CAF)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu des académies ou sélections africaines",
      "ruleDesc": "Priorité accordée aux partenariats de scouting établis sur le continent africain."
    }
  },
  {
    "id": 100,
    "difficulty": "difficile",
    "club": "Espanyol Pericos",
    "country": "🇪🇸 La Liga (Espagne)",
    "logo": "",
    "budget": 10,
    "wages": 2.8,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "MO",
        "name": "Meneur de Jeu (10)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Le ballon est notre meilleur allié. Ceux qui balancent des chandelles vont sur le banc, je veux de la vista et de la finesse. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9). Expérience requise au sein des championnats majeurs européens pour une adaptation immédiate.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Tacleur féroce",
        "Impact physique",
        "Roc défensif"
      ],
      "MIL": [
        "Vision laser",
        "Maestro du tempo",
        "Passeur laser"
      ]
    },
    "forbiddenTraits": [
      "Fêtard invétéré",
      "Discret dans les grands matchs",
      "Mercenaire",
      "Profil brut non formé"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Meneur de Jeu (10), Buteur (9).",
    "targetRank": 16,
    "league": "La Liga",
    "flag": "🇪🇸",
    "tacticalPhilosophy": "️ Commando Maintien",
    "tacticalTag": "Tiki-Taka & Jeu de Position",
    "preferredTraits": [
      "Leader vocal",
      "Solide au duel",
      "Collectif avant tout",
      "Gros volume de jeu",
      "Leader de vestiaire",
      "Vision laser"
    ],
    "targetAgeRule": "mature",
    "originConstraint": {
      "code": "EURO_TACTICAL",
      "name": "Filière Championnats Majeurs (UEFA)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur formé ou aguerri dans les grands championnats européens",
      "ruleDesc": "Le coach privilégie la rigueur tactique, le placement et la lecture de jeu européenne."
    }
  },
  {
    "id": 101,
    "difficulty": "facile",
    "club": "Glasgow Blue Rangers FC",
    "country": "󠁧󠁢󠁳󠁣󠁴󠁿 Premiership (Écosse)",
    "logo": "",
    "budget": 138,
    "wages": 15,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "MC",
        "name": "Milieu Relayeur (8)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"L'Old Firm ne se joue pas, il se gagne ! Je veux du caractère, de la hargne britannique et un tueur devant la cage. Nos 3 besoins prioritaires à pourvoir avant minuit : Défenseur Central, Milieu Relayeur (8), Buteur (9). Objectif de conformité : intégrer au moins un joueur formé localement (quota national).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Roc défensif",
        "Tacleur féroce"
      ],
      "ATT": [
        "Sens du but",
        "Tueur clinique",
        "Renard des surfaces"
      ]
    },
    "forbiddenTraits": [
      "Discret dans les grands matchs",
      "Fragilité mentale",
      "Allergique au repli"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Milieu Relayeur (8), Buteur (9).",
    "targetRank": 2,
    "league": "Scottish Premiership",
    "flag": "󠁧󠁢󠁳󠁣󠁴󠁿",
    "tacticalPhilosophy": "️ Intensité & Caractère",
    "tacticalTag": "Gegenpressing & Intensité",
    "preferredTraits": [
      "Guerrier",
      "Solide au duel",
      "Tueur clinique",
      "Infatigable"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 recrue du même pays",
      "ruleDesc": "Le coach tient à l'identité britannique et exige au moins un renfort national."
    }
  },
  {
    "id": 102,
    "difficulty": "facile",
    "club": "Rio Mengão FC",
    "country": "🇧🇷 Brasileirão (Brésil)",
    "logo": "",
    "budget": 180,
    "wages": 16,
    "needs": [
      {
        "code": "MO",
        "name": "Meneur de Jeu (10)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      },
      {
        "code": "DD",
        "name": "Latéral Droit",
        "icon": ""
      }
    ],
    "coachDemand": "\"La nation Mengão exige le spectacle, la créativité et la victoire ! Donnez-moi des artistes balle au pied. Nos 3 besoins prioritaires à pourvoir avant minuit : Meneur de Jeu (10), Buteur (9), Latéral Droit. Amenez-moi au moins un talent sud-américain pour sublimer notre jeu.\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Vision laser",
        "Maestro créatif",
        "Dribbleur soyeux"
      ],
      "ATT": [
        "Finition chirurgicale",
        "Renard des surfaces",
        "Accélération foudroyante"
      ]
    },
    "forbiddenTraits": [
      "Déficit technique",
      "Jeu stéréotypé",
      "Lent au démarrage"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Meneur de Jeu (10), Buteur (9), Latéral Droit.",
    "targetRank": 2,
    "league": "Brasileirão",
    "flag": "🇧🇷",
    "tacticalPhilosophy": " Joga Bonito & Samba",
    "tacticalTag": "Tiki-Taka & Jeu de Position",
    "preferredTraits": [
      "Dribbleur déroutant",
      "Vision laser",
      "Maestro créatif",
      "Tueur clinique"
    ],
    "targetAgeRule": "star",
    "originConstraint": {
      "code": "SOUTH_AMERICA",
      "name": "Réseau Amérique du Sud (CONMEBOL)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu du vivier sud-américain (Brésil, Argentine...)",
      "ruleDesc": "Le coach réclame de la créativité et de la virtuosité sud-américaine."
    }
  },
  {
    "id": 103,
    "difficulty": "facile",
    "club": "Buenos Aires Boca Xeneizes",
    "country": "🇦🇷 Primera División (Argentine)",
    "logo": "",
    "budget": 145,
    "wages": 14,
    "needs": [
      {
        "code": "MDF",
        "name": "Sentinelle (6)",
        "icon": ""
      },
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"À la Bombonera, on ne triche jamais ! Je veux des lions affamés, du tacle saignant et une ferveur inextinguible. Nos 3 besoins prioritaires avant minuit : Sentinelle (6), Défenseur Central, Buteur (9). Grinta sud-américaine absolue exigée.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Tacleur féroce",
        "Roc défensif",
        "Leader de vestiaire"
      ],
      "ATT": [
        "Tueur clinique",
        "Renard des surfaces",
        "Combatif"
      ]
    },
    "forbiddenTraits": [
      "Fragilité mentale",
      "Allergique au repli",
      "Peur du duel"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Sentinelle (6), Défenseur Central, Buteur (9).",
    "targetRank": 2,
    "league": "Primera División",
    "flag": "🇦🇷",
    "tacticalPhilosophy": " Grinta & Bombonera",
    "tacticalTag": "Gegenpressing & Intensité",
    "preferredTraits": [
      "Guerrier",
      "Solide au duel",
      "Sang-froid clinique",
      "Infatigable"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "SOUTH_AMERICA",
      "name": "Réseau Amérique du Sud (CONMEBOL)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu du vivier sud-américain (Brésil, Argentine...)",
      "ruleDesc": "La cellule de détection cible en priorité les championnats sud-américains."
    }
  },
  {
    "id": 104,
    "difficulty": "facile",
    "club": "Buenos Aires River Millonarios",
    "country": "🇦🇷 Primera División (Argentine)",
    "logo": "",
    "budget": 148,
    "wages": 14,
    "needs": [
      {
        "code": "MO",
        "name": "Meneur de Jeu (10)",
        "icon": ""
      },
      {
        "code": "MC",
        "name": "Milieu Relayeur (8)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Le Monumental exige l'élégance technique et la vitesse d'exécution ! On joue au ballon avec panache. Nos 3 besoins prioritaires avant minuit : Meneur de Jeu (10), Milieu Relayeur (8), Buteur (9). Grinta et finesse sud-américaine requises.\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Vision laser",
        "Maestro créatif",
        "Passeur laser"
      ],
      "ATT": [
        "Finition chirurgicale",
        "Accélération foudroyante",
        "Dribbleur déroutant"
      ]
    },
    "forbiddenTraits": [
      "Déficit technique",
      "Jeu stéréotypé",
      "Lent au démarrage"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Meneur de Jeu (10), Milieu Relayeur (8), Buteur (9).",
    "targetRank": 2,
    "league": "Primera División",
    "flag": "🇦🇷",
    "tacticalPhilosophy": " Fútbol Total & Étoiles",
    "tacticalTag": "Tiki-Taka & Jeu de Position",
    "preferredTraits": [
      "Vision laser",
      "Dribbleur déroutant",
      "Maestro créatif",
      "Tueur clinique"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "SOUTH_AMERICA",
      "name": "Réseau Amérique du Sud (CONMEBOL)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu du vivier sud-américain (Brésil, Argentine...)",
      "ruleDesc": "Le coach privilégie les manieurs de ballon et créateurs sud-américains."
    }
  },
  {
    "id": 105,
    "difficulty": "facile",
    "club": "Riyadh Blue Crescent FC",
    "country": "🇸🇦 Saudi Pro League",
    "logo": "",
    "budget": 150,
    "wages": 16,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "MDF",
        "name": "Sentinelle (6)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Nous sommes les rois d'Asie, notre standing est intouchable ! Il me faut des cadres expérimentés pour régner sur Riyad. Nos 3 besoins prioritaires avant minuit : Défenseur Central, Sentinelle (6), Buteur (9). Rigueur tactique européenne bienvenue.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Patron aérien",
        "Relance propre",
        "Leader de vestiaire"
      ],
      "ATT": [
        "Tueur clinique",
        "Sens du but",
        "Sang-froid clinique"
      ]
    },
    "forbiddenTraits": [
      "Fragilité mentale",
      "Discret dans les grands matchs",
      "Vétéran cramé"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Sentinelle (6), Buteur (9).",
    "targetRank": 2,
    "league": "Saudi Pro League",
    "flag": "🇸🇦",
    "tacticalPhilosophy": " Domination Royale",
    "tacticalTag": "Catenaccio & Verrouillage",
    "preferredTraits": [
      "Cadre international",
      "Patron aérien",
      "Sang-froid clinique",
      "Discipline tactique"
    ],
    "targetAgeRule": "star",
    "originConstraint": {
      "code": "EURO_TACTICAL",
      "name": "Filière Championnats Majeurs (UEFA)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur formé ou aguerri dans les grands championnats européens",
      "ruleDesc": "Le coach recherche l'expérience des grands rendez-vous continentaux."
    }
  },
  {
    "id": 106,
    "difficulty": "facile",
    "club": "Los Angeles Angels FC",
    "country": "🇺🇸 Major League Soccer",
    "logo": "",
    "budget": 155,
    "wages": 16,
    "needs": [
      {
        "code": "DG",
        "name": "Latéral Gauche",
        "icon": ""
      },
      {
        "code": "MC",
        "name": "Milieu Relayeur (8)",
        "icon": ""
      },
      {
        "code": "AG",
        "name": "Ailier Gauche",
        "icon": ""
      }
    ],
    "coachDemand": "\"Sous les projecteurs d'Hollywood, on veut du spectacle, de la vitesse et des étincelles ! Nos 3 besoins prioritaires avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche. Pépites rapides et détonantes souhaitées.\"",
    "expectedTraitsByPos": {
      "MIL": [
        "Infatigable",
        "Passeur laser",
        "Gros volume de jeu"
      ],
      "ATT": [
        "Vitesse supersonique",
        "Accélération foudroyante",
        "Dribbles chaloupés"
      ]
    },
    "forbiddenTraits": [
      "Lent au démarrage",
      "Allergique au repli",
      "Mauvaise hygiène de vie"
    ],
    "objective": "Titres nationaux & Podium (Top 2)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Gauche, Milieu Relayeur (8), Ailier Gauche.",
    "targetRank": 2,
    "league": "MLS",
    "flag": "🇺🇸",
    "tacticalPhilosophy": " Vitesse & Show Hollywood",
    "tacticalTag": "Transition Éclair & Contre-Attaque",
    "preferredTraits": [
      "Vitesse supersonique",
      "Ailier supersonique",
      "Dribbleur déroutant",
      "Infatigable"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "SOUTH_AMERICA",
      "name": "Réseau Amérique du Sud (CONMEBOL)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur issu du vivier sud-américain (Brésil, Argentine...)",
      "ruleDesc": "La cellule de détection cible en priorité les championnats sud-américains."
    }
  },
  {
    "id": 107,
    "difficulty": "difficile",
    "club": "Boavista Panteras FC",
    "country": "🇵🇹 Liga Portugal",
    "logo": "",
    "budget": 9,
    "wages": 2,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "MDF",
        "name": "Sentinelle (6)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Mission commando ! On verrouille l'axe et on mord sur chaque ballon. Nos 3 besoins prioritaires avant minuit : Défenseur Central, Sentinelle (6), Buteur (9). Rigueur tactique et esprit de combat obligatoires.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Tacleur féroce",
        "Roc défensif",
        "Leader vocal"
      ],
      "ATT": [
        "Renard des surfaces",
        "Sens du but",
        "Combatif"
      ]
    },
    "forbiddenTraits": [
      "Fragilité mentale",
      "Allergique au repli",
      "Peur du duel"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 15)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Sentinelle (6), Buteur (9).",
    "targetRank": 15,
    "league": "Liga Portugal",
    "flag": "🇵🇹",
    "tacticalPhilosophy": "️ Commando Maintien",
    "tacticalTag": "Catenaccio & Verrouillage",
    "preferredTraits": [
      "Guerrier",
      "Solide au duel",
      "Discipline tactique",
      "Infatigable"
    ],
    "targetAgeRule": "mature",
    "originConstraint": {
      "code": "EURO_TACTICAL",
      "name": "Filière Championnats Majeurs (UEFA)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur formé en Europe",
      "ruleDesc": "Le coach veut de la rigueur et du placement défensif."
    }
  },
  {
    "id": 108,
    "difficulty": "difficile",
    "club": "Estoril Praia FC",
    "country": "🇵🇹 Liga Portugal",
    "logo": "",
    "budget": 8.5,
    "wages": 2,
    "needs": [
      {
        "code": "GAR",
        "name": "Gardien de But",
        "icon": ""
      },
      {
        "code": "DG",
        "name": "Latéral Gauche",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"On ne lâchera aucun pouce de terrain ! Il faut sauver le club à tout prix. Nos 3 besoins prioritaires : Gardien de But, Latéral Gauche, Buteur (9). Joueurs prêts à mourir sur le pré demandés.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Roc défensif",
        "Infatigable",
        "Solide au duel"
      ],
      "ATT": [
        "Tueur clinique",
        "Combatif",
        "Guerrier"
      ]
    },
    "forbiddenTraits": [
      "Dilettante",
      "Fragilité mentale",
      "Vétéran cramé"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 15)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Gardien de But, Latéral Gauche, Buteur (9).",
    "targetRank": 15,
    "league": "Liga Portugal",
    "flag": "🇵🇹",
    "tacticalPhilosophy": "️ Commando Maintien",
    "tacticalTag": "Transition Éclair & Contre-Attaque",
    "preferredTraits": [
      "Guerrier",
      "Tueur clinique",
      "Infatigable"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur local",
      "ruleDesc": "Le coach veut des joueurs attachés à l'identité du club."
    }
  },
  {
    "id": 109,
    "difficulty": "difficile",
    "club": "Almere Black Sheep FC",
    "country": "🇳🇱 Eredivisie (Pays-Bas)",
    "logo": "",
    "budget": 8,
    "wages": 2,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "MC",
        "name": "Milieu Relayeur (8)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"On est le Petit Poucet de la ligue, chaque point arraché sera une victoire nationale ! Nos 3 besoins : Défenseur Central, Milieu Relayeur (8), Buteur (9). Amenez-moi des morts de faim.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Patron aérien",
        "Tacleur féroce",
        "Discipline tactique"
      ],
      "ATT": [
        "Tueur clinique",
        "Renard des surfaces",
        "Combatif"
      ]
    },
    "forbiddenTraits": [
      "Mercenaire",
      "Fragilité mentale",
      "Lent au démarrage"
    ],
    "objective": "Sauvetage in extremis en Eredivisie (Top 15)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Milieu Relayeur (8), Buteur (9).",
    "targetRank": 15,
    "league": "Eredivisie",
    "flag": "🇳🇱",
    "tacticalPhilosophy": "️ Commando Maintien",
    "tacticalTag": "Pragmatisme du Maintien",
    "preferredTraits": [
      "Solide au duel",
      "Infatigable",
      "Collectif avant tout"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "EURO_TACTICAL",
      "name": "Filière Championnats Majeurs (UEFA)",
      "icon": "",
      "shortDesc": "Au moins 1 profil européen discipliné",
      "ruleDesc": "Le coach veut de la discipline tactique."
    }
  },
  {
    "id": 110,
    "difficulty": "difficile",
    "club": "Waalwijk Waal FC",
    "country": "🇳🇱 Eredivisie (Pays-Bas)",
    "logo": "",
    "budget": 8.5,
    "wages": 2,
    "needs": [
      {
        "code": "DD",
        "name": "Latéral Droit",
        "icon": ""
      },
      {
        "code": "MDF",
        "name": "Sentinelle (6)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Chaque match est une finale ! Il faut fermer la boutique et piquer en contre. Nos 3 besoins : Latéral Droit, Sentinelle (6), Buteur (9). Des guerriers infatigables exigés.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Infatigable",
        "Solide au duel",
        "Discipline tactique"
      ],
      "ATT": [
        "Sens du but",
        "Accélération foudroyante",
        "Tueur clinique"
      ]
    },
    "forbiddenTraits": [
      "Discret dans les grands matchs",
      "Allergique au repli"
    ],
    "objective": "Sauvetage in extremis en Eredivisie (Top 15)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Droit, Sentinelle (6), Buteur (9).",
    "targetRank": 15,
    "league": "Eredivisie",
    "flag": "🇳🇱",
    "tacticalPhilosophy": "️ Commando Maintien",
    "tacticalTag": "Transition Éclair & Contre-Attaque",
    "preferredTraits": [
      "Gros volume de jeu",
      "Guerrier",
      "Sang-froid clinique"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur néerlandais",
      "ruleDesc": "Le coach exige un joueur du cru."
    }
  },
  {
    "id": 111,
    "difficulty": "difficile",
    "club": "Pendikspor Istanbul FC",
    "country": "🇹🇷 Süper Lig (Turquie)",
    "logo": "",
    "budget": 9,
    "wages": 2,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "MC",
        "name": "Milieu Relayeur (8)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"La survie en Süper Lig ne se négocie pas ! Il nous faut du caractère trempé dans l'acier. Nos 3 besoins : Défenseur Central, Milieu Relayeur (8), Buteur (9).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Tacleur féroce",
        "Roc défensif",
        "Leader vocal"
      ],
      "ATT": [
        "Tueur clinique",
        "Combatif",
        "Renard des surfaces"
      ]
    },
    "forbiddenTraits": [
      "Fragilité mentale",
      "Peur du duel"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Milieu Relayeur (8), Buteur (9).",
    "targetRank": 16,
    "league": "Süper Lig",
    "flag": "🇹🇷",
    "tacticalPhilosophy": "️ Commando Maintien",
    "tacticalTag": "Gegenpressing & Intensité",
    "preferredTraits": [
      "Guerrier",
      "Solide au duel",
      "Infatigable"
    ],
    "targetAgeRule": "mature",
    "originConstraint": {
      "code": "EURO_TACTICAL",
      "name": "Filière Championnats Majeurs (UEFA)",
      "icon": "",
      "shortDesc": "Au moins 1 renfort européen aguerri",
      "ruleDesc": "Le coach veut de l'expérience sous pression."
    }
  },
  {
    "id": 112,
    "difficulty": "difficile",
    "club": "Hatayspor Sud FC",
    "country": "🇹🇷 Süper Lig (Turquie)",
    "logo": "",
    "budget": 8.5,
    "wages": 2,
    "needs": [
      {
        "code": "GAR",
        "name": "Gardien de But",
        "icon": ""
      },
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Pour le peuple et la survie de la région ! On va se battre jusqu'à la 95e minute de la 38e journée. Nos 3 besoins : Gardien de But, Défenseur Central, Buteur (9).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Patron aérien",
        "Tacleur féroce"
      ],
      "ATT": [
        "Sens du but",
        "Tueur clinique",
        "Combatif"
      ]
    },
    "forbiddenTraits": [
      "Mercenaire",
      "Fragilité mentale"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 16)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Gardien de But, Défenseur Central, Buteur (9).",
    "targetRank": 16,
    "league": "Süper Lig",
    "flag": "🇹🇷",
    "tacticalPhilosophy": "️ Commando Maintien",
    "tacticalTag": "Pragmatisme du Maintien",
    "preferredTraits": [
      "Guerrier",
      "Leader vocal",
      "Sang-froid clinique"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 renfort turc",
      "ruleDesc": "Le club souhaite valoriser un joueur formé localement."
    }
  },
  {
    "id": 113,
    "difficulty": "difficile",
    "club": "Ross County Highlands FC",
    "country": "󠁧󠁢󠁳󠁣󠁴󠁿 Premiership (Écosse)",
    "logo": "",
    "budget": 7.5,
    "wages": 1.5,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "MDF",
        "name": "Sentinelle (6)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Dans le froid des Highlands, personne ne vient prendre des points facilement ! Nos 3 besoins : Défenseur Central, Sentinelle (6), Buteur (9). Du jeu direct et de l'impact physique.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Patron aérien",
        "Tacleur féroce",
        "Roc défensif"
      ],
      "ATT": [
        "Renard des surfaces",
        "Tueur clinique",
        "Combatif"
      ]
    },
    "forbiddenTraits": [
      "Fragilité mentale",
      "Peur du duel",
      "Dilettante"
    ],
    "objective": "Sauvetage héroïque en Premiership (Top 10)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Sentinelle (6), Buteur (9).",
    "targetRank": 10,
    "league": "Scottish Premiership",
    "flag": "󠁧󠁢󠁳󠁣󠁴󠁿",
    "tacticalPhilosophy": "️ Commando Maintien",
    "tacticalTag": "Catenaccio & Verrouillage",
    "preferredTraits": [
      "Guerrier",
      "Solide au duel",
      "Impact physique"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur britannique",
      "ruleDesc": "Le coach privilégie des joueurs formés dans les championnats britanniques."
    }
  },
  {
    "id": 114,
    "difficulty": "difficile",
    "club": "Dundee Stags FC",
    "country": "󠁧󠁢󠁳󠁣󠁴󠁿 Premiership (Écosse)",
    "logo": "",
    "budget": 8,
    "wages": 1.5,
    "needs": [
      {
        "code": "DG",
        "name": "Latéral Gauche",
        "icon": ""
      },
      {
        "code": "MC",
        "name": "Milieu Relayeur (8)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"On va se dépouiller à chaque match ! Nos 3 besoins : Latéral Gauche, Milieu Relayeur (8), Buteur (9). Des poumons d'acier demandés avant minuit.\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Infatigable",
        "Solide au duel",
        "Roc défensif"
      ],
      "ATT": [
        "Tueur clinique",
        "Combatif",
        "Sens du but"
      ]
    },
    "forbiddenTraits": [
      "Lent au démarrage",
      "Mauvaise hygiène de vie"
    ],
    "objective": "Sauvetage héroïque en Premiership (Top 10)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Latéral Gauche, Milieu Relayeur (8), Buteur (9).",
    "targetRank": 10,
    "league": "Scottish Premiership",
    "flag": "󠁧󠁢󠁳󠁣󠁴󠁿",
    "tacticalPhilosophy": "️ Commando Maintien",
    "tacticalTag": "Transition Éclair & Contre-Attaque",
    "preferredTraits": [
      "Infatigable",
      "Guerrier",
      "Gros volume de jeu"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "DOMESTIC",
      "name": "Quota Formation Locale (Homegrown)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur local",
      "ruleDesc": "Le coach veut des joueurs formés au pays."
    }
  },
  {
    "id": 115,
    "difficulty": "difficile",
    "club": "Courtrai Groeninge FC",
    "country": "🇧🇪 Pro League (Belgique)",
    "logo": "",
    "budget": 8.5,
    "wages": 2,
    "needs": [
      {
        "code": "DC",
        "name": "Défenseur Central",
        "icon": ""
      },
      {
        "code": "MDF",
        "name": "Sentinelle (6)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"Opération survie en Jupiler Pro League ! On doit être compacts et tranchants. Nos 3 besoins : Défenseur Central, Sentinelle (6), Buteur (9).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Roc défensif",
        "Tacleur féroce",
        "Discipline tactique"
      ],
      "ATT": [
        "Tueur clinique",
        "Renard des surfaces",
        "Combatif"
      ]
    },
    "forbiddenTraits": [
      "Fragilité mentale",
      "Allergique au repli"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 14)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Défenseur Central, Sentinelle (6), Buteur (9).",
    "targetRank": 14,
    "league": "Pro League",
    "flag": "🇧🇪",
    "tacticalPhilosophy": "️ Commando Maintien",
    "tacticalTag": "Pragmatisme du Maintien",
    "preferredTraits": [
      "Solide au duel",
      "Guerrier",
      "Infatigable"
    ],
    "targetAgeRule": "mature",
    "originConstraint": {
      "code": "EURO_TACTICAL",
      "name": "Filière Championnats Majeurs (UEFA)",
      "icon": "",
      "shortDesc": "Au moins 1 profil tactique européen",
      "ruleDesc": "Le coach veut du sérieux et de la rigueur tactique."
    }
  },
  {
    "id": 116,
    "difficulty": "difficile",
    "club": "Eupen Pandas FC",
    "country": "🇧🇪 Pro League (Belgique)",
    "logo": "",
    "budget": 8,
    "wages": 2,
    "needs": [
      {
        "code": "GAR",
        "name": "Gardien de But",
        "icon": ""
      },
      {
        "code": "MC",
        "name": "Milieu Relayeur (8)",
        "icon": ""
      },
      {
        "code": "BU",
        "name": "Buteur (9)",
        "icon": ""
      }
    ],
    "coachDemand": "\"On refuse la relégation ! Il me faut des battants qui donneront tout jusqu'à la dernière seconde. Nos 3 besoins : Gardien de But, Milieu Relayeur (8), Buteur (9).\"",
    "expectedTraitsByPos": {
      "DEF": [
        "Leader de vestiaire",
        "Roc défensif",
        "Solide au duel"
      ],
      "ATT": [
        "Sens du but",
        "Tueur clinique",
        "Combatif"
      ]
    },
    "forbiddenTraits": [
      "Dilettante",
      "Mercenaire"
    ],
    "objective": "Maintien héroïque dans l'Élite (Top 14)",
    "description": "3 dossiers prioritaires à boucler avant minuit : Gardien de But, Milieu Relayeur (8), Buteur (9).",
    "targetRank": 14,
    "league": "Pro League",
    "flag": "🇧🇪",
    "tacticalPhilosophy": "️ Commando Maintien",
    "tacticalTag": "Transition Éclair & Contre-Attaque",
    "preferredTraits": [
      "Guerrier",
      "Infatigable",
      "Sang-froid clinique"
    ],
    "targetAgeRule": "any",
    "originConstraint": {
      "code": "EURO_TACTICAL",
      "name": "Filière Championnats Majeurs (UEFA)",
      "icon": "",
      "shortDesc": "Au moins 1 joueur formé en Europe",
      "ruleDesc": "Le coach veut un collectif solidaire."
    }
  }
];


// ==============================================================
// MOTEUR TACTIQUE UNIFIÉ & VÉRIFICATION DES CONSIGNES DU COACH
// Partagé de manière strictly identique entre Mode Solo et Mode 1V1
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




if (typeof module !== 'undefined') {
  module.exports = {
    SCENARIOS,
    TACTICAL_PROFILES_BY_POS,
    checkPlayerFulfillsOrigin,
    formatNeedPositionLabels,
    enrichScenarioTacticalDemands,
    checkPlayerFulfillsNeed
  };
}

