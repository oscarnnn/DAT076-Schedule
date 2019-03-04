import React from 'react'
import { NavLink } from 'react-router-dom'

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