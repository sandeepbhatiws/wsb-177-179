import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { reduxStore } from '../../Redux Toolkit/ReduxStore'

export default function RootLayout() {
  return (
    <>
      <Provider store={ reduxStore }>
        <ToastContainer />
        <Header />

        <Outlet />

        <Footer />
      </Provider>



    </>
  )
}
