import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Accordian from './Accordian'
import './assets/css/style.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Accordian />
  </StrictMode>,
)
