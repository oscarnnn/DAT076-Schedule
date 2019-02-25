import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
  return (
    <div>
      <ul>
        <li><NavLink to='/signin'>Login</NavLink></li>
        <li><NavLink to='/signup'>Signup</NavLink></li>
      </ul>
    </div>
  )
}

export default SignedOutLinks