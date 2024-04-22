import { initialize } from "next/dist/server/lib/render-server";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

export function CoachProfileService(options: {
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const donothing = () => { };
  const setIsLoading = options.setIsLoading || donothing;
  const [coachprofile, setCoachProfile] = useState([]);

  const fetchAllCoachProfile = async () => {
    // console.log("Fetching all items");
    setIsLoading(true);
    try {
      const res = await axios.get("/api/coachProfiling");
      //   console.log(res.data); 
      const sorted = res.data.sort((a, b) => {
        return (
          new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime()
        );
      });

      setCoachProfile(sorted);
      setIsLoading(false);
    } catch (error) {
      //   console.log(error);
      toast.error("Something Went Wrong");
    }
  };


  return {
    coachprofile,
    fetchAllCoachProfile,

  };
}
