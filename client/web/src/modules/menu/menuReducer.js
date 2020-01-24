import {createReducer, withPrefix} from '../../services/utils';
import {CALL_API, Schemas} from "../../middleware/callApi";

const MENU_REQUEST = 'MENU_REQUEST';
const MENU_SUCCESS = 'MENU_SUCCESS';
const MENU_FAILURE = 'MENU_FAILURE';

export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
  isFetched: false
};

export const fetchMenu = () => (dispatch, getState) => {
  dispatch({
    [CALL_API]: {
      types: [ MENU_REQUEST, MENU_SUCCESS, MENU_FAILURE ],
      endpoint: withPrefix('/api/menu', getState().app.languages.urlPrefix),
      schema: Schemas.MENU
    }
  })
};

export default createReducer(defaultState, {
  [MENU_REQUEST] : (state) => ({...state, isFetching: true}),
  [MENU_SUCCESS] : (state, { response }) => {
    let items = response.entities.items;
    Object.keys(items).map((key) => {
      if (items[key].page.content === undefined) {
        items[key].page = Object.assign({content: {}}, items[key].page)
      }
    });

    return {
      ...state,
      allIds: response.result.items,
      byIds: {...state.byIds, ...items},
      isFetching: false,
      isFetched: true
    }
  },
  [MENU_FAILURE]: (state) => ({...state, isFetching: false}),
});

export const getMenu = state => (state.allIds.map(id => state.byIds[id]));