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

export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
  isFetched: false
};

const pagesReducer = createReducer(defaultState, {
  [actions.PAGES_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.PAGES_SUCCESS]: pagesSuccess,
  [actions.PAGES_FAILURE]: state => ({ ...state, isFetching: false })
});

export default pagesReducer;

//selectors
export const getPages = state => (state.allIds.map(id => state.byIds[id]));
