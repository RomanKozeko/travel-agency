import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import { compose, withStateHandlers } from 'recompose';
import PrefixLink from '../ui-elements/PrefixLink';
import { RightArrow } from '../ui-elements/icons/Icons';
import { theme } from '../../services/constans';


const styles = StyleSheet.create({
  menuItem: {
    position: 'relative',
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
    padding: '15px 20px',
    fontSize: '12px',
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
  linkInner: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    position: 'relative',
    textTransform: 'uppercase',
    color: '#222',
    transition: ['color'],
    transitionDuration: 300,
    fontWeight: 'bold',
    ':hover': {
      color: theme.colors.primary,
      textDecoration: 'none',
    },
    ':active': {
      color: theme.colors.primary,
      textDecoration: 'none',
    },
    ':focus': {
      color: theme.colors.primary,
      textDecoration: 'none',
    }
  },
  childrenContainer: {
    backgroundColor: 'white',
    listStyleType: 'none',
    padding: '0',
    background: 'rgba(0,0,0,0.15)',
    borderBottom: '1px solid rgba(0,0,0,0.1)',

    '@media (min-width: 1000px)': {
      position: 'absolute',
      top: '100%',
      left: '0',
      minWidth: '100%',
      boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
      background: '#fff',
      borderBottom: 'none',
    }
  },
  childItem: {
    padding: '15px 20px 15px 40px',
    fontSize: '12px',
    '@media (min-width: 1000px)': {
      padding: '15px 20px',
    }
  },
  rotate: {
    transform: 'rotateZ(90deg)'
  }
});

let MenuItem = ({ item, hover, mouseLeave, isHovered }) => (
  <li key={item._id} className={css(styles.menuItem)} onMouseEnter={ hover } onMouseLeave={ mouseLeave }>
    <PrefixLink className={css(styles.link)} to={`/pages/${item.page.url}`}>
      {item.page.content.title}
      {item.children && item.children.length ?
        <div className={css(styles.rotate)} ><RightArrow color="#222" width={20}/></div>
        :
        null
      }
    </PrefixLink>
    {item.children && isHovered &&
    <ul className={css(styles.childrenContainer)}>
      {item.children.map(child => (
          <li key={child._id} className={css(styles.childItem)}>
            <PrefixLink className={css(styles.linkInner)} to={`/pages/${child.page.url}`}>
              {child.page.content.title}
            </PrefixLink>
          </li>
        )
      )}
    </ul>
    }
  </li>
);

export default compose(
  withStateHandlers(
    ({}) => ({ isHovered: false }),
    {
      hover: () => () => ({
        isHovered: true
      }),
      mouseLeave: () => () => ({
        isHovered: false
      })
    }
  ),
)(MenuItem);
