"use client";
import { buttonVariants } from "@/components/ui/button";
import { useUserContext } from "@/store/userContext";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BrowseCompletionProps {
  sessionID: string;
  initialMatchesCount: number;
}

const BrowseCompletion: React.FC<BrowseCompletionProps> = ({
  sessionID,
  initialMatchesCount,
}) => {
  const [userMatchesCount, setUserMatchesCount] =
    useState<number>(initialMatchesCount);

  const [user, setUser] = useUserContext();

  return (
    <div
      className={
        "flex p-5 min-h-screen h-full flex-col items-center justify-center overflow-hidden"
      }
    >
      <div className="flex flex-col items-center justify-center text-center relative z-10">
        <h1 className="font-bold tracking-tight text-gray-900 text-4xl">
          No more <span className="text-rose-600">roomies</span> available{" "}
        </h1>
        <div className="mt-8">
          {userMatchesCount > 0 ? (
            <Link
              href="/dashboard/chats"
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              {userMatchesCount > 1 ? (
                <span className="text-lg">
                  Chat your {userMatchesCount} matches
                </span>
              ) : (
                <span className="text-lg">Chat your match</span>
              )}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BrowseCompletion;
