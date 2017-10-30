import { createReducer, makeActionCreator } from '../../services/utils';
import { addRow, removeRow, setInputsValues, normolizeRowItems } from './pageFormService';

// actions
const PAGE_DID_MOUNT = 'PAGE_DID_MOUNT';
const PAGE_UNMOUNT = 'PAGE_UNMOUNT';
const PAGE_ADD_ROW = 'PAGE_ADD_ROW';
const PAGE_SAVE_ROW_ITEM = 'PAGE_SAVE_ROW_ITEM';
const PAGE_REMOVE_ROW = 'PAGE_REMOVE_ROW';
const PAGE_INPUT_CHANGE = 'PAGE_INPUT_CHANGE';
const PAGE_OPEN_HTML_EDITOR = 'PAGE_OPEN_HTML_EDITOR';
const PAGE_CLOSE_HTML_EDITOR = 'CLOSE_HTML_EDITOR';
const PAGE_REMOVE_ROW_ITEM = 'PAGE_REMOVE_ROW_ITEM';
const PAGE_EDIT_ROW_ITEM = 'PAGE_EDIT_ROW_ITEM';

const PAGE_OPEN_TOURS_LIST_POPUP_EDITOR = 'PAGE_OPEN_TOURS_LIST_POPUP_EDITOR';
const PAGE_CLOSE_TOURS_LIST_POPUP_EDITOR = 'PAGE_CLOSE_TOURS_LIST_POPUP_EDITOR';

// Action Creators
export const pageDidMount = makeActionCreator(PAGE_DID_MOUNT, 'payload');
export const pageUnmount = makeActionCreator(PAGE_UNMOUNT);
export const pageAddRow = makeActionCreator(PAGE_ADD_ROW, 'columns', 'langId');
export const pageRemoveRow = makeActionCreator(PAGE_REMOVE_ROW, 'langId', 'rowId');
export const pageRemoveRowItem = makeActionCreator(PAGE_REMOVE_ROW_ITEM, 'itemId');
export const pageEditRowItem = makeActionCreator(PAGE_EDIT_ROW_ITEM, 'itemId');
export const pageInputChange = makeActionCreator(PAGE_INPUT_CHANGE, 'langId', 'name', 'value');
export const openHtmlEditor = makeActionCreator(PAGE_OPEN_HTML_EDITOR, 'rowItem');
export const closeHtmlEditor = makeActionCreator(PAGE_CLOSE_HTML_EDITOR);
export const saveRow = makeActionCreator(PAGE_SAVE_ROW_ITEM, 'content');
export const openAddToursListPopup = makeActionCreator(PAGE_OPEN_TOURS_LIST_POPUP_EDITOR, 'rowItem');
export const closeAddToursListPopup = makeActionCreator(PAGE_CLOSE_TOURS_LIST_POPUP_EDITOR);

const addRowSuccess = (state, action) => {
  const addedRow = addRow({ ...state.contentByLang }, action.columns, action.langId);
  return {
    ...state,
    contentByLang: addedRow.contentByLang,
    rowItemsByID: { ...state.rowItemsByID, ...addedRow.rowItemsByID }
  };
};

const saveRowSuccess = (state, action) => {
  const currRowItem = {...state.currRowItem};
  const rowItemsByID = {...state.rowItemsByID};
  rowItemsByID[currRowItem.id || currRowItem._id].content = action.content;
  return {
    ...state,
    rowItemsByID,
    htmlEditorOpen: false,
    currRowItem: null
  };
};

const removeRowSuccess = (state, { langId, rowId }) => ({
  ...state,
  contentByLang: removeRow({ ...state.contentByLang }, langId, rowId)
});

const removeRowItem = (state, { itemId }) => {
  const rowItemsByID = { ...state.rowItemsByID };
  rowItemsByID[itemId].content = '';
  return {
    ...state,
    rowItemsByID
  };
};

const editRowItem = (state, { itemId }) => {
  const rowItemsByID = { ...state.rowItemsByID };
  return {
    ...state,
    htmlEditorOpen: true,
    currRowItem: rowItemsByID[itemId]
  };
};

const inputChange = (state, action) => setInputsValues(
  { ...state.contentByLang },
  state, action
);

const openEditor = (state, action) => ({
  ...state,
  htmlEditorOpen: true,
  currRowItem: action.rowItem
});


const setUpState = (state, action) => {
  const rowItemsByID = normolizeRowItems([...action.payload.item.content]);
  return {
    ...state,
    ...action.payload,
    rowItemsByID
  };
};

const reducerHelper = {
  openAddToursListPopup: (state, action) => ({
    ...state,
    addToursPopupOpen: true,
    currRowItem: action.rowItem
  })
}

const defaultState = {
  htmlEditorOpen: false,
  addToursPopupOpen: false,
  contentByLang: {},
  currRowItem: null
};

const pageReducer = createReducer(defaultState, {
  [PAGE_DID_MOUNT]: setUpState,
  [PAGE_UNMOUNT]: () => ({ ...defaultState }),
  [PAGE_ADD_ROW]: addRowSuccess,
  [PAGE_REMOVE_ROW]: removeRowSuccess,
  [PAGE_EDIT_ROW_ITEM]: editRowItem,
  [PAGE_SAVE_ROW_ITEM]: saveRowSuccess,
  [PAGE_REMOVE_ROW_ITEM]: removeRowItem,
  [PAGE_INPUT_CHANGE]: inputChange,
  [PAGE_OPEN_HTML_EDITOR]: openEditor,
  [PAGE_CLOSE_HTML_EDITOR]: state => ({ ...state, htmlEditorOpen: false, currRowItem: null }),
  [PAGE_OPEN_TOURS_LIST_POPUP_EDITOR]: reducerHelper.openAddToursListPopup,
  [PAGE_CLOSE_TOURS_LIST_POPUP_EDITOR]: state => ({ ...state, addToursPopupOpen: false, currRowItem: null }),

});

export default pageReducer