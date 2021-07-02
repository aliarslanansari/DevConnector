import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { useEffect } from 'react'
import Navbar from './components/layouts/Navbar'
import Landing from './components/layouts/Landing'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard'
import Login from './components/auth/Login'
import Alert from './components/layouts/Alert'
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth'
import PrivateRoute from './components/routing/PrivateRoute'
import setAuthToken from './utils/setAuthToken'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </section>
        </React.Fragment>
      </Router>
    </Provider>
  )
}

export default App
