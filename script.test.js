const { validatePlayersInput } = require("./script"); // Import de script.js
const { trouverMajorite } = require("./script2"); // Import de script2.js

describe("validatePlayersInput", () => {
  test("should return an error for less than 2 players", () => {
    expect(validatePlayersInput(1)).toBe(
      "⚠️ La partie doit avoir au moins 2 joueurs."
    );
  });

  test("should return an error for more than 10 players", () => {
    expect(validatePlayersInput(11)).toBe(
      "⚠️ La partie ne peut pas avoir plus de 10 joueurs."
    );
  });

  test("should return null for valid number of players", () => {
    expect(validatePlayersInput(5)).toBeNull();
  });
});

describe("trouverMajorite", () => {
  test("should find the relative majority", () => {
    const cards = [5, 5, 8, 3, 5, 8];
    expect(trouverMajorite(cards, false)).toBe("Carte 5 (3 votes)");
  });

  test("should find absolute majority", () => {
    const cards = [5, 5, 5, 3, 8];
    expect(trouverMajorite(cards, true)).toBe("Carte 5 (3 votes)");
  });

  test("should return no absolute majority", () => {
    const cards = [5, 5, 3, 3, 8];
    expect(trouverMajorite(cards, true)).toBe("Aucune majorité absolue");
  });
});
