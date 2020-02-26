import React from 'react';
import { compose } from 'redux';
import { StyleSheet, css } from 'aphrodite/no-important';
import { DropTarget, DragSource } from 'react-dnd';
import TreeItems from './TreeItems';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';

const styles = StyleSheet.create({
  hovered: {
    backgroundColor: 'black',
    height: '50px',
    color: 'red',
    zIndex: '100000',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '1px',
    background: '#fff',
    padding: '0px 20px',
    minHeight: '48px',
    boxShadow: '0 1px 2px 1px rgba(0,0,0,0.1)',
  },
  hoveredItem: {
    background: '#CFD8DC',
  },
});

const ItemTypes = {
  menuItem: 'menuItem',
};

const MenuItemTarget = {
  hover(props, monitor) {
    const dragItem = monitor.getItem();

    if (props.updateEntities && dragItem._id !== props.item._id) {
      props.updateEntities(dragItem, props.item, 'sibling');
    } else if (props.updateEntities && dragItem._id === props.item._id) {
      props.updateEntities(dragItem, props.item, 'child');
    }
  },
};

const collectDrop = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  monitorItem: monitor.getItem(),
});

const collectDrag = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const menuItemSource = {
  beginDrag(props) {
    return props.item;
  },
  endDrag(props, monitor) {
    const dragItem = monitor.getItem();
    const didDrop = monitor.didDrop();

    if (!didDrop && props.updateEntities) {
      props.updateEntities(dragItem, null, 'root');
    }
  },
};

const MenuItemDnDContainer = ({
  item,
  connectDropTarget,
  connectDragSource,
  monitorItem,
  updateEntities,
  deleteEntity,
  pages,
}) => {
  const hovered = monitorItem && monitorItem._id === item._id;
  let relatedPage;
  if (pages) relatedPage = pages.find(page => item.page === page._id);

  return (
    <div>
      {connectDragSource(
        connectDropTarget(
          <li key={item._id}>
            <div
              className={
                hovered
                  ? css(styles.item, styles.hoveredItem)
                  : css(styles.item)
              }
            >
              {relatedPage && relatedPage.content[0].title}
              {!item.children.length && item._id !== 'fake' && deleteEntity && (
                <IconButton aria-label="Delete">
                  <DeleteIcon onClick={() => deleteEntity([item._id])} />
                </IconButton>
              )}
            </div>
          </li>
        )
      )}
      {item.children.length > 0 && (
        <TreeItems
          tree={item.children}
          deleteEntity={deleteEntity}
          updateEntities={updateEntities}
          pages={pages}
        />
      )}
    </div>
  );
};

const enhance = compose(
  DropTarget(ItemTypes.menuItem, MenuItemTarget, collectDrop),
  DragSource(ItemTypes.menuItem, menuItemSource, collectDrag)
);

export default enhance(MenuItemDnDContainer);
