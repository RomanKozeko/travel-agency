import { createReducer, basicReducerEvents, createBasicActions } from '../../services/utils';
import { CALL_API, Schemas } from '../../middleware/callApi';

// actions
const actionsObj = createBasicActions('FOOD', 'FOOD_ITEM', 'food', CALL_API, Schemas);

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

const foodReducer = createReducer(defaultState, {
  [actions.FOOD_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.FOOD_SUCCESS]: basicReducerEvents.success(),
  [actions.FOOD_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.FOOD_DELETE_REQUEST]: state => ({ ...state, isDeleting: true }),
  [actions.FOOD_DELETE_SUCCESS]: basicReducerEvents.deleteSuccess,
  [actions.FOOD_DELETE_FAILURE]: state => ({ ...state, isDeleting: false }),
  [actions.FOOD_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.FOOD_ITEM_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.FOOD_ITEM_SUCCESS]: basicReducerEvents.itemSuccess(),
  [actions.FOOD_ITEM_SAVE_REQUEST]: state => ({ ...state, isSaving: true }),
  [actions.FOOD_ITEM_SAVE_SUCCESS]: basicReducerEvents.itemSuccess(),
  [actions.FOOD_ITEM_SAVE_FAILURE]: state => ({ ...state, isSaving: false }),
});

export default foodReducer;

//  selectors
export const getFood = state => (state.allIds.map(id => state.byIds[id]));
export const getFoodItem = (state, id) => (state.byIds[id]);


