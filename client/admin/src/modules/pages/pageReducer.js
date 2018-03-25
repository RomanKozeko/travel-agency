import { createReducer, makeActionCreator, getFiltersQuery } from '../../services/utils';
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
const PAGE_EDIT_ROW_TITLE = 'PAGE_EDIT_ROW_TITLE';
const PAGE_EDIT_ROW_ORDER = 'PAGE_EDIT_ROW_ORDER';

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
export const saveRow = makeActionCreator(PAGE_SAVE_ROW_ITEM, 'content', 'filterType', 'itemsContent');
export const openAddToursListPopup = makeActionCreator(PAGE_OPEN_TOURS_LIST_POPUP_EDITOR, 'rowItem');
export const closeAddToursListPopup = makeActionCreator(PAGE_CLOSE_TOURS_LIST_POPUP_EDITOR);
export const editRowTitle = makeActionCreator(PAGE_EDIT_ROW_TITLE, 'payload');
export const editOrder = makeActionCreator(PAGE_EDIT_ROW_ORDER, 'payload');

const addRowSuccess = (state, action) => {
  const addedRow = addRow({ ...state.contentByLang }, action.columns, action.langId);
  return {
    ...state,
    contentByLang: addedRow.contentByLang,
    rowItemsByID: { ...state.rowItemsByID, ...addedRow.rowItemsByID }
  };
};

const removeRowSuccess = (state, { langId, rowId }) => ({
  ...state,
  contentByLang: removeRow({ ...state.contentByLang }, langId, rowId)
});

const removeRowItem = (state, { itemId }) => {
  const rowItemsByID = { ...state.rowItemsByID };
  rowItemsByID[itemId].type = '';
  rowItemsByID[itemId].content = '';
  rowItemsByID[itemId].filters = '';
  rowItemsByID[itemId].filtersObj = {};
  return {
    ...state,
    rowItemsByID
  };
};

const editRowItem = (state, { itemId }) => {
  const rowItemsByID = { ...state.rowItemsByID };
  return {
    ...state,
    htmlEditorOpen: rowItemsByID[itemId].type === 'content',
    addToursPopupOpen: rowItemsByID[itemId].type === 'tours',
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
  }),
  saveRow: (state, action) => {
    const currRowItem = {...state.currRowItem};
    const rowItemsByID = {...state.rowItemsByID};
    if (action.filterType === 'content') {
      const id = currRowItem.id || currRowItem._id;
      rowItemsByID[id].type = action.filterType;
      rowItemsByID[id].content = action.content;
    }
    if (action.filterType === 'tours') {
      const id = currRowItem.id || currRowItem._id;
      rowItemsByID[id].type = action.filterType;
      rowItemsByID[id] = {...rowItemsByID[id], ...action.itemsContent};
      rowItemsByID[id].filters = getFiltersQuery(action.itemsContent.filtersObj);
    }
    return {
      ...state,
      rowItemsByID,
      htmlEditorOpen: false,
      addToursPopupOpen: false,
      currRowItem: null
    };
  }
};

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
  [PAGE_SAVE_ROW_ITEM]: reducerHelper.saveRow,
  [PAGE_REMOVE_ROW_ITEM]: removeRowItem,
  [PAGE_INPUT_CHANGE]: inputChange,
  [PAGE_OPEN_HTML_EDITOR]: openEditor,
  [PAGE_CLOSE_HTML_EDITOR]: state => ({ ...state, htmlEditorOpen: false, currRowItem: null }),
  [PAGE_OPEN_TOURS_LIST_POPUP_EDITOR]: reducerHelper.openAddToursListPopup,
  [PAGE_CLOSE_TOURS_LIST_POPUP_EDITOR]: state => ({ ...state, addToursPopupOpen: false, currRowItem: null }),
  [PAGE_EDIT_ROW_TITLE]: (state, { payload: { value, id, langId }}) => {
    const item = {...state.item};
    item.content = item.content.map(itemContent => {
      if (itemContent.language === langId) {
        return {
          ...itemContent,
          rows: itemContent.rows.map(row => {
            if ((row._id || row.id) === id) {
              return {
                ...row,
                title: value
              }
            }
            return row
          })
        }
      }
      return itemContent
    })
    return {
      ...state,
      item,
      contentByLang: {
        ...state.contentByLang,
        [langId]: {
          ...state.contentByLang[langId],
          rows: state.contentByLang[langId].rows.map(row => {
            if ((row._id || row.id) === id) {
              return {
                ...row,
                title: value
              }
            }
            return row
          })
        }
      }
    };
  },
  [PAGE_EDIT_ROW_ORDER]: (state, { payload: { value, id, langId }}) => {
    const item = {...state.item};
    item.content = item.content.map(itemContent => {
      if (itemContent.language === langId) {
        return {
          ...itemContent,
          rows: itemContent.rows.map(row => {
            if ((row._id || row.id) === id) {
              return {
                ...row,
                order: value
              }
            }
            return row
          })
        }
      }
      return itemContent
    })
    return {
      ...state,
      item,
      contentByLang: {
        ...state.contentByLang,
        [langId]: {
          ...state.contentByLang[langId],
          rows: state.contentByLang[langId].rows.map(row => {
            if ((row._id || row.id) === id) {
              return {
                ...row,
                order: value
              }
            }
            return row
          })
        }
      }
    };
  }

});

export default pageReducer