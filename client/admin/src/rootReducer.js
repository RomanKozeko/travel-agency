import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './modules/auth/authReducer';
import toursReducer, * as fromTours from './modules/tours/toursReducer';
import pagesReducer, * as fromPages from './modules/pages/PagesReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  tours: toursReducer,
  form: formReducer,
  pages: pagesReducer
});

export default rootReducer;

//  selectors
export const getTours = state => fromTours.getTours(state.tours);
export const getPageWithTours = (state, page) => fromTours.getPageWithTours(state.tours, page);

export const getPage = (state, id) => fromPages.getPage(state.pages, id);
export const getPageWithItems = (state, page) => fromPages.getPageWithItems(state.pages, page);