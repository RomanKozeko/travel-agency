import React from 'react';
import { connect } from 'react-redux';
import ToursList from './ToursList';
import Pagination from '../ui-elements/Pagination';
import { loadTours } from './toursActions';
import { getPageWithTours } from '../../rootReducer';

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
			<div>
				<ToursList tours={tours}/>
				<Pagination
					pageNumber={currPage}
					pageCount={pageCount}
					requestPage={loadTours}
					totalPages={count}
				/>
			</div>
		);
	}
}

ToursContainer = connect(
	mapStateToProps,
	{ loadTours }
)(ToursContainer);

export default ToursContainer
