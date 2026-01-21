'use client'
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify';

export default function page() {

    var params = useParams();
    console.log(params.token);

    const [resetPasswordButton, setResetPasswordButton] = useState(false);
    const router = useRouter();

    const resetPassword = (event) => {
        event.preventDefault();
        setResetPasswordButton(true);

        axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/users/reset-password`, event.target)
        .then((result) => {
            if(result.data._status == true){
                toast.success(result.data._message)
                setResetPasswordButton(false);
                event.target.reset();
                router.push('/login-register')
            } else {
                toast.error(result.data._message)
                setResetPasswordButton(false);
            }
        })
        .catch(() => {
            toast.error('Something went wrong !')
            setResetPasswordButton(false);
        })
    }

  return (
    <div>
    
    <div className="breadcrumbs_area">
        <div className="container">   
            <div className="row">
                <div className="col-12">
                    <div className="breadcrumb_content">
                        <h3>Reset Password</h3>
                        <ul>
                            <li><a href="index.html">home</a></li>
                            <li> {">"}</li>
                            <li>Reset Password</li>
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
                        <h2>Reset Password</h2>
                        <form onSubmit={resetPassword} autoComplete='off'>

                            <input type='hidden' value={params.token} name='token'/>
                            <p>   
                                <label>New Password <span>*</span></label>
                                <input type="password" name='new_password'/>
                             </p>
                             <p>   
                                <label>Confirm Password <span>*</span></label>
                                <input type="password" name='confirm_password'/>
                             </p>
                            <div className="login_submit">
                                <button type="submit" disabled= { resetPasswordButton }>
                                    {
                                        resetPasswordButton
                                        ? 
                                        'Loading....'
                                        :
                                        'Reset Password'
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
