import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPhotoSlider } from './PhotoSliderReducer';
import { getPhotoSliders } from '../../rootReducer';
import PhotoSlider from './PhotoSlider';

const PhotoSliderContainer = ({ items, isFetched, fetchPhotoSlider }) => {
  useEffect(() => {
    if (!isFetched) {
      fetchPhotoSlider();
    }
  }, [fetchPhotoSlider, isFetched]);

  if (!items.length) {
    return null;
  }

  return <PhotoSlider items={items} />;
};

const mapStateToProps = state => ({
  items: getPhotoSliders(state),
  isFetching: state.photoSlider.isFetching,
  isFetched: state.photoSlider.isFetched,
});

export default connect(mapStateToProps, { fetchPhotoSlider })(
  PhotoSliderContainer
);
