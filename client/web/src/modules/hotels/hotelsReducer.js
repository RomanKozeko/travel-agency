import { createReducer } from '../../services/utils';
import * as actions from './hotelsActions';

export const itemSuccess = (state, action) => {
  const payload = action.response;
  const allIds = [...state.allIds];

  if (allIds.indexOf(payload.result) === -1) {
    allIds.push(payload.result);
  }

  return {
    ...state,
    allIds,
    byIds: { ...state.byIds, ...payload.entities.items },
    isSaving: false,
    isFetching: false,
  };
};

const filteredHotelsSuccess = (
  state,
  { response: { result, entities, query } }
) => {
  const allIds = [...state.allIds];

  result.items.forEach(item => {
    if (state.allIds.indexOf(item) === -1) {
      allIds.push(item);
    }
  });

  return {
    ...state,
    allIds,
    byIds: { ...state.byIds, ...entities.items },
    isFetching: false,
    isFetched: true,
    byQueries: {
      ...state.byQueries,
      [query]: result.items,
    },
    activeQuery: [query],
  };
};

export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
  isFetched: false,
  byQueries: {},
  activeQuery: '',
};

export default createReducer(defaultState, {
  [actions.HOTEL_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.HOTEL_SUCCESS]: itemSuccess,
  [actions.HOTEL_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.HOTELS_FILTERED_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.HOTELS_FILTERED_SUCCESS]: filteredHotelsSuccess,
  [actions.HOTELS_FILTERED_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.HOTELS_SET_ACTIVE_FILTER]: (state, action) => ({
    ...state,
    activeQuery: action.payload,
  }),
  [actions.HOTELS_RESET_ACTIVE_FILTER]: (state, action) => ({
    ...state,
    activeQuery: '',
  }),
});

// selectors
export const getHotel = (state, id) =>
  Object.values(state.byIds).find(val => val.url === id);

export const getHotelsByQuery = (state, query) => {
  if (!query) {
    return state.allIds.map(id => state.byIds[id]);
  }
  if (state.byQueries[query]) {
    return state.byQueries[query].map(id => state.byIds[id]);
  } else {
    return [];
  }
};
