import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './modules/auth/authReducer'
import toursReducer, * as fromTours from './modules/tours/toursReducer'

const rootReducer = combineReducers({
	auth: authReducer,
	tours: toursReducer,
  form: formReducer
});

export default rootReducer;


//selectors
export const getTours = state => fromTours.getTours(state.tours);
export const getPageWithTours = (state, page) => fromTours.getPageWithTours(state.tours, page);