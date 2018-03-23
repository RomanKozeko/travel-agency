import {createReducer, withPrefix} from '../../services/utils';
import {CALL_API, Schemas} from "../../middleware/callApi";

const PROMO_LINKS_REQUEST = 'PROMO_LINKS_REQUEST'
const PROMO_LINKS_SUCCESS = 'PROMO_LINKS_SUCCESS'
const PROMO_LINKS_FAILURE = 'PROMO_LINKS_REQUEST'

export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
  isFetched: false
};

export const fetchPromoLinks = () => (dispatch, getState) => {
  dispatch({
    [CALL_API]: {
      types: [ PROMO_LINKS_REQUEST, PROMO_LINKS_SUCCESS, PROMO_LINKS_FAILURE ],
      endpoint: withPrefix('/api/featured', getState().app.languages.urlPrefix),
      schema: Schemas.PROMO_LINKS
    }
  })
};

const promoLinksReducer = createReducer(defaultState, {
  [PROMO_LINKS_REQUEST] : (state) => {
    return {...state, isFetching: true}
  },
  [PROMO_LINKS_SUCCESS] : (state, { response }) => {
    return {
      ...state,
      allIds: [...state.allIds, ...response.result.items],
      byIds: {...state.byIds, ...response.entities.items},
      isFetching: false,
      isFetched: true
    }
  },
  [PROMO_LINKS_FAILURE]: (state) => ({...state, isFetching: false}),
});

export default promoLinksReducer;

export const getPromoLinks = state => (state.allIds.map(id => state.byIds[id]));