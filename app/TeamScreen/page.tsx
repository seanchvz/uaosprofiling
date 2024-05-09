"use client";
import Image from "next/image";
import React from "react";
import { useGlobalState } from "../context/globalProvider";
import Page from "../teams/page";

export default function TeamScreen() {
  const { teams } = useGlobalState();
  return <Page name="All Teams" teams={teams} />;
}
