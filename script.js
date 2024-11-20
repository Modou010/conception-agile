document.addEventListener("DOMContentLoaded", () => {
  const playersInput = document.getElementById("players");
  const playerNamesContainer = document.getElementById("player-names");

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
});
