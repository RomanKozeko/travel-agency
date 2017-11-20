import {
  TOURS_REQUEST,
  TOURS_SUCCESS,
  TOURS_FAILURE,
  TOURS_GET_PAGE_FROM_CACHE,
  TOURS_FILTERED_REQUEST,
  TOURS_FILTERED_SUCCESS,
  TOURS_FILTERED_FAILURE
} from './toursActions';
import { createReducer, getPageCount } from '../../services/utils';


const toursSuccess = (state, action) => {
  const payload = action.response;
  return {
    ...state,
    allIds: [...state.allIds, ...payload.result.items],
    byIds: {...state.byIds, ...payload.entities.items},
    isFetching: false,
    count: payload.result.count,
    pageCount: getPageCount(payload.result.count, payload.result.limit),
    currPage: payload.nextPage,
    pages: {
      ...state.pages,
      [payload.nextPage]: payload.result.items
    }
  }
};

const filteredToursSuccess = (state, action) => {
  return {
    ...state,
    byIds: {...state.byIds, ...action.response.entities.items},
    isFetching: false,
    byQueries: {
      ...state.byQueries,
      [action.response.query]: action.response.result.items
    }
  }
};

export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
  pageCount: 0,
  currPage: 0,
  byQueries: {},
  pages: {}
};

const toursReducer = createReducer(defaultState, {
  [TOURS_REQUEST] : (state) => ({...state, isFetching: true}),
  [TOURS_GET_PAGE_FROM_CACHE] : (state, action) => ({...state, currPage: action.payload}),
  [TOURS_SUCCESS] : toursSuccess,
  [TOURS_FAILURE]: (state) => ({...state, isFetching: false}),
  [TOURS_FILTERED_REQUEST]: (state) => ({...state, isFetching: true}),
  [TOURS_FILTERED_SUCCESS]: filteredToursSuccess,
  [TOURS_FILTERED_FAILURE]: (state) => ({...state, isFetching: false}),
});

export default toursReducer;


//selectors
export const getTours = state => (state.allIds.map(id => state.byIds[id]));
export const getToursByQuery = (state, query) => {
  if (state.byQueries[query]) {
    return state.byQueries[query].map(id => state.byIds[id])
  } else {
    return []
  }
};
export const getPageWithTours = (state, page) => {
  if (state.pages[page]) {
    return state.pages[page].map(id => state.byIds[id])
  } else {
    return []
  }
};