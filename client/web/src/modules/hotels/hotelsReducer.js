import {createReducer, withPrefix} from '../../services/utils';
import {CALL_API, Schemas} from "../../middleware/callApi";

const HOTEL_REQUEST = 'HOTEL_REQUEST'
const HOTEL_SUCCESS = 'HOTEL_SUCCESS'
const HOTEL_FAILURE = 'HOTEL_FAILURE'

export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
  isFetched: false
};

const hotelSuccess = (state, action) => {
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

const fetchHotel = (url, urlPrefix) => ({
  [CALL_API]: {
    types: [HOTEL_REQUEST, HOTEL_SUCCESS, HOTEL_FAILURE],
    endpoint: withPrefix(`/api/hotelGetByUrl/${url}`, urlPrefix),
    schema: Schemas.HOTEL
  }
});


export const loadHotel = url => (dispatch, getState) => {
  const state = getState();
  if (!state.hotels.byIds[url]) {
    return dispatch(fetchHotel(url, state.app.languages.urlPrefix));
  }
  return null;
};


export default createReducer(defaultState, {
  [HOTEL_REQUEST] : (state) => ({...state, isFetching: true}),
  [HOTEL_SUCCESS] : hotelSuccess,
  [HOTEL_FAILURE]: (state) => ({...state, isFetching: false}),
});

export const getHotel = (state, id) => {
  if (state.byIds[id]) {
    return state.byIds[id];
  }

  return null;
};