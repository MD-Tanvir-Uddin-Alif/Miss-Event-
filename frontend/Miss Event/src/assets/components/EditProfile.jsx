import React from 'react'
import { useLocation } from 'react-router-dom'

const EditProfile = () => {
    const location = useLocation();
    const info = location?.state?.info;
  return (
    <div>
        <p>come edit me {info.username} </p>
    </div>
  )
}

export default EditProfile