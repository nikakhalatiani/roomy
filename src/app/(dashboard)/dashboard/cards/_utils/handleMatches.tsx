import { Card, CardSwipeDirection } from "@/types/browse";

type Props = {
  direction: CardSwipeDirection | "";
  matches: number;
  cards: Card[];
};

const handleMatches = ({ direction, matches, cards }: Props) => {
  const currentCard = cards[cards.length - 1];
  const matchesIncrement =
    currentCard.answer === direction && direction === "right" ? 1 : 0;
  return matches + matchesIncrement;
};

export default handleMatches;
