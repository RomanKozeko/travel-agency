import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { deleteItems, saveItem, loadItems } from './mediaFilesReducer';
import { getMediaFiles } from '../../rootReducer';
import MediaFilesGallery from './MediaFilesGallery';
import Button from 'material-ui/Button';
import PageHeader from '../ui-elements/PageHeader';
import ImageUploader from '../ui-elements/form/ImageUploader';

const mapStateToProps = (state) => {
  return {
    items: getMediaFiles(state),
    isFetching: state.languages.isFetching,
  };
};

class MediaFilesContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    	items: this.props.items,
      itemsToDelete: []
    }
  }

  componentDidMount() {
    if (!this.props.items.length) {
      this.props.loadItems();
    }
  }

	componentWillReceiveProps(nextProps) {
		if (this.props.items !== nextProps.items) {
			this.setState({ items: nextProps.items })
		}
  }

	toggleItem = (id) => {
		const { itemsToDelete } = this.state;
		const currentIndex = itemsToDelete.indexOf(id);
		const newItemsToDelete = [...itemsToDelete];

		if (currentIndex === -1) {
			newItemsToDelete.push(id);
		} else {
			newItemsToDelete.splice(currentIndex, 1);
		}

		const { items } = this.state;
		const updatedItems = items.map((item) => {
			if (item._id === id) {
				item.active = currentIndex === -1;
			}
			return item;
		});

    this.setState({
	    items: updatedItems,
	    itemsToDelete: newItemsToDelete
    });
  };

  deleteMediaFiles = () => {
  	const { itemsToDelete } = this.state;
  	this.props.deleteItems(itemsToDelete);
  	this.setState({ itemsToDelete: [] })
	};

  render() {
    const { saveItem } = this.props;
    return (
      <div>
        <PageHeader text={'Картинки'} />
        <ImageUploader uploadImg={saveItem} />
	      <Button
		      onClick={this.deleteMediaFiles}
		      component="span"
		      color="accent"
		      raised
		      disabled={!this.state.itemsToDelete.length}
	      >
		      Удалить выбранные
	      </Button>
        <MediaFilesGallery
          items={this.state.items}
          clickHandler={this.toggleItem}
        />
      </div>
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
  { deleteItems, saveItem, loadItems }
)(MediaFilesContainer);

export default MediaFilesContainer;
