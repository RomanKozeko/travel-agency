import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { compose, lifecycle, withStateHandlers } from 'recompose';
import SearchSideBar from '../ui-elements/SearchSideBar';
import TourItemHorizontal from './TourItemHorizontal';
import { loadFilteredTours, resetActiveFilter } from './toursActions';
import { loadRegions, loadCategories } from '../app/entitiesReducer';
import { connect } from 'react-redux';
import { getToursByQuery, getRegions, getCategories } from '../../rootReducer';

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
  },
});

let SearchFormContainer = ({
  tours,
  isToursFetched,
  regions,
  categories,
  onFieldChange,
  onInputChange,
  currLanguageId,
}) => {
  return (
    <div className={css(styles.wrapper)}>
      <aside className={css(styles.sideBarWrapper)}>
        <SearchSideBar
          regions={regions}
          categories={categories}
          days={10}
          onInputChange={onInputChange}
          onFieldChange={onFieldChange}
        />
      </aside>
      <div className={css(styles.searchContent)}>
        {tours.isFetching ? (
          <div>Загрузка...</div>
        ) : (
          <div>
            {isToursFetched && !tours.length ? (
              <div>Туры не найдены</div>
            ) : (
              tours.map(
                tour =>
                  !tour.disabledForLanguages.includes(currLanguageId) &&
                  tour.enabled && (
                    <TourItemHorizontal tour={tour} key={tour._id} />
                  )
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    tours: getToursByQuery(state, state.tours.activeQuery),
    regions: getRegions(state),
    categories: getCategories(state),
    currPage: state.tours.currPage,
    pageCount: state.tours.pageCount,
    count: state.tours.count,
    isFetching: state.tours.isFetching,
    isToursFetched: state.tours.isFetched,
    isRegionsFetched: state.entities.regions.isFetched,
    isCategoriesFetched: state.entities.categories.isFetched,
    currLanguageId: state.app.languages.urlPrefix,
  };
};

SearchFormContainer = compose(
  connect(
    mapStateToProps,
    { loadFilteredTours, resetActiveFilter, loadRegions, loadCategories }
  ),
  withStateHandlers(({ count }) => ({ filter: {} }), {
    onFieldChange: ({ filter }, { loadFilteredTours }) => (field, value) => {
      const newFilter = { ...filter };
      if (!newFilter.hasOwnProperty(field)) {
        newFilter[field] = [value];
      } else {
        const fieldValue = newFilter[field];
        const index = fieldValue.findIndex(item => item === value);

        index === -1 ? fieldValue.push(value) : fieldValue.splice(index, 1);

        newFilter[field] = fieldValue;
      }

      loadFilteredTours(newFilter);
      return {
        filter: newFilter,
      };
    },
    onInputChange: ({ filter }, { loadFilteredTours }) => (field, value) => {
      const newFilter = { ...filter };
      newFilter[field] = value;
      loadFilteredTours(newFilter);
      return {
        filter: newFilter,
      };
    },
  }),
  lifecycle({
    componentDidMount() {
      if (!this.props.isToursFetched) {
        this.props.loadFilteredTours();
      }
      if (!this.props.isRegionsFetched) {
        this.props.loadRegions();
      }
      if (!this.props.isCategoriesFetched) {
        this.props.loadCategories();
      }
    },
    componentWillUnmount() {
      this.props.resetActiveFilter();
    },
  })
)(SearchFormContainer);

export default SearchFormContainer;
