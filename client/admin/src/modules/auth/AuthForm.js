import React from 'react'
import { Field, reduxForm } from 'redux-form'

let AuthForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;

  const submitForm = (data) => {
    handleSubmit(data);
    reset();
  };

  return (
    <form onSubmit={ submitForm }>
      <div>
        <label htmlFor="login">Username</label>
        <Field name="login" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Field name="password" component="input" type="password" />
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
      </div>
    </form>
  )
};

AuthForm = reduxForm({
  form: 'auth'
})(AuthForm);

export default AuthForm;