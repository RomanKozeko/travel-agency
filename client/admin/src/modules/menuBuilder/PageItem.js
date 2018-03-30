import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import AddIcon from 'material-ui-icons/Add';
import IconButton from 'material-ui/IconButton';

const styles = StyleSheet.create({
  hovered: {
    backgroundColor: 'black',
    height: '50px',
    color: 'red',
    zIndex: '100000'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '1px',
    background: '#fff',
    padding: '0px 20px',
    minHeight: '48px',
    boxShadow: '0 1px 2px 1px rgba(0,0,0,0.1)'
  },
  hoveredItem: {
    background: '#CFD8DC',
  }
});

const PageItem = ({ item, saveItem,menuItems }) => {
  const calculateMenuItemOrder = () => {
    const rootItems = menuItems.filter(item => !item.parent);
    return rootItems.length;
  };
  const handleSave = item => () => {
    item.order = calculateMenuItemOrder();
    saveItem(item, true);
  };

  return (
    <div>
      <li>
        <div className={css(styles.item)}>
          {item.title}
          <IconButton aria-label="Add">
            <AddIcon onClick={handleSave(item)}/>
          </IconButton>
        </div>
      </li>
    </div>
  )
};

export default PageItem;
