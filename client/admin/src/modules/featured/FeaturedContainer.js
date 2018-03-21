import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import Spinner from '../ui-elements/Spinner';
import { getFeatured, getLanguages, getMediaFiles } from '../../rootReducer';
import { loadItems, saveItem } from '../featured/FeaturedReducer';
import { loadLang } from '../languages/LanguagesReducer';
import * as fromMediaFiles from '../mediaFiles/mediaFilesReducer';
import withEntities from "../ui-elements/HOC/withEntities";
import FeaturedList from "./FeaturedList";
import { bindActionCreators } from 'redux'

class FeaturedContainer extends React.Component {
  constructor(props) {
    super(props);
    const {dispatch} = props;
    this.boundActionCreators = bindActionCreators({ saveItem }, dispatch)
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
  }
};

export default withEntities(FeaturedContainer, options);
