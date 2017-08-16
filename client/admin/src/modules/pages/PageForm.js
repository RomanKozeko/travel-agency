import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {css, StyleSheet} from 'aphrodite/no-important';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import { CircularProgress } from 'material-ui/Progress';

import RenderTextField from '../ui-elements/form/RenderTextField';
import ImagePreview from '../ui-elements/ImagePreview';
import {getPage, getContentByLang} from '../../rootReducer';
import PageCaption from '../ui-elements/PageCaption';
import GridIcons from '../ui-elements/gridIcons/GridIcons';
import MyEditor from './MyEditor';
import GridSelector from './GridSelector';

import AddPageItemMenu from './AddPageItemMenu';

const styles = StyleSheet.create({
  field: {
    marginBottom: '10px;'
  },

  button: {
  }
});

const renderRows = (size) => {
  const splited = size.split('-');
  const count = 12 / +splited[splited.length - 1];
  const rows = [];
  for (let i = 0; i < count; i++) {
    rows.push(
      <div key={i} className={css(styles.rowInner)}>
        <AddPageItemMenu />
      </div>);
  }

  return rows;
};

class Row {
  constructor(title, size, type, content, pageLink) {
    this.title = title;
    this.size = size;
    this.type = type;
    this.content = content;
    this.content = pageLink;
  }
}

let PageForm = props => {
  const { handleSubmit, page, languages, addRow, selectedTabIndex } = props;
  return (
    <form onSubmit={handleSubmit}>
      {languages.map((lang, i) => (
        <div key={lang._id}>
          {selectedTabIndex === i &&
            <div>
              <div className="row">
                <div className="col-sm-3">
                  <ImagePreview url={page.preview} />
                </div>
                <div className="col-sm-5">
                  <Field name={`${lang.prefix}.title`} component={RenderTextField} label="Заголовок страницы" />
                  <Field
                    name={`${lang.prefix}.description`}
                    component={RenderTextField}
                    label="Мета описание"
                    type="text"
                  />
                </div>
              </div>

              <PageCaption text={'Добавить ряд'} />
              <GridSelector
                clickHandler={addRow}
                count={4}
              />

              <PageCaption text={'Схема страницы'}/>

              <div>
                {/*{page.content[0].rows.map((row, i) => (*/}
                {/*<div key={i} className={css(styles.row)}>*/}
                {/*<IconButton className={css(styles.dragButton)}>*/}
                {/*<Icon>drag_handle</Icon>*/}
                {/*</IconButton>*/}
                {/*<IconButton className={css(styles.closeButton)}>*/}
                {/*<Icon>close</Icon>*/}
                {/*</IconButton>*/}
                {/*{renderRows(row.size)}*/}
                {/*</div>*/}
                {/*))}*/}
              </div>
            </div>
          }


        </div>
        )
      )}

      <Button
        raised
        color="primary"
        className={css(styles.button)}
        onClick={() => this.props.savePage(this.state)}
      >
        Сохранить
      </Button>

    </form>
  );
};

PageForm = reduxForm({
  form: 'pageForm'
})(PageForm);

PageForm = connect((state, ownProps) => {
  const { page, languages } = ownProps;
  const initialValues = { preview: page.preview };

  page.content.forEach((contentId) => {
    languages.forEach((lang) => {
      const content = getContentByLang(state, contentId, lang);
      if (content) {
        initialValues[lang.prefix] = content;
      }
    });
  });

  return {
    initialValues,
    page: ownProps.page
  };
})(PageForm);

export default PageForm;