import React, {Component} from 'react';
import MediaFilesList from './MediaFilesList';
import Button from 'material-ui/Button';
import PageHeader from '../ui-elements/PageHeader';
import ImageUploader from '../ui-elements/form/ImageUploader';

class MediaFilesGallery extends React.Component {
	componentWillUnmount() {
		this.props.resetItems();
	}

  deleteMediaFiles = () => {
  	this.props.deleteItems(this.props.selected);
	};

  render() {
    const { saveItem, toggleItem } = this.props;
    return (
      <div>
        <PageHeader text={'Картинки'} />
        <ImageUploader uploadImg={saveItem} />
	      <Button
		      onClick={this.deleteMediaFiles}
		      component="span"
		      color="accent"
		      raised
		      disabled={!this.props.selected.length}
	      >
		      Удалить выбранные
	      </Button>
        <MediaFilesList
          items={this.props.items}
          clickHandler={toggleItem}
        />
      </div>
    );
  }
}

export default MediaFilesGallery;
