import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import homeSlice from './features/homeArticles';
import userDataSlice from './features/getUserData';
import userArticlesSlice from './features/getUserArticles';
import loginSlice from './features/login';
import registerSlice from './features/register';
import updateUserSlice from './features/updateUser';
import getUsersSlice from './features/getUsers';
import deleteArticleSlice from './features/deleteArticle';
import updateArticleSlice from './features/updateArticle';
import uploadArticleSlice from './features/uploadArticle';

const reducers = combineReducers({
    userArticles: userArticlesSlice,
    updateUsers: updateUserSlice,
    userData: userDataSlice,
    getUsers: getUsersSlice,
    homePage: homeSlice,

    updateArticle: updateArticleSlice,
    uploadArticle: uploadArticleSlice,
    deleteArticle: deleteArticleSlice,

    register: registerSlice,
    login: loginSlice,
});
const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export default store;