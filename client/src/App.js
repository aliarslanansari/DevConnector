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
import CreateProfile from './components/profile-forms/CreateProfile'
import EditProfile from './components/profile-forms/EditProfile'
import AddExperience from './components/profile-forms/AddExperience'
import AddEducation from './components/profile-forms/AddEducation'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
import ErrorBoundary from './components/error-boundary/ErrorBoundary'
import Post from './components/post/Post'
import NotFoundPage from './components/layouts/NotFoundPage'
import axios from 'axios'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_BASEURL

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <Alert />
          <Navbar />
          <ErrorBoundary>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/posts/:postId" component={Post} />
              <Route exact path="/*" component={NotFoundPage} />
            </Switch>
          </ErrorBoundary>
        </React.Fragment>
      </Router>
    </Provider>
  )
}

export default App
