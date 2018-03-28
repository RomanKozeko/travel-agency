import { createReducer, makeActionCreator, getFiltersQuery } from '../../services/utils';
import { addRow, removeRow, setInputsValues, normolizeRowItems, addCustomRow } from './pageFormService';

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
const PAGE_ADD_CUSTOM_ROW = 'PAGE_ADD_CUSTOM_ROW';
const PAGE_TOGGLE_MEDIA_POPUP = 'PAGE_TOGGLE_MEDIA_POPUP';
const PAGE_ADD_IMAGES = 'PAGE_ADD_IMAGES';
const PAGE_CLOSE_MEDIA_POPUP = 'PAGE_CLOSE_MEDIA_POPUP';
const PAGE_DELETE_MEDIA_FILE = 'PAGE_DELETE_MEDIA_FILE';

// Action Creators
export const pageDidMount = makeActionCreator(PAGE_DID_MOUNT, 'payload');
export const pageUnmount = makeActionCreator(PAGE_UNMOUNT);
export const pageAddRow = makeActionCreator(PAGE_ADD_ROW, 'columns', 'langId');
export const pageAddCustomRow = makeActionCreator(PAGE_ADD_CUSTOM_ROW, 'payload');
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
export const openMediaPopup = makeActionCreator(PAGE_TOGGLE_MEDIA_POPUP, 'currRowId');
export const closeMediaPopup = makeActionCreator(PAGE_CLOSE_MEDIA_POPUP);
export const deleteMediaItem = makeActionCreator(PAGE_DELETE_MEDIA_FILE, 'payload');
export const addImages = () => (dispatch, getState) => {
  let { mediafiles: { selected }} = getState();
  return dispatch({
    type: PAGE_SAVE_ROW_ITEM,
    content: '',
    filterType: '@gallery',
    itemsContent: selected
  })
};

const addRowSuccess = (state, action) => {
  const addedRow = addRow({ ...state.contentByLang }, action.columns, action.langId);
  return {
    ...state,
    contentByLang: addedRow.contentByLang,
    rowItemsByID: { ...state.rowItemsByID, ...addedRow.rowItemsByID }
  };
};

const addCustomRowSuccess = (state, { payload: { langId, type } }) => {
  const addedRow = addCustomRow({ ...state.contentByLang }, langId, type)
  return {
    ...state,
    contentByLang: addedRow.contentByLang,
    rowItemsByID: { ...state.rowItemsByID, ...addedRow.rowItemsByID }
  };
};

const updateImages = (allImages,rowItemsByID,  contentByLang, langId, rowId) => {
  const index = contentByLang[langId].rows.findIndex(row => (
    row.id === rowId || row._id === rowId
  ));
  let images = [];
  if (index > -1) {
    const row = contentByLang[langId].rows[index];
    images = row.items.reduce((curr, prev) => {
      if (curr.length) {
        return [...prev.images, ...curr]
      }
      return prev.images
    }, [])
  }
  return allImages.filter(image => {
    const imageID = image || image._id;
    return !images.includes(imageID)
  })
}

const removeRowSuccess = (state, { langId, rowId }) => {
  const allImages = updateImages(state.item.allImages, state.rowItemsByID, state.contentByLang, langId, rowId)
  return {
    ...state,
    item: {
      ...state.item,
      allImages
    },
    contentByLang: removeRow({ ...state.contentByLang }, langId, rowId)
  }
};

const removeRowItem = (state, { itemId }) => {
  const rowItemsByID = { ...state.rowItemsByID };
  const allImages = state.item.allImages.filter(image => {
    const imageID = image || image._id;
    return !rowItemsByID[itemId].images.includes(imageID)
  })

  rowItemsByID[itemId].images = []
  rowItemsByID[itemId].type = '';
  rowItemsByID[itemId].content = '';
  rowItemsByID[itemId].filters = '';
  rowItemsByID[itemId].filtersObj = {};
  return {
    ...state,
    item: {
      ...state.item,
      allImages
    },
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
    let allImages = [...state.item.allImages];
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
    if (action.filterType === '@gallery') {
      const id = currRowItem.id || currRowItem._id;
      rowItemsByID[id].type = action.filterType;
      rowItemsByID[id].images = [...rowItemsByID[id].images, ...action.itemsContent]
      allImages = [...allImages, ...action.itemsContent]
    }
    return {
      ...state,
      rowItemsByID,
      item: {
        ...state.item,
        allImages
      },
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
  currRowItem: null,
  mediaPopupIsOpen: false,
  allImages: []
};

const pageReducer = createReducer(defaultState, {
  [PAGE_DID_MOUNT]: setUpState,
  [PAGE_UNMOUNT]: () => ({ ...defaultState }),
  [PAGE_ADD_ROW]: addRowSuccess,
  [PAGE_ADD_CUSTOM_ROW]: addCustomRowSuccess,
  [PAGE_REMOVE_ROW]: removeRowSuccess,
  [PAGE_EDIT_ROW_ITEM]: editRowItem,
  [PAGE_SAVE_ROW_ITEM]: reducerHelper.saveRow,
  [PAGE_REMOVE_ROW_ITEM]: removeRowItem,
  [PAGE_INPUT_CHANGE]: inputChange,
  [PAGE_OPEN_HTML_EDITOR]: openEditor,
  [PAGE_TOGGLE_MEDIA_POPUP]: (state, { currRowId }) => {
    return {
      ...state,
      mediaPopupIsOpen: true,
      currRowItem: state.rowItemsByID[currRowId]
    }
  },
  [PAGE_CLOSE_MEDIA_POPUP]: state => {
    return {
      ...state,
      mediaPopupIsOpen: false,
      currRowItem: null
    }
  },
  [PAGE_DELETE_MEDIA_FILE]: (state, { payload: { imageIdToRemove, rowId }}) => {
    const rowItemsByID = {...state.rowItemsByID};
    let allImages = [...state.item.allImages];
    rowItemsByID[rowId].images = rowItemsByID[rowId].images.filter(img => img !== imageIdToRemove)
    allImages = allImages.filter(img => {
      const imageID = img._id || img;
      return imageID !== imageIdToRemove
    });
    return {
      ...state,
      rowItemsByID,
      item: {
        ...state.item,
        allImages
      },
      htmlEditorOpen: false,
      addToursPopupOpen: false,
      currRowItem: null
    };
  },
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