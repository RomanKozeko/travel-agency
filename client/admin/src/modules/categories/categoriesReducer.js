import { createReducer, basicReducerEvents, createBasicActions } from '../../services/utils';
import { CALL_API, Schemas } from '../../middleware/callApi';

// actions
const actionsObj = createBasicActions('CATEGORIES', 'CATEGORY', 'categories', CALL_API, Schemas);

// Action Creators
export const actions = actionsObj.actions;
export const loadCategories = actionsObj.load;
export const deleteCategories = actionsObj.deleteItems;
export const loadCategory = actionsObj.loadItem;
export const saveCategory = actionsObj.saveItem;

// reducers
export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
};

const categoriesReducer = createReducer(defaultState, {
  [actions.CATEGORIES_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.CATEGORIES_SUCCESS]: basicReducerEvents.success,
  [actions.CATEGORIES_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.CATEGORIES_DELETE_REQUEST]: state => ({ ...state, isDeleting: true }),
  [actions.CATEGORIES_DELETE_SUCCESS]: basicReducerEvents.deleteSuccess,
  [actions.CATEGORIES_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.CATEGORY_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.CATEGORY_SUCCESS]: basicReducerEvents.itemSuccess,
  [actions.CATEGORY_SAVE_REQUEST]: state => ({ ...state, isSaving: true }),
  [actions.CATEGORY_SAVE_SUCCESS]: basicReducerEvents.itemSuccess,
});

export default categoriesReducer;

//  selectors
export const getCategories = state => (state.allIds.map(id => state.byIds[id]));
export const getCategory = (state, id) => {
  if (state.byIds[id]) {
    return state.byIds[id];
  }
  return null;
};

