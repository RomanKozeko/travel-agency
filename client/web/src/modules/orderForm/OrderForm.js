import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
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
    const {handleSubmit} = this.props;
    return (
			<div className={css(styles.wrapper)}>
				<h4 className={css(styles.title)}>{window.TA.content.orderTour}</h4>
				<form onSubmit={handleSubmit}>
					<Field name='name' placeholder={window.TA.content.name} className={ css(styles.fieldInput)}  component='input' type='text' />
					<Field name='phone' placeholder={window.TA.content.phone} className={ css(styles.fieldInput)}  component='input' type='text' />
					<Field name='email' placeholder={window.TA.content.email} className={ css(styles.fieldInput)}  component='input' type='text' />
					<Field name='message' placeholder={window.TA.content.message} className={ css(styles.fieldInput, styles.fieldTextArea)}  component='textarea' type='text' />
					<Button type='submit'>{window.TA.content.order}</Button>
				</form>
			</div>
    )
  }
}


const mapStateToProps = (state) => ({
});

OrderForm = compose(
  connect(
    mapStateToProps,
    { sendEmail }
  ),
  withHandlers({
    onSubmit: ({sendEmail, tour}) => (options) => {
      sendEmail({ ...options, tour: tour.url})
    },
  }),
  reduxForm({
    form: 'Order'
  })
)(OrderForm);

export default OrderForm
