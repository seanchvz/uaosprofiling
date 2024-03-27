"use client";
import React, { createContext, useContext, useState } from "react";
import themes from "./themes";
import axios from "axios";

const InventoryGlobalContext = createContext();
const InventoryGlobalUpdateContext = createContext();

export const InventoryGlobalProvider = ({ children }) => {
  console.log("Loading global state")
  const [selectedTheme, setSelectedTheme] = useState(0);
  const theme = themes[selectedTheme]; // Set the default theme here
  const [isLoading, setIsLoading] = useState(false);

  return (
    <InventoryGlobalContext.Provider
      value={{
        theme,
        inventoryItem,
      }}
    >
      <InventoryGlobalUpdateContext.Provider value={{}}>
        {children}
      </InventoryGlobalUpdateContext.Provider>
    </InventoryGlobalContext.Provider>
  );
};

export const useInventoryGlobalState = () => useContext(InventoryGlobalContext);
export const useInventoryGlobalUpdate = () =>
  useContext(InventoryGlobalUpdateContext);