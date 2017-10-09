import { createReducer, makeActionCreator } from '../../services/utils';
import { addRow, removeRow } from './pageFormService';

const defaultState = {
  htmlEditorOpen: false,
  contentByLang: {},
  currRowItem: null
};

// actions
const PAGE_DID_MOUNT = 'PAGE_DID_MOUNT';
const PAGE_UNMOUNT = 'PAGE_UNMOUNT';
const PAGE_ADD_ROW = 'PAGE_ADD_ROW';
const PAGE_REMOVE_ROW = 'PAGE_REMOVE_ROW';

// Action Creators
export const pageDidMount = makeActionCreator(PAGE_DID_MOUNT, 'payload');
export const pageUnmount = makeActionCreator(PAGE_UNMOUNT);
export const pageAddRow = makeActionCreator(PAGE_ADD_ROW, 'columns', 'langId');
export const pageRemoveRow = makeActionCreator(PAGE_REMOVE_ROW, 'langId', 'rowId');


const addRowSuccess = (state, action) => ({
  ...state,
  contentByLang: addRow({...state.contentByLang}, action.columns, action.langId)
});

const removeRowSuccess = (state, action) => ({
  ...state,
  contentByLang: removeRow({...state.contentByLang}, action.langId, action.rowId)
});


const pageReducer = createReducer(defaultState, {
  [PAGE_DID_MOUNT]: (state, action) => ({ ...state, ...action.payload }),
  [PAGE_UNMOUNT]: state => ({ ...defaultState }),
  [PAGE_ADD_ROW]: addRowSuccess,
  [PAGE_REMOVE_ROW]: removeRowSuccess,
});

export default pageReducer