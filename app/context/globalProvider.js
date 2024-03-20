"use client"

import React, {createContext, useState, useContext} from "react"
import themes from "./themes";
import axios from 'axios';

export const GlobalContext = createContext()
export const GlobalUpdateContext = createContext()

export const GlobalProvider = ({children}) => {
    const [selectedTheme, setSelectedTheme] = useState(0);
    const theme =themes[selectedTheme];
    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState([]);


    const allEvents = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("/api/events");
        // console.log(res.data);
        setEvents(res.data);
        setIsLoading(false);

      } catch (error) {
        console.log(error);
        
      }
    };

    React.useEffect(() => {
      allEvents();
    },[]);


    return (
        <GlobalContext.Provider 
        value={{
            theme,
            events, // send the events data here
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