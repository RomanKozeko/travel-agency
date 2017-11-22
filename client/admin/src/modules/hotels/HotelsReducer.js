import { createReducer, basicReducerEvents, createBasicActions } from '../../services/utils';
import { CALL_API, Schemas } from '../../middleware/callApi';

// actions
const actionsObj = createBasicActions('HOTELS', 'HOTEL', 'hotels', CALL_API, Schemas);

// Action Creators
export const actions = actionsObj.actions;
export const loadItems = actionsObj.loadWithPagination;
export const loadItem = actionsObj.loadItem;
export const deleteItems = actionsObj.deleteItems;
export const saveItem = actionsObj.saveItem;

// reducers
export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
  isFetched: false,
  currLanguage: 'ru'
};

const hotelsReducer = createReducer(defaultState, {
  [actions.HOTELS_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.HOTELS_SUCCESS]: basicReducerEvents.success(),
  [actions.HOTELS_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.HOTELS_DELETE_REQUEST]: state => ({ ...state, isDeleting: true }),
  [actions.HOTELS_DELETE_SUCCESS]: basicReducerEvents.deleteSuccess,
  [actions.HOTELS_DELETE_FAILURE]: state => ({ ...state, isDeleting: false }),
  [actions.HOTELS_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.HOTEL_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.HOTEL_SUCCESS]: basicReducerEvents.itemSuccess(),
  [actions.HOTEL_SAVE_REQUEST]: state => ({ ...state, isSaving: true }),
  [actions.HOTEL_SAVE_SUCCESS]: basicReducerEvents.itemSuccess(),
  [actions.HOTEL_SAVE_FAILURE]: state => ({ ...state, isSaving: false }),
});

export default hotelsReducer;

//  selectors
export const getHotels = state => (state.allIds.map(id => state.byIds[id]));
export const getHotel = (state, id) => (state.byIds[id]);

