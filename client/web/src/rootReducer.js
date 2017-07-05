import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import toursReducer from './modules/tours/toursReducer'
import appReducer from './modules/app/appReducer'

const rootReducer = combineReducers({
  toursReducer,
  app: appReducer,
  form: formReducer,
});

export default rootReducer