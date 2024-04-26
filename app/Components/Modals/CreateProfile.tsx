import { useGlobalState } from "@/app/context/globalProvider";
import React, { useEffect, useState } from "react";
import styled from "styled-components"; // Import styled-components// Assuming Button component exists
import { add } from "@/app/utils/Icons"; // Assuming Icons are imported
import Button from "../Button/Button";
import axios from "axios";
import toast from "react-hot-toast";

interface Props {
  student?: any;
  submitState: "create" | "edit";
}

// Create profile function component
function CreateProfile(props: Props) {
  const { student, submitState } = props;
  const [firstName, setfirstName] = useState(student ? student.firstName : "");
  const [middleName, setmiddleName] = useState(
    student ? student.middleName : ""
  );
  const [lastName, setlastName] = useState(student ? student.lastName : "");
  const [contactNumber, setContactNumber] = useState(
    student ? student.contactNumber : ""
  );
  const [birthDate, setBirthdate] = useState(student ? student.Birthdate : "");
  const [nationality, setNationality] = useState(
    student ? student.Nationality : ""
  );
  const [weight, setWeight] = useState(student ? student.Weight : "");
  const [height, setHeight] = useState(student ? student.Height : "");
  const [bloodType, setbloodType] = useState(student ? student.bloodType : "");
  const [academicYear, setAcademicYear] = useState(
    student ? student.AcademicYear : ""
  );
  const [isMale, setIsMale] = useState(student ? student.isMale : false);
  const [isFemale, setIsFemale] = useState(student ? student.isFemale : false);
  const [yrStartedPlaying, setyrStartedPlaying] = useState(
    student ? student.yrStartedPlaying : ""
  );
  const [mothersName, setMothersName] = useState(
    student ? student.MothersName : ""
  );
  const [fathersName, setFathersName] = useState(
    student ? student.FathersName : ""
  );
  const [guardiansName, setGuardiansName] = useState(
    student ? student.GuardiansName : ""
  );
  const [courseAndYear, setCourseAndYear] = useState(
    student ? student.CourseAndYear : ""
  );
  const [emergencyContactNumber, setEmergencyContactNumber] = useState(
    student ? student.EmergencyContactNumber : ""
  );
  const [emergencyContactPerson, setEmergencyContactPerson] = useState(
    student ? student.EmergencyContactPerson : ""
  );
  const [email, setEmail] = useState(student ? student.Email : "");
  const [homeAddress, setHomeAddress] = useState(
    student ? student.HomeAddress : ""
  );
  const [remarks, setRemarks] = useState(student ? student.Remarks : "");
  const [statusIsActive, setStatusIsActive] = useState(false);
  const [statusIsInactive, setStatusIsInactive] = useState(false);
  const [userId, setUserId] = useState(student ? student.UserId : "");
  const [id, setId] = useState(student ? student.id : "");
  const { fetchAllStudentProfile, closeModal } = useGlobalState();

  // Handle change function for form fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (name === "isMale") setIsMale(checked);
      if (name === "isFemale") setIsFemale(checked);
      if (name === "statusIsActive") setStatusIsActive(checked);
      if (name === "statusIsInactive") setStatusIsInactive(checked);
    } else {
      switch (name) {
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
        case "remarks":
          setRemarks(value);
          break;
        case "userId":
          setUserId(value);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (submitState === "edit" && student) {
      setfirstName(student.firstName);
      setmiddleName(student.middleName);
      setlastName(student.lastName);
      setContactNumber(student.contactNumber);
      setBirthdate(student.birthDate);
      setNationality(student.nationality);
      setWeight(student.weight);
      setHeight(student.height);
      setbloodType(student.bloodType);
      setAcademicYear(student.academicYear);
      setIsMale(student.isMale);
      setIsFemale(student.isFemale);
      setyrStartedPlaying(student.yrStartedPlaying);
      setMothersName(student.mothersName);
      setFathersName(student.fathersName);
      setGuardiansName(student.guardiansName);
      setCourseAndYear(student.courseAndYear);
      setEmergencyContactNumber(student.emergencyContactNumber);
      setEmergencyContactPerson(student.emergencyContactPerson);
      setEmail(student.email);
      setHomeAddress(student.homeAddress);
      setRemarks(student.remarks);
      setStatusIsActive(student.statusIsActive);
      setStatusIsInactive(student.statusIsInactive);
      setUserId(student.userId);
    }
  }, [submitState, student]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      id,
    };
    //to touch pa lang
    //determine if mag create ng new event or mag update
    if (submitState === "edit") {
      // API call to update the event
      try {
        const response = await axios.patch(
          `/api/studentProfiling/${student.id}`,
          student
        );
        toast.success("Student updated successfully!");
        // Refresh events list or handle state update
      } catch (error) {
        console.error("Failed to update the student:", error);
        toast.error("Error updating student");
      }
    } else {
      // API call to create a new event
      try {
        const response = await axios.post("/api/studentProfiling", student);
        toast.success("student created successfully!");
        fetchAllStudentProfile();
        closeModal();
      } catch (error) {
        console.error("Failed to create the student:", error);
        toast.error("Error creating student");
      }
    }
    // Optionally close the modal after operation
    closeModal();
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const studentId = "existing-student-id"; // id of the event thats being edited
      const res = await axios.put(
        `/api/studentProfiling/${studentId}`,
        student
      );

      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        toast.success("student updated successfully.");
        fetchAllStudentProfile(); // fetches all events and updates the state
        closeModal();
      }
    } catch (error) {
      toast.error("Something went wrong during student update.");
      console.log(error);
    }
  };
  return (
    <CreatestudentStyled onSubmit={handleSubmit}>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Add a Student Profile</h1>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-3 gap-4">
        <div className="input-control">
          <label htmlFor="name"> First Name: </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            name="firstName"
            onChange={handleChange}
            placeholder="First name"
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
            name="lastName"
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>
        <div className="input-control">
          <label htmlFor="contactNumber"> Contact Number </label>
          <input
            type="text"
            id="contactNumber"
            value={contactNumber}
            name="contactNumber"
            onChange={handleChange}
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
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <div className="input-control">
          <label htmlFor="nationality"> Nationality </label>
          <input
            type="text"
            id="nationality"
            value={nationality}
            name="nationality"
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            placeholder="e.g. 2021-2022"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <div className="input-control">
          <label>
            <input
              id="isMale"
              type="checkbox"
              checked={isMale}
              onChange={handleChange}
              name="isMale"
            />
            Male
          </label>
        </div>
        <div className="input-control">
          <label>
            <input
              id="isFemale"
              type="checkbox"
              checked={isFemale}
              onChange={handleChange}
              name="isFemale"
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
            onChange={handleChange}
            name="yrStartedPlaying"
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
            name="mothersName"
            onChange={handleChange}
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
            name="fathersName"
            onChange={handleChange}
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
            name="guardiansName"
            onChange={handleChange}
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
            name="courseAndYear"
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            placeholder="homeAddress: "
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <div className="flex">
          <div className="input-control flex justify-between mr-4">
            <label
              htmlFor="statusIsActive"
              className="flex items-center cursor-pointer"
            >
              <span className="mr-2 text-white">Is an Active Athlete</span>
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
              className="flex items-center cursor-pointer"
            >
              <span className="mr-2 text-white">Is an Inactive Athlete</span>
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
          <div className="input-control">
            <label htmlFor="remarks" className="block">
              Remarks
            </label>
            <textarea
              id="remarks"
              value={remarks}
              onChange={handleChange}
              placeholder="Enter student remarks"
              name="remarks"
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
            {submitState === "edit" ? "Update Profile" : "Create Profile"}
          </button>
        </div>
      </div>
    </CreatestudentStyled>
  );
}
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
