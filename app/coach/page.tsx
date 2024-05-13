"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { plus } from "../utils/Icons";
import { useGlobalState } from "../context/globalProvider";
import CreateCoachProfile from "../Components/Modals/CreateCoachProfile";
import CoachModal from "../Components/Modals/CoachModal";
import CoachContent from "../CoachContent/CoachContent";
import ViewCoachModal from "../Components/Modals/ViewCoachModal";
import axios from "axios";
import toast from "react-hot-toast";

interface Props {
  name: string;
  coachprofile: any[];
}
/**
 * Renders the page component for displaying coach profiles.
 *
 * @param {Props} props - The component props.
 * @param {string} props.name - The name of the page.
 * @param {CoachProfile[]} props.coachprofile - The array of coach profiles.
 * @returns {JSX.Element} The rendered page component.
 */
function Page({ name, coachprofile }: Props) {
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

  const [coachProfiles, setCoachProfiles] = useState([]);

  const [teamOptions, setTeamOptions] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [teamDetails, setTeamDetails] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);

  // Open modal specifically for creating a new event
  const handleOpenCreateModal = () => {
    setModalState("create");
    setSelectedCoachProfile(undefined); // Ensure no event data is passed into the creation form
    openModal();
  };

  const handleSearchChange = (coachProfile) => {
    setSearchTerm(coachProfile.target.value);
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
      const response = await axios.get("/api/coachProfiling"); // Adjust API endpoint as needed
      console.log("Sample coach profile data:", response.data[0]); // Log the first profile
      setCoachProfiles(response.data); // Set state with fetched data
    }

    fetchData();
  }, []);

  const filteredCoachProfile = coachprofile.filter((coachProfile) => {
    const existingFullName =
      `${coachProfile.firstName} ${coachProfile.middleName} ${coachProfile.lastName}`.toLowerCase();
    const matchesName = existingFullName.includes(searchTerm.toLowerCase());
    const matchesSport =
      selectedSport === "all" ||
      coachProfile.sport.toLowerCase() === selectedSport.toLowerCase();
    console.log(
      `Event: ${coachProfile.sport}, Sport: ${coachProfile.sport}, matchesName: ${matchesName}, matchesSport: ${matchesSport}`
    ); // Debugging line
    const matchesTeam =
      selectedTeam === null ||
      (coachProfile.teams &&
        coachProfile.teams.some((team) => team.id === selectedTeam));

    return matchesName && matchesSport && matchesTeam;
  });

  useEffect(() => {
    console.log("Fetch all coach profile");
    fetchAllCoachProfile();
  }, []);
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

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ fontSize: "clamp(1.5rem, 2vw, 2rem)", fontWeight: 800 }}>
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
                Contact Number
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-200 uppercase tracking-wider">
                Email Address
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-200 uppercase tracking-wider">
                Academic Year
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
                      className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                      onClick={() => {
                        setModalState("edit");
                        setSelectedCoachProfile(coachProfile);
                        openModal();
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
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
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="px-5 py-5 border-b border-gray-500 text-base text-gray-300"
                >
                  No coach profiles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </CoachStyled>
    // </div>
  );
}

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
    width: 20rem;
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

// export default function PageWithProvider() {
//   return (
//     <InventoryGlobalProvider>

//       <Page />
//     </InventoryGlobalProvider>
//   );
// }
