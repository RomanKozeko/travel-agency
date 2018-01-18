import React from 'react';
import { connect } from 'react-redux';
import {StyleSheet, css} from 'aphrodite/no-important';
import Button from 'material-ui/Button';
import TreeList from '../ui-elements/TreeList'
import Chip from 'material-ui/Chip';
import { getRegions, getHotels, getHotelsByFilter } from '../../rootReducer';
import { populateTree } from '../regions/RegionService';

import { loadRegions } from '../regions/regionsReducer';
import { loadItems, loadHotelsByRegions } from '../hotels/hotelsReducer';

const styles = StyleSheet.create({
  root: {

  },
  selectedItemsContainer: {

  },
  regionContainer: {

  },
  filteredItemsContainer: {

  }
});

class ItemsFilterByRegions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRegions: []
    }
  }

  componentDidMount() {
    if (!this.props.isRegionsFetched) {
      this.props.loadRegions();
    }
    if (!this.props.isHotelsFetched) {
      this.props.loadHotels();
    }
  }

  selectRegions = (e) => {
    const selectedRegions = [...this.state.selectedRegions];
    const index = selectedRegions.indexOf(e.target.value);
    if (index === -1) {
      selectedRegions.push(e.target.value)
    } else {
      selectedRegions.splice(index, 1)
    }
    this.setState({selectedRegions});
    this.props.loadHotelsByRegions(selectedRegions);
  };

  getTitle = (hotels, id) => {
    const hotel = hotels.find(hotel => hotel._id === id);
    return hotel ? hotel.content[0].title : '';
  };

  render() {
    const { regions, filteredItems } = this.props;
    return (
      <div className={css(styles.root)}>
        <div className={css(styles.selectedItemsContainer)}>
          {this.props.selectedItems.map(selectedItemId =>
            <Chip
              label={this.getTitle(this.props.hotels, selectedItemId)}
              key={selectedItemId}
              onRequestDelete={(e) => this.props.toggleItem(e, selectedItemId)}
              className={css(styles.chip)}
            />
          )}
        </div>
        <div className={css(styles.regionContainer)}>
          <TreeList
            selectedItems={this.state.selectedRegions}
            items={regions}
            selectItems={this.selectRegions}
          />
        </div>
        <div className={css(styles.filteredItemsContainer)}>
          {filteredItems.map((filteredItem, i) => (
            !this.props.selectedItems.find(selectedItemId => filteredItem._id === selectedItemId) &&
            <div key={filteredItem._id}>
              <h3>{filteredItem.content[0].title}</h3>
              <Button
                color="primary"
                className={css(styles.addButton)}
                onClick={(e) => this.props.toggleItem(e, filteredItem._id)}
              >
                Добавить
              </Button>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const hotels = getHotels(state);
  return {
    hotels,
    filteredItems: state.hotels.activeFilter ? (getHotelsByFilter(state, state.hotels.activeFilter) || []) : hotels,
    regions: populateTree(getRegions(state)),
    isHotelsFetched: state.hotels.isFetched,
    isRegionsFetched: state.regions.isFetched,
  }
};

export default connect(
  mapStateToProps,
  {
    loadRegions,
    loadHotelsByRegions,
    loadHotels: loadItems
  },
)(ItemsFilterByRegions);
