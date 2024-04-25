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

  // Open modal specifically for creating a new event
  const handleOpenCreateModal = () => {
    setModalState("create");
    setSelectedCoachProfile(undefined); // Ensure no event data is passed into the creation form
    openModal();
  };

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
        <button className="create-item" onClick={handleOpenCreateModal}>
          {plus}
          Add New Coach
        </button>
      </div>
      <div className="inventoryitem grid mt-5">
        {coachprofile.map((coachProfile) => (
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
        ))}
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
