import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import Button from '../ui-elements/FormButton';
import withEmailSending from '../ui-elements/HOC/withEmailSending';
import Modal from '../ui-elements/Modal';
import withSticky from '../ui-elements/HOC/withSticky';
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
		borderRadius: '5px',
    marginBottom: '20px'
	},
  messageWrap: {
    textAlign: 'center',
    marginBottom: '-20px'
  }
});

let OrderForm = ({ handleSubmit, isEmailSent, onModalClose, reset, itemName }) =>
	<div className={css(styles.wrapper)}>
    <div>
      <h4 className={css(styles.title)}>{window.TA.content[`order${itemName.charAt(0).toUpperCase() + itemName.slice(1)}`]}</h4>
      <form onSubmit={handleSubmit}>
        <Field name='name' placeholder={window.TA.content.name} className={ css(styles.fieldInput)}  component='input' type='text' required />
        <Field name='phone' placeholder={window.TA.content.phone} className={ css(styles.fieldInput)}  component='input' type='tel' />
        <Field name='email' placeholder={window.TA.content.email} className={ css(styles.fieldInput)}  component='input' type='email' required />
        <Field name='message' placeholder={window.TA.content.message} className={ css(styles.fieldInput, styles.fieldTextArea)}  component='textarea' type='text' required />
        <Button type='submit'>{window.TA.content.order}</Button>
      </form>
    </div>
    {
      isEmailSent &&
      <Modal>
        <div className={ css(styles.messageWrap)}>
          <div className={ css(styles.message)}>{window.TA.content.emailSentMessage}</div>
          <Button handleClick={ () => { reset(); onModalClose() } }>{ window.TA.content.close }</Button>
        </div>
      </Modal>
    }

	</div>;

OrderForm = compose(
	reduxForm({
		form: 'Order'
	}),
  withSticky
)(OrderForm);

export default withEmailSending(OrderForm)
