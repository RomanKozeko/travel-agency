import React from 'react';
import { connect } from 'react-redux';
import ToursList from './ToursList';
import Pagination from '../ui-elements/Pagination';
import { loadTours } from './toursActions';
import { getPageWithTours } from '../../rootReducer';
import { StyleSheet, css } from 'aphrodite/no-important';

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

const mapStateToProps = (state) => {
	return {
		tours: getPageWithTours(state, state.tours.currPage),
		currPage: state.tours.currPage,
		pageCount: state.tours.pageCount,
		count: state.tours.count,
		isFetching: state.tours.isFetching
	}
};

class ToursContainer extends React.Component {
	submit(values) {
		// print the form values to the console
		console.log(values);

	}

	componentDidMount() {
		this.props.loadTours();
	}

	render() {
		const {
			tours,
			isFetching,
			currPage,
			count,
			loadTours,
			pageCount
		} = this.props;

		return (
			<div className="ToursContainer">
				<header className={css(styles.header)}>
					<h1 className={css(styles.headerTitle)}>Popular tours</h1>
				</header>
				<div className="container">
					<div className={css(styles.pageContent)}>
						<ToursList tours={tours}/>
						<Pagination
							pageNumber={currPage}
							pageCount={pageCount}
							requestPage={loadTours}
							totalPages={count}
						/>
					</div>
				</div>
			</div>
		);
	}
}

ToursContainer = connect(
	mapStateToProps,
	{ loadTours }
)(ToursContainer);

export default ToursContainer
