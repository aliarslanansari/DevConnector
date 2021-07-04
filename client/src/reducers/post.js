import { GET_POSTS_FAILURE, GET_POSTS_SUCCESS } from './../actions/types'

const initialState = { posts: [], post: null, loading: true, error: {} }

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_POSTS_SUCCESS:
      return { ...state, posts: payload, loading: false }
    case GET_POSTS_FAILURE:
      return { ...state, error: payload, loading: false }
    default:
      return state
  }
}
