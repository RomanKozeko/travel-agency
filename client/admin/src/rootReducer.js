import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {reducer as toastrReducer} from 'react-redux-toastr';
import authReducer from './modules/auth/authReducer';
// import regionsReducer, * as fromRegions from './modules/regions/RegionsReducer';
import toursReducer, * as fromTours from './modules/tours/toursReducer';
import pagesReducer, * as fromPages from './modules/pages/PagesReducer';
import pageReducer from './modules/pages/pageReducer';
import languagesReducer, * as fromLanguages from './modules/languages/LanguagesReducer';
import categoriesReducer, * as fromCategories from './modules/categories/categoriesReducer';
import regionsReducer, * as fromRegions from './modules/regions/regionsReducer';
import mediaFilesReducer, * as fromMediaFiles from './modules/mediaFiles/mediaFilesReducer';
import hotelsReducer, * as fromMHotels from './modules/hotels/hotelsReducer';
import showPlacesReducer, * as fromShowPlaces from './modules/showPlaces/showPlacesReducer';
import foodReducer, * as fromFoodReducer from './modules/food/foodReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  tours: toursReducer,
  form: formReducer,
  pages: pagesReducer,
  page: pageReducer,
  regions: regionsReducer,
  languages: languagesReducer,
  toastr: toastrReducer,
  categories: categoriesReducer,
  mediafiles: mediaFilesReducer,
  hotels: hotelsReducer,
  showPlaces: showPlacesReducer,
  food: foodReducer
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

export const getCategories = state => fromCategories.getCategories(state.categories);
export const getCategory = (state, id) => fromCategories.getCategory(state.categories, id);

export const getRegions = state => fromRegions.getRegions(state.regions);
export const getRegion = (state, id) => fromRegions.getRegion(state.regions, id);

export const getMediaFiles = (state, id) => fromMediaFiles.getMediaFiles(state.mediafiles, id);

export const getHotels = (state) => fromMHotels.getHotels(state.hotels);
export const getHotel = (state, id) => fromMHotels.getHotel(state.hotels, id);

export const getShowPlaces = (state) => fromShowPlaces.getShowPlaces(state.showPlaces);
export const getShowPlace = (state, id) => fromShowPlaces.getShowPlace(state.showPlaces, id);

export const getFood = (state) => fromFoodReducer.getFood(state.food);
export const getFoodItem = (state, id) => fromFoodReducer.getFoodItem(state.food, id);

