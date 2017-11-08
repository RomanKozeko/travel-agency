const uniqueId = require('lodash.uniqueid');

class RowItem {
  constructor(size, type = '') {
    this.id = uniqueId();
    this.size = size;
    this.type = type;
  }
}

class Row {
  constructor(title, columns, rowsItems, content = '', pageLink = '') {
    this.id = uniqueId();
    this.title = title;
    this.content = content;
    this.content = pageLink;
    this.items = rowsItems;
    this.images = [];
  }
}

export function normolizeRowItems(content) {
  const rowItemsByID = {};

  content.forEach((contentItem) => {
    contentItem.rows.forEach((row) => {
      row.items.forEach((rowItem) => {
        const newRowItem = { ...rowItem };
        const filtersObj = {};
        if (rowItem.filters) {
          const filters = rowItem.filters.split('&');
          filters.forEach(filter => {
            const filterSplit = filter.split('=');
            filtersObj[filterSplit[0]] = filterSplit[1].split(',');
          })
        }
        newRowItem.filtersObj = filtersObj;
        rowItemsByID[rowItem._id || rowItem.id] = newRowItem;
      });
    });
  });

  return rowItemsByID;
}

export function denormalizeRowsItems(content, rowItemsByID) {
  content.forEach(contentItem => {
    contentItem.rows.forEach((row) => {
      row.items.forEach((rowItem, i) => {
        row.items[i] = rowItemsByID[rowItem._id || rowItem.id];
      });
    });
  });

  return content;
}

export function addRow(contentByLang, columns, langId) {
  const rowItems = [];
  for (let i = 0; i < columns; i++) {
    const rowItem = new RowItem(`col-md-${12 / columns}`);
    rowItems.push(rowItem);
  }
  if (!contentByLang[langId].rows) {
    contentByLang[langId].rows = [];
  }
  const row = new Row('', columns, rowItems);
  const rowItemsByID = normolizeRowItems([{ rows: [row] }]);
  contentByLang[langId].rows.push(row);

  return { rowItemsByID, contentByLang };
}

export function removeRow(contentByLang, langId, rowId) {
  const index = contentByLang[langId].rows.findIndex(row => (
    row.id === rowId || row._id === rowId
  ));
  if (index > -1) {
    contentByLang[langId].rows.splice(index, 1);
  }

  return contentByLang;
}

export function setInputsValues(contentByLang, state, action) {
  const item = { ...state.item };
  const { langId, value, name } = action;

  if (langId) {
    contentByLang[langId][name] = value;
  } else {
    item[name] = value;
  }
  return {
    ...state,
    contentByLang,
    item
  };
}

