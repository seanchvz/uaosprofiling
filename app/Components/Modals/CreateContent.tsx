import React, { useState } from 'react';
import styled from 'styled-components'; // Import styled-components// Assuming Button component exists
import { add } from '@/app/utils/Icons'; // Assuming Icons are imported
import Button from "../Button/Button";
import axios from 'axios';
import toast from "react-hot-toast";

function CreateContent() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [Sport, setSport] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [isExternal, setIsExternal] = useState(false);
  const [isInternal, setIsInternal] = useState(false);
  const [userId, setUserId] = useState(""); // Assuming userId is obtained from authentication

  const handleChange = (name: string) => (e: any)=>{

    switch (name) {
      case "name":
        setName(e.target.value);
        break;
      case "startDate":
        setStartDate(e.target.value);
        break;
      case "endDate":
        setEndDate(e.target.value);
        break;
      case "Sport":
        setSport(e.target.value); // Convert to number if necessary
        break;
      case "eventDetails":
        setEventDetails(e.target.value);
        break;
      case "isExternal":
        setIsExternal(e.target.checked); // Convert to boolean if necessary
        break;
      case "isInternal":
        setIsInternal(e.target.checked); // Convert to boolean if necessary
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const event = {
      name,
      startDate,
        endDate,
        Sport,
        eventDetails,
        isExternal,
        isInternal,
        userId,
    };
    try {
      const res = await axios.post("/api/events", event);

      if (res.data.error) {
        toast.error(res.data.error);
      }

      if (!res.data.error) {
        toast.success("Task created successfully.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };



  return (
    <form onSubmit={handleSubmit}>
      <h1>Create an Event</h1>
      <div className="input-control">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          name="name"
          onChange={handleChange("name")}
          placeholder="Enter event name"
        />
      </div>
      <div className="input-control">
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          name="startDate"
          onChange={handleChange("startDate")}
        />
      </div>
      <div className="input-control">
        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          name="endDate"
          onChange={handleChange("endDate")}
        />
      </div>
      <div className="input-control">
        <label htmlFor="Sport">Sport</label>
        <input
          type="text"
          id="Sport"
          value={Sport}
          name="Sport"
          onChange={handleChange("Sport")}
          placeholder="Enter sport "
        />
      </div>
      <div className="input-control">
        <label htmlFor="eventDetails">Event Details</label>
        <textarea
          id="eventDetails"
          value={eventDetails}
          name="eventDetails"
          onChange={handleChange("eventDetails")}
          placeholder="Enter event details"
        ></textarea>
      </div>
      <div className="input-control">
        <label>
          <input
            type="checkbox"
            checked={isExternal}
            onChange={handleChange("isExternal")}
          />
          Is External
        </label>
      </div>
      <div className="input-control">
        <label>
          <input
            type="checkbox"
            checked={isInternal}
            onChange={handleChange("isInternal")}
          />
          Is Internal
        </label>
      </div>
      <div className="submit-btn flex justify-end">
        <Button
          type="submit"
          name="Create Event"
          icon={add}
          padding={"0.8rem 2rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1.2rem"}
          background={"rgb(0, 163, 255)"}
        />
      </div>
    </form>
  );
}

const CreateContentStyled = styled.form`
> h1 {
  font-size: clamp(1.2rem, 5vw, 1.6rem);
  font-weight: 600;
}

color: ${(props) => props.theme.colorGrey1};

.input-control {
  position: relative;
  margin: 1.6rem 0;
  font-weight: 500;

  @media screen and (max-width: 450px) {
    margin: 1rem 0;
  }

  label {
    margin-bottom: 0.5rem;
    display: inline-block;
    font-size: clamp(0.9rem, 5vw, 1.2rem);

    span {
      color: ${(props) => props.theme.colorGrey3};
    }
  }

  input,
  textarea {
    width: 100%;
    padding: 1rem;

    resize: none;
    background-color: ${(props) => props.theme.colorGreyDark};
    color: ${(props) => props.theme.colorGrey2};
    border-radius: 0.5rem;
  }
}

.submit-btn button {
  transition: all 0.35s ease-in-out;

  @media screen and (max-width: 500px) {
    font-size: 0.9rem !important;
    padding: 0.6rem 1rem !important;

    i {
      font-size: 1.2rem !important;
      margin-right: 0.5rem !important;
    }
  }

  i {
    color: ${(props) => props.theme.colorGrey0};
  }

  &:hover {
    background: ${(props) => props.theme.colorPrimaryGreen} !important;
    color: ${(props) => props.theme.colorWhite} !important;
  }
}

.toggler {
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;

  label {
    flex: 1;
  }

  input {
    width: initial;
  }
}
`;
export default CreateContent;
