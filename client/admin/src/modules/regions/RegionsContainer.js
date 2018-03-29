import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, css} from 'aphrodite/no-important';
import PropTypes from 'prop-types';

import { loadRegions, deleteRegions } from './regionsReducer';
import { getRegions } from '../../rootReducer';
import RegionsList from './RegionsList';


const mapStateToProps = (state) => {
  return {
    items: getRegions(state),
    content: state.regions.content,
    isFetching: state.entities.regions.isFetching,
    isFetched: state.entities.regions.isFetched,
    languages: state.languages
  };
};

class RegionsContainer extends React.Component {
  componentDidMount() {
    if (!this.props.isFetched) {
      this.props.loadRegions();
    }
  }

  render() {
    return (<RegionsList {...this.props} />);
  }
}

RegionsContainer.propTypes = {
  loadRegions: PropTypes.func,
  deleteRegions: PropTypes.func,
  items: PropTypes.array,
};

RegionsContainer = connect(
  mapStateToProps,
  { loadRegions, deleteRegions }
)(RegionsContainer);

export default RegionsContainer;
