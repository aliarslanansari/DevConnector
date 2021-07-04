import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { getPosts } from './../../actions/post'
import Spinner from './../layouts/Spinner'
import PostItem from './PostItem'

const Posts = ({ getPosts, post: { posts, loading }, auth }) => {
  useEffect(() => {
    getPosts()
  }, [])
  console.log({ posts })
  return loading ? (
    <Spinner />
  ) : (
    <div>
      {posts.map((post) => {
        return <PostItem key={post._id} post={post} auth={auth} />
      })}
    </div>
  )
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ post: state.post, auth: state.auth })

export default connect(mapStateToProps, { getPosts })(Posts)
