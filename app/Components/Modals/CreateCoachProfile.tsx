import { useGlobalState } from "@/app/context/globalProvider";
import { add, coach } from "@/app/utils/Icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";

interface Props {
  coachProfile?: any;
  submitState: "create" | "edit";
}

function CreateCoachProfile(props: Props) {
  const { coachProfile, submitState } = props;
  const [name, setName] = useState(coachProfile ? coachProfile.name : "");
  const [contactNumber, setContactNumber] = useState(
    coachProfile ? coachProfile.contactNumber : ""
  );
  const [sport, setSport] = useState(coachProfile ? coachProfile.sport : "");
  const [permanentTeam, setPermanentTeam] = useState(
    coachProfile ? coachProfile.permanentTeam : ""
  );
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
  const [resumeUrl, setResumeUrl] = useState(
    coachProfile ? coachProfile.resumeUrl : ""
  );
  const [email, setEmail] = useState(coachProfile ? coachProfile.email : "");
  const [remarks, setRemarks] = useState(
    coachProfile ? coachProfile.remarks : ""
  );

  const [userId, setUserId] = useState(coachProfile ? coachProfile.userId : "");
  const [id, setId] = useState(coachProfile ? coachProfile.id : "");
  const { fetchAllCoachProfile, closeModal } = useGlobalState();

  const [coachProfiles, setCoachProfiles] = useState([]);
  // Fetch all coach profiles
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("/api/coachProfiling");
        setCoachProfiles(response.data); // Store coach profiles in state
      } catch (error) {
        console.error("Failed to fetch coach profiles:", error);
        toast.error("Failed to load coach profiles.");
      }
    };

    fetchProfiles();
  }, []);

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
        case "name":
          setName(value);
          break;
        case "contactNumber":
          setContactNumber(value);
          break;
        case "sport":
          setSport(value);
          break;
        case "permanentTeam":
          setPermanentTeam(value);
          break;
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
      setName(coachProfile.name);

      const formattedBirthDate = new Date(coachProfile.birthDate)
        .toISOString()
        .split("T")[0];

      setContactNumber(coachProfile.contactNumber);
      setSport(coachProfile.sport);
      setPermanentTeam(coachProfile.permanentTeam);
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
    }
  }, [submitState, coachProfile]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check for duplicate name, excluding the current coach profile if editing
    const isDuplicate = coachProfiles.some(
      (coachProfile) =>
        coachProfile.name === name && (!id || coachProfile.id !== id)
    );

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
    if (!name) {
      toast.error("Please enter the coach's name.");
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
    if (!sport) {
      toast.error("Please specify a sport.");
      return;
    }
    if (!permanentTeam) {
      toast.error("Please enter a permanent team.");
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
      name,
      contactNumber,
      sport,
      permanentTeam,
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
    };

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
    name: string;
    contactNumber: string;
    sport: string;
    permanentTeam: string;
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
            Name {!name && <span className="required-asterisk">*</span>}
          </label>
          <input
            type="text"
            id="name"
            value={name}
            name="name"
            onChange={handleChange}
            placeholder="e.g. Juan Dela Cruz"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>
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
          <label htmlFor="Sport" className="block">
            Sport
          </label>
          <select
            id="sport"
            name="sport"
            value={sport}
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
        </div>

        <div className="input-control">
          <label htmlFor="permanentTeam">
            Permanent Team{" "}
            {!permanentTeam && <span className="required-asterisk">*</span>}
          </label>
          <input
            type="text"
            id="permanentTeam"
            value={permanentTeam}
            name="permanentTeam"
            onChange={handleChange}
            placeholder="e.g. DACS"
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
          type="text"
          id="resumeUrl"
          value={resumeUrl}
          name="resumeUrl"
          onChange={handleChange}
          placeholder="URL of Resume"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
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
