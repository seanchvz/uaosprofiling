import { useGlobalState } from "@/app/context/globalProvider";
import { edit, trash } from "@/app/utils/Icons";
import { isExternal } from "node:util/types";
import React from "react";
import styled from "styled-components";

interface Props {
  // event: any;
  name: string;
  startDate: string;
  endDate: string;
  Sport: string;
  isExternal: boolean;
  eventDetails: string | null;
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
  isInternal: "#228B22",
  isExternal: "#E03616",
  academicYear: "#F2BB05",
};

const getSportColor = (Sport) => {
  const key = Sport ? Sport.replace(/\s+/g, "").toLowerCase() : "";
  return roleColors[key] || roleColors.defaultColor; // Ensure there's a defaultColor defined
};
//added handleEdit as a prop but for now it doesnt return anything
function EventItem({
  name,
  startDate,
  handleEdit,
  endDate,
  Sport,
  isExternal,
  eventDetails,
  id,
}: Props): React.JSX.Element {
  const { theme, deleteEvent } = useGlobalState();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // const { name, startDate, endDate, Sport, eventDetails, isExternal, isInternal } = event;
  return (
    <EventItemStyled theme={theme}>
      <h1 style={{ marginBottom: "5px" }}>{name}</h1>
      <div className="tags" style={{ marginTop: "5px" }}>
        {/* Tag for the sport */}
        <Tag style={{ marginRight: "10px" }} color={getSportColor(Sport)}>
          {Sport || "No Sport"}
        </Tag>

        {/* Conditional rendering of tags based on the event being internal or external */}
        {isExternal ? (
          <Tag color={roleColors["isExternal"]}>External</Tag>
        ) : (
          <Tag color={roleColors["isInternal"]}>Internal</Tag>
        )}
      </div>
      <p className="eventDetails">{eventDetails}</p>
      <p className="date">
        Start Date: {new Date(startDate).toLocaleDateString(undefined, options)}
      </p>
      <p className="dateend">
        End Date: {new Date(endDate).toLocaleDateString(undefined, options)}
      </p>

      <div className="event-footer">
        {/* Buttons for editing and deleting */}
        <button className="edit" onClick={handleEdit}>
          {edit}
        </button>
        <button
          className="delete"
          onClick={() => {
            const isConfirmed = window.confirm(
              "Are you sure you want to delete this event?"
            );
            if (isConfirmed) {
              deleteEvent(id);
            }
          }}
        >
          {trash}
        </button>
      </div>
    </EventItemStyled>
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

const EventItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 1px solid ${(props) => props.theme.borderColor2};
  height: 23rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center; // Align tags nicely if they wrap
    margin-top: 1rem; // Adjust as needed
  }

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
      padding: 0.4rem 1rem;
      border-radius: 0.8rem;
      color: white;
      border: 1px solid white;
      cursor: pointer;

      &:last-child {
      }

      &.delete {
        border: 1px solid white;
      }
    }
  }

  .sport {
    background: #002b88 !important;
    border-radius: 10px;
    padding: 0.5rem 1rem;
  }
`;

export default EventItem;
