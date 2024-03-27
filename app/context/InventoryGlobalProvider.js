'use client'
import React, { createContext, useContext, useState } from 'react';
import themes from "./themes";
import axios from 'axios';

const InventoryGlobalContext = createContext();

export const InventoryGlobalProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const theme = themes[selectedTheme]; // Set the default theme here
  const [isLoading, setIsLoading] = useState(false);
  const [inventoryItem, setInventoryItem] = useState([]);


  const allInventoryItem = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/inventory");
      // console.log(res.data);
      const sorted = res.data.sort((a, b) => {
        return (
          new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime() // after creating an event, the content will add at the top
        );
      });
      setInventoryItem(sorted);
      setIsLoading(false);
console.log(res.data)

    } catch (error) {
      console.log(error);
      
    }
  };
  React.useEffect(() => {
    allInventoryItem();
  },[]);

  return (
    <InventoryGlobalContext.Provider value={{ theme }}>
      {children}
    </InventoryGlobalContext.Provider>
  );
};

export const useInventoryGlobalState = () => useContext(InventoryGlobalContext);
