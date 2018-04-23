import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import TextField from '../ui-elements/TextField';
import TextArea from '../ui-elements/TextArea';
import Button from '../ui-elements/FormButton';
import { theme } from "../../services/constans";

const styles = StyleSheet.create({
	wrapper: {
		background: '#fff',
		padding: '20px',
		boxShadow: theme.boxShadow,
		borderRadius: '5px'
	},
	title: {
		margin: '0 0 20px'
	}
});

const OrderForm = () =>
	<div className={css(styles.wrapper)}>
		<h4 className={css(styles.title)}>{ window.TA.content.orderTour }</h4>
		<form action="">
			<TextField placeholder={ window.TA.content.name } />
			<TextField placeholder={ window.TA.content.phone } />
			<TextField placeholder={ window.TA.content.email } />
			<TextArea placeholder={ window.TA.content.message } />
			<Button>{ window.TA.content.order }</Button>
		</form>
	</div>

export default OrderForm