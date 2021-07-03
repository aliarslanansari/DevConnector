import axios from 'axios'
import { GET_PROFILE_FAIL, GET_PROFILE_SUCCESS, UPDATE_PROFILE } from './types'
import { setAlert } from './alert'

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
        msg: error.response?.statusText,
        status: error.response?.status
      }
    })
  }
}

export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/profile',
        formData
      )
      dispatch({
        type: GET_PROFILE_SUCCESS,
        payload: res.data
      })
      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      )
      if (!edit) {
        history.push('/dashboard')
      } else {
        window.scrollTo(0, 0)
      }
    } catch (error) {
      console.log(error)
      const errors = error.response?.data?.errors
      if (errors) {
        errors.forEach((element) => dispatch(setAlert(element.msg, 'danger')))
      }
      dispatch({
        type: GET_PROFILE_FAIL,
        payload: {
          msg: error.response?.statusText,
          status: error.response?.status
        }
      })
    }
  }

// Add experience

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.put(
      'http://localhost:5000/api/profile/experience',
      formData
    )
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })
    dispatch(setAlert('Experience Added', 'success'))
    history.push('/dashboard')
  } catch (error) {
    console.log(error)
    const errors = error.response?.data?.errors
    if (errors) {
      errors.forEach((element) => dispatch(setAlert(element.msg, 'danger')))
    }
    dispatch({
      type: GET_PROFILE_FAIL,
      payload: {
        msg: error.response?.statusText,
        status: error.response?.status
      }
    })
  }
}

// Add Education

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.put(
      'http://localhost:5000/api/profile/education',
      formData
    )
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })
    dispatch(setAlert('Education Added', 'success'))
    history.push('/dashboard')
  } catch (error) {
    console.log(error)
    const errors = error.response?.data?.errors
    if (errors) {
      errors.forEach((element) => dispatch(setAlert(element.msg, 'danger')))
    }
    dispatch({
      type: GET_PROFILE_FAIL,
      payload: {
        msg: error.response?.statusText,
        status: error.response?.status
      }
    })
  }
}
