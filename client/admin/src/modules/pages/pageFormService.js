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

export function addRow(contentByLang, columns, langId) {
  const rowItems = [];
  for (let i = 0; i < columns; i++) {
    const rowItem = new RowItem(`col-md-${12 / columns}`);
    rowItems.push(rowItem);
  }
  if (!contentByLang[langId].rows) {
    contentByLang[langId].rows = [];
  }
  contentByLang[langId].rows.push(new Row('', columns, rowItems));

  return contentByLang;
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

export function handleSave(e) {
  e.preventDefault();
  const item = {...this.state.item};
  item.content = Object.values(this.state.contentByLang);
  if (this.isValidInputs(item.content)) {
    this.props.save(item, this.props.isNew);
    this.setState({notValidForm: false});
    if (this.props.isNew) {
      this.props.history.push('/admin/pages', {});
    }
  } else {
    this.setState({notValidForm: true})
  }
}

