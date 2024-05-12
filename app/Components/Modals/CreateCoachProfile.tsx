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
  coachProfile?: any;
  submitState: "create" | "edit";
}

function CreateCoachProfile(props: Props) {
  const { coachProfile, submitState } = props;
  const [firstName, setfirstName] = useState(
    coachProfile ? coachProfile.firstName : ""
  );
  const [middleName, setMiddleName] = useState(
    coachProfile ? coachProfile.middleName : ""
  );
  const [lastName, setLastName] = useState(
    coachProfile ? coachProfile.lastName : ""
  );
  const [contactNumber, setContactNumber] = useState(
    coachProfile ? coachProfile.contactNumber : ""
  );
  const [landLineNumber, setLandLineNumber] = useState(
    coachProfile ? coachProfile.landLineNumber : ""
  );

  // const [permanentTeam, setPermanentTeam] = useState(
  //   coachProfile ? coachProfile.permanentTeam : ""
  // );
  const [isMale, setIsMale] = useState(
    coachProfile ? coachProfile.isMale : false
  );
  const [isFemale, setIsFemale] = useState(
    coachProfile ? coachProfile.isFemale : false
  );
  const [emergencyContact, setEmergencyContact] = useState(
    coachProfile ? coachProfile.emergencyContact : ""
  );
  const [emergencyContactPerson, setEmergencyContactPerson] = useState(
    coachProfile ? coachProfile.emergencyContactPerson : ""
  );
  const [birthDate, setBirthDate] = useState(
    coachProfile ? coachProfile.birthDate : ""
  );
  const [nationality, setNationality] = useState(
    coachProfile ? coachProfile.nationality : ""
  );
  const [weight, setWeight] = useState(coachProfile ? coachProfile.weight : 0);
  const [height, setHeight] = useState(coachProfile ? coachProfile.height : 0);
  const [bloodType, setBloodType] = useState(
    coachProfile ? coachProfile.bloodType : ""
  );
  const [academicYear, setAcademicYear] = useState(
    coachProfile ? coachProfile.academicYear : ""
  );
  const [statusIsFulltime, setStatusIsFulltime] = useState(
    coachProfile ? coachProfile.statusIsFulltime : false
  );
  const [statusIsParttime, setStatusIsParttime] = useState(
    coachProfile ? coachProfile.statusIsParttime : false
  );
  // const [resumeUrl, setResumeUrl] = useState(
  //   coachProfile ? coachProfile.resumeUrl : ""
  // );
  const [email, setEmail] = useState(coachProfile ? coachProfile.email : "");
  const [remarks, setRemarks] = useState(
    coachProfile ? coachProfile.remarks : ""
  );

  const [userId, setUserId] = useState(coachProfile ? coachProfile.userId : "");
  const [id, setId] = useState(coachProfile ? coachProfile.id : "");
  const { fetchAllCoachProfile, closeModal } = useGlobalState();
  const [resumeUrl, setResumeUrl] = useState("");

  const [sportsOptions, setSportsOptions] = useState<
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
        if (submitState === "edit" && coachProfile && coachProfile.teams) {
          setSelectedTeams(coachProfile.teams.map((t) => t.id));
        }
      } catch (error) {
        toast.error("Failed to load teams");
      }
    };

    fetchTeams();
  }, [submitState, coachProfile]);

  const [coachProfiles, setCoachProfiles] = useState([]);
  // Fetch all coach profiles
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("/api/coachProfiling");
        setCoachProfiles(response.data); // Store coach profiles in state
      } catch (error) {
        toast.error("Failed to load coach profiles.");
      }
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    const fetchCoachDetails = async () => {
      if (submitState === "edit" && coachProfile) {
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

    fetchCoachDetails();
  }, [coachProfile, submitState, teamOptions]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      switch (name) {
        case "isMale":
          setIsMale(checked);
          if (checked) setIsFemale(false); // Uncheck female if male is checked
          break;
        case "isFemale":
          setIsFemale(checked);
          if (checked) setIsMale(false); // Uncheck male if female is checked
          break;
        case "statusIsFulltime":
          setStatusIsFulltime(checked);
          if (checked) setStatusIsParttime(false); // Uncheck part-time if full-time is checked
          break;
        case "statusIsParttime":
          setStatusIsParttime(checked);
          if (checked) setStatusIsFulltime(false); // Uncheck full-time if part-time is checked
          break;
      }
    } else {
      // For input type "text" or others, handling numeric and text inputs
      switch (name) {
        case "weight":
        case "height":
          const floatValue = parseFloat(value);
          if (!isNaN(floatValue)) {
            if (name === "weight") setWeight(floatValue);
            if (name === "height") setHeight(floatValue);
          }
          break;
        case "firstName":
          setfirstName(value);
          break;
        case "middleName":
          setMiddleName(value);
          break;
        case "lastName":
          setLastName(value);
          break;
        case "contactNumber":
          setContactNumber(value);
          break;
        case "landLineNumber":
          setLandLineNumber(value);
          break;
        // case "permanentTeam":
        //   setPermanentTeam(value);
        //   break;
        case "emergencyContact":
          setEmergencyContact(value);
          break;
        case "emergencyContactPerson":
          setEmergencyContactPerson(value);
          break;
        case "birthDate":
          setBirthDate(value);
          break;
        case "nationality":
          setNationality(value);
          break;
        case "bloodType":
          setBloodType(value);
          break;
        case "academicYear":
          setAcademicYear(value);
          break;
        case "resumeUrl":
          setResumeUrl(value);
          break;
        case "email":
          setEmail(value);
          break;
        case "remarks":
          setRemarks(value);
          break;
        default:
          console.log("Unhandled field: ", name);
      }
    }
  };

  useEffect(() => {
    if (submitState === "edit" && coachProfile) {
      setfirstName(coachProfile.firstName);
      setMiddleName(coachProfile.middleName);
      setLastName(coachProfile.lastName);
      const formattedBirthDate = new Date(coachProfile.birthDate)
        .toISOString()
        .split("T")[0];
      setContactNumber(coachProfile.contactNumber);
      setLandLineNumber(coachProfile.landLineNumber);

      // setPermanentTeam(coachProfile.permanentTeam);
      setIsMale(coachProfile.isMale);
      setIsFemale(coachProfile.isFemale);
      setEmergencyContact(coachProfile.emergencyContact);
      setEmergencyContactPerson(coachProfile.emergencyContactPerson);
      setBirthDate(formattedBirthDate);
      setNationality(coachProfile.nationality);
      setWeight(coachProfile.weight);
      setHeight(coachProfile.height);
      setBloodType(coachProfile.bloodType);
      setAcademicYear(coachProfile.academicYear);
      setStatusIsFulltime(coachProfile.statusIsFulltime);
      setStatusIsParttime(coachProfile.statusIsParttime);
      setResumeUrl(coachProfile.resumeUrl);
      setEmail(coachProfile.email);
      setRemarks(coachProfile.remarks);
      setUserId(coachProfile.userId);
      if (coachProfile.teams && coachProfile.teams.length > 0) {
        setSelectedTeams(coachProfile.teams.map((team: any) => team.id));
      }
    }
  }, [submitState, coachProfile]);

  useEffect(() => {
    const fetchCoachDetails = async () => {
      if (submitState === "edit" && coachProfile) {
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
        setfirstName(coachProfile.firstName);
        setMiddleName(coachProfile.middleName);
        setLastName(coachProfile.lastName);
        setContactNumber(coachProfile.contactNumber);
        setLandLineNumber(coachProfile.landLineNumber);
        setIsMale(coachProfile.isMale);
        setIsFemale(coachProfile.isFemale);
        setEmergencyContact(coachProfile.emergencyContact);
        setEmergencyContactPerson(coachProfile.emergencyContactPerson);
        const formattedBirthDate = new Date(coachProfile.birthDate)
          .toISOString()
          .split("T")[0];
        setBirthDate(formattedBirthDate);
        setNationality(coachProfile.nationality);
        setWeight(coachProfile.weight);
        setHeight(coachProfile.height);
        // setSport(coachProfile.sport);
        setBloodType(coachProfile.bloodType);
        setAcademicYear(coachProfile.academicYear);
        setStatusIsFulltime(coachProfile.statusIsFulltime);
        setStatusIsParttime(coachProfile.statusIsParttime);
        setResumeUrl(coachProfile.resumeUrl);
        setEmail(coachProfile.email);
        setRemarks(coachProfile.remarks);
        setUserId(coachProfile.userId);
        setSelectedTeams(coachProfile.teams.map((t: { id: number }) => t.id));
      } else if (submitState === "create") {
        try {
          // Assume you need to fetch a default event or some data when creating a new event
          const response = await axios.get("/api/coachProfiling?coachId=123"); // Example API call
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

    fetchCoachDetails();
  }, [coachProfile, submitState]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fullName = `${firstName} ${middleName} ${lastName}`.toLowerCase();
    // Check for duplicate name, excluding the current coach profile if editing
    const isDuplicate =
      Array.isArray(coachProfiles) &&
      coachProfiles.some((coachProfile) => {
        const existingFullName =
          `${coachProfile.firstName} ${coachProfile.middleName} ${coachProfile.lastName}`.toLowerCase();
        return fullName === existingFullName && coachProfile.id !== id;
      });

    if (isDuplicate) {
      toast.error("A coach with the same name already exists!");
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

    // Validation checks for coach profile fields
    if (!firstName) {
      toast.error("Please enter the coach's first name.");
      return;
    }
    if (!lastName) {
      toast.error("Please enter the coach's last name.");
      return;
    }
    if (!email) {
      toast.error("Please enter an email address.");
      return;
    }
    if (!contactNumber) {
      toast.error("Please enter a contact number.");
      return;
    }
    if (contactNumber.length !== 11 || !/^\d+$/.test(contactNumber)) {
      toast.error("The contact number must be exactly 11 digits.");
      return;
    }

    if (isMale === undefined && isFemale === undefined) {
      toast.error("Please select a gender.");
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
    if (!academicYear) {
      toast.error("Please enter an academic year.");
      return;
    }
    if (!emergencyContact) {
      toast.error("Please enter an emergency contact.");
      return;
    }
    if (emergencyContact.length !== 11 || !/^\d+$/.test(emergencyContact)) {
      toast.error("The emergency number must be exactly 11 digits.");
      return;
    }
    if (!emergencyContactPerson) {
      toast.error("Please enter an emergency contact person.");
      return;
    }

    if (weight === undefined) {
      toast.error("Please enter a weight.");
      return;
    }
    if (height === undefined) {
      toast.error("Please enter a height.");
      return;
    }

    if (statusIsFulltime === undefined && statusIsParttime === undefined) {
      toast.error("Please select employment status (full-time or part-time).");
      return;
    }
    if (!resumeUrl) {
      toast.error("Please provide a resume URL.");
      return;
    }

    // Construct the coachProfile object with all the state values
    const coachProfile = {
      id,
      firstName,
      middleName,
      lastName,
      contactNumber,
      landLineNumber,
      isMale,
      isFemale,
      emergencyContact,
      emergencyContactPerson,
      birthDate: new Date(birthDate),
      nationality,
      weight,
      height,
      bloodType,
      academicYear,
      statusIsFulltime,
      statusIsParttime,
      resumeUrl,
      email,
      remarks,
      userId,
      teamIds: selectedTeams,
    };

    console.log("Selected teams on submit:", selectedTeams);
    if (selectedTeams.some((teamIds) => typeof teamIds !== "number")) {
      console.error("Invalid team entries detected:", selectedTeams);
      toast.error("Invalid team data detected.");
      return; // Stop execution to avoid further errors
    }

    if (submitState === "edit") {
      // handleEdit(event);
      try {
        console.log("Sending PATCH request for coach ID:", coachProfile.id);
        console.log("Data being sent:", coachProfile);
        const response = await axios.patch(
          `/api/coachProfiling/${coachProfile.id}/`,
          coachProfile
        );

        console.log("Server response:", response.data);
        toast.success("Profile updated successfully!");
        fetchAllCoachProfile();
      } catch (error) {
        handleAxiosError(error);
      }
    } else {
      try {
        const response = await axios.post("/api/coachProfiling", coachProfile);
        toast.success("Profile created successfully!");
        fetchAllCoachProfile();
        closeModal();
      } catch (error) {
        handleAxiosError(error, "creating");
      }
    }
    closeModal();
  };

  function handleAxiosError(error: any, action: string = "updating") {
    console.error(`Failed to ${action} the event:`, error);
    if (error.response && error.response.data) {
      console.error("Server error details:", error.response.data);
      const errorMessage =
        error.response.data.error || "Unexpected server error";
      toast.error(`Error ${action} event: ${errorMessage}`);
    } else if (error.message) {
      console.error("Network or other error:", error.message);
      toast.error(`Error ${action} event: ${error.message}`);
    } else {
      toast.error(`Error ${action} event: Unknown error`);
    }
  }

  interface CoachData {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    contactNumber: string;
    landLineNumber: string;
    isMale: boolean;
    isFemale: boolean;
    emergencyContact: string;
    emergencyContactPerson: string;
    birthDate: Date;
    nationality: string;
    weight?: number;
    height?: number;
    bloodType?: string;
    academicYear: string;
    statusIsFulltime: boolean;
    statusIsParttime: boolean;
    resumeUrl: string;
    email: string;
    remarks?: string;
  }

  const handleEdit = async (coachProfile: CoachData) => {
    if (!coachProfile.id) {
      toast.error("Coach ID is missing");
      return;
    }

    try {
      console.log("Sending PATCH request for coach ID:", coachProfile.id);
      console.log("Data being sent:", coachProfile);

      // Destructure the event to separate id from other data
      const { id, ...updateData } = coachProfile;

      const response = await axios.patch(
        `/api/coachProfiling/${id}`,
        updateData
      );

      console.log("Server response:", response.data);
      if (response.data && response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Coach updated successfully!");
      }
    } catch (error) {
      handleAxiosError(error);
    }
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
    <CreateCoachProfileStyled
      onSubmit={handleSubmit}
      className="mx-auto max-w-lg"
    >
      {" "}
      <div className="mb-8">
        {" "}
        <h1 className="text-4xl font-bold mb-4">Coach Profile</h1>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-3 gap-4">
        <div className="input-control">
          <label htmlFor="name">
            First Name{" "}
            {!firstName && <span className="required-asterisk">*</span>}
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            name="firstName"
            onChange={handleChange}
            placeholder="e.g. Juan Dela Cruz"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>
        <div className="input-control">
          <label htmlFor="name">Middle Name</label>
          <input
            type="text"
            id="middleName"
            value={middleName}
            name="middleName"
            onChange={handleChange}
            placeholder="e.g. Buen"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>
        <div className="input-control">
          <label htmlFor="name">
            Last Name{" "}
            {!lastName && <span className="required-asterisk">*</span>}
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            name="lastName"
            onChange={handleChange}
            placeholder="e.g. Dela Cruz"
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
            <h2 style={{ fontSize: "1.2em" }}>Add a Team to Coach</h2>
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

        {displayTeamDetails()}

        <div className="input-control">
          <label htmlFor="email">
            Email {!email && <span className="required-asterisk">*</span>}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            name="email"
            onChange={handleChange}
            placeholder="e.g. juan@gmail.com"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
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
            placeholder="e.g. 09123456789"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>
        <div className="input-control">
          <label htmlFor="contactNumber">Land Line Number </label>
          <input
            type="text"
            id="landLineNumber"
            value={landLineNumber}
            name="landLineNumber"
            onChange={handleChange}
            placeholder="e.g. 00-123-1234"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

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
            step="0.01"
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
            step="0.01"
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
          placeholder="e.g. 2023-Present"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>
      <div className="flex">
        <div className="input-control flex justify-between mr-4">
          <label
            htmlFor="statusIsFulltime"
            className={`flex items-center cursor-pointer ${
              !statusIsFulltime && !statusIsParttime ? "warning-border" : ""
            }`}
          >
            <span className="mr-2 text-white">
              Full-time{" "}
              {!statusIsFulltime && !statusIsParttime && (
                <span className="required-asterisk">*</span>
              )}
            </span>
            <input
              type="checkbox"
              id="statusIsFulltime"
              checked={statusIsFulltime}
              onChange={handleChange}
              name="statusIsFulltime"
              className="hidden"
            />
            <span
              className={`w-10 h-5 border border-white rounded-full shadow-inner flex items-center transition-colors duration-300 ${
                statusIsFulltime ? "bg-green-500" : ""
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-white shadow-md transform duration-300 ${
                  statusIsFulltime ? "translate-x-5" : ""
                }`}
              />
            </span>
          </label>
        </div>

        <div className="input-control flex justify-between ml-4">
          <label
            htmlFor="statusIsParttime"
            className={`flex items-center cursor-pointer ${
              !statusIsFulltime && !statusIsParttime ? "warning-border" : ""
            }`}
          >
            <span className="mr-2 text-white">
              Part-time{" "}
              {!statusIsFulltime && !statusIsParttime && (
                <span className="required-asterisk">*</span>
              )}
            </span>
            <input
              type="checkbox"
              id="statusIsParttime"
              checked={statusIsParttime}
              onChange={handleChange}
              name="statusIsParttime"
              className="hidden"
            />
            <span
              className={`w-10 h-5 border border-white rounded-full shadow-inner flex items-center transition-colors duration-300 ${
                statusIsParttime ? "bg-red-500" : ""
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-white shadow-md transform duration-300 ${
                  statusIsParttime ? "translate-x-5" : ""
                }`}
              />
            </span>
          </label>
        </div>
      </div>
      <div className="input-control">
        <label htmlFor="emergencyContact">
          Emergency Contact Number{" "}
          {!emergencyContact && <span className="required-asterisk">*</span>}
        </label>
        <input
          type="text"
          id="emergencyContact"
          value={emergencyContact}
          name="emergencyContact"
          onChange={handleChange}
          placeholder="e.g. 09123456789"
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
        <label htmlFor="resumeUrl">
          Resume URL{" "}
          {!resumeUrl && <span className="required-asterisk">*</span>}
        </label>
        <input
          type="url"
          id="resumeUrl"
          value={resumeUrl}
          name="resumeUrl"
          onChange={handleChange}
          placeholder="URL of Resume"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
        {resumeUrl && (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out inline-block"
            role="button"
            aria-label="View Resume"
          >
            View Resume
          </a>
        )}
      </div>
      <div className="input-control">
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
        <div className="submit-btn mt-4 flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            {submitState === "edit" ? "Update Profile" : "Create Profile"}
          </button>
        </div>
      </div>
    </CreateCoachProfileStyled>
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

const CreateCoachProfileStyled = styled.form`
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

export default CreateCoachProfile;
function handleAxiosError(error: unknown, p0?: string) {
  throw new Error("Function not implemented.");
}
