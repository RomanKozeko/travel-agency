import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import ToursContainer from './ToursContainer'

const styles = StyleSheet.create({
	pageContent: {
		padding: '70px 0 40px'
	},
	header: {
		height: '287px',
		marginTop: '-76px',
		paddingTop: '76px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundImage: 'url(https://wallpapershome.ru/images/wallpapers/borakay-3504x2336-5k-4k-fillipini-luchshie-plyaji-2017-turizm-kurort-2917.jpg)',
		backgroundSize: 'cover',
	},
	headerTitle: {
		lineHeight: '27px',
		fontSize: '38px',
		fontWeight: 'bold',
		color: '#fefefe',
		textTransform: 'uppercase'
	}
});


class ToursPage extends React.Component {

	render() {
		return (
			<div>
				<header className={css(styles.header)}>
					<h1 className={css(styles.headerTitle)}>Popular tours</h1>
				</header>
				<div className={css(styles.pageContent)}>
					<div className="container">
						<ToursContainer />
					</div>
				</div>
			</div>
		);
	}
}

export default ToursPage
