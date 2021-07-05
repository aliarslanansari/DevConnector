import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from './../../actions/post'

export const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('')
  const onSubmit = (e) => {
    e.preventDefault()
    addComment(postId, { text })
    setText('')
  }
  const onChange = (e) => setText(e.target.value)
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a Comment</h3>
      </div>
      <form className="form my-1" onSubmit={onSubmit}>
        <textarea
          value={text}
          onChange={onChange}
          name="text"
          cols="30"
          rows="5"
          placeholder="Leave a Comment"
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = { addComment }

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
