import { CALL_API, Schemas } from '../../middleware/callApi';
import { withPrefix } from '../../services/utils';

export const TOUR_REQUEST = 'TOUR_REQUEST';
export const TOUR_SUCCESS = 'TOUR_SUCCESS';
export const TOUR_FAILURE = 'TOUR_FAILURE';
export const TOURS_REQUEST = 'TOURS_REQUEST';
export const TOURS_SUCCESS = 'TOURS_SUCCESS';
export const TOURS_FAILURE = 'TOURS_FAILURE';
export const TOURS_FILTERED_REQUEST = 'TOURS_FILTERED_REQUEST';
export const TOURS_FILTERED_SUCCESS = 'TOURS_FILTERED_SUCCESS';
export const TOURS_FILTERED_FAILURE = 'TOURS_FILTERED_FAILURE';
export const TOURS_GET_PAGE_FROM_CACHE = 'TOURS/GET_PAGE_FROM_CACHE';

const fetchTours = (nextPageUrl, nextPage) => ({
  [CALL_API]: {
    types: [ TOURS_REQUEST, TOURS_SUCCESS, TOURS_FAILURE ],
    endpoint: nextPageUrl,
    schema: Schemas.TOURS,
    nextPage
  }
});

// const fetchTours = (urlPrefix) => ({
//   [CALL_API]: {
//     types: [TOURS_REQUEST, TOURS_SUCCESS, TOURS_FAILURE],
//     endpoint: withPrefix('/api/tours', urlPrefix),
//     schema: Schemas.PAGES
//   }
// });

const fetchTour = (url, urlPrefix) => ({
  [CALL_API]: {
    types: [TOUR_REQUEST, TOUR_SUCCESS, TOUR_FAILURE],
    endpoint: withPrefix(`/api/tourGetByUrl/${url}`, urlPrefix),
    schema: Schemas.TOUR,
  }
});


export const loadTours = (nextPage = 0) => (dispatch, getState) => {
  const {
    nextPageUrl = `/api/tours?page=${nextPage}`,
    pages,
    pageCount,
  } = getState().tours;

  if (nextPage < 0 || (nextPage === pageCount && pageCount !== 0)) {
    return null
  }

  if (pages[nextPage]) {
    return dispatch({
      type: TOURS_GET_PAGE_FROM_CACHE,
      payload: nextPage
    })
  }

  return dispatch(fetchTours(nextPageUrl, nextPage))
};

export const fetchFilteredTours = (filterQuery) => (dispatch, getState) => {
  dispatch({
    [CALL_API]: {
      types: [ TOURS_FILTERED_REQUEST, TOURS_FILTERED_SUCCESS, TOURS_FILTERED_FAILURE ],
      endpoint: withPrefix(`/api/tours?${filterQuery}`, getState().app.languages.urlPrefix),
      schema: Schemas.TOURS,
      query: filterQuery
    }
  })
};

export const loadTour = url => (dispatch, getState) => {
  const state = getState();
  if (!state.tours.byIds[url]) {
    return dispatch(fetchTour(url, state.app.languages.urlPrefix));
  }
  return null;
};
