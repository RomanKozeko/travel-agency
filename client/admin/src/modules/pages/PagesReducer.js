import * as actions from './PagesActions';
import { createReducer, getPageCount } from '../../services/utils';

const pagesSuccess = (state, action) => {
  const payload = action.response;
  return {
    ...state,
    allIds: [...state.allIds, ...payload.result.items],
    byIds: { ...state.byIds, ...payload.entities.items },
    pagesContent: { ...state.pagesContent, ...payload.entities.content },
    rows: { ...state.rows, ...payload.entities.rows },
    rowsItems: { ...state.rowsItems, ...payload.entities.rowsItems },
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

const pagesDeleteSuccess = (state, action) => {
  const idsToRemove = action.response.result;
  const byIds = { ...state.byIds };
  const allIds = [...state.allIds];

  Object.keys(idsToRemove).forEach((id) => {
    delete byIds[idsToRemove[id]];
    const index = allIds.indexOf(idsToRemove[id]);
    if (index > -1) {
      allIds.splice(index, 1);
    }
  });

  return {
    ...state,
    allIds,
    byIds,
    pages: {
      ...state.pages,
      [state.currPage]: allIds
    }
  };
};

const pageSuccess = (state, action) => {
  const payload = action.response;
  let pageItems;

  // TODO: make support for multiple pages
  pageItems = [...state.pages[state.currPage]];
  pageItems.push(payload.result);

  return {
    ...state,
    allIds: [...state.allIds, payload.result],
    byIds: { ...state.byIds, ...payload.entities.items },
    pagesContent: { ...state.pagesContent, ...payload.entities.content },
    rows: { ...state.rows, ...payload.entities.rows },
    rowsItems: { ...state.rowsItems, ...payload.entities.rowsItems },
    isFetching: false,
    isPageSaving: false,
    pages: {
      ...state.pages,
      [state.currPage]: pageItems
    }
  };
};

export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
  pageCount: 0,
  currPage: 0,
  pages: {},
  pagesContent: {}
};

const pagesReducer = createReducer(defaultState, {
  [actions.PAGES_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.PAGES_GET_PAGE_FROM_CACHE]: (state, action) => ({ ...state, currPage: action.payload }),
  [actions.PAGES_SUCCESS]: pagesSuccess,
  [actions.PAGES_DELETE_REQUEST]: state => ({ ...state, isDeleting: true }),
  [actions.PAGES_DELETE_SUCCESS]: pagesDeleteSuccess,
  [actions.PAGES_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.PAGE_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.PAGE_SUCCESS]: pageSuccess,
  [actions.PAGE_SAVE_REQUEST]: state => ({ ...state, isPageSaving: true }),
  [actions.PAGE_SAVE_SUCCESS]: pageSuccess,
  [actions.PAGES_FAILURE]: state => ({ ...state, isFetching: false })
});

export default pagesReducer;

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

export const getContentByLang = (state, contentId, lang) => {
  const content = state.pages.pagesContent;

  if (content[contentId].language === lang._id) {
    return content[contentId];
  }
  return null;
};

