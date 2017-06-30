import React from 'react'
import { Field, reduxForm } from 'redux-form'

let NewTourForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;

  const submitForm = (data) => {
    handleSubmit(data);
    reset();
  };

  return (
    <form onSubmit={ submitForm }>
      <div>
        <label htmlFor="firstName">Tour title</label>
        <Field name="title" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="email" />
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
};

NewTourForm = reduxForm({
  // a unique name for the form
  form: 'newTour'
})(NewTourForm);

export default NewTourForm;