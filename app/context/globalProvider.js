"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import themes from "./themes";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import { InventoryItemService } from "./lib/InventoryItemService";
import { EventsService } from "./lib/EventsService";
import { CoachProfileService } from "./lib/CoachProfileService";
import { StudentProfileService } from "./lib/StudentProfileService";
import { student } from "../utils/Icons";
import { useClerk } from "@clerk/clerk-react";

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

  const { InventoryItem, fetchAllInventoryItems } = InventoryItemService({});

  const { events, allEvents } = EventsService({});

  const { coachprofile, fetchAllCoachProfile } = CoachProfileService({});

  const { studentprofile, fetchAllStudentProfile } = StudentProfileService({});

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

  const patchEvent = async (id, updatedEventData) => {
    try {
      const response = await axios.patch(
        `/api/events/${id}`,
        updatedEventData,
        {
          headers: {
            Authorization: `Bearer ${session.idToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      allEvents(); // Refresh events data
      return response.data; // Return updated data
    } catch (error) {
      console.error("Error Updating Event:", error);
      toast.error(
        "Error updating event: " +
          (error.response?.data.error || "Unexpected error")
      );
      throw new Error("Failed to update event"); // Re-throw error for caller to handle if needed
    }
  };

  useEffect(() => {
    if (user) allEvents();
  }, [user]);

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

  const patchCoachProfile = async (id, updatedCoachProfile) => {
    try {
      const res = await axios.patch(
        `/api/coachProfiling${id}`,
        updatedCoachProfile
      );

      const updatedEvent = res.data;
      fetchAllCoachProfile();
      return updatedEvent;
    } catch (error) {
      console.error(error);
      // Optionally, handle error here or re-throw to let the caller handle it
      throw new Error("Failed to update profile");
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

  const patchStudentProfile = async (id) => {
    try {
      const res = await axios.patch(`/api/studentProfiling/${id}`);
      toast.success("Student profile updated successfully");

      const updatedStudent = res.data;
      fetchAllStudentProfile();
      return updatedStudent;
    } catch (error) {
      console.error(error);
      // Optionally, handle error here or re-throw to let the caller handle it
      throw new Error("Failed to update profile");
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
        patchEvent,
        fetchAllCoachProfile,
        deleteCoachProfile,
        fetchAllStudentProfile,
        deleteStudentProfile,
        patchCoachProfile,
        patchStudentProfile,
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
