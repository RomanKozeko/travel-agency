import React from 'react';
import { connect } from 'react-redux';
import { getHotels, getHotelsByFilter } from '../../rootReducer';
import { loadItems, loadHotelsByRegions } from '../hotels/hotelsReducer';
import FilterByRegions from '../regions/FilterByRegions';
import withEntities from "../ui-elements/HOC/withEntities";


class HotelsFilterContainer extends React.Component {
  render() {
    return (
      <FilterByRegions {...this.props} itemsNameToFilter={'hotels'} />
    )
  }
}

const options = {
  hotels: {
    loadItems,
    getItems: getHotels
  }
};

const mapStateToProps = (state) => ({
  filteredItems: state.hotels.activeFilter ?
    (getHotelsByFilter(state, state.hotels.activeFilter) || [])
    :
    getHotels(state),
});

export default connect(
  mapStateToProps,
  { loadItemsByRegions: loadHotelsByRegions },
)(withEntities(HotelsFilterContainer, options));
