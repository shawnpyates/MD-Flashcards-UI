import React, { createContext } from "react";

export const CardSetContext = createContext();

export const CardSetProvider = ({
  children,
  currentSet,
  currentMode,
  setCurrentMode,
  setCurrentSet,
  displayFirst,
  setDisplayFirst,
}) => (
  <CardSetContext.Provider
    value={{
      currentSet,
      currentMode,
      setCurrentMode,
      setCurrentSet,
      displayFirst,
      setDisplayFirst,
    }}
  >
    {children}
  </CardSetContext.Provider>
);
