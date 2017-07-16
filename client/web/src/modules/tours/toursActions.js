import { CALL_API, Schemas } from '../../middleware/api'

export const TOURS_REQUEST = 'TOURS_REQUEST';
export const TOURS_SUCCESS = 'TOURS_SUCCESS';
export const TOURS_FAILURE = 'TOURS_FAILURE';



const fetchTours = () => ({
  [CALL_API]: {
    types: [ TOURS_REQUEST, TOURS_SUCCESS, TOURS_FAILURE ],
    endpoint: 'api/tours',
    schema: Schemas.TOURS
  }
});

// Fetches a single repository from API unless it is cached.
// Relies on Redux Thunk middleware.
export const loadTours = () => (dispatch, getState) => {
  const tours = getState().tours.allIds;
  if (tours.length) {
    return null
  }

  return dispatch(fetchTours())
}
