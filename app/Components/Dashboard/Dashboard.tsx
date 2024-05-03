"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EventItem from "../EventItem/EventItem";
import { plus } from "@/app/utils/Icons";
import CreateContent from "../Modals/CreateContent";
import EventModal from "../Modals/EventModal";

interface Props {
  name: string;
  events: any[];
}

function Dashboard({ name, events }: Props) {
  const { theme, isLoading, openModal, modal, allEvents } = useGlobalState();
  const [modalState, setModalState] = useState("create");
  const [selectedEvent, setSelectedEvent] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("all");

  useEffect(() => {
    allEvents();
  }, []);

  // Open modal specifically for creating a new event
  const handleOpenCreateModal = () => {
    setModalState("create");
    setSelectedEvent(undefined); // Ensure no event data is passed into the creation form
    openModal();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEvents = events.filter((event) => {
    const matchesName = event.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSport =
      selectedSport === "all" ||
      event.Sport.toLowerCase() === selectedSport.toLowerCase();
    console.log(
      `Event: ${event.name}, Sport: ${event.Sport}, matchesName: ${matchesName}, matchesSport: ${matchesSport}`
    ); // Debugging line
    return matchesName && matchesSport;
  });

  return (
    <DashboardStyled theme={theme}>
      {modal && (
        <EventModal>
          <CreateContent submitState={modalState} event={selectedEvent} />
        </EventModal>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "clamp(1.5rem, 2vw, 2rem)", fontWeight: 800 }}>
          {name}
        </h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <select
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
            style={{
              height: "3rem",
              marginRight: "1rem",
              borderRadius: "10px",
              padding: "0.5rem 1rem",
              color: "#eee",
              backgroundColor: "#323232",
              border: "1px solid #555",
              outline: "none",
            }}
          >
            <option value="all">All Sports</option>
            <optgroup label="Basketball">
              <option value="basketball men">Basketball Men</option>
              <option value="basketball women 3x3">
                Basketball Women (3X3)
              </option>
              <option value="basketball women 5x5">
                Basketball Women (5X5)
              </option>
            </optgroup>
            <optgroup label="Football">
              <option value="football men">Football Men</option>
              <option value="football women">Football Women</option>
            </optgroup>
            <optgroup label="Volleyball">
              <option value="volleyball men">Volleyball Men</option>
              <option value="volleyball women">Volleyball Women</option>
            </optgroup>
            <optgroup label="Badminton">
              <option value="badminton women">Badminton Women</option>
              <option value="badminton men">Badminton Men</option>
            </optgroup>
            <optgroup label="ESport">
              <option value="valorant">Valorant</option>
              <option value="dota">DoTA</option>
              <option value="mobile legends">Mobile Legends</option>
            </optgroup>
            <option value="table tennis">Table Tennis</option>
            <option value="taekwondo">Taekwondo</option>
            <option value="chess">Chess</option>
            <option value="swimming">Swimming Mixed</option>
            <option value="strength and conditioning">
              Strength and Conditioning
            </option>
            <option value="special projects">Special Projects Mixed</option>

            {/* Add more sports as needed */}
          </select>
          <input
            type="text"
            placeholder="Search Events..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              height: "3rem",
              width: "20rem",
              marginRight: "1rem",
              border: "1px solid #555",
              borderRadius: "10px",
              padding: "0.5rem 1rem",
              color: "#eee",
              backgroundColor: "#323232",
              fontSize: "1rem",
              fontFamily: "Arial, sans-serif",
              outline: "none",
              boxShadow: "none", // remove shadow
              textAlign: "left", // align text to the left
            }}
          />
          <button className="create-item" onClick={handleOpenCreateModal}>
            {plus}
            Add New Event
          </button>
        </div>
      </div>

      <div className="inventoryitem grid mt-5">
        {filteredEvents.length > 0 ? ( // For Filtered Events
          filteredEvents.map((event) => (
            <EventItem
              key={event.id}
              name={event.name}
              handleEdit={() => {
                setModalState("edit");
                setSelectedEvent(event);
                openModal();
              }}
              startDate={event.startDate}
              endDate={event.endDate}
              Sport={event.Sport}
              isExternal={event.isExternal}
              id={event.id}
            />
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.main`
  padding: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;

      border-radius: 0.5rem;
    }
  }

  .create-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 22rem;
    height: 4rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s cubic-bezier(0.53, 0.21, 0, 1);

    i {
      font-size: 1.5rem;
      margin-right: 0.2rem;
    }

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Dashboard;
