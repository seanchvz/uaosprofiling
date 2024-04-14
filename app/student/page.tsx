"use client";
import React, { useEffect } from "react";
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
  const { theme, isLoading, fetchAllStudentProfile, openModal, modal } =
    useGlobalState();

  useEffect(() => {
    console.log("Fetch all student profile");
    fetchAllStudentProfile();
  }, []);

  return (
    // <div>
    //   {isLoading ? "true" : "false"}
    <StudentStyled theme={theme}>
      {modal && <StudentModal content={<CreateProfile />} />}
      <h1>{name}</h1>
      <div className="inventoryitem grid">
        <button className="create-item" onClick={openModal}>
          {plus}
          Add New Student
        </button>

        {studentprofile &&
          Array.isArray(studentprofile) &&
          studentprofile.map((studentprofile) => (
            <StudentProfileContent
              key={studentprofile.id}
              firstName={studentprofile.firstName}
              middleName={studentprofile.middleName}
              lastName={studentprofile.lastName}
              birthDate={studentprofile.birthDate}
              age={studentprofile.age}
              nationality={studentprofile.nationality}
              civilStatus={studentprofile.civilStatus}
              isMale={studentprofile.isMale}
              isFemale={studentprofile.isFemale}
              yrStartedPlaying={studentprofile.yrStartedPlaying}
              mothersName={studentprofile.mothersName}
              fathersName={studentprofile.fathersName}
              courseAndYear={studentprofile.courseAndYear}
              contactNumber={studentprofile.contactNumber}
              email={studentprofile.email}
              homeAddress={studentprofile.homeAddress}
              weights={studentprofile.weight}
              height={studentprofile.height}
              bloodType={studentprofile.bloodType}
              id={studentprofile.id}
            />
          ))}
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
    height: 20rem;
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
