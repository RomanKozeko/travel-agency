import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { loadLang, saveLang, deleteLang } from './LanguagesReducer';
import { getLanguages } from '../../rootReducer';
import LanguagesList from './LanguagesList';
import Spinner from '../ui-elements/Spinner';

const mapStateToProps = (state) => {
  return {
    items: getLanguages(state),
    isFetching: state.languages.isFetching,
    isSaving: state.languages.isSaving
  };
};

class LanguagesContainer extends React.Component {
  componentDidMount() {
    if (!this.props.items.length) {
      this.props.loadLang();
    }
  }

  render() {
    const { isFetching } = this.props;
    return (<div>
      {isFetching ?
        <Spinner/>
        :
        <LanguagesList
          {...this.props}
        />
      }
    </div>);
  }
}

LanguagesContainer.propTypes = {
  loadLang: PropTypes.func,
  items: PropTypes.array,
  isFetching: PropTypes.bool,
};

LanguagesContainer = connect(
  mapStateToProps,
  { loadLang, saveLang, deleteLang }
)(LanguagesContainer);

export default LanguagesContainer;
