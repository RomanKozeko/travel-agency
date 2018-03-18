import { createReducer, basicReducerEvents, createBasicActions } from '../../services/utils';
import { CALL_API, Schemas } from '../../middleware/callApi';

// actions
const actionsObj = createBasicActions('FEATURED', 'FEATURED_ITEM', 'featured', CALL_API, Schemas);

// Action Creators
export const actions = actionsObj.actions;
export const loadItems = actionsObj.load;
export const deleteItems = actionsObj.deleteItems;
export const saveItem = actionsObj.saveItem;

// reducers
export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
  isFetched: false,
};

const languagesReducer = createReducer(defaultState, {
  [actions.FEATURED_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.FEATURED_SUCCESS]: basicReducerEvents.success(),
  [actions.FEATURED_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.FEATURED_DELETE_REQUEST]: state => ({ ...state, isDeleting: true }),
  [actions.FEATURED_DELETE_SUCCESS]: basicReducerEvents.deleteSuccess,
  [actions.FEATURED_DELETE_FAILURE]: state => ({ ...state, isDeleting: false }),
  [actions.FEATURED_ITEM_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.FEATURED_ITEM_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.FEATURED_ITEM_SUCCESS]: basicReducerEvents.itemSuccess(),
  [actions.FEATURED_ITEM_SAVE_REQUEST]: state => ({ ...state, isSaving: true }),
  [actions.FEATURED_ITEM_SAVE_SUCCESS]: basicReducerEvents.itemSuccess(),
  [actions.FEATURED_ITEM_SAVE_FAILURE]: state => ({ ...state, isSaving: false }),
});

export default languagesReducer;

//  selectors
export const getFeatured = state => (state.allIds.map(id => state.byIds[id]));

