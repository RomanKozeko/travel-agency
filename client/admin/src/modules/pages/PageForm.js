import React from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import {css, StyleSheet} from 'aphrodite/no-important';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { withRouter, Link } from 'react-router-dom';
import RenderTextField from '../ui-elements/form/RenderTextField';
import ImagePreview from '../ui-elements/ImagePreview';
import { getContentByLang } from '../../rootReducer';
import PageCaption from '../ui-elements/PageCaption';
import GridIcons from '../ui-elements/gridIcons/GridIcons';
import GridSelector from './GridSelector';
import Rows from './Rows';
import HtmlEditorPopup from './HtmlEditorPopup';

const uniqueId = require('lodash.uniqueid');

const styles = StyleSheet.create({
  field: {
    marginBottom: '10px;'
  }
});

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

class PageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlEditorOpen: false,
      rowsByLang: { ...this.props.rowsByLang },
      rowsItems: { ...this.props.rowsItems },
      allRowsById: { ...this.props.allRowsById },
      currRowItem: null
    };
    this.saveRow = this.saveRow.bind(this);
    this.closeHtmlEditor = this.closeHtmlEditor.bind(this);
    this.addRow = this.addRow.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.openHtmlEditor = this.openHtmlEditor.bind(this);
    this.removeRowItem = this.removeRowItem.bind(this);
    this.editRowItem = this.editRowItem.bind(this);
  }

  getRowsByLang(langId) {
    return this.state.rowsByLang[langId].map(id => this.state.allRowsById[id]);
  }

  addRow(columns, langId) {
    const rowsByLang = { ...this.state.rowsByLang };
    const allRowsById = { ...this.state.allRowsById };
    const rowsItems = { ...this.state.rowsItems };

    let rowItemsIds = [];
    for (let i = 0; i < columns; i++) {
      const rowItem = new RowItem(`col-md-${12 / columns}`);
      rowItemsIds.push(rowItem.id);
      rowsItems[rowItem.id] = rowItem;
    }
    const row = new Row('', columns, rowItemsIds);

    allRowsById[row._id || row.id] = row;
    rowsByLang[langId].push(row._id || row.id);
    this.setState({ rowsByLang, allRowsById, rowsItems });
  }

  removeRow(langId, rowId) {
    const rowsByLang = { ...this.state.rowsByLang };
    const index = rowsByLang[langId].indexOf(rowId);

    if (index > -1) {
      rowsByLang[langId].splice(index, 1);
    }
    this.setState({ rowsByLang });
  }

  removeRowItem(itemId) {
    const rowsItems = { ...this.state.rowsItems };
    rowsItems[itemId].content = '';
    this.setState({ rowsItems });
  }

  editRowItem(itemId) {
    const rowsItems = { ...this.state.rowsItems };
    this.setState({
      htmlEditorOpen: true,
      currentRowItem: rowsItems[itemId]
    });
  }

  savePage(e, pageId) {
    e.preventDefault();
    if (this.props.isNewPage) {
      this.props.history.push('/admin/pages', {});
    }
    this.props.handleSubmit(this.state, pageId, this.props.isNewPage);
  }

  saveRow(content) {
    const rowsItems = { ...this.state.rowsItems };
    rowsItems[this.state.currentRowItem._id || this.state.currentRowItem.id].content = content;
    this.setState({
      htmlEditorOpen: false,
      currentRow: ''
    });
  }

  openHtmlEditor(rowItem) {
    this.setState({
      htmlEditorOpen: true,
      currentRowItem: rowItem
    });
  }

  closeHtmlEditor() {
    this.setState({ htmlEditorOpen: false, currRowItem: null });
  }

  render() {
    const {
      page,
      languages,
      selectedTabIndex,
      isPageSaving
    } = this.props;
    return (
      <form onSubmit={(e) => this.savePage(e, page._id)}>
        {languages.map((lang, i) => (
          <div key={lang._id}>
            {selectedTabIndex === i &&
            <div>
              <div className="row">
                <div className="col-sm-3">
                  <ImagePreview url={page.preview} />
                </div>
                <div className="col-sm-5">
                  <Field name={`${lang._id}.title`} component={RenderTextField} label="Заголовок страницы"/>
                  <Field
                    name={`${lang._id}.description`}
                    component={RenderTextField}
                    label="Мета описание"
                    type="text"
                  />
                </div>
              </div>

              <PageCaption text={'Добавить ряд'} />
              <GridSelector
                clickHandler={this.addRow}
                count={4}
                lang={lang._id}
              />

              <PageCaption text={'Схема страницы'} />
              <Rows
                rows={this.getRowsByLang(lang._id)}
                langId={lang._id}
                rowsItems={this.state.rowsItems}
                removeRow={this.removeRow}
                removeRowItem={this.removeRowItem}
                editRowItem={this.editRowItem}
                openHtmlEditor={this.openHtmlEditor}
              />
            </div>
            }
          </div>
          )
        )}

        <HtmlEditorPopup
          isOpen={this.state.htmlEditorOpen}
          currentRowItem={this.state.currentRowItem}
          saveRow={this.saveRow}
          handleRequestClose={this.closeHtmlEditor}
        />

        <Button
          raised
          type="submit"
          color="primary"
          disabled={isPageSaving}
          className={css(styles.button)}
        >
          {isPageSaving ? 'Сохраняю...' : 'Сохранить'}
        </Button>

      </form>
    );
  }
}

PageForm.propTypes = {
  page: PropTypes.object,
  languages: PropTypes.array,
  handleSubmit: PropTypes.func,
  selectedTabIndex: PropTypes.number,
  isPageSaving: PropTypes.bool,
};

PageForm = reduxForm({
  form: 'pageForm'
})(PageForm);

PageForm = withRouter(connect((state, ownProps) => {
  const { page, languages, isNewPage } = ownProps;

  const allRowsById = { ...state.pages.rows };
  const rowsItems = { ...state.pages.rowsItems };
  const initialValues = { preview: page.preview };
  const rowsByLang = {};

  const pageCopy = { ...page };
  pageCopy.content.forEach((contentId) => {
    languages.forEach((lang, i) => {
      let content;
      if (isNewPage) {
        rowsByLang[lang._id] = page.content[i].rows;
      } else {
        content = getContentByLang(state, contentId, lang);
        if (content) {
          const contentCopy = { ...content };
          rowsByLang[lang._id] = contentCopy.rows ? [...contentCopy.rows] : null;
          delete contentCopy.rows;

          initialValues[lang._id] = contentCopy;
        }
      }
    });
  });

  return {
    initialValues,
    rowsByLang,
    rowsItems,
    allRowsById,
    isNewPage,
    history: ownProps.history,
    isPageSaving: state.pages.isPageSaving,
    page: pageCopy
  };
})(PageForm));

export default PageForm;
