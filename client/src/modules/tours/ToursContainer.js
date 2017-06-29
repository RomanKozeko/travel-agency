import React from 'react'
import { connect } from 'react-redux';
import ToursList from './ToursList'
import NewTourForm from './NewTourForm'
import { addNewTourRequest } from './toursActions'
import './ToursContainer.css'

const mapStateToProps = (state) => {
  return {
    tours: state.toursReducer.items
  }
};

class ToursContainer extends React.Component {
  submit(values) {
    // print the form values to the console
    console.log(values);
    this.props.addNewTourRequest(values)
  }

  render() {
    return (
      <div className="ToursContainer">
        <ToursList tours={this.props.tours} />
        <ToursList tours={this.props.tours} />
        <NewTourForm onSubmit={this.submit.bind(this)} />
      </div>
    )
  }
}

ToursContainer = connect(
  mapStateToProps,
  { addNewTourRequest }
)(ToursContainer);

export default ToursContainer
