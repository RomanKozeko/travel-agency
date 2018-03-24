import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
	header: {
		height: '287px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: '#333',
		backgroundImage: 'url(/web/build/forest.jpg)',
		backgroundSize: 'cover',
	},
	headerTitle: {
		lineHeight: '35px',
		fontSize: '28px',
		fontWeight: 'bold',
		color: '#fefefe',
		textAlign: 'center',
		textTransform: 'uppercase',
		'@media (min-width: 600px)': {
			lineHeight: '45px',
			fontSize: '38px',
		}
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
		<div className='container'>
			<h1 className={css(styles.headerTitle)}>{ title }</h1>
		</div>
	</header>

export default PageHeader;
