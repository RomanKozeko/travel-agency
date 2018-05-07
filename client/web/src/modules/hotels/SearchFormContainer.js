import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { compose, lifecycle, withStateHandlers } from 'recompose'
import SearchSideBar from '../ui-elements/SearchSideBar'
import HotelItemHorizontal from './HotelItemHorizontal'
import { loadFilteredHotels, resetActiveFilter } from './hotelsActions';
import { loadRegions } from '../app/entitiesReducer';
import { connect } from 'react-redux';
import { getHotelsByQuery, getRegions } from '../../rootReducer';

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

let SearchFormContainer = ({ hotels, isHotelsFetched, regions, onFieldChange, onInputChange }) => {

	return(
		<div className={css(styles.wrapper)}>
			<aside className={css(styles.sideBarWrapper)}>
				<SearchSideBar
					regions={regions}
					onInputChange={onInputChange}
					onFieldChange={onFieldChange}
				/>
			</aside>
			<div className={css(styles.searchContent)}>
				{hotels.isFetching
					?
					<div>Загрузка...</div>
					:
					<div>
						{
              isHotelsFetched && !hotels.length
								?
								<div>Отели не найдены</div>
								:
	              hotels.map(hotel =>
									<HotelItemHorizontal hotel={hotel} key={hotel._id}/>
								)
						}
					</div>
				}
			</div>
	</div>
	)
};

const mapStateToProps = (state) => {
	return {
		hotels: getHotelsByQuery(state, state.hotels.activeQuery),
		regions: getRegions(state),
		isFetching: state.hotels.isFetching,
		isHotelsFetched: state.hotels.isFetched,
    isRegionsFetched: state.entities.regions.isFetched,
	}
};

SearchFormContainer = compose(
	connect(
		mapStateToProps,
		{ loadFilteredHotels, resetActiveFilter, loadRegions }
	),
  withStateHandlers(
    ({}) => ({ filter: {} }),
    {
      onFieldChange: ({ filter }, { loadFilteredHotels }) => (field, value) => {
      	const newFilter = {...filter};
      	if (!newFilter.hasOwnProperty(field)) {
          newFilter[field] = [value]
				} else {
      		const fieldValue = newFilter[field];
          const index = fieldValue.findIndex(item => item === value);

          index === -1 ?
            fieldValue.push(value)
						:
          	fieldValue.splice(index, 1);

          newFilter[field] = fieldValue;
				}

				loadFilteredHotels(newFilter);
				return {
					filter: newFilter
				}
      },
			onInputChange: ({ filter }, { loadFilteredHotels }) => (field, value) => {
        const newFilter = {...filter};
        newFilter[field] = value;
				loadFilteredHotels(newFilter);
        return {
        	filter: newFilter
				}
      }
    }
  ),
	lifecycle({
		componentDidMount() {
			if (!this.props.isHotelsFetched) {
				this.props.loadFilteredHotels();
			}
      if (!this.props.isRegionsFetched) {
        this.props.loadRegions();
      }
		},
		componentWillUnmount() {
			this.props.resetActiveFilter();
		}
	})
)(SearchFormContainer);

export default SearchFormContainer;
