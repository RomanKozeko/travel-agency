import React from 'react'
import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';
import {StyleSheet, css} from 'aphrodite/no-important';
import AddTourPreviewPopup from '../tours/AddTourPreviewPopup';
import Button from 'material-ui/Button';
import SortableInput from '../ui-elements/SortableInput'

const styles = StyleSheet.create({
  item: {

  },

});

class ContactsTemplate extends React.Component {

  state = {
    item: this.props.item || {
      content: this.props.languages.map(langItem => ({
        title: '',
        description: '',
        language: langItem._id
      })),
      order: 0,
      preview: ''
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

  onFieldChange = (langID) => ({ target: { value, name }}) => {
    const item = {
      ...this.state.item,
      content: this.state.item.content.map(contentItem => {
        if (contentItem.language === langID) {
          return {
            ...contentItem,
            [name]: value
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
          item.content.map(contentItem => {
              const langTitle = this.props.languages.find(lang => lang._id === contentItem.language).title
              return (
                <div key={ contentItem.language } >
                  <TextField
                    name='title'
                    fullWidth
                    value={ contentItem.title }
                    className={css(styles.field)}
                    onChange={this.onFieldChange(contentItem.language)}
                    label={`Заголовок ${langTitle}`}
                    required
                  />
                  <TextField
                    name='description'
                    fullWidth
                    multiline
                    value={ contentItem.description }
                    className={css(styles.field)}
                    onChange={this.onFieldChange(contentItem.language)}
                    label={`Описание ${langTitle}`}
                    required
                  />
                </div>
              )
            }

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