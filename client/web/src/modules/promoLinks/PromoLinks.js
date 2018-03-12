import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import PrefixLink from '../ui-elements/PrefixLink';

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		margin: '0 -15px',
		flexWrap: 'wrap',
		paddingBottom: '40px'
	},
	item: {
		height: '220px',
		margin: '15px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#333',
		backgroundImage: 'url(/web/build/forest2.jpg)',
		backgroundSize: 'cover',
		borderRadius: '5px',
		width: '100%',
		transition: 'box-shadow .3s ease-in',
		boxShadow: '0px 30px 90px rgba(0,0,0,0.14)',
		overflow: 'hidden',
		':hover': {
			textDecoration: 'none'
		},
		'@media (min-width: 500px)': {
			width: 'calc(100% / 2 - 30px)',
		},
		'@media (min-width: 970px)': {
			width: 'calc(100% / 3 - 30px)',
		},
		position: 'relative',
		color: '#fff',
		':before': {
			content: '""',
			top: 0,
			left: 0,
			position: 'absolute',
			width: '100%',
			height: '100%',
			background: 'rgba(0,0,0,.32)'
		},

	},
	title: {
		color: '#fff',
		textTransform: 'uppercase',
		textAlign: 'center',
		position: 'relative',
		paddingBottom: '20px',
		paddingLeft: '10px',
		paddingRight: '10px',
		':after': {
			content: '""',
			width: '100px',
			borderTop: '5px solid #fff',
			position: 'absolute',
			left: '50%',
			transform: 'translateX(-50%)',
			bottom: '0'
		}
	}
});

const PromoLinks = () => (
	<div className={css(styles.wrapper)}>
		<div className={css(styles.item)} style={{ backgroundImage: 'url(/web/build/quests.jpg)'}}>
				<h3 className={css(styles.title)}>Для гостей Беларуси</h3>
		</div>

		<div className={css(styles.item)} style={{ backgroundImage: 'url(/web/build/child.jpg)'}}>
			<h3 className={css(styles.title)}>Для детей и молодежи</h3>
		</div>

		<div className={css(styles.item)} style={{ backgroundImage: 'url(/web/build/holiday.jpg)'}}>
			<h3 className={css(styles.title)}>Праздничный</h3>
		</div>

		<div className={css(styles.item)} style={{ backgroundImage: 'url(/web/build/coop.jpg)'}}>
			<h3 className={css(styles.title)}>Для корпоративных клиентов</h3>
		</div>

		<div className={css(styles.item)} style={{ backgroundImage: 'url(/web/build/custom.jpg)'}}>
			<h3 className={css(styles.title)}>Авторские туры</h3>
		</div>

		<div className={css(styles.item)} style={{ backgroundImage: 'url(/web/build/DSC_0114-Edit.JPG)'}}>
			<h3 className={css(styles.title)}>патриотические туры</h3>
		</div>

	</div>
);

export default PromoLinks