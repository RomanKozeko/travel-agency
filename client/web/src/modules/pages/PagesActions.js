import { CALL_API, Schemas } from '../../middleware/callApi';
import { withPrefix, makeActionCreator } from '../../services/utils';

export const PAGES_REQUEST = 'PAGES_REQUEST';
export const PAGES_SUCCESS = 'PAGES_SUCCESS';
export const PAGES_FAILURE = 'PAGES_FAILURE';
export const PAGE_REQUEST = 'PAGE_REQUEST';
export const PAGE_SUCCESS = 'PAGE_SUCCESS';
export const PAGE_FAILURE = 'PAGE_FAILURE';

const fetchPages = urlPrefix => ({
  [CALL_API]: {
    types: [PAGES_REQUEST, PAGES_SUCCESS, PAGES_FAILURE],
    endpoint: withPrefix('/api/pages', urlPrefix),
    schema: Schemas.PAGES,
  },
});

const fetchPage = (url, urlPrefix) => ({
  [CALL_API]: {
    types: [PAGE_REQUEST, PAGE_SUCCESS, PAGE_FAILURE],
    endpoint: withPrefix(`/api/pages/getByUrl/${url}`, urlPrefix),
    schema: Schemas.PAGE,
  },
});

export const loadPage = url => (dispatch, getState) => {
  const state = getState();
  if (!state.pages.byIds[url]) {
    return dispatch(fetchPage(url, state.app.languages.urlPrefix));
  }
  return null;
};

export const loadPages = () => (dispatch, getState) =>
  dispatch(fetchPages(getState().app.languages.urlPrefix));

export const clearError = makeActionCreator('PAGE/CLEAR_ERROR');
