import { initialize } from "next/dist/server/lib/render-server";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

export function InventoryItemService(options: {
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const donothing = () => {};
  const setIsLoading = options.setIsLoading || donothing;
  const [InventoryItem, setInventoryItem] = useState([]);

  const fetchAllInventoryItems = async () => {
    // console.log("Fetching all items");
    setIsLoading(true);
    try {
      const res = await axios.get("/api/inventory");
      console.log(res.data);
      const sorted = res.data.sort((a, b) => {
        return (
          new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime() // after creating an event, the content will add at the top
        );
      });
      setInventoryItem(sorted);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  return {
    InventoryItem,
    fetchAllInventoryItems,
    // : fetchAllItems,
  };
}
