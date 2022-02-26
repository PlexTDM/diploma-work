import * as constants from '../constants/authConstants';
import axios from 'axios';

const uri = 'http://localhost:4000';

export const registerUsers = formData => async dispatch => {
    try {
        dispatch({
            type: constants.REG_USERS_REQ
        })
        const response = await axios.post(uri+'/register', formData);
        dispatch({
            type: constants.REG_USERS_RES,
            status: response.status,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: constants.REG_USERS_ERROR,
            message: error.message
        })
    }
}

export const loginUsers = formData => async dispatch => {
    try {
        dispatch({
            type: constants.LOGIN_USERS_REQ
        })
        const response = await axios.post(uri+'/login', formData);
        dispatch({
            type: constants.LOGIN_USERS_RES,
            status: response.status,
            payload: response.data,
        })
    } catch (error) {
        dispatch({
            type: constants.LOGIN_USERS_ERROR,
            message: error.message
        })
    }
}