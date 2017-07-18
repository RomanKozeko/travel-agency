import { TOURS_REQUEST, TOURS_SUCCESS, TOURS_FAILURE, TOURS_GET_PAGE_FROM_CACHE } from './toursActions';


const toursReducer = (state = {
  allIds: [],
  byIds: {},
  isFetching: false,
  pageCount: 0,
  currPage: 0,
  pages: {}
}, action) => {
  switch (action.type) {
    case TOURS_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case TOURS_GET_PAGE_FROM_CACHE: {
      return {
        ...state,
        currPage: action.payload
      }
    }
    case TOURS_SUCCESS: {
      const payload = action.response;
      return {
        ...state,
        allIds: payload.result.tours,
        byIds: payload.entities.tours,
        isFetching: false,
        count: payload.result.count,
        pageCount: getPageCount(payload.result.count, payload.result.limit),
        currPage: payload.nextPage,
        pages: {
          ...state.pages,
          [payload.nextPage]: payload.result.tours
        }
      }
    }
    case TOURS_FAILURE: {
      return {
        ...state,
        isFetching: false
      }
    }
    default:
      return state
  }
};

const getPageCount = (count, limit) => {
  return parseInt(count/limit) + (count % limit)
};

export default toursReducer;

export const getTours = state => (state.allIds.map(id => state.byIds[id]));