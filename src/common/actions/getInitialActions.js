import 'whatwg-fetch'
import {
  GET_INITIAL
} from '../constants/actionTypes.js'

export const getInitial = (sessionid) => (
  (dipatch) => {
    fetch('/api/session', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'sessionid': `${sessionid}`
       }
    })
    .then(res => {
      if(res.ok) {
        return res.json()
        .then(json => {
          dispatch({ type: GET_INITIAL, payload: { data: json } })
        })
      } else {
        //not login
      }
    })
  }
)
