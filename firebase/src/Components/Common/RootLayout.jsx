import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router'
import Footer from './Footer'
import ContextAPI from '../ContextAPI/ContextAPI.jsx'

export default function RootLayout() {
  return (
    <>
      <ContextAPI>
        <Header/>

        <Outlet/>

        <Footer/>
      </ContextAPI>
    </>
  )
}
