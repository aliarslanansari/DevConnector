import {
  POST_ERROR,
  GET_POSTS_SUCCESS,
  POST_DELETED,
  UPDATE_LIKES,
  ADD_POST,
  GET_SINGLE_POST_SUCCESS,
  ADD_COMMENT,
  REMOVE_COMMENT
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
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      }
    case GET_SINGLE_POST_SUCCESS: {
      return { ...state, post: payload, loading: false }
    }
    case POST_ERROR:
      return { ...state, error: payload, loading: false }
    case ADD_COMMENT:
      return { ...state, post: { ...state.post, comments: payload } }
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          )
        },
        loading: state
      }
    default:
      return state
  }
}
