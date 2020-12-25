import React, { useState } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

export default function Navibar() {
  axios.defaults.baseURL = process.env.REACT_APP_FIREBASE_FUNCTION_URL
  const [error, setError] = useState('')
  const { logout, currentUser } = useAuth()
  const history = useHistory()
  if (currentUser) {
    currentUser.getIdToken().then((token) => {
      if (token) {
        const decodedToken = jwtDecode(token)
        if (decodedToken.exp * 1000 < Date.now()) {
          handleLogout()
        } else {
          axios.defaults.headers.common.Authorization = `Bearer ${token}`
        }
      }
    })
  }
  async function handleLogout() {
    setError('')
    try {
      await logout()
      delete axios.defaults.headers.common.Authorization
      history.push('/login')
    } catch {
      setError('Failed to log out')
    }
  }
  const NavRender = () => {
    if (currentUser) {
      return (
        <>
          <Nav.Link href='update-profile'>Update Profile</Nav.Link>
          <Nav.Link href='#features'>Features</Nav.Link>
          <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
        </>
      )
    } else {
      return (
        <>
          <Nav.Link href='signup'>Sign up</Nav.Link>
          <Nav.Link href='login'>Log in</Nav.Link>
          <Nav.Link href='forgot-password'>Forgot Password</Nav.Link>
        </>
      )
    }
  }
  return (
    <div>
      <>
        <Navbar bg='dark' variant='dark'>
          <Navbar.Brand href='#home'>Knitting</Navbar.Brand>
          <Nav className='ml-auto'>
            <NavRender />
          </Nav>
        </Navbar>
        <br />
      </>
    </div>
  )
}

// export default Navibar
