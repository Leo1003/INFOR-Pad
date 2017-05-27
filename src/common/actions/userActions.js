require('isomorphic-fetch');

import {
  ISFETCHING,
  DIDFETCH,
  GET_INITIAL_USER,
  CLEAN_SESSION,
  GET_USER_BY_ID
} from '../constants/actionTypes.js'

// export const fetchGetInitialUser = (sessionid) => (
//   async (dispatch) => {
//     try {
//       dispatch({ type: ISFETCHING })
//       let res = await fetch('/api/session', {
//         method: 'GET',
//         headers: {
//           'sessionid': `${sessionid}`
//         }
//       })
//       if(res.ok) {
//         let json = await res.json()
//         dispatch({ type: GET_INITIAL_USER, payload: { data: json } })
//       } else {
//         dispatch({ type: CLEAN_SESSION })
//       }
//       dispatch({ type: DIDFETCH })
//     } catch(e) {
//       console.log(e)
//     }
//   }
// )

export const fetchGetUserById = (userid) => (
  async (dispatch)=> {
    try {
      let res = await fetch(`/api/user/${userid}`, {
        method: 'GET',
      })
      if(res.ok) {
        let json = await res.json()
        dispatch({ type: GET_USER_BY_ID, payload: { data: json } })
      }
    } catch(e) {
      console.log(e)
    }
  }
)
