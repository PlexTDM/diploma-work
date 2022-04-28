import * as constants from '../constants/constants';
import { createAction, createReducer } from '@reduxjs/toolkit';

const getUserData = createAction(constants.GET_USER_DATA);

export const userData = createReducer({ user: null }, builder => {
    builder.addCase(getUserData, (state, action) => {
        console.log('reducer',action);
        return {
            ...state,
            data: action.payload,
            user: action.payload.user,
            status: action.status
        }
    })
})

// export const userData = (state = {user:null}, action) => {
//     console.log(action.payload);
//     switch (action.type) {
//         case constants.GET_USER_DATA:
//             return {
//                 ...state,
//                 data: action.payload,
//                 user: action.payload.user,
//                 status: action.status
//             }
//         case constants.GET_USER_DATA_ERROR:
//             return {
//                 ...state,
//                 user: null,
//                 status: action.status,
//                 message: action.message
//             }
//         case constants.CLEAR_USER_DATA:
//             localStorage.removeItem('user');
//             return {
//                 user: null,
//                 data: null,
//                 status: null,
//                 message: null
//             }
//         default: return state
//     }
// }

export const userArticle = (state = { data: null }, action) => {
    switch (action.type) {
        case constants.GET_USER_ARTICLES:
            return {
                ...state,
                data: action.payload.articles,
                count: action.payload.count,
            }
        case constants.GET_USER_ARTICLES_ERROR:
            return {
                ...state,
                user: null,
                status: action.status,
                message: action.message
            }
        case constants.CLEAR_USER_ARTICLES:
            return state = { data: null }
        default: return state
    }
}

export const getUsers = (state = { users: null }, action) => {
    switch (action.type) {
        case constants.GET_USERS_REQ:
            return {
                ...state,
                loading: true,
            }
        case constants.GET_USERS_RES:
            return {
                users: action.payload,
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
            return state = { data: null }
        default: return state
    }
}

export const homePageData = (state = { data: [] }, action) => {
    switch (action.type) {
        case constants.GET_HOME_PAGE_REQ:
            return {
                ...state,
                loading: true,
            }
        case constants.GET_HOME_PAGE_RES:
            let arr = state.data.concat(action.payload[0]);
            arr.sort((a, b) => a._id < b._id ? 1 : a._id > b._id ? -1 : 0);
            return {
                ...state,
                data: arr,
                loading: false,
            }
        case constants.GET_HOME_PAGE_ERROR:
            return {
                ...state,
                data: null,
                loading: false,
                status: action.status ?? null,
                error: action.message,
            }
        case constants.CLEAR_HOME_SLIDE:
            return state = { data: [] }
        default: return state
    }
}