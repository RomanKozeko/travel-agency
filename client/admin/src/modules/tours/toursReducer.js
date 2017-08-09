import {
  TOURS_REQUEST, TOURS_SUCCESS, TOURS_FAILURE, TOURS_GET_PAGE_FROM_CACHE,
	TOUR_REQUEST, TOUR_SUCCESS, TOUR_FAILURE,
	EDIT_TOUR_REQUEST, EDIT_TOUR_SUCCESS, EDIT_TOUR_FAILURE
} from './toursActions';
import { createReducer, getPageCount } from '../../services/utils';

const toursSuccess = (state, action) => {
  const payload = action.response;
  return {
    ...state,
    allIds: [...state.allIds, ...payload.result.tours],
    byIds: {...state.byIds, ...payload.entities.tours},
    isFetching: false,
    count: payload.result.count,
    pageCount: getPageCount(payload.result.count, payload.result.limit),
    currPage: payload.nextPage,
    pages: {
      ...state.pages,
      [payload.nextPage]: payload.result.tours
    }
  }
};

const tourSuccess = (state, action) => {
	const payload = action.response;
	return {
		...state,
		allIds: [...state.allIds, payload.result],
		byIds: {...state.byIds, ...payload.entities.tours},
		isFetching: false,
	}
};

export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
  pageCount: 0,
  currPage: 0,
  pages: {}
};

const toursReducer = createReducer(defaultState, {
  [TOURS_REQUEST] : (state) => ({...state, isFetching: true}),
  [TOURS_GET_PAGE_FROM_CACHE] : (state, action) => ({...state, currPage: action.payload}),
  [TOURS_SUCCESS] : toursSuccess,
  [TOURS_FAILURE] : (state) => ({...state, isFetching: false}),
	[TOUR_REQUEST] : (state) => ({...state, isFetching: true}),
	[TOUR_SUCCESS] : tourSuccess,
	[TOUR_FAILURE] : (state) => ({...state, isFetching: false}),
	[EDIT_TOUR_REQUEST] : (state) => ({...state, isFetching: true}),
	[EDIT_TOUR_SUCCESS] : tourSuccess,
	[EDIT_TOUR_FAILURE] : (state) => ({...state, isFetching: false})
});

export default toursReducer;

//selectors
export const getTours = state => (state.allIds.map(id => state.byIds[id]));
export const getTour = (state, id) => {
 if(state.byIds[id]) {
	 return state.byIds[id];
 }
};
export const getPageWithTours = (state, page) => {
  if (state.pages[page]) {
    return state.pages[page].map(id => state.byIds[id])
  } else {
    return []
  }
};