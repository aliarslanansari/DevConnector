import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { getPosts } from './../../actions/post'
import Spinner from './../layouts/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'

const Posts = ({ getPosts, post: { posts, loading }, auth }) => {
  useEffect(() => {
    getPosts()
  }, [])
  console.log({ posts })
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>
      <PostForm />
      {posts.map((post) => {
        return <PostItem key={post._id} post={post} auth={auth} />
      })}
    </Fragment>
  )
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ post: state.post, auth: state.auth })

export default connect(mapStateToProps, { getPosts })(Posts)
