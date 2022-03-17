import * as constants from '../constants/constants';


export const userData = (state = {user:null}, action) => {
    switch (action.type) {
        case constants.GET_USER_DATA:
            return {
                ...state,
                data: action.payload,
                user: action.payload.user,
                status: action.status
            }
        case constants.GET_USER_ERROR:
            return {
                ...state,
                user: null,
                status: action.status,
                message: action.message
            }
        default: return state
    }
}

export const userArticle = (state = {data:null}, action) => {
    switch (action.type) {
        case constants.GET_USER_ARTICLES:
            return {
                ...state,
                data: action.payload,
            }
        case constants.GET_USER_ARTICLES_ERROR:
            return {
                ...state,
                user: null,
                status: action.status,
                message: action.message
            }
        case constants.CLEAR_USER_ARTICLES:
            return state = {data:null}
        default: return state
    }
}