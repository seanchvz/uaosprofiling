import { user } from '@/app/utils/Icons';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export function EventsService(options: {
    setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  }) {

    const donothing = () => {};
    const setIsLoading = options.setIsLoading || donothing;
    const [events, setEvents] = useState([]);
    
    const allEvents = async () => {
        setIsLoading(true);
        try {
          const res = await axios.get("/api/events");
          // console.log(res.data);
          const sorted = res.data.sort((a, b) => {
            return (
              new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime() // after creating an event, the content will add at the top
            );
          });
          setEvents(sorted);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          toast.error("Something Went Wrong");
        }
      };


  return {
    events,
    allEvents, 

  };
  
  
}

