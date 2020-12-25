import React from 'react'
import Signup from './Signup'
import { Container } from 'react-bootstrap'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import Forgot from './Forgot'
import UpdateProfile from './UpdateProfile'
import Navibar from './Navibar'
function App() {
  return (
    <>
      <AuthProvider>
        <Navibar></Navibar>

        <Router>
          <Container
            className=' align-items-center justify-content-center'
            style={{ minHeight: '100vh' }}
          >
            <Switch>
              <PrivateRoute exact path='/' component={Dashboard} />
              <PrivateRoute path='/update-profile' component={UpdateProfile} />
              <Route path='/signup' component={Signup} />
              <Route path='/login' component={Login} />
              <Route path='/forgot-password' component={Forgot} />
            </Switch>
          </Container>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
