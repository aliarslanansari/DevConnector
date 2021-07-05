import {
  POST_ERROR,
  GET_POSTS_SUCCESS,
  POST_DELETED,
  UPDATE_LIKES
} from './../actions/types'

const initialState = { posts: [], post: null, loading: true, error: {} }

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_POSTS_SUCCESS:
      return { ...state, posts: payload, loading: false }
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      }
    case POST_DELETED:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false
      }
    case POST_ERROR:
      return { ...state, error: payload, loading: false }
    default:
      return state
  }
}
