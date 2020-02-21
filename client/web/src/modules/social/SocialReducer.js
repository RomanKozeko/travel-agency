import { createReducer, withPrefix } from '../../services/utils';
import { CALL_API, Schemas } from '../../middleware/callApi';

const SOCIAL_REQUEST = 'SOCIAL_REQUEST';
const SOCIAL_SUCCESS = 'SOCIAL_SUCCESS';
const SOCIAL_FAILURE = 'SOCIAL_FAILURE';

export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
  isFetched: false,
};

export const fetchSocial = () => (dispatch, getState) => {
  dispatch({
    [CALL_API]: {
      types: [SOCIAL_REQUEST, SOCIAL_SUCCESS, SOCIAL_FAILURE],
      endpoint: withPrefix('/api/social', getState().app.languages.urlPrefix),
      schema: Schemas.PROMO_LINKS,
    },
  });
};

const PhotoSliderReducer = createReducer(defaultState, {
  [SOCIAL_REQUEST]: state => {
    return { ...state, isFetching: true };
  },
  [SOCIAL_SUCCESS]: (state, { response }) => {
    return {
      ...state,
      allIds: [...state.allIds, ...response.result.items],
      byIds: { ...state.byIds, ...response.entities.items },
      isFetching: false,
      isFetched: true,
    };
  },
  [SOCIAL_FAILURE]: state => ({ ...state, isFetching: false }),
});

export default PhotoSliderReducer;

export const getSocial = state => state.allIds.map(id => state.byIds[id]);
