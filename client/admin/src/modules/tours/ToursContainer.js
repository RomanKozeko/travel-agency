import React from 'react'
import { connect } from 'react-redux';
import PageHeader from '../ui-elements/PageHeader';
import Portlet from '../ui-elements/Portlet';
import Spinner from '../ui-elements/Spinner';
import Pagination from '../ui-elements/Pagination'
import TourTable from './TourTable';
import { loadTours } from './toursActions';
import { getPageWithTours } from '../../rootReducer';

const mapStateToProps = (state) => {
  return {
    tours: getPageWithTours(state, state.tours.currPage),
    currPage: state.tours.currPage,
    pageCount: state.tours.pageCount,
    count: state.tours.count,
    isFetching: state.tours.isFetching
  }
};

class ToursContainer extends React.Component {
  submit(values) {


  }

  componentDidMount() {
    this.props.loadTours();
  }

  render() {
    const {
      tours,
      isFetching,
      currPage,
      count,
      loadTours,
      pageCount
    } = this.props;

    return (
      <div className="ToursContainer">
        {isFetching ?
          <Spinner/>
          :
          <div>
            <PageHeader text={'Все туры'} />
            <Portlet isBordered={false}>
              <TourTable data={tours} />
            </Portlet>
            <Pagination
              pageNumber={currPage}
              pageCount={pageCount}
              requestPage={loadTours}
              totalPages={count}
            />
          </div>

        }
      </div>
    )
  }
}

ToursContainer = connect(
  mapStateToProps,
  { loadTours }
)(ToursContainer);

export default ToursContainer
