import {createReducer, withPrefix} from '../../services/utils';
import {CALL_API, Schemas} from "../../middleware/callApi";

const ORDER_REQUEST = 'ORDER_REQUEST';
const ORDER_SUCCESS = 'ORDER_SUCCESS';
const ORDER_FAILURE = 'ORDER_FAILURE';

export const defaultState = {
  isFetching: false,
};

export const sendEmail = (payload) => (dispatch, getState) => {
  dispatch({
    [CALL_API]: {
      types: [ ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAILURE ],
      endpoint: withPrefix('/api/send-email', getState().app.languages.urlPrefix),
      method: 'POST',
      body: payload,
    }
  })
};

export default createReducer(defaultState, {
  [ORDER_REQUEST] : (state) => ({...state, isFetching: true}),
  [ORDER_SUCCESS] : (state, { response }) => {

    return {
      ...state,
      isFetching: false,
    }
  },
  [ORDER_FAILURE]: (state) => ({...state, isFetching: false}),
});
