import React, { useEffect, useState, FunctionComponent } from "react";
import styled from "styled-components"; // Import styled-components// Assuming Button component exists
import { add } from "@/app/utils/Icons"; // Assuming Icons are imported
import Button from "../Button/Button";
import axios from "axios";
import toast from "react-hot-toast";
import { useGlobalState } from "@/app/context/globalProvider";
import StudentProfileContent from "../StudentContent/StudentContent";
import Select from "react-select";

interface Props {
  studentProfile?: any;
  submitState: "create" | "edit";
}

// Create profile function component
function CreateProfile(props: Props) {
  const { studentProfile, submitState } = props;
  const [firstName, setfirstName] = useState(
    studentProfile ? studentProfile.firstName : ""
  );
  const [middleName, setmiddleName] = useState(
    studentProfile ? studentProfile.middleName : ""
  );
  const [lastName, setlastName] = useState(
    studentProfile ? studentProfile.lastName : ""
  );
  const [contactNumber, setContactNumber] = useState(
    studentProfile ? studentProfile.contactNumber : ""
  );
  const [landLineNumber, setLandLineNumber] = useState(
    studentProfile ? studentProfile.landlineNumber : ""
  );
  const [birthDate, setBirthdate] = useState(
    studentProfile ? studentProfile.Birthdate : ""
  );
  const [nationality, setNationality] = useState(
    studentProfile ? studentProfile.Nationality : ""
  );
  const [weight, setWeight] = useState(
    studentProfile ? studentProfile.Weight : ""
  );
  const [height, setHeight] = useState(
    studentProfile ? studentProfile.Height : ""
  );

  const [sportId, setSportId] = useState<number | null>(
    studentProfile ? studentProfile.sportId : null
  );
  const [sportsOptions, setSportsOptions] = useState<
    { value: number; label: string }[]
  >([]);

  const [bloodType, setbloodType] = useState(
    studentProfile ? studentProfile.bloodType : ""
  );
  const [academicYear, setAcademicYear] = useState(
    studentProfile ? studentProfile.AcademicYear : ""
  );
  const [yrStartedPlaying, setyrStartedPlaying] = useState(
    studentProfile ? studentProfile.yrStartedPlaying : ""
  );
  const [mothersName, setMothersName] = useState(
    studentProfile ? studentProfile.MothersName : ""
  );
  const [fathersName, setFathersName] = useState(
    studentProfile ? studentProfile.FathersName : ""
  );
  const [guardiansName, setGuardiansName] = useState(
    studentProfile ? studentProfile.GuardiansName : ""
  );
  const [courseAndYear, setCourseAndYear] = useState(
    studentProfile ? studentProfile.CourseAndYear : ""
  );
  const [emergencyContactNumber, setEmergencyContactNumber] = useState(
    studentProfile ? studentProfile.EmergencyContactNumber : ""
  );
  const [emergencyContactPerson, setEmergencyContactPerson] = useState(
    studentProfile ? studentProfile.EmergencyContactPerson : ""
  );
  const [email, setEmail] = useState(
    studentProfile ? studentProfile.Email : ""
  );
  const [homeAddress, setHomeAddress] = useState(
    studentProfile ? studentProfile.HomeAddress : ""
  );
  const [remarks, setRemarks] = useState(
    studentProfile ? studentProfile.Remarks : ""
  );
  const [QPI, setQPI] = useState(studentProfile ? studentProfile.QPI : "");

  const [hasDeficiency, setHasDeficiency] = useState(false);
  const [isMale, setIsMale] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const [statusIsActive, setStatusIsActive] = useState(false);
  const [statusIsInactive, setStatusIsInactive] = useState(false);
  const [userId, setUserId] = useState(
    studentProfile ? studentProfile.UserId : ""
  );
  const [id, setId] = useState(studentProfile ? studentProfile.id : "");
  const { fetchAllStudentProfile, closeModal } = useGlobalState();

  const [events, setEvents] = useState<{ value: number; label: string }[]>([]);
  const [selectedEventIds, setSelectedEventIds] = useState<number[]>([]);
  const [eventOptions, setEventOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [teamOptions, setTeamOptions] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [teamDetails, setTeamDetails] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("/api/teams");
        const formattedTeams = response.data.map((team) => ({
          value: team.id,
          label: `${team.teamName} - ${
            team.sport ? team.sport.name : "No Sport"
          }`,
          sport: team.sport ? team.sport.name : "No Sport",
          year: team.year || "Unknown Year", // Directly using the year if it's just a number
          events: team.events.map((e) => ({
            id: e.id,
            name: e.name,
          })),
        }));
        setTeamOptions(formattedTeams);
        setTeamDetails(formattedTeams);
        if (submitState === "edit" && studentProfile && studentProfile.teams) {
          setSelectedTeams(studentProfile.teams.map((t) => t.id));
        }
      } catch (error) {
        toast.error("Failed to load teams");
      }
    };

    fetchTeams();
  }, [submitState, studentProfile]); // Ensure dependencies are correct for your use casensure dependencies are correct for your use case

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios.get("/api/studentProfiling");
        if (Array.isArray(data)) {
          setStudents(data); // Set only if it's an array
        } else {
          console.error("Data fetched is not an array:", data);
          setStudents([]); // Set as empty array if data is not correct
        }
      } catch (error) {
        console.error("Failed to load student profiles:", error);
        setStudents([]); // Ensure it's still an array even on error
        toast.error("Failed to load student profiles.");
      }
    };

    fetchStudents();
  }, []);
  useEffect(() => {
    const fetchStudentDetails = async () => {
      if (submitState === "edit" && studentProfile) {
        // Fetch teams if not already loaded
        if (teamOptions.length === 0) {
          const response = await axios.get("/api/teams");
          const teamsData = response.data.map(
            (team: {
              year: any;
              id: any;
              teamName: any;
              sport: { name: any };
            }) => ({
              value: team.id,
              label: `${team.teamName} - ${
                team.sport ? team.sport.name : "No Sport"
              }`,
              year: team.year
                ? new Date(team.year).getFullYear()
                : "Unknown Year", // Formatting the year
            })
          );
          setTeamOptions(teamsData);
        }
      }
    };

    fetchStudentDetails();
  }, [studentProfile, submitState, teamOptions]);

  //qpi checker
  const handleGradeChange = (e: { target: { value: any } }) => {
    const QPI = e.target.value;
    setQPI(QPI); // Update the QPI state
    if (parseFloat(QPI) < 2) {
      setHasDeficiency(true);
    } else {
      setHasDeficiency(false);
    }
  };

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
        if (submitState === "edit" && studentProfile && studentProfile.events) {
          setSelectedEventIds(studentProfile.events.map((e: any) => e.id));
        }
      } catch (error) {
        toast.error("Failed to load events");
      }
    };

    fetchEvents();
  }, [studentProfile, submitState]);

  useEffect(() => {
    const fetchSportsData = async () => {
      try {
        const response = await axios.get("/api/sport"); // Replace with your actual endpoint
        const sportsData = response.data.map(
          (sport: { id: any; name: any }) => ({
            value: sport.id,
            label: sport.name,
          })
        );
        setSportsOptions(sportsData);
      } catch (error) {
        console.error("Failed to fetch sports data:", error);
        toast.error("Failed to load sports options");
      }
    };

    fetchSportsData();
  }, []); // Dependency array is empty to only run once on component mount

  useEffect(() => {
    fetchSports();
  }, []);

  // Function to fetch sports
  const fetchSports = async () => {
    try {
      const response = await axios.get("/api/sport");
      const sportsData = response.data.map((sport: { id: any; name: any }) => ({
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

  // Handle change function for form fields
  const handleChange = (e: {
    target: { name: any; value: any; type: any; checked: any };
  }) => {
    const { name, value, type, checked } = e.target;

    switch (name) {
      case "isMale":
        setIsMale(checked);
        if (checked) setIsFemale(false); // Uncheck female if male is checked
        break;
      case "isFemale":
        setIsFemale(checked);
        if (checked) setIsMale(false); // Uncheck male if female is checked
        break;
      case "statusIsActive":
        setStatusIsActive(checked);
        if (checked) setStatusIsInactive(false);
        break;
      case "statusIsInactive":
        setStatusIsInactive(checked);
        if (checked) setStatusIsActive(false);
        break;
      case "firstName":
        setfirstName(value);
        break;
      case "middleName":
        setmiddleName(value);
        break;
      case "lastName":
        setlastName(value);
        break;
      case "contactNumber":
        setContactNumber(value);
        break;
      case "landLineNumber":
        setLandLineNumber(value);
        break;
      case "birthDate":
        setBirthdate(value);
        break;
      case "nationality":
        setNationality(value);
        break;
      case "weight":
        setWeight(value);
        break;
      case "height":
        setHeight(value);
        break;
      case "bloodType":
        setbloodType(value);
        break;
      case "academicYear":
        setAcademicYear(value);
        break;
      case "yrStartedPlaying":
        setyrStartedPlaying(value);
        break;
      case "mothersName":
        setMothersName(value);
        break;
      case "fathersName":
        setFathersName(value);
        break;
      case "guardiansName":
        setGuardiansName(value);
        break;
      case "courseAndYear":
        setCourseAndYear(value);
        break;
      case "emergencyContactNumber":
        setEmergencyContactNumber(value);
        break;
      case "emergencyContactPerson":
        setEmergencyContactPerson(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "homeAddress":
        setHomeAddress(value);
        break;
      case "QPI":
        setQPI(value);
        break;
      case "remarks":
        setRemarks(value);
        break;
      case "userId":
        setUserId(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (submitState === "edit" && studentProfile) {
      setfirstName(studentProfile.firstName);
      setmiddleName(studentProfile.middleName);
      setlastName(studentProfile.lastName);
      setContactNumber(studentProfile.contactNumber);
      setLandLineNumber(studentProfile.landLineNumber);
      const formattedBirthDate = new Date(studentProfile.birthDate)
        .toISOString()
        .split("T")[0];
      setBirthdate(formattedBirthDate);
      setNationality(studentProfile.nationality);
      setWeight(studentProfile.weight);
      setHeight(studentProfile.height);
      // setSport(studentProfile.sport);
      setbloodType(studentProfile.bloodType);
      setAcademicYear(studentProfile.academicYear);
      setIsMale(studentProfile.isMale);
      setIsFemale(studentProfile.isFemale);
      setyrStartedPlaying(studentProfile.yrStartedPlaying);
      setMothersName(studentProfile.mothersName);
      setFathersName(studentProfile.fathersName);
      setGuardiansName(studentProfile.guardiansName);
      setCourseAndYear(studentProfile.courseAndYear);
      setEmergencyContactNumber(studentProfile.emergencyContactNumber);
      setEmergencyContactPerson(studentProfile.emergencyContactPerson);
      setEmail(studentProfile.email);
      setHomeAddress(studentProfile.homeAddress);
      setQPI(studentProfile.QPI);
      setRemarks(studentProfile.remarks);
      setStatusIsActive(studentProfile.statusIsActive);
      setStatusIsInactive(studentProfile.statusIsInactive);
      setUserId(studentProfile.userId);
      if (studentProfile.teams && studentProfile.teams.length > 0) {
        setSelectedTeams(studentProfile.teams.map((team: any) => team.id));
      }
    }
  }, [submitState, studentProfile]);
  useEffect(() => {
    const fetchStudentDetails = async () => {
      if (submitState === "edit" && studentProfile) {
        if (teamOptions.length === 0) {
          const response = await axios.get("/api/teams");
          const teamsData = response.data.map(
            (team: {
              year: any;
              id: any;
              teamName: any;
              sport: { name: any };
            }) => ({
              value: team.id,
              label: `${team.teamName} - ${
                team.sport ? team.sport.name : "No Sport"
              }`,
              year: team.year
                ? new Date(team.year).getFullYear()
                : "Unknown Year", // Formatting the year
            })
          );
          setTeamOptions(teamsData);
        }
        setfirstName(studentProfile.firstName);
        setmiddleName(studentProfile.middleName);
        setlastName(studentProfile.lastName);
        setContactNumber(studentProfile.contactNumber);
        setLandLineNumber(studentProfile.landLineNumber);
        const formattedBirthDate = new Date(studentProfile.birthDate)
          .toISOString()
          .split("T")[0];
        setBirthdate(formattedBirthDate);
        setNationality(studentProfile.nationality);
        setWeight(studentProfile.weight);
        setHeight(studentProfile.height);
        // setSport(studentProfile.sport);
        setbloodType(studentProfile.bloodType);
        setAcademicYear(studentProfile.academicYear);
        setIsMale(studentProfile.isMale);
        setIsFemale(studentProfile.isFemale);
        setyrStartedPlaying(studentProfile.yrStartedPlaying);
        setMothersName(studentProfile.mothersName);
        setFathersName(studentProfile.fathersName);
        setGuardiansName(studentProfile.guardiansName);
        setCourseAndYear(studentProfile.courseAndYear);
        setEmergencyContactNumber(studentProfile.emergencyContactNumber);
        setEmergencyContactPerson(studentProfile.emergencyContactPerson);
        setEmail(studentProfile.email);
        setHomeAddress(studentProfile.homeAddress);
        setQPI(studentProfile.QPI);
        setRemarks(studentProfile.remarks);
        setStatusIsActive(studentProfile.statusIsActive);
        setStatusIsInactive(studentProfile.statusIsInactive);
        setUserId(studentProfile.userId);
        // setSelectedStudents(studentProfile.students.map((s: { id: number }) => s.id));
        setSelectedTeams(studentProfile.teams.map((t: { id: number }) => t.id));
      } else if (submitState === "create") {
        try {
          // Assume you need to fetch a default event or some data when creating a new event
          const response = await axios.get(
            "/api/studentProfiling?studentId=123"
          ); // Example API call
          if (response.data) {
            console.log("Fetched student data:", response.data);
            // Set state with fetched data
          }
        } catch (error) {
          console.error("Error fetching student details:", error);
          toast.error("Failed to fetch student details");
        }
      }
    };

    fetchStudentDetails();
  }, [studentProfile, submitState]);

  useEffect(() => {
    if (studentProfile) {
      setHasDeficiency(parseFloat(studentProfile.QPI) < 2);
      // Set other state from the profile
    }
  }, [studentProfile]);

  useEffect(() => {
    console.log("Updated eventOptions state:", eventOptions);
  }, [eventOptions]);

  useEffect(() => {
    // to see if they are selected
    console.log("Current selectedEventIds:", selectedEventIds);
  }, [selectedEventIds]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Construct the full name from the current state
    const fullName = `${firstName} ${middleName} ${lastName}`.toLowerCase();

    // Check for duplicates: Ensure no other student has the same full name unless it's the same student being edited
    const isDuplicate =
      Array.isArray(students) &&
      students.some((studentProfile) => {
        const existingFullName =
          `${studentProfile.firstName} ${studentProfile.middleName} ${studentProfile.lastName}`.toLowerCase();
        return existingFullName === fullName && studentProfile.id !== id;
      });

    if (isDuplicate) {
      toast.error("A student with the same full name already exists.");
      return;
    }

    let isConfirmed = true; // Assume user confirms by default for create
    if (submitState === "edit") {
      isConfirmed = window.confirm(
        "Are you sure you want to update this profile?"
      );
    }

    if (!isConfirmed) {
      return; // Early return if the user cancels the action
    }

    // Validation checks for student profile fields
    if (!firstName) {
      toast.error("Please enter a first name.");
      return;
    }
    if (!lastName) {
      toast.error("Please enter a last name.");
      return;
    }

    // if (!sport) {
    //   toast.error("Please specify a sport.");
    //   return;
    // }

    if (!contactNumber) {
      toast.error("Please enter a contact number.");
      return;
    }
    if (contactNumber.length !== 11 || !/^\d+$/.test(contactNumber)) {
      toast.error("The contact number must be exactly 11 digits.");
      return;
    }
    if (!birthDate) {
      toast.error("Please enter a birth date.");
      return;
    }
    if (!nationality) {
      toast.error("Please enter a nationality.");
      return;
    }

    if (!bloodType) {
      toast.error("Please enter a blood type.");
      return;
    }
    if (weight === undefined) {
      // Assuming weight could be 0, which is valid
      toast.error("Please enter a weight.");
      return;
    }
    if (height === undefined) {
      // Assuming height could be 0, which is valid
      toast.error("Please enter a height.");
      return;
    }

    if (!academicYear) {
      toast.error("Please enter an academic year.");
      return;
    }
    if (isMale === undefined && isFemale === undefined) {
      toast.error("Please select a gender.");
      return;
    }
    if (!yrStartedPlaying) {
      toast.error("Please enter the year started playing.");
      return;
    }
    if (!mothersName) {
      toast.error("Please enter mother's name.");
      return;
    }
    if (!fathersName) {
      toast.error("Please enter father's name.");
      return;
    }

    if (!courseAndYear) {
      toast.error("Please enter course and year.");
      return;
    }
    if (!emergencyContactNumber) {
      toast.error("Please enter an emergency contact number.");
      return;
    }
    if (
      emergencyContactNumber.length !== 11 ||
      !/^\d+$/.test(emergencyContactNumber)
    ) {
      toast.error("The emergency number must be exactly 11 digits.");
      return;
    }
    if (!emergencyContactPerson) {
      toast.error("Please enter an emergency contact person.");
      return;
    }
    if (!email) {
      toast.error("Please enter an email.");
      return;
    }
    if (!homeAddress) {
      toast.error("Please enter a home address.");
      return;
    }
    if (!QPI) {
      toast.error("Please enter student's QPI.");
      return;
    }
    if (statusIsActive === undefined && statusIsInactive === undefined) {
      toast.error("Please select a status.");
      return;
    }

    // if (!selectedEventIds.length) {
    //   toast.error("Please select at least one event.");
    //   return;
    // }

    const studentProfile = {
      firstName,
      middleName,
      lastName,
      contactNumber,
      landLineNumber,
      birthDate,
      nationality,
      weight,
      height,
      sportId,
      bloodType,
      academicYear,
      isMale,
      isFemale,
      yrStartedPlaying,
      mothersName,
      fathersName,
      guardiansName,
      courseAndYear,
      emergencyContactNumber,
      emergencyContactPerson,
      email,
      homeAddress,
      statusIsActive,
      statusIsInactive,
      remarks,
      QPI,
      hasDeficiency,
      userId,
      id,
      teamIds: selectedTeams,
      eventIds: selectedEventIds,
    };

    console.log("Selected Events on submit:", selectedTeams);
    if (selectedTeams.some((teamIds) => typeof teamIds !== "number")) {
      console.error("Invalid event entries detected:", selectedTeams);
      toast.error("Invalid event data detected.");
      return; // Stop execution to avoid further errors
    }

    console.log("Selected Events on submit:", selectedEventIds);
    if (selectedEventIds.some((eventId) => typeof eventId !== "number")) {
      console.error("Invalid event entries detected:", selectedEventIds);
      toast.error("Invalid event data detected.");
      return; // Stop execution to avoid further errors
    }
    //to touch pa lang
    //determine if mag create ng new event or mag update
    if (submitState === "edit") {
      // API call to update the event
      try {
        console.log("Sending PATCH request for student ID:", studentProfile.id);
        console.log("Data being sent:", studentProfile);
        const response = await axios.patch(
          `/api/studentProfiling/${studentProfile.id}/`,
          studentProfile
        );
        console.log("Server response:", response.data);
        toast.success("Profile updated successfully!");
        fetchAllStudentProfile();
      } catch (error) {
        console.error("Failed to update the studentProfile:", error);
        toast.error("Error updating studentProfile");
        handleAxiosError(error);
      }
    } else {
      // API call to create a new event
      try {
        const response = await axios.post(
          "/api/studentProfiling",
          studentProfile
        );
        toast.success("Profile created successfully!");
        fetchAllStudentProfile();
        closeModal();
      } catch (error) {
        console.error("Failed to create the profile:", error);
        toast.error("Error creating studentProfile");
        handleAxiosError(error, "creating");
      }
    }
    // Optionally close the modal after operation
    closeModal();
  };

  function handleAxiosError(error: any, action: string = "updating") {
    console.error(`Failed to ${action} the event:`, error);
    if (error.response && error.response.data) {
      console.error("Server error details:", error.response.data);
      const errorMessage =
        error.response.data.error || "Unexpected server error";
      toast.error(`Error ${action} studentProfile: ${errorMessage}`);
    } else if (error.message) {
      console.error("Network or other error:", error.message);
      toast.error(`Error ${action} studentProfile: ${error.message}`);
    } else {
      toast.error(`Error ${action} studentProfile: Unknown error`);
    }
  }

  interface studentData {
    firstName: string;
    middleName: string;
    lastName: string;
    contactNumber: string;
    landLineNumber: string;
    birthDate: string;
    nationality: string;
    weight?: number;
    height?: number;
    // sport?: string;
    bloodType?: string;
    academicYear: string;
    isMale: boolean;
    isFemale: boolean;
    yrStartedPlaying: string;
    mothersName: string;
    fathersName: string;
    guardiansName: string;
    courseAndYear: string;
    emergencyContactNumber: string;
    emergencyContactPerson: string;
    email: string;
    homeAddress: string;
    statusIsActive: boolean;
    statusIsInactive: boolean;
    remarks?: string;
    QPI: string;
    userId: string;
    id: string;
    // sportId:
  }

  const handleEdit = async (studentProfile: studentData) => {
    if (!studentProfile.id) {
      toast.error("Student ID is missing");
      return;
    }
    try {
      console.log("Sending PATCH request for coach ID:", studentProfile.id);
      console.log("Data being sent:", studentProfile);

      // Destructure the event to separate id from other data
      const { id, ...updateData } = studentProfile;

      const response = await axios.patch(
        `/api/studentProfiling/${id}`,
        updateData
      );

      console.log("Server response:", response.data);
      if (response.data && response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Student updated successfully!");
      }
    } catch (error) {
      handleAxiosError(error);
    }
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
        <TeamCard key={teamId}>
          <Section>
            <Heading>
              Team Name: <Label>{team.label}</Label>
            </Heading>
          </Section>
          <Section>
            <Heading>
              Team Sport: <Label>{team.sport}</Label>
            </Heading>
          </Section>
          <Section>
            <Heading>
              Team Year:{" "}
              <Label>
                {team.year ? new Date(team.year).getFullYear() : "N/A"}
              </Label>
            </Heading>
          </Section>
          <Section>
            <Heading>Events Joined with team:</Heading>
            <ul>
              {team.events.map((event, index) => (
                <ListItem key={event.id}>
                  {index + 1}. {event.name}
                </ListItem>
              ))}
            </ul>
          </Section>
        </TeamCard>
      );
    });
  };

  return (
    <CreatestudentStyled onSubmit={handleSubmit}>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Student Details</h1>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-3 gap-4">
        <div className="input-control">
          <label htmlFor="firstName">
            First Name:{" "}
            {!firstName && <span className="required-asterisk">*</span>}
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            name="firstName"
            onChange={handleChange}
            placeholder="e.g. Juan"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>
        <div className="input-control">
          <label htmlFor="middleName"> Middle Name: </label>
          <input
            type="text"
            id="middleName"
            value={middleName}
            name="middleName"
            onChange={handleChange}
            placeholder="e.g. Dela"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>
        <div className="input-control">
          <label htmlFor="lastName">
            Last Name:{" "}
            {!lastName && <span className="required-asterisk">*</span>}
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            name="lastName"
            onChange={handleChange}
            placeholder="e.g. Cruz"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>
        {submitState === "edit" && (
          <>
            <h2 style={{ fontSize: "1.2em" }}>Teams</h2>
          </>
        )}
        {submitState === "create" && (
          <>
            <h2 style={{ fontSize: "1.2em" }}>Add a Team to Student</h2>
          </>
        )}
        <Select
          options={teamDetails}
          isMulti
          getOptionLabel={(option) => `${option.label} `}
          value={teamDetails.filter((option) =>
            selectedTeams.includes(option.value)
          )}
          onChange={handleTeamChange}
          className="border border-black rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full text-gray-900"
          classNamePrefix="my-custom-select"
        />
        {/* Displaying the selected teams with their details */}

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          <div className="input-control my-custom-input-control bg-dark-500"></div>
        </div> */}

        <div className="input-control">
          {displayTeamDetails()}
          <label htmlFor="sport" className="block">
            Second Sport (Optional)
          </label>
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
            className="border border-black rounded-md p-1 focus:outline-none focus:ring focus:border-blue-300 w-full text-gray-900"
            classNamePrefix="my-custom-select"
          />
        </div>

        <div className="input-control">
          <label htmlFor="contactNumber">
            Contact Number{" "}
            {!contactNumber && <span className="required-asterisk">*</span>}
          </label>
          <input
            type="text"
            id="contactNumber"
            value={contactNumber}
            name="contactNumber"
            onChange={handleChange}
            placeholder="e.g. 09121231234"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>
        <div className="input-control">
          <label htmlFor="contactNumber">Land Line Number </label>
          <input
            type="text"
            id="  landLineNumber"
            value={landLineNumber}
            name="landLineNumber"
            onChange={handleChange}
            placeholder="e.g. 00-000-0000"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>
        <div className="input-control">
          <label htmlFor="birthDate">
            Birth Date{" "}
            {!birthDate && <span className="required-asterisk">*</span>}
          </label>
          <input
            type="date"
            id="birthDate"
            value={birthDate}
            name="birthDate"
            onChange={handleChange}
            placeholder="Enter Birth Date"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <div className="input-control">
          <label htmlFor="nationality">
            Nationality{" "}
            {!nationality && <span className="required-asterisk">*</span>}
          </label>
          <input
            type="text"
            id="nationality"
            value={nationality}
            name="nationality"
            onChange={handleChange}
            placeholder="e.g. Filipino"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>
        <div className="flex">
          <div className="input-control">
            <label htmlFor="weight">
              Weight in KG{" "}
              {!weight && <span className="required-asterisk">*</span>}
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={weight}
              onChange={handleChange}
              placeholder="eg. 45.7"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
            />
          </div>
          <div className="input-control">
            <label htmlFor="height">
              Height in CM{" "}
              {!height && <span className="required-asterisk">*</span>}
            </label>
            <input
              type="number"
              id="height"
              name="height"
              value={height}
              onChange={handleChange}
              placeholder="eg. 156.3"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
            />
          </div>
        </div>

        <div className="input-control">
          <label htmlFor="bloodType">
            Blood Type{" "}
            {!bloodType && <span className="required-asterisk">*</span>}
          </label>
          <input
            type="text"
            id="bloodType"
            value={bloodType}
            name="bloodType"
            onChange={handleChange}
            placeholder="e.g. O+"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <div className="input-control">
          <label htmlFor="academicYear">
            Academic Year{" "}
            {!academicYear && <span className="required-asterisk">*</span>}
          </label>
          <input
            type="text"
            id="academicYear"
            value={academicYear}
            name="academicYear"
            onChange={handleChange}
            placeholder="e.g. 2021-2022"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <div className="input-control">
          <label htmlFor="yrStartedPlaying">
            Year started playing:{" "}
            {!yrStartedPlaying && <span className="required-asterisk">*</span>}
          </label>
          <input
            type="text"
            id="yrStartedPlaying"
            value={yrStartedPlaying}
            name="yrStartedPlaying"
            onChange={handleChange}
            placeholder="e.g. 2021"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>
        <span className="text-white">Sex</span>
        <div className="flex">
          <div className="input-control flex justify-between">
            <label
              htmlFor="isMale"
              className={`flex items-center cursor-pointer ${
                !isMale && !isFemale ? "warning-border" : ""
              }`}
            >
              <span className="mr-10 text-white">
                Male{" "}
                {!isMale && !isFemale && (
                  <span className="required-asterisk">*</span>
                )}
              </span>
              <input
                type="checkbox"
                id="isMale"
                checked={isMale}
                onChange={handleChange}
                name="isMale"
                className="hidden"
              />
              <span
                className={`w-10 h-5 border border-white rounded-full shadow-inner flex items-center transition-colors duration-300 ${
                  isMale ? "bg-blue-500" : ""
                }`}
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-white shadow-md transform duration-300 ${
                    isMale ? "translate-x-5" : ""
                  }`}
                />
              </span>
            </label>
          </div>

          <div className="input-control flex justify-between">
            <label
              htmlFor="isFemale"
              className={`flex items-center cursor-pointer ${
                !isMale && !isFemale ? "warning-border" : ""
              }`}
            >
              <span className="mr-2 text-white">
                Female{" "}
                {!isMale && !isFemale && (
                  <span className="required-asterisk">*</span>
                )}
              </span>
              <input
                type="checkbox"
                id="isFemale"
                checked={isFemale}
                onChange={handleChange}
                name="isFemale"
                className="hidden"
              />
              <span
                className={`w-10 h-5 border border-white rounded-full shadow-inner flex items-center transition-colors duration-300 ${
                  isFemale ? "bg-red-500" : ""
                }`}
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-white shadow-md transform duration-300 ${
                    isFemale ? "translate-x-5" : ""
                  }`}
                />
              </span>
            </label>
          </div>
        </div>
        <div className="input-control">
          <label htmlFor="mothersName">
            Mother's Name{" "}
            {!mothersName && <span className="required-asterisk">*</span>}
          </label>
          <input
            type="text"
            id="mothersName"
            value={mothersName}
            name="mothersName"
            onChange={handleChange}
            placeholder="e.g. Juanita Dela Cruz"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <div className="input-control">
          <label htmlFor="fathersName">
            Father's Name{" "}
            {!fathersName && <span className="required-asterisk">*</span>}
          </label>
          <input
            type="text"
            id="fathersName"
            value={fathersName}
            name="fathersName"
            onChange={handleChange}
            placeholder="e.g. Jose Dela Cruz"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>
        <div className="input-control">
          <label htmlFor="fathersName">Optional* Guardian's Name </label>
          <input
            type="text"
            id="guardiansName"
            value={guardiansName}
            name="guardiansName"
            onChange={handleChange}
            placeholder="e.g. Bella Delos Santos"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>
        <div className="input-control">
          <label htmlFor="courseAndYear">
            Course and Year{" "}
            {!courseAndYear && <span className="required-asterisk">*</span>}
          </label>
          <input
            type="text"
            id="courseAndYear"
            value={courseAndYear}
            name="courseAndYear"
            onChange={handleChange}
            placeholder="e.g. IT3A"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <div className="input-control">
          <label htmlFor="emergencyContactNumber">
            Emergency Contact Number{" "}
            {!emergencyContactNumber && (
              <span className="required-asterisk">*</span>
            )}
          </label>
          <input
            type="text"
            id="emergencyContactNumber"
            value={emergencyContactNumber}
            name="emergencyContactNumber"
            onChange={handleChange}
            placeholder="e.g. 09876543212"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <div className="input-control">
          <label htmlFor="emergencyContactPerson">
            Emergency Contact Person{" "}
            {!emergencyContactPerson && (
              <span className="required-asterisk">*</span>
            )}
          </label>
          <input
            type="text"
            id="emergencyContactPerson"
            value={emergencyContactPerson}
            name="emergencyContactPerson"
            onChange={handleChange}
            placeholder="e.g. Juanita Dela Cruz"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <div className="input-control">
          <label htmlFor="email">
            Email Address{" "}
            {!email && <span className="required-asterisk">*</span>}
          </label>
          <input
            type="text"
            id="email"
            value={email}
            name="email"
            onChange={handleChange}
            placeholder="juan@gmail.com"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>
        <div className="input-control">
          <label htmlFor="homeAddress">
            Home Address{" "}
            {!homeAddress && <span className="required-asterisk">*</span>}
          </label>
          <input
            type="text"
            id="homeAddress"
            value={homeAddress}
            name="homeAddress"
            onChange={handleChange}
            placeholder="e.g. Davao City"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <span className="text-white">Status</span>
        <div className="flex">
          <div className="input-control flex justify-between mr-4">
            <label
              htmlFor="statusIsActive"
              className={`flex items-center cursor-pointer ${
                !statusIsActive && !statusIsInactive ? "warning-border" : ""
              }`}
            >
              <span className="mr-2 text-white">
                Active
                {!statusIsActive && !statusIsInactive && (
                  <span className="required-asterisk">*</span>
                )}
              </span>
              <input
                type="checkbox"
                id="statusIsActive"
                checked={statusIsActive}
                onChange={handleChange}
                name="statusIsActive"
                className="hidden"
              />
              <span
                className={`w-10 h-5 border border-white rounded-full shadow-inner flex items-center transition-colors duration-300 ${
                  statusIsActive ? "bg-green-500" : ""
                }`}
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-white shadow-md transform duration-300 ${
                    statusIsActive ? "translate-x-5" : ""
                  }`}
                />
              </span>
            </label>
          </div>

          <div className="input-control flex justify-between ml-4">
            <label
              htmlFor="statusIsInactive"
              className={`flex items-center cursor-pointer ${
                !statusIsActive && !statusIsInactive ? "warning-border" : ""
              }`}
            >
              <span className="mr-2 text-white">
                Inactive
                {!statusIsActive && !statusIsInactive && (
                  <span className="required-asterisk">*</span>
                )}
              </span>
              <input
                type="checkbox"
                id="statusIsInactive"
                checked={statusIsInactive}
                onChange={handleChange}
                name="statusIsInactive"
                className="hidden"
              />
              <span
                className={`w-10 h-5 border border-white rounded-full shadow-inner flex items-center transition-colors duration-300 ${
                  statusIsInactive ? "bg-red-500" : ""
                }`}
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-white shadow-md transform duration-300 ${
                    statusIsInactive ? "translate-x-5" : ""
                  }`}
                />
              </span>
            </label>
          </div>
        </div>
        <div className="input-control">
          <label htmlFor="homeAddress">
            QPI {!QPI && <span className="required-asterisk">*</span>}
          </label>
          <input
            type="text"
            id="QPI"
            value={QPI}
            name="QPI"
            onChange={handleGradeChange}
            placeholder="e.g. 2"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>
        <label htmlFor="remarks"> Remarks </label>
        <textarea
          id="remarks"
          value={remarks}
          name="remarks"
          onChange={handleChange}
          placeholder="e.g. Has history of heart problems"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          rows={4}
        ></textarea>
      </div>
      <div>
        {hasDeficiency && (
          <div style={{ color: "red", marginTop: "10px", fontWeight: "bold" }}>
            Warning: This student is not eligible to play due to a low QPI.
          </div>
        )}
      </div>

      <div className="submit-btn mt-4 flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          {submitState === "edit" ? "Update Profile" : "Create Profile"}
        </button>
      </div>
    </CreatestudentStyled>
  );
}

const TeamCard = styled.div`
  margin-bottom: 20px;
  border: 1px solid #444;
  background-color: #222;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 8px;
  color: #ddd;
`;

const Section = styled.div`
  margin-bottom: 20px;
  border: 1px solid #444;
  padding: 10px;
  background-color: #333;
  border-radius: 5px;
  color: #ddd;
`;

const Heading = styled.h3`
  color: #ddd;
  font-size: 1rem;
  margin-bottom: 10px;
`;

const ListItem = styled.li`
  margin-bottom: 5px;
  list-style-type: none;
  padding-left: 20px;
  color: #ddd;
`;

const Label = styled.span`
  font-weight: normal;
  color: #bbb;
`;

const CreatestudentStyled = styled.form`
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: space-around; // Change from 'space-between' to 'space-around' for more even spacing
width: 100%; 
height: 100%;
padding: 20px; 

> * {
  width: 100%; 
  margin-bottom: 30px; // Increase the bottom margin for more space between elements
}

> h1 {
  font-size: clamp(1.2rem, 5vw, 1.6rem);
  font-weight: 600;
  margin-bottom: 50px; // Increase the margin-bottom for the title
}

.required-asterisk {
  color: red;
}


color: ${(props) => props.theme.colorGrey1};

.input-control {
  position: relative;
  font-weight: 500;
  padding: 10px 0; // Add vertical padding to input controls
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
    background-color: #002b88;
    color: #edf2f7;
    border: none;
    border-radius: 1rem;
    padding: 20px 40px; 
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 20px; 
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
  }
  
  .submit-btn button:hover {
    background-color: #0043d5;
    color: white;
  }

  input[type="text"], input[type="email"], input[type="password"], input[type="date"], input[name="weight"], input[name="height"], textarea {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 2px solid #4a4a4a;
    box-sizing: border-box;
    border-radius: 15px;
  }

  input[type="text"]:focus, input[type="email"]:focus, input[type="password"]:focus, input[type="date"]:focus, input[name="weight"]:focus, input[name="height"]:focus, textarea:focus {
    border: 1px solid #718096;
  }
  
  input[type="checkbox"] {
    width: 30px;
    height: 30px;
    background-color: #4a4a4a;
    border-radius: 50%;
    vertical-align: middle;
    border: 1px solid #4a4a4a;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
    margin: 10px;
  }
  
  input[type="checkbox"]:checked {
    background-color: #ffffff; // Change this to match the border color
    border: 1px solid #718096;
  }

    i {
      color: ${(props) => props.theme.colorGrey0};
    }

    &:hover {
      background: ${(props) => props.theme.colorPrimaryGreen};
      color: ${(props) => props.theme.colorWhite};
    }
  }
`;
export default CreateProfile;
