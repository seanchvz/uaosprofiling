"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { plus } from "@/app/utils/Icons";
import CreateContent from "../Modals/CreateContent";
import EventModal from "../Modals/EventModal";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEye, FaTrash } from "react-icons/fa";

interface Props {
  name: string;
  events: any[];
  teams: any[];
  sports: any[];
}

function Dashboard({ name, events }: Props) {
  const { theme, openModal, modal, allEvents, deleteEvent } = useGlobalState();
  const [modalState, setModalState] = useState("create");
  const [selectedEvent, setSelectedEvent] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [Events, setEvents] = useState([]);
  const [teamOptions, setTeamOptions] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [teamDetails, setTeamDetails] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [teams, setTeams] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("/api/teams");
        const formattedTeams = response.data.map((team) => ({
          value: team.id,
          label: `${team.teamName} - ${new Date(team.year).getFullYear()} - ${
            team.sport ? team.sport.name : "No Sport"
          }`,
          sport: team.sport ? team.sport.name : "No Sport",
          year: team.year
            ? new Date(team.year).getFullYear().toString()
            : "Unknown Year",
          events: team.events.map((e) => ({
            id: e.id,
            name: e.name,
          })),
        }));
        setTeams(response.data);
        setTeamOptions(formattedTeams);
        setTeamDetails(formattedTeams);
      } catch (error) {
        console.error("Failed to load teams:", error);
        toast.error("Failed to load teams");
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    allEvents();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/api/events");
      console.log("Sample event data:", response.data);
      setEvents(response.data);
    }

    fetchData();
  }, []);

  // Log data for debugging
  useEffect(() => {
    console.log("Teams:", teams);
    console.log("Events:", events);
  }, [teams, events]);

  const getSportName = (teamId) => {
    const team = teamDetails.find((team) => team.value === teamId);
    return team && team.sport ? team.sport : "Unknown Sport";
  };

  const getTeamYear = (teamId) => {
    const team = teamDetails.find((team) => team.value === teamId);
    return team && team.year ? team.year : "Unknown Year";
  };

  // Filter and sort events based on team.year
  const filteredEvents = events
    .map((event) => {
      const team = teams.find((t) => t.id === event.teamId);
      return {
        ...event,
        teamYear: team ? new Date(team.year).getFullYear() : null,
      };
    })
    .filter((event) => {
      const matchesName = event.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesSport =
        selectedSport === "all" ||
        event.teams.some((team) => {
          const teamInfo = teams.find((t) => t.id === team.id);
          return (
            teamInfo &&
            teamInfo.sport &&
            teamInfo.sport.name.toLowerCase() === selectedSport.toLowerCase()
          );
        });
      const matchesTeam =
        selectedTeam === null ||
        event.teams.some((team) => team.id === selectedTeam);
      const matchesYear =
        selectedYear === "all" ||
        event.teams.some((team) => {
          const teamInfo = teams.find((t) => t.id === team.id);
          return (
            teamInfo &&
            new Date(teamInfo.year).getFullYear().toString() === selectedYear
          );
        });
      return matchesName && matchesSport && matchesTeam && matchesYear;
    });

  // Pagination logic
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleOpenCreateModal = () => {
    setModalState("create");
    setSelectedEvent(undefined);
    openModal();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

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
              boxShadow: "none",
              textAlign: "left",
            }}
          />

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
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
            <option value="all">All Team Years</option>
            {Array.from(
              new Set(
                teams.map((team) =>
                  new Date(team.year).getFullYear().toString()
                )
              )
            )
              .sort((a, b) => b - a)
              .map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
          </select>

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
            <option value="all">All Team Sports</option>
            {Array.from(
              new Set(teams.map((team) => team.sport && team.sport.name))
            )
              .filter((sport) => sport)
              .map((sport, index) => (
                <option key={index} value={sport}>
                  {sport}
                </option>
              ))}
          </select>

          <select
            value={selectedTeam || ""}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedTeam(value === "" ? null : Number(value));
            }}
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
            <option value="">Select a Team</option>
            {teamDetails.map((team) => (
              <option key={team.value} value={team.value}>
                {team.label}
              </option>
            ))}
          </select>

          <button className="create-item" onClick={handleOpenCreateModal}>
            {plus}
            Add New Event
          </button>
        </div>
      </div>

      <div className="min-w-full shadow-md rounded-lg overflow-hidden mt-4">
        <table
          className="min-w-full leading-normal border-2 border-gray-500"
          style={{ backgroundColor: "#363636" }}
        >
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-200 uppercase tracking-wider">
                #
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-200 uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-200 uppercase tracking-wider">
                Team Sport
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-200 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-200 uppercase tracking-wider">
                End Date
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-200 uppercase tracking-wider">
                Event Details
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-200 uppercase tracking-wider">
                Event Type
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-200 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentEvents.length > 0 ? (
              currentEvents.map((event, index) => (
                <tr key={event.id}>
                  <td className="px-5 py-5 border-b border-gray-500 text-base text-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-500 text-base text-gray-300">
                    {event.name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-500 text-base text-gray-300">
                    {event.teams && event.teams.length > 0
                      ? Array.from(
                          new Set(
                            event.teams.map((team) => {
                              const teamInfo = teamDetails.find(
                                (t) => String(t.value) === String(team.id)
                              );
                              return teamInfo && teamInfo.sport
                                ? teamInfo.sport
                                : "Unknown Sport";
                            })
                          )
                        ).join(", ")
                      : "Not Part of Any Sport"}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-500 text-base text-gray-300">
                    {new Date(event.startDate).toLocaleDateString("en-US")}
                  </td>

                  <td className="px-5 py-5 border-b border-gray-500 text-base text-gray-300">
                    {new Date(event.endDate).toLocaleDateString("en-US")}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-500 text-base text-gray-300">
                    {event.eventDetails}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-500 text-base text-gray-300">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 ${
                        event.isExternal
                          ? "border-red-500 text-white"
                          : "border-green-500 text-white"
                      } border-2`}
                    >
                      {event.isExternal ? "External" : "Internal"}
                    </span>
                  </td>

                  <td className="px-5 py-5 border-b border-gray-500 text-base">
                    <button
                      className="px-4 py-3 bg-gray-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mr-2"
                      onClick={() => {
                        setModalState("edit");
                        setSelectedEvent(event);
                        openModal();
                      }}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="px-4 py-3 bg-red-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 mr-2"
                      onClick={() => {
                        const isConfirmed = window.confirm(
                          "Are you sure you want to delete this event?"
                        );
                        if (isConfirmed) {
                          deleteEvent(event.id);
                        }
                      }}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-5 py-5 border-b border-gray-700 text-base text-gray-300"
                >
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination>
        {Array.from(
          { length: Math.ceil(filteredEvents.length / itemsPerPage) },
          (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </Pagination>
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
    width: 19.7rem;
    height: 3rem;
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;

  button {
    background-color: ${(props) => props.theme.colorBg2};
    color: ${(props) => props.theme.colorGrey2};
    border: 1px solid ${(props) => props.theme.borderColor2};
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    margin: 0 0.25rem;
    cursor: pointer;

    &:hover {
      background-color: ${(props) => props.theme.colorPrimary};
      color: ${(props) => props.theme.colorWhite};
    }
  }
`;

export default Dashboard;
