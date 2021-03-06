import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import appReducer, * as fromApp from './modules/app/appReducer';
import entitiesReducer, * as fromEntities from './modules/app/entitiesReducer';
import pagesReducer, * as fromPages from './modules/pages/PagesReducer';
import toursReducer, * as fromTours from './modules/tours/toursReducer';
import promoLinksReducer, * as fromPromoLinks from './modules/promoLinks/promoLinksReducer';
import latestNewsReducer, * as fromLatestNews from './modules/latestNews/latestNewsReducer';
import contactsReducer, * as fromContacts from './modules/header/headerReducer';
import menuReducer, * as fromMenu from './modules/menu/menuReducer';
import hotelsReducer, * as fromHotels from './modules/hotels/hotelsReducer';
import showplacesReducer, * as fromShowPlaces from './modules/showplaces/showplacesReducer';
import orderReducer from './modules/orderForm/orderReducer';
import PhotoSliderReducer, * as fromPhotoSlider from './modules/photoSlider/PhotoSliderReducer';
import SocialReducer, * as fromSocial from './modules/social/SocialReducer';

const rootReducer = combineReducers({
  tours: toursReducer,
  app: appReducer,
  form: formReducer,
  pages: pagesReducer,
  promoLinks: promoLinksReducer,
  latestNews: latestNewsReducer,
  contacts: contactsReducer,
  menu: menuReducer,
  entities: entitiesReducer,
  hotels: hotelsReducer,
  showplaces: showplacesReducer,
  order: orderReducer,
  photoSlider: PhotoSliderReducer,
  social: SocialReducer,
});

export default rootReducer;

//selectors
export const getTour = (state, id) => fromTours.getTour(state.tours, id);
export const getToursByQuery = (state, query) =>
  fromTours.getToursByQuery(state.tours, query);
export const getPages = state => fromPages.getPages(state.pages);
export const getPage = (state, id) => fromPages.getPage(state.pages, id);
export const getPageWithTours = (state, page) =>
  fromTours.getPageWithTours(state.tours, page);
export const getLanguages = state => fromApp.getLanguages(state.app.languages);
export const getPromoLinks = state =>
  fromPromoLinks.getPromoLinks(state.promoLinks);
export const getLatestNews = state =>
  fromLatestNews.getLatestNews(state.latestNews);
export const getContacts = state => fromContacts.getContacts(state.contacts);
export const getRegions = state =>
  fromEntities.getRegions(state.entities.regions);
export const getCategories = state =>
  fromEntities.getCategories(state.entities.categories);
export const getMenu = state => fromMenu.getMenu(state.menu);
export const getHotel = (state, id) => fromHotels.getHotel(state.hotels, id);
export const getHotelsByQuery = (state, query) =>
  fromHotels.getHotelsByQuery(state.hotels, query);
export const getShowPlace = (state, id) =>
  fromShowPlaces.getShowPlace(state.showplaces, id);
export const getShowplacesByQuery = (state, query) =>
  fromShowPlaces.getShowplacesByQuery(state.showplaces, query);
export const getPhotoSliders = state =>
  fromPhotoSlider.getPhotoSliders(state.photoSlider);
export const getSocial = state => fromSocial.getSocial(state.social);
