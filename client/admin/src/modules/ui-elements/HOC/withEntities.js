import React from 'react';
import {connect} from 'react-redux';
import Skeleton from 'react-loading-skeleton';

import { loadItems, loadHotelsByRegions } from '../../hotels/hotelsReducer';
import { loadRegions } from '../../regions/regionsReducer';

const options = {
  hotels: {
    actions: {
      hotels: loadItems,
      loadWithFilter: loadHotelsByRegions,
    }
  },
  regions: {
    actions: {
      regions: loadRegions,
    }
  }
};

function withEntities(WrappedComponent, options) {
  class BaseConatiner extends React.Component {


    componentDidMount() {
      this.props.isRegionsFetched
    }

    render() {
      return (
        <div>
          {this.props.isFetching &&
          <div>
            <Skeleton/>
            <Skeleton count={5}/>
            <WrappedComponent/>
          </div>
          }
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {

    };
  };

  return connect(
    mapStateToProps,
    {}
  )(BaseConatiner);
}

export default withEntities;
