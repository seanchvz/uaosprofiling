"use client";
import { SignIn } from "@clerk/nextjs";
import React from "react";
import styled from "styled-components";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url("/addubg.jpeg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: fixed; /* Add this line */
  overflow: auto; /* Add this line */
`;

export default function Page() {
  return (
    <CenteredContainer>
      <SignIn />
    </CenteredContainer>
  );
}
