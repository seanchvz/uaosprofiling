"use client";
import Image from "next/image";
import Dashboard from "./Components/Dashboard/Dashboard";
import { useGlobalState } from "./context/globalProvider";


export default function Home() {
  const { events } = useGlobalState();
  return <Dashboard name="All Events" events={events} />;
}
