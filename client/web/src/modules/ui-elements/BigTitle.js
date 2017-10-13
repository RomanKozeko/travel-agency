import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
	wrapper: {
		textAlign: 'center',
		margin: '120px 0 70px'
	},
	subTitle: {
		display: 'inline-block',
		color: '#1593d0',
		textTransform: 'uppercase',
		lineHeight: '26px',
		fontWeight: 'bold',
		fontSize: '16px',
		position: 'relative',
		borderBottom: '5px solid #1593d0',
		marginBottom: '20px',
		paddingBottom: '10px'
	},
	title: {
		color: '#222',
		margin: '0',
		fontWeight: 'bold',
		textTransform: 'uppercase',
		lineHeight: '42px',
		fontSize: '32px',
		letterSpacing: '6.4px',
	}
});

const BigTitle = ({title, subTitle}) => (
	<header className={css(styles.wrapper)}>
		<div className={css(styles.subTitle)}>{subTitle}</div>
		<h2 className={css(styles.title)}>
			{title}
		</h2>
	</header>
);

export default BigTitle