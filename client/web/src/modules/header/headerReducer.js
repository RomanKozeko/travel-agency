import {createReducer, withPrefix} from '../../services/utils';
import {CALL_API, Schemas} from "../../middleware/callApi";

const CONTACTS_REQUEST = 'CONTACTS_REQUEST'
const CONTACTS_SUCCESS = 'CONTACTS_SUCCESS'
const CONTACTS_FAILURE = 'CONTACTS_FAILURE'

export const defaultState = {
  allIds: [],
  byIds: {},
  isFetching: false,
  isFetched: false
};

export const fetchContacts = () => (dispatch, getState) => {
  dispatch({
    [CALL_API]: {
      types: [ CONTACTS_REQUEST, CONTACTS_SUCCESS, CONTACTS_FAILURE ],
      endpoint: withPrefix('/api/contacts', getState().app.languages.urlPrefix),
      schema: Schemas.CONTACTS
    }
  })
};

export default createReducer(defaultState, {
  [CONTACTS_REQUEST] : (state) => ({...state, isFetching: true}),
  [CONTACTS_SUCCESS] : (state, { response }) => {
    return {
      ...state,
      allIds: [...state.allIds, ...response.result.items],
      byIds: {...state.byIds, ...response.entities.items},
      isFetching: false,
      isFetched: true
    }
  },
  [CONTACTS_FAILURE]: (state) => ({...state, isFetching: false}),
});

export const getContacts = state => (state.allIds.map(id => state.byIds[id]));