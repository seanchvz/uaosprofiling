"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { plus } from "../utils/Icons";
import { useGlobalState } from "../context/globalProvider";
import CreateCoachProfile from "../Components/Modals/CreateCoachProfile";
import CoachModal from "../Components/Modals/CoachModal";
import CoachContent from "../CoachContent/CoachContent";

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
  const { theme, isLoading, fetchAllCoachProfile, openModal, modal } =
    useGlobalState();
  const [modalState, setModalState] = useState("create");
  const [selectedCoachProfile, setSelectedCoachProfile] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("all");

  // Open modal specifically for creating a new event
  const handleOpenCreateModal = () => {
    setModalState("create");
    setSelectedCoachProfile(undefined); // Ensure no event data is passed into the creation form
    openModal();
  };

  const handleSearchChange = (coachProfile) => {
    setSearchTerm(coachProfile.target.value);
  };

  const filteredCoachProfiles = coachprofile.filter((coachProfile) => {
    const matchesName = coachProfile.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSport =
      selectedSport === "all" ||
      coachProfile.sport.toLowerCase() === selectedSport.toLowerCase();
    console.log(
      `Coach Profile: ${coachProfile.name}, Sport: ${coachProfile.sport}, matchesName: ${matchesName}, matchesSport: ${matchesSport}`
    ); // Debugging line
    return matchesName && matchesSport;
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

          <button className="create-item" onClick={handleOpenCreateModal}>
            {plus}
            Add New Coach
          </button>
        </div>
      </div>
      <div className="inventoryitem grid mt-5">
        {filteredCoachProfiles.length > 0 ? ( // For Filtered Events
          filteredCoachProfiles.map((coachProfile) => (
            <CoachContent
              key={coachProfile.id}
              name={coachProfile.name}
              contactNumber={coachProfile.contactNumber}
              sport={coachProfile.sport}
              permanentTeam={coachProfile.permanentTeam}
              isMale={coachProfile.isMale}
              isFemale={coachProfile.isFemale}
              emergencyContact={coachProfile.emergencyContact}
              emergencyContactPerson={coachProfile.emergencyContactPerson}
              birthDate={coachProfile.birthDate}
              nationality={coachProfile.nationality}
              weight={coachProfile.weight}
              height={coachProfile.height}
              bloodType={coachProfile.bloodType}
              academicYear={coachProfile.academicYear}
              statusIsFulltime={coachProfile.statusIsFulltime}
              statusIsParttime={coachProfile.statusIsParttime}
              resumeUrl={coachProfile.resumeUrl}
              email={coachProfile.email}
              id={coachProfile.id}
              remarks={coachProfile.remarks}
              handleEdit={() => {
                setModalState("edit");
                setSelectedCoachProfile(coachProfile); // Pass the selected coach to be edited
                openModal();
              }}
            />
          ))
        ) : (
          <p>No coach profiles found.</p>
        )}
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
    width: 23rem;
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

export default Page;

// export default function PageWithProvider() {
//   return (
//     <InventoryGlobalProvider>

//       <Page />
//     </InventoryGlobalProvider>
//   );
// }
