import { createReducer } from '../../services/utils';
import { actions } from './categoriesActions';

const categoriesSuccess = (state, action) => {
  const payload = action.response;
  return {
    ...state,
    allIds: [...state.allIds, ...payload.result],
    byIds: { ...state.byIds, ...payload.entities.items },
    content: { ...state.content, ...payload.entities.content },
    isFetching: false
  };
};

const categoriesDeleteSuccess = (state, action) => {
  const idsToRemove = action.response.result;
  const byIds = { ...state.byIds };
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
    byIds
  };
};

const categorySuccess = (state, action) => {
  const payload = action.response;

  return {
    ...state,
    allIds: [...state.allIds, payload.result],
    byIds: { ...state.byIds, ...payload.entities.items },
    content: { ...state.content, ...payload.entities.content },
    isFetching: false,
    isSaving: false
  };
};

export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
};

const categoriesReducer = createReducer(defaultState, {
  [actions.CATEGORIES_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.CATEGORIES_SUCCESS]: categoriesSuccess,
  [actions.CATEGORIES_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.CATEGORIES_DELETE_REQUEST]: state => ({ ...state, isDeleting: true }),
  [actions.CATEGORIES_DELETE_SUCCESS]: categoriesDeleteSuccess,
  [actions.CATEGORIES_FAILURE]: state => ({ ...state, isFetching: false }),
  [actions.CATEGORY_REQUEST]: state => ({ ...state, isFetching: true }),
  [actions.CATEGORY_SUCCESS]: categorySuccess,
  [actions.CATEGORY_SAVE_REQUEST]: state => ({ ...state, isSaving: true }),
  [actions.CATEGORY_SAVE_SUCCESS]: categorySuccess
});

export default categoriesReducer;

//  selectors
export const getCategories = state => (state.allIds.map(id => state.byIds[id]));
export const getCategory = (state, id) => {
  if (state.byIds[id]) {
    return state.byIds[id];
  }
  return null;
};

