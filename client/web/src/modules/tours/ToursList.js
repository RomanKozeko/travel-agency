import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import TourBody from './TourBody';

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		flexWrap: 'wrap',
		marginLeft: '-30px'
	},
	tourWrapper: {
		backgroundColor: '#fff',
		borderRadius: '5px',
		overflow: 'hidden',
		marginBottom: '20px',
		width: '100%',
		position: 'relative',
		marginLeft: '30px',
    transition: 'all .3s ease-in',
		'@media (min-width: 600px)': {
			width: 'calc(100% / 2 - 30px)',
		},
		'@media (min-width: 1000px)': {
			width: 'calc(100% / 3 - 30px)',
		},
    ':hover': {
      boxShadow: '0 15px 35px rgba(0,0,0,0.15)'
    },
	},
	preview: {
		display: 'block',
		paddingBottom: '80%',
		width: '100%',
		backgroundSize: 'cover'
	},
	info: {
		padding: '0 0 20px',
		color: '#bebebe'
	},
	body: {},
	period: {
		fontSize: '12px',
		lineHeight: '30px',
		textTransform: 'uppercase'
	},
	title: {
		margin: '0px',
		marginBottom: '10px',
		fontSize: '16px',
		color: '#222222',
		lineHeight: '30px',
		letterSpacing: '3px',
		fontWeight: 'bold',
		textTransform: 'uppercase'
	},
	description: {
		fontSize: '14px',
		lineHeight: '24px',
	},
	footer: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'baseLine',
		position: 'absolute',
		bottom: '0',
		padding: '20px',
		left: '0',
		width:'100%'
	},
	price: {
		fontWeight: 'bold',
		fontSize: '16px',
		letterSpacing: '2px',
		color: '#222222',
	},
  listItem: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '5px'
  },
  listItemText: {
    marginLeft: '10px'
  },
});

const ToursList = ({tours, currLanguageId}) => {
	return (
		<div className={css(styles.wrapper)}>
			{tours.map((tour, i) => (
				!tour.disabledForLanguages.includes(currLanguageId) && tour.enabled &&
				<div key={tour._id} className={css(styles.tourWrapper)}>
						<div className={css(styles.preview)} style={{ backgroundImage: `url(${tour.preview[0] && tour.preview[0].path}`}} />
						<TourBody tour={ tour } />
					</div>
			))
			}
		</div>
	);
};

export default ToursList;