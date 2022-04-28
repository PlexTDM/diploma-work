import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { loginUsers, registerUsers, updateUsers } from './reducers/authReducers';
import { userData, userArticle, getUsers, homePageData } from './reducers/userData';

const reducers = combineReducers({
    register: registerUsers,
    login: loginUsers,
    homePage: homePageData,
    userData: userData,
    userArticles: userArticle,
    getUsers: getUsers,
    updateUsers: updateUsers
});
const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export default store;