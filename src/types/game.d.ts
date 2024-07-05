export type Game = {
    id: number;
    cards: Card[];
  };
  
  export type Card = {
    id?: number;
    affirmation: string;
    answer: "left" | "right";
    illustration: string;
    firstName: string;
    lastName: string;
    program?: string;
    year?: string;
  };
  
  export type CardSwipeDirection = "left" | "right";
  export type IsDragOffBoundary = "left" | "right" | null;
  