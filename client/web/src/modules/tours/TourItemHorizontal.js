import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import TourBody from './TourBody';

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: '#ffffff',
		position: 'relative',
		borderRadius: '5px',
		transition: 'all .3s ease-in',
		marginBottom: '20px',
		minHeight: '260px',
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

const TourItemHorizontal = ({ tour }) => {
	return <div className={css(styles.wrapper)}>
		<div className={css(styles.img)}
				 style={{ backgroundImage: `url(${tour.preview[0] && tour.preview[0].path ? tour.preview[0].path : '/web/build/v.jpg'}`}}
		>
		</div>
    <TourBody tour={ tour } />
	</div>
}

export default TourItemHorizontal

