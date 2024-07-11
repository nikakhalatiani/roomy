"use client";
import { Browse } from "@/types/browse";
import { createContext, useContext, useState } from "react";

const useBrowseState = (initialBrowse: Browse) => useState<Browse>(initialBrowse);

const BrowseContext = createContext<ReturnType<typeof useBrowseState> | null>(null);

const BrowseProvider = ({
  browse: initialBrowse,
  children,
}: {
  browse: Browse;
  children: React.ReactNode;
}) => {
  const [browse, setBrowse] = useBrowseState(initialBrowse);

  return (
    <BrowseContext.Provider value={[browse, setBrowse]}>
      {children}
    </BrowseContext.Provider>
  );
};

export default BrowseProvider;

export const useBrowseContext = () => {
  const user = useContext(BrowseContext);
  if (!user) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return user;
};
