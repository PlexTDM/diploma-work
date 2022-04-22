import * as constants from "../constants/constants";
import axios from "axios";

const uri = "http://localhost:4000";
// const uri = ' ';

export const getUserData = (userId) => async (dispatch) => {
	const user = JSON.parse(localStorage.getItem("user"));
	const access_token = user.access_token;
	await axios.get(uri + "/getUser/" + userId, {
		headers: {
			Authorization: "Bearer " + access_token,
		},
	}).then(res => {
		dispatch({
			type: constants.GET_USER_DATA,
			status: res.status,
			payload: res.data,
		});
	}).catch(error => {
		if (error.response) {
			dispatch({
				type: constants.GET_USER_DATA_ERROR,
				message: error.response.data.message,
				status: error.response.status,
			});
		} else if (!error.status) {
			dispatch({
				type: constants.GET_USER_DATA_ERROR,
				message: "Network Error",
				status: 502,
			});
		} else {
			dispatch({
				type: constants.GET_USER_DATA_ERROR,
				message: error.message,
				status: error.status,
			});
		}
	});
};

export const getUserArticle = (userId) => async (dispatch) => {
	const user = JSON.parse(localStorage.getItem("user"));
	const access_token = user.access_token;
	await axios.get(uri + "/getUserArticles/" + userId, {
		headers: {
			Authorization: "Bearer " + access_token,
		},
	}).then(res => {
		dispatch({
			type: constants.GET_USER_ARTICLES,
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

export const getUsers = (page) => async (dispatch) => {
	const skips = page * 5;
	const user = JSON.parse(localStorage.getItem("user"));
	const access_token = user.access_token;
	dispatch({ type: constants.GET_USERS_REQ });
	await axios.get(uri + "/getUsers/" + skips, {
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

export const getHomeArticles = (num) => async (dispatch) => {
	dispatch({ type: constants.GET_HOME_PAGE_REQ });
	await axios.get(uri + `/latest/${num}`,
	).then(res => {
		dispatch({
			type: constants.GET_HOME_PAGE_RES,
			status: res.status,
			payload: res.data.message,
		});
	}).catch(error => {
		if (error.response) {
			dispatch({
				type: constants.GET_HOME_PAGE_ERROR,
				message: error.response.data.message,
				status: error.response.status,
			});
		} else if (!error.status) {
			dispatch({
				type: constants.GET_HOME_PAGE_ERROR,
				message: "Network Error",
				status: 502,
			});
		} else {
			dispatch({
				type: constants.GET_HOME_PAGE_ERROR,
				message: error.message,
				status: error.status,
			});
		}
	});
};
