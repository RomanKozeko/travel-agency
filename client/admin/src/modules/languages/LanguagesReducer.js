import {
  LANGUAGES_REQUEST, LANGUAGES_SUCCESS, LANGUAGES_FAILURE, LANGUAGES_GET_LANGUAGE_FROM_CACHE,
  LANGUAGE_REQUEST, LANGUAGE_SUCCESS, LANGUAGE_FAILURE
} from './LanguagesActions';
import { createReducer } from '../../services/utils';

const languagesSuccess = (state, action) => {
  const payload = action.response;
  return {
    ...state,
    allIds: [...state.allIds, ...payload.result],
    byIds: { ...state.byIds, ...payload.entities.items },
    isFetching: false,
    isFetched: true
  };
};

const languageSuccess = (state, action) => {
  const payload = action.response;
  return {
    ...state,
    allIds: [...state.allIds, payload.result],
    byIds: { ...state.byIds, ...payload.entities.items },
    isFetching: false,
  };
};

export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
  isFetched: false,
  currLanguage: 'ru'
};

const languagesReducer = createReducer(defaultState, {
  [LANGUAGES_REQUEST]: state => ({ ...state, isFetching: true }),
  [LANGUAGES_SUCCESS]: languagesSuccess,
  [LANGUAGES_FAILURE]: state => ({ ...state, isFetching: false }),
  [LANGUAGE_REQUEST]: state => ({ ...state, isFetching: true }),
  [LANGUAGE_SUCCESS]: languageSuccess,
  [LANGUAGES_FAILURE]: state => ({ ...state, isFetching: false })
});

export default languagesReducer;

//  selectors
export const getLanguages = state => (state.allIds.map(id => state.byIds[id]));

