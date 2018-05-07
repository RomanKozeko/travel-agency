import * as actions from './toursActions';
import { createReducer, getPageCount } from '../../services/utils';


const toursSuccess = (state, action) => {
  const payload = action.response;
  return {
    ...state,
    allIds: [...state.allIds, ...payload.result.items],
    byIds: {...state.byIds, ...payload.entities.items},
    isFetching: false,
    isFetched: true,
    count: payload.result.count,
    pageCount: getPageCount(payload.result.count, payload.result.limit),
    currPage: payload.nextPage,
    pages: {
      ...state.pages,
      [payload.nextPage]: payload.result.items
    }
  }
};

const filteredToursSuccess = (state, { response: {result, entities, query} }) => {

	const allIds = [...state.allIds]

	result.items.forEach(item => {
		if (state.allIds.indexOf(item) === -1) {
			allIds.push(item)
		}
  });

  return {
    ...state,
	  allIds,
    byIds: {...state.byIds, ...entities.items},
    isFetching: false,
    isFetched: true,
    byQueries: {
      ...state.byQueries,
      [query]: result.items,
    },
    activeQuery: [query]
  }
};

const tourSuccess = (state, action) => {
	const payload = action.response;
	const allIds = [...state.allIds];

	if (allIds.indexOf(payload.result) === -1) {
		allIds.push(payload.result)
	}

	return {
		...state,
		allIds,
		byIds: { ...state.byIds, ...payload.entities.items },
		isSaving: false,
		isFetching: false
	};
};

export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
  pageCount: 0,
  currPage: 0,
  byQueries: {},
  activeQuery: '',
  pages: {}
};

const toursReducer = createReducer(defaultState, {
  [actions.TOURS_REQUEST] : (state) => ({...state, isFetching: true}),
  [actions.TOURS_GET_PAGE_FROM_CACHE] : (state, action) => ({...state, currPage: action.payload}),
  [actions.TOURS_SUCCESS] : toursSuccess,
  [actions.TOURS_FAILURE]: (state) => ({...state, isFetching: false}),
  [actions.TOURS_FILTERED_REQUEST]: (state) => ({...state, isFetching: true}),
  [actions.TOURS_FILTERED_SUCCESS]: filteredToursSuccess,
  [actions.TOURS_FILTERED_FAILURE]: (state) => ({...state, isFetching: false}),
  [actions.TOUR_SUCCESS]: tourSuccess,
  [actions.TOURS_SET_ACTIVE_FILTER]: (state, action) => ({...state, activeQuery: action.payload}),
  [actions.TOURS_RESET_ACTIVE_FILTER]: (state, action) => ({...state, activeQuery: ''}),
});

export default toursReducer;


//selectors
export const getTours = state => (state.allIds.map(id => state.byIds[id]));
export const getToursByQuery = (state, query) => {
  if (!query) {
    return state.allIds.map(id => state.byIds[id])
  }
  if (state.byQueries[query]) {
    return state.byQueries[query].map(id => state.byIds[id])
  } else {
    return []
  }
};
export const getPageWithTours = (state, page) => {
  if (state.pages[page]) {
    return state.pages[page].map(id => state.byIds[id])
  } else {
    return []
  }
};

export const getTour = (state, id) => {
  if (state.byIds[id]) {
    return state.byIds[id];
  }

  return null;
};