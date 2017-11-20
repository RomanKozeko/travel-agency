import React from 'react';
import { connect } from 'react-redux';
import Chip from 'material-ui/Chip';
import {css, StyleSheet} from 'aphrodite/no-important';
import { loadRegions } from '../../regions/regionsReducer';
import { loadCategories } from '../../categories/categoriesReducer';
import { getCategories, getRegions } from '../../../rootReducer';

const styles = StyleSheet.create({
  itemContentButton: {
    color: '#aeaeae',
    cursor: 'pointer',
    ':hover': {
      color: '#3f51b5'
    }
  },
  itemContentToolbar: {
    position: 'absolute',
    top: '0',
    right: '0',
  },
  chipWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  filtersHeader: {
    textAlign: 'center'
  },
  chipTag: {
    margin: '2px'
  }
});

class FiltersTags extends React.Component {
  componentDidMount() {
    if (!this.props.regions.length ) {
      this.props.loadRegions();
    }
    if (!this.props.categories.length) {
      this.props.loadCategories();
    }
  }

  render() {
    const {
      filters,
      categoriesByIDs,
      regionsByIDs,
      regionsIsFetched,
      categoriesIsFetched
    } = this.props;
    let allFilters = [];
    for (const filterType in filters) {
      if (filters.hasOwnProperty(filterType)) {
        allFilters = [...allFilters, ...filters[filterType]]
      }
    }

    if (!regionsIsFetched || !categoriesIsFetched) {
      return <div>Loading...</div>;
    }

    return (<div className={css(styles.chipWrapper)}>
      Показывать туры:
      {allFilters.map(item => {
        if (!item) return null;
        const chipItem = item._id ? item : categoriesByIDs[item] || regionsByIDs[item];
        return (
          <Chip
            className={css(styles.chipTag)}
            key={chipItem._id + 1}
            label={chipItem.content[0].title}
          />
        )
      })}
    </div>)
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    regionsIsFetched: state.regions.isFetched,
    regionsByIDs: state.regions.byIds,
    categoriesByIDs: state.categories.byIds,
    categoriesIsFetched: state.categories.isFetched,
    regions: getRegions(state),
    categories: getCategories(state),
    filters: ownProps.filters
  }
};

FiltersTags = connect(
  mapStateToProps,
  { loadRegions, loadCategories }
)(FiltersTags);

export default FiltersTags;
