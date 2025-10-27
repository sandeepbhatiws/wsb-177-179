import React, { createContext, useState } from 'react'

const Context = createContext();

export default function ContextAPI({children}) {

  const [isLogin, setIsLogin] = useState(0);

  var data = {isLogin, setIsLogin};

  return (
    <>
      <Context.Provider value={ data }>
        { children }
      </Context.Provider>
      
    </>
  )
}

export { Context }