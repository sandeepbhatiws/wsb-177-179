"use client"

import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Provider } from 'react-redux'
import { store } from '../ReduxToolkit/store'

export default function CommonLayout({ children }) {
    return (
        <>
            <Provider store={store}>
                <Header />
                {children}
                <Footer />
            </Provider>
        </>
    )
}
