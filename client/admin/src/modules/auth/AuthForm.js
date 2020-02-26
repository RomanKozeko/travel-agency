import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { StyleSheet, css } from 'aphrodite/no-important';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const styles = StyleSheet.create({
  form: {
    marginTop: '40px',
  },
  fieldsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  field: {
    width: 'calc(100%/2 - 15px)',
  },
  btnWrap: {
    textAlign: 'right',
    marginTop: '25px',
  },
});

let AuthForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;

  const submitForm = data => {
    handleSubmit(data);
    reset();
  };

  const renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <TextField label={label} error={touched && error} {...input} {...custom} />
  );

  return (
    <form className={css(styles.form)} onSubmit={submitForm}>
      <div className={css(styles.fieldsContainer)}>
        <Field
          className={css(styles.field)}
          name="login"
          component={renderTextField}
          label="Username"
          required
        />
        <Field
          className={css(styles.field)}
          name="password"
          component={renderTextField}
          label="password"
          type="password"
          required
        />
      </div>
      <div className={css(styles.btnWrap)}>
        <Button
          variant="raised"
          color="primary"
          type="submit"
          disabled={pristine || submitting}
        >
          sign in
        </Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'AuthForm',
})(AuthForm);
