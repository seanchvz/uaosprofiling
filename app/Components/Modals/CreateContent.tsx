import React, { useState } from 'react';
import styled from 'styled-components'; // Import styled-components// Assuming Button component exists
import { add } from '@/app/utils/Icons'; // Assuming Icons are imported
import Button from "../Button/Button";
import axios from 'axios';
import toast from "react-hot-toast";
import { useGlobalState } from '@/app/context/globalProvider';

function CreateContent() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [Sport, setSport] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [isExternal, setIsExternal] = useState(false);
  const [isInternal, setIsInternal] = useState(false);
  const [userId, setUserId] = useState(""); // Assuming userId is obtained from authentication

  const {allEvents, closeModal}= useGlobalState();

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
        toast.success("Event created successfully.");
        allEvents();
        closeModal();
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  



  return (
<form onSubmit={handleSubmit} className="mx-auto max-w-lg"> {/* Center the form and set max width */}
  <div className="mb-8"> {/* Add margin-bottom */}
    <h1 className="text-4xl font-bold mb-4">Create an Event</h1> {/* Add margin-bottom */}
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="input-control">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        value={name}
        name="name"
        onChange={handleChange("name")}
        placeholder="Enter event name"
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
      />
    </div>

    <div className="input-control">
      <label htmlFor="startDate" className="block">Start Date</label>
      <input
        type="date"
        id="startDate"
        value={startDate}
        name="startDate"
        onChange={handleChange("startDate")}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
      />
    </div>
    <div className="input-control">
      <label htmlFor="endDate" className="block">End Date</label>
      <input
        type="date"
        id="endDate"
        value={endDate}
        name="endDate"
        onChange={handleChange("endDate")}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
      />
    </div>
    <div className="input-control">
      <label htmlFor="Sport" className="block">Sport</label>
      <input
        type="text"
        id="Sport"
        value={Sport}
        name="Sport"
        onChange={handleChange("Sport")}
        placeholder="Enter sport"
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
      />
    </div>
    <div className="input-control">
      <label htmlFor="eventDetails" className="block">Event Details</label>
      <textarea
        id="eventDetails"
        value={eventDetails}
        name="eventDetails"
        onChange={handleChange("eventDetails")}
        placeholder="Enter event details"
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        rows={4}
      ></textarea>
    </div>
    <div className="input-control flex justify-between">
    <label htmlFor="isExternal" className="flex items-center cursor-pointer">
  <span className="mr-2 text-white">Is External</span> {/* Added text-white class */}
  <input
    id="isExternal"
    type="checkbox"
    checked={isExternal}
    onChange={handleChange("isExternal")}
    className="hidden"
  />
  <span className={`w-10 h-5 border border-white rounded-full shadow-inner flex items-center transition-colors duration-300 ${isExternal ? 'bg-red-500' : ''}`}> {/* Updated classNames */}
    <span className={`block w-5 h-5 rounded-full bg-white shadow-md transform duration-300 ${isExternal ? 'translate-x-5' : ''}`} />
  </span>
</label>

      <label htmlFor="isInternal" className="flex items-center cursor-pointer">
  <span className="mr-2 text-white">Is Internal</span> {/* Added text-white class */}
  <input
    id="isInternal"
    type="checkbox"
    checked={isInternal}
    onChange={handleChange("isInternal")}
    className="hidden"
  />
  <span className={`w-10 h-5 border border-white rounded-full shadow-inner flex items-center transition-colors duration-300 ${isInternal ? 'bg-green-500' : ''}`}> {/* Updated classNames */}
    <span className={`block w-5 h-5 rounded-full bg-white shadow-md transform duration-300 ${isInternal ? 'translate-x-5' : ''}`} />
  </span>
</label>

    </div>
  </div>
  <div className="submit-btn mt-4 flex justify-center"> 
  <button
    type="submit"
    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
  >
    {add}
    
    Create Event
    
  </button>
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
