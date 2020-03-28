import React, { createContext } from "react";

export const CardSetContext = createContext();

export const CardSetProvider = ({
  children,
  currentSetName,
  currentMode,
  setCurrentMode,
  cards,
  setCards,
}) => (
  <CardSetContext.Provider
    value={{ currentSetName, currentMode, setCurrentMode, cards, setCards }}
  >
    {children}
  </CardSetContext.Provider>
);
