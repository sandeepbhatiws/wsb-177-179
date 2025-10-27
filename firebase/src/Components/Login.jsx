import React, { useContext, useEffect } from 'react'
import { Context } from './ContextAPI/ContextAPI';
import { useNavigate } from 'react-router';

export default function Login() {

    const { isLogin } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if(isLogin){
            navigate('/')
        }
    },[isLogin])

  return (
    <>
        <div className='text-center p-8 font-bold'>
          <h1>Login</h1>
          </div>
    </>
  )
}
