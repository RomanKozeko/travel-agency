import { createReducer, getLangPref, getLangUrlPref } from '../../services/utils';
import { CALL_API, Schemas } from '../../middleware/callApi';
import { combineReducers } from 'redux';

const LANGUAGES_REQUEST = 'LANGUAGES_REQUEST';
const LANGUAGES_SUCCESS = 'LANGUAGES_SUCCESS';
const LANGUAGES_FAILURE = 'LANGUAGES_FAILURE';

export const fetchItems = () => ({
	[CALL_API]: {
		types: [LANGUAGES_REQUEST, LANGUAGES_SUCCESS, LANGUAGES_FAILURE],
		endpoint: '/api/languages',
		schema: Schemas.LANGUAGES,
	}
});

const defaultState = {
  prefix: getLangPref(),
  defaultLang: 'ru',
	allIds: [],
	byIds: {},
	isFetching: false,
  items: []
};

const itemsSuccess = (state, action) => {
	const payload = action.response;
	return {
		...state,
		allIds: [...state.allIds, ...payload.result],
		byIds: { ...state.byIds, ...payload.entities.items },
		isFetching: false,
		isFetched: true,
		urlPrefix: getLangUrlPref(payload.result, payload.entities.items, state.prefix)
	};
};

const languagesReducer = createReducer(defaultState, {
	[LANGUAGES_REQUEST]: state => ({ ...state, isFetching: true }),
	[LANGUAGES_SUCCESS]: itemsSuccess,
	[LANGUAGES_FAILURE]: state => ({ ...state, isFetching: false }),
});

export default combineReducers({
	languages: languagesReducer
});

//selectors
export const getLanguages = state => (state.allIds.map(id => state.byIds[id]));