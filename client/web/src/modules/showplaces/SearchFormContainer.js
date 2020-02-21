import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { compose, lifecycle, withStateHandlers } from 'recompose';
import SearchSideBar from '../ui-elements/SearchSideBar';
import ShowplaceItemHorizontal from './ShowplaceItemHorizontal';
import { loadFilteredShowplaces, resetActiveFilter } from './showplacesActions';
import { loadRegions } from '../app/entitiesReducer';
import { connect } from 'react-redux';
import { getShowplacesByQuery, getRegions } from '../../rootReducer';

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
  showplaces,
  isShowplacesFetched,
  regions,
  onFieldChange,
  onInputChange,
}) => {
  return (
    <div className={css(styles.wrapper)}>
      <aside className={css(styles.sideBarWrapper)}>
        <SearchSideBar
          regions={regions}
          onInputChange={onInputChange}
          onFieldChange={onFieldChange}
        />
      </aside>
      <div className={css(styles.searchContent)}>
        {showplaces.isFetching ? (
          <div>Загрузка...</div>
        ) : (
          <div>
            {isShowplacesFetched && !showplaces.length ? (
              <div>Достопримечательности не найдены</div>
            ) : (
              showplaces.map(
                showplace =>
                  showplace.enabled && (
                    <ShowplaceItemHorizontal
                      showplace={showplace}
                      key={showplace._id}
                    />
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
    showplaces: getShowplacesByQuery(state, state.showplaces.activeQuery),
    regions: getRegions(state),
    isFetching: state.showplaces.isFetching,
    isShowplacesFetched: state.showplaces.isFetched,
    isRegionsFetched: state.entities.regions.isFetched,
  };
};

SearchFormContainer = compose(
  connect(
    mapStateToProps,
    { loadFilteredShowplaces, resetActiveFilter, loadRegions }
  ),
  withStateHandlers(({ count }) => ({ filter: {} }), {
    onFieldChange: ({ filter }, { loadFilteredShowplaces }) => (
      field,
      value
    ) => {
      const newFilter = { ...filter };
      if (!newFilter.hasOwnProperty(field)) {
        newFilter[field] = [value];
      } else {
        const fieldValue = newFilter[field];
        const index = fieldValue.findIndex(item => item === value);

        index === -1 ? fieldValue.push(value) : fieldValue.splice(index, 1);

        newFilter[field] = fieldValue;
      }

      loadFilteredShowplaces(newFilter);
      return {
        filter: newFilter,
      };
    },
    onInputChange: ({ filter }, { loadFilteredShowplaces }) => (
      field,
      value
    ) => {
      const newFilter = { ...filter };
      newFilter[field] = value;
      loadFilteredShowplaces(newFilter);
      return {
        filter: newFilter,
      };
    },
  }),
  lifecycle({
    componentDidMount() {
      if (!this.props.isShowplacesFetched) {
        this.props.loadFilteredShowplaces();
      }
      if (!this.props.isRegionsFetched) {
        this.props.loadRegions();
      }
    },
    componentWillUnmount() {
      this.props.resetActiveFilter();
    },
  })
)(SearchFormContainer);

export default SearchFormContainer;
