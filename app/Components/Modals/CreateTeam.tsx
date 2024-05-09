import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import toast from "react-hot-toast";
import { useGlobalState } from "@/app/context/globalProvider";
import Select from "react-select";

// Props definition
interface Props {
  team?: any; // team: object or null
  submitState: "create" | "edit"; // 'create' or 'edit'
}

function CreateTeam(props: Props) {
  const { team, submitState } = props;
  const [teamName, setTeamName] = useState(team ? team.teamName : "");
  const [sport, setSport] = useState(team ? team.sport : "");
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [studentOptions, setStudentOptions] = useState<
    { value: number; label: string }[]
  >([]);

  const [teamsList, setTeamsList] = useState([]);
  const [id, setId] = useState(team ? team.id : "");
  const { fetchTeams, closeModal } = useGlobalState(); // Assume similar functions exist in your global context

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
    if (submitState === "edit" && team && team.students) {
      setSelectedStudents(team.students.map((student: any) => student.id));
    }
  }, [team, submitState]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    switch (name) {
      case "teamName":
        setTeamName(value);
        break;
      case "sport":
        setSport(value);
        break;
    }
  };

  useEffect(() => {
    if (submitState === "edit" && team) {
      // Set form fields with existing team details when in 'edit' mode
      setTeamName(team.teamName);
      setSport(team.sport);
      setSelectedStudents(
        team.students.map((student: { id: number }) => student.id)
      );
    }
  }, [submitState, team]);

  useEffect(() => {
    const fetchTeamDetails = async () => {
      if (submitState === "edit" && team) {
        setTeamName(team.teamName);
        setSport(team.sport);
        setSelectedStudents(team.students.map((s: { id: number }) => s.id));
      } else if (submitState === "create") {
        try {
          const response = await axios.get(`/api/teams/${team.id}`); // Fetch more detailed data if necessary
          console.log("Fetched team data:", response.data);
          if (response.data) {
            console.log("Fetched tean data:", response.data);
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
      setSport(team.sport);

      if (team.students && team.students.length > 0) {
        setSelectedStudents(team.students.map((student: any) => student.id));
      }
    }
  }, [submitState, team]); // React to changes in 'submitState' and 'team'

  useEffect(() => {
    // Log to console current selected students to monitor changes
    console.log("Current selectedStudents:", selectedStudents);
  }, [selectedStudents]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formattedTeam = {
      id,
      teamName,
      sport,
      studentIds: selectedStudents,
    };

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

  return (
    <CreateTeamStyled onSubmit={handleSubmit}>
      <h1>{submitState === "edit" ? "Edit Team" : "Create Team"}</h1>
      <div>
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
      </div>
      <div>
        <label>Students:</label>
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
      <button type="submit">
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
