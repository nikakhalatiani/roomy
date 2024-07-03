import { Icons } from "@/components/Icons";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const Page = () => {
  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="w-32 h-32" />
            <h1 className="text-2xl font-bold">
              Only KIU students are allowed to{" "}
              <span className="text-rose-600">roomy</span>
            </h1>
            <p className="mt-6 text-lg max-w-prose text-muted-foreground">
              Try again with your{" "}
              <span className="text-rose-500">kiu.edu.ge</span> email
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link href="/auth/sign-up" className={buttonVariants()}>
                <span className="text-base">Sign up</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
