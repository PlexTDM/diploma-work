import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { loginUsers, registerUsers, updateUsers } from './reducers/authReducers';
import { getUsers } from './reducers/userData';
import homeSlice from './features/homeArticles';
import userDataSlice from './features/getUserData';
import userArticlesSlice from './features/getUserArticles';

const reducers = combineReducers({
    homePage: homeSlice,
    userData: userDataSlice,
    userArticles: userArticlesSlice,
    register: registerUsers,
    login: loginUsers,
    getUsers: getUsers,
    updateUsers: updateUsers,
});
const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export default store;