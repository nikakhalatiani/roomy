import { Card, Browse } from "@/types/browse";

export const cards: Browse[] = [
  {
    cards: [
      {
        firstName: "Giorgi",
        lastName: "Losaberidze",
        program: "MGMT",
        year: "Freshman",
        answer: "right",
        illustration: "giorgi",
        age: 18,
        morning: true,
        swiped: false,
      },
      {
        firstName: "Zura",
        lastName: "Kobaladze",
        answer: "left",
        illustration: "zuzu",
        program: "CS",
        age: 21,
        minor: "MGMT",
        morning: false,
        swiped: false,
      },
      {
        firstName: "Sandro",
        lastName: "Sainishvili",
        program: "CS",
        year: "Senior",
        answer: "right",
        illustration: "sandro",
        age: 22,
        morning: false,
        swiped: false,
      },
    ],
  },
];

export const getBrowses = async (): Promise<Browse[]> => cards;

export const getBrowse = async (browseId: number): Promise<Browse> => {
  return { cards: reversedCards(cards[browseId].cards) };
};

export const getInitialBrowse = (browseId: number) => {
  return { cards: reversedCards(cards[browseId].cards).filter((card) => card.swiped === false)};
};

const reversedCards = (cards: Card[]) => {
  return cards
    .map((item, i) => {
      return { ...item, id: i + 1 };
    })
    .reverse();
};
