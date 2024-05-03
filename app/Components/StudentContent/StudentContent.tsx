"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import { edit, trash } from "@/app/utils/Icons";
import React from "react";
import styled from "styled-components";

interface Props {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  contactNumber: string;
  birthDate: string;
  sport: string;
  nationality: string;
  weight: string | null;
  height: string | null;
  bloodType: string | null;
  academicYear: string;
  isMale: boolean;
  isFemale: boolean;
  yrStartedPlaying: string;
  mothersName: string | null;
  fathersName: string | null;
  guardiansName: string | null;
  courseAndYear: string;
  emergencyContactPerson: string;
  emergencyContactNumber: string;
  email: string;
  homeAddress: string;
  statusIsActive: boolean;
  statusIsInactive: boolean;
  remarks: string | null;
  userId: string;
  handleEdit: () => void;
}

const roleColors = {
  basketballmen: "#192BC2",
  basketballwomen3x3: "#D90368",
  basketballwomen5x5: "#D90368",
  volleyballmen: "#276FBF",
  volleyballwomen: "#DA70D6",
  badmintonmen: "#D90368",
  badmintonwomen: "#D90368",
  tabletennis: "#32CD32",
  taekwondo: "#000000",
  chess: "#00CED1",
  swimming: "#1E90FF",
  footballmen: "#FF6347",
  footballwomen: "#FF6347",
  strengthandconditioning: "#000000",
  specialprojects: "#000000",
  valorant: "#FF4500",
  dota: "#DA70D6",
  mobilelegends: "#0038ff",
  statusIsActive: "#228B22",
  statusIsInactive: "#E03616",
  academicYear: "#fda600",
};

function StudentProfileContent({
  handleEdit,
  id,
  firstName,
  middleName,
  lastName,
  contactNumber,
  sport,
  birthDate,
  nationality,
  weight,
  height,
  bloodType,
  academicYear,
  isMale,
  isFemale,
  yrStartedPlaying,
  mothersName,
  fathersName,
  guardiansName,
  courseAndYear,
  emergencyContactPerson,
  emergencyContactNumber,
  email,
  homeAddress,
  statusIsActive,
  statusIsInactive,
  remarks,
  userId,
}: Props): React.JSX.Element {
  const { theme, deleteStudentProfile } = useGlobalState();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <StudentContentStyled theme={theme}>
      <div className="nameContainer">
        <h1>{lastName}</h1>
        <h2>{firstName}</h2>
        <h2>{middleName}</h2>
      </div>

      <div className="tags">
        <Tag
          style={{ marginBottom: "10px" }}
          color={
            statusIsActive
              ? roleColors.statusIsActive
              : roleColors.statusIsInactive
          }
        >
          {statusIsInactive ? "Full Time" : "Part Time"}
        </Tag>
        <Tag
          style={{ marginRight: "10px" }}
          color={roleColors[sport.replace(/\s+/g, "").toLowerCase()]}
        >
          {sport}
        </Tag>
        <Tag color={roleColors.academicYear}>{academicYear}</Tag>
      </div>

      <p>
        {" "}
        Birth Date: {new Date(birthDate).toLocaleDateString(undefined, options)}
      </p>
      <p className="YearStartedPlaying">
        Year Started Playing: {yrStartedPlaying}
      </p>
      <p className="ContactNumber"> Contact Number: {contactNumber}</p>
      <p className="AcademicYear"> Academic Year: {academicYear}</p>
      <p className="AcademicYear"> Remarks: {remarks}</p>

      <div className="event-footer">
        <button className="edit" onClick={handleEdit}>
          {edit}
        </button>
        <button
          className="delete"
          onClick={() => {
            deleteStudentProfile(id);
          }}
        >
          {trash}
        </button>
      </div>
    </StudentContentStyled>
  );
}

const Tag = styled.span`
  display: inline-block;
  padding: 0.3rem 0.6rem;
  margin-right: 0.5rem;
  border-radius: 0.8rem;
  // border: 2px solid #ffffff; // Add this line to add a border
  background-color: ${(props) => props.color || "#6c757d"}; // A default color
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const StudentContentStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 1px solid ${(props) => props.theme.borderColor2};
  height: 25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.4rem; /* Add margin to the bottom of the heading */
  }

  .nameContainer h1, .nameContainer h2 {
    margin: 0.2rem 0; /* adjust as needed */
  }

 h2 {
    margin-bottom: 0.5rem; // adjust this value to change the spacing
  }

  .date {
    margin-top: auto;
    margin-bottom: 0.5rem; /* Add margin to the bottom of the date */
  }

  .dateend {
    margin-right: auto;
    margin-bottom: 0.5rem; /* Add margin to the bottom of the end date */
  }

  .event-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.5rem;
        color: #ffffff;
      }
    }

    .edit {
      margin-left: auto;
    }
    .statusIsActive,
    .statusIsInactive {
  display: inline-block;
  padding: 0.4rem 1rem;
  border: 2px solid #299758; 
  border-radius: 0.8rem;
}

.statusIsInactive {
  border-color: #fe6854; 
}

  .sport {
    background: #002b88 !important;
    border-radius: 10px;
    padding: 0.5rem 1rem; 
  }
`;

export default StudentProfileContent;
