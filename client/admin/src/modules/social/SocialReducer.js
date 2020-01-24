import { createReducer, basicReducerEvents, createBasicActions } from '../../services/utils';
import { CALL_API, Schemas } from '../../middleware/callApi';

// actions
const actionsObj = createBasicActions('SOCIAL', 'SOCIAL_ITEM', 'social', CALL_API, Schemas);

// Action Creators
export const actions = actionsObj.actions;
export const loadItems = actionsObj.loadWithPagination;
export const deleteItems = actionsObj.deleteItems;
export const saveItem = actionsObj.saveItem;


// reducers
export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
  isFetched: false,
};

export default createReducer(defaultState, {
  [actions.SOCIAL_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.SOCIAL_SUCCESS]: basicReducerEvents.success(),
  [actions.SOCIAL_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.SOCIAL_DELETE_REQUEST]: state => ({ ...state, isDeleting: true }),
  [actions.SOCIAL_DELETE_SUCCESS]: basicReducerEvents.deleteSuccess,
  [actions.SOCIAL_DELETE_FAILURE]: state => ({ ...state, isDeleting: false }),
  [actions.SOCIAL_ITEM_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.SOCIAL_ITEM_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.SOCIAL_ITEM_SUCCESS]: basicReducerEvents.itemSuccess(),
  [actions.SOCIAL_ITEM_SAVE_REQUEST]: state => ({ ...state, isSaving: true }),
  [actions.SOCIAL_ITEM_SAVE_SUCCESS]: basicReducerEvents.itemSuccess(),
  [actions.SOCIAL_ITEM_SAVE_FAILURE]: state => ({ ...state, isSaving: false })
});

//  selectors
export const getSocialItems = state => (state.allIds.map(id => state.byIds[id]));

