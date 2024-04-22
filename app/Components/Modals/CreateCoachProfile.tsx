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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      // For checkboxes, use checked value
      if (name === "isMale") setIsMale(checked);
      if (name === "isFemale") setIsFemale(checked);
      if (name === "statusIsFulltime") setStatusIsFulltime(checked);
      if (name === "statusIsParttime") setStatusIsParttime(checked);
    } else {
      // Convert numeric values from input and handle possible NaN (Not a Number)
      const floatValue = parseFloat(value);
      const isFloatNaN = isNaN(floatValue);

      switch (name) {
        case "weight":
        case "height":
          // Only update the state if the floatValue is a valid number
          if (!isFloatNaN) {
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
      birthDate,
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
      // API call to update the event
      try {
        const response = await axios.patch(
          `/api/coachProfiling${coachProfile.id}`,
          coachProfile
        );
        toast.success("Event updated successfully!");
        // Refresh events list or handle state update
      } catch (error) {
        console.error("Failed to update the event:", error);
        toast.error("Error updating event");
      }
    } else {
      // API call to create a new event
      try {
        const response = await axios.post("/api/coachProfiling", coachProfile);
        toast.success("Event created successfully!");
        fetchAllCoachProfile();
        closeModal();
      } catch (error) {
        console.error("Failed to create the event:", error);
        toast.error("Error creating event");
      }
    }
    // Optionally close the modal after operation
    closeModal();
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
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            name="name"
            onChange={handleChange}
            placeholder="Enter Fullname"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>
        <div className="input-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            name="email"
            onChange={handleChange}
            placeholder="Enter Email"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>
        <div className="input-control">
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="text"
            id="contactNumber"
            value={contactNumber}
            name="contactNumber"
            onChange={handleChange}
            placeholder="Enter Contact Number"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <div className="input-control">
          <label htmlFor="sport">Sport</label>
          <input
            type="text"
            id="sport"
            value={sport}
            name="sport"
            onChange={handleChange}
            placeholder="Enter Sport"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <div className="input-control">
          <label htmlFor="permanentTeam">Permanent Team</label>
          <input
            type="text"
            id="permanentTeam"
            value={permanentTeam}
            name="permanentTeam"
            onChange={handleChange}
            placeholder="Enter Permanent Team"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <div className="input-control flex justify-between">
          <label htmlFor="isMale" className="flex items-center cursor-pointer">
            <span className="mr-2 text-white">Male</span>
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
            className="flex items-center cursor-pointer"
          >
            <span className="mr-2 text-white">Female</span>
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
        <label htmlFor="birthDate">Birth Date</label>
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
        <label htmlFor="nationality">Nationality</label>
        <input
          type="text"
          id="nationality"
          value={nationality}
          name="nationality"
          onChange={handleChange}
          placeholder="Enter Nationality"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>
      <div className="flex">
        <div className="input-control mr-4">
          <label htmlFor="weight">Weight in KG</label>
          <input
            type="text"
            id="weight"
            name="weight"
            onChange={handleChange}
            placeholder="eg. 45.7"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <div className="input-control">
          <label htmlFor="height">Height in CM</label>
          <input
            type="text"
            id="height"
            name="height"
            onChange={handleChange}
            placeholder="eg. 156.3"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>
      </div>
      <div className="input-control">
        <label htmlFor="bloodType">Blood Type</label>
        <input
          type="text"
          id="bloodType"
          value={bloodType}
          name="bloodType"
          onChange={handleChange}
          placeholder="Enter Blood Type"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>
      <div className="input-control">
        <label htmlFor="academicYear">Academic Year</label>
        <input
          type="text"
          id="academicYear"
          value={academicYear}
          name="academicYear"
          onChange={handleChange}
          placeholder="Enter Academic Year"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>
      <div className="flex">
        <div className="input-control flex justify-between mr-4">
          <label
            htmlFor="statusIsFulltime"
            className="flex items-center cursor-pointer"
          >
            <span className="mr-2 text-white">Full-time</span>
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
                statusIsFulltime ? "bg-red-500" : ""
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
            className="flex items-center cursor-pointer"
          >
            <span className="mr-2 text-white">Part-time</span>
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
                statusIsParttime ? "bg-green-500" : ""
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
        <label htmlFor="emergencyContact">Emergency Contact Number</label>
        <input
          type="text"
          id="emergencyContact"
          value={emergencyContact}
          name="emergencyContact"
          onChange={handleChange}
          placeholder="Enter Emergency Contact"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>
      <div className="input-control">
        <label htmlFor="emergencyContactPerson">Emergency Contact Person</label>
        <input
          type="text"
          id="emergencyContactPerson"
          value={emergencyContactPerson}
          name="emergencyContactPerson"
          onChange={handleChange}
          placeholder="Enter Emergency Contact Person"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>
      <div className="input-control">
        <label htmlFor="resumeUrl">Resume URL</label>
        <input
          type="text"
          id="resumeUrl"
          value={resumeUrl}
          name="resumeUrl"
          onChange={handleChange}
          placeholder="Enter Resume URL"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>
      <div className="input-control">
        <label htmlFor="remarks" className="block">
          Remarks
        </label>
        <textarea
          id="remarks"
          value={remarks}
          name="remarks"
          onChange={handleChange}
          placeholder="Remarks"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          rows={2}
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
