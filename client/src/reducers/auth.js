import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_AUTH_FAIL,
  USER_LOADED_SUCCESS
} from './../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
}

const authReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      }
    case USER_AUTH_FAIL:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      }
    case REGISTER_FAIL:
      localStorage.removeItem('token')
      return { ...state, ...payload, isAuthenticated: false, loading: false }
    default:
      return state
  }
}

export default authReducer
