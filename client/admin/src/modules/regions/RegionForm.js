import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { StyleSheet, css } from 'aphrodite/no-important';
import NotificationPanel from '../ui-elements/form/NotificationPanel';
import withTabs from '../ui-elements/HOC/withTabs';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

const styles = StyleSheet.create({
  tabs: {
    top: '-20px',
    zIndex: '1',
    position: 'relative',
    borderRadius: '4px 4px 0 0',
    borderBottom: '1px solid #dae2ea'
  },
  selectWrapper: {
    width: '100%',
    marginTop: '40px',
    marginBottom: '40px'
  }
});

const RegionForm = ({
                      isSaving,
                      parentState,
                      languages,
                      handleChange,
                      handleSave,
                      regions,
                      handleInputChange
}) => {

  const setupAncestors = parent => {

    let ancestors = [parent._id];

    if (parent.parent) {
      ancestors = [...parent.ancestors, ...ancestors];
    }

    return ancestors
  };

  const appendAncestors = name => event => {
    const parent = regions.find(region => (region._id === event.target.value));
    const ancestors = setupAncestors(parent);
    handleInputChange(name, { ancestors, parent: event.target.value })(event)
  };

  return (
    <form action="" onSubmit={handleSave}>
      <div className="row">
        <div className="col-sm-6">

          {languages.map((lang, i) => (
            <div key={lang._id}>
              {parentState.selectedTabIndex === i &&
              <TextField
                id="title"
                label="title"
                fullWidth
                value={parentState.contentByLang[lang._id].title}
                onChange={handleChange(lang._id, 'title')}
                margin="normal"
                required
              />
              }
            </div>
          ))}

          {regions.length > 0  &&
          <FormControl className={css(styles.selectWrapper)}>
            <InputLabel htmlFor="parentRegion">Родительский регион</InputLabel>
            <Select
              value={parentState.item.parent || 1}
              onChange={appendAncestors('parent')}
              input={<Input id="parentRegion" />}
              autoWidth
            >
              {regions.map(region => {
                if (
                  parentState.item._id !== region._id &&
                  region.ancestors.indexOf(parentState.item._id) === -1
                ) {
                  return (
                    <MenuItem key={region._id} value={region._id}>{region.content[0].title}</MenuItem>
                  );
                }
              })
              }
            </Select>
          </FormControl>
          }

        </div>
      </div>

      {parentState.notValidForm &&
      <NotificationPanel>Пожалуйста заполните заголовки для всех языков</NotificationPanel>
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
}


export default withTabs(RegionForm, '/admin/regions');
