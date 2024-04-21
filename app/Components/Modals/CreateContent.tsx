import React, { useEffect, useState } from "react";
import styled from "styled-components"; // Import styled-components// Assuming Button component exists
import { add } from "@/app/utils/Icons"; // Assuming Icons are imported
import Button from "../Button/Button";
import axios from "axios";
import toast from "react-hot-toast";
import { useGlobalState } from "@/app/context/globalProvider";

// props avaialable
interface Props {
  event?: any;
  submitState: "create" | "edit";
}

// event: object || null
// submitState: string 'create' | 'edit'
// OR false ||
// AND true &&
function CreateContent(props: Props) {
  const { event, submitState } = props;
  const [name, setName] = useState(event ? event.name : "");
  const [startDate, setStartDate] = useState(event ? event.startDate : "");
  const [endDate, setEndDate] = useState(event ? event.endDate : "");
  const [Sport, setSport] = useState(event ? event.Sport : "");
  const [eventDetails, setEventDetails] = useState(
    event ? event.eventDetails : ""
  );
  const [isExternal, setIsExternal] = useState(
    event ? event.isExternal : false
  );
  const [isInternal, setIsInternal] = useState(
    event ? event.isInternal : false
  );
  const [userId, setUserId] = useState(event ? event.userId : ""); // userId is obtained from authentication
  const [id, setId] = useState(event ? event.id : "");
  const { allEvents, closeModal } = useGlobalState();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      // For checkboxes, use checked value
      if (name === "isExternal") setIsExternal(checked);
      if (name === "isInternal") setIsInternal(checked);
    } else {
      // For other inputs, use value
      switch (name) {
        case "name":
          setName(value);
          break;
        case "startDate":
          setStartDate(value);
          break;
        case "endDate":
          setEndDate(value);
          break;
        case "Sport":
          setSport(value);
          break;
        case "eventDetails":
          setEventDetails(value);
          break;
      }
    }
  };

  useEffect(() => {
    if (submitState === "edit" && event) {
      setName(event.name);

      // Format dates to YYYY-MM-DD for the date input fields
      const formattedStartDate = new Date(event.startDate)
        .toISOString()
        .split("T")[0];
      const formattedEndDate = new Date(event.endDate)
        .toISOString()
        .split("T")[0];

      setStartDate(formattedStartDate);
      setEndDate(formattedEndDate);

      setSport(event.Sport);
      setEventDetails(event.eventDetails);
      setIsExternal(event.isExternal);
      setIsInternal(event.isInternal);
      setUserId(event.userId);
    }
  }, [submitState, event]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const event = {
      id,
      name,
      startDate,
      endDate,
      Sport,
      eventDetails,
      isExternal,
      isInternal,
      userId, // Assuming you fetch this from some auth context or similar
    };

    //determine if mag create ng new event or mag update
    if (submitState === "edit") {
      // API call to update the event
      try {
        const response = await axios.patch(`/api/events/${event.id}`, event);
        toast.success("Event updated successfully!");
        // Refresh events list or handle state update
      } catch (error) {
        console.error("Failed to update the event:", error);
        toast.error("Error updating event");
      }
    } else {
      // API call to create a new event
      try {
        const response = await axios.post("/api/events", event);
        toast.success("Event created successfully!");
        allEvents();
        closeModal();
      } catch (error) {
        console.error("Failed to create the event:", error);
        toast.error("Error creating event");
      }
    }
    // Optionally close the modal after operation
    closeModal();
  };
  //handleEditFunction
  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

    //try and catch for the editing
    try {
      const eventId = "existing-event-id"; // id of the event thats being edited
      const res = await axios.put(`/api/events/${eventId}`, event);

      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        toast.success("Event updated successfully.");
        allEvents(); // fetches all events and updates the state
        closeModal();
      }
    } catch (error) {
      toast.error("Something went wrong during event update.");
      console.log(error);
    }
  };

  return (
    <CreateContentStyled onSubmit={handleSubmit} className="mx-auto max-w-lg">
      {" "}
      <div className="mb-8">
        {" "}
        <h1 className="text-4xl font-bold mb-4">Create an Event</h1>{" "}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="input-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            name="name"
            onChange={handleChange}
            placeholder="Enter event name"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <div className="flex">
          <div className="input-control">
            <label htmlFor="startDate" className="block">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              name="startDate"
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
            />
          </div>
          <div className="input-control">
            <label htmlFor="endDate" className="block">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              name="endDate"
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
            />
          </div>
        </div>
        <div className="input-control">
          <label htmlFor="Sport" className="block">
            Sport
          </label>
          <input
            type="text"
            id="Sport"
            value={Sport}
            name="Sport"
            onChange={handleChange}
            placeholder="Enter sport"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>
        <div className="input-control">
          <label htmlFor="eventDetails" className="block">
            Event Details
          </label>
          <textarea
            id="eventDetails"
            value={eventDetails}
            name="eventDetails"
            onChange={handleChange}
            placeholder="Enter event details"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
            rows={4}
          ></textarea>
        </div>
        <div className="input-control flex justify-between">
          <label
            htmlFor="isExternal"
            className="flex items-center cursor-pointer"
          >
            <span className="mr-2 text-white">Is External</span>{" "}
            <input
              id="isExternal"
              type="checkbox"
              checked={isExternal}
              onChange={handleChange}
              name="isExternal"
              className="hidden"
            />
            <span
              className={`w-10 h-5 border border-white rounded-full shadow-inner flex items-center transition-colors duration-300 ${
                isExternal ? "bg-red-500" : ""
              }`}
            >
              {" "}
              {/* Updated classNames */}
              <span
                className={`block w-5 h-5 rounded-full bg-white shadow-md transform duration-300 ${
                  isExternal ? "translate-x-5" : ""
                }`}
              />
            </span>
          </label>

          <label
            htmlFor="isInternal"
            className="flex items-center cursor-pointer"
          >
            <span className="mr-2 text-white">Is Internal</span>{" "}
            <input
              id="isInternal"
              type="checkbox"
              checked={isInternal}
              onChange={handleChange}
              name="isInternal"
              className="hidden"
            />
            <span
              className={`w-10 h-5 border border-white rounded-full shadow-inner flex items-center transition-colors duration-300 ${
                isInternal ? "bg-green-500" : ""
              }`}
            >
              {" "}
              {/* Updated classNames */}
              <span
                className={`block w-5 h-5 rounded-full bg-white shadow-md transform duration-300 ${
                  isInternal ? "translate-x-5" : ""
                }`}
              />
            </span>
          </label>
        </div>
      </div>
      <div className="submit-btn mt-4 flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          {submitState === "edit" ? "Update Event" : "Create Event"}
        </button>
      </div>
    </CreateContentStyled>
  );
}

const CreateContentStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }

  color: ${(props) => props.theme.colorGrey1};

  .input-control {
    margin: 0.5rem 0;
  }

  label {
    margin-bottom: 0.5rem;
    display: inline-block;
    font-size: clamp(0.9rem, 5vw, 1.2rem);

    span {
      color: ${(props) => props.theme.colorGrey3};
    }
  }

  input[type="text"],
  input[type="email"],
  input[type="password"],
  input[type="date"],
  input[name="weight"],
  input[name="height"],
  textarea {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 2px solid #4a4a4a;
    box-sizing: border-box;
    border-radius: 15px;
  }

  input[type="text"]:focus,
  input[type="email"]:focus,
  input[type="password"]:focus,
  input[type="date"]:focus,
  input[name="weight"]:focus,
  input[name="height"]:focus,
  textarea:focus {
    border: 1px solid #718096;
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
function fetchAllInventoryItems() {
  throw new Error("Function not implemented.");
}
