import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import { compose, lifecycle, withStateHandlers } from 'recompose'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { theme } from '../../services/constans'
import { fetchPhotoSlider } from './PhotoSliderReducer'
import { getPhotoSliders } from '../../rootReducer'
import PrefixLink from '../ui-elements/PrefixLink';
import { LeftArrow, RightArrow } from '../ui-elements/icons/Icons'
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
