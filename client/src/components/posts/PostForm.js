import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addPost } from './../../actions/post'

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('')
  const onChange = (e) => setText(e.target.value)
  const onSubmit = (e) => {
    e.preventDefault()
    addPost({ text })
    setText('')
  }
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form className="form my-1" onSubmit={onSubmit}>
        <textarea
          value={text}
          onChange={onChange}
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  )
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = { addPost }

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
