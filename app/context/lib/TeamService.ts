import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export function TeamService(options: {
    setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const donothing = () => { };
    const setIsLoading = options.setIsLoading || donothing;
    const [teams, setTeams] = useState([]);

    // Fetch all teams
    const fetchAllTeams = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/api/teams");
            console.log(response.data);
            // Optionally sort teams if needed
            const sortedTeams = response.data.sort((a, b) => {
                return (
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
            });
            setTeams(sortedTeams);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching teams:", error);
            toast.error("Failed to fetch teams");
            setIsLoading(false);
        }
    };

    // Delete a team
    const deleteTeam = async (id) => {
        setIsLoading(true);
        try {
            await axios.delete(`/api/teams/${id}`);
            toast.success("Team deleted successfully");
            await fetchAllTeams();  // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting team:", error);
            toast.error("Failed to delete team");
        }
        setIsLoading(false);
    };

    // Update a team
    const updateTeam = async (id, updateData) => {
        setIsLoading(true);
        try {
            const response = await axios.patch(`/api/teams/${id}`, updateData);
            toast.success("Team updated successfully");
            await fetchAllTeams();  // Refresh the list after update
            return response.data;  // Return the updated team data
        } catch (error) {
            console.error("Error updating team:", error);
            toast.error("Failed to update team");
            throw error;  // Re-throw error for further handling if needed
        }
        setIsLoading(false);
    };

    return {
        teams,
        fetchAllTeams,
        deleteTeam,
        updateTeam,
    };
}
