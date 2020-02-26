import {
  createReducer,
  basicReducerEvents,
  createBasicActions,
} from '../../services/utils';
import { CALL_API, Schemas } from '../../middleware/callApi';

// actions
const actionsObj = createBasicActions(
  'CONTACTS',
  'CONTACTS_ITEM',
  'contacts',
  CALL_API,
  Schemas
);

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
  [actions.CONTACTS_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.CONTACTS_SUCCESS]: basicReducerEvents.success(),
  [actions.CONTACTS_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.CONTACTS_DELETE_REQUEST]: state => ({ ...state, isDeleting: true }),
  [actions.CONTACTS_DELETE_SUCCESS]: basicReducerEvents.deleteSuccess,
  [actions.CONTACTS_DELETE_FAILURE]: state => ({ ...state, isDeleting: false }),
  [actions.CONTACTS_ITEM_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.CONTACTS_ITEM_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.CONTACTS_ITEM_SUCCESS]: basicReducerEvents.itemSuccess(),
  [actions.CONTACTS_ITEM_SAVE_REQUEST]: state => ({ ...state, isSaving: true }),
  [actions.CONTACTS_ITEM_SAVE_SUCCESS]: basicReducerEvents.itemSuccess(),
  [actions.CONTACTS_ITEM_SAVE_FAILURE]: state => ({
    ...state,
    isSaving: false,
  }),
});

//  selectors
export const getContacts = state => state.allIds.map(id => state.byIds[id]);
