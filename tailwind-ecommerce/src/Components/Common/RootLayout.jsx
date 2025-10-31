import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify'

export default function RootLayout() {
  return (
    <>
        <ToastContainer/>
        <Header/>

        <Outlet/>

        <Footer/>

    </>
  )
}
