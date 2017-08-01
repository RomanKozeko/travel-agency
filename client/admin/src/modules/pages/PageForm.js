import React from 'react'
import { Field, reduxForm } from 'redux-form'
import RenderTextField from '../ui-elements/form/RenderTextField';

import {StyleSheet, css} from 'aphrodite/no-important';

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
      <div className="row">
        <div className="col-md-6">
          <Field name="title" component={RenderTextField} label="Заголовок страницы"/>
          <Field name="url" component={RenderTextField} label="Адрес URL"/>
          <Field name="description" component={RenderTextField} label="Мета описание" type="text"/>

        </div>
      </div>
    </form>
  )
};

PageForm = reduxForm({
  form: 'pageForm'
})(PageForm)

export default PageForm;