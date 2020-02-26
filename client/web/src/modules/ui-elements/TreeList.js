import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import CheckBox from '../ui-elements/checkbox/CheckBox';
import { compose, withStateHandlers } from 'recompose';
import { RightArrow } from '../ui-elements/icons/Icons';

const styles = StyleSheet.create({
  ul: {
    listStyle: 'none',
    paddingLeft: 0,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#fff',
  },
  innerItem: {
    marginLeft: '28px',
  },
  ulChild: {
    listStyle: 'none',
    paddingLeft: '30px',
  },
  rotate: {
    transform: 'rotateZ(90deg)',
    display: 'inline-block',
  },
  panel: {
    boxShadow: 'none',
    fontSize: '24px',
  },
  pointer: {
    cursor: 'pointer',
  },
});

const populateChildren = (entities, parents) => {
  parents.forEach(parent => {
    entities.forEach(item => {
      if (item.parent === parent._id) {
        if (!parent.hasOwnProperty('children')) {
          parent.children = [];
        }
        parent.children.push({ ...item });
      }
    });

    if (parent.children) {
      populateChildren(entities, parent.children);
    }
  });

  return parents;
};

const populateTree = entities => {
  const parents = [];

  entities.forEach(item => {
    if (!item.parent) {
      parents.push({ ...item });
    }
  });

  return populateChildren(entities, parents);
};

const TreeList = ({ items, onChange }) => {
  const tmp = JSON.parse(JSON.stringify(items));
  const populatedItems = populateTree([...tmp]);

  return (
    <ul className={css(styles.ul)}>
      {populatedItems.map(item => (
        <TreeItem item={item} onChange={onChange} />
      ))}
    </ul>
  );
};

let TreeItem = ({ item, onChange, togglePanel, isOpen, inner }) => (
  <div>
    <div className={css(styles.item)}>
      <li key={item._id} className={inner ? css(styles.innerItem) : null}>
        <CheckBox
          onChange={() => onChange('regions', item._id)}
          label={item.content ? item.content.title : item.content}
          name={item.content ? item.content.title : item.content}
          block={true}
        />
      </li>
      {item.children && (
        <div
          onClick={togglePanel}
          className={
            isOpen ? css(styles.rotate, styles.pointer) : css(styles.pointer)
          }
        >
          <RightArrow color="#222" width={20} />
        </div>
      )}
    </div>
    {item.children &&
      isOpen &&
      item.children.map(child => (
        <TreeItem item={child} onChange={onChange} inner={true} />
      ))}
  </div>
);

TreeItem = compose(
  withStateHandlers(() => ({ isOpen: false }), {
    togglePanel: ({ isOpen }) => () => ({ isOpen: !isOpen }),
  })
)(TreeItem);

export default TreeList;
