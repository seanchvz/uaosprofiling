"use client"
import { useGlobalState } from '@/app/context/globalProvider';
import React from 'react'
import styled from 'styled-components';
import EventItem from '../EventItem/EventItem';


interface Props {
  name: string;
  events: any;
}

function Dashboard({name, events}:Props) {
    const {theme} = useGlobalState();
  return (
    <DashboardStyled theme={theme}>
      <h1>{name}</h1>
      <div className="events grid">
        {events && events.map((event) => (
          <EventItem key={event.id} 
            name={event.name}
            startDate={event.startDate}
            endDate={event.endDate}
            Sport={event.Sport}
            isExternal={event.isExternal}
            id={event.id}

          />


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

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
     
      border-radius: 0.5rem;
    }
  }

`;

export default Dashboard