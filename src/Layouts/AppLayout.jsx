import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const AppLayout = () => {
  return (
    <div>
        <Navbar />
        <Outlet/>
        <Footer />
    </div>
  )
}

export default AppLayout