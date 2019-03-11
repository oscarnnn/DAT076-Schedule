import React from 'react'
import { NavLink } from 'react-router-dom'

//This component will handle which links in the navbar that should be visible when the user is logged out

const SignedOutLinks = () => {
  return (
    <div>
      <ul>
        <li><NavLink to='/signin'>Log In</NavLink></li>
        <li><NavLink to='/signup'>Sign Up</NavLink></li>
      </ul>
    </div>
  )
}

export default SignedOutLinks