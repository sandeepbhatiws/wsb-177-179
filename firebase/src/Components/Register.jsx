import React, { useContext, useEffect, useState } from 'react'
import { Context } from './ContextAPI/ContextAPI';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../config/firebase';

export default function Register() {

  const { isLogin, setIsLogin, socialLogin, isGoogleLoading } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate('/')
    }
  }, [isLogin])

  const [isLoading, setIsLoading] = useState(0);

  const registerHandler = (event) => {
    event.preventDefault();
    setIsLoading(1);

    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    }

    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, event.target.email.value, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        setIsLogin(1);
        localStorage.setItem('userLogin', user.uid)
        event.target.reset();
        toast.success('Register Succussfully.')
        setIsLoading(0);
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        setIsLoading(0);
      });


  }

  return (
    <>
      <div className='text-center p-8 font-bold'>
        <h1>Register</h1>
      </div>

      <div>


        <form onSubmit={registerHandler} class="max-w-sm mx-auto" autoComplete='off'>
          <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" id="email" name="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
          </div>
          <div class="mb-5">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" name="password" id="new-password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>

          {
            isLoading
              ?
              <button type="button" class="inline-flex cursor-not-allowed items-center rounded-md bg-indigo-500 px-4 py-2 text-sm leading-6 font-semibold text-white transition duration-150 ease-in-out hover:bg-indigo-400" disabled=""><svg class="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Processing…</button>
              :
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
          }

          {
            isGoogleLoading
              ?
              <button type="button" class="ms-3 inline-flex cursor-not-allowed items-center rounded-md bg-indigo-500 px-4 py-2 text-sm leading-6 font-semibold text-white transition duration-150 ease-in-out hover:bg-indigo-400" disabled=""><svg class="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Processing…</button>
              :
              <button onClick={socialLogin}
                type="button"
                className=" ms-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login with Google
              </button>
          }
        </form>

      </div>
    </>
  )
}
