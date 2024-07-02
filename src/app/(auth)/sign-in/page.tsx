"use client";
import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Page = () => {
  const [load, setLoad] = useState(true);


  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo
              className={cn("w-32 h-32", load ? "" : "animate-spin-slow")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
