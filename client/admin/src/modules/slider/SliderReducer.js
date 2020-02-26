import {
  createReducer,
  basicReducerEvents,
  createBasicActions,
} from '../../services/utils';
import { CALL_API, Schemas } from '../../middleware/callApi';

// actions
const actionsObj = createBasicActions(
  'SLIDER',
  'SLIDER_ITEM',
  'slider',
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
  currencies: [],
  currenciesIsFetched: false,
};

export default createReducer(defaultState, {
  [actions.SLIDER_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.SLIDER_SUCCESS]: basicReducerEvents.success(),
  [actions.SLIDER_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.SLIDER_DELETE_REQUEST]: state => ({ ...state, isDeleting: true }),
  [actions.SLIDER_DELETE_SUCCESS]: basicReducerEvents.deleteSuccess,
  [actions.SLIDER_DELETE_FAILURE]: state => ({ ...state, isDeleting: false }),
  [actions.SLIDER_ITEM_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.SLIDER_ITEM_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.SLIDER_ITEM_SUCCESS]: basicReducerEvents.itemSuccess(),
  [actions.SLIDER_ITEM_SAVE_REQUEST]: state => ({ ...state, isSaving: true }),
  [actions.SLIDER_ITEM_SAVE_SUCCESS]: basicReducerEvents.itemSuccess(),
  [actions.SLIDER_ITEM_SAVE_FAILURE]: state => ({ ...state, isSaving: false }),
});

//  selectors
export const getSliderItems = state => state.allIds.map(id => state.byIds[id]);
