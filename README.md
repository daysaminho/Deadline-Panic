# ⏱️ DEADLINE DAY PANIC (Micro-SaaS / Jeu Web)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/daysaminho/Deadline-Panic)

> **Le Fast-Football Manager en 3 minutes** axé sur la fin du mercato sous haute pression et la simulation rapide d'une saison.

---

## 🚀 Lancement & Test Local

- **Lien direct du jeu :** [http://localhost:5000](http://localhost:5000)
- **Sur smartphone / tablette (même Wi-Fi) :** `http://10.68.252.178:5000`
- **Pour relancer à tout moment :** double-cliquez sur `start.bat` ou lancez `npm start`.

---

## 🎮 Boucle de Gameplay (Loop)

1. **Tableau des 100 Carrières (Méta-progression) :**
   - 100 scénarios répartis en **34 Faciles**, **33 Moyens**, et **33 Difficiles**.
   - Sauvegarde automatique dans le `localStorage` de votre navigateur (taux de complétion, étoiles ⭐, notes de manager).
2. **Briefing du Club :**
   - Analyse du contexte, du budget mercato disponible (ex: de 6 M€ à 220 M€), de la masse salariale et des besoins prioritaires du coach (ATT, MIL, DEF, GAR).
3. **Le Mercato Deadline Day :**
   - Horloge animée : départ à 18h00, chaque négociation fait avancer l'aiguille jusqu'à 23h59 !
   - Catalogue filtrable de joueurs fictifs avec statistiques (GEN), traits de personnalité ("Renard des surfaces", "Fêtard invétéré", "Génie fragile") et profil de vendeur.
4. **Négociations en direct par SMS (Style smartphone) :**
   - Échange immersif avec le directeur sportif ou l'agent adverse.
   - Jauge de patience du vendeur.
   - Choix tactiques : offre ferme au prix de marché, coup de rabais agressif (-25%), surenchère cash, ou coup de bluff ("Prenez ou on active le Plan B").
   - Attribution d'une note de négociation (A+ à D) à la signature du contrat.
5. **Simulation "Fast-Forward" de la saison (6-8 secondes) :**
   - Défilement accéléré des 38 journées de championnat.
   - Flashs d'actualité en direct ("Choc au sommet", "Blessure", "Série de victoires").
   - Classement dynamique calculé en fonction de la synergie de vos recrues et du comblement des besoins obligatoires.
6. **Bilan Final & Validation :**
   - Validation ou échec de l'objectif présidentiel.
   - Bilan narratif personnalisé de chaque recrue (buts marqués, clean sheets, impact sur le groupe).
   - Validation de la tuile sur la grille des 100 carrières avec étoiles ⭐⭐⭐ !
