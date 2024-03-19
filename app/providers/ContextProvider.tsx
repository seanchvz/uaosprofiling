"use client"
import React, { ReactNode } from 'react'
import GlobalStylesProvider from './GlobalStylesProvider';
import { GlobalProvider } from '../context/globalProvider';

interface Props{
    children:React.ReactNode;
}

function ContextProvider({children}: Props) {
  const[isReady, setIsReady] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => {
        setIsReady(true);
    }, 200);
    setIsReady(true);
  },[]);

  if(!isReady){
    return null;
  }



  return (
        <GlobalProvider>
        {children}
        </GlobalProvider>
  )
  
}

export default ContextProvider