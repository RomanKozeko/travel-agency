import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadPages } from './PagesActions';
import { getPages } from '../../rootReducer';

import PagesList from './PagesList';

const mapStateToProps = (state) => {
  return {
    pages: getPages(state),
    isFetching: state.pages.isFetching,
    isFetched: state.pages.isFetched,
  };
};

class PagesContainer extends Component {
  componentDidMount() {
    const { pages, isFetched, loadPages } = this.props;

    if (!pages.length || !isFetched) {
      loadPages();
    }
  }

  render() {
    const { isFetching, isFetched, pages } = this.props;
    return (
      <div>
        {isFetched && !pages.length && <div>No pages</div>}
        {isFetching || !isFetched ?
          <h3>Loading...</h3>
          :
          <PagesList pages={pages} />
        }
      </div>
    );
  }
}

PagesContainer = connect(
  mapStateToProps,
  { loadPages }
)(PagesContainer);

export default PagesContainer;