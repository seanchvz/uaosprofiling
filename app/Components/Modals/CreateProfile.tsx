import { useGlobalState } from "@/app/context/globalProvider";
import React, { useState } from 'react';
import styled from 'styled-components'; // Import styled-components// Assuming Button component exists
import { add } from '@/app/utils/Icons'; // Assuming Icons are imported
import Button from "../Button/Button";
import axios from 'axios';
import toast from "react-hot-toast";


// Create profile function component
function CreateProfile() {
  //State variables for the form fields
  const [firstName, setfirstName] = useState("");
  const [middleName, setmiddleName] = useState("");
  const [lastName, setlastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [birthDate, setBirthdate] = useState("");
  const [nationality, setNationality] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bloodType, setbloodType] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [isMale, setIsMale] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const [yrStartedPlaying, setyrStartedPlaying] = useState("");
  const [mothersName, setMothersName] = useState("");
  const [fathersName, setFathersName] = useState("");
  const [guardiansName, setGuardiansName] = useState("");
  const [courseAndYear, setCourseAndYear] = useState("");
  const [emergencyContactNumber, setEmergencyContactNumber] = useState("");
  const [emergencyContactPerson, setEmergencyContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [remarks, setRemarks] = useState("");
  const [statusIsActive, setStatusIsActive] = useState(false);
  const [statusIsInactive, setStatusIsInactive] = useState(false);
  const [userId, setUserId] = useState(""); // userId is obtained from authentication

  const { fetchAllStudentProfile, closeModal} = useGlobalState();

  // Handle change function for form fields
  const handleChange = (field: string) => (e: any) => {
    switch (field) { // To perform different actions based on diff conditions
      case "firstName":
        setfirstName(e.target.value);
        break;
      case "middleName":
        setmiddleName(e.target.value);
        break;
      case "lastName":
        setlastName(e.target.value);
        break;
      case "contactNumber":
        setContactNumber(e.target.value);
        break;
      case "birthDate":
        setBirthdate(e.target.value);
        break;
      case "nationality":
        setNationality(e.target.value);
        break;
      case "weight":
        setWeight(e.target.value);
        break;
      case "height":
        setHeight(e.target.value);
        break;
      case "bloodType":
        setbloodType(e.target.value);
        break;
      case "academicYear":
        setAcademicYear(e.target.value);
        break;
      case "isMale":
        setIsMale(e.target.checked);
        break;
      case "isFemale":
        setIsFemale(e.target.checked);
        break;
      case "yrStartedPlaying":
        setyrStartedPlaying(e.target.value);
        break;
      case "mothersName":
        setMothersName(e.target.value);
        break;
      case "fathersName":
        setFathersName(e.target.value);
        break;
      case "guardiansName":
        setGuardiansName(e.target.value);
        break;
      case "courseAndYear":
        setCourseAndYear(e.target.value);
        break;
      case "emergencyContactNumber":
        setEmergencyContactNumber(e.target.value);
        break;
      case "emergencyContactPerson":
        setEmergencyContactPerson(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "homeAddress":
        setHomeAddress(e.target.value);
        break;
      case "statusIsActive":
        setStatusIsActive(e.target.checked);
        break;
      case "statusIsInactive":
        setStatusIsInactive(e.target.checked);
        break;
        case "remarks":
        setRemarks(e.target.value);
        break;
      case "userId":
        setUserId(e.target.value);
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const student = {
      firstName,
      middleName,
      lastName,
      contactNumber,
      birthDate,
      nationality,
      weight,
      height,
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
      userId,
    };
    try {
      const res = await axios.post("/api/studentProfiling", student);

      if (res.data.error) {
        toast.error(res.data.error);
      }

      if (!res.data.error) {
        toast.success("Student profile created successfully.");
      fetchAllStudentProfile();
      closeModal();
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };



  return (
    <CreateStudentProfileStyled onSubmit={handleSubmit}>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          Add a Student Profile
        </h1>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-3 gap-4">
      <div className="input-control">
        <label htmlFor="name"> First Name: </label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          name="First Name: "
          onChange={handleChange("firstName")}
          placeholder=" First name: "
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>
      <div className="input-control">
        <label htmlFor="middleName"> Middle Name: </label>
        <input
          type="text"
          id="middleName"
          value={middleName}
          name="Middle Name: "
          onChange={handleChange("middleName")}
          placeholder="Middle Name: "
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>
      <div className="input-control">
        <label htmlFor="lastName"> Last Name: </label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          name=" Last Name"
          onChange={handleChange("lastName")}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>
      <div className="input-control">
        <label htmlFor="contactNumber"> Contact Number </label>
        <input
          type="text"
          id="contactNumber"
          value={contactNumber}
          name="Contact Number"
          onChange={handleChange("contactNumber")}
          placeholder="Contac Number:  "
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>
      <div className="input-control">
      <label htmlFor="birthDate"> Birth Date </label>
        <input
          type="date"
          id="birthDate"
          value={birthDate}
          name="birthDate"
          onChange={handleChange("birthDate")}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>
    
     
      <div className="input-control">
        <label htmlFor="nationality"> Nationality </label>
        <input
          type="text"
          id="nationality"
          value={nationality}
          name="Nationality: "
          onChange={handleChange("nationality")}
          placeholder=" Nationality: "
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>
      <div className="input-control">
        <label htmlFor="weight"> Weight in KG </label>
        <input
          type="text"
          id="weight"
          value={weight}
          name="weight"
          onChange={handleChange("weight")}
          placeholder="e.g. 50"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>
      <div className="input-control">
        <label htmlFor="height"> Height in CM </label>
        <input
          type="text"
          id="height"
          value={height}
          name="height"
          onChange={handleChange("height")}
          placeholder="e.g. 192"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>

      <div className="input-control">
        <label htmlFor="bloodType"> bloodType </label>
        <input
          type="text"
          id="bloodType"
          value={bloodType}
          name="bloodType"
          onChange={handleChange("bloodType")}
          placeholder="bloodType: "
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>

      
      <div className="input-control">
        <label htmlFor="bloodType"> Academic Year </label>
        <input
          type="text"
          id="academicYear"
          value={academicYear}
          name="academicYear"
          onChange={handleChange("academicYear")}
          placeholder="e.g. 2021-2022"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>


      <div className="input-control">
        <label>
          <input
            type="checkbox"
            checked={isMale}
            onChange={handleChange("isMale")}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
          Male
        </label>
      </div>
      <div className="input-control">
        <label>
          <input
            type="checkbox"
            checked={isFemale}
            onChange={handleChange("isFemale")}
            
          />
          Female
        </label>
      </div>


      <div className="input-control">
        <label htmlFor="name"> Year started playing: </label>
        <input
          type="text"
          id="yrStartedPlaying"
          value={yrStartedPlaying}
          onChange={handleChange("yrStartedPlaying")}
          placeholder="e.g. 2021"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>
      <div className="input-control">
        <label htmlFor="mothersName"> Mother's Name </label>
        <input
          type="text"
          id="mothersName"
          value={mothersName}
          name="Mother's Name "
          onChange={handleChange("mothersName")}
          placeholder=" Mother's name: "
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>
      <div className="input-control">
        <label htmlFor="fathersName"> Father's Name </label>
        <input
          type="text"
          id="fathersName"
          value={fathersName}
          name="Fathers's Name: "
          onChange={handleChange("fathersName")}
          placeholder=" Fathers's name "
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>
      <div className="input-control">
        <label htmlFor="fathersName">Optional* Guardian's Name </label>
        <input
          type="text"
          id="guardiansName"
          value={guardiansName}
          name="Fathers's Name: "
          onChange={handleChange("guardiansName")}
          placeholder="Guardian's name"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>
      <div className="input-control">
        <label htmlFor="courseAndYear"> Course and Year </label>
        <input
          type="text"
          id="courseAndYear"
          value={courseAndYear}
          name="Course and Year "
          onChange={handleChange("courseAndYear")}
          placeholder="Course and Year: "
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>

      <div className="input-control">
          <label htmlFor="emergencyContact">Emergency Contact Number</label>
          <input
            type="text"
            id="emergencyContactNumber"
            value={emergencyContactNumber}
            name="emergencyContactNumber"
            onChange={handleChange("emergencyContactNumber")}
            placeholder="Enter Emergency Contact"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <div className="input-control">
          <label htmlFor="emergencyContactPerson">
            Emergency Contact Person
          </label>
          <input
            type="text"
            id="emergencyContactPerson"
            value={emergencyContactPerson}
            name="emergencyContactPerson"
            onChange={handleChange("emergencyContactPerson")}
            placeholder="Enter Emergency Contact Person"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>
     
      <div className="input-control">
        <label htmlFor="email"> Email Address </label>
        <input
          type="text"
          id="email"
          value={email}
          name="email"
          onChange={handleChange("email")}
          placeholder="email: "
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>
      <div className="input-control">
        <label htmlFor="email"> Home Address </label>
        <input
          type="text"
          id="homeAddress"
          value={homeAddress}
          name="homeAddress"
          onChange={handleChange("homeAddress")}
          placeholder="homeAddress: "
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>

      <div className='flex'>
  <div className="input-control mr-4"> {/* Add right margin */}
    <label htmlFor="statusIsActive">Is an Active Athlete</label>
    <input
      type="checkbox"
      id="statusIsActive"
      checked={statusIsActive}
      onChange={handleChange("statusIsActive")}
      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
    />
  </div>

  <div className="input-control ml-4"> {/* Add left margin */}
    <label htmlFor="statusIsInactive">Is an Inactive Athlete</label>
    <input
      type="checkbox"
      id="statusIsInactive"
      checked={statusIsInactive}
      onChange={handleChange("statusIsInactive")}
      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
    />
  </div>
  <div className="input-control">
      <label htmlFor="remarks" className="block">Event Details</label>
      <textarea
        id="remarks"
        value={remarks}
        name="remarks"
        onChange={handleChange("remarks")}
        placeholder="Enter event details"
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        rows={4}
      ></textarea>
    </div>
</div>

<div className="submit-btn mt-4 flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            {add}
            Create Student Profile
          </button>
        </div>
     
      </div>
    </CreateStudentProfileStyled>
  );
}

const CreateStudentProfileStyled = styled.form`
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
export default CreateProfile;