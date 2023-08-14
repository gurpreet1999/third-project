import React from 'react'
import "./App.css"
import Home from './pages/home/Home'
import {BrowserRouter ,Routes,Route } from "react-router-dom"
import Watch from './pages/watch/Watch'
import MovieUpload from './components/movieUploadPage/MovieUpload'
import MovieList from './components/MovieList/MovieList'

const App = () => {
  return (

    <BrowserRouter>
    
<Routes>
<Route path='/' element={<MovieUpload/>}  />
<Route path='/watch/:id' element={<Watch/>}  />
<Route path='/movies' element={<MovieList/>}  />


</Routes>

    
    </BrowserRouter>
  )
}

export default App