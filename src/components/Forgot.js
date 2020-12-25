import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Forgot() {
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const emailRef = useRef()
  const { resetPassword, currentUser } = useAuth()
  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your email for further instructions')
    } catch {
      setError('Failed to reset password')
    }
    setLoading(false)
  }
  return (
    <div className='d-flex align-items-center justify-content-center mt-5 pt-5'>
      <div className='w-100 ' style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h2 className='text-center mb-4'>Password Reset</h2>
            {currentUser && currentUser.email}
            {error && <Alert variant='danger'>{error}</Alert>}
            {message && <Alert variant='success'>{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' ref={emailRef} required />
              </Form.Group>
              <Button disabled={loading} className='w-100' type='submit'>
                Reset Password
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className='w-100 text-center mt-3'>
          You should try to <Link to='/login'>Login!</Link>
        </div>
        <div className='w-100 text-center mt-2'>
          Do not have an account? <Link to='/signup'>Sign up!</Link>
        </div>
      </div>
    </div>
  )
}
