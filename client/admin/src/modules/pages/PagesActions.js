import { CALL_API, Schemas } from '../../middleware/callApi';

export const PAGES_REQUEST = 'PAGES_REQUEST';
export const PAGES_SUCCESS = 'PAGES_SUCCESS';
export const PAGES_FAILURE = 'PAGES_FAILURE';
export const PAGES_GET_PAGE_FROM_CACHE = 'PAGES/GET_PAGE_FROM_CACHE';
export const PAGE_REQUEST = 'PAGE_REQUEST';
export const PAGE_SUCCESS = 'PAGE_SUCCESS';
export const PAGE_FAILURE = 'PAGE_FAILURE';
export const PAGE_SAVE_REQUEST = 'PAGE_SAVE_REQUEST';
export const PAGE_SAVE_SUCCESS = 'PAGE_SAVE_SUCCESS';
export const PAGE_SAVE_FAILURE = 'PAGE_SAVE_FAILURE';

const fetchPages = (nextPageUrl, nextPage) => ({
  [CALL_API]: {
    types: [PAGES_REQUEST, PAGES_SUCCESS, PAGES_FAILURE],
    endpoint: nextPageUrl,
    schema: Schemas.PAGES,
    nextPage
  }
});

export const loadPages = (nextPage = 0) => (dispatch, getState) => {
  const {
    nextPageUrl = `api/pages?page=${nextPage}`,
    pages,
    pageCount,
  } = getState().pages;

  if (nextPage < 0 || (nextPage === pageCount && pageCount !== 0)) {
    return null;
  }

  if (pages[nextPage]) {
    return dispatch({
      type: PAGES_GET_PAGE_FROM_CACHE,
      payload: nextPage
    });
  }

  return dispatch(fetchPages(nextPageUrl, nextPage));
};

const fetchPage = id => ({
  [CALL_API]: {
    types: [PAGE_REQUEST, PAGE_SUCCESS, PAGE_FAILURE],
    endpoint: `/api/pages/${id}`,
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

export const savePage = (pageState, pageId) => (dispatch, getState) => {
  const state = getState();
  const page = { ...state.pages.byIds[pageId] };
  const pageFormValues = state.form.pageForm.values;

  page.content = [];
  Object.keys(pageState.rowsByLang).forEach((item) => {
    const content = pageFormValues[item];
    content.rows = pageState.rowsByLang[item].map(row => (
      pageState.allRowsById[row]
    ));
    page.content.push(content);
  });

  return dispatch({
    [CALL_API]: {
      types: [PAGE_SAVE_REQUEST, PAGE_SAVE_SUCCESS, PAGE_SAVE_FAILURE],
      method: 'PUT',
      endpoint: `/api/pages/${page._id}`,
      body: page,
      schema: Schemas.PAGE
    }
  });
};

const setupPageData = (values, rows) => {

};
