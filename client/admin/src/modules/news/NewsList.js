import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import ItemTemplate from './ItemTemplate'

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    margin: '0 -15px',
    flexWrap: 'wrap',
    paddingBottom: '40px'
  },
  img: {
    maxWidth: '100%',
    minWidth: '100%'
  },
  item: {
    position: 'relative',
    display: 'block',
    color: '#222',
    backgroundColor: '#fff',
    borderRadius: '5px',
    overflow: 'hidden',
    transition: 'box-shadow .3s ease-in',
    marginBottom: '30px',
    boxShadow: '0px 30px 90px rgba(0,0,0,0.14)',
    ':hover': {
      textDecoration: 'none',
      color: '#222'
    },
  },
  column: {
    width: '100%',
    margin: '15px',
    '@media (min-width: 500px)': {
      width: 'calc(100% / 2 - 30px)',
    },
    '@media (min-width: 970px)': {
      width: 'calc(100% / 3 - 30px)',
    }
  },
  content: {
    padding: '20px'
  },
  title: {
    marginTop: '0'
  },
  itemAdd: {
    height: 'auto',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    ':before': {
      display: 'none'
    },
  },
  button: {
    width: '100%',
    marginBottom: '10px'
  },

  itemTmp: {
    height: 'auto',
    padding: '20px',
    display: 'block',
    backgroundColor: '#fff',
    ':before': {
      display: 'none'
    },
  },
  field: {
    marginBottom: '10px',
    width: '100%'
  },
  imgWrapper: {
    position: 'relative'
  },
  icon: {
    background: 'red',
    position: 'absolute',
    right: '0',
    top: '0'
  },
  toolbar: {
    color: '#fff',
    position: 'absolute',
    background: 'rgba(0,0,0,.25)',
    top: '0',
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  }
});


const itemsBycolumns = (items) => {
  return items.reduce((prev, curr, index) => {
    const columnIndex = index % 3
    if (!prev[columnIndex]) {
      prev[columnIndex] = [curr];
      return prev
    }
    prev[columnIndex].push(curr)
    return prev

  }, [])
}

const FeaturedList = ({
  toggleTemplate,
  closeTemplate,
  showTemplate,
  items,
  editItem,
  itemToEdit,
  deleteItems,
  ...props,
}) =>
  <div className={css(styles.wrapper)}>
    {
      itemsBycolumns(items.sort((a, b) => (a.order - b.order))).map(columns =>
        <div className={css(styles.column)}>
          {
            columns.map(item =>
            item._id === itemToEdit ?
              <ItemTemplate item={ item } closeTemplate={ closeTemplate }  { ...props } /> :
              <div className={css(styles.item)} key={ item._id }>
                <img className={css(styles.img)} src={ item.preview[0] && item.preview[0].path } alt=""/>
                <div className={css(styles.toolbar)}>
                  <Icon onClick={ deleteItems([item._id])}>delete</Icon>
                  <Icon onClick={ editItem(item._id) }>edit</Icon>
                  Порядок в очереди: { item.order }
                </div>
                <div className={css(styles.content)}>
                  <h3 className={css(styles.title)}>{ item.content[0].title }</h3>
                  <p>{ item.content[0].description }</p>
                </div>
              </div>
            )
          }
        </div>

      )
    }

    {
      showTemplate ?
      <div className={css(styles.column)}><ItemTemplate closeTemplate={ closeTemplate }  { ...props } /></div> :
      <div className={css(styles.column)}>
        <div className={css(styles.item, styles.itemAdd)}>
          <Button
            onClick={ toggleTemplate }
            className={css(styles.button)}
            raised
            color="primary"
          >
            Добавить
          </Button>
        </div>
      </div>
    }
  </div>



export default FeaturedList
