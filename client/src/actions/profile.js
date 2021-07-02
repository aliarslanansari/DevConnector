import axios from 'axios'
import { GET_PROFILE_FAIL, GET_PROFILE_SUCCESS } from './types'

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:5000/api/profile/me')
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: GET_PROFILE_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    })
  }
}
