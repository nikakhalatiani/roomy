import { Card, Game } from "@/types/game";

export const games: Game[] = [
  {
    id: 1,
    cards: [
      {
        affirmation: "",
        firstName: "Giorgi",
        lastName: "Losaberidze",
        program: "Management",
        year: "Freshman",
        answer: "right",
        illustration: "giorgi",
      },
      {
        affirmation: "",
        firstName: "Zura",
        lastName: "Kobaladze",
        year: "Junior",
        answer: "left",
        illustration: "zuzu",
      },
      {
        affirmation: "",
        firstName: "Sandro",
        lastName: "Sainishvili",
        program: "Computer Science",
        year: "Senior",
        answer: "right",
        illustration: "sandro",
      },
    ],
  },
];

export const getGames = async (): Promise<Game[]> => games;

export const getGame = async (gameId: number): Promise<Game> => {
  return { id: gameId, cards: reversedCards(games[gameId].cards) };
};

export const getInitialGame = (gameId: number) => {
  return { id: gameId, cards: reversedCards(games[gameId].cards) };
};

const reversedCards = (cards: Card[]) => {
  return cards
    .map((item, i) => {
      return { ...item, id: i + 1 };
    })
    .reverse();
};
