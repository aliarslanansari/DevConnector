import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { deleteComment } from '../../actions/post'

const CommentItem = ({ comment, postId, deleteComment, auth }) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${comment.user}`}>
          <img className="round-img" src={comment.avatar} alt="" />
          <h4>{comment.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{comment.text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYT/MM/DD">{comment.date}</Moment>
        </p>
        {!auth.loading && comment.user === auth.user._id && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => deleteComment(postId, comment._id)}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  )
}

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({ auth: state.auth })

const mapDispatchToProps = { deleteComment }

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem)
