import React from 'react'
import { connect } from 'react-redux';
import ToursList from './ToursList'
import NewTourForm from './NewTourForm'
import { requestTours } from './toursActions'
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

  }

  componentDidMount() {
    console.log(this.props.match)
    console.log(this.props.location)
    console.log(this.props.history)
    this.props.requestTours();
  }

  render() {
    return (
      <div className="ToursContainer">
        <ToursList tours={this.props.tours} />
        <NewTourForm onSubmit={this.submit.bind(this)} />
      </div>
    )
  }
}

ToursContainer = connect(
  mapStateToProps,
  { requestTours }
)(ToursContainer);

export default ToursContainer
