import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost } from './../../actions/post'
import { Link, useParams } from 'react-router-dom'
import PostItem from './../posts/PostItem'
import Spinner from './../layouts/Spinner'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = ({ getPost, post: { loading, post } }) => {
  const { postId } = useParams()
  useEffect(() => {
    if (postId) {
      getPost(postId)
    }
  }, [postId])
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back to Posts
      </Link>
      <PostItem showActions={false} post={post} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  )
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ post: state.post })

const mapDispatchToProps = { getPost }

export default connect(mapStateToProps, mapDispatchToProps)(Post)
