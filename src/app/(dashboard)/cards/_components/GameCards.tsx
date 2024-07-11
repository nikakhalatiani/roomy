import { useEffect, useState } from "react";
import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import { useBrowseContext } from "@/store/browseContext";
import { useUserContext } from "@/store/userContext";
import handleMatches from "../_utils/handleMatches";
import BrowseCard from "./BrowseCard";
import BrowseActionBtn from "./BrowseActionBtn";
import { CardSwipeDirection, IsDragOffBoundary } from "@/types/browse";
import { themeColors } from "@/lib/theme";

const initialDrivenProps = {
  cardWrapperX: 0,
  buttonScaleBadAnswer: 1,
  buttonScaleGoodAnswer: 1,
  mainBgColor: themeColors.browseSwipe.neutral,
};

// const easeInExpo = [0.7, 0, 0.84, 0];
const easeOutExpo = [0.16, 1, 0.3, 1];
// const easeInOutExpo = [0.87, 0, 0.13, 1];

const BrowseCards = () => {
  const [user, setUser] = useUserContext();
  const [browse, setBrowse] = useBrowseContext();

  const { matches } = user;
  const { cards } = browse;

  const [direction, setDirection] = useState<CardSwipeDirection | "">("");
  const [isDragOffBoundary, setIsDragOffBoundary] =
    useState<IsDragOffBoundary>(null);
  const [cardDrivenProps, setCardDrivenProps] = useState(initialDrivenProps);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleActionBtnOnClick = (btn: CardSwipeDirection) => {
    setDirection(btn);
  };

  useEffect(() => {
    if (["left", "right"].includes(direction)) {
      setBrowse({
        ...browse,
        cards: browse.cards.slice(0, -1),
      });
      setUser({
        matches: handleMatches({ direction, matches, cards }),
      });
    }

    setDirection("");
  }, [direction]);

  const cardVariants = {
    current: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: easeOutExpo },
    },
    upcoming: {
      opacity: 0.3,
      y: 67,
      scale: 0.9,
      x: 33,
      transition: { duration: 0.3, ease: easeOutExpo, delay: 0 },
    },
    remainings: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    exit: {
      opacity: 0,
      x: direction === "left" ? -300 : 300,
      y: 40,
      rotate: direction === "left" ? -20 : 20,
      transition: { duration: 0.3, ease: easeOutExpo },
    },
  };

  return (
    <motion.div
      className={`flex p-5 min-h-screen h-full flex-col justify-center items-center overflow-hidden  ${
        isDragging ? "cursor-grabbing" : ""
      } bg-repeat `}
      style={{
        backgroundColor: cardDrivenProps.mainBgColor,
        backgroundImage: 'url("/svg/background.svg")',
        backgroundSize: "120px 120px",
      }}
    >
      <Link
        href="/chats"
        className="absolute top-[20px] right-[20px] w-[30px] h-auto"
      >
        <X className="text-muted-foreground w-full h-full" />
      </Link>

      <div
        id="browseUIWrapper"
        className="flex flex-col gap-6 w-full items-center justify-center relative z-10"
      >
        <div
          id="cardsWrapper"
          className="w-full aspect-[100/140] max-w-xs mb-[20px] relative z-10"
        >
          <AnimatePresence>
            {cards.map((card, i) => {
              const isLast = i === cards.length - 1;
              const isUpcoming = i === cards.length - 2;
              return (
                <motion.div
                  key={`card-${i}`}
                  id={`card-${card.id}`}
                  className={`relative `}
                  variants={cardVariants}
                  initial="remainings"
                  animate={
                    isLast ? "current" : isUpcoming ? "upcoming" : "remainings"
                  }
                  exit="exit"
                >
                  <BrowseCard
                    data={card}
                    id={card.id}
                    setCardDrivenProps={setCardDrivenProps}
                    setIsDragging={setIsDragging}
                    isDragging={isDragging}
                    setIsDragOffBoundary={setIsDragOffBoundary}
                    setDirection={setDirection}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <div
          id="actions"
          className="flex items-center justify-center w-full  gap-4 relative z-10"
        >
          <BrowseActionBtn
            direction="left"
            ariaLabel="swipe left"
            scale={cardDrivenProps.buttonScaleBadAnswer}
            isDragOffBoundary={isDragOffBoundary}
            onClick={() => handleActionBtnOnClick("left")}
          />
          <BrowseActionBtn
            direction="right"
            ariaLabel="swipe right"
            scale={cardDrivenProps.buttonScaleGoodAnswer}
            isDragOffBoundary={isDragOffBoundary}
            onClick={() => handleActionBtnOnClick("right")}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default BrowseCards;
