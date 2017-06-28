import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import toursReducer from './modules/tours/toursReducer'

const rootReducer = combineReducers({
  toursReducer,
  form: formReducer,
});

export default rootReducer