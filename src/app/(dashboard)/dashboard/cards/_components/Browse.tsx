"use client";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";

import { useUserContext } from "@/store/userContext";
import { useBrowseContext } from "@/store/browseContext";
import { useEffect } from "react";
import { getInitialBrowse } from "@/api/browse.api";
import { user as initialUser } from "@/api/user.api";
import BrowseCards from "./BrowseCards";
import BrowseCompletion from "./BrowseCompletion";

interface BrowseProps {
  sessionID: string;
  initialMatchesCount: number;
}

const Browse: React.FC<BrowseProps> = ({ sessionID, initialMatchesCount }) => {
  const [browse, setBrowse] = useBrowseContext();
  const [_, setUser] = useUserContext();

  const initialBrowse = getInitialBrowse(0);

  useEffect(() => {
    setUser(initialUser);
    setBrowse(initialBrowse);
    window.scrollTo(0, document.body.scrollHeight);

  }, []);

  const isCardStockEmpty = browse.cards.length === 0;
  const browseScreenVariants = {
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
    <main className="min-h-screen h-full mx-auto bg-browseSwipe-neutral">
      <AnimatePresence mode="wait">
        {!isCardStockEmpty ? (
          <motion.div
            key="browseScreen1"
            id="browseScreen"
            variants={browseScreenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <BrowseCards />
          </motion.div>
        ) : (
          <div key="browseScreen2" id="browseCompletion">
            <BrowseCompletion
              sessionID={sessionID}
              initialMatchesCount={initialMatchesCount}
            />
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Browse;
