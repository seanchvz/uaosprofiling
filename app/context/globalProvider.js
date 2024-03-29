"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import themes from "./themes";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import { InventoryItemService } from "./lib/InventoryItemService";
import {EventsService} from "./lib/EventsService";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { user } = useUser();
  const [selectedTheme, setSelectedTheme] = useState(0);
  const theme = themes[selectedTheme];
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false); 
  const [student, setStudent] = useState([]);

  const { InventoryItem, fetchAllInventoryItems } =
    InventoryItemService({});

    const { events, allEvents } =
    EventsService({ });


  const openModal = () => {
    //events, put key inside the parenthesis para di ma affect ang other modals
    setModal(true);
  };

  const closeModal = () => {
    //events
    setModal(false);
  };


  // const allStudents = async () => { // transfer this to service
  //   setIsLoading(true);
  //   try {
  //     const studResults = await axios.get("api/studentProfiling");
  //     console.log(studResults.data);
  //   } catch {}
  // };

  const deleteEvent = async (id) => {
    try {
      const res = await axios.delete(`/api/events/${id}`); // delete lang according kung unsay naa sa ID
      toast.success("Event Deleted");

      allEvents();
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };



  const deleteInventory = async (id) => {
    try {
      const res = await axios.delete(`/api/inventory/${id}`); // delete lang according kung unsay naa sa ID
      toast.success("Inventory Item Deleted");

      fetchAllInventoryItems();
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //Filtering
  // const isExternalEvents = events.filter((event) => event.isExternal === true);
  // console.log(isExternalEvents);
  React.useEffect(() => {
    if (user) allEvents();
  }, [user]); 

  // React.useEffect(() => {
  //   if (user) allStudents();
  // }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        events, // send the events data here
        deleteEvent,
        isLoading,
        modal,
        InventoryItem,
        fetchAllInventoryItems,
        deleteInventory,
        openModal,
        closeModal,
        allEvents,
        
        // isExternalEvents,
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

//para ma use ang context:
export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
