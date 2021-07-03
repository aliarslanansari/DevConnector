import {
  CLEAR_PROFILE,
  GET_PROFILE_FAIL,
  GET_PROFILE_SUCCESS,
  UPDATE_PROFILE
} from '../actions/types'

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
}

const profile = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PROFILE_SUCCESS:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
        error: {}
      }
    case GET_PROFILE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
        error: {}
      }
    default:
      return state
  }
}

export default profile
