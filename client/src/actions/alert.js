import { v4 } from 'uuid'
import { REMOVE_ALERT, SET_ALERT } from './types'
export const setAlert =
  (msg, alertType, timeout = 4000) =>
  (dispatch) => {
    const id = v4()
    dispatch({
      type: SET_ALERT,
      payload: { id, alertType, msg }
    })
    // remove alert after 5 seconds
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout)
  }
