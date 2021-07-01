import axios from 'axios'
import { REGISTER_FAIL, REGISTER_SUCCESS } from './types'

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      const res = await axios.post('http:localhost:5000/api/users', {
        name,
        email,
        password
      })
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    } catch (error) {
      dispatch({ type: REGISTER_FAIL })
    }
  }
