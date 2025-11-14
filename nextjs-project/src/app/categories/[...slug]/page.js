"use client"
import { useParams } from 'next/navigation'
import React from 'react'

export default function page() {

    var params = useParams();
    console.log(params);

  return (
    <div>
      Product Listings
    </div>
  )
}
