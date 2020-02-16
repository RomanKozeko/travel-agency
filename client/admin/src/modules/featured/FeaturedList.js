import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import ItemTemplate from './ItemTemplate';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    margin: '0 -15px',
    flexWrap: 'wrap',
    paddingBottom: '40px',
  },
  item: {
    height: '220px',
    margin: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    backgroundSize: 'cover',
    borderRadius: '5px',
    width: '100%',
    transition: 'box-shadow .3s ease-in',
    boxShadow: '0px 30px 90px rgba(0,0,0,0.14)',
    overflow: 'hidden',
    ':hover': {
      textDecoration: 'none',
    },
    '@media (min-width: 500px)': {
      width: 'calc(100% / 2 - 30px)',
    },
    '@media (min-width: 970px)': {
      width: 'calc(100% / 3 - 30px)',
    },
    position: 'relative',
    color: '#fff',
    ':before': {
      content: '""',
      top: 0,
      left: 0,
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,.32)',
    },
  },
  itemAdd: {
    height: 'auto',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    ':before': {
      display: 'none',
    },
  },
  button: {
    width: '100%',
    marginBottom: '10px',
  },
  title: {
    color: '#fff',
    textTransform: 'uppercase',
    textAlign: 'center',
    position: 'relative',
    paddingBottom: '20px',
    paddingLeft: '10px',
    paddingRight: '10px',
    ':after': {
      content: '""',
      width: '100px',
      borderTop: '5px solid #fff',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      bottom: '0',
    },
  },
  itemTmp: {
    height: 'auto',
    padding: '20px',
    display: 'block',
    backgroundColor: '#fff',
    ':before': {
      display: 'none',
    },
  },
  field: {
    marginBottom: '10px',
    width: '100%',
  },
  img: {
    width: '100%',
    marginBottom: '10px',
  },
  imgWrapper: {
    position: 'relative',
  },
  icon: {
    background: 'red',
    position: 'absolute',
    right: '0',
    top: '0',
  },
  toolbar: {
    position: 'absolute',
    background: 'rgba(0,0,0,.25)',
    top: '0',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
});

const FeaturedList = ({
  toggleTemplate,
  closeTemplate,
  showTemplate,
  items,
  editItem,
  itemToEdit,
  deleteItems,
  ...props
}) => (
  <div className={css(styles.wrapper)}>
    {items
      .sort((a, b) => a.order - b.order)
      .map(item =>
        item._id === itemToEdit ? (
          <ItemTemplate item={item} closeTemplate={closeTemplate} {...props} />
        ) : (
          <div
            key={item._id}
            className={css(styles.item)}
            style={{
              backgroundImage: `url(${item.preview[0] &&
                item.preview[0].path})`,
            }}
          >
            <div className={css(styles.toolbar)}>
              <Icon onClick={deleteItems([item._id])}>delete</Icon>
              <Icon onClick={editItem(item._id)}>edit</Icon>
              Порядок в очереди: {item.order}
            </div>

            <h3 className={css(styles.title)}>{item.content[0].title}</h3>
          </div>
        )
      )}

    {showTemplate ? (
      <ItemTemplate closeTemplate={closeTemplate} {...props} />
    ) : (
      <div className={css(styles.item, styles.itemAdd)}>
        <Button
          onClick={toggleTemplate}
          className={css(styles.button)}
          variant="raised"
          color="primary"
        >
          Добавить
        </Button>
      </div>
    )}
  </div>
);

export default FeaturedList;
