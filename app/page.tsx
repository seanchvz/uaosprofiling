"use client";
import Image from "next/image";
import Dashboard from "./Components/Dashboard/Dashboard";
import { useGlobalState } from "./context/globalProvider";
import { useInventoryGlobalState } from "./context/InventoryGlobalProvider";

export default function Home() {
  const { events } = useGlobalState();
  // const {inventoryItem} = useInventoryGlobalState();
  return <Dashboard name="All Events" events={events} />;
}
