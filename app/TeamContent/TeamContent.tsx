import { useGlobalState } from "@/app/context/globalProvider";
import { edit, trash } from "@/app/utils/Icons";
import React from "react";
import styled from "styled-components";

interface Props {
  // team: any;
  teamName: string;
  sport: string;
  id: string;
  handleEdit: () => void;
}

const roleColors = {
  basketballmen: "#192BC2",
  basketballwomen3x3: "#D90368",
  basketballwomen5x5: "#D90368",
  volleyballmen: "#276FBF",
  volleyballwomen: "#DA70D6",
  badmintonmen: "#D90368",
  badmintonwomen: "#D90368",
  tabletennis: "#32CD32",
  taekwondo: "#000000",
  chess: "#00CED1",
  swimming: "#1E90FF",
  footballmen: "#FF6347",
  footballwomen: "#FF6347",
  strengthandconditioning: "#000000",
  specialprojects: "#000000",
  valorant: "#FF4500",
  dota: "#DA70D6",
  mobilelegends: "#0038ff",
};

// const getSportColor = (sport) => {
//   const key = sport ? sport.replace(/\s+/g, "").toLowerCase() : "";
//   return roleColors[key] || roleColors.defaultColor; // Ensure there's a defaultColor defined
// };

function TeamContent({
  teamName,
  sport,
  id,
  handleEdit,
}: Props): React.JSX.Element {
  const { theme, deleteTeam } = useGlobalState();

  return (
    <TeamContentStyled theme={theme}>
      <h1 style={{ marginBottom: "5px" }}>{teamName}</h1>
      <div className="tags" style={{ marginTop: "5px" }}>
        {/* Tag for the sport */}
        {/* <Tag style={{ marginRight: "10px" }} color={getSportColor(sport)}>
          {sport || "No Sport"}
        </Tag> */}
      </div>
      <div className="team-footer">
        {/* Buttons for editing and deleting */}
        <button className="edit" onClick={handleEdit}>
          {edit}
        </button>
        <button
          className="delete"
          onClick={() => {
            const isConfirmed = window.confirm(
              "Are you sure you want to delete this team?"
            );
            if (isConfirmed) {
              deleteTeam(id);
            }
          }}
        >
          {trash}
        </button>
      </div>
    </TeamContentStyled>
  );
}

const Tag = styled.span`
  display: inline-block;
  padding: 0.3rem 0.6rem;
  margin-right: 0.5rem;
  border-radius: 0.8rem;
  background-color: ${(props) => props.color || "#6c757d"}; // A default color
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const TeamContentStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 1px solid ${(props) => props.theme.borderColor2};
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
    margin-top: 1rem;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .team-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      padding: 0.4rem 1rem;
      border-radius: 0.8rem;
      color: white;
      border: 1px solid white;
      cursor: pointer;
    }
  }
`;

export default TeamContent;
