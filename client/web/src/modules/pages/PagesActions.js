import { CALL_API, Schemas } from '../../middleware/callApi';

export const PAGES_REQUEST = 'PAGES_REQUEST';
export const PAGES_SUCCESS = 'PAGES_SUCCESS';
export const PAGES_FAILURE = 'PAGES_FAILURE';

const fetchPages = () => ({
  [CALL_API]: {
    types: [PAGES_REQUEST, PAGES_SUCCESS, PAGES_FAILURE],
    endpoint: '/api/pages',
    schema: Schemas.PAGES
  }
});

export const loadPages = () => (dispatch) => (dispatch(fetchPages()));
