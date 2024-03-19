"use client"

import React, {createContext, useState, useContext} from "react"
import themes from "./themes";

export const GlobalContext = createContext()
export const GlobalUpdateContext = createContext()

export const GlobalProvider = ({children}) => {
    const [selectedTheme, setSelectedTheme] = useState(0);
    const theme =themes[selectedTheme];
    
    
    return (
        <GlobalContext.Provider 
        value={{
            theme,
        }}>
            
          <GlobalUpdateContext.Provider value={{}}>
            {children}
          </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
      );
};

//para ma use ang context:
export const useGlobalState = () => useContext(GlobalContext); // we can use the values sending sa theme
export const useGlobalUpdate = () => useContext(GlobalUpdateContext); 