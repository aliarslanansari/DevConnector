import axios from 'axios'
import { GET_POSTS_FAILURE, GET_POSTS_SUCCESS, UPDATE_LIKES } from './types'

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:5000/api/posts')
    dispatch({ type: GET_POSTS_SUCCESS, payload: res.data })
  } catch (error) {
    dispatch({
      type: GET_POSTS_FAILURE,
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
      type: GET_POSTS_FAILURE,
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
      type: GET_POSTS_FAILURE,
      payload: {
        msg: error.response?.statusText,
        status: error.response?.status
      }
    })
  }
}
