import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { compose } from 'recompose';
import Button from '../ui-elements/FormButton';
import { Field, reduxForm } from 'redux-form';
import withEmailSending from '../ui-elements/HOC/withEmailSending';
import { theme } from '../../services/constans';


const styles = StyleSheet.create({
	wrapper: {
		background: '#fff',
		padding: '20px',
		boxShadow: theme.boxShadow,
		borderRadius: '5px'
	},
	title: {
		margin: '0 0 20px'
	},
	fieldInput: {
		width: '100%',
		display: 'inline-block',
		height: '50px',
		border: '1px solid #bebebe',
		marginBottom: '20px;',
		borderRadius: '5px',
		padding: '5px 20px',
		boxSizing: 'border-box',
		transition: 'border .3s ease',
		outline: 'none',
		':focus': {
			border: `1px solid ${theme.colors.primaryAccent}`,
		}
	},
	fieldTextArea: {
		height: '145px'
	},
	message: {
		fontSize: '20px',
		textAlign: 'center',
		padding: '20px',
		color: theme.colors.primaryAccent,
		border: `1px solid ${theme.colors.primaryAccent}`,
		borderRadius: '5px'
	}
});

let ContactForm = ({ handleSubmit, isEmailSent }) => (
  <div>
	  {!isEmailSent ?
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <Field name='name' placeholder={window.TA.content.name} className={ css(styles.fieldInput)}  component='input' type='text' required />
          </div>
          <div className="col-md-6">
            <Field name='email' placeholder={window.TA.content.email} className={ css(styles.fieldInput)}  component='input' type='email' required />
          </div>
        </div>
        <Field name='message' placeholder={window.TA.content.message} className={ css(styles.fieldInput, styles.fieldTextArea)}  component='textarea' type='text' />
        <Button type='submit'>{window.TA.content.submit}</Button>
      </form>
		  :
      <div className={ css(styles.message)}>{window.TA.content.emailSentContactsMessage}</div>
	  }
  </div>

);

ContactForm = compose(
	reduxForm({
		form: 'Contacts'
	})
)(ContactForm);

export default withEmailSending(ContactForm, 'Контактная форма')