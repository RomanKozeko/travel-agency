import { createReducer, basicReducerEvents, createBasicActions } from '../../services/utils';
import { CALL_API, Schemas } from '../../middleware/callApi';

// actions
const actionsObj = createBasicActions('LANGUAGES', 'LANGUAGE', 'languages', CALL_API, Schemas);

// Action Creators
export const actions = actionsObj.actions;
export const loadLang = actionsObj.load;
export const deleteLang = actionsObj.deleteItems;
export const saveLang = actionsObj.saveItem;

// reducers
export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
  isFetched: false,
  currLanguage: 'ru'
};

const languagesReducer = createReducer(defaultState, {
  [actions.LANGUAGES_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.LANGUAGES_SUCCESS]: basicReducerEvents.success,
  [actions.LANGUAGES_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.LANGUAGES_DELETE_REQUEST]: state => ({ ...state, isDeleting: true }),
  [actions.LANGUAGES_DELETE_SUCCESS]: basicReducerEvents.deleteSuccess,
  [actions.LANGUAGES_DELETE_FAILURE]: state => ({ ...state, isDeleting: false }),
  [actions.LANGUAGES_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.LANGUAGE_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.LANGUAGE_SUCCESS]: basicReducerEvents.itemSuccess,
  [actions.LANGUAGE_SAVE_REQUEST]: state => ({ ...state, isSaving: true }),
  [actions.LANGUAGE_SAVE_SUCCESS]: basicReducerEvents.itemSuccess,
  [actions.LANGUAGE_SAVE_FAILURE]: state => ({ ...state, isSaving: false }),
});

export default languagesReducer;

//  selectors
export const getLanguages = state => (state.allIds.map(id => state.byIds[id]));

