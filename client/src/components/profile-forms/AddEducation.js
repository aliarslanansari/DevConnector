import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addEducation } from './../../actions/profile'
import { Link, withRouter } from 'react-router-dom'
import React, { useState } from 'react'

const AddEducation = ({ history, addEducation }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
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
    addEducation(formData, history)
  }

  const { school, degree, fieldofstudy, from, to, current, description } =
    formData
  return (
    <section className="container">
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school or bootcamp you've
        attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={school}
            placeholder="* School or Bootcamp"
            name="school"
            required
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={degree}
            placeholder="* Degree or Certificate"
            name="degree"
            required
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={fieldofstudy}
            placeholder="Field of Study"
            name="fieldofstudy"
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
            Current Education
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
            placeholder="Programme Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  )
}

AddEducation.propTypes = {
  history: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
}

export default connect(null, { addEducation })(withRouter(AddEducation))
