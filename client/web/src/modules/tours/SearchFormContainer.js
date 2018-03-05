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
		flexDirection: 'column',
		paddingBottom: '40px',
		'@media (min-width: 1000px)': {
			flexDirection: 'row',
		},
	},
	sideBarWrapper: {
		marginBottom: '40px',
		'@media (min-width: 1000px)': {
			flex: '0 0 270px',
			maxWidth: '270px',
		},
	},
	searchContent: {
		flexGrow: '1',
		'@media (min-width: 1000px)': {
			marginLeft: '30px',
		},
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
