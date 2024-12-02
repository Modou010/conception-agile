document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.getElementById("cards");
  const cardNumberDisplay = document.getElementById("card-number");

  // Liste des cartes avec leurs noms de fichiers spécifiques
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

  // Charger les cartes à partir de la liste
  cardFiles.forEach((cardFile) => {
    const cardImage = document.createElement("img");
    cardImage.src = `cartes/${cardFile}`;
    cardImage.alt = `Carte ${cardFile}`;
    cardImage.classList.add("card");

    // Extraire le numéro de la carte à partir du nom de fichier
    const cardNumber = cardFile.match(/\d+|cafe|interro/)[0];

    // Ajouter un gestionnaire d'événement pour la sélection de la carte
    cardImage.addEventListener("click", () => {
      cardNumberDisplay.textContent = `Carte ${cardNumber} sélectionnée`;
    });

    // Ajouter l'image de la carte au conteneur
    cardsContainer.appendChild(cardImage);
  });
});
