"use client";

import { useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";


import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

import { themeColors } from "@/lib/theme";

import { games } from "@/api/games.api";
import { useGameContext } from "@/store/gameContext";
import { useUserContext } from "@/store/userContext";

import { type Card } from "@/types/game";



type Props = {
  id?: number;
  data: Card;
  setCardDrivenProps: Dispatch<SetStateAction<any>>;
  setIsDragging: Dispatch<SetStateAction<any>>;
  isDragging: boolean;
  isLast: boolean;
  setIsDragOffBoundary: Dispatch<SetStateAction<any>>;
  setDirection: Dispatch<SetStateAction<any>>;
};

type cardSwipeDirection = "left" | "right";

const GameCard = ({
  id,
  data,
  setCardDrivenProps,
  setIsDragging,
  isDragging,
  isLast,
  setIsDragOffBoundary,
  setDirection
}: Props) => {
  const [user, setUser] = useUserContext();
  const { score, previousScore } = user;

  const [game, setGame] = useGameContext();

  const { cards } = game;
  const cardsAmount = games[game.id].cards.length;

  const [imgLoadingComplete, setImgLoadingComplete] = useState(false);
  const hasScoreIncreased = previousScore !== score;

  const { affirmation, illustration, firstName, lastName, program, year} = data;
  const x = useMotionValue(0);


  const scoreVariants = {
    initial: {
      y: 0,
    },
    pop: {
      y: [0, -15, -20, -15, 0],
    },
  };

  const offsetBoundary = 150;

  const inputX = [offsetBoundary * -1, 0, offsetBoundary];
  const outputX = [-200, 0, 200];
  const outputY = [50, 0, 50];
  const outputRotate = [-40, 0, 40];
  const outputActionScaleBadAnswer = [3, 1, 0.3];
  const outputActionScaleRightAnswer = [0.3, 1, 3];
  const outputMainBgColor = [
    themeColors.gameSwipe.left,
    themeColors.gameSwipe.neutral,
    themeColors.gameSwipe.right,
  ];

  let drivenX = useTransform(x, inputX, outputX);
  let drivenY = useTransform(x, inputX, outputY);
  let drivenRotation = useTransform(x, inputX, outputRotate);
  let drivenActionLeftScale = useTransform(
    x,
    inputX,
    outputActionScaleBadAnswer
  );
  let drivenActionRightScale = useTransform(
    x,
    inputX,
    outputActionScaleRightAnswer
  );
  let drivenBg = useTransform(x, [-20, 0, 20], outputMainBgColor);

  useMotionValueEvent(x, "change", (latest) => {
    //@ts-ignore
    setCardDrivenProps((state) => ({
      ...state,
      cardWrapperX: latest,
      buttonScaleBadAnswer: drivenActionLeftScale,
      buttonScaleGoodAnswer: drivenActionRightScale,
      mainBgColor: drivenBg,
    }));
  });

  return (
    <>
      <motion.div
        id={`cardDrivenWrapper-${id}`}
        className="absolute bg-gray-100 rounded-lg text-center w-full aspect-[100/140] pointer-events-none text-black origin-bottom shadow-card select-none"
        style={{
          y: drivenY,
          rotate: drivenRotation,
          x: drivenX,
        }}
      >
        {/* <div<div
          id="metrics"
          className="flex w-full justify-between items-baseline"
        >
          <div className="text-gray-500">
            <span className="text-[62px] leading-none">{id}</span>
            <span className="text-[29px] ml-1">
              /<span className="ml-[2px]">{cardsAmount}</span>
            </span>
          </div>
          <div id="score" className="flex relative">
            <div className="text-[50px] text-grey-500 leading-none relative">
              <motion.div
                id="scoreValue"
                className="relative"
                variants={scoreVariants}
                initial="initial"
                animate={isLast && hasScoreIncreased ? "pop" : "initial"}
                transition={{
                  stiffness: 2000,
                  damping: 5,
                }}
              >
                {score}
              </motion.div>
              {isLast && hasScoreIncreased && (
                <div
                  id="sparks"
                  className="absolute w-[100px] h-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scal                > >                </div>                )}              </div>            </div>    </div>
        </div> */}
        <div
          id="illustration"
          className="w-full aspect-square relative rounded-t-lg overflow-hidden"
        >

          
          <div
            id="imgPlaceholder"
            className="bg-gameSwipe-neutral absolute object-cover w-full h-full"
          ></div>
          <Image
            priority
            
            className={`absolute object-cover object-center ${
              imgLoadingComplete ? "opacity-100" : "opacity-0"
            } duration-500 ease-out`}
            src={`/images/games/${illustration}.jpg`}
            fill
            sizes={`(max-width: 768px) 100vw, 250px`}
            alt="car"
            onLoad={(img) => setImgLoadingComplete(true)}
          />
        </div>
        <div className="flex flex-col justify-center items-center h-1/4">
          <p id="affirmation" className="mt-2 text-lg font-medium leading-tight">
            {firstName + " " + lastName}
          </p>
          <p id="program" className="text-sm text-muted-foreground">
            {program}
          </p>
          <p id="year" className="text-sm text-muted-foreground">
            {year}
          </p>
        </div>
      </motion.div>

      <motion.div
        id={`cardDriverWrapper-${id}`}
        className={`absolute w-full aspect-[100/140] ${
          !isDragging ? "hover:cursor-grab" : ""
        }`}
        drag="x"
        dragSnapToOrigin
        dragElastic={0.06}
        dragConstraints={{ left: 0, right: 0 }}
        dragTransition={{ bounceStiffness: 1000, bounceDamping: 50 }}
        onDragStart={() => setIsDragging(true)}
        onDrag={(_, info) => {
          const offset = info.offset.x;

          if (offset < 0 && offset < offsetBoundary * -1) {
            setIsDragOffBoundary("left");
          } else if (offset > 0 && offset > offsetBoundary) {
            setIsDragOffBoundary("right");
          } else {
            setIsDragOffBoundary(null);
          }
        }}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          setIsDragOffBoundary(null);
          const isOffBoundary =
            info.offset.x > offsetBoundary || info.offset.x < -offsetBoundary;
          const direction = info.offset.x > 0 ? "right" : "left";

          if (isOffBoundary) {
            setDirection(direction);
          }
        }}
        style={{ x }}
      ></motion.div>
    </>
  );
};

export default GameCard;
