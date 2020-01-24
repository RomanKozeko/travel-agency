import {createReducer, withPrefix} from '../../services/utils';
import {CALL_API, Schemas} from "../../middleware/callApi";

const PHOTO_SLIDER_REQUEST = 'PHOTO_SLIDER_REQUEST'
const PHOTO_SLIDER_SUCCESS = 'PHOTO_SLIDER_SUCCESS'
const PHOTO_SLIDER_FAILURE = 'PHOTO_SLIDER_FAILURE'

export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
  isFetched: false
};

export const fetchPhotoSlider = () => (dispatch, getState) => {
  dispatch({
    [CALL_API]: {
      types: [ PHOTO_SLIDER_REQUEST, PHOTO_SLIDER_SUCCESS, PHOTO_SLIDER_FAILURE ],
      endpoint: withPrefix('/api/slider', getState().app.languages.urlPrefix),
      schema: Schemas.PROMO_LINKS
    }
  })
};

const PhotoSliderReducer = createReducer(defaultState, {
  [PHOTO_SLIDER_REQUEST] : (state) => {
    return {...state, isFetching: true}
  },
  [PHOTO_SLIDER_SUCCESS] : (state, { response }) => {
    let items = response.entities.items;
    Object.keys(items).map((key) => {
      if (items[key].content === undefined) {
        items[key] = Object.assign({content: {}}, items[key])
      }
    });
    
    return {
      ...state,
      allIds: [...state.allIds, ...response.result.items],
      byIds: {...state.byIds, ...items},
      isFetching: false,
      isFetched: true
    }
  },
  [PHOTO_SLIDER_FAILURE]: (state) => ({...state, isFetching: false}),
});

export default PhotoSliderReducer;

export const getPhotoSliders = state => (state.allIds.map(id => state.byIds[id]));