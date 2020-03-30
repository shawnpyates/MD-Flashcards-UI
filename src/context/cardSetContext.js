import React, { createContext } from "react";

export const CardSetContext = createContext();

export const CardSetProvider = ({
  children,
  currentCards,
  displayFirst,
  currentMode,
  originalSet,
  dispatch,
}) => (
  <CardSetContext.Provider
    value={{
      currentCards,
      displayFirst,
      currentMode,
      originalSet,
      dispatch,
    }}
  >
    {children}
  </CardSetContext.Provider>
);
