import React from 'react';
import {css, StyleSheet} from 'aphrodite/no-important';
import ItemContentToolBar from './ItemContentToolBar';
import AddPageItemMenu from './AddPageItemMenu';
import FiltersTags from './FiltersTags';
import Icon from 'material-ui/Icon';
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
  imgWrap: {
    display:'flex',
    flexWrap: 'wrap'
  },
  img: {
    maxWidth: '100%'
  },
  filtersHeader: {
    textAlign: 'center'
  },
  chipTag: {
    margin: '2px'
  },
  imgContent: {
    position: 'relative',
    width: '25%'
  },
  icon: {
    color: '#fff',
    background: 'red',
    position: 'absolute',
    right: '0',
    top: '0'
  }
});

const ItemContentType = ({
  item,
  removeRowItem,
  editRowItem,
  openHtmlEditor,
  openAddToursListPopup,
  openMediaPopup,
  rowId,
  mediafilesByIds,
  deleteMediaItem,
  saveRow
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
    case '@hotelSearch': {
      return <div className={css(styles.rowInnerContent)}>
        <ItemContentToolBar {...{ item, removeRowItem, editRowItem }} />
        <h4 className={css(styles.filtersHeader)}>Форма поиска отелей</h4>
      </div>
    }
    case '@toursSearch': {
      return <div className={css(styles.rowInnerContent)}>
        <ItemContentToolBar {...{ item, removeRowItem, editRowItem }} />
        <h4 className={css(styles.filtersHeader)}>Форма поиска туров</h4>
      </div>
    }
    case '@showPlacesSearch': {
    return <div className={css(styles.rowInnerContent)}>
      <ItemContentToolBar {...{ item, removeRowItem, editRowItem, rowId }} />
      <h4 className={css(styles.filtersHeader)}>Форма достопримечательностей</h4>
    </div>
    }
    case '@gallery': {
      const imgs = item.images.map(id => mediafilesByIds[id])
      return <div className={css(styles.rowInnerContent)}>
        <ItemContentToolBar {...{ item, removeRowItem, editRowItem, rowId }} />
        <h4 className={css(styles.filtersHeader)}>Картинки</h4>
        <div className={css(styles.imgWrap)}>
          {
            imgs.map(img => <div className={css(styles.imgContent)}>
              <Icon className={css(styles.icon)} onClick={() => deleteMediaItem({ imageIdToRemove: img._id, rowId })} >delete</Icon>
                <img
                className={css(styles.img)}
                src={ img.path }
                alt=""
              />
            </div>)
          }
        </div>
        <AddPageItemMenu
          item={item}
          showGallaryOnly={true}
          rowId={rowId}
          openHtmlEditor={openHtmlEditor}
          openAddToursListPopup={openAddToursListPopup}
          openMediaPopup={openMediaPopup}
        />

      </div>
    }

    case '@contactForm': {
      return <div>
        <ItemContentToolBar {...{ item, removeRowItem, editRowItem, rowId }} />
        <h3>Контактная форма</h3>
      </div>
    }

    default: {
      return <AddPageItemMenu
        item={item}
        rowId={rowId}
        openHtmlEditor={openHtmlEditor}
        openAddToursListPopup={openAddToursListPopup}
        openMediaPopup={openMediaPopup}
        saveRow={saveRow}
      />
    }
  }
};

export default ItemContentType