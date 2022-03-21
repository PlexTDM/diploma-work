import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { loginUsers, registerUsers, updateUsers } from './reducers/authReducers';
import { userData, userArticle, getUsers } from './reducers/userData';

const reducers = combineReducers({
    register: registerUsers,
    login: loginUsers,
    userData: userData,
    userArticles: userArticle,
    getUsers: getUsers,
    updateUsers: updateUsers
});

const middleware = [thunk];

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;