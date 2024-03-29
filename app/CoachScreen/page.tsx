"use client"
import React from 'react'
import { useGlobalState } from '../context/globalProvider'
import Page from '../coach/page';

export default function CoachScreen(){
    const {coachprofile} = useGlobalState();
    return(
        <Page name="All Coach Profiles" coachprofile={coachprofile} />
    )
}