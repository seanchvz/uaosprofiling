"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { plus } from "../utils/Icons";
import { useGlobalState } from "../context/globalProvider";
import CreateCoachProfile from "../Components/Modals/CreateCoachProfile";
import CoachModal from "../Components/Modals/CoachModal";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEye, FaTrash } from "react-icons/fa";

interface Props {
  name: string;
  coachprofile: any[];
  teams: any[];
  sports: any[];
}

function Page({ name, coachprofile, teams }: Props) {
  const {
    theme,
    isLoading,
    fetchAllCoachProfile,
    openModal,
    modal,
    deleteCoachProfile,
  } = useGlobalState();
  const [modalState, setModalState] = useState("create");
  const [selectedCoachProfile, setSelectedCoachProfile] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("all");
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [selectedRole, setSelectedRole] = useState("all");
  const [isViewOnly, setIsViewOnly] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Change this value to set the number of items per page

  useEffect(() => {
    fetchAllCoachProfile();
  }, []);

  const handleOpenCreateModal = () => {
    setModalState("create");
    setSelectedCoachProfile(undefined);
    openModal();
  };

  const handleSearchChange = (coachProfile: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(coachProfile.target.value);
  };

  const getSportName = (teamId) => {
    const team = teams.find((team) => team.id === teamId);
    return team && team.sport ? team.sport.name : "Unknown Sport";
  };

  const filteredCoachProfile = coachprofile.filter((coachProfile) => {
    const existingFullName =
      `${coachProfile.firstName} ${coachProfile.middleName} ${coachProfile.lastName}`.toLowerCase();
    const matchesName = existingFullName.includes(searchTerm.toLowerCase());
    const matchesSport =
      selectedSport === "all" ||
      coachProfile.teams.some((team) => {
        const teamInfo = teams.find((t) => t.id === team.id);
        return (
          teamInfo &&
          teamInfo.sport &&
          teamInfo.sport.name.toLowerCase() === selectedSport.toLowerCase()
        );
      });
    const matchesTeam =
      selectedTeam === null ||
      (coachProfile.teams &&
        coachProfile.teams.some(
          (team: { id: number }) => team.id === selectedTeam
        ));
    const matchesRole =
      selectedRole === "all" ||
      (selectedRole === "full-time" && coachProfile.statusIsFulltime) ||
      (selectedRole === "part-time" && coachProfile.statusIsParttime);

    return matchesName && matchesSport && matchesTeam && matchesRole;
  });

  // Pagination logic
  const indexOfLastProfile = currentPage * itemsPerPage;
  const indexOfFirstProfile = indexOfLastProfile - itemsPerPage;
  const currentProfiles = filteredCoachProfile.slice(
    indexOfFirstProfile,
    indexOfLastProfile
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <CoachStyled theme={theme}>
      {modal && (
        <CoachModal>
          <CreateCoachProfile
            submitState={modalState} // Fix: Cast modalState to "create" | "edit"
            coachProfile={selectedCoachProfile}
          />
        </CoachModal>
      )}
      <h1 style={{ fontSize: "clamp(1.5rem, 2vw, 2rem)", fontWeight: 800 }}>
        {name}
      </h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search Profiles..."
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
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
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
            <option value="all">All Roles</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
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
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {`${team.teamName} - ${new Date(team.year).getFullYear()} - ${
                  team.sport ? team.sport.name : "No Sport"
                }`}
              </option>
            ))}
          </select>

          <button className="create-item" onClick={handleOpenCreateModal}>
            {plus}
            Add New Coach
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
                Contact Number
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-200 uppercase tracking-wider">
                Email Address
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-200 uppercase tracking-wider">
                Years Employed
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-200 uppercase tracking-wider">
                Remarks
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-200 uppercase tracking-wider">
                Role
              </th>

              <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-200 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCoachProfile.length > 0 ? (
              filteredCoachProfile.map((coachProfile, index) => (
                <tr key={coachProfile.id}>
                  <td className="px-5 py-5 border-b border-gray-500 text-base text-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-500 text-base text-gray-300">{`${coachProfile.firstName} ${coachProfile.middleName} ${coachProfile.lastName}`}</td>
                  <td className="px-5 py-5 border-b border-gray-500 text-base text-gray-300">
                    {coachProfile.teams && coachProfile.teams.length > 0
                      ? Array.from(
                          new Set(
                            coachProfile.teams.map((team: { id: any }) => {
                              const teamInfo = teams.find(
                                (t) => String(t.id) === String(team.id)
                              );
                              return teamInfo && teamInfo.sport
                                ? teamInfo.sport.name
                                : "No Sport Assigned";
                            })
                          )
                        ).join(", ")
                      : "Not Part of Any Sport"}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-500 text-base text-gray-300">
                    {coachProfile.contactNumber}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-500 text-base text-gray-300">
                    {coachProfile.email}
                  </td>

                  <td className="px-5 py-5 border-b border-gray-500 text-base text-gray-300">
                    {coachProfile.academicYear}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-500 text-base text-gray-300">
                    {coachProfile.remarks}
                  </td>

                  <td className="px-5 py-5 border-b border-gray-500 text-base text-gray-300">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 ${
                        coachProfile.statusIsFulltime
                          ? "border-green-500 text-white"
                          : "border-yellow-500 text-white"
                      } border-2`}
                    >
                      {coachProfile.statusIsParttime
                        ? "Part Time"
                        : "Full Time"}
                    </span>
                  </td>

                  <td className="px-5 py-5 border-b border-gray-500 text-base">
                    <button
                      className="px-4 py-3 bg-gray-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mr-2"
                      onClick={() => {
                        setModalState("edit");
                        setSelectedCoachProfile(coachProfile);
                        openModal();
                      }}
                    >
                      <FaEye /> {/* Eye icon for "View" */}
                    </button>
                    <button
                      className="px-4 py-3 bg-red-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 mr-2"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this coach profile?"
                          )
                        ) {
                          deleteCoachProfile(coachProfile.id);
                        }
                      }}
                    >
                      <FaTrash /> {/* Trash icon for "Delete" */}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="px-5 py-5 border-b border-gray-500 text-base text-gray-300"
                >
                  No coach profiles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination>
        {Array.from(
          { length: Math.ceil(filteredCoachProfile.length / itemsPerPage) },
          (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </Pagination>
    </CoachStyled>
  );
}

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

const CoachStyled = styled.main`
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
