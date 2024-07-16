import { buttonVariants } from "@/components/ui/button";
import { useUserContext } from "@/store/userContext";
import Link from "next/link";

const BrowseCompletion = () => {
  const [user, setUser] = useUserContext();

  return (
    <div
      className={
        "flex p-5 min-h-screen h-full flex-col items-center justify-center overflow-hidden"
      }
    >
      <div className="flex flex-col items-center justify-center text-center relative z-10">
        <h1 className="font-bold tracking-tight text-gray-900 sm:text-4xl">
          No more <span className="text-rose-600">roomies</span> available{" "}
        </h1>
        <div className="mt-8">
          <Link
            href="/chats"
            className={buttonVariants({ variant: "default", size: "lg" })}
          >
            <span className="text-lg">Chat your {user.matches} Matches</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BrowseCompletion;
