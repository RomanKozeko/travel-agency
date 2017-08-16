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
import { loadPage } from './PagesActions';
import { addRow } from './pageActions';
import Page from './Page';


const mapStateToProps = (state, router) => {
  return {
    initialValues: getPage(state, router.match.params.id),
    page: getPage(state, router.match.params.id),
    languages: getLanguages(state),
    isFetching: state.pages.isFetching,
    languagesIsFetching: state.languages.isFetching
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

  submit(values) {
    // print the form values to the console
    console.log(values);
  }

  render() {
    const { isFetching, page } = this.props;
    return (
      <div>
        <PageHeader text={'Cтраница:'} />
        <BackLink text="Назад к списку страниц" url="/pages" />
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
  { loadPage, addRow }
)(PageContainer));

export default PageContainer;