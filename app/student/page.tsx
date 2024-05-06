"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { plus } from "../utils/Icons";
import { useGlobalState } from "../context/globalProvider";
import StudentProfileContent from "../StudentContent/StudentContent";
import CreateProfile from "../Components/Modals/CreateProfile";
import StudentModal from "../Components/Modals/StudentModal";
interface Props {
  name: string;
  studentprofile: any[];
}
function Page({ name, studentprofile }: Props) {
  const { theme, isLoading, openModal, modal, fetchAllStudentProfile } =
    useGlobalState();
  const [modalState, setModalState] = useState("create");
  const [selectedStudent, setSelectedStudent] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("all");

  const handleOpenCreateModal = () => {
    setModalState("create");
    setSelectedStudent(undefined); // Ensure no event data is passed into the creation form
    openModal();
  };

  // Handles the search input field
  // This function updates the searchTerm state whenever the user types into the search input field.
  const handleSearchChange = (studentProfile) => {
    setSearchTerm(studentProfile.target.value);
  };

  const filteredStudentProfile = studentprofile.filter((studentProfile) => {
    const existingFullName =
      `${studentProfile.firstName} ${studentProfile.middleName} ${studentProfile.lastName}`.toLowerCase();
    const matchesName = existingFullName.includes(searchTerm.toLowerCase());
    const matchesSport =
      selectedSport === "all" ||
      studentProfile.sport.toLowerCase() === selectedSport.toLowerCase();
    console.log(
      `Event: ${studentProfile.sport}, Sport: ${studentProfile.sport}, matchesName: ${matchesName}, matchesSport: ${matchesSport}`
    ); // Debugging line
    return matchesName && matchesSport;
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
            Add New Student
          </button>
        </div>
      </div>

      <div className="inventoryitem grid mt-5">
        {filteredStudentProfile.length > 0 ? (
          filteredStudentProfile.map((studentProfile) => (
            <StudentProfileContent
              handleEdit={() => {
                setModalState("edit");
                openModal();
                setSelectedStudent(studentProfile);
              }}
              key={studentProfile.id}
              firstName={studentProfile.firstName}
              middleName={studentProfile.middleName}
              lastName={studentProfile.lastName}
              contactNumber={studentProfile.contactNumber}
              birthDate={studentProfile.birthDate}
              nationality={studentProfile.nationality}
              weight={studentProfile.weight}
              height={studentProfile.height}
              sport={studentProfile.sport}
              bloodType={studentProfile.bloodType}
              academicYear={studentProfile.academicYear}
              isMale={studentProfile.isMale}
              isFemale={studentProfile.isFemale}
              yrStartedPlaying={studentProfile.yrStartedPlaying}
              mothersName={studentProfile.mothersName}
              fathersName={studentProfile.fathersName}
              guardiansName={studentProfile.guardiansName}
              courseAndYear={studentProfile.courseAndYear}
              emergencyContactPerson={studentProfile.emergencyContactPerson}
              emergencyContactNumber={studentProfile.emergencyContactNumber}
              email={studentProfile.email}
              homeAddress={studentProfile.homeAddress}
              statusIsActive={studentProfile.statusIsActive}
              statusIsInactive={studentProfile.statusIsInactive}
              userId={studentProfile.userId}
              remarks={studentProfile.remarks}
              id={studentProfile.id}
            />
          ))
        ) : (
          <p>No student profiles available.</p>
        )}
      </div>
    </StudentStyled>
    // </div>
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
