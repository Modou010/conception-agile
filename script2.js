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
  cardFiles.forEach((cardFile, index) => {
    const cardImage = document.createElement("img");
    cardImage.src = `cartes/${cardFile}`; // Utilise le chemin pour chaque fichier de carte
    cardImage.alt = `Carte ${index}`;
    cardImage.classList.add("card");
    cardImage.dataset.cardNumber = index; // L'index peut être utilisé pour l'identifier, ou tu peux utiliser un autre attribut

    // Ajouter un gestionnaire d'événement pour la sélection de la carte
    cardImage.addEventListener("click", () => {
      const selectedCardNumber = cardImage.dataset.cardNumber;
      cardNumberDisplay.textContent = `Carte ${selectedCardNumber} sélectionnée`;
    });

    // Ajouter l'image de la carte au conteneur
    cardsContainer.appendChild(cardImage);
  });
});
