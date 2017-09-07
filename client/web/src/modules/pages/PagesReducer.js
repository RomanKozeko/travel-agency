import { createReducer, getPageCount } from '../../services/utils';
import * as actions from './PagesActions';

const pagesSuccess = (state, action) => {
  const payload = action.response;
  return {
    ...state,
    allIds: [...state.allIds, ...payload.result.items],
    byIds: { ...state.byIds, ...payload.entities.pages },
    isFetching: false,
    isFetched: true
  };
};

const pageSuccess = (state, action) => {
  const payload = action.response;
  return {
    ...state,
    allIds: [...state.allIds, payload.result],
    byIds: { ...state.byIds, ...payload.entities.pages },
    isFetching: false,
  };
};

export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
  isFetched: false
};

const pagesReducer = createReducer(defaultState, {
  [actions.PAGES_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.PAGES_SUCCESS]: pagesSuccess,
  [actions.PAGES_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.PAGE_SUCCESS]: pageSuccess
});

export default pagesReducer;

//selectors
export const getPages = state => (state.allIds.map(id => state.byIds[id]));
export const getPage = (state, id) => {
  if (state.byIds[id]) {
    return state.byIds[id];
  }

  return null;
};
