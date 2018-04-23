import {createReducer, withPrefix} from '../../services/utils';
import {CALL_API, Schemas} from "../../middleware/callApi";

const SHOWPLACE_REQUEST = 'SHOWPLACE_REQUEST'
const SHOWPLACE_SUCCESS = 'SHOWPLACE_SUCCESS'
const SHOWPLACE_FAILURE = 'SHOWPLACE_FAILURE'

export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
  isFetched: false
};

const itemSuccess = (state, action) => {
  const payload = action.response;
  const allIds = [...state.allIds];

  if (allIds.indexOf(payload.result) === -1) {
    allIds.push(payload.result)
  }

  return {
    ...state,
    allIds,
    byIds: { ...state.byIds, ...payload.entities.items },
    isSaving: false,
    isFetching: false
  };
};

const fetchShowPlace = (url, urlPrefix) => ({
  [CALL_API]: {
    types: [SHOWPLACE_REQUEST, SHOWPLACE_SUCCESS, SHOWPLACE_FAILURE],
    endpoint: withPrefix(`/api/showPlacesGetByUrl/${url}`, urlPrefix),
    schema: Schemas.HOTEL
  }
});


export const loadShowPlace = url => (dispatch, getState) => {
  const state = getState();
  if (!state.showplaces.byIds[url]) {
    return dispatch(fetchShowPlace(url, state.app.languages.urlPrefix));
  }
  return null;
};


export default createReducer(defaultState, {
  [SHOWPLACE_REQUEST] : (state) => ({...state, isFetching: true}),
  [SHOWPLACE_SUCCESS] : itemSuccess,
  [SHOWPLACE_FAILURE]: (state) => ({...state, isFetching: false}),
});

export const getShowPlace = (state, id) => {
  if (state.byIds[id]) {
    return state.byIds[id];
  }

  return null;
};