# conception-agile.
# Planning Poker

## Description
Planning Poker est une application conçue pour faciliter la planification collaborative des tâches dans une équipe. L'objectif principal est de permettre aux utilisateurs de voter sur la difficulté des tâches selon des règles définies, tout en sauvegardant les résultats pour une analyse ultérieure.

## Fonctionnalités principales
1. **Menu de configuration :**
   - Définir le nombre de joueurs (entre 2 et 10).
   - Saisir un pseudonyme pour chaque joueur.
   - Sélectionner un mode de jeu parmi :
     - **Moyenne** : La moyenne des votes est utilisée.
     - **Médiane** : La médiane des votes est utilisée.
     - **Majorité absolue** : Plus de 50 % des joueurs doivent voter pour une estimation.
     - **Majorité relative** : L'estimation ayant le plus de votes l'emporte.

2. **Validation des tâches :**
   - Permet de voter ou de revoter pour des tâches selon les règles choisies.

3. **Exportation des résultats :**
   - Sauvegarde les résultats des votes au format JSON.

## Technologies utilisées
- **JavaScript** : Pour la logique de l'application.
- **HTML/CSS** : Pour l'interface utilisateur.
- **GitHub Actions** : Pour l'intégration continue.

## Intégration continue
1. **Automatisation des tests :**
   - Tests unitaires écrits en JavaScript pour valider les règles du jeu.
2. **Documentation :**
   - Génération automatique avec JSDoc pour décrire les fonctionnalités et les interactions.
3. **Pipeline GitHub Actions :**
   - Exécution des tests unitaires à chaque push ou pull request.
   - Génération et publication de la documentation.
   - Déploiement de l'application sur GitHub Pages.

## Installation et utilisation
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Modou010/conception-agile.git
