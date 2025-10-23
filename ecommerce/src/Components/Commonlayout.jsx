import React from 'react'
import Header from './Common/Header'
import Footer from './Common/Footer'
import { Outlet } from 'react-router'
import ContextAPI from './Common/ContextAPI'

export default function Commonlayout() {
  return (
    <>
      <ContextAPI>
        <Header />

        <Outlet />

        <Footer />
      </ContextAPI>

    </>
  )
}
