"use client";

import { useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";

import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

import { themeColors } from "@/lib/theme";

// import { useBrowseContext } from "@/store/browseContext";
// import { useUserContext } from "@/store/userContext";

import { type Card } from "@/types/browse";
import { MousePointerClick, Sun, Moon } from "lucide-react";

type Props = {
  id?: number;
  data: Card;
  setCardDrivenProps: Dispatch<SetStateAction<any>>;
  setIsDragging: Dispatch<SetStateAction<any>>;
  isDragging: boolean;
  setIsDragOffBoundary: Dispatch<SetStateAction<any>>;
  setDirection: Dispatch<SetStateAction<any>>;
};

const BrowseCard = ({
  id,
  data,
  setCardDrivenProps,
  setIsDragging,
  isDragging,
  setIsDragOffBoundary,
  setDirection,
}: Props) => {
  // const [user, setUser] = useUserContext();
  // const { score } = user;

  // const [browse, setBrowse] = useBrowseContext();

  // const { cards } = browse;
  // const cardsAmount = browses[browse.id].cards.length;

  const [imgLoadingComplete, setImgLoadingComplete] = useState<boolean>(false);
  // const hasScoreIncreased = previousScore !== score;
  const x = useMotionValue(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const offsetBoundary = 150;

  const inputX = [offsetBoundary * -1, 0, offsetBoundary];
  const outputX = [-200, 0, 200];
  const outputY = [50, 0, 50];
  const outputRotate = [-40, 0, 40];
  const outputActionScaleBadAnswer = [3, 1, 0.3];
  const outputActionScaleRightAnswer = [0.3, 1, 3];
  const outputMainBgColor = [
    themeColors.browseSwipe.left,
    themeColors.browseSwipe.neutral,
    themeColors.browseSwipe.right,
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
        className="absolute bg-gray-100 rounded-lg text-center w-full aspect-[100/140] pointer-events-none text-black origin-bottom drop-shadow-lg select-none"
        style={{
          y: drivenY,
          rotate: drivenRotation,
          x: drivenX,
        }}
      >
        {/* <div
          id="metrics"
          className="flex w-full justify-between items-baseline"
        >
          <div className="text-gray-500">
            <span className="text-[62px] leading-none">{id}</span>
            <span className="text-[29px] ml-1">
            </span>
          </div>
          <div id="score" className="flex relative">
            <div className="text-[50px] text-grey-500 leading-none relative">
              <motion.div
                id="scoreValue"
                className="relative"
                initial="initial"
                transition={{
                  stiffness: 2000,
                  damping: 5,
                }}
              >
                {score}
              </motion.div>
            </div>{" "}
          </div>
        </div> */}
        <div
          id="illustration"
          className="w-full aspect-square relative rounded-t-lg overflow-hidden"
        >
          <div
            id="imgPlaceholder"
            className="bg-browseSwipe-neutral absolute object-cover w-full h-full"
          ></div>
          <Image
            priority
            className={`absolute object-cover object-center ${
              imgLoadingComplete ? "opacity-100" : "opacity-0"
            } duration-500 ease-out`}
            src={`/images/games/${data.illustration}.jpg`}
            fill
            sizes={`(max-width: 768px) 100vw, 250px`}
            alt="car"
            onLoad={(_) => setImgLoadingComplete(true)}
          />
        </div>
        <div className="flex flex-col items-center h-1/4 mb-4">
          <p
            id="affirmation"
            className="mt-4 mb-2 text-lg font-medium leading-tight"
          >
            {data.firstName + " " + data.lastName}
          </p>
          <div className="flex justify-between w-full px-6 ">
            <div className="flex flex-col items-start">
              <p id="program" className="text-sm text-muted-foreground">
                Major: <span className="font-medium">{data.program}</span>
              </p>
              <p id="age" className="text-sm text-muted-foreground">
                Age: <span className="font-medium">{data.age}</span>
              </p>
              {data.year && (
                <p id="year" className="text-sm text-muted-foreground">
                  Year: <span className="font-medium">{data.year}</span>
                </p>
              )}
              {data.minor && (
                <p id="minor" className="text-sm text-muted-foreground">
                  Minor: <span className="font-medium">{data.minor}</span>
                </p>
              )}
            </div>
            <div className="flex flex-col items-end">
              <p className="text-muted-foreground text-sm inline-flex">
                {data.morning ? (
                  <>
                    <Sun className="h-4 w-4 mr-1 mt-0.5" />
                    Person
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4 mr-1 mt-0.5" />
                    Person
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
        {/* <div className="flex mb-2 text-muted-foreground flex-col items-center">
          <MousePointerClick />
          <p className="text-sm text-muted-foreground">Click to read more</p>
        </div> */}
      </motion.div>

      <motion.div
        id={`cardDriverWrapper-${id}`}
        className={`absolute w-full aspect-[100/140] ${
          !isDragging ? "hover:cursor-grab" : ""
        }`}
        drag="x"
        dragSnapToOrigin
        dragElastic={isMobile ? 0.2 : 0.06}
        dragConstraints={{ left: 0, right: 0 }}
        dragTransition={{ bounceStiffness: 1000, bounceDamping: 50 }}
        onDragStart={() => setIsDragging(true)}
        onDrag={(_, info) => {
          const offset = info.offset.x;

          if (offset < 0 && offset < -offsetBoundary) {
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

export default BrowseCard;
