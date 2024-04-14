"use client"
import React from 'react'
import { useGlobalState } from '../context/globalProvider';
import styled from 'styled-components';
import { edit, trash } from '../utils/Icons';

interface Props {
    firstName: string;
    middleName: string;
    lastName: string;
    birthDate: string;
    age: string;
    nationality: string;
    civilStatus: string;
    isMale: boolean;
    isFemale: boolean;
    yrStartedPlaying: string;
    mothersName: string;
    fathersName: string;
    courseAndYear: string;
    contactNumber: string;
    email: string;
    homeAddress: string;
    weights: string
    height: string;
    bloodType: string;
    id:string;
  // inventory:any;
}

function StudentProfileContent({firstName, middleName,lastName, birthDate, age, nationality, civilStatus, isMale, isFemale, yrStartedPlaying, mothersName, fathersName, courseAndYear, contactNumber, email, homeAddress, weights, height, bloodType, id}:Props) {
  console.log(StudentProfileContent)
  const {theme, deleteStudentProfile} = useGlobalState();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <StudentContentStyled theme={theme}>
      <h1>{lastName}</h1>
      <h2>{firstName}</h2>
      <h2>{middleName}</h2>
      <p className="sport">Birth Date: {birthDate}</p>
      <p className='YearStartedPlaying'>Year Started Playing: {yrStartedPlaying}</p>
      <p className='ContactNumber'> Contact Number: {contactNumber}</p>

      <div className="event-footer">
      <button className="edit">{edit}</button>
        <button className="edit">{edit}</button>
        <button
          className="delete"
          onClick={() => {
            deleteStudentProfile(id);
          }}
        >
          {trash}
        </button>
        {/* <button className="completed">External</button> */}
      
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
  height: 20rem;
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

export default StudentProfileContent