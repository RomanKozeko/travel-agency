import React from 'react'
import {StyleSheet, css} from 'aphrodite/no-important';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

const styles = StyleSheet.create({
  wrapper: {
    listStyle: 'none',
    marginBottom: '0'
  },
  listWrapper: {
  },
  li: {
    marginTop: '1px',
    background: '#fff',
    paddingLeft: '15px',
    boxShadow: '0 1px 2px 1px rgba(0,0,0,0.1)'
  }
});

const TreeList = ({items, selectItems, selectedItems}) => {
  return(
    <div className={css(styles.listWrapper)}>
      {items.map(item => (
        <ul key={item._id} className={css(styles.wrapper)}>
          <li className={css(styles.li)}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedItems.indexOf(item._id) > -1}
                  value={item._id}
                  onChange={selectItems}
                />
              }
              label={item.content[0].title}
            />
          </li>
          {item.childrens &&
          <TreeList
            items={item.childrens}
            selectItems={selectItems}
            selectedItems={selectedItems}
          />
          }
        </ul>
      ))
      }
    </div>
  );
}

export default TreeList