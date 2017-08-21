import React from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import {css, StyleSheet} from 'aphrodite/no-important';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';

import RenderTextField from '../ui-elements/form/RenderTextField';
import ImagePreview from '../ui-elements/ImagePreview';
import {getPage, getContentByLang} from '../../rootReducer';
import PageCaption from '../ui-elements/PageCaption';
import GridIcons from '../ui-elements/gridIcons/GridIcons';
import MyEditor from './MyEditor';
import GridSelector from './GridSelector';
import Rows from './Rows';

const uniqueId = require('lodash.uniqueid');

const styles = StyleSheet.create({
  field: {
    marginBottom: '10px;'
  }
});

class Row {
  constructor(title, size, type = '', content = '', pageLink = '') {
    this.id = uniqueId();
    this.title = title;
    this.size = size;
    this.type = type;
    this.content = content;
    this.content = pageLink;
    this.items = [];
    this.images = [];
  }
}

class PageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowsByLang: { ...this.props.rowsByLang },
      allRowsById: { ...this.props.allRowsById }
    };
  }

  getRowsByLang(langId) {
    return this.state.rowsByLang[langId].map(id => this.state.allRowsById[id]);
  }

  addRow(columns, langId) {
    const rowsByLang = { ...this.state.rowsByLang };
    const allRowsById = { ...this.state.allRowsById };
    const row = new Row('', `col-md-${12 / columns}`);

    allRowsById[row._id || row.id] = row;
    rowsByLang[langId].push(row._id || row.id);
    this.setState({ rowsByLang, allRowsById });
  }

  removeRow(langId, rowId) {
    const rowsByLang = { ...this.state.rowsByLang };
    const index = rowsByLang[langId].indexOf(rowId);

    if (index > -1) {
      rowsByLang[langId].splice(index, 1);
    }
    this.setState({ rowsByLang });
  }

  savePage(e, pageId) {
    e.preventDefault();
    this.props.handleSubmit(this.state, pageId);
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

              <PageCaption text={'Добавить ряд'}/>
              <GridSelector
                clickHandler={this.addRow.bind(this)}
                count={4}
                lang={lang._id}
              />

              <PageCaption text={'Схема страницы'}/>
              <Rows
                rows={this.getRowsByLang(lang._id)}
                langId={lang._id}
                removeRow={this.removeRow.bind(this)}
              />
            </div>
            }
          </div>
          )
        )}

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
};

PageForm = reduxForm({
  form: 'pageForm'
})(PageForm);

PageForm = connect((state, ownProps) => {
  const { page, languages } = ownProps;
  const allRowsById = { ...state.pages.rows };
  const initialValues = { preview: page.preview };
  const rowsByLang = {};

  const pageCopy = { ...page };

  pageCopy.content.forEach((contentId) => {
    languages.forEach((lang) => {
      const content = getContentByLang(state, contentId, lang);
      if (content) {
        const contentCopy = { ...content };
        rowsByLang[lang._id] = contentCopy.rows ? [...contentCopy.rows] : null;
        delete contentCopy.rows;

        initialValues[lang._id] = contentCopy;
      }
    });
  });

  return {
    initialValues,
    rowsByLang,
    allRowsById,
    isPageSaving: state.pages.isPageSaving,
    page: pageCopy
  };
})(PageForm);

export default PageForm;
