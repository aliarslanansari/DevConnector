import axios from 'axios'
import {
  CLEAR_PROFILE,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_AUTH_FAIL,
  USER_LOADED_SUCCESS
} from './types'
import { setAlert } from './alert'
import setAuthToken from '../utils/setAuthToken'

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    const res = await axios.get('/api/auth')
    dispatch({ type: USER_LOADED_SUCCESS, payload: res.data })
  } catch (err) {
    dispatch({ type: USER_AUTH_FAIL })
  }
}

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE })
    dispatch({ type: LOGOUT })
    try {
      const res = await axios.post('/api/users', {
        name,
        email,
        password
      })
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
      dispatch(loadUser())
    } catch (error) {
      const errors = error.response.data.errors
      if (errors) {
        errors.forEach((element) => dispatch(setAlert(element.msg, 'danger')))
      }
      dispatch({ type: REGISTER_FAIL })
    }
  }

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const res = await axios.post('/api/auth', {
        email,
        password
      })
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
      dispatch(loadUser())
    } catch (error) {
      const errors = error?.response?.data?.errors
      if (errors) {
        errors.forEach((element) => dispatch(setAlert(element.msg, 'danger')))
      }
      dispatch({ type: LOGIN_FAIL })
    }
  }

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE })
  dispatch({ type: LOGOUT })
}
