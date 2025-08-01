import React from 'react'
import { useLocation } from 'react-router-dom'

const EditOrganization = () => {
    const location = useLocation();
    const organize_info = location?.state?.info;

  return (
    <div>you are in organization  {organize_info.address1}</div>
  )
}

export default EditOrganization