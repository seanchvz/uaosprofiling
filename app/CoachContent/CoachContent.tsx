"use client";
import React, { useEffect } from "react";
import { useGlobalState } from "../context/globalProvider";
import styled from "styled-components";
import { edit, trash } from "../utils/Icons";
/**
 * Props for the CoachContent component.
 */
interface Props {
  name: string;
  contactNumber: string;
  sport: string;
  permanentTeam: string;
  isMale: boolean;
  isFemale: boolean;
  emergencyContact: string;
  emergencyContactPerson: string;
  birthDate: string;
  nationality: string;
  weight: number;
  height: number;
  bloodType: string;
  academicYear: string;
  statusIsFulltime: boolean;
  statusIsParttime: boolean;
  resumeUrl: string;
  email: string;
  remarks: string;
  id: string;
  handleEdit: () => void;

  // inventory: any;
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
  fullTime: "#228B22",
  partTime: "#E03616",
  academicYear: "#fda600",
};

const getSportColor = (sport) => {
  const key = sport ? sport.replace(/\s+/g, "").toLowerCase() : "";
  return roleColors[key] || roleColors.defaultColor; // Ensure there's a defaultColor defined
};

function CoachContent({
  name,
  contactNumber,
  sport,
  permanentTeam,
  remarks,
  isMale,
  isFemale,
  emergencyContact,
  emergencyContactPerson,
  birthDate,
  nationality,
  weight,
  height,
  bloodType,
  academicYear,
  statusIsFulltime,
  statusIsParttime,
  resumeUrl,
  email,
  id,
  handleEdit,
}: Props): React.JSX.Element {
  const { theme, deleteCoachProfile } = useGlobalState();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Card Contents
  return (
    <CoachContentStyled theme={theme}>
      <h1 style={{ marginBottom: "5px" }}>{name}</h1>

      <div className="tags">
        <Tag
          style={{ marginBottom: "10px" }}
          color={statusIsFulltime ? roleColors.fullTime : roleColors.partTime}
        >
          {statusIsFulltime ? "Full Time" : "Part Time"}
        </Tag>
        <Tag style={{ marginRight: "10px" }} color={getSportColor(sport)}>
          {sport || "No Sport"}
        </Tag>
        <Tag color={roleColors.academicYear}>{academicYear}</Tag>
      </div>

      {/* <p className="sport">Permanent Team: {permanentTeam}</p> */}
      <p className="date" style={{ marginBottom: "5px" }}>
        Birth Date: {new Date(birthDate).toLocaleDateString(undefined, options)}
      </p>
      <p className="contactInfo" style={{ marginBottom: "5px" }}>
        Contact Number: {contactNumber}
      </p>
      <p className="remarks" style={{ marginBottom: "5px" }}>
        Remarks: {remarks}
      </p>

      <div className="event-footer" style={{ marginTop: "5px" }}>
        <button className="edit" onClick={handleEdit}>
          {edit}
        </button>

        <button
          className="delete"
          onClick={() => {
            if (
              window.confirm(
                "Are you sure you want to delete this coach profile?"
              )
            ) {
              deleteCoachProfile(id);
            }
          }}
        >
          {trash}
        </button>

        {/* <button className="completed">External</button> */}
      </div>
    </CoachContentStyled>
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
const CoachContentStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 1px solid ${(props) => props.theme.borderColor2};
  height: 24rem;
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

export default CoachContent;
function fetchAllCoachProfile() {
  throw new Error("Function not implemented.");
}
