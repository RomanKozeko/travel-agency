import React from 'react';
import {css, StyleSheet} from 'aphrodite/no-important';
import ItemContentToolBar from './ItemContentToolBar';
import AddPageItemMenu from './AddPageItemMenu';
import Chip from 'material-ui/Chip';

const styles = StyleSheet.create({
  itemContentButton: {
    color: '#aeaeae',
    cursor: 'pointer',
    ':hover': {
      color: '#3f51b5'
    }
  },
  itemContentToolbar: {
    position: 'absolute',
    top: '0',
    right: '0',
  },
  chipWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  filtersHeader: {
    textAlign: 'center'
  },
  chipTag: {
    margin: '2px'
  }
});

const FiltersTags = ({filters}) => {
  let allFilters = [];
  for (const filterType in filters) {
    if (filters.hasOwnProperty(filterType)) {
      allFilters = [...allFilters, ...filters[filterType]]
    }
  }

  return (<div className={css(styles.chipWrapper)}>
    Показывать туры:
    {allFilters.map(item => (
      <Chip
        className={css(styles.chipTag)}
        key={item._id + 1}
        label={item.content[0].title}
      />
    ))}
  </div>)
};

const ItemContentType = ({
  item,
  removeRowItem,
  editRowItem,
  openHtmlEditor,
  openAddToursListPopup
}) => {
  switch (item.type) {
    case 'content': {
      return <div className={css(styles.rowInnerContent)}>
        <ItemContentToolBar {...{ item, removeRowItem, editRowItem }} />
        <span dangerouslySetInnerHTML={{ __html: item.content }} />
      </div>
    }
    case 'tours': {
      return <div className={css(styles.rowInnerContent)}>
        <ItemContentToolBar {...{ item, removeRowItem, editRowItem }} />
        <h4 className={css(styles.filtersHeader)}>Туры</h4>
        <FiltersTags filters={item.filtersObj} />
      </div>
    }
    default: {
      return <AddPageItemMenu
        item={item}
        openHtmlEditor={openHtmlEditor}
        openAddToursListPopup={openAddToursListPopup}
      />
    }
  }
};

export default ItemContentType