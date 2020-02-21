import { createReducer } from '../../services/utils';
import * as actions from './PagesActions';

const pagesSuccess = (state, action) => {
  const payload = action.response;
  return {
    ...state,
    allIds: [...state.allIds, ...payload.result.items],
    byIds: { ...state.byIds, ...payload.entities.pages },
    isFetching: false,
    isFetched: true,
    error: false,
  };
};

const pageSuccess = (state, action) => {
  const payload = action.response;
  return {
    ...state,
    allIds: [...state.allIds, payload.result],
    byIds: { ...state.byIds, ...payload.entities.pages },
    isFetching: false,
    error: false,
  };
};

export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
  isFetched: false,
  error: false,
};

const pagesReducer = createReducer(defaultState, {
  [actions.PAGES_REQUEST]: state => ({
    ...state,
    isFetching: true,
    error: false,
  }),
  [actions.PAGES_SUCCESS]: pagesSuccess,
  [actions.PAGES_FAILURE]: state => ({
    ...state,
    isFetching: false,
    error: true,
  }),
  [actions.PAGE_SUCCESS]: pageSuccess,
  [actions.PAGE_FAILURE]: state => ({
    ...state,
    isFetching: false,
    error: true,
  }),
  'PAGE/CLEAR_ERROR': state => ({ ...state, error: false }),
});

export default pagesReducer;

//selectors
export const getPages = state => state.allIds.map(id => state.byIds[id]);
export const getPage = (state, id) => {
  if (state.byIds[id]) {
    return state.byIds[id];
  }

  return null;
};
