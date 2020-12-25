import React, { useState, useEffect } from 'react'
import { Alert, Row, Col, Card, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'

export default function Dashboard() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState()
  const { logout, currentUser } = useAuth()
  const history = useHistory()

  useEffect(() => {
    axios.get('/projects').then((res) => {
      setProjects(res.data)
      setLoading(false)
    })
  }, [])

  const RenderProject = () => {
    if (loading) {
      return <div></div>
    } else {
      return projects.map((project) => (
        <Col sm className='mb-4' key={project.projectId}>
          <Card>
            <Card.Body>
              <h2 className='text-center'>{project.name}</h2>
              {error && <Alert variant='danger'>{error}</Alert>}
              <strong>Description:</strong> {project.description}
              <br />
              <strong>Needle Size:</strong> {project.needleSize}
              <br />
              <strong>Yarn Size:</strong> {project.yarnSize}
              <br />
              <strong>Yarn name:</strong> {project.yarnName}
              <br />
              {/* <strong>Created:</strong> {project.createdAt} */}
              <strong>Parts:</strong>
              {project.parts ? project.parts.join() : ''}
              <br />
              {/* <Link to='/update-profile' className='btn btn-primary w-100 mt-3'>
                Update Profile
              </Link> */}
            </Card.Body>
          </Card>
        </Col>
      ))
    }
  }
  return (
    <>
      <Row md={3} className='mb-4'>
        <RenderProject />
      </Row>
    </>
  )
}
