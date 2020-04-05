/* eslint react/prop-types: 0 */
import React, { createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children, currentUser, isUserLoading }) => (
  <UserContext.Provider value={{ currentUser, isUserLoading }}>
    {children}
  </UserContext.Provider>
);
