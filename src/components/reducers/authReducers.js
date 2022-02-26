import * as constants from '../constants/authConstants';

const initial = {
    loading: false,
    data: null,
};

export const registerUsers = (state = initial, action) => {
    switch (action.type) {
        case constants.REG_USERS_REQ:
            return {
                ...state,
                loading: true
            }
        case constants.REG_USERS_RES:
            return {
                ...state,
                loading: false,
                status: action.status,
                data: action.payload
            };
        case constants.REG_USERS_ERROR:
            return {
                error: action.message
            }
        default: return state
    }
}

export const loginUsers = (state = initial, action) => {
    switch (action.type) {
        case constants.LOGIN_USERS_REQ:
            return {
                ...state,
                loading: true
            }
        case constants.LOGIN_USERS_RES:
            return {
                ...state,
                loading: false,
                status: action.status,
                data: action.payload
            };
        case constants.LOGIN_USERS_ERROR:
            return {
                error: action.message
            }
        default: return state
    }
}