import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import PageHeader from '../ui-elements/PageHeader';
import ContactsContainer from './ContactsContainer';


class SettingsContainer extends React.Component {
  componentDidMount() {
    // if (!this.props.isFetched) {
    //   this.props.loadRegions();
    // }
  }

  render() {
    return (<div>
      <PageHeader text={'Настройки'} />
      <ContactsContainer />

    </div>);
  }
}

export default SettingsContainer;
