import React, { useState } from 'react'
import logo from './assets/images/vite.svg'

export default function ShowHidePassword() {

    const [type, setType] = useState(0);

    const changeType = () => {
        setType(!type);
    }

  return (
    <>
        <img src='/vite.svg' />

        <img src={ logo }/>
        <div style={{ display: `${ type == 0 ? 'none' : '' }`  }}>Show Password</div>

        <input type={ type ? 'text' : 'password' }/>

        <button onClick={ changeType }>
            { type ? 'Hide Password' : 'Show Password' }
        </button>
    </>
  )
}
