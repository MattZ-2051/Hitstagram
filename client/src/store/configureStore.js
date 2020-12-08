import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import auth from './auth';
import posts from './post';


const composeEnhancers =
    (nodeEnv !== 'production' &&
        typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

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
