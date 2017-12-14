import React from 'react'
import {Route, Link} from 'react-router-dom'
import {StyleSheet, css} from 'aphrodite/no-important'
import classNames from 'classnames'
import Icon from 'material-ui/Icon';

const styles = StyleSheet.create({
  sideBarMenu: {
    padding: '10px 0',
    borderRadius: '4px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 3px 2px rgba(0,0,0,.03)',
    listStyle: 'none'
  },
  item: {
    display: 'block'
  },
  link: {
    display: 'block',
    color: '#678098',
    margin: '1px 0 0',
    padding: '12px 15px',
    ':hover': {
      color: '#5b9bd1;',
      background: '#f2f6f9',
    }
  },
  active: {
    borderLeft: '3px solid #5C9ACF',
    marginLeft: '-3px',
    color: '#5b9bd1;',
    background: '#f2f6f9'
  },
  icon: {
    verticalAlign: 'bottom',
    marginRight: '8px'
  }
});

const CustomLink = ({label, to, icon}) => (
  <Route path={to} children={({match}) => (
    <Link className={classNames({
      [css(styles.link)]: !match,
      [css(styles.link, styles.active)]: match
    })} to={to}>
      <Icon className={css(styles.icon)}>{icon}</Icon>
      {label}
    </Link>
  )}/>
);
const SideBar = () => (
  <ul className={css(styles.sideBarMenu)}>
    <li className={css(styles.item)}><CustomLink to="/admin/tours" label="Туры" icon="library_books"/></li>
    <li className={css(styles.item)}><CustomLink to="/admin/categories" label="Категории" icon="widgets"/></li>
    <li className={css(styles.item)}><CustomLink to="/admin/regions" label="Регионы" icon="place"/></li>
    <li className={css(styles.item)}><CustomLink to="/admin/food" label="Типы питания" icon="local_dining"/></li>
    <li className={css(styles.item)}>
      <CustomLink to="/admin/show-places" label="Достопримечательности" icon="account_balance"/>
    </li>
    <li className={css(styles.item)}><CustomLink to="/admin/hotels" label="Отели" icon="business"/></li>
    <li className={css(styles.item)}><CustomLink to="/admin/pages" label="Страницы" icon="web"/></li>
    <li className={css(styles.item)}><CustomLink to="/admin/lang" label="Языки" icon="language"/></li>
    <li className={css(styles.item)}><CustomLink to="/admin/mediaFiles" label="Картинки" icon="image"/></li>
    <li className={css(styles.item)}><CustomLink to="/admin/settings" label="Settings" icon="settings"/></li>
  </ul>
);

export default SideBar;
