"use client";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";

import { useUserContext } from "@/store/userContext";
import { useBrowseContext } from "@/store/browseContext";
import { useEffect } from "react";
import { getInitialBrowse } from "../../../../api/browse.api";
import { user as initialUser } from "../../../../api/user.api";
import BrowseCards from "./_components/BrowseCards";
import BrowseCompletion from "./_components/BrowseCompletion";

const Game = () => {
  const [game, setGame] = useBrowseContext();
  const [_, setUser] = useUserContext();

  const initialGame = getInitialBrowse(0);

  useEffect(() => {
    setUser(initialUser);
    setGame(initialGame);
  }, []);

  const isCardStockEmpty = game.cards.length === 0;
  const gameScreenVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: { duration: 2, ease: cubicBezier(0.16, 1, 0.3, 1) },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, ease: cubicBezier(0.7, 0, 0.84, 0) },
    },
  };

  return (
    <main className="min-h-screen h-full mx-auto bg-gameSwipe-neutral overflow-hidden">
      <AnimatePresence mode="wait">
        {!isCardStockEmpty ? (
          <motion.div
            key="gameScreen1"
            id="gameScreen"
            variants={gameScreenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <BrowseCards />
          </motion.div>
        ) : (
          <div key="gameScreen2" id="gameCompletion">
            <BrowseCompletion />
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Game;
