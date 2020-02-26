import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import MenuItemDnD from './MenuItemDnD';

const styles = StyleSheet.create({
  ul: {
    listStyleType: 'none',
  },
});

export const TreeItems = props => (
  <ul className={css(styles.ul)}>
    {props.tree.map(item => (
      <MenuItemDnD {...props} item={item} />
    ))}
  </ul>
);

export default TreeItems;
