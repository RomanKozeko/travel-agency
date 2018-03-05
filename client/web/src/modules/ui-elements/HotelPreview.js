import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import PrefixLink from './PrefixLink';
import StarsList from './StarsList';

const styles = StyleSheet.create({
	item: {
		width: 'calc(100%)',
		margin: '10px',
		borderRadius: '5px',
		overflow: 'hidden',
		backgroundColor: '#fff',
		transition: 'box-shadow .3s ease-in',
		':hover': {
			boxShadow: '0 15px 35px rgba(0,0,0,0.15)'
		},
		'@media (min-width: 500px)': {
			width: 'calc(100% / 2 - 20px)',
		},
		'@media (min-width: 750px)': {
			width: 'calc(100% / 3 - 20px)',
		},
		'@media (min-width: 970px)': {
			width: 'calc(100% / 4 - 20px)',
		}

	},
	img: {
		paddingTop: '70%',
		backgroundColor: '#333',
		backgroundSize: 'cover',
	},
	title: {
		margin: '10px 0',
		fontSize: '18px'
	},
	content: {
		padding: '10px'
	}
});

const HotelPreview = ({ item, content, url }) =>
	<div className={css(styles.item)}>
		<div className={css(styles.img)} style={{
			backgroundImage: `url(${item.preview[0] && item.preview[0].path ? item.preview[0].path : '/web/build/v.jpg'}`
		}} />
		<div className={css(styles.content)}>
			<h3 className={css(styles.title)}>
				<PrefixLink to={`/${url}/${item.url}`}>{ content.title }</PrefixLink>
			</h3>
			{
				item.stars && <StarsList starsCount={ item.stars } />
			}
		</div>
	</div>

export default HotelPreview