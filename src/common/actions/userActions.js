import 'whatwg-fetch'
import {
  GET_INITIAL_USER,
} from '../constants/actionTypes.js'

export const fetchGetInitialUser = (sessionid) => (
  (dispatch) => {
    fetch('/api/session', {
      method: 'GET',
      headers: {
        'sessionid': `${sessionid}`
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json()
        .then(json => dispatch({ type: GET_INITIAL_USER, payload: { data: json } }))
      }
    })
    .catch(err => { console.log(err) })
  }
)
