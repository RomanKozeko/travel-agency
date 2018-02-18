import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { compose, lifecycle } from 'recompose'
import SearchSideBar from '../ui-elements/SearchSideBar'
import TourItemHorizontal from './TourItemHorizontal'
import { fetchFilteredTours } from './toursActions';
import { connect } from 'react-redux';
import { getToursByQuery } from '../../rootReducer';

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		paddingBottom: '40px'
	},
	sideBarWrapper: {
		flex: '0 1 270px',
		maxWidth: '270px'
	},
	searchContent: {
		marginLeft: '30px',
		flexGrow: '1'
	}
});

let SearchFormContainer = ({ tours }) =>
	<div className={css(styles.wrapper)}>
		<aside className={css(styles.sideBarWrapper)}>
			<SearchSideBar />
		</aside>
		<div className={css(styles.searchContent)}>
			{tours.isFetching
				?
				<div>Загрузка...</div>
				:
				<div>
					{
						tours.isFetched && !tours.length
						?
						<div>Туров не найдено</div>
						:
						tours.map(tour =>
							<TourItemHorizontal tour={tour} key={tour._id} />
						)
					}
				</div>
			}
		</div>
	</div>

const mapStateToProps = (state) => {
	return {
		tours: getToursByQuery(state),
		currPage: state.tours.currPage,
		pageCount: state.tours.pageCount,
		count: state.tours.count,
		isFetching: state.tours.isFetching,
		isFetched: state.tours.isFetched
	}
};

SearchFormContainer = compose(
	connect(
		mapStateToProps,
		{ fetchFilteredTours }
	),
	lifecycle({
		componentDidMount() {
			if (!this.props.isFetched) {
				this.props.fetchFilteredTours();
			}
		}
	})
)(SearchFormContainer);

export default SearchFormContainer;
