"use client"
import React from 'react'
import { useGlobalState } from '../context/globalProvider';
import styled from 'styled-components';
import { edit, trash } from '../utils/Icons';

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
  id: string;
  // inventory: any;
}

function CoachProfileContent({name, contactNumber, sport, permanentTeam, isMale, isFemale,emergencyContact, emergencyContactPerson, birthDate, nationality, weight, height, bloodType, academicYear, statusIsFulltime, statusIsParttime, resumeUrl, email, id}:Props) {
  // console.log(inventory)
  const {theme, deleteCoachProfile} = useGlobalState();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };


  // Card Contents
  return (
    <CoachContentStyled theme={theme}>
      <h1>{name}</h1>
      <table>
        <tr>
          <td>Sport:</td>
          <td>{sport}</td>
        </tr>
        <tr>
          <td>Permanent Team:</td>
          <td>{permanentTeam}</td>
        </tr>
        <tr>
          <td>Contact Number:</td>
          <td>{contactNumber}</td>
        </tr>
        <tr>
          <td>Academic Year:</td>
          <td>{academicYear}</td>
        </tr>
      </table>
  
      <div className="event-footer">
        {statusIsFulltime ? (
          <button className="isExternal">Full Time</button>
        ) : (
          <button className="isInternal">Part Time</button>
        )}
        <button className="edit">{edit}</button>
  
        <button
          className="delete"
          onClick={() => {
            deleteCoachProfile(id);
          }}
        >
          {trash}
        </button>
      </div>
    </CoachContentStyled>

  );
}
const CoachContentStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 1px solid ${(props) => props.theme.borderColor2};
  height: auto; /* Adjust the height to auto to accommodate the table */
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  table {
    width: 100%; /* Make the table take the full width of the parent */
    margin-bottom: 1rem; /* Add margin to the bottom of the table */

    td {
      padding: 0.5rem; /* Add padding to the table data */
    }
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
  }
`;

export default CoachProfileContent