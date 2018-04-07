import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, css} from 'aphrodite/no-important';
import Button from 'material-ui/Button';
import PageHeader from '../ui-elements/PageHeader';
import { bindActionCreators } from 'redux'
import Spinner from '../ui-elements/Spinner';
import { getContacts, getLanguages } from '../../rootReducer';
import { loadLang } from '../languages/LanguagesReducer';
import withEntities from "../ui-elements/HOC/withEntities";
import ContactsTemplate from "./ContactsTemplate";

import ConfirmDialog from "../ui-elements/form/ConfirmDialog";
import createConfirmation from "../ui-elements/form/createConfirmation";
import Portlet from "../ui-elements/Portlet";
import { saveItem, deleteItems, loadItems } from './ContactsReducer';


const confirm = createConfirmation(ConfirmDialog);
class SettingsContainer extends React.Component {
  constructor(props) {
    super(props);
    const {dispatch} = props;
    this.boundActionCreators = bindActionCreators({ saveItem, deleteItems }, dispatch)

    this.state = {
      showTemplate: false
    }
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

  deleteItems = id => () => {
    confirm({title: `Точно удалить?`, body: ''}).then(res => {
      this.boundActionCreators.deleteItems(id)
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
    const { contacts } = this.props;

    return (<div>
      <PageHeader text={'Контакты'} />
      {
        contacts.map(item => (
          <Portlet isBordered key={ item._id }>
            <ContactsTemplate
              item={ item }
              saveItem={ this.saveItem }
              editItem={ this.editItem }
              deleteItems={ this.deleteItems }
              { ...this.props }
            />
          </Portlet>
        ))
      }

      <Button onClick={ this.toggleTemplate } variant="raised" color="primary">
          Добавить
      </Button>
      {
        this.state.showTemplate &&
        <Portlet isBordered>
          <ContactsTemplate
            saveItem={ this.saveItem }
            editItem={ this.editItem }
            deleteItems={ this.deleteItems }
            { ...this.props }
          />
        </Portlet>
      }
    </div>);
  }
}
const options = {
  contacts: {
    loadItems,
    getItems: (state) => getContacts(state)
  },
  languages: {
    loadLang,
    getItems: (state) => getLanguages(state)
  }
};
export default withEntities(SettingsContainer, options);
