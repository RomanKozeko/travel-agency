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
import {loadPages} from './PagesActions';
import {getPageWithItems} from '../../rootReducer';
import PageHeader from '../ui-elements/PageHeader';
import Portlet from '../ui-elements/Portlet';
import SortableTable from '../ui-elements/sortableTable/SortableTable';

const styles = StyleSheet.create({
  progress: {
    marginTop: '100px',
    textAlign: 'center'
  }
});

const mapStateToProps = (state) => {
  return {
    pages: getPageWithItems(state, state.pages.currPage),
    currPage: state.pages.currPage,
    pageCount: state.pages.pageCount,
    count: state.pages.count,
    isFetching: state.pages.isFetching
  };
};

class PagesContainer extends React.Component {

  componentDidMount() {
    this.props.loadPages();
  }

  render() {
    const { pages, isFetching } = this.props;

    const data = {
      headers: ['Заголовок', 'Описание', 'Язык'],
      pages,
      fields: [
        'title',
        'description',
        'language'
      ]
    };

    return (
      <div>
        <PageHeader text={'Все страницы'}/>
        {isFetching
          ?
          <div className={css(styles.progress)}>
            <CircularProgress size={50} />
          </div>
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
  pages: PropTypes.array,
  currPage: PropTypes.number,
  pageCount: PropTypes.number,
  count: PropTypes.number,
  isFetching: PropTypes.bool,
};

PagesContainer = connect(
  mapStateToProps,
  { loadPages }
)(PagesContainer);

export default PagesContainer;
