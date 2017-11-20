import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import appReducer, * as fromApp from './modules/app/appReducer';
import pagesReducer, * as fromPages from './modules/pages/PagesReducer';
import toursReducer, * as fromTours from './modules/tours/toursReducer';

const rootReducer = combineReducers({
  tours: toursReducer,
  app: appReducer,
  form: formReducer,
  pages: pagesReducer
});

export default rootReducer;


//selectors
export const getTours = state => fromTours.getTours(state.tours);
export const getToursByQuery = (state, query) => fromTours.getToursByQuery(state.tours, query);
export const getPages = state => fromPages.getPages(state.pages);
export const getPage = (state, id) => fromPages.getPage(state.pages, id);
export const getPageWithTours = (state, page) => fromTours.getPageWithTours(state.tours, page);
export const getLanguages = state => fromApp.getLanguages(state.app.languages);