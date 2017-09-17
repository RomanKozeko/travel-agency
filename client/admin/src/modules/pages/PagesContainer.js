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
import {CircularProgress} from 'material-ui/Progress';
import {loadPages, deletePages} from './PagesActions';
import {getPageWithItems} from '../../rootReducer';
import PageHeader from '../ui-elements/PageHeader';
import Portlet from '../ui-elements/Portlet';
import Spinner from '../ui-elements/Spinner';
import SortableTable from '../ui-elements/sortableTable/SortableTable';

const mapStateToProps = (state) => {
  return {
    items: getPageWithItems(state, state.pages.currPage),
    content: state.pages.pagesContent,
    currPage: state.pages.currPage,
    pageCount: state.pages.pageCount,
    count: state.pages.count,
    isFetching: state.pages.isFetching,
    languages: state.languages
  };
};

class PagesContainer extends React.Component {

  componentDidMount() {
    this.props.loadPages();
  }

  render() {
    const { items, content, languages, isFetching } = this.props;

    const data = {
      headers: ['Заголовок', 'Описание', 'Язык'],
      items,
      content,
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
        >
          <Link to="/admin/pages/page?state=newPage" style={{color: '#fff'}}>Добавить страницу</Link>

        </Button>
        {isFetching
          ?
            <Spinner />
          :
            <Portlet isBordered={false}>
              <SortableTable data={data} deletePages={this.props.deletePages} />
            </Portlet>
        }
      </div>
    );
  }
}

PagesContainer.propTypes = {
  loadPages: PropTypes.func,
  deletePages: PropTypes.func,
  items: PropTypes.array,
  currPage: PropTypes.number,
  pageCount: PropTypes.number,
  count: PropTypes.number,
  isFetching: PropTypes.bool,
};

PagesContainer = connect(
  mapStateToProps,
  { loadPages, deletePages }
)(PagesContainer);

export default PagesContainer;
