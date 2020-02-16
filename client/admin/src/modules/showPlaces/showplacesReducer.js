import {
  createReducer,
  getFiltersQuery,
  createBasicActions,
} from '../../services/utils';
import { CALL_API, Schemas } from '../../middleware/callApi';

// actions
const actionsObj = createBasicActions(
  'SHOWPLACES',
  'SHOWPLACE',
  'showPlaces',
  CALL_API,
  Schemas
);

// Action Creators
export const actions = actionsObj.actions;
export const loadItems = actionsObj.loadWithPagination;
export const loadItem = actionsObj.loadItem;
export const deleteItems = actionsObj.deleteItems;
export const saveItem = actionsObj.saveItem;
export const loadShowplacesByRegions = filtersArray => (dispatch, getState) => {
  const filtersQuery = getFiltersQuery({ regions: filtersArray });
  const { filter } = getState().entities.showplaces;
  if (filter.hasOwnProperty(filtersQuery) || !filtersArray.length) {
    return dispatch({
      type: 'GET_FILTERED_SHOWPLACES_FROM_CACHE',
      payload: filtersArray.length ? filtersQuery : '',
    });
  }

  return dispatch(fetchFilteredShowplaces(filtersQuery));
};

const fetchFilteredShowplaces = filtersQuery => ({
  [CALL_API]: {
    types: [
      'FILTERED_SHOWPLACES_REQUEST',
      'FILTERED_SHOWPLACES_SUCCESS',
      'FILTERED_SHOWPLACES_FAILURE',
    ],
    method: 'GET',
    endpoint: `/api/showPlaces?${filtersQuery}`,
    schema: Schemas.SHOWPLACES,
  },
});

// reducers
export const defaultState = {
  isFetching: false,
  isFetched: false,
  currLanguage: 'ru',
};

const setActiveFilter = (state, action) => ({
  ...state,
  activeFilter: action.endpoint.split('?')[1],
});

const getFilteredItemsFromCash = (state, action) => ({
  ...state,
  activeFilter: action.payload,
});

const showPlacesReducer = createReducer(defaultState, {
  [actions.SHOWPLACES_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.SHOWPLACES_SUCCESS]: state => ({
    ...state,
    isFetching: false,
    isFetched: true,
  }),
  [actions.SHOWPLACES_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.SHOWPLACES_DELETE_REQUEST]: state => ({
    ...state,
    isDeleting: true,
  }),
  [actions.SHOWPLACES_DELETE_SUCCESS]: state => ({
    ...state,
    isDeleting: false,
  }),
  [actions.SHOWPLACES_DELETE_FAILURE]: state => ({
    ...state,
    isDeleting: false,
  }),
  [actions.SHOWPLACES_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.SHOWPLACE_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.SHOWPLACE_SUCCESS]: state => ({
    ...state,
    isFetching: false,
    isSaving: false,
  }),
  [actions.SHOWPLACE_SAVE_REQUEST]: state => ({ ...state, isSaving: true }),
  [actions.SHOWPLACE_SAVE_SUCCESS]: state => ({
    ...state,
    isFetching: false,
    isSaving: false,
  }),
  [actions.SHOWPLACE_SAVE_FAILURE]: state => ({ ...state, isSaving: false }),
  FILTERED_SHOWPLACES_SUCCESS: setActiveFilter,
  GET_FILTERED_SHOWPLACES_FROM_CACHE: getFilteredItemsFromCash,
});

export default showPlacesReducer;

//  selectors
export const getShowPlaces = state => state.allIds.map(id => state.byIds[id]);
export const getShowPlace = (state, id) => state.byIds[id];
