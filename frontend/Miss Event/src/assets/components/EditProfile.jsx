import React from 'react'
import { useLocation } from 'react-router-dom'

const EditProfile = () => {
    const location = useLocation();
    const profile_info = location?.state?.profile_info;
  return (
    <div>
        <p>come edit me  {profile_info.username}</p>
    </div>
  )
}

export default EditProfile