"use client"
import React from 'react'
import { useGlobalState } from '../context/globalProvider'
import Page from '../student/page'

export default function StudentScreen(){
    const {studentprofile} = useGlobalState();
    return(
        <Page name="All Student Profiles" studentprofile={studentprofile} />
    )
}