import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../rootReducer';
import thunk from 'redux-thunk'
import callApi from '../middleware/callApi'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (initialState = {}) => {
  const middlewares = [
    callApi, thunk
  ];

  const enhancers = [
    applyMiddleware(...middlewares)
  ];


  return createStore(rootReducer, initialState = {}, enhancers);
};

export default configureStore