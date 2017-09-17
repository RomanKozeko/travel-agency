import {CALL_API, Schemas} from '../../middleware/callApi';

export const TOURS_REQUEST = 'TOURS_REQUEST';
export const TOURS_SUCCESS = 'TOURS_SUCCESS';
export const TOURS_FAILURE = 'TOURS_FAILURE';
export const TOURS_GET_PAGE_FROM_CACHE = 'TOURS/GET_PAGE_FROM_CACHE';
export const TOUR_REQUEST = 'TOUR_REQUEST';
export const TOUR_SUCCESS = 'TOUR_SUCCESS';
export const TOUR_FAILURE = 'TOUR_FAILURE';
export const EDIT_TOUR_REQUEST = 'EDIT_TOUR_REQUEST';
export const EDIT_TOUR_SUCCESS = 'EDIT_TOUR_SUCCESS';
export const EDIT_TOUR_FAILURE = 'EDIT_TOUR_FAILURE';

const fetchTours = (nextPageUrl, nextPage) => ({
  [CALL_API]: {
    types: [TOURS_REQUEST, TOURS_SUCCESS, TOURS_FAILURE],
    endpoint: nextPageUrl,
    schema: Schemas.TOURS,
    nextPage
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

const fetchTour = (id) => ({
  [CALL_API]: {
    types: [TOUR_REQUEST, TOUR_SUCCESS, TOUR_FAILURE],
    endpoint: `/api/tours/${id}`,
    schema: Schemas.TOUR,
  }
});

export const loadTour = (id) => (dispatch, getState) => {
  const state = getState().tours;
  if (!state.byIds[id]) {
    return dispatch(fetchTour(id));
  }
  return state.byIds[id];
};

const populateTourContent = (tourFormValues, item) => {
  const content = tourFormValues[item];
  if (!content.language) {
    content.language = item;
  }
  return content;
};

const populateTour = (tourValues, tourFormValues) => {
  const updatedTour = { content: [] };
  Object.keys(tourFormValues).forEach((item) => {
    const content = populateTourContent(tourFormValues, item);
    updatedTour.content.push(content);
  });

  return { ...updatedTour, ...tourValues };
};

export const editTour = (id, tourValues) => (dispatch, getState) => {
  const state = getState();
  const tourFormValues = state.form.tourForm.values;
  const tour = populateTour(tourValues, tourFormValues);

  return dispatch({
    [CALL_API]: {
      types: [EDIT_TOUR_REQUEST, EDIT_TOUR_SUCCESS, EDIT_TOUR_FAILURE],
      endpoint: `/api/tours/${id}`,
      schema: Schemas.TOUR,
      method: 'PUT',
      body: tour
    }
  });
};
