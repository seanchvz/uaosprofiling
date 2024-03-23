import { useGlobalState } from '@/app/context/globalProvider';
import { edit, trash } from '@/app/utils/Icons';
import React from 'react'
import styled from 'styled-components';

interface Props{
    // event: any;
    firstName: string,
    middleName: string
    lastName: string,
    birthDate: string,
    age: string,
    nationality: string,
    civilStatus: string,
    isMale: boolean, 
    isFemale: boolean,
    yrStartedPlaying: string,
    mothersName: string,
    fathersName: string,
    courseAndYear: string,
    contactNumber: string,
    email: string,
    homeAddress: string,
    weight: string,
    height: string,
    bloodType: string,
    id: string,
}

function StudentItem({firstName, middleName, lastName, birthDate, age, isMale, isFemale, yrStartedPlaying, contactNumber, email, homeAddress, weight, height, bloodType, id}:Props) {
    const {theme, deleteEvent} = useGlobalState();

    // const { name, startDate, endDate, Sport, eventDetails, isExternal, isInternal } = event;

  return (
    <StudentItemStyled theme={theme}>
        <h1> Student </h1>
        <p className='firstname'> {firstName}</p>
        <p className="middleName"> {middleName}</p>
        <p className='lastName'> {lastName}</p>
        <div className="event-footer">
            {isMale ? (
            <button className="isExternal">Male</button>
            ) : (
            <button className="isInternal">Female</button> 
        )}
         
        <button className="edit">{edit}</button>
        <button 
        className="delete" 
        onClick={()=>{
          deleteEvent(id); //delete event muna since wala pa ako deleteStudent
        }}>
          {trash}</button>
            {/* <button className="completed">External</button> */}
        </div>
       

    </StudentItemStyled>
  )
}
const StudentItemStyled = styled.div`
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
      background: ${(props) => props.theme.colorDanger};
      border-radius: 0.8rem;
    }

    .isInternal {
      background: ${(props) => props.theme.colorGreenDark} !important;
    }
  }

  .sport {
    background: #002b88 !important;
    border-radius: 10px;
    padding: 0.5rem 1rem; 
  }
`;

export default StudentItem