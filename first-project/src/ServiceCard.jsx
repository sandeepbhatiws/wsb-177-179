import React from 'react'

export default function ServiceCard(data) {
    console.log(data.title);
  return (
    <div>
        <h1>{ data.title }</h1>
    </div>
  )
}
