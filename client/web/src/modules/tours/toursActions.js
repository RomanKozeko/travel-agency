import { CALL_API, Schemas } from '../../middleware/api'

export const TOURS_REQUEST = 'TOURS_REQUEST';
export const TOURS_SUCCESS = 'TOURS_SUCCESS';
export const TOURS_FAILURE = 'TOURS_FAILURE';


const fetchTours = (nextPageUrl, nextPage) => ({
  [CALL_API]: {
    types: [ TOURS_REQUEST, TOURS_SUCCESS, TOURS_FAILURE ],
    endpoint: nextPageUrl,
    schema: Schemas.TOURS,
    nextPage
  }
});

export const loadTours = (nextPage = 1) => (dispatch, getState) => {
  console.log(nextPage);
  const {
    nextPageUrl = `api/tours?page=${nextPage}`,
    pageCount = 0,
    pages,
  } = getState().tours;

  if (pages[nextPage]) {
    return null
  }

  return dispatch(fetchTours(nextPageUrl, nextPage))
};
