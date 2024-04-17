"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import themes from "./themes";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import { InventoryItemService } from "./lib/InventoryItemService";
import {EventsService} from "./lib/EventsService";
import { CoachProfileService } from "./lib/CoachProfileService";
import { StudentProfileService } from "./lib/StudentProfileService";
import { student } from "../utils/Icons";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

/**
 * GlobalProvider component that provides global state and functions to its children.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {React.ReactNode} The rendered component.
 */
export const GlobalProvider = ({ children }) => {
  const { user } = useUser();
  const [selectedTheme, setSelectedTheme] = useState(0);
  const theme = themes[selectedTheme];
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false); 

  const { InventoryItem, fetchAllInventoryItems } =
    InventoryItemService({});

  const { events, allEvents } =
    EventsService({ });

  const {coachprofile, fetchAllCoachProfile}=
    CoachProfileService({});

    const {studentprofile, fetchAllStudentProfile} = 
    StudentProfileService({});

  /**
   * Opens the modal.
   */
  const openModal = () => {
    setModal(true);
  };

  /**
   * Closes the modal.
   */
  const closeModal = () => {
    setModal(false);
  };

  /**
   * Deletes an event by its ID.
   * @param {string} id - The ID of the event to delete.
   */
  const deleteEvent = async (id) => {
    try {
      const res = await axios.delete(`/api/events/${id}`);
      toast.success("Event Deleted");

      allEvents();
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  /**
   * Deletes an inventory item by its ID.
   * @param {string} id - The ID of the inventory item to delete.
   */
  const deleteInventory = async (id) => {
    try {
      const res = await axios.delete(`/api/inventory/${id}`);
      toast.success("Inventory Item Deleted");
      fetchAllInventoryItems();
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  /**
   * Deletes a coach profile by its ID.
   * @param {string} id - The ID of the coach profile to delete.
   */
  const deleteCoachProfile = async (id) => {
    try {
      const res = await axios.delete(`/api/coachProfiling/${id}`);
      toast.success("Coach Profile Deleted");
      fetchAllCoachProfile();
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  
  const deleteStudentProfile = async (id) => {
    try {
      const res = await axios.delete(`/api/studentProfiling/${id}`); // delete lang according kung unsay naa sa ID
      toast.success("Student Profile Deleted");

      fetchAllStudentProfile();
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const UpdateCoachProfile = async (id) => {
    try {
      const res = await axios.patch(`/api/coachProfiling/${id}`); // delete lang according kung unsay naa sa ID
      toast.success("Coach Profile Updated");

      fetchAllCoachProfileProfile();
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

  return (
    <GlobalContext.Provider
      value={{
        theme,
        events,
        deleteEvent,
        isLoading,
        modal,
        InventoryItem,
        fetchAllInventoryItems,
        deleteInventory,
        openModal,
        closeModal,
        allEvents,
        coachprofile,
        studentprofile,
        fetchAllCoachProfile,
        deleteCoachProfile,
        fetchAllStudentProfile,
        deleteStudentProfile,
        UpdateCoachProfile,
        
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