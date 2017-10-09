import React from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import {css, StyleSheet} from 'aphrodite/no-important';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { withRouter, Link } from 'react-router-dom';
import RenderTextField from '../../ui-elements/form/RenderTextField';
import ImagePreview from '../../ui-elements/ImagePreview';
import { getContentByLang } from '../../../rootReducer';
import PageCaption from '../../ui-elements/PageCaption';
import GridIcons from '../../ui-elements/gridIcons/GridIcons';
import GridSelector from './GridSelector';
import Rows from './Rows';
import HtmlEditorPopup from './HtmlEditorPopup';
import withTabs from '../../ui-elements/HOC/withTabs';
import TextField from 'material-ui/TextField';
import pageFormService from '../pageFormService';
import { handleSave, addRow, removeRow } from '../pageFormService';
const uniqueId = require('lodash.uniqueid');

const styles = StyleSheet.create({
  field: {
    marginBottom: '10px;'
  }
});


class PageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlEditorOpen: false,
      currRowItem: null
    };
    this.saveRow = this.saveRow.bind(this);
    this.closeHtmlEditor = this.closeHtmlEditor.bind(this);
    this.openHtmlEditor = this.openHtmlEditor.bind(this);
    this.removeRowItem = this.removeRowItem.bind(this);
    this.editRowItem = this.editRowItem.bind(this);
  }

  componentDidMount() {
    this.props.pageDidMount({
      htmlEditorOpen: false,
      contentByLang: { ...this.props.parentState.contentByLang },
      item: { ...this.props.item },
      currRowItem: null
    });
  }

  componentWillUnmount() {
    this.props.pageUnmount();
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

  isValidInputs() {
    return true
  }

  handleSave = (e) => {
    e.preventDefault();
    const { page } = this.props;
    this.props.save(page.item, this.props.isNew);
    if (this.props.isNew) {
      this.props.history.push('/admin/pages', {});
    }
  };

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
      parentState,
      page,
      languages,
      isSaving,
      pageAddRow,
      pageRemoveRow,
      pageInputChange,
      openHtmlEditor,
      closeHtmlEditor,
      saveRow,
    } = this.props;
    if (!page.item) {
      return null;
    }
    return (
      <form action="" onSubmit={this.handleSave}>
        {languages.map((lang, i) => (
          <div key={lang._id}>
            {parentState.selectedTabIndex === i &&
            <div>
              <div className="row">
                <div className="col-sm-3">
                  <ImagePreview url={page.item.preview} />
                </div>

                <div className="col-sm-6">
                  <TextField
                    id="title"
                    label="title"
                    fullWidth
                    value={page.contentByLang[lang._id].title}
                    onChange={(e) => pageInputChange(lang._id, 'title', e.target.value)}
                    margin="normal"
                    required
                  />
                  <TextField
                    id="url"
                    label="url"
                    fullWidth
                    value={page.item.url}
                    onChange={(e) => pageInputChange(null, 'url', e.target.value)}
                    margin="normal"
                    required
                  />
                  <TextField
                    id="description"
                    label="Meta description"
                    fullWidth
                    value={page.contentByLang[lang._id].description}
                    onChange={(e) => pageInputChange(lang._id, 'description', e.target.value)}
                    margin="normal"
                    required
                  />
                </div>
              </div>

              <PageCaption text={'Добавить ряд'} />
              <GridSelector
                clickHandler={pageAddRow}
                count={4}
                lang={lang._id}
              />

              <PageCaption text={'Схема страницы'} />
              <Rows
                rows={page.contentByLang[lang._id].rows}
                langId={lang._id}
                rowsItems={page.rowItemsByID}
                removeRow={pageRemoveRow}
                removeRowItem={this.removeRowItem}
                editRowItem={this.editRowItem}
                openHtmlEditor={openHtmlEditor}
              />
            </div>
            }
          </div>
        ))}

        <HtmlEditorPopup
          isOpen={page.htmlEditorOpen}
          currentRowItem={this.state.currentRowItem}
          saveRow={saveRow}
          handleRequestClose={closeHtmlEditor}
        />

        <Button
          raised
          type="submit"
          color="primary"
          disabled={isSaving}
        >
          {isSaving ? 'Сохраняю...' : 'Сохранить'}
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

export default withTabs(PageForm, '/admin/pages');

