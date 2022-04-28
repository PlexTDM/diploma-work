import * as constants from "../constants/constants";
import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';

const api = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';

export const getUserData = createAsyncThunk(constants.GET_USER_DATA, async (userId, { dispatch }) => {
	const { access_token } = JSON.parse(localStorage.getItem("user"));
	const res = await axios.get(api + "/getUser/" + userId, {
		headers: {
			Authorization: "Bearer " + access_token,
		},
	})
	console.log(res)
	return ({
		status: res.status,
		user: res.data.user,
	})
	// dispatch({
	// 	type: constants.GET_USER_DATA,
	// 	status: res.status,
	// 	payload: res.data,
	// });
});

// import useFetch from "../hooks/useFetch";
// import { useEffect } from "react";


// export const getUserData = (userId) => async (dispatch) => {
// 	await axios.get(api + "/getUser/" + userId, {
// 		headers: {
// 			Authorization: "Bearer " + access_token,
// 		},
// 	}).then(res => {
// 		dispatch({
// 			type: constants.GET_USER_DATA,
// 			status: res.status,
// 			payload: res.data,
// 		});
// 	}).catch(error => {
// 		if (error.response) {
// 			dispatch({
// 				type: constants.GET_USER_DATA_ERROR,
// 				message: error.response.data.message,
// 				status: error.response.status,
// 			});
// 		} else if (!error.status) {
// 			dispatch({
// 				type: constants.GET_USER_DATA_ERROR,
// 				message: "Network Error",
// 				status: 502,
// 			});
// 		} else {
// 			dispatch({
// 				type: constants.GET_USER_DATA_ERROR,
// 				message: error.message,
// 				status: error.status,
// 			});
// 		}
// 	});
// };

export const getUserArticle = (userId, skips) => async (dispatch) => {
	const { access_token } = JSON.parse(localStorage.getItem("user"));
	await axios.get(`${api}/getUserArticles/${userId}?skips=${skips}&limit=5`, {
		headers: {
			Authorization: "Bearer " + access_token,
		},
	}).then(res => {
		dispatch({
			type: constants.GET_USER_ARTICLES,
			status: res.status,
			payload: res.data,
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

export const getHomeArticles = (num) => async (dispatch) => {
	dispatch({ type: constants.GET_HOME_PAGE_REQ });
	await axios.get(api + `/latest/${num}`,
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
