document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.getElementById("cards");
  const cardNumberDisplay = document.getElementById("card-number");
  const currentPlayerDisplay = document.getElementById("current-player");
  const taskContainer = document.getElementById("task");

  const players = JSON.parse(localStorage.getItem("players")) || [];
  const modeDeJeu = localStorage.getItem("rule") || "average";

  const playerListContainer = document.getElementById("players");
  players.forEach((player) => {
    const listItem = document.createElement("li");
    listItem.textContent = player;
    playerListContainer.appendChild(listItem);
  });

  const taches = [
    "Voir les identités des collaborateurs",
    "Créer un nouveau profil",
    "Insérer une photo dans un profil",
    "Modifier un profil existant",
    "Consulter un profil détaillé",
  ];

  let currentTaskIndex = 0;
  let currentPlayerIndex = 0;
  let chosenCards = [];
  const results = []; // Tableau pour stocker les résultats des votes

  function afficherTache() {
    taskContainer.textContent = `Tâche à voter : ${taches[currentTaskIndex]}`;
  }

  const cardFiles = [
    "cartes_0.svg",
    "cartes_1.svg",
    "cartes_2.svg",
    "cartes_3.svg",
    "cartes_5.svg",
    "cartes_8.svg",
    "cartes_13.svg",
    "cartes_20.svg",
    "cartes_40.svg",
    "cartes_100.svg",
    "cartes_cafe.svg",
    "cartes_interro.svg",
  ];

  cardFiles.forEach((cardFile) => {
    const cardImage = document.createElement("img");
    cardImage.src = `cartes/${cardFile}`;
    cardImage.alt = `Carte ${cardFile}`;
    cardImage.classList.add("card");

    const cardNumber = cardFile.match(/\d+|cafe|interro/)[0];
    cardImage.addEventListener("click", () => {
      chosenCards.push(parseInt(cardNumber) || cardNumber);
      cardNumberDisplay.textContent = `Carte ${cardNumber} sélectionnée`;

      currentPlayerIndex++;
      if (currentPlayerIndex < players.length) {
        currentPlayerDisplay.textContent = `C'est le tour de ${players[currentPlayerIndex]}`;
      } else {
        currentPlayerIndex = 0;
        afficherResultat();
      }
    });

    cardsContainer.appendChild(cardImage);
  });

  function afficherResultat() {
    let result;

    if (modeDeJeu === "average") {
      result =
        chosenCards.filter(isNumber).reduce((a, b) => a + b, 0) /
        chosenCards.filter(isNumber).length;
      result = `Moyenne : ${result.toFixed(2)}`;
    } else if (modeDeJeu === "median") {
      const sorted = chosenCards.filter(isNumber).sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      result =
        sorted.length % 2 === 0
          ? (sorted[mid - 1] + sorted[mid]) / 2
          : sorted[mid];
      result = `Médiane : ${result}`;
    } else if (modeDeJeu === "absolute-majority") {
      result = trouverMajorite(chosenCards, true);
      if (result === "Aucune majorité absolue") {
        afficherPopup(
          "Revote requis",
          "Aucune majorité absolue trouvée. Revotez !"
        );
        chosenCards = [];
        currentPlayerIndex = 0;
        return;
      }
    } else if (modeDeJeu === "relative-majority") {
      result = trouverMajorite(chosenCards, false);
    }

    // Ajouter le résultat au tableau des résultats
    results.push({
      task: taches[currentTaskIndex],
      mode: modeDeJeu,
      result: result,
      votes: [...chosenCards],
    });

    // Afficher un popup pour chaque tâche
    afficherPopup(
      `Résultat de la tâche "${taches[currentTaskIndex]}"`,
      `Mode: ${modeDeJeu}\nRésultat: ${result}\nVotes: ${chosenCards.join(
        ", "
      )}`
    );

    if (currentTaskIndex >= taches.length - 1) {
      let message =
        "Toutes les tâches ont été votées ! Voici les résultats :\n";
      results.forEach((res, index) => {
        message += `Tâche ${index + 1}: ${res.task}\nMode: ${
          res.mode
        }\nRésultat: ${res.result}\nVotes: ${res.votes.join(", ")}\n\n`;
      });

      afficherPopup("Fin du jeu", message);
      exporterResultats(); // Appeler l'export des résultats
    } else {
      currentTaskIndex++;
      afficherTache();
    }
  }

  afficherTache();
  currentPlayerDisplay.textContent = `C'est le tour de ${players[currentPlayerIndex]}`;
});

// Fonction pour afficher une popup
function afficherPopup(titre, message) {
  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.padding = "20px";
  popup.style.backgroundColor = "#4caf50";
  popup.style.color = "#fff";
  popup.style.border = "2px solid #4caf50";
  popup.style.borderRadius = "8px";
  popup.style.zIndex = "1000";
  popup.style.textAlign = "center";

  const popupTitle = document.createElement("h3");
  popupTitle.textContent = titre;

  const popupMessage = document.createElement("p");
  popupMessage.textContent = message;

  const closeButton = document.createElement("button");
  closeButton.textContent = "Fermer";
  closeButton.style.marginTop = "10px";
  closeButton.style.padding = "5px 10px";
  closeButton.style.cursor = "pointer";

  closeButton.addEventListener("click", () => {
    document.body.removeChild(popup);
  });

  popup.appendChild(popupTitle);
  popup.appendChild(popupMessage);
  popup.appendChild(closeButton);
  document.body.appendChild(popup);
}

// Fonction pour exporter les résultats
function exporterResultats() {
  const dataStr = JSON.stringify(results, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "resultats_votes.json"; // Nom du fichier à télécharger
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Fonction pour trouver la majorité (relative ou absolue)
function trouverMajorite(cards, absolue) {
  const counts = {};
  cards.forEach((val) => {
    counts[val] = (counts[val] || 0) + 1;
  });

  const maxCount = Math.max(...Object.values(counts));
  const majoritaire = Object.keys(counts).find(
    (key) => counts[key] === maxCount
  );

  if (absolue && maxCount <= cards.length / 2) {
    return "Aucune majorité absolue";
  }
  return `Carte ${majoritaire} (${maxCount} votes)`;
}

// Fonction pour vérifier si une valeur est un nombre
function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}

// Export des fonctions pour les tests
module.exports = {
  trouverMajorite,
  isNumber,
};
