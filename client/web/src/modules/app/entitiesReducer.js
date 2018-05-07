import { createReducer, createBasicActions } from '../../services/utils';
import { CALL_API, Schemas } from '../../middleware/callApi';

// actions
const regionsActionsObj = createBasicActions('REGIONS', 'regions', CALL_API, Schemas);
const categoriesActionsObj = createBasicActions('CATEGORIES', 'categories', CALL_API, Schemas);

// Action Creators
export const regionsActions = regionsActionsObj.actions;
export const loadRegions = regionsActionsObj.load;

export const categoriesActions = categoriesActionsObj.actions;
export const loadCategories = categoriesActionsObj.load;

function defaultEntity(options) {
  return { ...{ byId : {}, allIds : [], isFetched: false, isFetching: false }, ...options }
}

const defaultState = {
  categories: defaultEntity(),
  regions: defaultEntity(),
};


const reducer = {
  itemsSuccess: itemsStateName => (state, action) => {
    const response = action.response;
    let items = {...state[itemsStateName]};

    items = {
      allIds: [...items.allIds, ...response.result],
      byIds: {...items.byIds, ...response.entities.items},
      isFetching: false,
      isFetched: true
    };

    return {
      ...state,
      [itemsStateName]: items
    };
  },
};

const categoriesReducerHelper = {
  [categoriesActions.CATEGORIES_SUCCESS]: reducer.itemsSuccess('categories'),
};

const regionsReducerHelper = {
  [regionsActions.REGIONS_SUCCESS]: reducer.itemsSuccess('regions'),
};

const entitiesReducer = createReducer(defaultState, {
  ...categoriesReducerHelper,
  ...regionsReducerHelper,
});

export default entitiesReducer;

//  selectors
export const getRegions = state => state.allIds.map(id => state.byIds[id]);
export const getCategories = state => state.allIds.map(id => state.byIds[id]);
