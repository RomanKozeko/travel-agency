import React from 'react';
import { connect } from 'react-redux';
import ToursList from './ToursList';
import { loadFilteredTours } from './toursActions';
import { getToursByQuery } from '../../rootReducer';

const mapStateToProps = (state, ownProps) => {
  return {
    tours: getToursByQuery(state, ownProps.query),
    isFetching: state.tours.isFetching,
    query: ownProps.query
  }
};

class FilteredToursContainer extends React.Component {
  componentDidMount() {
    const {tours, query, loadFilteredTours} = this.props;
    if (!tours.length) {
      loadFilteredTours(query);
    }
  }

  render() {
    const {
      tours,
      isFetching,
    } = this.props;

    return (
      <div>
        {isFetching ?
          <div>Loading...</div> :
          <ToursList tours={tours} />
        }
      </div>
    );
  }
}

FilteredToursContainer = connect(
  mapStateToProps,
  { loadFilteredTours }
)(FilteredToursContainer);

export default FilteredToursContainer
