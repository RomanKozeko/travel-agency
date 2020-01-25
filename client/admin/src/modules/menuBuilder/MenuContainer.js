import React, { Component } from 'react';
import {connect} from 'react-redux';
import {StyleSheet, css} from 'aphrodite/no-important';
import { load } from '../pages/PagesReducer';
import { getPages, getMenu } from '../../rootReducer';
import { loadItems, updateEntities, deleteItems, saveItems, saveItem } from './menuReducer';
import Spinner from '../ui-elements/Spinner';
import PageHeader from '../ui-elements/PageHeader';
import PagesList from './PagesList';
import MenuList from './MenuList';
import MenuForm from './MenuForm';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    transform: 'scaleY(1)'
  },
  pagesList: {
    width: '30%'
  },
  menuList: {
    width: '65%'
  },
  center: {
    textAlign: 'center'
  }
});

const mapStateToProps = (state) => ({
    pages: getPages(state, state.pages.currPage),
    menuItems: getMenu(state),
    isFetching: state.menu.isFetching,
    isSaving: state.menu.isSaving,
    isMenuFetched: state.entities.menu.isFetched,
    isPagesFetched: state.pages.isFetched,
  }
);

class MenuContainer extends Component {
  componentDidMount() {
    if (!this.props.isPagesFetched) {
      this.props.loadPages();
    }
    if (!this.props.isMenuFetched) {
      this.props.loadMenu();
    }
  }

  render() {
    const { isFetching, pages, menuItems } = this.props;
    const filteredPages = pages.filter(pageItem => !menuItems.find(menuItem => menuItem.page === pageItem._id));

    return (
      <div>
      {isFetching ?
        <Spinner/>
        :
        <div className={css(styles.wrapper)}>
          <div className={css(styles.pagesList)}>
            <div className={css(styles.center)}>
              <PageHeader text={'Доступные страницы'} />
            </div>
            <PagesList items={filteredPages} {...this.props} />
          </div>
          <div className={css(styles.menuList)}>
            <div className={css(styles.center)}>
              <PageHeader text={'Меню'} />
            </div>
            <MenuList {...this.props} />
            <MenuForm {...this.props} />
          </div>
        </div>
      }
      </div>
    );
  }
}

MenuContainer = connect(
  mapStateToProps,
  {
    loadPages: load,
    loadMenu: loadItems,
    updateEntities,
    deleteEntity: deleteItems,
    saveMenu: saveItems,
    saveItem
  }
)(MenuContainer);

export default MenuContainer;
