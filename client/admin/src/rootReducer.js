import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {reducer as toastrReducer} from 'react-redux-toastr';
import authReducer from './modules/auth/authReducer';
import regionsReducer, * as fromRegions from './modules/regions/RegionsReducer';
import toursReducer, * as fromTours from './modules/tours/toursReducer';
import pagesReducer, * as fromPages from './modules/pages/PagesReducer';
import pageReducer from './modules/pages/pageReducer';
import languagesReducer, * as fromLanguages from './modules/languages/LanguagesReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  tours: toursReducer,
  form: formReducer,
  pages: pagesReducer,
  page: pageReducer,
  regions: regionsReducer,
  languages: languagesReducer,
  toastr: toastrReducer
});

export default rootReducer;

//  selectors
export const getTours = state => fromTours.getTours(state.tours);
export const getPageWithTours = (state, page) => fromTours.getPageWithTours(state.tours, page);

export const getPage = (state, id) => fromPages.getPage(state.pages, id);
export const getPageWithItems = (state, page) => fromPages.getPageWithItems(state.pages, page);
export const getContentByLang = (
  state, contentId, lang
) => fromPages.getContentByLang(state, contentId, lang);

export const getLanguages = state => fromLanguages.getLanguages(state.languages);

