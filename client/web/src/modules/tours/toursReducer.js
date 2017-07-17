import { TOURS_REQUEST, TOURS_SUCCESS, TOURS_FAILURE } from './toursActions';


const toursReducer = (state = {
  allIds: [],
  byIds: {},
  isFetching: false,
  pageCount: 0,
  pages: {}
}, action) => {
  switch (action.type) {
    case TOURS_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case TOURS_SUCCESS: {
      return {
        ...state,
        allIds: action.response.result.tours,
        byIds: action.response.entities.tours,
        isFetching: false,
        pageCount: action.response.nextPage,
        pages: {
          ...state.pages,
          [action.response.nextPage]: action.response.result.tours
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

export default toursReducer;

export const getTours = state => (state.allIds.map(id => state.byIds[id]));