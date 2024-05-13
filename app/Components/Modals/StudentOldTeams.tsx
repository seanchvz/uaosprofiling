// import { useGlobalState } from "@/app/context/globalProvider";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import styled from "styled-components";

// interface Props {
//   studentProfile?: any;
//   submitState: "create" | "edit";
// }

// function StudentOldTeams(props: Props) {
//   const { teams, closeModal } = useGlobalState(); // Assume similar functions exist in your global context
//   const [teamOptions, setTeamOptions] = useState([]);
//   const [selectedTeams, setSelectedTeams] = useState([]);
//   const [teamDetails, setTeamDetails] = useState([]);
//   const { studentProfile, submitState } = props;

//   useEffect(() => {
//     const fetchTeams = async () => {
//       try {
//         const response = await axios.get("/api/teams");
//         const formattedTeams = response.data.map((team) => ({
//           value: team.id,
//           label: `${team.teamName} - ${new Date(team.year).getFullYear()} - ${
//             team.sport ? team.sport.name : "No Sport"
//           }`,
//           sport: team.sport ? team.sport.name : "No Sport",
//           year: team.year || "Unknown Year", // Directly using the year if it's just a number
//           events: team.events.map((e) => ({
//             id: e.id,
//             name: e.name,
//           })),
//         }));
//         setTeamOptions(formattedTeams);
//         setTeamDetails(formattedTeams);
//         if (submitState === "edit" && studentProfile && studentProfile.teams) {
//           setSelectedTeams(studentProfile.teams.map((t) => t.id));
//         }
//       } catch (error) {
//         toast.error("Failed to load teams");
//       }
//     };

//     fetchTeams();
//   }, [submitState, studentProfile]);

//   const displayTeamDetails = () => {
//     return selectedTeams.map((teamId) => {
//       const team = teamDetails.find((t) => t.value === teamId);
//       if (!team) return null;

//       return (
//         <TeamCard key={teamId}>
//           <Section>
//             <Heading>
//               Team Name: <Label>{team.label}</Label>
//             </Heading>
//           </Section>
//           <Section>
//             <Heading>
//               Team Sport: <Label>{team.sport}</Label>
//             </Heading>
//           </Section>
//           <Section>
//             <Heading>
//               Team Year:{" "}
//               <Label>
//                 {team.year ? new Date(team.year).getFullYear() : "N/A"}
//               </Label>
//             </Heading>
//           </Section>
//           <Section>
//             <Heading>Events Joined with team:</Heading>
//             <ul>
//               {team.events.map((event, index) => (
//                 <ListItem key={event.id}>
//                   {index + 1}. {event.name}
//                 </ListItem>
//               ))}
//             </ul>
//           </Section>
//         </TeamCard>
//       );
//     });
//   };

//   return (
//     <div className="fixed z-10 inset-0 overflow-y-auto">
//       <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//         <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//           <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//         </div>
//         <span
//           className="hidden sm:inline-block sm:align-middle sm:h-screen"
//           aria-hidden="true"
//         >
//           &#8203;
//         </span>
//         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//           <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//             <div className="sm:flex sm:items-start">
//               <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                 <h3
//                   className="text-lg leading-6 font-medium text-gray-900"
//                   id="modal-title"
//                 >
//                   Old Teams
//                 </h3>
//                 {displayTeamDetails()}
//                 <div className="mt-2">
//                   {teams.map((team) => (
//                     <p key={team.id}>{team.name}</p>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//             <button
//               type="button"
//               className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//               onClick={closeModal}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const TeamCard = styled.div`
//   margin-bottom: 20px;
//   border: 1px solid #444;
//   background-color: #222;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
//   padding: 20px;
//   border-radius: 8px;
//   color: #ddd;
// `;

// const Section = styled.div`
//   margin-bottom: 20px;
//   border: 1px solid #444;
//   padding: 10px;
//   background-color: #333;
//   border-radius: 5px;
//   color: #ddd;
// `;

// const Heading = styled.h3`
//   color: #ddd;
//   font-size: 1rem;
//   margin-bottom: 10px;
// `;

// const ListItem = styled.li`
//   margin-bottom: 5px;
//   list-style-type: none;
//   padding-left: 20px;
//   color: #ddd;
// `;

// const Label = styled.span`
//   font-weight: normal;
//   color: #bbb;
// `;

// export default StudentOldTeams;
