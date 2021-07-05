import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEducation = ({ profile }) => {
  return (
    <div className="profile-edu bg-white p-2">
      <h2 className="text-primary">Education</h2>
      {profile.education.length > 0 ? (
        profile.education.map((edu) => (
          <div key={edu._id}>
            <h3 className="text-dark">{edu.school}</h3>
            <p>
              <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
              {!edu.to ? 'Now' : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
            </p>
            <p>
              <strong>Degree: </strong>
              {edu.degree}
            </p>{' '}
            <p>
              <strong>Field of study: </strong>
              {edu.fieldofstudy}
            </p>
            <p>
              <strong>Description: </strong>
              {edu.description}
            </p>
          </div>
        ))
      ) : (
        <h4>No education credentials</h4>
      )}
    </div>
  )
}

ProfileEducation.propTypes = { profile: PropTypes.object.isRequired }

export default ProfileEducation
