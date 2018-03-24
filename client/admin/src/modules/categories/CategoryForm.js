import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Tabs, { Tab, TabContainer } from 'material-ui/Tabs';
import { StyleSheet, css } from 'aphrodite/no-important';
import { FormControlLabel } from 'material-ui/Form';
import NotificationPanel from '../ui-elements/form/NotificationPanel';
import withTabs from '../ui-elements/HOC/withTabs';
import Switch from 'material-ui/Switch';

const styles = StyleSheet.create({
  tabs: {
    top: '-20px',
    zIndex: '1',
    position: 'relative',
    borderRadius: '4px 4px 0 0',
    borderBottom: '1px solid #dae2ea'
  }
});

const CategoryForm = ({ isSaving, parentState, languages, handleChange, handleSave, handleToggle, toggleEnableForLanguage }) => (
  <form action="" onSubmit={handleSave}>
    {languages.map((lang, i) => (
      <div key={lang._id}>
        {parentState.selectedTabIndex === i &&
        <div className="row">
          <div className="col-sm-6">
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
            <FormControlLabel
              control={
                <Switch
                  checked={parentState.item.disabledForLanguages && parentState.item.disabledForLanguages.includes(lang._id)}
                  onChange={ toggleEnableForLanguage(lang._id)}
                  aria-label="checkedD"
                />
              }
              label={parentState.item.disabledForLanguages && parentState.item.disabledForLanguages.includes(lang._id) ?
                'Скрыть для этого языка' :
                'Скрыть для этого языка'
              }
            />
            <TextField
              id="title"
              label="title"
              fullWidth
              value={parentState.contentByLang[lang._id].title}
              onChange={handleChange(lang._id, 'title')}
              margin="normal"
              required
            />
          </div>
        </div>
        }
      </div>
    ))
    }
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
  </form>
);


export default withTabs(CategoryForm, '/admin/categories');