import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

export function TeamService(options: {
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const doNothing = () => {};
  const setIsLoading = options.setIsLoading || doNothing;
  const [teams, setTeams] = useState([]);

  // Fetch all teams from the server
  const fetchTeams = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/teams");
      // Assuming teams have a `createdAt` property to sort by
      const sorted = res.data.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
      setTeams(sorted);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching teams");
      setIsLoading(false);
    }
  };

  return {
    teams,
    fetchTeams,
  };
}
