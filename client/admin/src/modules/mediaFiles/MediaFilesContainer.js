import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
	deleteItems,
	saveItem,
	updateItem,
	loadItems,
	toggleItem,
	resetItems,
	updateItemContent
} from './mediaFilesReducer';
import { getMediaFiles, getLanguages } from '../../rootReducer';
import MediaFilesGallery from './MediaFilesGallery';

const mapStateToProps = (state) => {
  return {
	  languages: getLanguages(state),
	  items: getMediaFiles(state),
	  isFetched: state.mediafiles.isFetched,
	  isSaving: state.mediafiles.isSaving,
	  selected: state.mediafiles.selected,
	  languagesIDs: state.languages.byIds,
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
  { deleteItems, saveItem, loadItems, toggleItem, resetItems, updateItem, updateItemContent }
)(MediaFilesContainer);

export default MediaFilesContainer;
