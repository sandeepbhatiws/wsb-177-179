"use client"
import React, { useState } from 'react'
import "./login-register.css"
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '../ReduxToolkit/loginSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function page() {

    const [forgotPasswordButton, setForgotPasswordButton] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const forgotPassword = (event) => {
        event.preventDefault();
        setForgotPasswordButton(true);

        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/forgot-password`, event.target)
        .then((result) => {
            if(result.data._status == true){
                toast.success(result.data._message)
                setForgotPasswordButton(false);
                event.target.reset();
            } else {
                toast.error(result.data._message)
                setForgotPasswordButton(false);
            }
        })
        .catch(() => {
            toast.error('Something went wrong !')
            setForgotPasswordButton(false);
        })
    }

  return (
    <div>
    
    <div className="breadcrumbs_area">
        <div className="container">   
            <div className="row">
                <div className="col-12">
                    <div className="breadcrumb_content">
                        <h3>Forgot Password</h3>
                        <ul>
                            <li><a href="index.html">home</a></li>
                            <li> {">"}</li>
                            <li>Forgot Password</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>         
    </div>

    <div className="customer_login">
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-3"></div>
                <div className="col-lg-6 col-md-6">
                    <div className="account_form">
                        <h2>Forgot Password</h2>
                        <form onSubmit={forgotPassword} autoComplete='off'>
                            <p>   
                                <label>Email <span>*</span></label>
                                <input type="text" name='email'/>
                             </p>
                            <div className="login_submit">
                                <button type="submit" disabled= { forgotPasswordButton }>
                                    {
                                        forgotPasswordButton
                                        ? 
                                        'Loading....'
                                        :
                                        'Send Email'
                                    }
                                </button>
                            </div>
                        </form>
                     </div>    
                </div>
                <div className="col-lg-3 col-md-3"></div>
            </div>
        </div>    
    </div>
    
    </div>
  )
}
