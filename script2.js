/**
 * Gérer les événements DOM pour initialiser le jeu.
 * @constructeur
 */
document.addEventListener("DOMContentLoaded", () => {
  const playersInput = document.getElementById("players");
  const playerNamesContainer = document.getElementById("player-names");
  const startGameButton = document.getElementById("start-game");

  /**
   * Met à jour le formulaire pour les noms des joueurs en fonction du nombre de joueurs saisi.
   * @param {Event} event - L'événement de saisie utilisateur.
   */
  playersInput.addEventListener("input", () => {
    const numberOfPlayers = parseInt(playersInput.value, 10);
    playerNamesContainer.innerHTML = ""; // Réinitialiser le conteneur

    // Vérification du nombre minimal de joueurs
    if (numberOfPlayers < 2) {
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "La partie doit avoir au moins deux joueurs.";
      errorMessage.style.color = "red";
      errorMessage.style.fontWeight = "bold";

      playerNamesContainer.appendChild(errorMessage);
      return;
    }

    // Génération des champs de saisie des noms des joueurs
    for (let i = 1; i <= numberOfPlayers; i++) {
      const playerLabel = document.createElement("label");
      playerLabel.textContent = `Nom du joueur ${i} :`;
      playerLabel.htmlFor = `player-${i}`;

      const playerInput = document.createElement("input");
      playerInput.type = "text";
      playerInput.id = `player-${i}`;
      playerInput.name = `player-${i}`;
      playerInput.required = true;

      // Ajouter au conteneur
      playerNamesContainer.appendChild(playerLabel);
      playerNamesContainer.appendChild(playerInput);
    }
  });

  /**
   * Vérifie les noms des joueurs et génère un fichier JSON téléchargeable.
   * @param {Event} event - L'événement de clic du bouton démarrer.
   */
  startGameButton.addEventListener("click", (event) => {
    const playerInputs = playerNamesContainer.querySelectorAll("input");
    const playerNames = [];

    // Récupérer les noms des joueurs
    playerInputs.forEach((input) => {
      if (input.value.trim() !== "") {
        playerNames.push(input.value.trim());
      }
    });

    // Vérifier si tous les champs sont remplis
    if (playerNames.length < parseInt(playersInput.value, 10)) {
      alert("Veuillez remplir tous les noms des joueurs.");
      event.preventDefault();
      return;
    }

    // Générer un fichier JSON
    const playersData = JSON.stringify({ players: playerNames }, null, 2);

    // Créer un fichier JSON téléchargeable
    const blob = new Blob([playersData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Créer un lien de téléchargement
    const a = document.createElement("a");
    a.href = url;
    a.download = "players.json"; // Nom du fichier
    document.body.appendChild(a);
    a.click();

    // Nettoyer l'URL temporaire et l'élément
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
});
