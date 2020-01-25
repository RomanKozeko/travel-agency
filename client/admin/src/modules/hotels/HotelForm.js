import React, { Component } from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import TextField from 'material-ui/TextField';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import TinyMCE from 'react-tinymce';
import Button from 'material-ui/Button';
import withTabs from '../ui-elements/HOC/withTabs';
import ImageGridList from '../ui-elements/ImageGridList'
import AddPreviewPopup from '../ui-elements/form/AddPreviewPopup';
import StarsList from '../ui-elements/StarsList';
import NotificationPanel from '../ui-elements/form/NotificationPanel';
import TreeList from '../ui-elements/TreeList'


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
  },
  regionWrapper: {
    marginLeft: '-40px'
  }
});

class HotelForm extends Component {

  selectRegions = (e) => {
    const regions = [...this.props.parentState.item.regions];
    const index = regions.indexOf(e.target.value);
    if (index === -1) {
      regions.push(e.target.value)
    } else {
      regions.splice(index, 1)
    }
    this.props.handleInputChange(null, {regions})()
  };

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
                color="secondary"
                variant="raised"
                disabled={!parentState.previewItemsToDelete.length}
              >
                Удалить выбранные
              </Button>
              <ImageGridList imgs={parentState.item.preview} clickHandler={togglePreviewItem} />
              <h3>Регионы</h3>
              <div className={css(styles.regionWrapper)}>
                <TreeList
                  selectedItems={this.props.parentState.item.regions}
                  items={this.props.regions}
                  selectItems={this.selectRegions.bind(this)}
                />
              </div>
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
                          toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | fontsizeselect link image',
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
          variant="raised"
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