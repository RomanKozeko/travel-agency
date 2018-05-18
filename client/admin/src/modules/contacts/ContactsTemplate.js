import React from 'react'
import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';
import {StyleSheet, css} from 'aphrodite/no-important';
import AddTourPreviewPopup from '../tours/AddTourPreviewPopup';
import Button from 'material-ui/Button';
import SortableInput from '../ui-elements/SortableInput'
import ImageUploader from '../ui-elements/form/ImageUploader';

const styles = StyleSheet.create({
  buttonLeft: {
    marginLeft: '10px',
    marginTop: '10px'
  },
  button: {
    marginTop: '10px'
  },
  field: {
    marginBottom: '10px',
  },
  fieldImg: {
    marginBottom: '10px',
    marginRight: '10px',
    position: 'relative',
    top: '3px'
  },
  img: {
    maxHeight: '50px',
    maxWidth: '100%',
    minWidth: '50px'
  },
  imgWrapper: {
    position: 'relative',
    marginRight: '10px'
  },
  icon: {
    background: 'white',
    position: 'absolute',
    right: '0',
    top: '0'
  },
  telWrap: {
    display: 'flex',
    alignItems: 'center'
  }

});

function removeItem(array, index) {
  let newArray = array.slice();
  newArray.splice(index, 1);
  return newArray;
}

class ContactsTemplate extends React.Component {

  state = {
    item: this.props.item || {
      content: this.props.languages.map(langItem => ({
        title: '',
        description: '',
        language: langItem._id
      })),
      tels: [{
        title: '',
        img: ''
      }],
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

  onTelChange = index => ({ target: { value, name }}) => {
    const tels = [...this.state.item.tels]
    tels[index].title = value
    const item = {
      ...this.state.item,
      tels
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

  addTel = () => {
    const tels = [...this.state.item.tels]
    tels.push({
      title: '',
      img: ''
    })

    const item = {
      ...this.state.item,
      tels
    }

    this.setState({ item })
  }

  deleteTel = (index) => () => {
    const tels = [...this.state.item.tels]

    const item = {
      ...this.state.item,
      tels: removeItem(tels, index)
    }

    this.setState({ item })
  }

  updloadImg = ({ payload }, index) => {
    const formData = new FormData();
    formData.append('file', payload);

    fetch('/api/media-upload', {
      method: 'POST',
      body: formData
    })
    .then(response =>
      response.json().then(({ path }) => {
        const tels = [...this.state.item.tels]
        tels[index].img = path;

        const item = {
          ...this.state.item,
          tels
        }

        this.setState({item})
      })
    );
  }

  removeImg = (index) => () => {
    const tels = [...this.state.item.tels]
    tels[index].img = '';

    const item = {
      ...this.state.item,
      tels
    }

    this.setState({item})
  }

  render() {
    const { item, isNew } = this.state
    return (
      <div className={css(styles.item, styles.itemTmp)}>
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
                  label={`Адресс ${langTitle}`}
                  required
                />
              </div>
            )
            }
          )
        }
        <div>
          {
            item.tels.map((tel, i) => {
              return (
                <div className={css(styles.telWrap)} >
                  {
                    tel.img ?
                      <div className={css(styles.imgWrapper)}>
                        <Icon className={css(styles.icon)} onClick={ this.removeImg(i) }>delete</Icon>
                        <img
                          src={ tel.img }
                          className={css(styles.img)} alt=""
                        />
                      </div> :
                      <ImageUploader uploadImg={ (img) => this.updloadImg(img, i) } />

                  }
                  <TextField
                    name='title'
                    value={tel.title}
                    onChange={this.onTelChange(i)}
                    className={css(styles.fieldTel)}
                    label={`Тел/Skype/Viber`}
                    required
                  />
                  <Icon className={css(styles.iconTelDelete)} onClick={ this.deleteTel(i) }>delete</Icon>

                </div>
              )
            })
          }
          <Button className={css(styles.button)} onClick={ this.addTel } >
            Добавить Тел/Skype/Viber
          </Button>
        </div>

        <Button className={css(styles.button)} onClick={ this.props.saveItem(item, isNew) } color="primary">
          Сохранить
        </Button>

        <Button className={css(styles.buttonLeft)} onClick={ this.props.deleteItems([item._id]) } color="secondary">
           Удалить
        </Button>

      </div>
    )
  }
}

export default ContactsTemplate