import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, css} from 'aphrodite/no-important';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import {CircularProgress} from 'material-ui/Progress';
import {loadRegions} from './RegionsActions';
import {getPageWithItems} from '../../rootReducer';
import { getRegions } from './RegionsReducer';
import PageHeader from '../ui-elements/PageHeader';
import Portlet from '../ui-elements/Portlet';
import Spinner from '../ui-elements/Spinner';
import SortableTable from '../ui-elements/sortableTable/SortableTable';

const mapStateToProps = (state) => {
  return {
    regions: getRegions(state.regions, state.pages.currPage),
    currPage: state.pages.currPage,
    pageCount: state.pages.pageCount,
    count: state.pages.count,
    isFetching: state.pages.isFetching
  };
};

class PagesContainer extends React.Component {

  componentDidMount() {
    this.props.loadRegions();
  }

  render() {
    const { regions, isFetching } = this.props;

    const data = {
      headers: ['Заголовок', 'Описание', 'Язык'],
      items: regions,
      fields: [
        {
          name: 'title',
          isLink: true,
          linkPrefix: '/admin/regions/'
        },
        {
          name: 'description',
          isLink: false
        },
        {
          name: 'language',
          isLink: false
        }
      ]
    };

    return (
      <div>
        <PageHeader text={'Все регионы'} />
        {isFetching
          ?
            <Spinner />
          :
            <Portlet isBordered={false}>
              <SortableTable data={data} />
            </Portlet>
        }
      </div>
    );
  }
}

PagesContainer.propTypes = {
  loadPages: PropTypes.func,
  regions: PropTypes.array,
  currPage: PropTypes.number,
  pageCount: PropTypes.number,
  count: PropTypes.number,
  isFetching: PropTypes.bool,
};

PagesContainer = connect(
  mapStateToProps,
  { loadRegions }
)(PagesContainer);

export default PagesContainer;
