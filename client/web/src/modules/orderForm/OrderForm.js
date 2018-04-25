import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import { compose, withStateHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import Button from '../ui-elements/FormButton';
import { theme } from '../../services/constans';
import { sendEmail } from './orderReducer';


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
	}
});

class OrderForm extends Component {
  render() {
    const {handleSubmit, isEmailSent} = this.props;
    return (
			<div className={css(styles.wrapper)}>
        {!isEmailSent ?
          <div>
            <h4 className={css(styles.title)}>{window.TA.content.orderTour}</h4>
            <form onSubmit={handleSubmit}>
              <Field name='name' placeholder={window.TA.content.name} className={ css(styles.fieldInput)}  component='input' type='text' required />
              <Field name='phone' placeholder={window.TA.content.phone} className={ css(styles.fieldInput)}  component='input' type='tel' />
              <Field name='email' placeholder={window.TA.content.email} className={ css(styles.fieldInput)}  component='input' type='email' required />
              <Field name='message' placeholder={window.TA.content.message} className={ css(styles.fieldInput, styles.fieldTextArea)}  component='textarea' type='text' />
              <Button type='submit'>{window.TA.content.order}</Button>
            </form>
          </div>
          :
          <div>{window.TA.content.emailSentMessage}</div>
        }
			</div>
    )
  }
}

const mapStateToProps = (state) => ({
});

OrderForm = compose(
  connect(
    mapStateToProps,
    { sendEmail, reset }
  ),
  withStateHandlers(
    ({ isEmailSent }) => ({ isEmailSent : false }),
    {
      onSubmit: ({}, {reset, sendEmail, tour}) => (options) => {
        sendEmail({
          ...options,
          tour: {
            title: tour.content.title,
            url: `${window.location.origin}/tours/${tour.url}`
          }
        });
        reset('Order');
        return {
          isEmailSent: true
        };
      },
    }
  ),
  reduxForm({
    form: 'Order'
  })
)(OrderForm);

export default OrderForm
