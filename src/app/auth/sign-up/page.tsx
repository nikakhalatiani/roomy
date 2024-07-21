"use client";
import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";

const Page = () => {
  const [load, setLoad] = useState<boolean>(false);
  async function loginWithOutlook() {
    setLoad(true);
    try {
      await signIn("azure-ad");
    } catch (error) {
      console.error("Failed to login with Microsoft", error);
    }
  }

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo
            className={cn("w-32 h-32", load ? "animate-spin-slow" : "")}
          />
          <h1 className="text-2xl font-bold">
            Join <span className="text-rose-600">roomy</span> right now
          </h1>

          <p className="mt-6 text-base max-w-prose text-muted-foreground pb-1">
            Use your KIU student email only{" "}
          </p>
          <div className="flex flex-col sm:flex-col gap-4 mt-6">
            <Button
              className={buttonVariants({
                variant: "outline",
                className: "text-gray-900 min-w-[250px]",
              })}
              onClick={loginWithOutlook}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 23 23"
                className="mr-2 h-4 w-4"
              >
                <path fill="#f35325" d="M1 1h10v10H1z" />
                <path fill="#81bc06" d="M12 1h10v10H12z" />
                <path fill="#05a6f0" d="M1 12h10v10H1z" />
                <path fill="#ffba08" d="M12 12h10v10H12z" />
              </svg>
              Use Microsoft
            </Button>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or
                </span>
              </div>
            </div>
            <Input
              id="email"
              placeholder="khalatiani.nikolai@kiu.edu.ge"
              className="focus-visible:ring-transparent"
            />
            <Button
              className={buttonVariants({
                className: "text-gray-50 min-w-[250px]",
              })}
              onClick={() => {}}
            >
              Use Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
