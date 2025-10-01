import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './Home'
import "./assets/css/style.css"
import About from './About'
import ShowHidePassword from './ShowHidePassword'
import Services from './Services'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Home/>
    <About/> */}
    {/* <ShowHidePassword/> */}

    <Services/>
  </StrictMode>,
)
