import * as constants from '../constants/constants';
import axios from 'axios';

const uri = 'http://localhost:4000';

export const registerUsers = formData => async dispatch => {
    try {
        dispatch({
            type: constants.REG_USERS_REQ
        })
        const response = await axios.post(uri + '/register', formData);
        dispatch({
            type: constants.REG_USERS_RES,
            status: response.status,
            payload: response.data
        })
    } catch (error) {
        if (!error.response) {
            dispatch({
                type: constants.GET_USER_ERROR,
                message: error.message,
                status: undefined
            })
        }
        dispatch({
            type: constants.GET_USER_ERROR,
            message: error.message,
            status: error.response.status
        })
    }
}

export const loginUsers = formData => async dispatch => {
    try {
        dispatch({
            type: constants.LOGIN_USERS_REQ
        })
        const response = await axios.post(uri + '/login', formData);
        dispatch({
            type: constants.LOGIN_USERS_RES,
            status: response.status,
            payload: response.data,
        })
    } catch (error) {
        if (!error.response) {
            dispatch({
                type: constants.LOGIN_USERS_ERROR,
                message: error.message,
                status: undefined
            })
        }
        dispatch({
            type: constants.LOGIN_USERS_ERROR,
            message: error.message,
            status: error.response.status
        })
    }
}