import {
  createReducer,
  basicReducerEvents,
  createBasicActions,
} from '../../services/utils';
import { CALL_API, Schemas } from '../../middleware/callApi';

// actions
const actionsObj = createBasicActions(
  'NEWS',
  'NEWS_ITEM',
  'news',
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
  [actions.NEWS_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.NEWS_SUCCESS]: basicReducerEvents.success(),
  [actions.NEWS_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.NEWS_DELETE_REQUEST]: state => ({ ...state, isDeleting: true }),
  [actions.NEWS_DELETE_SUCCESS]: basicReducerEvents.deleteSuccess,
  [actions.NEWS_DELETE_FAILURE]: state => ({ ...state, isDeleting: false }),
  [actions.NEWS_ITEM_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.NEWS_ITEM_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.NEWS_ITEM_SUCCESS]: basicReducerEvents.itemSuccess(),
  [actions.NEWS_ITEM_SAVE_REQUEST]: state => ({ ...state, isSaving: true }),
  [actions.NEWS_ITEM_SAVE_SUCCESS]: basicReducerEvents.itemSuccess(),
  [actions.NEWS_ITEM_SAVE_FAILURE]: state => ({ ...state, isSaving: false }),
});

//  selectors
export const getNews = state => state.allIds.map(id => state.byIds[id]);
