import { createReducer, basicReducerEvents, createBasicActions } from '../../services/utils';
import { CALL_API, Schemas } from '../../middleware/callApi';

// actions
const actionsObj = createBasicActions('SHOWPLACES', 'SHOWPLACE', 'showPlaces', CALL_API, Schemas);

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

const showPlacesReducer = createReducer(defaultState, {
  [actions.SHOWPLACES_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.SHOWPLACES_SUCCESS]: basicReducerEvents.success(),
  [actions.SHOWPLACES_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.SHOWPLACES_DELETE_REQUEST]: state => ({ ...state, isDeleting: true }),
  [actions.SHOWPLACES_DELETE_SUCCESS]: basicReducerEvents.deleteSuccess,
  [actions.SHOWPLACES_DELETE_FAILURE]: state => ({ ...state, isDeleting: false }),
  [actions.SHOWPLACES_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.SHOWPLACE_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.SHOWPLACE_SUCCESS]: basicReducerEvents.itemSuccess(),
  [actions.SHOWPLACE_SAVE_REQUEST]: state => ({ ...state, isSaving: true }),
  [actions.SHOWPLACE_SAVE_SUCCESS]: basicReducerEvents.itemSuccess(),
  [actions.SHOWPLACE_SAVE_FAILURE]: state => ({ ...state, isSaving: false }),
});

export default showPlacesReducer;

//  selectors
export const getShowPlaces = state => (state.allIds.map(id => state.byIds[id]));
export const getShowPlace = (state, id) => (state.byIds[id]);

