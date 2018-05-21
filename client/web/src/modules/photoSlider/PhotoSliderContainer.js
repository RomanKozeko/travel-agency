import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux';
import { fetchPhotoSlider } from './PhotoSliderReducer'
import { getPhotoSliders } from '../../rootReducer'
import PhotoSlider from './PhotoSlider'

const PhotoSliderContainer = ({ items }) => {
  if (!items.length) {
    return null
  }

  return (
    <PhotoSlider items={ items } />
  )
};


const mapStateToProps = (state) => ({
  items: getPhotoSliders(state),
  isFetching: state.photoSlider.isFetching,
  isFetched: state.photoSlider.isFetched
})

export default compose(
  connect(mapStateToProps, { fetchPhotoSlider }),
  lifecycle({
    componentDidMount() {
      if (!this.props.isFetched) {
        this.props.fetchPhotoSlider()
      }
    }
  })
)(PhotoSliderContainer)
