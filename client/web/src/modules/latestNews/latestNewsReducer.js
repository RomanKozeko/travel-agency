import {createReducer, withPrefix} from '../../services/utils';
import {CALL_API, Schemas} from "../../middleware/callApi";

const LATEST_NEWS_REQUEST = 'LATEST_NEWS_REQUEST'
const LATEST_NEWS_SUCCESS = 'LATEST_NEWS_SUCCESS'
const LATEST_NEWS_FAILURE = 'LATEST_NEWS_REQUEST'

export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
  isFetched: false
};

export const fetchLatestNews = () => (dispatch, getState) => {
  dispatch({
    [CALL_API]: {
      types: [ LATEST_NEWS_REQUEST, LATEST_NEWS_SUCCESS, LATEST_NEWS_FAILURE ],
      endpoint: withPrefix('/api/news', getState().app.languages.urlPrefix),
      schema: Schemas.PROMO_LINKS
    }
  })
};

export default createReducer(defaultState, {
  [LATEST_NEWS_REQUEST] : (state) => ({...state, isFetching: true}),
  [LATEST_NEWS_SUCCESS] : (state, { response }) => {
    return {
      ...state,
      allIds: [...state.allIds, ...response.result.items],
      byIds: {...state.byIds, ...response.entities.items},
      isFetching: false,
      isFetched: true
    }
  },
  [LATEST_NEWS_FAILURE]: (state) => ({...state, isFetching: false}),
});

export const getLatestNews = state => (state.allIds.map(id => state.byIds[id]));