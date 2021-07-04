import axios from 'axios'
import { GET_POSTS_FAILURE, GET_POSTS_SUCCESS } from './types'

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
