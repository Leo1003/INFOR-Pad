import 'whatwg-fetch'
import {
  GET_FOLDER,
  GET_FILE,
  LOGIN_FIRST,
  PERMISSION_DENIED,
  FILE_IS_NOT_EXIST,
  ADD_NEW_FOLDER,
  DELETE_FILE,
  ISFETCHING,
  DIDFETCH,
  GET_SHORTID,
  CLEAN_SHORTID
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
      dispatch({ type: ISFETCHING })
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
        dispatch(fetchGetFiles(sessionid, folderid))
        //dispatch({ type: ADD_NEW_FOLDER })
      }  else if(res.status == '401') {
        dispatch({ type: LOGIN_FIRST })
      } else if(res.status === '403') {
        dispatch({ type: PERMISSION_DENIED })
      } else if(res.status == '404') {
        dispatch({ type: FILE_IS_NOT_EXIST })
      }
      dispatch({ type: DIDFETCH })
    } catch(e) { console.log(e) }
  }
)

export const fetchDeleteFile = (fsid, sessionid, folderid) => (
  async (dispatch) => {
    try {
      dispatch({ type: ISFETCHING })
      let res = await fetch(`/api/fs/${fsid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'sessionid': `${sessionid}`
        }
      })
      if(res.ok) {
        let json = await res.json()
        dispatch(fetchGetFiles(sessionid, folderid))
      }
    } catch(e) { console.log(e) }
  }
)

export const fetchCheckPermission = (fsid, sessionid, check) => (
  async (dispatch) => {
    try {
      let res = await fetch(`/api/fs/${fsid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'sessionid': `${sessionid}`
        },
        body: `isPublic=${check}`
      })
      if(res.ok) {
        let json = await res.json()
        console.log(json)
        console.log("action getshortid")
        dispatch({ type: GET_SHORTID, payload:{ data: json } })
      }
    } catch(e) { console.log(e) }
  }
)
