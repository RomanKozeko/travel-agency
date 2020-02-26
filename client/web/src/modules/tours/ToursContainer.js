import React, { Component } from 'react';
import { connect } from 'react-redux';
import ToursList from './ToursList';
import Pagination from '../ui-elements/Pagination';
import { loadFilteredTours } from './toursActions';
import { getPageWithTours } from '../../rootReducer';

const mapStateToProps = state => {
  return {
    tours: getPageWithTours(state, state.tours.currPage),
    currPage: state.tours.currPage,
    pageCount: state.tours.pageCount,
    count: state.tours.count,
    isFetching: state.tours.isFetching,
    isFetched: state.tours.isFetched,
  };
};

class ToursContainer extends Component {
  componentDidMount() {
    if (!this.props.isFetched) {
      this.props.loadFilteredTours();
    }
  }

  render() {
    const {
      tours,
      isFetching,
      currPage,
      count,
      loadTours,
      pageCount,
      currLanguageId,
    } = this.props;

    return (
      <div>
        <ToursList tours={tours} currLanguageId={currLanguageId} />
        <Pagination
          pageNumber={currPage}
          pageCount={pageCount}
          requestPage={loadTours}
          totalPages={count}
        />
      </div>
    );
  }
}

ToursContainer = connect(
  mapStateToProps,
  { loadFilteredTours }
)(ToursContainer);

export default ToursContainer;
