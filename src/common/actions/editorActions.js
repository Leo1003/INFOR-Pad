require('isomorphic-fetch');

import {
    SAVING,
    DIDSAVE,
    EDITOR_GET_FILE,
    CHANGE_CODE,
    ISFETCHING,
    DIDFETCH,
    CHANGE_SETTINGS,
    EDITOR_FILE_MODIFY,
    SAVE_STDIN,
    CLEAN_FILE,
    CLEAN_FOLDER,
    CLEAN_SESSION,
    CLEAN_USER,
    PERMISSION_DENIED,
    LOGIN_FIRST,
    FILE_IS_NOT_EXIST,
    DATA_IS_TOO_BIG,
    REDIRECT_ERROR
    
} from '../constants/actionTypes'

export const fetchSaveCode = (sessionid, fsid, code) => (
    async(dispatch) => {
        try {
            dispatch({ type: SAVING })
            let res = await fetch(`/api/fs/${fsid}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'sessionid': `${sessionid}`
                },
                body: `code=${encodeURIComponent(code)}`
            })
            //todo status error 
            // 401: Login first!
            // 403: You don't have enough permission
            // 413: Your data is too big to save
            // 404: The directory isn't exist
            if(res.ok) {
              // console.log("saved")
            }
            else if(res.status == '401') {
              dispatch({ type: CLEAN_SESSION })
              dispatch({ type: LOGIN_FIRST })
            } else {
              let json = await res.json()
              dispatch({ type: REDIRECT_ERROR, error: json.error })
            }
            dispatch({ type: DIDSAVE })
        } catch(e) { console.log(e) }
    }
)

export const fetchEditorGetFiles = (sessionid, fsid) => (
  async (dispatch) => {
    try {
      dispatch({ type: ISFETCHING })
      let res = await fetch(`/api/fs/${fsid}`, {
        method: 'GET',
        headers: {
          'sessionid': `${sessionid}`
        }
      })
      if (res.ok) {
        let json = await res.json()
        if(json.format !== "Directory") dispatch({ type: EDITOR_GET_FILE, payload: { data: json } })
        else {
          dispatch({ type: FILE_IS_NOT_EXIST})
        }
      } else if(res.status == '401') {
        dispatch({ type: CLEAN_SESSION })
        dispatch({ type: LOGIN_FIRST} )
      } else {
        let json = await res.json()
        dispatch({ type: REDIRECT_ERROR, error: json.error })
      }
      dispatch({ type: DIDFETCH })
    } catch(e) { console.log(e) }
  }
)

export const changeCode = (code, fsid) => (
  (dispatch) => {
    dispatch({type: CHANGE_CODE, code: code, fsid: fsid})
  }
)

export const fetchChangeSettings = (sessionid, settingName, settingValue) => (
    async (dispatch) => {
        try {
            let res = await fetch('/api/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'sessionid': `${sessionid}`
                },
                body: `${settingName}=${settingValue}`
            })
            if(res.ok) {
              dispatch({ type: CHANGE_SETTINGS, settingName: settingName, settingValue: settingValue })
            } else if(res.status == '401') {
              dispatch({ type: CLEAN_SESSION })
              dispatch({ type: LOGIN_FIRST })
            } else {
              let json = await res.json()
              dispatch({ type: REDIRECT_ERROR, error: json.error })
            }
        } catch(e) { console.log(e) }
    }
)
export const fetchEditorModify = (sessionid, fsid, modifyType, modifyValue) => (
  async (dispatch) => {
    try {
      // console.log("in action")
      let res = await fetch(`/api/fs/${fsid}`, {
          method: 'PUT',
          headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'sessionid': `${sessionid}`
          },
          body: `${modifyType}=${modifyValue}`
      })
      if(res.ok) dispatch({ type: EDITOR_FILE_MODIFY,  modifyType: modifyType, modifyValue: modifyValue, fsid: fsid})
      //todo status error 
      else if(res.status == '401') {
        dispatch({ type: CLEAN_SESSION })
        dispatch({ type: LOGIN_FIRST })
      } else {
        let json = await res.json()
        dispatch({ type: REDIRECT_ERROR, error: json.error })
      }
    } catch(e) { console.log(e) }
  }
)
