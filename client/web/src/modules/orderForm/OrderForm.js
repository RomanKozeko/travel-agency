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
		<h4 className={css(styles.title)}>Заказать тур</h4>
		<form action="">
			<TextField placeholder='ФИО' />
			<TextField placeholder='Email' />
			<TextField placeholder='Телефон' />
			<TextArea placeholder='Сообщение' />
			<Button>Заказать</Button>
		</form>
	</div>

export default OrderForm