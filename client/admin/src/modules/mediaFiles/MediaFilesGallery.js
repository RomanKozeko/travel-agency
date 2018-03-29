import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import MediaFilesList from './MediaFilesList';
import Button from 'material-ui/Button';
import PageHeader from '../ui-elements/PageHeader';
import ImageUploader from '../ui-elements/form/ImageUploader';
import {updateItem, updateItemContent} from "./mediaFilesReducer";

const styles = StyleSheet.create({
  button: {
    marginTop: '15px',
    '@media (max-width: 800px)': {
      width: '100%'
    }
  }
});

class MediaFilesGallery extends React.Component {
	componentWillUnmount() {
		this.props.resetItems();
	}

  deleteMediaFiles = () => {
  	this.props.deleteItems(this.props.selected);
	};

  render() {
    const { saveItem, toggleImg } = this.props;
    return (
      <div>
        <PageHeader text={'Картинки'} />
        <ImageUploader uploadImg={saveItem} fileType={ this.props.filesType } />
	      <Button
		      onClick={this.deleteMediaFiles}
					className={css(styles.button)}
          color="secondary"
					variant="raised"
					margin="normal"
		      disabled={!this.props.selected.length}
	      >
		      Удалить выбранные
	      </Button>
        <MediaFilesList
	        { ...this.props }
          clickHandler={ toggleImg }
        />
      </div>
    );
  }
}

export default MediaFilesGallery;
