// components/Modals/CreateModal.js
import React from "react";
import styled from "styled-components";

const CreateModal = ({ type }: { type: string }) => {
  const renderForm = () => {
    switch (type) {
      case "event":
        return <p>Event Creation Form</p>;
      case "student":
        return <p>Student Profile Form</p>;
      case "coach":
        return <p>Coach Profile Form</p>;
      default:
        return <p>Unknown Form</p>;
    }
  };

  return <ModalStyled>{renderForm()}</ModalStyled>;
};

const ModalStyled = styled.div`
  /* Modal styling here */
`;

export default CreateModal;
