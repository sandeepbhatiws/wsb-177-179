"use client"
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Provider } from 'react-redux'
import { reduxStore } from '../../Redux Toolkit/ReduxStore'
import { ToastContainer } from 'react-toastify'

export default function MainLayout({children}) {
  return (
    <>
    <Provider store={ reduxStore }>
        <ToastContainer/>
        <Header/>
        {children}
        <Footer/>
    </Provider>
    </>
  )
}
