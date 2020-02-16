import { CALL_API, Schemas } from '../../middleware/callApi';
import { withPrefix, getFiltersQuery } from '../../services/utils';

export const HOTEL_REQUEST = 'HOTEL_REQUEST';
export const HOTEL_SUCCESS = 'HOTEL_SUCCESS';
export const HOTEL_FAILURE = 'HOTEL_FAILURE';
export const HOTELS_REQUEST = 'HOTELS_REQUEST';
export const HOTELS_SUCCESS = 'HOTELS_SUCCESS';
export const HOTELS_FAILURE = 'HOTELS_FAILURE';
export const HOTELS_FILTERED_REQUEST = 'HOTELS_FILTERED_REQUEST';
export const HOTELS_FILTERED_SUCCESS = 'HOTELS_FILTERED_SUCCESS';
export const HOTELS_FILTERED_FAILURE = 'HOTELS_FILTERED_FAILURE';
export const HOTELS_SET_ACTIVE_FILTER = 'HOTELS_SET_ACTIVE_FILTER';
export const HOTELS_RESET_ACTIVE_FILTER = 'HOTELS_RESET_ACTIVE_FILTER';

export const fetchHotel = (url, urlPrefix) => ({
  [CALL_API]: {
    types: [HOTEL_REQUEST, HOTEL_SUCCESS, HOTEL_FAILURE],
    endpoint: withPrefix(`/api/hotelGetByUrl/${url}`, urlPrefix),
    schema: Schemas.HOTEL,
  },
});

export const loadHotel = url => (dispatch, getState) => {
  const state = getState();
  if (!state.hotels.byIds[url]) {
    return dispatch(fetchHotel(url, state.app.languages.urlPrefix));
  }
  return null;
};

export const fetchFilteredHotels = (filterQuery, lang) => ({
  [CALL_API]: {
    types: [
      HOTELS_FILTERED_REQUEST,
      HOTELS_FILTERED_SUCCESS,
      HOTELS_FILTERED_FAILURE,
    ],
    endpoint: withPrefix(`/api/hotels?${filterQuery}`, lang),
    schema: Schemas.HOTELS,
    query: filterQuery,
  },
});

export const resetActiveFilter = () => dispatch => {
  dispatch({
    type: HOTELS_RESET_ACTIVE_FILTER,
  });
};

export const loadFilteredHotels = filterQuery => (dispatch, getState) => {
  filterQuery =
    typeof filterQuery === 'string'
      ? filterQuery
      : getFiltersQuery(filterQuery);
  const filter = getState().hotels.byQueries;

  if (filter.hasOwnProperty(filterQuery)) {
    return dispatch({
      type: HOTELS_SET_ACTIVE_FILTER,
      payload: filterQuery,
    });
  }

  dispatch(
    fetchFilteredHotels(filterQuery, getState().app.languages.urlPrefix)
  );
};
