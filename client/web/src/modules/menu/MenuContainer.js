import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import { compose, lifecycle, withStateHandlers } from 'recompose';
import { connect } from 'react-redux';
import PrefixLink from '../ui-elements/PrefixLink';
import { theme } from '../../services/constans';
import { fetchMenu } from './menuReducer';
import { getMenu } from '../../rootReducer';
import MenuItem from './MenuItem';


const styles = StyleSheet.create({
  menu: {
    display: 'none',
    position: 'absolute',
    left: '0',
    top: '100%',
    width: '100%',
    background: '#fff',
    listStyle: 'none',
    margin: '0',
    padding: '0',
    borderTop: '1px solid #e9e9e9',
    '@media (min-width: 1000px)': {
      borderTop: 'none',
      position: 'static',
      height: '100%',
      display: 'flex !important',
      flexGrow: '1',
      justifyContent: 'space-between',
      alignItems: 'center',
    }
  },
  menuItem: {
    height: '100%',
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
    fontSize: '12px',
    padding: '15px 20px',
    '@media (min-width: 1000px)': {
      padding: '5px',
    },
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
  menuTrigger: {
    position: 'absolute',
    right: '0',
    top: '50%',
    transform: 'translateY(-50%)',
    '@media (min-width: 1000px)': {
      display: 'none'
    }
  },
  wrap: {
    width: '100%'
  }
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
    .sort((a, b) => a.order - b.order)
);

let MenuContainer = ({ menuItems, onMenuTriggerClick, isOpen }) => (
  <div className={css(styles.wrap)}>
    {
      isOpen ?
        <svg fill="#333" height="60" viewBox="0 0 24 24" width="60" xmlns="http://www.w3.org/2000/svg" className={css(styles.menuTrigger)} onClick={ onMenuTriggerClick }>
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
        :
        <svg fill="#333" height="60" viewBox="0 0 24 24" width="60" xmlns="http://www.w3.org/2000/svg" className={css(styles.menuTrigger)} onClick={ onMenuTriggerClick }>
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"/>
        </svg>
    }

    <ul className={css(styles.menu)} style={{ display: isOpen ? 'block' : 'none' }}>
      <li className={css(styles.menuItem)}><PrefixLink className={css(styles.link)} to="/">{ window.TA.content.main }</PrefixLink></li>
      {findRootNodesAndPopulate(menuItems).map(item => (
        <MenuItem item={item} />
      ))}
    </ul>
  </div>
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
  withStateHandlers(
    ({}) => ({ isOpen: false }),
    {
      onMenuTriggerClick: ({ isOpen }) => () => ({
        isOpen: !isOpen
      })
    }
  ),
)(MenuContainer);

export default MenuContainer
