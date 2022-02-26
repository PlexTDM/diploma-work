import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { loginUsers, registerUsers } from './reducers/authReducers';
// import { getProfilePic } from './reducer/profileReducer';
// import { createPost, getPosts } from './reducer/postReducer';

const reducers = combineReducers({
    register: registerUsers,
    login: loginUsers,
    // getpfp: getProfilePic,
    // postingStatus: createPost,
    // getPostsStatus: getPosts,
});

const middleware = [thunk];

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;