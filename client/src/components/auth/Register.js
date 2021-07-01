import axios from 'axios'
import React from 'react'

const Register = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = formData
  const onChange = (e) =>
    setFormData((form) => ({
      ...form,
      [e.target.name]: e.target.value
    }))
  const onSubmit = async (e) => {
    e.preventDefault()
    if (password !== password2) {
      console.log('Password mismatch', formData)
    } else {
      const newUser = { name, email, password }
      try {
        const res = await axios.post('http://localhost:5000/api/users', newUser)
        console.log(res.data, newUser)
      } catch (error) {
        console.error(error, newUser)
      }
    }
  }

  return (
    <React.Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            required
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={onChange}
            value={email}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            onChange={onChange}
            value={password2}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </React.Fragment>
  )
}

export default Register
