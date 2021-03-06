import { CALL_API, Schemas } from '../../middleware/callApi';

export const PAGES_REQUEST = 'PAGES_REQUEST';
export const PAGES_SUCCESS = 'PAGES_SUCCESS';
export const PAGES_FAILURE = 'PAGES_FAILURE';
export const PAGES_DELETE_REQUEST = 'PAGES_DELETE_REQUEST';
export const PAGES_DELETE_SUCCESS = 'PAGES_DELETE_SUCCESS';
export const PAGES_DELETE_FAILURE = 'PAGES_DELETE_FAILURE';
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
    nextPage,
  },
});

export const loadPages = (nextPage = 0) => (dispatch, getState) => {
  const {
    nextPageUrl = `/api/pages?page=${nextPage}`,
    pages,
    pageCount,
  } = getState().pages;

  if (nextPage < 0 || (nextPage === pageCount && pageCount !== 0)) {
    return null;
  }

  if (pages[nextPage]) {
    return dispatch({
      type: PAGES_GET_PAGE_FROM_CACHE,
      payload: nextPage,
    });
  }

  return dispatch(fetchPages(nextPageUrl, nextPage));
};

const fetchPage = id => ({
  [CALL_API]: {
    types: [PAGE_REQUEST, PAGE_SUCCESS, PAGE_FAILURE],
    endpoint: `/api/pages/${id}`,
    schema: Schemas.PAGE,
  },
});

export const loadPage = id => (dispatch, getState) => {
  const state = getState().pages;
  if (!state.byIds[id]) {
    return dispatch(fetchPage(id));
  }
  return null;
};

export const deletePages = ids => ({
  [CALL_API]: {
    types: [PAGES_DELETE_REQUEST, PAGES_DELETE_SUCCESS, PAGES_DELETE_FAILURE],
    method: 'DELETE',
    endpoint: '/api/pages',
    toasterMsg: {
      success: 'Pages deleted',
    },
    body: ids,
    schema: Schemas.PAGES,
  },
});

const populatePageContent = (pageFormValues, item, pageState) => {
  const content = pageFormValues[item] || {
    title: 'Untitled page',
    description: '',
    language: item,
  };
  if (!content.language) {
    content.language = item;
  }
  content.rows = pageState.rowsByLang[item].map(row => {
    const populatedRow = { ...pageState.allRowsById[row] };
    populatedRow.items = pageState.allRowsById[row].items.map(
      rowItem => pageState.rowsItems[rowItem]
    );

    return populatedRow;
  });
  return content;
};

const populatePage = (page, pageState, pageFormValues) => {
  Object.keys(pageState.rowsByLang).forEach(item => {
    const content = populatePageContent(pageFormValues, item, pageState);
    page.content.push(content);
  });

  return page;
};

export const savePage = (pageState, pageId, isNew) => (dispatch, getState) => {
  const state = getState();
  let page = { preview: '', content: [] };
  if (state.pages.byIds[pageId]) {
    page = { ...state.pages.byIds[pageId] };
  }
  const pageFormValues = state.form.pageForm.values;
  page.content = [];
  page = populatePage(page, pageState, pageFormValues);

  return dispatch({
    [CALL_API]: {
      types: [PAGE_SAVE_REQUEST, PAGE_SAVE_SUCCESS, PAGE_SAVE_FAILURE],
      method: isNew ? 'POST' : 'PUT',
      endpoint: isNew ? '/api/pages/' : `/api/pages/${page._id}`,
      body: page,
      toasterMsg: {
        success: 'Page saved',
      },
      schema: Schemas.PAGE,
    },
  });
};
