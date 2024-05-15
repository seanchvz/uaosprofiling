import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import toast from "react-hot-toast";
import { useGlobalState } from "@/app/context/globalProvider";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

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

  const [selectedCoaches, setSelectedCoaches] = useState<number[]>([]);
  const [selectedCoachIds, setSelectedCoachIds] = useState<number[]>([]);
  const [coachOptions, setCoachOptions] = useState<
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

  const updatedAt = team ? team.updatedAt : null;
  // Format the date
  const formattedUpdatedAt = updatedAt
    ? format(new Date(updatedAt), "PPpp")
    : "";

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

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await axios.get("/api/coachProfiling");
        const options = response.data.map((coach: any) => ({
          value: coach.id,
          label: `${coach.firstName} ${coach.lastName}`,
        }));
        setCoachOptions(options);
      } catch (error) {
        console.error("Failed to fetch coaches:", error);
        toast.error("Failed to load coach data.");
      }
    };

    fetchCoaches();
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

  const updateSportName = async () => {
    const sportToUpdate = sportId;
    if (!sportToUpdate) {
      toast.error("No sport selected to update.");
      return;
    }
    const newName = prompt(
      `Enter the new name for the sport:`,
      sportsOptions.find((option) => option.value === sportToUpdate)?.label
    );
    if (!newName) return; // User cancelled or didn't input a name

    try {
      await axios.patch(`/api/sport/${sportToUpdate}`, { name: newName });
      // Update the local state to reflect the change
      setSportsOptions((prev) =>
        prev.map((option) => {
          if (option.value === sportToUpdate) {
            return { ...option, label: newName };
          }
          return option;
        })
      );
      toast.success("Sport name updated successfully!");
    } catch (error) {
      console.error("Failed to update sport:", error);
      toast.error("Failed to update sport name.");
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
      setSelectedCoaches(team.coaches.map((coach: { id: number }) => coach.id));
    }
  }, [submitState, team]);

  useEffect(() => {
    const fetchTeamDetails = async () => {
      if (submitState === "edit" && team) {
        setTeamName(team.teamName);
        // setSport(team.sport);
        setSelectedStudents(team.students.map((s: { id: number }) => s.id));
        setSelectedCoaches(team.coaches.map((s: { id: number }) => s.id));
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
      if (team.coaches && team.coaches.length > 0) {
        setSelectedCoaches(team.coaches.map((coach: any) => coach.id));
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
  const checkDuplicateTeam = (name: string, year: number | null) => {
    return teamsList.some((team) => {
      // Parse the team year only if it's not null
      const teamYear = team.year ? new Date(team.year).getFullYear() : null;
      return team.teamName === name && teamYear === year;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (submitState === "create" && checkDuplicateTeam(teamName, year)) {
    //   toast.error("A team with the same name and year already exists.");
    //   return;
    // }

    const formattedYear = year ? `${year}-01-01T00:00:00.000Z` : null;

    // Ensure that we are using sportId which should be a number or null
    const formattedTeam = {
      id,
      teamName,
      sportId,
      year: formattedYear,
      studentIds: selectedStudents,
      eventIds: selectedEventIds,
      coachIds: selectedCoaches,
      updatedAt: new Date().toISOString(),
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

    console.log("Selected Students on submit:", selectedCoaches);
    if (selectedCoaches.some((coachId) => typeof coachId !== "number")) {
      console.error("Invalid student entries detected:", selectedCoaches);
      toast.error("Invalid student data detected.");
      return; // Stop execution to avoid further errors
    }

    try {
      if (submitState === "edit" && id) {
        const updateResponse = await axios.patch(
          `/api/teams/${team.id}`,
          formattedTeam
        );

        // Display last modification date
        const formattedUpdatedAt = team.updatedAt
          ? format(new Date(team.updatedAt), "PPpp")
          : "";
        if (formattedUpdatedAt) {
          toast.success(
            `Team ${
              submitState === "edit" ? "updated" : "created"
            } successfully. Last modified on ${formattedUpdatedAt}`
          );
        }

        fetchTeams();

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

  const displayCoaches = () => {
    return selectedCoaches.map((coachId, index) => {
      const coach = coachOptions.find((option) => option.value === coachId);
      return coach ? (
        <li key={index}>
          {coach.label} (ID: {coach.value})
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
      <h1>{submitState === "edit" ? "View Team" : "Create Team"}</h1>

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
              Add joined events to team
            </h2>
          </>
        )}
        {formattedUpdatedAt && (
          <div className="text-sm text-gray-500 mt-1">
            <p>Last modified on {formattedUpdatedAt}</p>
          </div>
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
            } else if (option.value === "update_sport") {
              updateSportName();
            } else {
              const newSportId = parseInt(option.value, 10);
              if (!isNaN(newSportId)) {
                setSportId(newSportId);
              }
            }
          }}
          options={[
            { value: "add_new", label: "+ Add New Sport" },
            { value: "remove_sport", label: "- Remove Selected Sport" },
            { value: "update_sport", label: "* Update Selected Sport" },
            ...sportsOptions.sort((a, b) => a.label.localeCompare(b.label)),
          ]}
          required
          className="border-2 border-blue-500 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full text-gray-900 shadow-lg"
          classNamePrefix="my-custom-select"
          styles={{
            option: (provided, state) => ({
              ...provided,
              color: state.isSelected ? "white" : "black",
              backgroundColor: state.isSelected ? "blue" : "white",
              "&:hover": {
                backgroundColor: "lightgray",
              },
            }),
          }}
        />
      </div>

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
      <div>
        <label>Coach members:</label>
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
          options={coachOptions}
          isMulti
          value={coachOptions.filter((option) =>
            selectedCoaches.includes(option.value)
          )}
          onChange={(options) =>
            setSelectedCoaches(
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
