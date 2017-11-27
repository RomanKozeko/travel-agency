import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import TextField from 'material-ui/TextField';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import TinyMCE from 'react-tinymce';
import Button from 'material-ui/Button';
import withTabs from '../ui-elements/HOC/withTabs';
import ImageGridList from '../ui-elements/ImageGridList'
import AddPreviewPopup from '../ui-elements/form/AddPreviewPopup';
import StarsList from '../ui-elements/StarsList';
import NotificationPanel from '../ui-elements/form/NotificationPanel';

const styles = StyleSheet.create({
  field: {
    marginBottom: '10px;'
  },
  sideBar: {
    marginBottom: '40px;'
  },
  tinyMCIWrapper: {
    marginTop: '20px',
    marginBottom: '10px;'
  },
  button: {
    display: 'block',
    textAlign: 'center',
    width: '100%',
    marginBottom: '15px'
  },
  starsWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px'
  },
  starsWrapperInput: {
    width: '40px',
    marginRight: '10px',
    borderWidth: '0 0 1px 0',
    borderColor: 'rgba(0, 0, 0, 0.42)'
  }
});

class HotelForm extends React.Component {

  render() {
    const {
      languages,
      parentState,
      handleChange,
      handleToggle,
      addPreview,
      deletePreviewItems,
      togglePreviewItem,
      isSaving,
      handleSave,
      handleEditorChange
    } = this.props;
    return (
      <form action="" onSubmit={handleSave}>
        <div className="row">

          <div className="col-md-3">
            <div className={css(styles.sideBar)}>
              <h3>Галерея</h3>
              <AddPreviewPopup addPreview={addPreview}/>
              <Button
                onClick={deletePreviewItems}
                className={css(styles.button)}
                component="span"
                color="accent"
                raised
                disabled={!parentState.previewItemsToDelete.length}
              >
                Удалить выбранные
              </Button>
              <ImageGridList imgs={parentState.item.preview} clickHandler={togglePreviewItem} />
              <h3>Категории</h3>
            </div>
          </div>

          <div className="col-md-9">
            {languages.map((lang, i) => (
              <div key={lang._id}>
                {
                  parentState.selectedTabIndex === i &&
                  <div>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={parentState.item.enabled}
                          onChange={(event, checked) => handleToggle(event, 'enabled', checked)}
                          aria-label="checkedD"
                        />
                      }
                      label={ parentState.item.enabled ? 'Активен' : 'Не активен'}
                    />
                    <TextField
                      name='title'
                      value={parentState.contentByLang[lang._id].title}
                      onChange={handleChange(lang._id, 'title')}
                      fullWidth
                      className={css(styles.field)}
                      label='Название'
                      required
                    />
                    <TextField
                      id="url"
                      label="url"
                      name='url'
                      fullWidth
                      value={parentState.item.url}
                      className={css(styles.field)}
                      onChange={handleChange(null, 'url')}
                      required
                    />
                    <TextField
                      name='description'
                      value={parentState.contentByLang[lang._id].description}
                      onChange={handleChange(lang._id, 'description')}
                      fullWidth
                      className={css(styles.field)}
                      label='Мета описание'
                    />
                    <TextField
                      name='address'
                      value={parentState.contentByLang[lang._id].address}
                      onChange={handleChange(lang._id, 'address')}
                      fullWidth
                      className={css(styles.field)}
                      label='Адрес'
                    />
                    <div className={css(styles.starsWrapper)}>
                      <input
                        type="number"
                        max="5"
                        min='0'
                        step='1'
                        value={parentState.item.stars}
                        onChange={handleChange(null, 'stars')}
                        className={css(styles.starsWrapperInput)}
                      />
                      <StarsList starsCount={parentState.item.stars} />
                    </div>

                    <div className={css(styles.tinyMCIWrapper)} >
                      <TinyMCE
                        content={parentState.contentByLang[lang._id].content}
                        config={{
                          plugins:'link image code',
                          height: '500'
                        }}
                        onChange={handleEditorChange(lang._id)}
                      />
                    </div>
                  </div>
                }
              </div>
            ))}
          </div>

        </div>

        {parentState.notValidForm &&
        <NotificationPanel>Please fill title for each language</NotificationPanel>
        }

        <Button
          raised
          type="submit"
          color="primary"
          disabled={isSaving}
        >
          {isSaving ? 'Сохраняю...' : 'Сохранить'}
        </Button>

      </form>)
  }
}

export default withTabs(HotelForm, '/admin/hotels')