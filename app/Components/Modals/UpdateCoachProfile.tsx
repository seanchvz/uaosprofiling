"use client"
import { useGlobalState } from "@/app/context/globalProvider";
import { useInventoryGlobalState } from "@/app/context/InventoryGlobalProvider";
import { add } from "@/app/utils/Icons";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";

interface Props {
  name: string;
  contactNumber: string;
  sport: string;
  permanentTeam: string;
  isMale: boolean;
  isFemale: boolean;
  emergencyContact: string;
  emergencyContactPerson: string;
  birthDate: string;
  nationality: string;
  weight: number;
  height: number;
  bloodType: string;
  academicYear: string;
  statusIsFulltime: boolean;
  statusIsParttime: boolean;
  resumeUrl: string;
  email: string;
  id: string;
  // inventory: any;
}

function UpdateCoachProfile({ name, contactNumber, sport, permanentTeam, isMale, isFemale, emergencyContact, emergencyContactPerson, birthDate, nationality, weight, height, bloodType, academicYear, statusIsFulltime, statusIsParttime, resumeUrl, email, id}: Props) {
  const [coachProfile, setCoachProfile] = useState({
    name,
    contactNumber,
    sport,
    email,
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

    // Initialize other fields as needed
  });


  const fetchAllCoachProfile = async () => {
    // console.log("Fetching all items");
    try {
      const res = await axios.get("/api/coachProfiling");
    //   console.log(res.data); 
      const sorted = res.data.sort((a, b) => {
        return (
          new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime()
        );
      });
      setCoachProfile(sorted);
    } catch (error) {
    //   console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const handleChange = (e) => {
    setCoachProfile({
      ...coachProfile,
      [e.target.name]: e.target.value,
    });
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent the default form submission behavior
    try {
      // Replace "/api/updateCoachProfile" with your actual API endpoint
      const response = await axios.patch(`/api/coachProfiling/${id}`, coachProfile);
      if (response.status === 200) {
        toast.success('Profile updated successfully!');
      } else {
        toast.error('Failed to update the profile.');
      }
    } catch (error) {
      console.error('Error updating the profile:', error);
      toast.error('An error occurred while updating the profile.');
    }
  };
    return (
        <CreateCoachProfileStyled onSubmit={handleSubmit}>
        
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">
                  Update Coach Profile
                </h1>
              </div>
             <div className="grid grid-cols-4 md:grid-cols-3 gap-4">
                <div className="input-control">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name={coachProfile.name}
                    placeholder={coachProfile.name}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
                  />
                </div> 
                <div className="input-control">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={coachProfile.email}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
                  />
                </div>
                <div className="input-control">
                  <label htmlFor="contactNumber">Contact Number</label>
                  <input
                    type="text"
                    id="contactNumber"
                    name="contactNumber"  
                    placeholder={coachProfile.contactNumber}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
                  />
                </div>
            
                <div className="input-control">
                  <label htmlFor="sport">Sport</label>
                  <input
                    type="text"
                    id="sport"
                    name="sport"
                    placeholder={coachProfile.sport}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
                  />
                </div>
        
                <div className="input-control">
                  <label htmlFor="permanentTeam">Permanent Team</label>
                  <input
                    type="text"
                    id="permanentTeam"
                    name="permanentTeam"
                    placeholder={coachProfile.permanentTeam}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
                  />
                </div>
        
                <div className="flex">
                  
          <div className="input-control">
            <label htmlFor="isMale" className="text-white">Male</label>
            <input
              type="checkbox"
              id="isMale"
             
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
            />
          </div>
        
          <div className="input-control">
            <label htmlFor="isFemale" className="text-white">Female</label>
            <input
              type="checkbox"
              id="isFemale"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
            />
          </div>
        </div>
        
                <div className="input-control">
                  <label htmlFor="birthDate">Birth Date</label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={coachProfile.birthDate}
                    placeholder="Enter Birth Date"
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
                  />
                </div>
        
                <div className="input-control">
                  <label htmlFor="nationality">Nationality</label>
                  <input
                    type="text"
                    id="nationality"
                    name="nationality"
                    value={coachProfile.nationality}
                    placeholder="Enter Nationality"
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
                  />
                </div>
            
                <div className='flex'>
                <div className="input-control mr-4"> 
          <label htmlFor="weight">Weight in KG</label>
          <input
            type="text"
            id="weight"
            name="weight"
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
                    name="bloodType"
                    placeholder="Enter Blood Type"
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
                  />
                </div>
        
                <div className="input-control">
                  <label htmlFor="academicYear">Academic Year</label>
                  <input
                    type="text"
                    id="academicYear"
                    name="academicYear"
                    placeholder="Enter Academic Year"
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
                  />
                </div>
        
                <div className='flex'>
          <div className="input-control mr-4"> {/* Add right margin */}
            <label htmlFor="statusIsFulltime">Full-time</label>
            <input
              type="checkbox"
              id="statusIsFulltime"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
            />
          </div>
        
          <div className="input-control ml-4"> {/* Add left margin */}
            <label htmlFor="statusIsParttime">Part-time</label>
            <input
              type="checkbox"
              id="statusIsParttime"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
            />
          </div>
        </div>
        
                <div className="input-control">
                  <label htmlFor="emergencyContact">Emergency Contact Number</label>
                  <input
                    type="text"
                    id="emergencyContact"
                    name="emergencyContact"
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
                    name="emergencyContactPerson"
                    placeholder="Enter Emergency Contact Person"
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
                  />
                </div>
        
                <div className="input-control">
                  <label htmlFor="resumeUrl">Resume URL</label>
                  <input
                    type="text"
                    id="resumeUrl"
                    name="resumeUrl"
                    placeholder="Enter Resume URL"
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
                  />
                </div>
        
        <div>
                <div className="submit-btn mt-4 flex justify-center">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
                  >
                    {add}
                    Update Profile
                  </button>
                </div>
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

export default UpdateCoachProfile;