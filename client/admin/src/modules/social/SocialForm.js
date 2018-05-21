import React from 'react'
import {StyleSheet, css} from 'aphrodite/no-important';
import { compose, withHandlers, withState } from 'recompose';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import { Field, FieldArray, reduxForm } from 'redux-form'
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import { saveItem } from './SocialReducer';
import ImageUpload from './ImageUpload';

const styles = StyleSheet.create({
  btn: {
    marginBottom: '20px'
  },
  field: {
    display: 'flex',
    alignItems: 'center'
  }
})


const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <TextField
    {...input} type={type}
    label={label}
    className={css(styles.btn)}
    margin="normal"
  />
)

const renderMembers = ({ fields, meta: { error, submitFailed } }) => (
  <div>
    <div>
      <Button
        type="button"
        color="primary"
        className={css(styles.btn)}
        onClick={() => fields.push({})}
      >
        Добавить социальную сеть
      </Button>
      {submitFailed && error && <span>{error}</span>}
    </div>
    {fields.map((member, index) => (
      <div key={index} className={css(styles.field)} >
        <Field
          name={`${member}.image`}
          type="text"
          component={ImageUpload}
          label="Картинка"
        />
        <Field
          name={`${member}.link`}
          type="text"
          component={renderField}
          label="Ссылка на соц. сеть"
        />
        <Icon onClick={() => fields.remove(index)}>delete</Icon>
      </div>
    ))}
  </div>
)

const SocialForm = props => {
  const { handleSubmit, pristine, reset, submitting, saveItem } = props
  return (
    <form onSubmit={ handleSubmit }>
      <FieldArray name="socials" component={renderMembers} />
      <div>
        <Button
          className={ css(styles.btn)}
          type="submit"
          color="primary"
          variant="raised"
          disabled={submitting}>
          Сохранить
        </Button>
      </div>
    </form>
  )
}

const mapStateToProps = (state, { items }) => {
  return {
    item: items[0],
    initialValues: items[0] || {}
  }
};

export default compose(
  connect(mapStateToProps, { saveItem }),
  withHandlers({
    onSubmit: ({ item, saveItem }) => (values) => {
      saveItem(values, !item)
    }
  }),
  reduxForm({
    form: 'SocialForm'
  }),
)(SocialForm)