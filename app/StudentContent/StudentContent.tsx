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
  sport: string | null;
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

const getSportColor = (sport) => {
  const key = sport ? sport.replace(/\s+/g, "").toLowerCase() : "";
  return roleColors[key] || roleColors.defaultColor; // Ensure there's a defaultColor defined
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
      <h1>{`${lastName}, ${firstName} ${middleName}`}</h1>{" "}
      {/* Combine names in a single header */}
      <div className="tags">
        <Tag
          style={{ marginBottom: "10px" }}
          color={
            statusIsActive
              ? roleColors.statusIsActive
              : roleColors.statusIsInactive
          }
        >
          {statusIsActive ? "Active" : "Inactive"}
        </Tag>
        <Tag style={{ marginRight: "10px" }} color={getSportColor(sport)}>
          {sport || "No Sport"}
        </Tag>
        <Tag color={roleColors.academicYear}>{academicYear}</Tag>
      </div>
      <p className="date">
        Birth Date: {new Date(birthDate).toLocaleDateString(undefined, options)}
      </p>
      <p className="contactInfo">Contact Number: {contactNumber}</p>
      <p className="remarks">Remarks: {remarks}</p>
      <div className="event-footer">
        <button className="edit" onClick={handleEdit}>
          {edit}
        </button>
        <button
          className="delete"
          onClick={() => {
            const isConfirmed = window.confirm(
              "Are you sure you want to delete this profile?"
            );
            if (isConfirmed) {
              deleteStudentProfile(id);
            }
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
    margin-bottom: 1rem; /* Add margin to the bottom of the heading */
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
    justify-content: flex-start;
    margin-top: auto;

    button {
      padding: 0.4rem 1rem;
      border-radius: 0.8rem;
      color: white;
      border: 1px solid white;
      cursor: pointer;
      margin-right: 10px; // Add this line

      &:last-child {
        margin-right: 0; // Add this line
      }

      &.delete {
        border: 1px solid white;
      }
    }
  }

  .sport {
    background: #002b88 !important;
    border-radius: 10px;
    padding: 0.5rem 1rem;
  }
`;

export default StudentProfileContent;
