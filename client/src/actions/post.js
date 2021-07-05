import axios from 'axios'
import {
  POST_ERROR,
  GET_POSTS_SUCCESS,
  POST_DELETED,
  UPDATE_LIKES,
  ADD_POST,
  GET_SINGLE_POST_SUCCESS,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './types'
import { setAlert } from './alert'

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:5000/api/posts')
    dispatch({ type: GET_POSTS_SUCCESS, payload: res.data })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response?.statusText,
        status: error.response?.status
      }
    })
  }
}

export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/posts/${postId}`)
    dispatch({ type: GET_SINGLE_POST_SUCCESS, payload: res.data })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response?.statusText,
        status: error.response?.status
      }
    })
  }
}

export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/posts/like/${postId}`
    )

    dispatch({ type: UPDATE_LIKES, payload: { postId, likes: res.data } })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response?.statusText,
        status: error.response?.status
      }
    })
  }
}

export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/posts/unlike/${postId}`
    )

    dispatch({ type: UPDATE_LIKES, payload: { postId, likes: res.data } })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response?.statusText,
        status: error.response?.status
      }
    })
  }
}
export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/posts/${postId}`)

    dispatch({ type: POST_DELETED, payload: postId })
    dispatch(setAlert('Post Deleted', 'success'))
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response?.statusText,
        status: error.response?.status
      }
    })
  }
}

export const addPost = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:5000/api/posts`, formData)

    dispatch({ type: ADD_POST, payload: res.data })
    dispatch(setAlert('Your post is live!', 'success'))
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response?.statusText,
        status: error.response?.status
      }
    })
  }
}

export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://localhost:5000/api/posts/comment/${postId}`,
      formData
    )

    dispatch({ type: ADD_COMMENT, payload: res.data })
    dispatch(setAlert('Comment Added', 'success'))
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response?.statusText,
        status: error.response?.status
      }
    })
  }
}
