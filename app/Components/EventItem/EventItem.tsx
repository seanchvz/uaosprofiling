import { edit, trash } from '@/app/utils/Icons';
import React from 'react'

interface Props{
    // event: any;
    name:string;
    startDate: string;
    endDate: string;
    Sport:string;
    isExternal:boolean;
    id:string;
}

function EventItem({name, startDate, endDate, Sport, isExternal, id}:Props) {

    // const { name, startDate, endDate, Sport, eventDetails, isExternal, isInternal } = event;

  return (
    <div>
        <h1> {name}</h1>
        <p> {Sport}</p>
        <p className="date"> {startDate}</p>
        <div className="event-footer">
            {isExternal ? (
            <button className="isExternal">External</button>
            ) : (
            <button className="isInternal">Internal</button> 
        )}
        <button className="edit">{edit}</button>
        <button className="delete">{trash}</button>
            {/* <button className="completed">External</button> */}
        </div>
        <p> {endDate}</p>

    </div>
  )
}

export default EventItem