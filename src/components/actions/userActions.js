import * as constants from '../constants/constants';
import axios from 'axios';

const uri = 'http://localhost:4000';

export const getUserData = userId => async dispatch => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const access_token = user.access_token;
        const response = await axios.get(uri + '/getUser/' + userId, {
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            // validateStatus: (status)=>{
            //     // return status >= 200 && status < 300; 
            // },
        });
        dispatch({
            type: constants.GET_USER_DATA,
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
            return
        }
        dispatch({
            type: constants.GET_USER_ERROR,
            message: error.message,
            status: error.response.status
        })
    }
}


export const getUserArticle = userId => async dispatch => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const access_token = user.access_token;
        const response = await axios.get(uri + '/getUserArticles/' + userId, {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        });
        dispatch({
            type: constants.GET_USER_ARTICLES,
            payload: response.data.message
        })
    } catch (error) {
        if (!error.response) {
            dispatch({
                type: constants.GET_USER_ARTICLES_ERROR,
                message: error.message,
                status: undefined
            })
            return
        }
        dispatch({
            type: constants.GET_USER_ARTICLES_ERROR,
            message: error.message,
            status: error.response.status
        })
    }
}

export const getUsers = page => async dispatch => {
    const skips = page * 5
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const access_token = user.access_token;
        dispatch({type: constants.GET_USERS_REQ})
        const response = await axios.get(uri + '/getUsers/' + skips, {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        });
        dispatch({
            type: constants.GET_USERS_RES,
            payload: response.data,
            status: response.status,
        })
    } catch (error) {
        if (!error.response) {
            dispatch({
                type: constants.GET_USERS_ERROR,
                message: error.message,
                status: undefined
            })
            return
        }
        dispatch({
            type: constants.GET_USERS_ERROR,
            message: error.message,
            status: error.response.status
        })
    }
}