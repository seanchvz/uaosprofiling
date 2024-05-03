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
  const [sport, setSport] = useState(
    studentProfile ? studentProfile.sport : ""
  );
  const [bloodType, setbloodType] = useState(
    studentProfile ? studentProfile.bloodType : ""
  );
  const [academicYear, setAcademicYear] = useState(
    studentProfile ? studentProfile.AcademicYear : ""
  );
  const [isMale, setIsMale] = useState(
    studentProfile ? studentProfile.isMale : false
  );
  const [isFemale, setIsFemale] = useState(
    studentProfile ? studentProfile.isFemale : false
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

  // Assuming you fetch events somewhere in your component or get them passed down as props:
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events");
        const options = response.data.map((event) => ({
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
  // Handle change function for form fields
  const handleChange = (e) => {
    const { name, checked, value } = e.target;

    if (name === "statusIsActive") {
      setStatusIsActive(checked); // Set active status based on checkbox
      if (checked) setStatusIsInactive(false); // Automatically uncheck inactive if active is checked
    } else if (name === "statusIsInactive") {
      setStatusIsInactive(checked); // Set inactive status based on checkbox
      if (checked) setStatusIsActive(false); // Automatically uncheck active if inactive is checked
    } else {
      // Handling for other input types remains the same
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
        case "sport":
          setSport(value);
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
    if (submitState === "edit" && studentProfile) {
      setfirstName(studentProfile.firstName);
      setmiddleName(studentProfile.middleName);
      setlastName(studentProfile.lastName);
      setContactNumber(studentProfile.contactNumber);
      setBirthdate(studentProfile.birthDate);
      setNationality(studentProfile.nationality);
      setWeight(studentProfile.weight);
      setHeight(studentProfile.height);
      setSport(studentProfile.sport);
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
      setRemarks(studentProfile.remarks);
      setStatusIsActive(studentProfile.statusIsActive);
      setStatusIsInactive(studentProfile.statusIsInactive);
      setUserId(studentProfile.userId);
    }
  }, [submitState, studentProfile]);
  useEffect(() => {
    const fetchStudentDetails = async () => {
      if (submitState === "edit" && studentProfile) {
        setfirstName(studentProfile.firstName);
        setmiddleName(studentProfile.middleName);
        setlastName(studentProfile.lastName);
        setContactNumber(studentProfile.contactNumber);
        setBirthdate(studentProfile.birthDate);
        setNationality(studentProfile.nationality);
        setWeight(studentProfile.weight);
        setHeight(studentProfile.height);
        setSport(studentProfile.sport);
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
        setRemarks(studentProfile.remarks);
        setStatusIsActive(studentProfile.statusIsActive);
        setStatusIsInactive(studentProfile.statusIsInactive);
        setUserId(studentProfile.userId);

        if (studentProfile.events && studentProfile.events.length > 0) {
          setSelectedEventIds(
            studentProfile.events.map((s: { id: number }) => s.id)
          );
        }
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
    console.log("Updated eventOptions state:", eventOptions);
  }, [eventOptions]);

  useEffect(() => {
    // to see if they are selected
    console.log("Current selectedEventIds:", selectedEventIds);
  }, [selectedEventIds]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const studentProfile = {
      firstName,
      middleName,
      lastName,
      contactNumber,
      birthDate,
      nationality,
      weight,
      height,
      sport,
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
      eventIds: selectedEventIds,
    };

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
        console.log("Sending PATCH request for coach ID:", studentProfile.id);
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
    birthDate: string;
    nationality: string;
    weight?: number;
    height?: number;
    sport?: string;
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
    userId: string;
    id: string;
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

  return (
    <CreatestudentStyled onSubmit={handleSubmit}>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Student Details</h1>
      </div>
      {submitState === "edit" && (
        <>
          <h2>Selected Events</h2>
        </>
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

      <div className="grid grid-cols-4 md:grid-cols-3 gap-4">
        <div className="input-control">
          <label htmlFor="name"> First Name: </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            name="firstName"
            onChange={handleChange}
            placeholder="Enter First Name"
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
            placeholder="Enter Middle Name"
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
            placeholder="Enter Last Name"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <div className="input-control">
          <label htmlFor="sport" className="block">
            Sport
          </label>
          <input
            type="text"
            id="sport"
            value={sport}
            name="sport"
            onChange={handleChange}
            placeholder="e.g. Basketball Men"
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
            placeholder="e.g. 0987654321 "
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
            placeholder="Enter Nationality"
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
          <label htmlFor="bloodType"> Blood Type </label>
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
        <span className="text-white">Sex</span>
        <div className="flex">
          <div className="input-control flex justify-between">
            <label
              htmlFor="isMale"
              className="flex items-center cursor-pointer"
            >
              <span className="mr-10 text-white">Male</span>
              <input
                type="radio"
                id="isMale"
                checked={isMale}
                onChange={handleChange}
                name="gender"
                value="male"
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
                type="radio"
                id="isFemale"
                checked={isFemale}
                onChange={handleChange}
                name="gender"
                value="female"
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
          <label htmlFor="mothersName"> Mother's Name </label>
          <input
            type="text"
            id="mothersName"
            value={mothersName}
            name="mothersName"
            onChange={handleChange}
            placeholder=" Mother's name "
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
            placeholder="e.g. IT3A"
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
            placeholder="Enter Emergency Contact Number"
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
            placeholder="Email"
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
            placeholder="e.g. Davao City"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>

        <span className="text-white">Status</span>
        <div className="flex">
          <div className="input-control flex justify-between mr-4">
            <label
              htmlFor="statusIsActive"
              className="flex items-center cursor-pointer"
            >
              <span className="mr-2 text-white">Active</span>
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
              <span className="mr-2 text-white">Inactive</span>
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
          <label htmlFor="remarks" className="block">
            Remarks
          </label>
          <textarea
            id="remarks"
            value={remarks}
            onChange={handleChange}
            placeholder="Enter Student remarks"
            name="remarks"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
            rows={4}
          ></textarea>
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
