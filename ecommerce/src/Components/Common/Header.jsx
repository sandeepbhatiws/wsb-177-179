import React, { useContext, useState } from 'react'
import { Link } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { Context } from './ContextAPI';

export default function Header() {

    const {cartItems} = useContext(Context);

    return (
        <>
            <ToastContainer/>
            <div className='container-fluid bg-primary position-sticky top-0'>
                <div className='container'>
                    <nav class="navbar navbar-expand-lg">
                        <div class="container-fluid">
                            <Link class="navbar-brand" to="/">
                                <img src='https://www.wscubetech.com/images/ws-cube-white-logo.svg' className='logo'/>
                            </Link>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarText">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li class="nav-item">
                                        <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" to="/about-us">About Us</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" to="/products">Products</Link>
                                    </li>
                                </ul>
                                <span class="navbar-text">
                                    <Link to={`/view-carts`}>
                                        <button className='btn btn-warning' >View cart ({ cartItems.length })</button>
                                    </Link>
                                    
                                </span>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}
