import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {StyleSheet, css} from 'aphrodite/no-important';
import RenderTextField from '../ui-elements/form/RenderTextField';
import { getPage } from '../../rootReducer';

const styles = StyleSheet.create({
  field: {
    marginBottom: '10px;'
  },
  button: {
  }
});

let PageForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="title" component={RenderTextField} label="Заголовок страницы" />
      <Field name="description" component={RenderTextField} label="Мета описание" type="text" />
      <Field name="preview" component={RenderTextField} label="Превъю" />
    </form>
  );
};

PageForm = reduxForm({
  form: 'pageForm'
})(PageForm);

PageForm = connect((state, ownProps) => {
  const page = getPage(state, ownProps.id);
  return {
    initialValues: {
      preview: page.preview,
      title: page.content[0].title,
      description: page.content[0].description
    }
  };
})(PageForm);

export default PageForm;