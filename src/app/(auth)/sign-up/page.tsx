"use client";
import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

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

  async function loginWithGoogle() {
    setLoad(true);
    try {
      await signIn("google");
    } catch (error) {
      console.error("Failed to login with Google", error);
    }
  }

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Link href="/">
              <Icons.logo
                className={cn("w-32 h-32", load ? "animate-spin-slow" : "")}
              />
            </Link>
            <h1 className="text-2xl font-bold">Create an account</h1>
            {/* <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1",
              })}
              href="/sign-in"
            >
              Already have an account? Log-in
              <ArrowRight className="w-4 h-4" />
            </Link> */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button
                className={buttonVariants({
                  variant: "outline",
                  className: "text-gray-900 min-w-[180px]",
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
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button
                className={buttonVariants({
                  variant: "outline",
                  className: "text-gray-900 min-w-[180px]",
                })}
                onClick={loginWithGoogle}
              >
                <svg
                  className="mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Use Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
