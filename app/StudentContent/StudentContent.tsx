"use client";
import React from "react";
import { useGlobalState } from "../context/globalProvider";
import styled from "styled-components";
import { edit, trash } from "../utils/Icons";

interface Props {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  contactNumber: string;
  birthDate: string;
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
}
function StudentProfileContent({
  id,
  firstName,
  middleName,
  lastName,
  contactNumber,
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
}: Props) {
  console.log(StudentProfileContent);
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
      <p> Birth Date: {new Date(birthDate).toLocaleDateString(undefined, options)}</p>
      <p className="YearStartedPlaying">
        Year Started Playing: {yrStartedPlaying}
      </p>
      <p className="ContactNumber"> Contact Number: {contactNumber}</p>
      <p className="AcademicYear"> Academic Year: {academicYear}</p>
      <p className="AcademicYear"> Remarks: {remarks}</p>
      <div className="event-footer">
  {statusIsActive ? (
    <button className="statusIsActive">Active</button>
  ) : statusIsInactive ? (
    <button className="statusIsInactive">Inactive</button>
  ) : null}

  <button className="edit">{edit}</button>
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
