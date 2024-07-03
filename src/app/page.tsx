import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { CircleUserRound, SearchCheck, MessageCircle } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

const features = [
  {
    name: "Create a Profile",
    Icon: CircleUserRound,
    description: "Let others know you",
  },
  {
    name: "Find a Roommate",
    Icon: SearchCheck,
    description: "Look for people who share same interests as you",
  },
  {
    name: "Chat in Real Time",
    Icon: MessageCircle,
    description: "Get to know each other better with our chat feature",
  },
];
export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Navbar />

      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Welcome to <span className="text-rose-600">Roomy</span>!
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Find a roommate who shares your lifestyle{" "}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link
              href={session ? "/browse" : "/auth/sign-up"}
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              <span className="text-base">Look for People</span>
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gp-x-8 lg:gap-y-0">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-14 w-14 flex items-center justify-center rounded-full bg-rose-100 text-rose-700">
                    {" "}
                    {<feature.Icon className="w-1/2 h-1/2" />}
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="test-base font-medium text-gray-900">
                    {feature.name}
                  </h3>
                  <p className="mt-3 test-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
