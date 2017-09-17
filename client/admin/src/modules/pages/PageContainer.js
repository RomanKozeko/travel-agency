import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite/no-important';
import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';
import PageHeader from '../ui-elements/PageHeader';
import Spinner from '../ui-elements/Spinner';
import MyEditor from './MyEditor'
import BackLink from '../ui-elements/BackLink';
import { getPage, getLanguages } from '../../rootReducer';
import { loadPage, savePage } from './PagesActions';
import Page from './Page';
const uniqueId = require('lodash.uniqueid');

class PageContent {
  constructor(language) {
    this.id = uniqueId();
    this.title = '';
    this.description = '';
    this.rows = [];
    this.language = language._id;
  }
}

const createBlankPage = (languages) => {
  const content = [];
  languages.forEach((language) => {
    content.push(new PageContent(language));
  });
  return {
    id: uniqueId(),
    preview: '',
    content
  };
};

const mapStateToProps = (state, router) => {
  let page = getPage(state, router.match.params.id);
  const isNewPage = router.location.search.split('=')[1] === 'newPage';
  const languages = getLanguages(state);

  if (isNewPage) {
    page = createBlankPage(languages);
  }

  return {
    page,
    languages,
    isNewPage,
    isFetching: state.pages.isFetching
  };
};

class PageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  componentDidMount() {
    if (!this.props.page) {
      this.props.loadPage(this.props.match.params.id);
    }
  }

  render() {
    const { isFetching, page } = this.props;
    return (
      <div>
        <PageHeader text={'Cтраница:'} />
        <BackLink text="Назад к списку страниц" url="/admin/pages" />
        { isFetching || !page ? <Spinner /> : <Page {...this.props} /> }
      </div>
    );
  }
}

PageContainer.propTypes = {
  page: PropTypes.object,
  loadPage: PropTypes.func,
  isFetching: PropTypes.bool,
  match: PropTypes.object,
};

PageContainer = withRouter(connect(
  mapStateToProps,
  { loadPage, savePage }
)(PageContainer));

export default PageContainer;