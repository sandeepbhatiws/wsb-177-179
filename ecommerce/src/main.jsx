import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './Components/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/css/style.css'
import ProductListing from './Components/ProductListing'
import { BrowserRouter, Route, Routes } from 'react-router'
import AboutUs from './Components/AboutUs'
import Commonlayout from './Components/Commonlayout'

createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <Routes>

        {/* <Route path='/' element={ <Home/> } />
        <Route path='about-us' element={ <AboutUs/> }/>
        <Route path='products' element={ <ProductListing/> }/> */}

        <Route element={<Commonlayout/>}>
            <Route path='/' element={ <Home/> } />
            <Route path='about-us' element={ <AboutUs/> }/>
            
        </Route>

        <Route path='products' element={ <ProductListing/> }/>

      </Routes>
    </BrowserRouter>
  </>,
)
