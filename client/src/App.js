import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React from 'react'
import Navbar from './components/layouts/Navbar'
import Landing from './components/layouts/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

const App = () => {
  return (
    <Router>
      <React.Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Switch>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>
          </Switch>
        </section>
      </React.Fragment>
    </Router>
  )
}

export default App
