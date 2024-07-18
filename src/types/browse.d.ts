export type Browse = {
    cards: Card[];
  };
  
  export type Card = {
    id?: number;
    answer: "left" | "right" | null;
    illustration?: string;
    firstName: string;
    lastName: string;
    program: string;
    age: number;
    minor?: string;
    year?: string;
    morning: boolean;
  };
  
  export type CardSwipeDirection = "left" | "right";
  export type IsDragOffBoundary = "left" | "right" | null;
  