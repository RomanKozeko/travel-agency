import { createReducer, basicReducerEvents, createBasicActions } from '../../services/utils';
import { CALL_API, Schemas } from '../../middleware/callApi';

// actions
const actionsObj = createBasicActions('MEDIAFILES', 'MEDIAFILE', 'media', CALL_API, Schemas);

// Action Creators
export const actions = actionsObj.actions;
export const loadItems = actionsObj.load;
export const deleteItems = actionsObj.deleteItems;
export const saveItem = (payload) => (dispatch) => {
	const formData = new FormData();
	formData.append('file', payload);
	return dispatch({
		[CALL_API]: {
			types: ['MEDIAFILE_SAVE_REQUEST', 'MEDIAFILE_SAVE_SUCCESS', 'MEDIAFILE_SAVE_FAILURE'],
			method: 'POST',
			endpoint: '/api/media',
			body: formData,
			contentType: 'formData',
			toasterMsg: {
				success: 'Saved'
			},
			schema: Schemas['MEDIAFILE']
		}
	});
};

// reducers
export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
  isFetched: false,
  currLanguage: 'ru'
};

const mediaFilesReducer = createReducer(defaultState, {
  [actions.MEDIAFILES_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.MEDIAFILES_SUCCESS]: basicReducerEvents.success,
  [actions.MEDIAFILES_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.MEDIAFILES_DELETE_REQUEST]: state => ({ ...state, isDeleting: true }),
  [actions.MEDIAFILES_DELETE_SUCCESS]: basicReducerEvents.deleteSuccess,
  [actions.MEDIAFILES_DELETE_FAILURE]: state => ({ ...state, isDeleting: false }),
  [actions.MEDIAFILES_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.MEDIAFILE_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.MEDIAFILE_SUCCESS]: basicReducerEvents.itemSuccess,
  [actions.MEDIAFILE_SAVE_REQUEST]: state => ({ ...state, isSaving: true }),
  [actions.MEDIAFILE_SAVE_SUCCESS]: basicReducerEvents.itemSuccess,
  [actions.MEDIAFILE_SAVE_FAILURE]: state => ({ ...state, isSaving: false }),
});

export default mediaFilesReducer;

//  selectors
export const getMediaFiles = state => (state.allIds.map(id => state.byIds[id]));

