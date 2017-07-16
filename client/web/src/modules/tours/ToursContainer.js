import React from 'react'
import { connect } from 'react-redux';
import ToursList from './ToursList'
import NewTourForm from './NewTourForm'
import { loadTours } from './toursActions'
import { getTours } from '../../rootReducer'
import './ToursContainer.css'

const mapStateToProps = (state) => {
  return {
    tours: getTours(state),
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
    return (
      <div className="ToursContainer">
        {this.props.isFetching ?
          <h3>Loading...</h3>
          :
          <ToursList tours={this.props.tours} />
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
