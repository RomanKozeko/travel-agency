import { CALL_API, Schemas } from '../../middleware/callApi';
import { withPrefix, getFiltersQuery } from '../../services/utils';

export const SHOWPLACE_REQUEST = 'SHOWPLACE_REQUEST';
export const SHOWPLACE_SUCCESS = 'SHOWPLACE_SUCCESS';
export const SHOWPLACE_FAILURE = 'SHOWPLACE_FAILURE';
export const SHOWPLACES_REQUEST = 'SHOWPLACES_REQUEST';
export const SHOWPLACES_SUCCESS = 'SHOWPLACES_SUCCESS';
export const SHOWPLACES_FAILURE = 'SHOWPLACES_FAILURE';
export const SHOWPLACES_FILTERED_REQUEST = 'SHOWPLACES_FILTERED_REQUEST';
export const SHOWPLACES_FILTERED_SUCCESS = 'SHOWPLACES_FILTERED_SUCCESS';
export const SHOWPLACES_FILTERED_FAILURE = 'SHOWPLACES_FILTERED_FAILURE';
export const SHOWPLACES_SET_ACTIVE_FILTER = 'SHOWPLACES_SET_ACTIVE_FILTER';
export const SHOWPLACES_RESET_ACTIVE_FILTER = 'SHOWPLACES_RESET_ACTIVE_FILTER';

export const fetchShowPlace = (url, urlPrefix) => ({
  [CALL_API]: {
    types: [SHOWPLACE_REQUEST, SHOWPLACE_SUCCESS, SHOWPLACE_FAILURE],
    endpoint: withPrefix(`/api/showPlacesGetByUrl/${url}`, urlPrefix),
    schema: Schemas.HOTEL,
  },
});

export const loadShowPlace = url => (dispatch, getState) => {
  const state = getState();
  if (!state.showplaces.byIds[url]) {
    return dispatch(fetchShowPlace(url, state.app.languages.urlPrefix));
  }
  return null;
};

export const fetchFilteredShowplaces = (filterQuery, lang) => ({
  [CALL_API]: {
    types: [
      SHOWPLACES_FILTERED_REQUEST,
      SHOWPLACES_FILTERED_SUCCESS,
      SHOWPLACES_FILTERED_FAILURE,
    ],
    endpoint: withPrefix(`/api/showplaces?${filterQuery}`, lang),
    schema: Schemas.SHOWPLACES,
    query: filterQuery,
  },
});

export const resetActiveFilter = () => dispatch => {
  dispatch({
    type: SHOWPLACES_RESET_ACTIVE_FILTER,
  });
};

export const loadFilteredShowplaces = filterQuery => (dispatch, getState) => {
  filterQuery =
    typeof filterQuery === 'string'
      ? filterQuery
      : getFiltersQuery(filterQuery);
  const filter = getState().showplaces.byQueries;

  if (filter.hasOwnProperty(filterQuery)) {
    return dispatch({
      type: SHOWPLACES_SET_ACTIVE_FILTER,
      payload: filterQuery,
    });
  }

  dispatch(
    fetchFilteredShowplaces(filterQuery, getState().app.languages.urlPrefix)
  );
};
