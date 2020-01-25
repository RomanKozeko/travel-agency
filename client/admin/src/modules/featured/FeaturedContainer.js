import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import Spinner from '../ui-elements/Spinner';
import { getFeatured, getLanguages, getMediaFiles, getPageWithItems } from '../../rootReducer';
import { loadItems, saveItem, deleteItems } from '../featured/FeaturedReducer';
import { loadLang } from '../languages/LanguagesReducer';
import { loadPages } from '../pages/PagesActions';
import * as fromMediaFiles from '../mediaFiles/mediaFilesReducer';
import withEntities from "../ui-elements/HOC/withEntities";
import FeaturedList from "./FeaturedList";

import ConfirmDialog from "../ui-elements/form/ConfirmDialog";
import createConfirmation from "../ui-elements/form/createConfirmation";



const confirm = createConfirmation(ConfirmDialog);

class FeaturedContainer extends Component {
  constructor(props) {
    super(props);
    const {dispatch} = props;
    this.boundActionCreators = bindActionCreators({ saveItem, deleteItems }, dispatch)
  }

  state = {
    showTemplate: false
  }

  toggleTemplate = () => {
    this.setState({
      showTemplate: true,
      itemToEdit: null
    })
  }

  closeTemplate = () => {
    this.setState({
      showTemplate: false,
      itemToEdit: null
    })
  }

  editItem = id => () => {
    this.setState({
      itemToEdit: this.props.featured.find(item => item._id === id)._id
    })
  }

  saveItem = (newItem, isNew) => () => {
    this.boundActionCreators.saveItem(newItem, isNew)
    this.setState({
      showTemplate: false,
      itemToEdit: null
    })
  }

  deleteItems = id => () => {
    confirm({title: `Точно удалить?`, body: ''}).then(res => {
      this.boundActionCreators.deleteItems(id)
    })
  }


  render() {
    const { state: { featured : { isFetching }}, featured } = this.props;
    return (
      <div>
        {isFetching ?
          <Spinner />
          :
          <FeaturedList
            toggleTemplate={ this.toggleTemplate }
            items={ featured }
            showTemplate={ this.state.showTemplate }
            saveItem={ this.saveItem }
            editItem={ this.editItem }
            closeTemplate={ this.closeTemplate }
            deleteItems={ this.deleteItems }
            itemToEdit={ this.state.itemToEdit }
            {...this.props}
          />
        }
      </div>
    )
  }
}
const options = {
  featured: {
    loadItems,
    getItems: (state) => getFeatured(state)
  },
  languages: {
    loadLang,
    getItems: (state) => getLanguages(state)
  },
  mediafiles: {
    loadItems: fromMediaFiles.loadItems,
    getItems: (state) => getMediaFiles(state)
  },
  pages: {
    loadItems: loadPages,
    getItems: (state) => getPageWithItems(state, 0)
  }
};

export default withEntities(FeaturedContainer, options);
