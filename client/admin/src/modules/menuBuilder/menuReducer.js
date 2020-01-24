import { createReducer, createBasicActions } from '../../services/utils';
import { CALL_API, Schemas } from '../../middleware/callApi';

// actions
const actionsObj = createBasicActions('MENU', 'MENU_ITEM', 'menu', CALL_API, Schemas);

// Action Creators
export const actions = actionsObj.actions;
export const loadItems = actionsObj.load;
export const saveItem = actionsObj.saveItem;
export const deleteItems = actionsObj.deleteItems;
export const saveItems = (payload) => dispatch => (
  dispatch({
    [CALL_API]: {
      types: [`MENU_SAVE_REQUEST`, `MENU_SAVE_SUCCESS`, `MENU_SAVE_FAILURE`],
      method: 'PUT',
      endpoint: '/api/menu',
      body: payload,
      toasterMsg: {
        success: 'Saved'
      },
      schema: Schemas['MENU']
    }
  })
);
export const updateEntities = (node, nodeToInsert, updateMethod) => (dispatch, getState) => (
  dispatch({
    type: 'UPDATE_MENU_ITEMS',
    node,
    nodeToInsert,
    updateMethod
  })
);

// reducers
export const defaultState = {
  isFetching: false,
  currLanguage: 'ru'
};

const menuReducer = createReducer(defaultState, {
  [actions.MENU_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.MENU_SUCCESS]: state => ({ ...state, isFetching: false }),
  [actions.MENU_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.MENU_SAVE_REQUEST]: state => ({ ...state, isSaving: true }),
  [actions.MENU_SAVE_SUCCESS]: state => ({ ...state, isSaving: false }),
  [actions.MENU_SAVE_FAILURE]: state => ({ ...state, isSaving: false }),
});

export default menuReducer;
