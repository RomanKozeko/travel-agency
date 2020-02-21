import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import NotificationPanel from '../ui-elements/form/NotificationPanel';
import withTabs from '../ui-elements/HOC/withTabs';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

const FoodItemForm = ({
  isSaving,
  parentState,
  languages,
  handleChange,
  handleSave,
  handleToggle,
}) => (
  <form action="" onSubmit={handleSave}>
    {languages.map((lang, i) => (
      <div key={lang._id}>
        {parentState.selectedTabIndex === i && (
          <div className="row">
            <div className="col-sm-6">
              <FormControlLabel
                control={
                  <Switch
                    checked={parentState.item.enabled}
                    onChange={(event, checked) =>
                      handleToggle(event, 'enabled', checked)
                    }
                    aria-label="checkedD"
                  />
                }
                label={parentState.item.enabled ? 'Активен' : 'Не активен'}
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
        )}
      </div>
    ))}
    {parentState.notValidForm && (
      <NotificationPanel>
        Пожалуйста, заполните названия типа питания для всех языков
      </NotificationPanel>
    )}
    <Button variant="raised" type="submit" color="primary" disabled={isSaving}>
      {isSaving ? 'Сохраняю...' : 'Сохранить'}
    </Button>
  </form>
);

export default withTabs(FoodItemForm, '/admin/food');
