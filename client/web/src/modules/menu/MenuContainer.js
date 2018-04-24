import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import PrefixLink from '../ui-elements/PrefixLink';
import { theme } from '../../services/constans';
import { fetchMenu } from './menuReducer';
import { getMenu } from '../../rootReducer';
import MenuItem from './MenuItem';


const styles = StyleSheet.create({
  menu: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    listStyle: 'none',
    margin: '0 0 0 40px',
    flexGrow: '1',
    '@media (max-width: 600px)': {
      margin: '0',
      display: 'none'
    }
  },
  menuItem: {
    height: '100%'
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    position: 'relative',
    textTransform: 'uppercase',
    borderBottom: '3px solid transparent',
    color: '#222',
    transition: ['color'],
    transitionDuration: 300,
    fontWeight: 'bold',
    ':hover': {
      color: theme.colors.primary,
      textDecoration: 'none',
      borderBottom: `3px solid ${theme.colors.primary}`,
    },
    ':active': {
      color: theme.colors.primary,
      textDecoration: 'none',
      borderBottom: `3px solid ${theme.colors.primary}`,
    },
    ':focus': {
      color: theme.colors.primary,
      textDecoration: 'none',
      borderBottom: `3px solid ${theme.colors.primary}`,
    }
  },
});

const findRootNodesAndPopulate = items => (
  items
    .map(item => ({ ...item, children: [...item.children] }))
    .filter(item => !item.parent)
    .map(item => {
      if (item.children) {
        item.children = item.children.map(childId => items.find(item => item._id === childId));
      }
      return item;
    })
);

let MenuContainer = ({ menuItems }) => (
    <ul className={css(styles.menu)}>
      <li className={css(styles.menuItem)}><PrefixLink className={css(styles.link)} to="/">Главная</PrefixLink></li>
      <li className={css(styles.menuItem)}><PrefixLink className={css(styles.link)} to="/tours">Поиск туров</PrefixLink></li>
      {findRootNodesAndPopulate(menuItems).map(item => (
        <MenuItem item={item} />
      ))}
      <li className={css(styles.menuItem)}><PrefixLink className={css(styles.link)} to="/contacts">Контакты</PrefixLink></li>
    </ul>
);

const mapStateToProps = (state) => ({
  menuItems: getMenu(state),
  isFetching: state.menu.isFetching,
  isFetched: state.menu.isFetched,
});

MenuContainer = compose(
  connect(
    mapStateToProps,
    { fetchMenu }
  ),
  lifecycle({
    componentDidMount() {
      if (!this.props.isFetched) {
        this.props.fetchMenu();
      }
    },
  }),
)(MenuContainer);

export default MenuContainer
