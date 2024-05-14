"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { plus } from "../utils/Icons";
import { useGlobalState } from "../context/globalProvider";
import StudentProfileContent from "../StudentContent/StudentContent";
import CreateProfile from "../Components/Modals/CreateProfile";
import StudentModal from "../Components/Modals/StudentModal";
import ViewStudentModal from "../Components/Modals/ViewStudentProfile";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEye, FaTrash } from "react-icons/fa";

interface Props {
  name: string;
  studentprofile: any[];
}
function Page({ name, studentprofile }: Props) {
  const {
    theme,
    isLoading,
    openModal,
    modal,
    fetchAllStudentProfile,
    deleteStudentProfile,
  } = useGlobalState();
  const [modalState, setModalState] = useState("create");
  const [selectedStudent, setSelectedStudent] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [selectedSport, setSelectedSport] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const [teamNameFilter, setTeamNameFilter] = useState("");
  const [teamYearFilter, setTeamYearFilter] = useState("");
  const [studentProfiles, setStudentProfiles] = useState([]);

  const [teamOptions, setTeamOptions] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [teamDetails, setTeamDetails] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);

  const handleOpenCreateModal = () => {
    setModalState("create");
    setSelectedStudent(undefined); // Ensure no event data is passed into the creation form
    openModal();
  };

  const handleSearchChange = (studentProfile) => {
    setSearchTerm(studentProfile.target.value);
  };

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
    async function fetchData() {
      const response = await axios.get("/api/studentProfiling"); // Adjust API endpoint as needed
      console.log("Sample student profile data:", response.data[0]); // Log the first profile
      setStudentProfiles(response.data); // Set state with fetched data
    }

    fetchData();
  }, []);

  const getSportName = (teamId) => {
    const team = teamDetails.find((team) => team.value === teamId);
    return team && team.sport ? team.sport : "Unknown Sport";
  };

  const filteredStudentProfile = studentprofile.filter((studentProfile) => {
    const existingFullName =
      `${studentProfile.firstName} ${studentProfile.middleName} ${studentProfile.lastName}`.toLowerCase();
    const matchesName = existingFullName.includes(searchTerm.toLowerCase());
    const matchesSport =
      selectedSport === "all" ||
      studentProfile.teams.some((team) => {
        const teamInfo = teamDetails.find((t) => t.value === team.id);
        return (
          teamInfo &&
          teamInfo.sport.toLowerCase() === selectedSport.toLowerCase()
        );
      });
    const matchesTeam =
      selectedTeam === null ||
      (studentProfile.teams &&
        studentProfile.teams.some((team) => team.id === selectedTeam));
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "active" && studentProfile.statusIsActive) ||
      (selectedStatus === "inactive" && studentProfile.statusIsInactive);

    return matchesName && matchesSport && matchesTeam && matchesStatus;
  });

  useEffect(() => {
    console.log("Fetch all student profile");
    fetchAllStudentProfile();
  }, []);

  return (
    <StudentStyled theme={theme}>
      {modal && (
        <StudentModal>
          <CreateProfile
            submitState={modalState}
            studentProfile={selectedStudent}
          />
        </StudentModal>
      )}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ fontSize: "clamp(1.5rem, 1.5vw, 2rem)", fontWeight: 800 }}>
          {name}
        </h1>
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
            <option value="all">All Sports</option>
            {Array.from(
              new Set(
                studentprofile.map(
                  (student) => student.sport && student.sport.name
                )
              )
            )
              .filter((sport) => sport)
              .map((sport, index) => (
                <option key={index} value={sport}>
                  {sport}
                </option>
              ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
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
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
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
            Add New Student
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
                Contact Number
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-200 uppercase tracking-wider">
                Email Address
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-200 uppercase tracking-wider">
                Year Started Playing
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-200 uppercase tracking-wider">
                Sports
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-200 uppercase tracking-wider">
                QPI
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-200 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-200 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredStudentProfile.length > 0 ? (
              filteredStudentProfile.map((studentProfile, index) => (
                <tr key={studentProfile.id}>
                  <td className="px-5 py-5 border-b border-gray-500 text-base text-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-500 text-base text-gray-300">
                    {`${studentProfile.firstName} ${studentProfile.middleName} ${studentProfile.lastName}`}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-500 text-base text-gray-300">
                    {studentProfile.contactNumber}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-500 text-base text-gray-300">
                    {studentProfile.email}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-500 text-base text-gray-300">
                    {studentProfile.yrStartedPlaying}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-500 text-base text-gray-300">
                    {studentProfile.teams
                      .map((team) => getSportName(team.id))
                      .join(", ")}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-500 text-base text-gray-300">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 ${
                        studentProfile.QPI < 2
                          ? "border-red-500 text-white"
                          : "border-green-500 text-white"
                      } border-2`}
                    >
                      {studentProfile.QPI}
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-500 text-base text-gray-300">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 ${
                        studentProfile.statusIsActive
                          ? "border-green-500 text-white"
                          : "border-red-500 text-white"
                      } border-2`}
                    >
                      {studentProfile.statusIsInactive ? "Inactive" : "Active"}
                    </span>
                  </td>

                  <td className="px-2 py-2 border-b border-gray-500 text-sm">
                    <button
                      className="p-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mr-2"
                      onClick={() => {
                        setModalState("edit");
                        setSelectedStudent(studentProfile);
                        openModal();
                      }}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="p-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this coach profile?"
                          )
                        ) {
                          deleteStudentProfile(studentProfile.id);
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
                  No student profiles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </StudentStyled>
  );
}

const StudentStyled = styled.main`
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
