
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {

  const { logout } = props
  return (
    <div className="navBar">
      <nav>
       
     
     <li> <Link to="/profile">Profile</Link></li>
      <li><Link to="/public">Public</Link></li>
      <button onClick={logout}>Logout</button>

     
     
      </nav>

    </div>
  )
}