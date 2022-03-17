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
        console.log(response.data);
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
        console.log(response.data.message);
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
        }
        dispatch({
            type: constants.GET_USER_ARTICLES_ERROR,
            message: error.message,
            status: error.response.status
        })
    }
}