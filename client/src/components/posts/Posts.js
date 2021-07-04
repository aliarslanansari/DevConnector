import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { getPosts } from './../../actions/post'

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts()
  }, [])
  return <div>adasd</div>
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({ post: state })

export default connect(mapStateToProps, { getPosts })(Posts)
