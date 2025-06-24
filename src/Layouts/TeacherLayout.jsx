import React from 'react'
import { Outlet } from 'react-router-dom'

const TeacherLayout = () => {
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default TeacherLayout