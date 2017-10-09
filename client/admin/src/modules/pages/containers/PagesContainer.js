import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, css} from 'aphrodite/no-important';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { CircularProgress } from 'material-ui/Progress';
import { load, deleteItems } from './../PagesReducer';
import { getPageWithItems } from '../../../rootReducer';
import PageHeader from '../../ui-elements/PageHeader';
import Portlet from '../../ui-elements/Portlet';
import Spinner from '../../ui-elements/Spinner';
import SortableTable from '../../ui-elements/sortableTable/SortableTable';

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

class PagesContainer extends React.Component {

  componentDidMount() {
    this.props.load();
  }

  render() {
    const { items, languages, isFetching } = this.props;

    const data = {
      headers: ['Заголовок', 'Описание', 'Язык'],
      items,
      languages,
      fields: [
        {
          name: 'title',
          isLink: true,
          linkPrefix: '/admin/pages/'
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
        <PageHeader text={'Все страницы'} />

        <Button
          raised
          color="primary"
          className="addBottomMargin"
          component={Link}
          to="/admin/pages/page?state=newPage"
        >
          Добавить страницу
        </Button>
        {isFetching
          ?
            <Spinner />
          :
            <Portlet isBordered={false}>
              <SortableTable data={data} deleteItems={this.props.deleteItems} />
            </Portlet>
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
