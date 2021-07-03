import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addExperience } from './../../actions/profile'
import { Link, withRouter } from 'react-router-dom'
import React, { Fragment, useState } from 'react'

const AddExperience = ({ history, addExperience }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  })
  //   const [isToDateDisabled, setIsToDateDisabled] = useState(false)

  const onChange = (e) =>
    setFormData((form) => ({ ...form, [e.target.name]: e.target.value }))
  const onSubmit = (e) => {
    e.preventDefault()
    addExperience(formData, history)
  }

  const { company, title, location, from, to, current, description } = formData
  return (
    <Fragment>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={title}
            placeholder="* Job Title"
            name="title"
            required
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={company}
            placeholder="* Company"
            name="company"
            required
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={location}
            placeholder="Location"
            name="location"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input value={from} type="date" name="from" onChange={onChange} />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={(e) =>
                setFormData((form) => ({
                  ...form,
                  [e.target.name]: !form.current
                }))
              }
            />{' '}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            value={to}
            name="to"
            disabled={current}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            value={description}
            rows="5"
            onChange={onChange}
            placeholder="Job Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  )
}

AddExperience.propTypes = {
  history: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
}

export default connect(null, { addExperience })(withRouter(AddExperience))
