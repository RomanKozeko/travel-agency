import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, css} from 'aphrodite/no-important';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Spinner from '../ui-elements/Spinner';
import BackLink from '../ui-elements/BackLink';
import PageHeader from '../ui-elements/PageHeader';
import { getCategory, getLanguages } from '../../rootReducer';
import { loadCategory, saveCategory } from './categoriesReducer';
import CategoryForm from './CategoryForm';
import Portlet from '../ui-elements/Portlet';;

const uniqueId = require('lodash.uniqueid');

const createBlankPage = (languages) => {
  const content = [];
  languages.forEach((language) => {
    content.push({
      id: uniqueId(),
      title: '',
      description: '',
      language: language._id
    });
  });
  return {
    id: uniqueId(),
    preview: '',
    content
  };
};

const mapStateToProps = (state, router) => {
  let category = getCategory(state, router.match.params.id);
  const isNew = router.location.search.split('=')[1] === 'new';
  const languages = getLanguages(state);

  if (isNew) {
    category = createBlankPage(languages);
  }

  return {
    category,
    languages,
    isNew,
    languagesIDs: state.languages.byIds,
    content: state.categories.content,
    isFetching: state.categories.isFetching,
    isSaving: state.categories.isSaving
  };
};


class CategoryContainer extends React.Component {
  componentDidMount() {
    if (!this.props.category) {
      this.props.loadCategory(this.props.match.params.id);
    }
  }

  render() {
    const { isFetching, category, isBordered = true } = this.props;
    return (
      <div>
        <PageHeader text={'Категория:'}/>
        <BackLink text="Назад к списку категорий" url="/admin/categories"/>
        {isFetching || !category ? <Spinner/> :
          <Portlet isBordered={isBordered}><CategoryForm {...this.props} /></Portlet>
        }
      </div>
    )
  }
}

CategoryContainer.propTypes = {
  category: PropTypes.object,
  loadCategory: PropTypes.func,
  isFetching: PropTypes.bool,
  match: PropTypes.object,
};

CategoryContainer = withRouter(connect(
  mapStateToProps,
  { loadCategory, saveCategory }
)(CategoryContainer));

export default CategoryContainer;