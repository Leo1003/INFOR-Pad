import 'whatwg-fetch'
import {
  GET_INITIAL_USER,
} from '../constants/actionTypes.js'

export const fetchGetInitialUser = (sessionid) => (
  async (dispatch) => {
    try {
      let res = await fetch('/api/session', {
        methld: 'GET',
        headers: {
          'sessionid': `${sessionid}`
        }
      })
      if(res.ok) {
        let json = await res.json()
        dispatch({ type: GET_INITIAL_USER, payload: { data: json } })
      }
    } catch(e) {
      console.log(e)
    }
  }
)
