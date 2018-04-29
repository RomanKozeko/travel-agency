import { createReducer, basicReducerEvents, createBasicActions, makeActionCreator } from '../../services/utils';
import { CALL_API, Schemas } from '../../middleware/callApi';

// actions
const actionsObj = createBasicActions('SETTINGS', 'SETTINGS_ITEM', 'settings', CALL_API, Schemas);

// Action Creators
export const actions = actionsObj.actions;
export const loadItems = actionsObj.loadWithPagination;
export const deleteItems = actionsObj.deleteItems;
export const saveItem = actionsObj.saveItem;



export const fetchCurrencies = () => (dispatch) => {
  fetch('http://www.nbrb.by/API/ExRates/Rates?Periodicity=0', {
    method: 'GET'
  })
  .then(response => response.json()
    .then(res => {
      dispatch({
        type: 'CURRENCIES_SUCCESS',
        payload: res
      })
    })
  );
}


// reducers
export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
  isFetched: false,
  currencies: [],
  currenciesIsFetched: false,
};

export default createReducer(defaultState, {
  [actions.SETTINGS_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.SETTINGS_SUCCESS]: basicReducerEvents.success(),
  [actions.SETTINGS_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.SETTINGS_DELETE_REQUEST]: state => ({ ...state, isDeleting: true }),
  [actions.SETTINGS_DELETE_SUCCESS]: basicReducerEvents.deleteSuccess,
  [actions.SETTINGS_DELETE_FAILURE]: state => ({ ...state, isDeleting: false }),
  [actions.SETTINGS_ITEM_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.SETTINGS_ITEM_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.SETTINGS_ITEM_SUCCESS]: basicReducerEvents.itemSuccess(),
  [actions.SETTINGS_ITEM_SAVE_REQUEST]: state => ({ ...state, isSaving: true }),
  [actions.SETTINGS_ITEM_SAVE_SUCCESS]: basicReducerEvents.itemSuccess(),
  [actions.SETTINGS_ITEM_SAVE_FAILURE]: state => ({ ...state, isSaving: false }),
  ['CURRENCIES_SUCCESS']: (state, { payload }) => {
    return {
      ...state,
      currencies: payload,
      currenciesIsFetched: true
    }    
  }
});

//  selectors
export const getSettings = state => (state.allIds.map(id => state.byIds[id]));

