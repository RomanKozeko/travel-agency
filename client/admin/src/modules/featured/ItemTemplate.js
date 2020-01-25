import React from 'react'
import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';
import {StyleSheet, css} from 'aphrodite/no-important';
import AddTourPreviewPopup from '../tours/AddTourPreviewPopup';
import Button from 'material-ui/Button';
import SortableInput from '../ui-elements/SortableInput'

const styles = StyleSheet.create({
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
      textDecoration: 'none'
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
      background: 'rgba(0,0,0,.32)'
    },
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
      bottom: '0'
    }
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
  img: {
    width: '100%',
    marginBottom: '10px'
  },
  imgWrapper: {
    position: 'relative'
  },
  icon: {
    background: 'red',
    position: 'absolute',
    right: '0',
    top: '0'
  }

});

class ItemTemplate extends React.Component {

  state = {
    item: this.props.item ? {
      ...this.props.item,
      content: this.props.languages.map(langItem => {
        const contentItem = this.props.item.content.find(c => c.language === langItem._id);
        return {
          title: contentItem ? contentItem.title : '', 
          language: langItem._id
      }})} : {
      content: this.props.languages.map(langItem => ({
        title: '',
        language: langItem._id
      })),
      order: 0,
      preview: []
    },
    isNew: !this.props.item
  }

  onOrderChange = ({ target: { value }}) => {
    const item = {
      ...this.state.item,
      order: value
    }
    this.setState({ item })
  }

  onFieldChange = (langID) => ({ target: { value }}) => {
    const item = {
      ...this.state.item,
      content: this.state.item.content.map(contentItem => {
        if (contentItem.language === langID) {
          return {
            ...contentItem,
            title: value
          }
        }
        return contentItem
      })
    }

    this.setState({ item })
  }

  setLinkUrl = (linkUrl, [{ url }]) => {
    const item = {
      ...this.state.item,
      linkUrl: url
    }
    this.setState({ item })
  }

  saveItem = () => {
    this.boundActionCreators.saveItem(this.state.item, true)
  }

  addBackground = () => {
    const item = {
      ...this.state.item,
      preview: this.props.state.mediafiles.selected
    }
    this.setState({ item })
  }

  removePreview = () => {
    const item = {
      ...this.state.item,
      preview: []
    }
    this.setState({ item })
  }

  getImgPath = (preview) => {
    if (typeof(preview[0]) === "object") {
      return preview[0].path
    }
    return this.props.state.mediafiles.byIds[preview.toString()].path
  }

  render() {
    const { item, isNew } = this.state
    return (
      <div className={css(styles.item, styles.itemTmp)}>
        <TextField
          name='Order'
          fullWidth
          type='number'
          value={ item.order }
          className={css(styles.field)}
          onChange={ this.onOrderChange }
          label="Порядок в очереди"
          required
        />
        {
          item.content.map(contentItem =>
            <div key={ contentItem.language }>
              <TextField
                name='title'
                fullWidth
                value={ contentItem.title }
                className={css(styles.field)}
                onChange={this.onFieldChange(contentItem.language)}
                label={`Заголовок ${this.props.languages.find(lang => lang._id === contentItem.language).title }`}
                required
              />
            </div>
          )
        }

        <SortableInput
          selectedItems={this.props.pages.filter(page => page.url === item.linkUrl)}
          onFilterSelect={this.setLinkUrl}
          filterType='categories'
          items={this.props.pages}
          label='Ссылка на страницу'
        />

        <AddTourPreviewPopup addPreview={ this.addBackground } label="Добавить фон"/>
        {
          item.preview.length !== 0 &&
          <div className={css(styles.imgWrapper)}>
            <Icon className={css(styles.icon)} onClick={ this.removePreview }>delete</Icon>
            <img
              src={ this.getImgPath(item.preview) }
              className={css(styles.img)} alt=""
            />
          </div>
        }
        <Button className={css(styles.button)} onClick={ this.props.saveItem(item, isNew) } variant="raised" color="primary">
          Сохранить
        </Button>
        <Button
          className={css(styles.button)}
          variant="raised"
          color="secondary"
          onClick={ this.props.closeTemplate }
        >
          Отмена
        </Button>
      </div>
    )
  }
}

export default ItemTemplate