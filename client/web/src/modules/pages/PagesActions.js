import { CALL_API, Schemas } from '../../middleware/callApi';

export const PAGES_REQUEST = 'PAGES_REQUEST';
export const PAGES_SUCCESS = 'PAGES_SUCCESS';
export const PAGES_FAILURE = 'PAGES_FAILURE';
export const PAGE_REQUEST = 'PAGE_REQUEST';
export const PAGE_SUCCESS = 'PAGE_SUCCESS';
export const PAGE_FAILURE = 'PAGE_FAILURE';

const fetchPages = () => ({
  [CALL_API]: {
    types: [PAGES_REQUEST, PAGES_SUCCESS, PAGES_FAILURE],
    endpoint: '/api/pages',
    schema: Schemas.PAGES
  }
});

const fetchPage = url => ({
  [CALL_API]: {
    types: [PAGE_REQUEST, PAGE_SUCCESS, PAGE_FAILURE],
    endpoint: `/api/pages/getByUrl/${url}`,
    schema: Schemas.PAGE,
  }
});

export const loadPage = id => (dispatch, getState) => {
  const state = getState().pages;
  if (!state.byIds[id]) {
    return dispatch(fetchPage(id));
  }
  return null;
};

export const loadPages = () => (dispatch) => (dispatch(fetchPages()));
