import { createReducer, createBasicActions } from '../../services/utils';
import { CALL_API, Schemas } from '../../middleware/callApi';

// actions
const actionsObj = createBasicActions(
  'REGIONS',
  'REGION',
  'regions',
  CALL_API,
  Schemas
);

// Action Creators
export const actions = actionsObj.actions;
export const loadRegions = actionsObj.load;
export const deleteRegions = actionsObj.deleteItems;
export const loadRegion = actionsObj.loadItem;
export const saveRegion = actionsObj.saveItem;

// reducers
export const defaultState = {
  isFetching: false,
};

const regionsReducer = createReducer(defaultState, {
  [actions.REGIONS_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.REGIONS_SUCCESS]: state => ({
    ...state,
    isFetching: false,
    isFetched: true,
  }),
  [actions.REGIONS_FAILURE]: state => ({
    ...state,
    isFetching: false,
    isFetched: true,
  }),
  [actions.REGIONS_DELETE_REQUEST]: state => ({ ...state, isDeleting: true }),
  [actions.REGIONS_DELETE_SUCCESS]: state => ({ ...state, isDeleting: false }),
  [actions.REGION_FAILURE]: state => ({
    ...state,
    isFetching: false,
    isSaving: false,
  }),
  [actions.REGION_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.REGION_SUCCESS]: state => ({
    ...state,
    isFetching: false,
    isSaving: false,
  }),
  [actions.REGION_SAVE_REQUEST]: state => ({ ...state, isSaving: true }),
  [actions.REGION_SAVE_SUCCESS]: state => ({
    ...state,
    isFetching: false,
    isSaving: false,
  }),
  [actions.REGION_SAVE_FAILURE]: state => ({ ...state, isSaving: false }),
});

export default regionsReducer;
