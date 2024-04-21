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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ fontSize: "clamp(1.5rem, 2vw, 2rem)", fontWeight: 800 }}>
          {name}
        </h1>
        <button className="create-item" onClick={openModal}>
          {plus}
          Add New Student
        </button>
      </div>

      <table className="inventoryitem grid mt-5">
        {studentprofile &&
          Array.isArray(studentprofile) &&
          studentprofile.map((student) => (
            <StudentProfileContent
            key={student.id}
            firstName={student.firstName}
            middleName={student.middleName}
            lastName={student.lastName}
            contactNumber={student.contactNumber}
            birthDate={student.birthDate}
            nationality={student.nationality}
            weight={student.weight}
            height={student.height}
            bloodType={student.bloodType}
            academicYear={student.academicYear}
            isMale={student.isMale}
            isFemale={student.isFemale}
            yrStartedPlaying={student.yrStartedPlaying}
            mothersName={student.mothersName}
            fathersName={student.fathersName}
            guardiansName={student.guardiansName}
            courseAndYear={student.courseAndYear}
            emergencyContactPerson={student.emergencyContactPerson}
            emergencyContactNumber={student.emergencyContactNumber}
            email={student.email}
            homeAddress={student.homeAddress}
            statusIsActive={student.statusIsActive}
            statusIsInactive={student.statusIsInactive}
            userId={student.userId}
            remarks={student.remarks}
            id={student.id}
            />
          ))}
      </table>
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
  width: 21.8rem;
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

// export default function PageWithProvider() {
//   return (
//     <InventoryGlobalProvider>

//       <Page />
//     </InventoryGlobalProvider>
//   );
// }
