import { createReducer, createBasicActions, getFiltersQuery } from '../../services/utils';
import { CALL_API, Schemas } from '../../middleware/callApi';

// actions
const actionsObj = createBasicActions('HOTELS', 'HOTEL', 'hotels', CALL_API, Schemas);

// Action Creators
export const actions = actionsObj.actions;
export const loadItems = actionsObj.loadWithPagination;
export const loadItem = actionsObj.loadItem;
export const deleteItems = actionsObj.deleteItems;
export const saveItem = actionsObj.saveItem;
export const loadHotelsByRegions = (filtersArray) => (dispatch, getState) => {
  const filtersQuery = getFiltersQuery({ regions: filtersArray});
  const { filter } = getState().entities.hotels;
  if (filter.hasOwnProperty(filtersQuery) || !filtersArray.length) {
    return dispatch({
      type: 'GET_FILTERED_HOTELS_FROM_CACHE',
      payload: filtersArray.length ? filtersQuery : '',
    });
  }

  return dispatch(fetchFilteredHotels(filtersQuery));
};

const fetchFilteredHotels = (filtersQuery) => ({
  [CALL_API]: {
    types: ['FILTERED_HOTELS_REQUEST', 'FILTERED_HOTELS_SUCCESS', 'FILTERED_HOTELS_FAILURE'],
    method: 'GET',
    endpoint: `/api/hotels?${filtersQuery}`,
    schema: Schemas.HOTELS,
  }
});

// reducers
export const defaultState = {
  isFetching: false,
  isFetched: false,
  currLanguage: 'ru',
};

const setActiveFilter = (state, action) => ({
    ...state,
    activeFilter: action.endpoint.split('?')[1]
  }
);

const getFilteredItemsFromCash = (state, action) => ({
    ...state,
    activeFilter: action.payload
  }
);

const hotelsReducer = createReducer(defaultState, {
  [actions.HOTELS_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.HOTELS_SUCCESS]: state => ({ ...state, isFetching: false, isFetched: true }),
  [actions.HOTELS_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.HOTELS_DELETE_REQUEST]: state => ({ ...state, isDeleting: true }),
  [actions.HOTELS_DELETE_SUCCESS]: state => ({ ...state, isDeleting: false }),
  [actions.HOTELS_DELETE_FAILURE]: state => ({ ...state, isDeleting: false }),
  [actions.HOTELS_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.HOTEL_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.HOTEL_SUCCESS]: state => ({...state, isFetching: false, isSaving: false}),
  [actions.HOTEL_SAVE_REQUEST]: state => ({ ...state, isSaving: true }),
  [actions.HOTEL_SAVE_SUCCESS]: state => ({...state, isFetching: false, isSaving: false}),
  [actions.HOTEL_SAVE_FAILURE]: state => ({ ...state, isSaving: false }),
  'FILTERED_HOTELS_SUCCESS': setActiveFilter,
  'GET_FILTERED_HOTELS_FROM_CACHE': getFilteredItemsFromCash,
});

export default hotelsReducer;
