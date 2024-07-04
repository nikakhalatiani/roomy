import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import { buttonVariants } from "./ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Icons.logo className="h-16 w-16" />
                </Link>
              </div>
              <div className="ml-auto flex items-center">
                <div className="sm:flex sm:flex-1 sm:items-center sm:justify-end sm:space-x-4">
                  {session ? (
                    <p></p>
                  ) : (
                    <Link
                      href="/auth/sign-up"
                      className={buttonVariants({
                        variant: "ghost",
                        className: "text-gray-900 hover:text-rose-600",
                      })}
                    >
                      Sign up
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
