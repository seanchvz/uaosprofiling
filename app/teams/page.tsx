import { useGlobalState } from "@/app/context/globalProvider";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { plus, trash } from "@/app/utils/Icons";
import TeamModal from "../Components/Modals/TeamModal";
import CreateTeam from "../Components/Modals/CreateTeam";
import TeamContent from "../TeamContent/TeamContent";

interface Props {
  name: string;
  teams: any[];
}

function Page({ name, teams }: Props) {
  const { theme, isLoading, openModal, modal, fetchTeams, deleteTeam } =
    useGlobalState();
  const [modalState, setModalState] = useState("create");
  const [selectedTeam, setSelectedTeam] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [sports, setSports] = useState([]);

  useEffect(() => {
    fetchSports();
    fetchTeams();
  }, []);

  const fetchSports = async () => {
    // Fetch sports from your backend
    const response = await fetch("/api/sport");
    const data = await response.json();
    setSports(data);
  };

  const handleOpenCreateModal = () => {
    setModalState("create");
    setSelectedTeam(undefined);
    openModal();
  };

  const handleSearchChange = (team) => {
    setSearchTerm(team.target.value);
  };

  const handleYearChange = (team) => {
    setSelectedYear(team.target.value);
  };

  const uniqueYears = Array.from(
    new Set(teams.map((team) => new Date(team.year).getFullYear()))
  );

  const getSportName = (sportId) => {
    const sport = sports.find((sport) => sport.id === sportId);
    return sport ? sport.name : "Unknown Sport";
  };

  const filteredTeams = teams.filter((team) => {
    const matchesName = team.teamName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSport =
      selectedSport === "all" ||
      team.sport.toLowerCase() === selectedSport.toLowerCase();

    const matchesYear =
      selectedYear === "all" ||
      new Date(team.year).getFullYear() === parseInt(selectedYear);

    console.log(
      `Team: ${team.teamName}, Sport: ${team.sport}, matchesName: ${matchesName}, matchesSport: ${matchesSport}`
    );
    return matchesName && matchesSport && matchesYear;
  });

  return (
    <TeamStyled theme={theme}>
      {modal && (
        <TeamModal>
          <CreateTeam submitState={modalState} team={selectedTeam} />
        </TeamModal>
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

        <div className="header">
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Search Teams..."
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

            <select
              value={selectedYear}
              onChange={handleYearChange}
              style={{
                height: "3rem",
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
              }}
            >
              <option value="all">All Years</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <button className="create-item" onClick={handleOpenCreateModal}>
              {plus}
              Add New Team
            </button>
          </div>
        </div>
      </div>

      <div className="min-w-full shadow-md rounded-lg overflow-hidden mt-4">
        <table
          className="min-w-full leading-normal border-2 border-gray-500" // added border-2 for border weight
          style={{ backgroundColor: "#363636" }}
        >
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-200 uppercase tracking-wider">
                #
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-200 uppercase tracking-wider">
                Year
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-200 uppercase tracking-wider">
                Name
              </th>

              <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-200 uppercase tracking-wider">
                Sport
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-200 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTeams.length > 0 ? (
              filteredTeams.map((team, index) => (
                <tr key={team.id}>
                  <td className="px-5 py-5 border-b border-gray-500 text-base text-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-500 text-base text-gray-300">
                    {new Date(team.year).getFullYear()}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-500 text-base text-gray-300">
                    {team.teamName}
                  </td>

                  <td className="px-5 py-5 border-b border-gray-500 text-base text-gray-300">
                    {getSportName(team.sportId)}
                  </td>

                  <td className="px-5 py-5 border-b border-gray-500 text-base">
                    <button
                      className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mr-4"
                      onClick={() => {
                        setModalState("edit");
                        setSelectedTeam(team);
                        openModal();
                      }}
                    >
                      View
                    </button>
                    {/* <button
                      className="text-blue-400 hover:text-blue-300 underline mr-4"
                      onClick={() => {
                        setModalState("view"); // Set state to "view" for non-editable mode
                        setSelectedTeam(team); // Select the team to display
                        openModal(); // Open the modal with the CreateTeam component
                      }}
                    >
                      View
                    </button> */}
                    <button
                      className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                      onClick={() => {
                        const isConfirmed = window.confirm(
                          "Are you sure you want to delete this team?"
                        );
                        if (isConfirmed) {
                          deleteTeam(team.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-5 py-5 border-b border-gray-500 text-base text-gray-300"
                >
                  No teams found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </TeamStyled>
  );
}

const TeamStyled = styled.main`
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
    width: 19.8rem;
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

export default Page;
