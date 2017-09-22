import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, css} from 'aphrodite/no-important';
import PropTypes from 'prop-types';

import { loadCategories, deleteCategories } from './categoriesActions';
import { getCategories } from '../../rootReducer';
import CategoriesList from './CategoriesList';


const mapStateToProps = (state) => {
  return {
    items: getCategories(state),
    content: state.categories.content,
    isFetching: state.categories.isFetching,
    languages: state.languages
  };
};

class CategoriesContainer extends React.Component {
  componentDidMount() {
    if (!this.props.items.length) {
      this.props.loadCategories();
    }
  }

  render() {
    return (<CategoriesList {...this.props} />);
  }
}

CategoriesContainer.propTypes = {
  loadCategories: PropTypes.func,
  deleteCategories: PropTypes.func,
  items: PropTypes.array,
};

CategoriesContainer = connect(
  mapStateToProps,
  { loadCategories, deleteCategories }
)(CategoriesContainer);

export default CategoriesContainer;