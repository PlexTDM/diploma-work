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
        case constants.CLEAR_USER_DATA:
            localStorage.removeItem('user');
            return {
                user: null,
                data: null,
                status: null,
                message: null
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

export const getUsers = (state = {users:null}, action) => {
    switch (action.type) {
        case constants.GET_USERS_REQ:
            return {
                ...state,
                loading: true,
            }
        case constants.GET_USERS_RES:
            return {
                users: action.payload.message,
                count: action.payload.count,
                loading: false,
            }

        case constants.GET_USERS_ERROR:
            return {
                ...state,
                users: null,
                loading: false,
                // status: action.status,
                error: action.message,
            }
        case constants.GET_USERS_RESET:
            return state = {data:null}
        default: return state
    }
}