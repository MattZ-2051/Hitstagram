import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import auth from './auth';
import posts from './post';


const composeEnhancers = compose

//reducer - auth
const reducer = combineReducers({
    auth,
    posts
});

//store
const configureStore = () => {
    return createStore(
        reducer,
        storeEnhancer
    );
};

const storeEnhancer = composeEnhancers(applyMiddleware(thunk));

export default configureStore;
