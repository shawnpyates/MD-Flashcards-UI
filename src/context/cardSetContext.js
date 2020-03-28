import React, { createContext } from "react";

export const CardSetContext = createContext();

export const CardSetProvider = ({
  children,
  currentSet,
  currentMode,
  setCurrentMode,
  setCurrentSet,
}) => (
  <CardSetContext.Provider
    value={{ currentSet, currentMode, setCurrentMode, setCurrentSet }}
  >
    {children}
  </CardSetContext.Provider>
);
