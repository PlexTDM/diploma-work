import * as constants from '../constants/constants';

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
                loading: false,
                error: action.message
            };
        case constants.REG_RESET:
            return state = initial;
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
                loading: false,
                error: action.message
            };
        case constants.LOGIN_RESET:
            return state = initial
        default: return state
    }
}

export const updateUsers = (state = initial, action) => {
    switch (action.type) {
        case constants.UPDATE_USERS_REQ:
            return {
                loading: true
            }
        case constants.UPDATE_USERS_RES:
            return {
                loading: false,
                status: action.status,
                data: action.payload,
            }
        case constants.UPDATE_USERS_ERROR:
            return {
                loading: false,
                error: action.message,
                status: action.status,
            }
        case constants.UPDATE_USERS_RESET:
            return state = initial
        default:
            return state
    }
}