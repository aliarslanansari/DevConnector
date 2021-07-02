import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { login } from './../../actions/auth'
import { PropTypes } from 'prop-types'

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  })

  const { email, password } = formData
  const onChange = (e) =>
    setFormData((form) => ({
      ...form,
      [e.target.name]: e.target.value
    }))
  const onSubmit = async (e) => {
    e.preventDefault()
    login({ email, password })
    console.log('Success')
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }
  return (
    <React.Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into your account.
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={onChange}
            value={email}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            onChange={onChange}
            value={password}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </React.Fragment>
  )
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { login })(Login)
