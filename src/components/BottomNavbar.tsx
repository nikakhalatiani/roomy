"use client";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import {
  Heart,
  Compass,
  MessageCircle,
  CircleUserRound,
  SlidersHorizontal,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const BottomNavbar = () => {
  const currentPath = usePathname();
  return (
    <div className="bg-white fixed z-50 bottom-0 inset-x-0 h-12">
      <MaxWidthWrapper>
        <div className="border-t border-gray-200">
          <div className="flex h-12 items-center justify-around">
            <Link
              href="/dashboard/filters"
              className={cn(
                "flex flex-col items-center transition-colors",
                "/dashboard/filters" === currentPath
                  ? "text-rose-600"
                  : "text-gray-900"
              )}
            >
              <SlidersHorizontal className="h-6 w-6" strokeWidth={1.5} />
            </Link>
            <Link
              href="/dashboard/matches"
              className={cn(
                "flex flex-col items-center transition-colors",
                "/dashboard/matches" === currentPath ? "text-rose-600" : "text-gray-900"
              )}
            >
              <Heart className="h-6 w-6" strokeWidth={1.5} />
            </Link>
            <Link
              href="/dashboard/cards"
              className={cn(
                "flex flex-col items-center transition-colors",
                "/dashboard/cards" === currentPath
                  ? "text-rose-600"
                  : "text-gray-900"
              )}
            >
              <Compass className="h-6 w-6" strokeWidth={1.5} />
            </Link>
            <Link
              href="/dashboard/chats"
              className={cn(
                "flex flex-col items-center transition-colors",
                "/dashboard/chats" === currentPath
                  ? "text-rose-600"
                  : "text-gray-900"
              )}
            >
              <MessageCircle className="h-6 w-6" strokeWidth={1.5} />
            </Link>
            <Link
              href="/dashboard/profile"
              className={cn(
                "flex flex-col items-center transition-colors",
                "/dashboard/profile" === currentPath
                  ? "text-rose-600"
                  : "text-gray-900"
              )}
            >
              <CircleUserRound className="h-6 w-6" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default BottomNavbar;
