import { useState } from 'react'
import Navbar from './assets/components/Navbar'
import { HashRouter, Routes,Route } from 'react-router-dom'
import Home from './assets/components/Home'
import Register from './assets/components/Register'

function App() {

  return (
    <div>
      <HashRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='register' element={<Register/>}></Route>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
