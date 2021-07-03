import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createProfile, getCurrentProfile } from '../../actions/profile'
import { withRouter, Link } from 'react-router-dom'

const EditProfile = ({
  createProfile,
  history,
  profile: { profile, loading },
  getCurrentProfile
}) => {
  const [formTouched, setFormTouched] = useState(false)
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  })
  const [displaySocialInputs, setDisplaySocialInputs] = useState(false)

  useEffect(() => {
    console.log('loading edit profile')
    getCurrentProfile()
    if (profile) {
      setFormData({
        company: loading || !profile.company ? '' : profile.company,
        website: loading || !profile.website ? '' : profile.website,
        location: loading || !profile.location ? '' : profile.location,
        status: loading || !profile.status ? '' : profile.status,
        skills: loading || !profile.skills ? '' : profile.skills.join(', '),
        githubusername:
          loading || !profile.githubusername ? '' : profile.githubusername,
        bio: loading || !profile.bio ? '' : profile.bio,
        twitter:
          loading || !profile.social?.twitter ? '' : profile.social.twitter,
        facebook:
          loading || !profile.social?.facebook ? '' : profile.social.facebook,
        linkedin:
          loading || !profile.social?.linkedin ? '' : profile.social.linkedin,
        youtube:
          loading || !profile.social?.youtube ? '' : profile.social.youtube,
        instagram:
          loading || !profile.social?.instagram ? '' : profile.social.instagram
      })
      setFormTouched(false)
    }
  }, [loading])

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData

  const onChange = (e) => {
    setFormTouched(true)
    setFormData((form) => ({ ...form, [e.target.name]: e.target.value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    createProfile(formData, history, true)
    setFormTouched(false)
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={onChange}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            value={company}
            placeholder="Company"
            name="company"
            onChange={onChange}
          ></input>
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            value={website}
            type="text"
            placeholder="Website"
            name="website"
            onChange={onChange}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            value={location}
            type="text"
            placeholder="Location"
            name="location"
            onChange={onChange}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            value={skills}
            placeholder="* Skills"
            name="skills"
            onChange={onChange}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            value={githubusername}
            placeholder="Github Username"
            name="githubusername"
            onChange={onChange}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={onChange}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => setDisplaySocialInputs((v) => !v)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                value={twitter}
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                value={youtube}
                placeholder="YouTube URL"
                name="youtube"
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                value={linkedin}
                placeholder="Linkedin URL"
                name="linkedin"
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                value={instagram}
                placeholder="Instagram URL"
                name="instagram"
                onChange={onChange}
              />
            </div>
          </Fragment>
        )}
        <input
          type="submit"
          className="btn btn-primary my-1"
          disabled={!formTouched}
        />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  )
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
)
