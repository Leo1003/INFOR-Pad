import 'whatwg-fetch'
import {
  ISFETCHING,
  DIDFETCH,
  GET_INITIAL_USER,
} from '../constants/actionTypes.js'

export const fetchGetInitialUser = (sessionid) => (
  async (dispatch) => {
    try {
      dispatch({ type: ISFETCHING })
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
      dispatch({ type: DIDFETCH })
    } catch(e) {
      console.log(e)
    }
  }
)