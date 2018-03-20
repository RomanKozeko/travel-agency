import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import Button from 'material-ui/Button';
import ConfirmDialog from "../ui-elements/form/ConfirmDialog";
import createConfirmation from "../ui-elements/form/createConfirmation";
import AddTourPreviewPopup from '../tours/AddTourPreviewPopup';
import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    margin: '0 -15px',
    flexWrap: 'wrap',
    paddingBottom: '40px'
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

const confirm = createConfirmation(ConfirmDialog);

// confirm({title: `Are you sure to delete ${item.title} language?`, body: ''}).then((res) => {
//   const items = [...this.state.items];
//   const index = items.findIndex(row => row._id === id || row.id === id);
//
//   items.splice(index, 1);
//   if (item._id) {
//     this.props.deleteLang([item._id])
//   }
//   this.setState({items});
// })

const FeaturedList = ({
  prepareTemplate,
  showTemplate,
  languages,
  newItem,
  onFieldChange,
  saveItem,
  addBackground,
  preview,
  removePreview,
  onOrderChange
}) =>
  <div className={css(styles.wrapper)}>
    <div className={css(styles.item)} style={{ backgroundImage: 'url(/web/build/quests.jpg)'}}>
      <h3 className={css(styles.title)}>Для гостей Беларуси</h3>
    </div>

    <div className={css(styles.item)} style={{ backgroundImage: 'url(/web/build/child.jpg)'}}>
      <h3 className={css(styles.title)}>Для детей и молодежи</h3>
    </div>

    <div className={css(styles.item)} style={{ backgroundImage: 'url(/web/build/holiday.jpg)'}}>
      <h3 className={css(styles.title)}>Праздничный</h3>
    </div>

    <div className={css(styles.item)} style={{ backgroundImage: 'url(/web/build/coop.jpg)'}}>
      <h3 className={css(styles.title)}>Для корпоративных клиентов</h3>
    </div>

    <div className={css(styles.item)} style={{ backgroundImage: 'url(/web/build/custom.jpg)'}}>
      <h3 className={css(styles.title)}>Авторские туры</h3>
    </div>

    <div className={css(styles.item)} style={{ backgroundImage: 'url(/web/build/DSC_0114-Edit.JPG)'}}>
      <h3 className={css(styles.title)}>патриотические туры</h3>
    </div>
    {
      showTemplate ?
      <div className={css(styles.item, styles.itemTmp)}>
        <TextField
          name='Order'
          fullWidth
          type='number'
          value={ newItem.order }
          className={css(styles.field)}
          onChange={ onOrderChange }
          label="Порядок в очереди"
          required
        />
        {
          newItem.content.map(item =>
            <div key={ item.language }>
              <TextField
                name='title'
                fullWidth
                value={ item.title }
                className={css(styles.field)}
                onChange={onFieldChange(item.language)}
                label={`Заголовок ${languages.find(lang => lang._id === item.language).title }`}
                required
              />
            </div>
          )
        }

        <TextField
          name='title'
          fullWidth
          className={css(styles.field)}
          label='Ссылка'
          required
        />

        <AddTourPreviewPopup addPreview={ addBackground } label="Добавить фон"/>
        {
          preview && <div className={css(styles.imgWrapper)}>
            <Icon className={css(styles.icon)} onClick={ removePreview }>delete</Icon>
            <img src={preview.path} className={css(styles.img)} alt=""/>
          </div>
        }
        <Button className={css(styles.button)} onClick={ saveItem } raised color="primary">
          Сохранить
        </Button>
        <Button
          className={css(styles.button)}
          raised
          color="accent"
          onClick={ prepareTemplate }
        >
          Отмена
        </Button>
      </div> :
      <div className={css(styles.item, styles.itemAdd)}>
        <Button
          onClick={ prepareTemplate }
          className={css(styles.button)}
          raised
          color="primary"
        >
          Добавить
        </Button>
      </div>
    }
  </div>

export default FeaturedList
