import React from 'react';
import styled from 'styled-components';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
`;

const CloseButton = styled.button`
  float: right;
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
`;

function CoachProfileModal({ profile, onClose }) {
  if (!profile) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h1>{profile.firstName} {profile.middleName} {profile.lastName}</h1>
        <p>Contact Number: {profile.contactNumber}</p>
        <p>Email: {profile.email}</p>
        <p>Sport: {profile.sport}</p>
        {/* Add more fields as needed */}
      </ModalContent>
    </ModalBackdrop>
  );
}

export default CoachProfileModal;
