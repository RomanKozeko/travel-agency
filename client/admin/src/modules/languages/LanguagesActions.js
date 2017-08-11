import { CALL_API, Schemas } from '../../middleware/callApi';

export const LANGUAGES_REQUEST = 'LANGUAGES_REQUEST';
export const LANGUAGES_SUCCESS = 'LANGUAGES_SUCCESS';
export const LANGUAGES_FAILURE = 'LANGUAGES_FAILURE';
export const LANGUAGES_GET_LANGUAGE_FROM_CACHE = 'PAGES/GET_LANGUAGE_FROM_CACHE';
export const LANGUAGE_REQUEST = 'LANGUAGE_REQUEST';
export const LANGUAGE_SUCCESS = 'LANGUAGE_SUCCESS';
export const LANGUAGE_FAILURE = 'LANGUAGE_FAILURE';
export const LANGUAGE_SAVE_REQUEST = 'LANGUAGE_SAVE_REQUEST';
export const LANGUAGE_SAVE_SUCCESS = 'LANGUAGE_SAVE_SUCCESS';
export const LANGUAGE_SAVE_FAILURE = 'LANGUAGE_SAVE_FAILURE';


const fetchLanguages = () => ({
  [CALL_API]: {
    types: [LANGUAGES_REQUEST, LANGUAGES_SUCCESS, LANGUAGES_FAILURE],
    endpoint: '/api/languages',
    schema: Schemas.LANGUAGES,
  }
});

export const loadLanguages = () => (dispatch, getState) => {
  const { allIds } = getState().languages;

  if (!allIds.length) {
    return dispatch(fetchLanguages());
  }

  return null;
};


