import React from 'react'
import { connect } from 'react-redux';
import ToursList from './ToursList'
import NewTourForm from './NewTourForm'
import Pagination from '../ui-elements/Pagination'
import { loadTours } from './toursActions'
import { getTours } from '../../rootReducer'
import './ToursContainer.css'

const mapStateToProps = (state) => {
  return {
    tours: getTours(state),
    pageNumber: state.tours.pageCount,
    isFetching: state.tours.isFetching
  }
};

class ToursContainer extends React.Component {
  submit(values) {
    // print the form values to the console
    console.log(values);

  }

  componentDidMount() {
    this.props.loadTours();
  }

  render() {
    const {
      tours,
      isFetching,
      pageNumber,
      loadTours
    } = this.props;
    
    return (
      <div className="ToursContainer">
        {isFetching ?
          <h3>Loading...</h3>
          :
          <div>
            <ToursList tours={tours} />
            <Pagination 
              pageNumber={pageNumber}
              requestPage={loadTours}
            />
          </div>

        }
        <NewTourForm onSubmit={this.submit.bind(this)} />
      </div>
    )
  }
}

ToursContainer = connect(
  mapStateToProps,
  { loadTours }
)(ToursContainer);

export default ToursContainer
