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
  }
});

class HotelForm extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {
      languages,
      parentState,
      handleChange,
      handleToggle,
      addPreview,
      deletePreviewItems,
      togglePreviewItem
    } = this.props;
    return (
      <form action="" onSubmit={this.handleSave}>
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
                    />
                    <TextField
                      name='description'
                      value={parentState.contentByLang[lang._id].description}
                      onChange={handleChange(lang._id, 'description')}
                      fullWidth
                      className={css(styles.field)}
                      label='Мета описание'
                    />
                    <div className={css(styles.tinyMCIWrapper)} >
                      <TinyMCE
                        content={parentState.contentByLang[lang._id].content}
                        config={{
                          plugins:'link image code',
                          height: '500'
                        }}
                        onChange={handleChange(lang._id)}
                      />
                    </div>
                  </div>
                }
              </div>
            ))}
          </div>

        </div>

      </form>)
  }
}

export default withTabs(HotelForm, '/admin/hotels')