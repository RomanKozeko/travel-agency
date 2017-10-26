import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { deleteItem, saveItem, loadItems } from './mediaFilesReducer';
import { getMediaFiles } from '../../rootReducer';
import MediaFilesGallery from './MediaFilesGallery';
import Spinner from '../ui-elements/Spinner';
import PageHeader from '../ui-elements/PageHeader';

const mapStateToProps = (state) => {
  return {
    items: getMediaFiles(state),
    isFetching: state.languages.isFetching,
    isSaving: state.languages.isSaving
  };
};

class MediaFilesConatiner extends React.Component {
  componentDidMount() {
    if (!this.props.items.length) {
      this.props.loadItems();
    }
  }

  render() {
    const { isFetching } = this.props;
    return (
      <div>
        <PageHeader text={'Картинки'} />
        {isFetching ?
          <Spinner/>
          :

          <MediaFilesGallery
            {...this.props}
          />
        }
      </div>
    );
  }
}

MediaFilesConatiner.propTypes = {
  loadItems: PropTypes.func,
  items: PropTypes.array,
  isFetching: PropTypes.bool,
};

MediaFilesConatiner = connect(
  mapStateToProps,
  { deleteItem, saveItem, loadItems }
)(MediaFilesConatiner);

export default MediaFilesConatiner;
