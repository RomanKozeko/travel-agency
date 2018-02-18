import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import CheckBox from '../ui-elements/checkbox/CheckBox'
import TextFieldSmall from '../ui-elements/TextFieldSmall'

const styles = StyleSheet.create({
	wrapper: {
		background: '#fff',
		borderRadius: '3px',
		padding: '20px',
	},
	block: {
		padding: '20px 0',
		borderBottom: '1px solid #eaeaea'
	},
	blockTitle: {
		fontSize: '22px',
		fontWeight: 'bold',
		textTransform: 'uppercase',
		margin: '0 0 15px'
	}
});

const SearchSideBar = () =>
	<div className={css(styles.wrapper)}>
		<div className={css(styles.block)}>
			<h3 className={css(styles.blockTitle)}>По названию</h3>
			<TextFieldSmall placeholder='Название тура' />
		</div>
		<div className={css(styles.block)}>
			<h3 className={css(styles.blockTitle)}>Регионы</h3>
			<CheckBox label="Беларусь" name="belarus" block={ true } />
			<CheckBox label="Минск" name="Минск" block={ true } />
			<CheckBox label="Брест" name="Брест" block={ true } />
			<CheckBox label="Витебск" name="Витебск" block={ true } />
		</div>
		<div className={css(styles.block)}>
			<h3 className={css(styles.blockTitle)}>Количество дней</h3>
			<CheckBox label="1" name="1" />
			<CheckBox label="2" name="2" />
			<CheckBox label="3" name="3" />
			<CheckBox label="4" name="4" />
			<CheckBox label="5" name="5" />
			<CheckBox label="6" name="6" />
		</div>
		<div className={css(styles.block)}>
			<h3 className={css(styles.blockTitle)}>Тип тура</h3>
			<CheckBox label="Новогодний" name="Новогодний" block={ true } />
			<CheckBox label="Пляжный" name="Пляжный" block={ true } />
			<CheckBox label="Автобусный" name="Автобусный" block={ true } />
			<CheckBox label="Самолетный" name="Самолетный" block={ true } />
		</div>
	</div>

export default SearchSideBar;
