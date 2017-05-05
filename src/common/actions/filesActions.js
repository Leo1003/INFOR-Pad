import 'whatwg-fetch'
import {
  GET_FOLDER,
  GET_FILE,
  LOGIN_FIRST,
  PERMISSION_DENIED,
  FILE_IS_NOT_EXIST,
  ADD_NEW_FOLDER,
  ISFETCHING,
  DIDFETCH
} from '../constants/actionTypes'

export const fetchGetFiles = (sessionid, fsid) => (
  async (dispatch) => {
    dispatch({ type: ISFETCHING })
    try {
      let res = await fetch(`/api/fs/${fsid}`, {
        method: 'GET',
        headers: {
          'sessionid': `${sessionid}`
        }
      })
      if (res.ok) {
        let json = await res.json()
        if(json.format == "Directory") dispatch({ type: GET_FOLDER, payload: { data: json } })
        else dispatch({ type: GET_FILE, payload: { data: json } })
      } else if(res.status == '401') {
        dispatch({ type: LOGIN_FIRST} )
      } else if(res.status == '403') {
        dispatch({ type: PERMISSION_DENIED })
      } else if(res.status == '404') {
        dispatch({ type: FILE_IS_NOT_EXIST })
      }
      dispatch({ type: DIDFETCH })
    } catch(e) { console.log(e) }
  }
)

export const fetchAddNewFolder = (filename, folderid, sessionid) => (
  async (dispatch) => {
    try {
      let res = await fetch(`/api/fs/${folderid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'sessionid': `${sessionid}`
        },
        body: `filename=${filename}&format=Directory`
      })
      if(res.ok){
        let json = await res.json()
        dispatch({ type: ADD_NEW_FOLDER })
      }  else if(res.status == '401') {
        dispatch({ type: LOGIN_FIRST })
      } else if(res.status === '403') {
        dispatch({ type: PERMISSION_DENIED })
      } else if(res.status == '404') {
        dispatch({ type: FILE_IS_NOT_EXIST })
      }
    } catch(e) { console.log(e) }
  }
)
