import * as constants from "../constants/constants";
import axios from "axios";

const api = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';

export const getUsers = (page) => async (dispatch) => {
	const { access_token } = JSON.parse(localStorage.getItem("user"));
	const skips = page * 5;
	dispatch({ type: constants.GET_USERS_REQ });
	await axios.get(api + "/getUsers/" + skips, {
		headers: {
			Authorization: "Bearer " + access_token,
		},
	}).then((res) => {
		dispatch({
			type: constants.GET_USERS_RES,
			status: res.status,
			payload: res.data.message,
		});
	}).catch((error) => {
		if (error.response) {
			dispatch({
				type: constants.GET_USER_ARTICLES_ERROR,
				message: error.response.data.message,
				status: error.response.status,
			});
		} else if (!error.status) {
			dispatch({
				type: constants.GET_USER_ARTICLES_ERROR,
				message: "Network Error",
				status: 502,
			});
		} else {
			dispatch({
				type: constants.GET_USER_ARTICLES_ERROR,
				message: error.message,
				status: error.status,
			});
		}
	});
};