import * as constants from "../constants/constants";
import axios from "axios";

const uri = "http://localhost:4000";

export const registerUsers = (formData) => async (dispatch) => {
    dispatch({
      type: constants.REG_USERS_REQ,
    });
    await axios.post(uri + "/register", formData)
    .then(res => {
        dispatch({
            type: constants.REG_USERS_RES,
            payload: res.data,
            status: res.status,
        });
    }).catch(err => {
        dispatch({
            type: constants.REG_USERS_ERROR,
            message: err.message,
        });
    })
};

export const loginUsers = (formData) => async (dispatch) => {
  dispatch({
    type: constants.LOGIN_USERS_REQ,
  });
  await axios.post(uri + "/login", formData)
    .then((res) => {
      dispatch({
        type: constants.LOGIN_USERS_RES,
        status: res.status,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: constants.LOGIN_USERS_ERROR,
        message: error.message,
        status: error.response.status,
      });
    });
};

export const updateUsers = (_id, formData) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const access_token = user.access_token;
    dispatch({
      type: constants.UPDATE_USERS_REQ,
    });
    await axios.put(uri + "/updateUser/" + _id, formData, {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    }).then(res=>{
        dispatch({
            type: constants.UPDATE_USERS_RES,
            payload: res.data,
            status: res.status,
        });

    }).catch(err=>{
        dispatch({
            type: constants.UPDATE_USERS_ERROR,
            message: err.message,
            status: err.response.status,
        });

    })
};
