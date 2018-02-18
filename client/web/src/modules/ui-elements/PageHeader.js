import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
	header: {
		height: '287px',
		marginTop: '-76px',
		paddingTop: '76px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundImage: 'url(/web/build/forest.jpg)',
		backgroundSize: 'cover',
	},
	headerTitle: {
		lineHeight: '27px',
		fontSize: '38px',
		fontWeight: 'bold',
		color: '#fefefe',
		textTransform: 'uppercase'
	},
	colHeader: {
		fontSize: '18px',
		fontWeight: 'bold',
		color: '#222222',
		margin: '0 0 20px'
	}
});

const PageHeader = ({ title }) =>
	<header className={css(styles.header)}>
		<h1 className={css(styles.headerTitle)}>{ title }</h1>
	</header>

export default PageHeader;
