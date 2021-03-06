import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import authReducer from './modules/auth/authReducer';
import toursReducer, * as fromTours from './modules/tours/toursReducer';
import pagesReducer, * as fromPages from './modules/pages/PagesReducer';
import pageReducer from './modules/pages/pageReducer';
import languagesReducer, * as fromLanguages from './modules/languages/LanguagesReducer';
import categoriesReducer, * as fromCategories from './modules/categories/categoriesReducer';
import regionsReducer from './modules/regions/regionsReducer';
import mediaFilesReducer, * as fromMediaFiles from './modules/mediaFiles/mediaFilesReducer';
import hotelsReducer from './modules/hotels/hotelsReducer';
import showPlacesReducer from './modules/showPlaces/showplacesReducer';
import foodReducer, * as fromFoodReducer from './modules/food/foodReducer';
import entitiesReducer, * as fromEntities from './modules/app/entitiesReducer';
import featuredReducer, * as fromFeatured from './modules/featured/FeaturedReducer';
import menuReducer from './modules/menuBuilder/menuReducer';
import newsReducer from './modules/news/NewsReducer';
import contactsReducer, * as fromContacts from './modules/contacts/ContactsReducer';
import settingsReducer, * as fromSettings from './modules/settings/SettingsReducer';
import sliderReducer, * as fromSlider from './modules/slider/SliderReducer';
import socialReducer, * as fromSocial from './modules/social/SocialReducer';

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
  showplaces: showPlacesReducer,
  food: foodReducer,
  entities: entitiesReducer,
  featured: featuredReducer,
  menu: menuReducer,
  news: newsReducer,
  contacts: contactsReducer,
  settings: settingsReducer,
  slider: sliderReducer,
  social: socialReducer,
});

export default rootReducer;

//  selectors
export const getTours = state => fromTours.getTours(state.tours);
export const getPageWithTours = (state, page) =>
  fromTours.getPageWithTours(state.tours, page);

export const getPage = (state, id) => fromPages.getPage(state.pages, id);
export const getPages = (state, id) => fromPages.getPages(state.pages, id);
export const getPageWithItems = (state, page) =>
  fromPages.getPageWithItems(state.pages, page);

export const getLanguages = state =>
  fromLanguages.getLanguages(state.languages);

export const getCategories = state =>
  fromCategories.getCategories(state.categories);
export const getCategory = (state, id) =>
  fromCategories.getCategory(state.categories, id);

export const getRegions = state =>
  fromEntities.getRegions(state.entities.regions);
export const getRegion = (state, id) =>
  fromEntities.getRegion(state.entities.regions, id);

export const getMediaFiles = (state, id) =>
  fromMediaFiles.getMediaFiles(state.mediafiles, id);

export const getHotels = state => fromEntities.getHotels(state.entities.hotels);
export const getHotel = (state, id) =>
  fromEntities.getHotel(state.entities.hotels, id);
export const getHotelsByFilter = (state, filter) =>
  fromEntities.getHotelsByFilter(state.entities.hotels, filter);

export const getShowplaces = state =>
  fromEntities.getShowplaces(state.entities.showplaces);
export const getShowplace = (state, id) =>
  fromEntities.getShowplace(state.entities.showplaces, id);
export const getShowplacesByFilter = (state, filter) =>
  fromEntities.getShowplacesByFilter(state.entities.showplaces, filter);

export const getFood = state => fromFoodReducer.getFood(state.food);
export const getFoodItem = (state, id) =>
  fromFoodReducer.getFoodItem(state.food, id);

export const getMenu = state => fromEntities.getMenu(state.entities.menu);

export const getFeatured = state => fromFeatured.getFeatured(state.featured);
export const getNews = state => fromFeatured.getFeatured(state.news);
export const getContacts = state => fromContacts.getContacts(state.contacts);
export const getSettings = state => fromSettings.getSettings(state.settings);

export const getSliderItems = state => fromSlider.getSliderItems(state.slider);
export const getSocialItems = state => fromSocial.getSocialItems(state.social);
