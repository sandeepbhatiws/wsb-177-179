import React, { createContext, useState } from 'react'
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import app from '../../config/firebase';

const Context = createContext();

export default function ContextAPI({children}) {

  const [isLogin, setIsLogin] = useState(localStorage.getItem('userLogin') ?? 0);
  const navigate = useNavigate();

  const [isGoogleLoading, setIsGoogleLoading] = useState(0);

  const socialLogin = () => { 
    const provider = new GoogleAuthProvider();

    setIsGoogleLoading(1);

    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        const user = result.user;
        console.log(user);

        setIsLogin(1);
        localStorage.setItem('userLogin', user.uid)
        toast.success('Login Succussfully.')
        setIsGoogleLoading(0);
        navigate('/')
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        setIsGoogleLoading(0);
      });
  }

  var data = {isLogin, setIsLogin, socialLogin, isGoogleLoading};

  return (
    <>
      <Context.Provider value={ data }>
        { children }
      </Context.Provider>
      
    </>
  )
}

export { Context }