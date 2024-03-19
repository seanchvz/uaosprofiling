"use client"
import { useGlobalState } from '@/app/context/globalProvider';
import React from 'react'
import styled from 'styled-components';
import CreateContent from '../Modals/CreateContent';

function Dashboard() {
    const {theme} = useGlobalState();
  return (
    <DashboardStyled theme={theme}>
        <CreateContent />
    </DashboardStyled>
    
  )
}

const DashboardStyled = styled.main`
padding: 2rem;
width:100%;
background-color: ${(props)=> props.theme.colorBg2};
border: 4px solid ${(props) => props.theme.borderColor2};
border-radius: 1rem;
height: 100%;
overflow-y:auto;

&::-webkit-scrollbar {
    width: 0.5rem;
  }

`;

export default Dashboard