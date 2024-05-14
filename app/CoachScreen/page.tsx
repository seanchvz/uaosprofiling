"use client";
import React from "react";
import { useGlobalState } from "../context/globalProvider";
import Page from "../coach/page";

export default function CoachScreen() {
  const { coachprofile, teams, sports } = useGlobalState();

  return (
    <Page
      name="Coach Profiles"
      coachprofile={coachprofile}
      teams={teams}
      sports={sports}
    />
  );
}
