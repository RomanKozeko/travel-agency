import { createReducer, basicReducerEvents, createBasicActions, makeActionCreator, updatePages } from '../../services/utils';
import { CALL_API, Schemas } from '../../middleware/callApi';
import {EDIT_TOUR_FAILURE, EDIT_TOUR_REQUEST, EDIT_TOUR_SUCCESS} from "../tours/toursActions";

// actions
const actionsObj = createBasicActions('MEDIAFILES', 'MEDIAFILE', 'media', CALL_API, Schemas);
const MEDIAFILES_SELECT_FILE = 'MEDIAFILES_SELECT_FILE';
const MEDIA_TOGGLE_ITEM = 'MEDIA_TOGGLE_ITEM';
const MEDIA_RESET_ITEMS = 'MEDIA_RESET_ITEMS';

const MEDIAFILE_SAVE_REQUEST = 'MEDIAFILE_SAVE_REQUEST'
const MEDIAFILE_SAVE_SUCCESS = 'MEDIAFILE_SAVE_SUCCESS'
const MEDIAFILE_SAVE_FAILURE = 'MEDIAFILE_SAVE_FAILURE'

// Action Creators
export const actions = actionsObj.actions;
export const loadItems = actionsObj.load;
export const deleteItems = actionsObj.deleteItems;
export const toggleItem = makeActionCreator(MEDIA_TOGGLE_ITEM, 'id');
export const resetItems = makeActionCreator(MEDIA_RESET_ITEMS);

export const saveItem = ({ payload, fileType }) => (dispatch) => {
	const formData = new FormData();
	formData.append('file', payload);
	const query = fileType ? `?fileType=${fileType}` : ''
	return dispatch({
		[CALL_API]: {
			types: [MEDIAFILE_SAVE_REQUEST, MEDIAFILE_SAVE_SUCCESS, MEDIAFILE_SAVE_FAILURE],
			method: 'POST',
			endpoint: `/api/media${query}`,
			body: formData,
			contentType: 'formData',
			schema: Schemas['MEDIAFILE']
		}
	});
};

export const updateItem = payload => dispatch => {

	return dispatch({
		[CALL_API]: {
			types: [MEDIAFILE_SAVE_REQUEST, MEDIAFILE_SAVE_SUCCESS, MEDIAFILE_SAVE_FAILURE],
			endpoint: `/api/media/${payload._id}`,
			schema: Schemas.MEDIAFILE,
			method: 'PUT',
			body: payload,
			toasterMsg: {
				success: 'Сохраненно'
			}
		}
	})
}

export const updateItemContent = makeActionCreator('UPDATE_ITEM_CONTENT', 'itemID', 'langID', 'val')

export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
  isFetched: false,
  currLanguage: 'ru',
	selected: []
};

const populateSelected = (selected, id) => {
	const newSelected = [...selected];
	const currentIndex = selected.indexOf(id);
	if (currentIndex === -1) {
		newSelected.push(id);
	} else {
		newSelected.splice(currentIndex, 1);
	}
	return newSelected
};

const reducerHelper = {
	toggleItem: (state, action) => {
		const newState = { ...state };
		newState.byIds[action.id].active = !newState.byIds[action.id].active;
		newState.selected = populateSelected(newState.selected, action.id);

		return newState
	},
	deleteSuccess: (state, action) => {
		const idsToRemove = action.response.result;
		const byIds = {...state.byIds};
		const allIds = [...state.allIds];

		Object.keys(idsToRemove).forEach((id) => {
			delete byIds[idsToRemove[id]];
			const index = allIds.indexOf(idsToRemove[id]);
			if (index > -1) {
				allIds.splice(index, 1);
			}
		});

		return {
			...state,
			allIds,
			byIds,
			isDeleting: false,
			selected: []
		}
	},

	resetItems: (state) => {
		const newState = { ...state };
		newState.selected.forEach(id => {
			newState.byIds[id].active = false;
		});
		newState.selected = [];

		return newState
	}
};

const mediaFilesReducer = createReducer(defaultState, {
  [actions.MEDIAFILES_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.MEDIAFILES_SUCCESS]: basicReducerEvents.success(),
  [actions.MEDIAFILES_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.MEDIAFILES_DELETE_REQUEST]: state => ({ ...state, isDeleting: true }),
  [actions.MEDIAFILES_DELETE_SUCCESS]: reducerHelper.deleteSuccess,
  [actions.MEDIAFILES_DELETE_FAILURE]: state => ({ ...state, isDeleting: false }),
  [actions.MEDIAFILES_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.MEDIAFILE_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.MEDIAFILE_SUCCESS]: basicReducerEvents.itemSuccess(),
  [actions.MEDIAFILE_SAVE_REQUEST]: state => ({ ...state, isSaving: true }),
  [actions.MEDIAFILE_SAVE_SUCCESS]: basicReducerEvents.itemSuccess(),
  [actions.MEDIAFILE_SAVE_FAILURE]: state => ({ ...state, isSaving: false }),
  [MEDIA_TOGGLE_ITEM]: reducerHelper.toggleItem,
	[MEDIA_RESET_ITEMS]: reducerHelper.resetItems,
	['UPDATE_ITEM_CONTENT']: (state, { itemID, langID, val }) => {
		const newState = { ...state };
		let hasLang = false;

		newState.byIds[itemID].content = newState.byIds[itemID].content.map(contentItem => {
			if (contentItem.language === langID) {
				contentItem.title = val;
				hasLang = true;
			}
			return contentItem
		});

		if (!hasLang) {
			newState.byIds[itemID].content.push({
				title: val,
				language: langID
			})
		}

		return newState
	}
});

export default mediaFilesReducer;

//  selectors
export const getMediaFiles = state => (state.allIds.map(id => state.byIds[id]));

