import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { load, deleteItems } from './../PagesReducer';
import { getPageWithItems } from '../../../rootReducer';
import Spinner from '../../ui-elements/Spinner';
import PagesList from '../components/PagesList'

const mapStateToProps = (state) => {
  return {
    items: getPageWithItems(state, state.pages.currPage),
    currPage: state.pages.currPage,
    pageCount: state.pages.pageCount,
    count: state.pages.count,
    isFetching: state.pages.isFetching,
    isFetched: state.pages.isFetched,
    languages: state.languages
  };
};

class PagesContainer extends Component {

  componentDidMount() {
    if (!this.props.isFetched) {
      this.props.load();
    }
  }

  render() {
    const { isFetching } = this.props;

    return (
      <div>
	      {isFetching ?
          <Spinner/>
		      :
          <PagesList
			      {...this.props}
          />
	      }
      </div>
    );
  }
}

PagesContainer.propTypes = {
  load: PropTypes.func,
  deleteItems: PropTypes.func,
  items: PropTypes.array,
  currPage: PropTypes.number,
  pageCount: PropTypes.number,
  count: PropTypes.number,
  isFetching: PropTypes.bool,
};

PagesContainer = connect(
  mapStateToProps,
  { load, deleteItems }
)(PagesContainer);

export default PagesContainer;
