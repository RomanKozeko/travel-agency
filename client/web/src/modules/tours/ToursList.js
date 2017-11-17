import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import Button from '../ui-elements/Button';

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		flexWrap: 'wrap',
		marginLeft: '-30px'
	},
	tourWrapper: {
		backgroundColor: '#f8f8f8',
		marginBottom: '20px',
		width: '100%',
		paddingBottom: '70px',
		position: 'relative',
		marginLeft: '30px',
		'@media (min-width: 600px)': {
			width: 'calc(100% / 2 - 30px)',
		},
		'@media (min-width: 1000px)': {
			width: 'calc(100% / 3 - 30px)',
		}
	},
	preview: {
		display: 'block',
		paddingBottom: '80%',
		width: '100%',
		backgroundSize: 'cover'
	},
	info: {
		padding: '15px 26px 20px',
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
		padding: '0 20px',
		left: '0',
		width:'100%'
	},
	price: {
		fontWeight: 'bold',
		fontSize: '22px',
		letterSpacing: '2px',
		color: '#222222',
	}
});

const ToursList = ({tours}) => {
	return (
		<div className={css(styles.wrapper)}>
			{tours.map((tour, i) => (
					<div key={tour._id} className={css(styles.tourWrapper)}>
						<div className={css(styles.preview)}	style={{ backgroundImage: `url(${tour.preview[0] && tour.preview[0].path}`}}/>
						<div className={css(styles.info)}>
							<div className={css(styles.body)}>
								<span className={css(styles.period)}>
									July <b>{Math.floor(Math.random() * 31) + 1}th</b> to August
									<b> {Math.floor(Math.random() * 31) + 1}th</b>
								</span>
								<h2 className={css(styles.title)}>{tour.content.title}</h2>
								<div className={css(styles.description)}>{tour.content.description}</div>
							</div>
							<div className={css(styles.footer)}>
								<Button>Book now</Button>
								<span className={css(styles.price)}>{Math.floor(Math.random() * 500) + 500}$</span>
							</div>
						</div>
					</div>
			))
			}
		</div>
	);
};

export default ToursList;