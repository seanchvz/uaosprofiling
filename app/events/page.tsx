"use client"
import { useGlobalState } from '@/app/context/globalProvider';
import React from 'react'
import styled from 'styled-components';
import CreateContent from '../Components/Modals/CreateContent';
import EventItem from '../Components/EventItem/EventItem';

interface Props {
  name: string;
  events: any;
}

function page({name, events}:Props) {
    const {theme} = useGlobalState();
  return (
    <DashboardStyled theme={theme}>
      <h1>{name}</h1>
      <div className="events grid">
        {events && events.map((event) => (
          <EventItem key={event.id} event={{event}} />

        ))}
      </div>
        {/* <CreateContent /> */}
    </DashboardStyled>
    
  )
}

const DashboardStyled = styled.main`
padding: 2rem;  
width:100%;
background-color: ${(props)=> props.theme.colorBg2};
border: 2px solid ${(props) => props.theme.borderColor2};
border-radius: 1rem;
height: 100%;
overflow-y:auto;

&::-webkit-scrollbar {
    width: 0.5rem;
  }

`;

export default page