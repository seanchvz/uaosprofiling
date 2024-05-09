"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalState } from "../context/globalProvider";
// A generic modal component you need to create
import { plus } from "../utils/Icons";
import DashboardModal from "../Components/Modals/DashboardModal";
import { FaExclamationTriangle } from "react-icons/fa";

interface Props {
  name: string;
}

function Dashboard() {
  const { theme, openModal, modal } = useGlobalState();
  const [modalType, setModalType] = useState("");

  const handleOpenModal = (type: React.SetStateAction<string>) => {
    setModalType(type);
    openModal();
  };

  return (
    <DashboardStyled theme={theme}>
      <FaExclamationTriangle size={50} color="red" />
      <h1>
        Sign up not allowed, please contact the University Athletics Office
        Administrator.
      </h1>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; // This will make it take the full height of the viewport
  text-align: center;
  color: ${(props) =>
    props.theme.textColor || "white"}; // Uses theme color or default to black
  background-color: black;
`;
export default Dashboard;
