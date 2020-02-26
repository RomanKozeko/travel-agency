import { CALL_API, Schemas } from '../../middleware/callApi';

export const TOURS_REQUEST = 'TOURS_REQUEST';
export const TOURS_SUCCESS = 'TOURS_SUCCESS';
export const TOURS_FAILURE = 'TOURS_FAILURE';
export const TOURS_GET_PAGE_FROM_CACHE = 'TOURS/GET_PAGE_FROM_CACHE';
export const TOUR_REQUEST = 'TOUR_REQUEST';
export const TOUR_SUCCESS = 'TOUR_SUCCESS';
export const TOUR_FAILURE = 'TOUR_FAILURE';
export const ADD_TOUR_REQUEST = 'ADD_TOUR_REQUEST';
export const ADD_TOUR_SUCCESS = 'ADD_TOUR_SUCCESS';
export const ADD_TOUR_FAILURE = 'ADD_TOUR_FAILURE';
export const EDIT_TOUR_REQUEST = 'EDIT_TOUR_REQUEST';
export const EDIT_TOUR_SUCCESS = 'EDIT_TOUR_SUCCESS';
export const EDIT_TOUR_FAILURE = 'EDIT_TOUR_FAILURE';
export const DELETE_TOUR_REQUEST = 'DELETE_TOUR_REQUEST';
export const DELETE_TOUR_SUCCESS = 'DELETE_TOUR_SUCCESS';
export const DELETE_TOUR_FAILURE = 'DELETE_TOUR_FAILURE';

const fetchTours = (nextPageUrl, nextPage) => ({
  [CALL_API]: {
    types: [TOURS_REQUEST, TOURS_SUCCESS, TOURS_FAILURE],
    endpoint: nextPageUrl,
    schema: Schemas.TOURS,
    nextPage,
  },
});

export const loadTours = (nextPage = 0) => (dispatch, getState) => {
  const { pages, pageCount, itemsPerPage } = getState().tours;
  const nextPageUrl = `/api/tours/${nextPage * itemsPerPage}/${itemsPerPage}`;

  if (nextPage < 0 || (nextPage === pageCount && pageCount !== 0)) {
    return null;
  }

  if (pages[nextPage]) {
    return dispatch({
      type: TOURS_GET_PAGE_FROM_CACHE,
      payload: nextPage,
    });
  }

  return dispatch(fetchTours(nextPageUrl, nextPage));
};

const fetchTour = id => ({
  [CALL_API]: {
    types: [TOUR_REQUEST, TOUR_SUCCESS, TOUR_FAILURE],
    endpoint: `/api/tours/${id}`,
    schema: Schemas.TOUR,
  },
});

export const loadTour = id => (dispatch, getState) => {
  const state = getState().tours;
  if (!state.byIds[id]) {
    return dispatch(fetchTour(id));
  }
  return state.byIds[id];
};

export const addTour = tour => dispatch => {
  return dispatch({
    [CALL_API]: {
      types: [ADD_TOUR_REQUEST, ADD_TOUR_SUCCESS, ADD_TOUR_FAILURE],
      endpoint: '/api/tours',
      schema: Schemas.TOUR,
      method: 'POST',
      body: tour,
      toasterMsg: {
        success: 'Saved',
      },
    },
  });
};

export const editTour = tour => dispatch => {
  return dispatch({
    [CALL_API]: {
      types: [EDIT_TOUR_REQUEST, EDIT_TOUR_SUCCESS, EDIT_TOUR_FAILURE],
      endpoint: `/api/tours/${tour._id}`,
      schema: Schemas.TOUR,
      method: 'PUT',
      body: tour,
      toasterMsg: {
        success: 'Saved',
      },
    },
  });
};

export const deleteTours = ids => dispatch => {
  return dispatch({
    [CALL_API]: {
      types: [DELETE_TOUR_REQUEST, DELETE_TOUR_SUCCESS, DELETE_TOUR_FAILURE],
      endpoint: '/api/tours',
      method: 'DELETE',
      body: ids,
      toasterMsg: {
        success: 'Deleted',
      },
    },
  });
};
