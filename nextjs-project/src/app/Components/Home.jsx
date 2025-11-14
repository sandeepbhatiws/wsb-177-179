"use client"
import Link from 'next/link';
import React, { useState } from 'react'

export default function Home() {

    const [status, setStatus] = useState('');

    console.log(process.env.NEXT_PUBLIC_URL)

    console.log(process.env.NEXT_PUBLIC_APP_PASSWORD)

    console.log(process.env.APP_PASSWORD)

  return (
    <>
    
    
    
    
      Home Page New
    </>
  )
}
