import React from 'react';
import { Route, Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite/no-important';
import classNames from 'classnames';
import Icon from 'material-ui/Icon';

const styles = StyleSheet.create({
  sideBarMenu: {
    padding: '10px 0',
    borderRadius: '4px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 3px 2px rgba(0,0,0,.03)',
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    '@media (min-width: 1280px)': {
      display: 'block',
    },
  },
  item: {
    display: 'block',
  },
  link: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#678098',
    margin: '1px 0 0',
    padding: '5px',
    fontSize: '0',
    ':hover': {
      color: '#5b9bd1;',
      background: '#f2f6f9',
    },
    '@media (min-width: 830px)': {
      fontSize: 'inherit',
    },
    '@media (min-width: 1280px)': {
      display: 'block',
      padding: '12px 15px',
    },
  },
  active: {
    color: '#5b9bd1;',
    background: '#f2f6f9',
    '@media (min-width: 1280px)': {
      borderLeft: '3px solid #5C9ACF',
      marginLeft: '-3px',
    },
  },
  icon: {
    verticalAlign: 'bottom',
    display: 'block',
    '@media (min-width: 1280px)': {
      display: 'inline-block',
      marginRight: '8px',
    },
  },
});

const CustomLink = ({ label, to, icon }) => (
  <Route
    path={to}
    children={({ match }) => (
      <Link
        className={classNames({
          [css(styles.link)]: !match,
          [css(styles.link, styles.active)]: match,
        })}
        to={to}
      >
        <Icon className={css(styles.icon)}>{icon}</Icon>
        {label}
      </Link>
    )}
  />
);
const SideBar = () => (
  <ul className={css(styles.sideBarMenu)}>
    <li className={css(styles.item)}>
      <CustomLink to="/admin/tours" label="Туры" icon="library_books" />
    </li>
    <li className={css(styles.item)}>
      <CustomLink
        to="/admin/categories"
        label="Категории туров"
        icon="widgets"
      />
    </li>
    <li className={css(styles.item)}>
      <CustomLink to="/admin/regions" label="Регионы" icon="place" />
    </li>
    <li className={css(styles.item)}>
      <CustomLink to="/admin/food" label="Типы питания" icon="local_dining" />
    </li>
    <li className={css(styles.item)}>
      <CustomLink
        to="/admin/showplaces"
        label="Достопримечательности"
        icon="account_balance"
      />
    </li>
    <li className={css(styles.item)}>
      <CustomLink to="/admin/hotels" label="Отели" icon="business" />
    </li>
    <li className={css(styles.item)}>
      <CustomLink to="/admin/pages" label="Страницы" icon="web" />
    </li>
    <li className={css(styles.item)}>
      <CustomLink to="/admin/lang" label="Языки" icon="language" />
    </li>
    <li className={css(styles.item)}>
      <CustomLink to="/admin/mediaFiles" label="Картинки" icon="image" />
    </li>
    <li className={css(styles.item)}>
      <CustomLink to="/admin/menu" label="Меню" icon="assignment" />
    </li>
    <li className={css(styles.item)}>
      <CustomLink to="/admin/home" label="Главная страница" icon="home" />
    </li>
    <li className={css(styles.item)}>
      <CustomLink to="/admin/contacts" label="Контакты" icon="local_phone" />
    </li>
    <li className={css(styles.item)}>
      <CustomLink to="/admin/settings" label="Настройки" icon="settings" />
    </li>
    <li className={css(styles.item)}>
      <CustomLink to="/admin/social" label="Соц. сети" icon="group" />
    </li>
  </ul>
);

export default SideBar;
