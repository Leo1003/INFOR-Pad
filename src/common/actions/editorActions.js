import 'whatwg-fetch'
import {
    SAVING,
    DIDSAVE
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
                body: `code=${code}`
            })
            //todo status error 
            dispatch({ type: DIDSAVE })
        } catch(e) { console.log(e) }
    }
)