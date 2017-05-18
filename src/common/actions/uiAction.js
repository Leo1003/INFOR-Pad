import { CHANGE_LANGUAGE } from '../constants/actionTypes.js'

export const changeLanguage = lang => (
    (dispatch) => {
        dispatch({ type: CHANGE_LANGUAGE, lang: lang})
    }
)