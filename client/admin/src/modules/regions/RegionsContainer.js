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
    content: state.regions.regionsContent,
    currPage: state.pages.currPage,
    pageCount: state.pages.pageCount,
    count: state.pages.count,
    languages: state.languages,
    isFetching: state.pages.isFetching
  };
};

class RegionsContainer extends React.Component {

  componentDidMount() {
    if (this.props.regions.length < 1) {
      this.props.loadRegions();
    }
  }

  render() {
    const { regions, content, languages, isFetching } = this.props;

    const data = {
      headers: ['Заголовок', 'Описание', 'Язык'],
      items: regions,
      languages,
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

RegionsContainer.propTypes = {
  loadRegions: PropTypes.func,
  regions: PropTypes.array,
  currPage: PropTypes.number,
  pageCount: PropTypes.number,
  count: PropTypes.number,
  isFetching: PropTypes.bool,
};

RegionsContainer = connect(
  mapStateToProps,
  { loadRegions }
)(RegionsContainer);

export default RegionsContainer;
