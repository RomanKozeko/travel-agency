import {
  PAGES_REQUEST, PAGES_SUCCESS, PAGES_FAILURE, PAGES_GET_PAGE_FROM_CACHE,
  PAGE_REQUEST, PAGE_SUCCESS, PAGE_FAILURE
} from './PagesActions';
import { createReducer, getPageCount } from '../../services/utils';

const pagesSuccess = (state, action) => {
  const payload = action.response;
  return {
    ...state,
    allIds: [...state.allIds, ...payload.result.items],
    byIds: { ...state.byIds, ...payload.entities.items },
    isFetching: false,
    count: payload.result.count,
    pageCount: getPageCount(payload.result.count, payload.result.limit),
    currPage: payload.nextPage,
    pages: {
      ...state.pages,
      [payload.nextPage]: payload.result.items
    }
  };
};

const pageSuccess = (state, action) => {
  const payload = action.response;
  return {
    ...state,
    allIds: [...state.allIds, payload.result],
    byIds: { ...state.byIds, ...payload.entities.items },
    isFetching: false,
  };
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
  [PAGES_REQUEST]: state => ({ ...state, isFetching: true }),
  [PAGES_GET_PAGE_FROM_CACHE]: (state, action) => ({ ...state, currPage: action.payload }),
  [PAGES_SUCCESS]: pagesSuccess,
  [PAGES_FAILURE]: state => ({ ...state, isFetching: false }),
  [PAGE_REQUEST]: state => ({ ...state, isFetching: true }),
  [PAGE_SUCCESS]: pageSuccess,
  [PAGES_FAILURE]: state => ({ ...state, isFetching: false })
});

export default toursReducer;

//  selectors
export const getPages = state => (state.allIds.map(id => state.byIds[id]));
export const getPage = (state, id) => {
  if (state.byIds[id]) {
    return state.byIds[id];
  }

  return null;
};
export const getPageWithItems = (state, page) => {
  if (state.pages[page]) {
    return state.pages[page].map(id => state.byIds[id]);
  }
  return [];
};
