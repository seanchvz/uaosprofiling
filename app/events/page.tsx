// "use client";
// import React, { useState } from "react";
// import styled from "styled-components";
// import { useGlobalState } from "../context/globalProvider";
// // A generic modal component you need to create
// import { plus } from "../utils/Icons";
// import DashboardModal from "../Components/Modals/DashboardModal";

// interface Props {
//   name: string;
// }

// function Dashboard() {
//   const { theme, openModal, modal } = useGlobalState();
//   const [modalType, setModalType] = useState("");

//   const handleOpenModal = (type: React.SetStateAction<string>) => {
//     setModalType(type);
//     openModal();
//   };

//   return (
//     <DashboardStyled theme={theme}>
//       {modal && <DashboardModal type={modalType} />}
//       <Header>
//         <h1>Create New Profiles</h1>
//         <div>
//           <Button onClick={() => handleOpenModal("event")}>
//             {plus} Add New Event
//           </Button>
//           <Button onClick={() => handleOpenModal("student")}>
//             {plus} Create Student Profile
//           </Button>
//           <Button onClick={() => handleOpenModal("coach")}>
//             {plus} Create Coach Profile
//           </Button>
//         </div>
//       </Header>
//     </DashboardStyled>
//   );
// }

// const DashboardStyled = styled.div`
//   padding: 2rem;
//   background-color: ${(props) => props.theme.background};
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 2rem;
// `;

// const Button = styled.button`
//   margin-right: 1rem;
//   padding: 0.5rem 1rem;
//   background-color: ${(props) => props.theme.buttonColor};
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: ${(props) => props.theme.buttonHover};
//   }
// `;

// export default Dashboard;
