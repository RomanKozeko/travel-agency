import { CALL_API, Schemas } from '../../middleware/callApi';

export const REGIONS_REQUEST = 'REGIONS_REQUEST';
export const REGIONS_SUCCESS = 'REGIONS_SUCCESS';
export const REGIONS_FAILURE = 'REGIONS_FAILURE';
export const REGIONS_GET_PAGE_FROM_CACHE = 'REGIONS/GET_PAGE_FROM_CACHE';
export const REGION_REQUEST = 'PAGE_REQUEST';
export const REGION_SUCCESS = 'PAGE_SUCCESS';
export const REGION_FAILURE = 'PAGE_FAILURE';

const fetchRegions = (nextPageUrl, nextPage) => ({
  [CALL_API]: {
    types: [REGIONS_REQUEST, REGIONS_SUCCESS, REGIONS_FAILURE],
    endpoint: nextPageUrl,
    schema: Schemas.REGIONS,
    nextPage
  }
});

export const loadRegions = (nextPage = 0) => (dispatch, getState) => {
  const {
    nextPageUrl = `/api/regions?page=${nextPage}`,
    pages,
    pageCount,
  } = getState().regions;

  if (nextPage < 0 || (nextPage === pageCount && pageCount !== 0)) {
    return null;
  }

  if (pages[nextPage]) {
    return dispatch({
      type: REGIONS_GET_PAGE_FROM_CACHE,
      payload: nextPage
    });
  }

  return dispatch(fetchRegions(nextPageUrl, nextPage));
};

const fetchRegion = id => ({
  [CALL_API]: {
    types: [REGION_REQUEST, REGION_SUCCESS, REGION_FAILURE],
    endpoint: `/api/regions/${id}`,
    schema: Schemas.REGION,
  }
});

export const loadRegion = id => (dispatch, getState) => {
  const state = getState().regions;
  if (!state.byIds[id]) {
    return dispatch(fetchRegion(id));
  }
  return null;
};
