import React, { createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children, currentUser }) => (
  <UserContext.Provider value={{ currentUser }}>
    {children}
  </UserContext.Provider>
);
