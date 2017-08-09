import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { loadLanguages } from './LanguagesActions';
import { getLanguages } from '../../rootReducer';
import LanguagesList from './LanguagesList';

const mapStateToProps = (state) => {
  return {
    items: getLanguages(state),
    isFetching: state.languages.isFetching
  };
};

class LanguagesContainer extends React.Component {

  componentDidMount() {
    if (!this.props.items.length) {
      this.props.loadLanguages();
    }
  }

  render() {
    return (
      <LanguagesList {...this.props} />
    );
  }
}

LanguagesContainer.propTypes = {
  loadLanguages: PropTypes.func,
  items: PropTypes.array,
  isFetching: PropTypes.bool,
};

LanguagesContainer = connect(
  mapStateToProps,
  { loadLanguages }
)(LanguagesContainer);

export default LanguagesContainer;
