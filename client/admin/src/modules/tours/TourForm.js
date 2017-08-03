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

let TourForm = props => {
  const { tour, handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <Field name="title" component={RenderTextField} val={tour.content[0].title} label="Название"/>
          <Field name="description" component={RenderTextField} val={tour.content[0].description} label="Описание"/>
        </div>
      </div>
    </form>
  )
};

TourForm = reduxForm({
  form: 'tourForm'
})(TourForm);

export default TourForm;