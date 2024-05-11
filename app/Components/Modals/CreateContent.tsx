import React, { useEffect, useState } from "react";
import styled from "styled-components"; // Import styled-components// Assuming Button component exists
import { add } from "@/app/utils/Icons"; // Assuming Icons are imported
import Button from "../Button/Button";
import axios from "axios";
import toast from "react-hot-toast";
import { useGlobalState } from "@/app/context/globalProvider";
import Select from "react-select";

// props avaialable
interface Props {
  event?: any;
  submitState: "create" | "edit";
}

// event: object || null
// submitState: string 'create' | 'edit'
// OR false ||
// AND true &&
// Main functional component
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
  const [userId, setUserId] = useState(event ? event.userId : "");
  const [id, setId] = useState(event ? event.id : "");
  const { allEvents, closeModal } = useGlobalState();

  // Specify the type for useState to be an array of numbers
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [teamOptions, setTeamOptions] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [teamDetails, setTeamDetails] = useState([]);
  const [studentOptions, setStudentOptions] = useState<
    { value: number; label: string }[]
  >([]);

  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events"); // Adjust the URL as needed
        setEventsList(response.data); // Assuming the data is directly an array of events
      } catch (error) {
        console.error("Failed to fetch events:", error);
        toast.error("Failed to load events data.");
      }
    };

    fetchEvents();
  }, []);
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("/api/teams");
        const formattedTeams = response.data.map((team) => ({
          value: team.id,
          label: team.teamName,
          sport: team.sport ? team.sport.name : "No Sport",
          students: team.students.map((s) => ({
            id: s.id,
            name: `${s.firstName} ${s.lastName}`,
          })),
        }));
        setTeamOptions(formattedTeams);
        setTeamDetails(formattedTeams); // Store detailed information
        if (submitState === "edit" && event && event.teams) {
          setSelectedTeams(event.teams.map((t) => t.id));
        }
      } catch (error) {
        toast.error("Failed to load teams");
      }
    };

    fetchTeams();
  }, [submitState, event]);

  useEffect(() => {
    // Fetching student options for the select dropdown
    const fetchStudents = async () => {
      try {
        const response = await axios.get("/api/studentProfiling");
        const options = response.data.map((student) => ({
          value: student.id,
          label: `${student.firstName} ${student.lastName}`,
        }));
        setStudentOptions(options);
      } catch (error) {
        console.error("Failed to fetch students:", error);
        toast.error("Failed to load student data.");
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    if (submitState === "edit" && event && event.students) {
      // Set initially selected students from the event data
      setSelectedStudents(event.students.map((student: any) => student.id));
    }
  }, [event, submitState]);

  //change events on form inputs in a React component.
  const handleChange = (e: {
    target: { name: any; value: any; type: any; checked: any };
  }) => {
    const { name, value, type, checked } = e.target;

    switch (name) {
      case "isExternal":
        setIsExternal(checked);
        if (checked) setIsInternal(false); // Uncheck internal if external is checked
        break;
      case "isInternal":
        setIsInternal(checked);
        if (checked) setIsExternal(false); // Uncheck external if internal is checked
        break;
      case "name":
        setName(value);
        break;
      case "startDate":
        setStartDate(value);
        break;
      case "endDate":
        setEndDate(value);
        break;

      case "eventDetails":
        setEventDetails(value);
        break;
    }
  };
  //
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
      // setSport(event.Sport);
      setEventDetails(event.eventDetails);
      setIsExternal(event.isExternal);
      setIsInternal(event.isInternal);
      setUserId(event.userId);
    }
  }, [submitState, event]);
  //
  useEffect(() => {
    const fetchEventDetails = async () => {
      if (submitState === "edit" && event) {
        if (teamOptions.length === 0) {
          const response = await axios.get("/api/teams");
          const teamsData = response.data.map(
            (team: { id: any; teamName: any; sport: { name: any } }) => ({
              value: team.id,
              label: `${team.teamName} - ${
                team.sport ? team.sport.name : "No Sport"
              }`,
            })
          );
          setTeamOptions(teamsData);
        }
        // Use existing event details if in 'edit' mode
        setName(event.name);
        setStartDate(new Date(event.startDate).toISOString().split("T")[0]);
        setEndDate(new Date(event.endDate).toISOString().split("T")[0]);
        setSport(event.Sport);
        setEventDetails(event.eventDetails);
        setIsExternal(event.isExternal);
        setIsInternal(event.isInternal);
        setSelectedStudents(event.students.map((s: { id: number }) => s.id));
        setSelectedTeams(event.teams.map((t: { id: number }) => t.id));
      } else if (submitState === "create") {
        try {
          // Assume you need to fetch a default event or some data when creating a new event
          const response = await axios.get("/api/events?eventId=123"); // Example API call
          if (response.data) {
            console.log("Fetched event data:", response.data);
            // Set state with fetched data
          }
        } catch (error) {
          console.error("Error fetching event details:", error);
          toast.error("Failed to fetch event details");
        }
      }
    };

    fetchEventDetails();
  }, [event, submitState]);
  //
  useEffect(() => {
    console.log("Updated studentOptions state:", studentOptions);
  }, [studentOptions]);

  // Initialize form data when editing an existing event
  useEffect(() => {
    if (submitState === "edit" && event) {
      setName(event.name);
      setStartDate(new Date(event.startDate).toISOString().split("T")[0]);
      setEndDate(new Date(event.endDate).toISOString().split("T")[0]);
      setSport(event.Sport);
      setEventDetails(event.eventDetails);
      setIsExternal(event.isExternal);
      setIsInternal(event.isInternal);
      setUserId(event.userId);
      setId(event.id);

      if (event.students && event.students.length > 0) {
        setSelectedStudents(event.students.map((student: any) => student.id));
      }
      if (event.teams && event.teams.length > 0) {
        setSelectedTeams(event.teams.map((team: any) => team.id));
      }
    }
  }, [submitState, event, teamOptions]); // Ensure this hook is sensitive to changes in 'submitState' and 'event'

  useEffect(() => {
    // to see if they are selected
    console.log("Current selectedStudents:", selectedStudents);
  }, [selectedStudents]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check for a duplicate name in the events list
    const isDuplicate = eventsList.some(
      (event) => event.name === name && (!id || event.id !== id)
    );

    if (isDuplicate) {
      toast.error("An event with the same name already exists.");
      return;
    }

    // const duplicateName=(name: string): boolean =>

    let isConfirmed = true; // Assume user confirms by default for create
    if (submitState === "edit") {
      isConfirmed = window.confirm(
        "Are you sure you want to update this event?"
      );
    }

    if (!isConfirmed) {
      return; // Early return if the user cancels the action
    }

    // Check if required fields are filled
    // Validation check for each field
    if (!name) {
      toast.error("Please enter a name.");
      return;
    }
    if (!startDate) {
      toast.error("Please enter a start date.");
      return;
    }
    if (!endDate) {
      toast.error("Please enter an end date.");
      return;
    }
    // if (!Sport) {
    //   toast.error("Please specify a sport.");
    //   return;
    // }
    if (!eventDetails) {
      toast.error("Please enter event details.");
      return;
    }

    // const duplicateName = (name: string): boolean => {
    //   return event.some((events: { name: string }) => events.name === name);
    // };

    // // Check for duplicate name
    // if (duplicateName(name)) {
    //   console.error("An item with the same name already exists.");
    //   alert("An item with the same name already exists.");
    //   return;
    // }

    // Format dates to ISO string for proper server-side handling
    const formattedEvent = {
      id, // Assuming 'id' is either set or undefined based on create or edit
      name,
      startDate: new Date(startDate).toISOString(), // Ensure date is in ISO format
      endDate: new Date(endDate).toISOString(),
      eventDetails,
      isExternal,
      isInternal,
      userId, // Assuming this is the ID of the user creating or editing the event
      studentIds: selectedStudents, // Include selected student IDs
      teamIds: selectedTeams, // Include selected team IDs
    };

    console.log("Selected Events on submit:", selectedTeams);
    if (selectedTeams.some((teamIds) => typeof teamIds !== "number")) {
      console.error("Invalid event entries detected:", selectedTeams);
      toast.error("Invalid event data detected.");
      return; // Stop execution to avoid further errors
    }

    console.log("Selected Students on submit:", selectedStudents);
    if (selectedStudents.some((studentId) => typeof studentId !== "number")) {
      console.error("Invalid student entries detected:", selectedStudents);
      toast.error("Invalid student data detected.");
      return; // Stop execution to avoid further errors
    }

    try {
      if (submitState === "edit" && id) {
        // Handle 'edit' state
        const updateResponse = await axios.patch(
          `/api/events/${id}`,
          formattedEvent
        );
        toast.success("Event updated successfully!");
        console.log("Update response:", updateResponse.data);
      } else {
        // Handle 'create' state
        const createResponse = await axios.post("/api/events", formattedEvent);
        toast.success("Event created successfully!");
        console.log("Create response:", createResponse.data);
      }

      allEvents(); // This function should refresh the list of events, assumed to be defined elsewhere
      closeModal(); // Close the modal or form, assumed to be defined elsewhere
    } catch (error) {
      console.error("Error during event creation/editing:", error);
      toast.error("Error processing your request");
    }
  };

  const displayStudents = () => {
    return selectedStudents.map((studentId, index) => {
      const student = studentOptions.find(
        (option) => option.value === studentId
      );
      return student ? (
        <li key={index}>
          {student.label} (ID: {student.value})
        </li>
      ) : null; // Handle the case where student might not be found
    });
  };

  const handleTeamChange = (selectedOptions) => {
    setSelectedTeams(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  const displayTeamDetails = () => {
    return selectedTeams.map((teamId) => {
      const team = teamDetails.find((t) => t.value === teamId);
      if (!team) return null;

      return (
        <div
          key={teamId}
          style={{
            marginBottom: "20px",
            border: "1px solid #000",
            padding: "10px",
          }}
        >
          <div
            style={{
              marginBottom: "10px",
              border: "1px solid #000",
              padding: "10px",
            }}
          >
            <h3>
              Team Name:{" "}
              <span style={{ fontWeight: "normal" }}>{team.label}</span>
            </h3>
          </div>
          <div
            style={{
              marginBottom: "10px",
              border: "1px solid #000",
              padding: "10px",
            }}
          >
            <h3>
              Team Sport:{" "}
              <span style={{ fontWeight: "normal" }}>{team.sport}</span>
            </h3>
          </div>

          <div
            style={{
              marginBottom: "10px",
              border: "1px solid #000",
              padding: "10px",
            }}
          >
            <h3>Team Members:</h3>
            <ul style={{ paddingLeft: "20px" }}>
              {team.students.map((student) => (
                <li key={student.id} style={{ marginBottom: "5px" }}>
                  {student.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    });
  };

  return (
    <CreateContentStyled onSubmit={handleSubmit} className="mx-auto max-w-lg">
      {" "}
      <div className="mb-8">
        {" "}
        <h1 className="text-4xl font-bold mb-4">Event Details</h1>{" "}
      </div>
      {submitState === "edit" && (
        <>
          <h2 style={{ fontSize: "1.2em", marginBottom: "0.5em" }}>
            Tagged Teams
          </h2>
        </>
      )}
      {submitState === "create" && (
        <>
          <h2 style={{ fontSize: "1.2em", marginBottom: "0.5em" }}>
            Tag a Team to Event
          </h2>
        </>
      )}
      <Select
        options={teamDetails}
        isMulti
        getOptionLabel={(option) => `${option.label} - ${option.sport}`}
        value={teamDetails.filter((option) =>
          selectedTeams.includes(option.value)
        )}
        onChange={handleTeamChange}
        className="my-custom-select"
        classNamePrefix="select"
      />
      {/* Displaying the selected teams with their details */}
      {displayTeamDetails()}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="input-control my-custom-input-control bg-dark-500">
          {/* 
className="my-custom-select text-black bg-dark-700"
            classNamePrefix="my-custom-select" */}
        </div>
        <div className="input-control">
          <label htmlFor="name">
            Name {!name && <span className="required-asterisk">*</span>}
          </label>
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
            <label htmlFor="startDate">
              Start Date{" "}
              {!startDate && <span className="required-asterisk">*</span>}
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
            <label htmlFor="endDate">
              End Date{" "}
              {!endDate && <span className="required-asterisk">*</span>}
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
        {/* <div className="input-control">
          <label htmlFor="Sport" className="block">
            Sport
          </label>
          <select
            id="Sport"
            name="Sport"
            value={Sport}
            onChange={handleChange}
            className="border border-black rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full text-gray-900"
          >
            <option value="">Select Sport</option>
            <optgroup label="Basketball">
              <option value="basketball men">Basketball Men</option>
              <option value="basketball women 3x3">
                Basketball Women (3X3)
              </option>
              <option value="basketball women 5x5">
                Basketball Women (5X5)
              </option>
            </optgroup>
            <optgroup label="Football">
              <option value="football men">Football Men</option>
              <option value="football women">Football Women</option>
            </optgroup>
            <optgroup label="Volleyball">
              <option value="volleyball men">Volleyball Men</option>
              <option value="volleyball women">Volleyball Women</option>
            </optgroup>
            <optgroup label="Badminton">
              <option value="badminton women">Badminton Women</option>
              <option value="badminton men">Badminton Men</option>
            </optgroup>
            <optgroup label="ESport">
              <option value="valorant">Valorant</option>
              <option value="dota">DoTA</option>
              <option value="mobile legends">Mobile Legends</option>
            </optgroup>
            <option value="table tennis">Table Tennis</option>
            <option value="taekwondo">Taekwondo</option>
            <option value="chess">Chess</option>
            <option value="swimming">Swimming Mixed</option>
            <option value="strength and conditioning">
              Strength and Conditioning
            </option>
            <option value="special projects">Special Projects Mixed</option>
          </select>
        </div> */}
        <div className="input-control">
          <label htmlFor="eventDetails">
            Event Details{" "}
            {!eventDetails && <span className="required-asterisk">*</span>}
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
            className={`flex items-center cursor-pointer ${
              !isExternal && !isInternal ? "warning-border" : ""
            }`}
          >
            <span className="mr-2 text-white">
              Is External{" "}
              {!isExternal && !isInternal && (
                <span className="required-asterisk">*</span>
              )}
            </span>
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
              <span
                className={`block w-5 h-5 rounded-full bg-white shadow-md transform duration-300 ${
                  isExternal ? "translate-x-5" : ""
                }`}
              />
            </span>
          </label>

          <label
            htmlFor="isInternal"
            className={`flex items-center cursor-pointer ${
              !isExternal && !isInternal ? "warning-border" : ""
            }`}
          >
            <span className="mr-2 text-white">
              Is Internal{" "}
              {!isExternal && !isInternal && (
                <span className="required-asterisk">*</span>
              )}
            </span>
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

  .required-asterisk {
    color: red;
  }

  // .warning-border {
  //   border: 2px solid red;
  // }

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
function handleAxiosError(error: unknown) {
  throw new Error("Function not implemented.");
}
