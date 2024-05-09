import React from 'react';
import styled from 'styled-components';

const ViewModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
`;

const ViewStudentModal = ({ studentProfile, onClose }) => {
  return (
    <ViewModalStyled onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2>Student Details</h2>
        <p><strong>First Name:</strong> {studentProfile.firstName}</p>
        <p><strong>Last Name:</strong> {studentProfile.lastName}</p>
        {/* Add more details as needed */}
        <button onClick={onClose}>Close</button>
      </ModalContent>
    </ViewModalStyled>
  );
};

export default ViewStudentModal;
