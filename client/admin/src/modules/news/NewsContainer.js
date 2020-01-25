import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import { bindActionCreators } from 'redux'
import Spinner from '../ui-elements/Spinner';
import { getNews, getLanguages, getMediaFiles, getPageWithItems } from '../../rootReducer';
import { loadItems, saveItem, deleteItems } from '../news/NewsReducer';
import { loadLang } from '../languages/LanguagesReducer';
import { loadPages } from '../pages/PagesActions';
import * as fromMediaFiles from '../mediaFiles/mediaFilesReducer';
import withEntities from "../ui-elements/HOC/withEntities";
import NewsList from "./NewsList";

import ConfirmDialog from "../ui-elements/form/ConfirmDialog";
import createConfirmation from "../ui-elements/form/createConfirmation";

const confirm = createConfirmation(ConfirmDialog);

class NewsContainer extends React.Component {
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
      itemToEdit: this.props.news.find(item => item._id === id)._id
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
    const { state: { news : { isFetching }}, news } = this.props;
    return (
      <div>
        {isFetching ?
          <Spinner />
          :
          <NewsList
            toggleTemplate={ this.toggleTemplate }
            items={ news }
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
  news: {
    loadItems,
    getItems: (state) => getNews(state)
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

export default withEntities(NewsContainer, options);
