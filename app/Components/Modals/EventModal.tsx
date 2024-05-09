"use client";
import React from "react";
import { useGlobalState } from "@/app/context/globalProvider";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

function EventModal({ children }: Props) {
  const { closeModal, theme } = useGlobalState();
  return (
    <ModalStyled theme={theme}>
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal-content">{children}</div>
    </ModalStyled>
  );
}
const ModalStyled = styled.div`
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 100;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-overlay {
    position: fixed; // Changed from absolute to fixed
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.45);
    z-index: 10; // Ensure this is below .modal-content
  }

  .modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 1500px;
    width: 40%;
    max-height: 90vh;
    padding: 2rem;
    margin-bottom: 2rem;
    overflow-y: auto;
    z-index: 20;

    background-color: ${(props) => props.theme.colorBg2};
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
    border-radius: 1rem;

    @media screen and (max-width: 450px) {
      font-size: 90%;
      width: 95%; // Increase width for small screens to utilize space better
      padding: 1rem; // Adjust padding for small screens
    }
  }
`;

export default EventModal;
