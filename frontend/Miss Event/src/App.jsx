import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from './assets/components/Navbar'
import { HashRouter, Routes,Route } from 'react-router-dom'
import Home from './assets/components/Home'
import Register from './assets/components/Register'
import Login from './assets/components/Login'
import Profile from './assets/components/Profile'
import PrivateRoute from './utils/PrivateRoute'
import DashboardLayout from './assets/components/DashboardLayout'
import EditProfile from './assets/components/EditProfile'
import EditOrganization from './assets/components/EditOrganization'
import ResetPassword from './assets/components/ResetPassword'

function App() {

  return (
    <div>
      <Toaster/>
      <HashRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='register' element={<Register/>}></Route>
          <Route path='login' element={<Login/>}></Route>
          <Route path='profile' element={<PrivateRoute><Profile/></PrivateRoute>}></Route>
          <Route path='profile/edit' element={<PrivateRoute><EditProfile/></PrivateRoute>}></Route>
          <Route path='reset-password' element={<PrivateRoute><ResetPassword/></PrivateRoute>}></Route>
          <Route path='organization_info/edit' element={<PrivateRoute><EditOrganization/></PrivateRoute>}></Route>
          <Route path='dashboard' element={<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>}>
            <Route path='profile' element={<Profile/>}/>
          </Route>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
