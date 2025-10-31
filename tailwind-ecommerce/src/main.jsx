import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/style.css';
import Home from './Components/Home.jsx'
import { BrowserRouter, Route, Routes } from 'react-router';
import RootLayout from './Components/Common/RootLayout.jsx';
import ProductListings from './Components/ProductListings.jsx';

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Routes>
        <Route element={<RootLayout/>}>
          <Route path='/' element={<Home/>} />
          <Route path='products' element={<ProductListings/>} />
        </Route>




        <Route path='admin-panel'>
          <Route path='category'>
            <Route path='add' element={<Home/>}></Route>
            <Route path='view' element={<Home/>}></Route>
            <Route path='update' element={<Home/>}></Route>
            <Route path='edit' element={<Home/>}></Route>
          </Route>

          <Route path='materials'>
            <Route path='add' element={<Home/>}></Route>
            <Route path='view' element={<Home/>}></Route>
            <Route path='update' element={<Home/>}></Route>
            <Route path='edit' element={<Home/>}></Route>
          </Route>
        </Route>

        <Route>
          <Route path='admin-panel/sliders/add' element={<Home/>}></Route>
          <Route path='admin-panel/sliders/view' element={<Home/>}></Route>
          <Route path='admin-panel/sliders/update' element={<Home/>}></Route>
          <Route path='admin-panel/sliders/edit' element={<Home/>}></Route>
        </Route>
    </Routes>
  </BrowserRouter>
  
  ,
)
