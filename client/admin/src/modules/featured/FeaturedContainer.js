import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import Spinner from '../ui-elements/Spinner';
import { getFeatured, getLanguages } from '../../rootReducer';
import { loadItems, saveItem } from '../featured/FeaturedReducer';
import { loadLang } from '../languages/LanguagesReducer';
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
    showTemplate: false,
    newItem: {
      content: this.props.languages.map(langItem => ({
        title: '',
        language: langItem._id
      })),
      order: 0,
      preview: []
    }
  }

  prepareTemplate = () => {
    this.setState({ showTemplate: !this.state.showTemplate })
  }

  onOrderChange = ({ target: { value }}) => {
    const newItem = {
      ...this.state.newItem,
      order: value
    }
    this.setState({ newItem })
  }

  onFieldChange = (langID) => ({ target: { value }}) => {
    const newItem = {
      ...this.state.newItem,
      content: this.state.newItem.content.map(contentItem => {
        if (contentItem.language === langID) {
          return {
            ...contentItem,
            title: value
          }
        }
        return contentItem
      })
    }

    this.setState({ newItem })
  }

  saveItem = () => {
    this.boundActionCreators.saveItem(this.state.newItem, true)
  }

  addBackground = () => {
    const newItem = {
      ...this.state.newItem,
      preview: this.props.state.mediafiles.selected
    }
    this.setState({ newItem })
  }

  removePreview = () => {
    const newItem = {
      ...this.state.newItem,
      preview: []
    }
    this.setState({ newItem })
  }

  render() {
    const { state: { featured : { isFetching }}} = this.props;
    return (
      <div>
        {isFetching ?
          <Spinner />
          :
          <FeaturedList
            prepareTemplate={ this.prepareTemplate }
            showTemplate={ this.state.showTemplate }
            onFieldChange={ this.onFieldChange }
            newItem={ this.state.newItem }
            saveItem={ this.saveItem }
            preview={ this.props.state.mediafiles.byIds[this.state.newItem.preview.toString()]}
            addBackground={ this.addBackground }
            removePreview={ this.removePreview }
            onOrderChange={ this.onOrderChange }
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
  }
};

export default withEntities(FeaturedContainer, options);
