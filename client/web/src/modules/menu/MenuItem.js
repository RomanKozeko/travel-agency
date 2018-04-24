import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import { compose, withStateHandlers } from 'recompose';
import PrefixLink from '../ui-elements/PrefixLink';
import { RightArrow } from '../ui-elements/icons/Icons';
import { theme } from '../../services/constans';


const styles = StyleSheet.create({
  menuItem: {
    position: 'relative',
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
  childrenContainer: {
    backgroundColor: 'white',
    listStyleType: 'none',
    padding: '0',
    position: 'absolute',
  },
  childItem: {
    padding: '15px 20px'
  }
});

let MenuItem = ({ item, hover, mouseLeave, isHovered }) => (
  <li key={item._id} className={css(styles.menuItem)} onMouseEnter={ hover } onMouseLeave={ mouseLeave }>
    <PrefixLink className={css(styles.link)} to={`/pages/${item.page.url}`}>
      {item.page.content.title}
      {item.children && item.children.length ?
        <RightArrow color={ theme.colors.primary } width={20}/>
        :
        null
      }
    </PrefixLink>
    {item.children && isHovered &&
    <ul className={css(styles.childrenContainer)}>
      {item.children.map(child => (
          <li key={child._id} className={css(styles.childItem)}>
            <PrefixLink className={css(styles.link)} to={`/pages/${child.page.url}`}>
              {child.page.content.title}
            </PrefixLink>
          </li>
        )
      )}
    </ul>
    }
  </li>
);

MenuItem = compose(
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

export default MenuItem
