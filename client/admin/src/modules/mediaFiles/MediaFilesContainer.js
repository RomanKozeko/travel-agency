import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { deleteItems, saveItem, loadItems, toggleItem, resetItems } from './mediaFilesReducer';
import { getMediaFiles } from '../../rootReducer';
import MediaFilesGallery from './MediaFilesGallery';

const mapStateToProps = (state) => {
  return {
    items: getMediaFiles(state),
	  isFetched: state.mediafiles.isFetched,
	  selected: state.mediafiles.selected
  };
};

class MediaFilesContainer extends React.Component {
  componentDidMount() {
    if (!this.props.items.length) {
      this.props.loadItems();
    }
  }

  toggleImg = (item) => {
    if (this.props.handleToggledItem) {
      this.props.handleToggledItem(item)
    }
    this.props.toggleItem(item._id);
  };

  render() {
  	const { isFetched } = this.props;
	  if (!isFetched) {
		  return null;
	  }
    return (
	    <MediaFilesGallery {...this.props} toggleImg={this.toggleImg} />
    );
  }
}

MediaFilesContainer.propTypes = {
  loadItems: PropTypes.func,
  items: PropTypes.array,
  isFetching: PropTypes.bool,
};

MediaFilesContainer = connect(
  mapStateToProps,
  { deleteItems, saveItem, loadItems, toggleItem, resetItems }
)(MediaFilesContainer);

export default MediaFilesContainer;
