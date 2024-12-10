
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from './NavBar'

function Commonlayout() {
  const location = useLocation()
  return (
    <div className='container mx-auto px-2'>
{
  !location.pathname.includes('/course-progress') ?    <NavBar/> : null
}
        <Outlet/>
    </div>
  )
}

export default Commonlayout