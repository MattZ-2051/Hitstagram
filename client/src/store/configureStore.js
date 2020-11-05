import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

//reducer - auth
const reducer = combineReducers({
    auth,
});

//store
const configureStore = () => {
    return createStore(
        reducer,
        storeEnhancer
    );
};

const storeEnhancer = composeEnhancers(applyMiddleware(thunk, logger));

export default configureStore;
