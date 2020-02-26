import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Spinner from '../ui-elements/Spinner';
import BackLink from '../ui-elements/BackLink';
import PageHeader from '../ui-elements/PageHeader';
import { getRegion, getLanguages, getRegions } from '../../rootReducer';
import { loadRegion, saveRegion, loadRegions } from './regionsReducer';
import RegionForm from './RegionForm';
import Portlet from '../ui-elements/Portlet';

const uniqueId = require('lodash.uniqueid');

const createBlankPage = languages => {
  const content = [];
  languages.forEach(language => {
    content.push({
      id: uniqueId(),
      title: '',
      description: '',
      language: language._id,
    });
  });
  return {
    id: uniqueId(),
    preview: '',
    ancestors: [],
    parent: '',
    content,
  };
};

const mapStateToProps = (state, router) => {
  let region = getRegion(state, router.match.params.id);
  const regions = getRegions(state, router.match.params.id);
  const isNew = router.location.search.split('=')[1] === 'new';
  const languages = getLanguages(state);

  if (isNew) {
    region = createBlankPage(languages);
  }

  return {
    item: region,
    regions,
    languages,
    isNew,
    languagesIDs: state.languages.byIds,
    content: state.regions.content,
    isFetching: state.regions.isFetching,
    isSaving: state.regions.isSaving,
  };
};

class RegionContainer extends Component {
  componentDidMount() {
    if (!this.props.regions.length) {
      this.props.loadRegions();
    }
  }

  render() {
    const { isFetching, item, isBordered = true } = this.props;
    return (
      <div>
        <PageHeader text={'Регион:'} />
        <BackLink text="Назад к списку регионов" url="/admin/regions" />
        {isFetching || !item ? (
          <Spinner />
        ) : (
          <Portlet isBordered={isBordered}>
            <RegionForm {...this.props} />
          </Portlet>
        )}
      </div>
    );
  }
}

RegionContainer.propTypes = {
  region: PropTypes.object,
  loadRegion: PropTypes.func,
  isFetching: PropTypes.bool,
  match: PropTypes.object,
};

RegionContainer = withRouter(
  connect(
    mapStateToProps,
    { loadRegion, save: saveRegion, loadRegions }
  )(RegionContainer)
);

export default RegionContainer;
