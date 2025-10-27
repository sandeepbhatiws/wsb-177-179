import React, { useContext, useEffect } from 'react'
import { Context } from './ContextAPI/ContextAPI';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export default function PlayQuiz() {

    const { isLogin } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLogin){
            toast.error('Login first to continue.');
            navigate('/login')
        }
    },[isLogin])

  return (
    <>
        <div className='text-center p-8 font-bold'>
          <h1>Play Quiz</h1>
          </div>
    </>
  )
}
