import {
  createReducer,
  basicReducerEvents,
  createBasicActions,
  getPageCount
} from '../../services/utils';
import { CALL_API, Schemas } from '../../middleware/callApi';

// actions
const actionsObj = createBasicActions('PAGES', 'PAGE', 'pages', CALL_API, Schemas);

// Action Creators
export const actions = actionsObj.actions;
export const load = actionsObj.loadWithPagination;
export const loadAll = actionsObj.load;
export const deleteItems = actionsObj.deleteItems;
export const loadItem = actionsObj.loadItem;
export const saveItem = actionsObj.saveItem;

const pagesSuccess = (state, action) => {
  const payload = action.response;
  return {
    ...state,
    allIds: [...state.allIds, ...payload.result.items],
    byIds: { ...state.byIds, ...payload.entities.items },
    isFetching: false,
    isFetched: true,
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

export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
  isFetched: false,
  pageCount: 0,
  currPage: 0,
  pages: {},
  itemsPerPage: 40,
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
  [actions.PAGE_SUCCESS]: basicReducerEvents.itemSuccess(),
  [actions.PAGE_SAVE_REQUEST]: state => ({ ...state, isSaving: true }),
  [actions.PAGE_SAVE_FAILURE]: state => ({ ...state, isSaving: false }),
  [actions.PAGE_SAVE_SUCCESS]: basicReducerEvents.itemSuccess(),
  [actions.PAGES_FAILURE]: (state, action) => ({ ...state, isFetching: false, isSaving: false })
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

