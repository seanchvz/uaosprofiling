import { useGlobalState } from "@/app/context/globalProvider";
import React, { useState } from 'react';
import styled from 'styled-components'; // Import styled-components// Assuming Button component exists
import { add } from '@/app/utils/Icons'; // Assuming Icons are imported
import Button from "../Button/Button";
import axios from 'axios';
import toast from "react-hot-toast";

function CreateProfile() {
  const [firstName, setfirstName] = useState("");
  const [middleName, setmiddleName] = useState("");
  const [lastName, setlastName] = useState("");
  const [birthDate, setBirthdate] = useState("");
  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [isMale, setIsMale] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const [yrStartedPlaying, setyrStartedPlaying] = useState("");
  const [mothersName, setmothersName] = useState("");
  const [fathersName, setfathersName] = useState("");
  const [courseAndYear, setCourseAndYear] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bloodType, setbloodType] = useState("");
  const [userId, setUserId] = useState(""); // Assuming userId is obtained from authentication

  const { fetchAllStudentProfile, closeModal} = useGlobalState();

  const handleChange = (firstName: string) => (e: any)=>{

    switch (firstName) {
      case "firstName":
        setfirstName(e.target.value);
    break;
        case "middleName":
        setmiddleName(e.target.value);
    break;
        case "lastName":
        setlastName(e.target.value);
    break;
        case "birthDate":
        setBirthdate(e.target.value);
    break;
        case "age":
        setAge(e.target.value);
    break;
        case "nationality":
        setNationality(e.target.value);
    break;
        case "civilStatus":
        setCivilStatus(e.target.value);
    break;
        case "isMale":
        setIsMale(e.target.value);
    break;
        case "isFemale":
        setIsFemale(e.target.value);
    break;
        case "yrStartedPlaying":
        setyrStartedPlaying(e.target.value);
    break;
        case "mothersName":
        setmothersName(e.target.value);
    break;
        case "fathersName":
        setfathersName(e.target.value);
    break;
        case "courseAndYear":
        setCourseAndYear(e.target.value);
    break;
        case "contactNumber":
        setContactNumber(e.target.value);
    break;
        case "email":
        setEmail(e.target.value);
    break;
        case "homeAddress":
        setHomeAddress(e.target.value);
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
        birthDate,
        age,
        nationality,
        civilStatus,
        isMale,
        isFemale,
        yrStartedPlaying,
        mothersName,
        fathersName,
        courseAndYear,
        contactNumber,
        email,
        homeAddress,
        weight,
        height,
        bloodType,
        userId
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
    <form onSubmit={handleSubmit}>
      <div className="mb-8">
        {" "}
        {/* Add margin-bottom */}
        <h1 className="text-4xl font-bold mb-4">
          Add a Student 
        </h1>{" "}
        {/* Add margin-bottom */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
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
        <label htmlFor="age"> Age: </label>
        <input
          type="text"
          id="age"
          value={age}
          name="age"
          onChange={handleChange("age")}
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
        <label htmlFor="civilStatus"> Civil Status </label>
        <input
          type="text"
          id="civilStatus"
          value={civilStatus}
          name="civilStatus: "
          onChange={handleChange("civilStatus")}
          placeholder=" Civil Status: "
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
          // name="First Name: "
          onChange={handleChange("yrStartedPlaying")}
          // placeholder=" "
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>
      <div className="input-control">
        <label htmlFor="mothersName"> Mother's Name </label>
        <input
          type="text"
          id="mothersName"
          value={mothersName}
          name="Mother's Name: "
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
          placeholder=" Fathers's name: "
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
        <label htmlFor="email"> email </label>
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
        <label htmlFor="email"> homeAddress </label>
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
      <div className="input-control">
        <label htmlFor="weight"> weight </label>
        <input
          type="text"
          id="weight"
          value={weight}
          name="weight"
          onChange={handleChange("weight")}
          placeholder="weight: "
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>
      <div className="input-control">
        <label htmlFor="height"> height </label>
        <input
          type="text"
          id="height"
          value={height}
          name="height"
          onChange={handleChange("height")}
          placeholder="height: "
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
      <div className="submit-btn flex justify-end">
        <Button
          type="submit"
          name="Add Student"
          icon={add}
          padding={"0.8rem 2rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1.2rem"}
          background={"rgb(0, 163, 255)"}
        />
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
`;
export default CreateProfile;