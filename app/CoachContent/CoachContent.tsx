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
  basketballMen: "#F2BB05",
  basketballWomen: "#FF4500",
  Volleyball: "#DA70D6",
  "table tennis": "#32CD32",
  Taekwondo: "#FFD700",
  chess: "#00CED1",
  swimming: "#1E90FF",
  football: "#FF6347",
  valorant: "#FF4500", // Assign appropriate colors
  dota: "#DA70D6", // Assign appropriate colors
  "Mobile Legends": "#32CD32",
  fullTime: "#228B22",
  partTime: "#E03616",
  academicYear: "#F2BB05",
  // ...add more roles with their colors
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
      <h1>{name}</h1>

      <div className="tags">
        <Tag
          style={{ marginRight: "10px" }}
          color={roleColors[sport.replace(/\s+/g, "").toLowerCase()]}
        >
          {sport}
        </Tag>
        <Tag
          style={{ marginBottom: "10px" }}
          color={statusIsFulltime ? roleColors.fullTime : roleColors.partTime}
        >
          {statusIsFulltime ? "Full Time" : "Part Time"}
        </Tag>
        {/* Tag for academic year */}
        <Tag color={roleColors.academicYear}>{academicYear}</Tag>
      </div>

      <p className="sport">Permanent Team: {permanentTeam}</p>
      <p className="sport"> Contact Number: {contactNumber}</p>
      <p className="sport"> Remarks: {remarks}</p>
      <p className="date">
        Birth Date: {new Date(birthDate).toLocaleDateString(undefined, options)}
      </p>

      <div className="event-footer">
        <button className="edit" onClick={handleEdit}>
          {edit}
        </button>

        <button
          className="delete"
          onClick={() => {
            deleteCoachProfile(id);
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
  .isExternal,
  .isInternal {
    display: inline-block;
    padding: 0.4rem 1rem;
    border: 2px solid ${(props) => props.theme.colorDanger};
    border-radius: 0.8rem;
  }
  
  .isInternal {
    border-color: ${(props) => props.theme.colorGreenDark}; 
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
