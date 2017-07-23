import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../rootReducer';
import thunk from 'redux-thunk'
import callApi from '../middleware/callApi'

const configureStoreSSR = (preloadedState = {}) => {
  return createStore(rootReducer, preloadedState, compose(
    applyMiddleware(callApi, thunk)
  ));
};

export default configureStoreSSR