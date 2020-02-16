import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../ui-elements/Spinner';
import { loadTours, deleteTours } from './toursActions';
import { getPageWithTours } from '../../rootReducer';
import ToursList from './ToursList';

class ToursContainer extends Component {
  componentDidMount() {
    this.props.loadTours();
  }

  render() {
    const { isFetching } = this.props;

    return (
      <div>{isFetching ? <Spinner /> : <ToursList {...this.props} />}</div>
    );
  }
}

const mapStateToProps = state => ({
  items: getPageWithTours(state, state.tours.currPage),
  currPage: state.tours.currPage,
  pageCount: state.tours.pageCount,
  count: state.tours.count,
  languages: state.languages,
  isFetching: state.tours.isFetching,
});

ToursContainer = connect(
  mapStateToProps,
  { loadTours, deleteTours }
)(ToursContainer);

export default ToursContainer;
