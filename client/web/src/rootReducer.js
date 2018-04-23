import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import appReducer, * as fromApp from './modules/app/appReducer';
import entitiesReducer, * as fromEntities from './modules/app/entitiesReducer';
import pagesReducer, * as fromPages from './modules/pages/PagesReducer';
import toursReducer, * as fromTours from './modules/tours/toursReducer';
import promoLinksReducer, * as fromPromoLinks from './modules/promoLinks/promoLinksReducer';
import latestNewsReducer, * as fromLatestNews from './modules/latestNews/latestNewsReducer';
import contactsReducer, * as fromContacts from './modules/header/headerReducer';
import hotelsReducer, * as fromHotels from './modules/hotels/hotelsReducer';
import showplacesReducer, * as fromShowPlaces from './modules/showplaces/showplacesReducer';

const rootReducer = combineReducers({
  tours: toursReducer,
  app: appReducer,
  form: formReducer,
  pages: pagesReducer,
  promoLinks: promoLinksReducer,
  latestNews: latestNewsReducer,
  contacts: contactsReducer,
  entities: entitiesReducer,
  hotels: hotelsReducer,
  showplaces: showplacesReducer
});

export default rootReducer;


//selectors
export const getTours = state => fromTours.getTours(state.tours);
export const getTour = (state, id) => fromTours.getTour(state.tours, id);
export const getToursByQuery = (state, query) => fromTours.getToursByQuery(state.tours, query);
export const getPages = state => fromPages.getPages(state.pages);
export const getPage = (state, id) => fromPages.getPage(state.pages, id);
export const getPageWithTours = (state, page) => fromTours.getPageWithTours(state.tours, page);
export const getLanguages = state => fromApp.getLanguages(state.app.languages);
export const getPromoLinks = state => fromPromoLinks.getPromoLinks(state.promoLinks);
export const getLatestNews = state => fromLatestNews.getLatestNews(state.latestNews);
export const getContacts = state => fromContacts.getContacts(state.contacts);
export const getRegions = state => {
  return fromEntities.getRegions(state.entities.regions)
};
export const getCategories = state => fromEntities.getCategories(state.entities.categories);
export const getHotel = (state, id) => fromHotels.getHotel(state.hotels, id);
export const getShowPlace = (state, id) => fromShowPlaces.getShowPlace(state.showplaces, id);