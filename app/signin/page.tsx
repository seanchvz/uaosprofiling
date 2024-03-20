"use client"
import { SignIn } from '@clerk/nextjs'
import React from 'react'
import styled from 'styled-components';

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Adjust the height as needed */
`;

export default function Page() {
  return (
    <CenteredContainer>
      <SignIn />
    </CenteredContainer>
  );
}
