import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import appReducer from './modules/app/appReducer'
import toursReducer, * as fromTours from './modules/tours/toursReducer'

const rootReducer = combineReducers({
  tours: toursReducer,
  app: appReducer,
  form: formReducer
});

export default rootReducer;


//selectors
export const getTours = state => fromTours.getTours(state.tours);
export const getPageWithTours = (state, page) => fromTours.getPageWithTours(state.tours, page);