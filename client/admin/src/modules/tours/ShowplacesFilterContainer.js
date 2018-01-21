import React from 'react';
import { connect } from 'react-redux';
import { getShowplaces, getShowplacesByFilter } from '../../rootReducer';
import { loadItems, loadShowplacesByRegions } from '../showPlaces/showplacesReducer';
import FilterByRegions from '../regions/FilterByRegions';
import withEntities from "../ui-elements/HOC/withEntities";


class ShowplacesFilterContainer extends React.Component {
  render() {
    return (
      <FilterByRegions {...this.props} itemsNameToFilter={'showplaces'} />
    )
  }
}

const options = {
  showplaces: {
    loadItems,
    getItems: getShowplaces
  }
};

const mapStateToProps = (state) => ({
  filteredItems: state.showplaces.activeFilter ?
    (getShowplacesByFilter(state, state.showplaces.activeFilter) || [])
    :
    getShowplaces(state),
});

export default connect(
  mapStateToProps,
  { loadItemsByRegions: loadShowplacesByRegions },
)(withEntities(ShowplacesFilterContainer, options));
