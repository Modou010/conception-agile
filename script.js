// script.js corrigé avec les fonctions exportées pour les tests

document.addEventListener("DOMContentLoaded", () => {
  const playersInput = document.getElementById("players");
  const playerNamesContainer = document.getElementById("player-names");
  const startGameButton = document.getElementById("start-game");
  const menuSection = document.getElementById("menu");

  startGameButton.disabled = true;

  const errorMessage = document.createElement("p");
  errorMessage.style.color = "red";
  errorMessage.style.fontWeight = "bold";
  errorMessage.style.display = "none";
  menuSection.appendChild(errorMessage);

  playersInput.addEventListener("input", () => {
    const numberOfPlayers = parseInt(playersInput.value, 10);
    playerNamesContainer.innerHTML = "";
    errorMessage.style.display = "none";

    const validationError = validatePlayersInput(numberOfPlayers);
    if (validationError) {
      errorMessage.textContent = validationError;
      errorMessage.style.display = "block";
      startGameButton.disabled = true;
      return;
    }

    startGameButton.disabled = false;

    for (let i = 1; i <= numberOfPlayers; i++) {
      const playerLabel = document.createElement("label");
      playerLabel.textContent = `Nom du joueur ${i} :`;
      playerLabel.htmlFor = `player-${i}`;

      const playerInput = document.createElement("input");
      playerInput.type = "text";
      playerInput.id = `player-${i}`;
      playerInput.name = `player-${i}`;
      playerInput.required = true;

      playerNamesContainer.appendChild(playerLabel);
      playerNamesContainer.appendChild(playerInput);
    }
  });

  startGameButton.addEventListener("click", () => {
    const playerInputs = playerNamesContainer.querySelectorAll("input");
    const playerNames = [];

    playerInputs.forEach((input) => {
      if (input.value.trim() !== "") {
        playerNames.push(input.value.trim());
      }
    });

    if (playerNames.length < parseInt(playersInput.value, 10)) {
      alert("Veuillez remplir tous les noms des joueurs.");
      return;
    }

    const selectedRule = document.getElementById("rule").value;

    localStorage.setItem("players", JSON.stringify(playerNames));
    localStorage.setItem("rule", selectedRule);

    window.location.href = "page2.html";
  });
});

function validatePlayersInput(numberOfPlayers) {
  if (isNaN(numberOfPlayers) || numberOfPlayers < 2) {
    return "⚠️ La partie doit avoir au moins 2 joueurs.";
  }
  if (numberOfPlayers > 10) {
    return "⚠️ La partie ne peut pas avoir plus de 10 joueurs.";
  }
  return null;
}

module.exports = { validatePlayersInput };
