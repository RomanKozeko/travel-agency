import {
  REGIONS_REQUEST, REGIONS_SUCCESS, REGIONS_FAILURE, REGIONS_GET_PAGE_FROM_CACHE,
	REGION_REQUEST, REGION_SUCCESS, REGION_FAILURE
} from './RegionsActions';
import { createReducer, getPageCount } from '../../services/utils';

const regionsSuccess = (state, action) => {
  const payload = action.response;
  return {
    ...state,
    allIds: [...state.allIds, ...payload.result.items],
    byIds: { ...state.byIds, ...payload.entities.regions },
    regionsContent: { ...state.regionsContent, ...payload.entities.content },
    isFetching: false,
    count: payload.result.count,
    pageCount: getPageCount(payload.result.count, payload.result.limit),
    currPage: payload.nextPage,
    pages: {
      ...state.pages,
      [payload.nextPage]: payload.result.regions
    }
  };
};

const regionSuccess = (state, action) => {
  const payload = action.response;
  return {
    ...state,
    allIds: [...state.allIds, payload.result],
    byIds: { ...state.byIds, ...payload.entities.regions },
    isFetching: false,
  };
};

export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
  pageCount: 0,
  currPage: 0,
  pages: {},
  regionsContent: {}
};

const
  regionsReducer = createReducer(defaultState, {
    [REGIONS_REQUEST]: state => ({ ...state, isFetching: true }),
    [REGIONS_GET_PAGE_FROM_CACHE]: (state, action) => ({ ...state, currPage: action.payload }),
    [REGIONS_SUCCESS]: regionsSuccess,
    [REGIONS_FAILURE]: state => ({ ...state, isFetching: false }),
    [REGION_REQUEST]: state => ({ ...state, isFetching: true }),
    [REGION_SUCCESS]: regionSuccess,
    [REGIONS_FAILURE]: state => ({ ...state, isFetching: false }),
  });


export default regionsReducer;

//  selectors
export const getRegions = state => (state.allIds.map(id => state.byIds[id]));
export const getRegion = (state, id) => {
  if (state.byIds[id]) {
    return state.byIds[id];
  }

  return null;
};
