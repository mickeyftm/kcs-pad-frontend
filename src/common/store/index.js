import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    // common: commonReducer,
    });

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
