import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup, currentUser } = useAuth()
  const history = useHistory()
  async function handleSubmit(event) {
    event.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Password do not match')
    }

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push('/')
    } catch {
      setError('Failed to create an account')
    }
    setLoading(false)
  }
  return (
    <div className='d-flex align-items-center justify-content-center mt-5 pt-5'>
      <div className='w-100 ' style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h2 className='text-center mb-4'>Sign up</h2>
            {currentUser && currentUser.email}
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' ref={emailRef} required />
              </Form.Group>
              <Form.Group id='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' ref={passwordRef} required />
              </Form.Group>
              <Form.Group id='password-confirm'>
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type='password'
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>
              <Button disabled={loading} className='w-100' type='submit'>
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
          Already have an account? <Link to='/login'>Log in</Link>
        </div>
      </div>
    </div>
  )
}
