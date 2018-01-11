import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import TreeList from '../ui-elements/TreeList'
import { populateRegionsByHotels } from "../regions/RegionService";

const styles = StyleSheet.create({
  root: {

  },
  hotelsContainer: {

  }
});

class HotelSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      populatedRegions: []
    }
}

  componentDidMount() {
    this.setState({
      populatedRegions: populateRegionsByHotels(this.props.regions, this.props.hotels)
    });
  }

  render() {
    const { regions, hotels=[] } = this.props;
    const { populatedRegions } = this.state;
    return (
      <div className={css(styles.root)}>
        <TreeList
          selectedItems={regions}
          items={regions}
          selectItems={this.selectRegions}
        />
        <div className={css(styles.hotelsContainer)}>
          {hotels.map((hotel, i) => (
            <div key={hotel._id}>
                <h3>{hotel.content[0].title}</h3>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default HotelSelection;
