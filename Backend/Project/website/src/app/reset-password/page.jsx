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

    const [registerButton, setRegisterButton] = useState(false);
    const [loginButton, setLoginButton] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const register = (event) => {
        event.preventDefault();
        setRegisterButton(true);

        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/register`, event.target)
        .then((result) => {
            if(result.data._status == true){
                toast.success(result.data._message)
                setRegisterButton(false);
                event.target.reset();
                dispatch(login(result.data._token))
                router.push('/my-dashboard')
            } else {
                toast.error(result.data._message)
                setRegisterButton(false);
            }
        })
        .catch(() => {
            toast.error('Something went wrong !')
            setRegisterButton(false);
        })
    }

    const UserLogin = (event) => {
        event.preventDefault();
        setLoginButton(true);

        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login`, event.target)
        .then((result) => {
            if(result.data._status == true){
                toast.success(result.data._message)
                setLoginButton(false);
                event.target.reset();
                dispatch(login(result.data._token))
                router.push('/my-dashboard')
            } else {
                toast.error(result.data._message)
                setLoginButton(false);
            }
        })
        .catch(() => {
            toast.error('Something went wrong !')
            setLoginButton(false);
        })
    }

  return (
    <div>
    
    <div className="breadcrumbs_area">
        <div className="container">   
            <div className="row">
                <div className="col-12">
                    <div className="breadcrumb_content">
                        <h3>My account</h3>
                        <ul>
                            <li><a href="index.html">home</a></li>
                            <li> {">"}</li>
                            <li>My account</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>         
    </div>

    <div className="customer_login">
        <div className="container">
            <div className="row">
               
                <div className="col-lg-6 col-md-6">
                    <div className="account_form">
                        <h2>login</h2>
                        <form onSubmit={UserLogin} autoComplete='off'>
                            <p>   
                                <label>Email <span>*</span></label>
                                <input type="text" name='email'/>
                             </p>
                             <p>   
                                <label>Passwords <span>*</span></label>
                                <input type="password" name='password'/>
                             </p>   
                            <div className="login_submit">
                               <Link href={`/forgot-password`}>Lost your password?</Link>
                                <button type="submit" disabled= { loginButton }>
                                    {
                                        loginButton
                                        ? 
                                        'Loading....'
                                        :
                                        'Login'
                                    }
                                </button>
                            </div>
                        </form>
                     </div>    
                </div>
                
                <div className="col-lg-6 col-md-6">
                    <div className="account_form register">
                        <h2>Register</h2>
                        <form onSubmit={register} autoComplete='off'>
                            <p>   
                                <label>Name  <span>*</span></label>
                                <input type="text" name='name'/>
                             </p>
                            <p>   
                                <label>Email address  <span>*</span></label>
                                <input type="text" name='email'/>
                             </p>
                             
                             <p>   
                                <label>Passwords <span>*</span></label>
                                <input type="password" name='password'/>
                             </p>
                            <div className="login_submit">
                                <button type="submit" disabled= { registerButton }>
                                    {
                                        registerButton
                                        ? 
                                        'Loading....'
                                        :
                                        'Register'
                                    }
                                </button>
                            </div>
                        </form>
                    </div>    
                </div>
                
            </div>
        </div>    
    </div>
    
    </div>
  )
}
