import React, { useState } from 'react'

export default function About() {
    
    // var status = 1;

    var [count, setCount] = useState(51);

    // var count = 40;

    const counter = () => {
        count++;
        setCount(count);
        console.log(count);
    }

  return (
    <>
        <button onClick={ counter } >Click Me</button>
        <button>{ count }</button>

        {
            status == 1
            ?
                <h1>About Us</h1>
            :
                ''

        }

        

      
    </>
  )
}
