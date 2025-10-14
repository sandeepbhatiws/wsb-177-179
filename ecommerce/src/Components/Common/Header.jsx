import React from 'react'
import { Link } from 'react-router'
import { ToastContainer } from 'react-toastify'

export default function Header() {
    return (
        <>
            <ToastContainer/>
            <div className='container-fluid bg-primary'>
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
                                    Navbar text with an inline element
                                </span>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}
