import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import toast from "react-hot-toast";
import { useGlobalState } from "@/app/context/globalProvider";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "react-datepicker/dist/react-datepicker.css";

// Props definition
interface Props {
  team?: any; // team: object or null
  submitState: "create" | "edit"; // 'create' or 'edit'
}

function CreateTeam(props: Props) {
  const { team, submitState } = props;
  const [teamName, setTeamName] = useState(team ? team.teamName : "");
  const [sportId, setSportId] = useState<number | null>(
    team ? team.sportId : null
  );
  const [sportsOptions, setSportsOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [studentOptions, setStudentOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [year, setYear] = useState<number | null>(
    team ? new Date(team.year).getFullYear() : new Date().getFullYear()
  );

  const [events, setEvents] = useState<{ value: number; label: string }[]>([]);
  const [selectedEventIds, setSelectedEventIds] = useState<number[]>([]);
  const [eventOptions, setEventOptions] = useState<
    { value: number; label: string }[]
  >([]);

  const [teamsList, setTeamsList] = useState([]);
  const [id, setId] = useState(team ? team.id : "");
  const { fetchTeams, closeModal } = useGlobalState(); // Assume similar functions exist in your global context

  // Assuming you fetch events somewhere in your component or get them passed down as props:
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events");
        const options = response.data.map((event: { id: any; name: any }) => ({
          value: event.id,
          label: event.name,
        }));
        setEventOptions(options);
        if (submitState === "edit" && team && team.events) {
          setSelectedEventIds(team.events.map((e: any) => e.id));
        }
      } catch (error) {
        toast.error("Failed to load events");
      }
    };

    fetchEvents();
  }, [team, submitState]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get("/api/teams"); // Adjust the URL as needed
        setTeamsList(response.data); // Assuming the data is directly an array of teams
      } catch (error) {
        console.error("Failed to fetch teams:", error);
        toast.error("Failed to load teams data.");
      }
    };

    fetchTeam();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("/api/studentProfiling");
        const options = response.data.map((student: any) => ({
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

  // Fetch sports from API
  useEffect(() => {
    fetchSports();
  }, []);

  // Function to fetch sports
  const fetchSports = async () => {
    try {
      const response = await axios.get("/api/sport");
      const sportsData = response.data.map((sport) => ({
        value: sport.id,
        label: sport.name,
      }));
      console.error("Failed to fetch sports:", sportsData);
      setSportsOptions(sportsData);
    } catch (error) {
      console.error("Failed to fetch sports:", error);
      toast.error("Failed to load sports data.");
    }
  };

  // Function to add a new sport
  const addNewSport = async () => {
    const sportName = prompt("Enter the name of the new sport:");
    if (!sportName) return;
    try {
      const response = await axios.post("/api/sport", { name: sportName });
      if (response.data) {
        const newSport = {
          value: response.data.id, // Store as number directly
          label: response.data.name,
        };
        setSportsOptions((prev) => [...prev, newSport]);
        setSportId(response.data.id); // As a number
        toast.success("Sport added successfully!");
      }
    } catch (error) {
      console.error("Failed to add sport:", error);
      toast.error("Failed to add sport.");
    }
  };

  const removeSport = async () => {
    const sportToRemove = sportId;
    if (!sportToRemove) {
      toast.error("No sport selected to remove.");
      return;
    }
    try {
      await axios.delete(`/api/sport/${sportToRemove}`);
      setSportsOptions(
        (prev) => prev.filter((option) => option.value !== sportToRemove) // Ensure numeric comparison
      );
      setSportId(null);
      toast.success("Sport removed successfully!");
    } catch (error) {
      console.error("Failed to remove sport:", error);
      toast.error("Failed to remove sport.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "teamName") {
      setTeamName(value);
    }
  };

  useEffect(() => {
    if (submitState === "edit" && team) {
      // Set form fields with existing team details when in 'edit' mode
      setTeamName(team.teamName);
      //   setSport(team.sport);
      setSelectedStudents(
        team.students.map((student: { id: number }) => student.id)
      );
    }
  }, [submitState, team]);

  useEffect(() => {
    const fetchTeamDetails = async () => {
      if (submitState === "edit" && team) {
        setTeamName(team.teamName);
        // setSport(team.sport);
        setSelectedStudents(team.students.map((s: { id: number }) => s.id));
      } else if (submitState === "create") {
        try {
          const response = await axios.get("/api/teams?teamId=123"); // Fetch more detailed data if necessary
          console.log("Fetched team data:", response.data);
          if (response.data) {
            console.log("Fetched team data:", response.data);
            // Set state with fetched data
          }
        } catch (error) {
          console.error("Error fetching team details:", error);
          toast.error("Failed to fetch team details");
        }
      }
    };

    fetchTeamDetails();
  }, [team, submitState]);

  useEffect(() => {
    console.log("Updated studentOptions state:", studentOptions);
  }, [studentOptions]);

  useEffect(() => {
    if (submitState === "edit" && team) {
      setTeamName(team.teamName);
      //   setSport(team.sport);

      if (team.students && team.students.length > 0) {
        setSelectedStudents(team.students.map((student: any) => student.id));
      }
    }
  }, [submitState, team]); // React to changes in 'submitState' and 'team'

  useEffect(() => {
    // Log to console current selected students to monitor changes
    console.log("Current selectedStudents:", selectedStudents);
  }, [selectedStudents]);

  const handleYearChange = (date: Date | [Date, Date] | null) => {
    if (date instanceof Date) {
      setYear(date.getFullYear()); // Correctly storing the year as an integer
    }
  };
  // Formatting the year as ISO string

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formattedYear = year ? `${year}-01-01T00:00:00.000Z` : null;

    // Ensure that we are using sportId which should be a number or null
    const formattedTeam = {
      id,
      teamName,
      sportId,
      year: formattedYear,
      studentIds: selectedStudents,
      eventIds: selectedEventIds,
    };

    console.log("Selected Events on submit:", selectedEventIds);
    if (selectedEventIds.some((eventId) => typeof eventId !== "number")) {
      console.error("Invalid event entries detected:", selectedEventIds);
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
        const updateResponse = await axios.patch(
          `/api/teams/${team.id}`,
          formattedTeam
        );
        toast.success("Team updated successfully!");
        console.log("Update response:", updateResponse.data);
      } else {
        const createResponse = await axios.post("/api/teams", formattedTeam);
        toast.success("Team created successfully!");
        console.log("Create response:", createResponse.data);
      }

      fetchTeams(); // Refresh the list of teams
      closeModal(); // Close the modal or form
    } catch (error) {
      console.error("Error during team creation/editing:", error);
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

  const displayEvents = () => {
    return selectedEventIds.map((eventId, index) => {
      const event = eventOptions.find((e) => e.value === eventId);
      return event ? (
        <li key={index}>
          {event.label} (ID: {event.value})
        </li>
      ) : null; // Handle the case where an event might not be found
    });
  };

  return (
    <CreateTeamStyled onSubmit={handleSubmit}>
      <h1>{submitState === "edit" ? "Edit Team" : "Create Team"}</h1>
      <div>
        {submitState === "edit" && (
          <>
            <h2 style={{ fontSize: "1.2em", marginBottom: "0.5em" }}>
              Events Joined
            </h2>
          </>
        )}
        {submitState === "create" && (
          <>
            <h2 style={{ fontSize: "1.2em", marginBottom: "0.5em" }}>
              Tag an Event to Student
            </h2>
          </>
        )}
        <Select
          options={eventOptions}
          isMulti
          value={eventOptions.filter((option) =>
            selectedEventIds.includes(option.value)
          )}
          onChange={(options) =>
            setSelectedEventIds(
              options ? options.map((option) => option.value) : []
            )
          }
          className="my-custom-select text-black bg-dark-700"
          classNamePrefix="my-custom-select"
        />
        <label htmlFor="teamName">Team Name:</label>
        <input
          type="text"
          id="teamName"
          name="teamName"
          value={teamName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="year">Year:</label>
        <DatePicker
          selected={year ? new Date(`${year}-01-01`) : new Date()}
          onChange={handleYearChange}
          showYearPicker
          dateFormat="yyyy"
          className="date-picker"
        />
      </div>
      <div>
        <label htmlFor="sport">Sport:</label>
        <Select
          id="sport"
          name="sport"
          value={
            sportsOptions.find((option) => option.value === sportId) || null
          }
          onChange={(option) => {
            if (!option) {
              setSportId(null);
            } else if (option.value === "add_new") {
              addNewSport();
            } else if (option.value === "remove_sport") {
              removeSport();
            } else {
              // Ensuring value is handled as a number for regular sport options
              const newSportId = parseInt(option.value, 10);
              if (!isNaN(newSportId)) {
                setSportId(newSportId);
              }
            }
          }}
          options={[
            ...sportsOptions,
            { value: "add_new", label: "+ Add New Sport" },
            { value: "remove_sport", label: "- Remove Sport" },
          ]}
          required
          className="border border-black rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full text-gray-900"
          classNamePrefix="my-custom-select"
        />
      </div>

      {/* <div>
        <label htmlFor="sport">Sport:</label>
        <select
          id="sport"
          name="sport"
          value={sport}
          onChange={handleChange}
          required
          className="border border-black rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full text-gray-900"
        >
          <option value="">Select Sport</option>
          <optgroup label="Basketball">
            <option value="basketball men">Basketball Men</option>
            <option value="basketball women 3x3">Basketball Women (3X3)</option>
            <option value="basketball women 5x5">Basketball Women (5X5)</option>
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
      <div>
        <label>Student-athlete members:</label>
        {submitState === "edit" && (
          <>
            <h2 style={{ fontSize: "1.2em", marginBottom: "0.5em" }}></h2>
          </>
        )}
        {submitState === "create" && (
          <>
            <h2 style={{ fontSize: "1.2em", marginBottom: "0.5em" }}></h2>
          </>
        )}
        <Select
          options={studentOptions}
          isMulti
          value={studentOptions.filter((option) =>
            selectedStudents.includes(option.value)
          )}
          onChange={(options) =>
            setSelectedStudents(
              options ? options.map((option) => option.value) : []
            )
          }
          className="my-custom-select text-black bg-dark-700"
          classNamePrefix="my-custom-select"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
      >
        {submitState === "edit" ? "Update Team" : "Create Team"}
      </button>
    </CreateTeamStyled>
  );
}

const CreateTeamStyled = styled.form`
  color: ${(props) => props.theme.colorGrey1};
  font-size: clamp(0.8rem, 2.5vw, 1rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

  h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: bold;
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme.colorGrey3};
    font-size: clamp(0.9rem, 3vw, 1.2rem);
  }

  input[type="text"],
  select {
    width: 100%;
    padding: 0.8rem;
    margin-bottom: 0.5rem;
    background-color: ${(props) => props.theme.inputBackground};
    border: 2px solid ${(props) => props.theme.borderColor};
    border-radius: 10px;
    color: ${(props) => props.theme.textColor};

    &:focus {
      border-color: ${(props) => props.theme.focusBorderColor};
      outline: none;
    }
  }

  .my-custom-select {
    .my-custom-select__control {
      background-color: ${(props) => props.theme.inputBackground};
      color: ${(props) => props.theme.textColor};
      border: 2px solid ${(props) => props.theme.borderColor};
      &:hover {
        border-color: ${(props) => props.theme.focusBorderColor};
      }
    }

    .my-custom-select__menu {
      background-color: ${(props) => props.theme.dropdownBackground};
    }

    .my-custom-select__option--is-focused {
      background-color: ${(props) => props.theme.dropdownHoverBackground};
    }

    .my-custom-select__option--is-selected {
      background-color: ${(props) => props.theme.dropdownSelectedBackground};
    }
  }

  button {
    padding: 0.8rem 1.6rem;
    background-color: ${(props) => props.theme.buttonBackground};
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${(props) => props.theme.buttonHoverBackground};
    }
  }
`;

export default CreateTeam;
