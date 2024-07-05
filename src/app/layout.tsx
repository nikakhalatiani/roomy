import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import UserProvider from "@/store/userContext";
import GameProvider from "@/store/gameContext";

import { getUser } from "@/api/user.api";
import { getGame } from "@/api/games.api";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Roomy",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  const game = await getGame(0);

  return (
    <html lang="en" className="h-full">
      <body
        className={cn("relative h-full text-sans antialiased", inter.className)}
      >
        <UserProvider user={user}>
          <GameProvider game={game}>
            {
              <main className="relative flex flex-col min-h-screen">
                <div className="flex-grow flex-1">{children}</div>
              </main>
            }
          </GameProvider>
        </UserProvider>
      </body>
    </html>
  );
}
