import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !auth.isAuthenticated && !auth.loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
)

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps)(PrivateRoute)
