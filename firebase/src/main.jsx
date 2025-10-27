import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./assets/css/style.css"
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './Components/Home'
import RootLayout from './Components/Common/RootLayout'
import AddQuiz from './Components/AddQuiz'
import ViewQuiz from './Components/ViewQuiz'
import PlayQuiz from './Components/PlayQuiz'
import Login from './Components/Login'
import Register from './Components/Register'

createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
        <Routes>
             <Route element={<RootLayout/> }>
                <Route path='/' element={<Home/>} />
                <Route path='/add-quiz' element={<AddQuiz/>} />
                <Route path='/view-quiz' element={<ViewQuiz/>} />
                <Route path='/play-quiz' element={<PlayQuiz/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
             </Route>

        </Routes>
    </BrowserRouter>
  </>,
)
