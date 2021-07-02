import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from './../../actions/profile'
import Spinner from './../layouts/Spinner'

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { loading, profile }
}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [])
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>has</Fragment>
      ) : (
        <Fragment>
          <p>You've not setup your profile, please add some info.</p>
        </Fragment>
      )}
    </Fragment>
  )
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
})
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
