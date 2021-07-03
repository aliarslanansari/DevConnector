import axios from 'axios'
import {
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILE_FAIL,
  GET_PROFILE_SUCCESS,
  UPDATE_PROFILE,
  GET_PROFILES_SUCCESS,
  GET_REPOS_SUCCESS
} from './types'
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

export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE })
  try {
    const res = await axios.get('http://localhost:5000/api/profile')
    dispatch({
      type: GET_PROFILES_SUCCESS,
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

export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/profile/${userId}`)
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

export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/profile/github/${username}`
    )
    dispatch({
      type: GET_REPOS_SUCCESS,
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

// delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/profile/experience/${id}`
    )
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })
    dispatch(setAlert('Experience Removed', 'success'))
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

// delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/profile/education/${id}`
    )
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })
    dispatch(setAlert('Education Removed', 'success'))
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

// delete account and profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure?, This can not be undone!'))
    try {
      await axios.delete(`http://localhost:5000/api/profile`)
      dispatch({ type: CLEAR_PROFILE })
      dispatch({ type: ACCOUNT_DELETED })
      dispatch(setAlert('Your Account has been permanantly', 'success'))
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
