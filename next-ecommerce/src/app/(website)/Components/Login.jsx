"use client"
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

export default function Login() {

    const isLogin = useSelector((state) => {
        return state.login.isLogin
    })

    const router = useRouter();

    useEffect(() => {
        if(isLogin == 1){
            router.push('/')
        }
    },[isLogin])

  return (
    <div>
      Login Page
    </div>
  )
}
