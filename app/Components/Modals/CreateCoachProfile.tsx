import { useGlobalState } from "@/app/context/globalProvider";
import { useInventoryGlobalState } from "@/app/context/InventoryGlobalProvider";
import { add } from "@/app/utils/Icons";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";

function CreateCoachProfile() {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [sport, setSport] = useState("");
  const [permanentTeam, setPermanentTeam] = useState("");
  const [isMale, setIsMale] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState("");
  const [emergencyContactPerson, setEmergencyContactPerson] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [nationality, setNationality] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bloodType, setBloodType] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [statusIsFulltime, setStatusIsFulltime] = useState(false);
  const [statusIsParttime, setStatusIsParttime] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  const { fetchAllCoachProfile, closeModal } = useGlobalState();

  const handleChange = (name: string) => (e: any) => {
    switch (name) {
      case "name":
        setName(e.target.value);
        break;
      case "contactNumber":
        setContactNumber(e.target.value);
        break;
      case "sport":
        setSport(e.target.value);
        break;
      case "permanentTeam":
        setPermanentTeam(e.target.value);
        break;
      case "isMale":
        setIsMale(e.target.checked); // Assuming the value is received as string
        break;
      case "isFemale":
        setIsFemale(e.target.checked); // Assuming the value is received as string
        break;
      case "emergencyContact":
        setEmergencyContact(e.target.value);
        break;
      case "emergencyContactPerson":
        setEmergencyContactPerson(e.target.value);
        break;
      case "birthDate":
        setBirthDate(e.target.value);
        break;
      case "nationality":
        setNationality(e.target.value);
        break;
      case "weight":
        setWeight(parseFloat(e.target.value));
        break;
      case "height":
        setHeight(parseFloat(e.target.value));
        break;
      case "bloodType":
        setBloodType(e.target.value);
        break;
      case "academicYear":
        setAcademicYear(e.target.value);
        break;
      case "statusIsFulltime":
        setStatusIsFulltime(e.target.checked); // Assuming the value is received as string
        break;
      case "statusIsParttime":
        setStatusIsParttime(e.target.checked); // Assuming the value is received as string
        break;
      case "resumeUrl":
        setResumeUrl(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
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

    const coachProfile = {
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
      userId,
    };
    try {
      const res = await axios.post("/api/coachProfiling", coachProfile);

      if (res.data.error) {
        toast.error(res.data.error);
      }

      if (!res.data.error) {
        toast.success("Coach created successfully.");
        fetchAllCoachProfile();
        closeModal();
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-lg">
      <div className="mb-8">
        {" "}
        {/* Add margin-bottom */}
        <h1 className="text-4xl font-bold mb-4">
          Create an Inventory Item
        </h1>{" "}
        {/* Add margin-bottom */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="input-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            name="name"
            onChange={handleChange("name")}
            placeholder="Enter Fullname"
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
            onChange={handleChange("contactNumber")}
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
            onChange={handleChange("sport")}
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
            onChange={handleChange("permanentTeam")}
            placeholder="Enter Permanent Team"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <div className="input-control">
          <label htmlFor="isMale">Is Male</label>
          <input
            type="checkbox"
            id="isMale"
            checked={isMale}
            onChange={handleChange("isMale")}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <div className="input-control">
          <label htmlFor="isFemale">Is Female</label>
          <input
            type="checkbox"
            id="isFemale"
            checked={isFemale}
            onChange={handleChange("isFemale")}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <div className="input-control">
          <label htmlFor="emergencyContact">Emergency Contact</label>
          <input
            type="text"
            id="emergencyContact"
            value={emergencyContact}
            name="emergencyContact"
            onChange={handleChange("emergencyContact")}
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
          <label htmlFor="birthDate">Birth Date</label>
          <input
            type="date"
            id="birthDate"
            value={birthDate}
            name="birthDate"
            onChange={handleChange("birthDate")}
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
            onChange={handleChange("nationality")}
            placeholder="Enter Nationality"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <div className="input-control">
          <label htmlFor="weight">Weight</label>
          <input
            type="number"
            id="weight"
            value={weight}
            name="weight"
            onChange={handleChange("weight")}
            placeholder="Enter Weight"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <div className="input-control">
          <label htmlFor="height">Height</label>
          <input
            type="number"
            id="height"
            value={height}
            name="height"
            onChange={handleChange("height")}
            placeholder="Enter Height"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <div className="input-control">
          <label htmlFor="bloodType">Blood Type</label>
          <input
            type="text"
            id="bloodType"
            value={bloodType}
            name="bloodType"
            onChange={handleChange("bloodType")}
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
            onChange={handleChange("academicYear")}
            placeholder="Enter Academic Year"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <div className="input-control">
          <label htmlFor="statusIsFulltime">Status Is Fulltime</label>
          <input
            type="checkbox"
            id="statusIsFulltime"
            checked={statusIsFulltime}
            onChange={handleChange("statusIsFulltime")}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <div className="input-control">
          <label htmlFor="statusIsParttime">Status Is Parttime</label>
          <input
            type="checkbox"
            id="statusIsParttime"
            checked={statusIsParttime}
            onChange={handleChange("statusIsParttime")}
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
            onChange={handleChange("resumeUrl")}
            placeholder="Enter Resume URL"
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
            onChange={handleChange("email")}
            placeholder="Enter Email"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <div className="submit-btn mt-4 flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            {add}
            Create Coach Profile
          </button>
        </div>
      </div>
    </form>
  );
}

const CreateCoachProfileStyled = styled.form`
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

export default CreateCoachProfile;
