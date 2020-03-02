import React, { Component } from 'react';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import PageHeader from '../ui-elements/PageHeader';
import Portlet from '../ui-elements/Portlet';
import { getSettings } from '../../rootReducer';
import { getLanguages } from '../../rootReducer';
import { loadItems, saveItem } from './SettingsReducer';
import Spinner from '../ui-elements/Spinner';
import SettingsForm from './SettingsForm';

class Settings extends Component {
  render() {
    const { item } = this.props;
    return (
      <div>
        <PageHeader text={'Настройки'} />
        <Portlet isBordered>
          {this.props.isFetching || !this.props.isFetched ? (
            <Spinner />
          ) : (
            <SettingsForm item={item} />
          )}
        </Portlet>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const languages = getLanguages(state);
  const item = getSettings(state)[0];
  return {
    isFetched: state.settings.isFetched,
    isFetching: state.settings.isFetching,
    item,
    languages,
  };
};

export default compose(
  connect(mapStateToProps, { loadItems, saveItem }),
  lifecycle({
    componentDidMount() {
      if (!this.props.isFetched) {
        this.props.loadItems();
      }
    },
  })
)(Settings);
