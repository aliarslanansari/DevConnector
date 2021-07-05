import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeLike, addLike, deletePost } from './../../actions/post'

const PostItem = ({
  post: { _id, date, avatar, comments, name, likes, user, text },
  auth,
  addLike,
  deletePost,
  removeLike
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        <button
          type="button"
          onClick={() => addLike(_id)}
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-up"></i>{' '}
          {likes.length > 0 && <span>{likes.length}</span>}
        </button>
        <button
          type="button"
          onClick={() => removeLike(_id)}
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion comments{' '}
          {comments && comments.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </Link>
        {!auth.loading && user === auth.user?._id && (
          <button
            onClick={() => deletePost(_id)}
            type="button"
            data-id={user}
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  )
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
}

export default connect(null, { addLike, removeLike, deletePost })(PostItem)
