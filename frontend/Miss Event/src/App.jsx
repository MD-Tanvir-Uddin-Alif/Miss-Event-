import { useState } from 'react'
import Navbar from './assets/components/Navbar'
import { HashRouter, Routes,Route } from 'react-router-dom'
import Home from './assets/components/Home'

function App() {

  return (
    <div>
      <HashRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
