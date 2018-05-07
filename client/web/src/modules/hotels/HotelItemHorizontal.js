import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import HotelBody from './HotelBody';

const styles = StyleSheet.create({
	wrapper: {
		minHeight: '210px',
		backgroundColor: '#ffffff',
		position: 'relative',
		borderRadius: '5px',
		transition: 'all .3s ease-in',
		marginBottom: '20px',
		':hover': {
			boxShadow: '0 15px 35px rgba(0,0,0,0.15)'
		},
		overflow: 'hidden',
		'@media (min-width: 750px)': {
			display: 'flex',
			flexGrow: '1',
			paddingLeft: '220px',
		},
	},
	img: {
		display: 'flex',
		justifyContent: 'center',
		verticalAlign: 'center',
		width: '100%',
		paddingTop: '70%',
		backgroundColor: '#333',
		backgroundSize: 'cover',
		'@media (min-width: 750px)': {
			width: '210px',
			height: '100%',
			position: 'absolute',
			left: '0',
			top: '0',
			paddingTop: '0',
		},
	}
});

const HotelItemHorizontal = ({ hotel }) => {
	return <div className={css(styles.wrapper)}>
		<div className={css(styles.img)}
				 style={{ backgroundImage: `url(${hotel.preview[0] && hotel.preview[0].path ? hotel.preview[0].path : '/web/build/v.jpg'}`}}
		>
		</div>
    <HotelBody hotel={ hotel } />
	</div>
};

export default HotelItemHorizontal;
