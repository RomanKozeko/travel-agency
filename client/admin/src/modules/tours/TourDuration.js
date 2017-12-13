import React from 'react'
import {StyleSheet, css} from 'aphrodite/no-important';
import CollapseComponent from '../ui-elements/Collapse'
import TextField from 'material-ui/TextField';

const styles = StyleSheet.create({
  wrapper: {
    padding: '20px;'
  }
});


const TourDuration = ({val, langId, handleChange}) => {
  return (
    <CollapseComponent title='Продолжительность тура'>
      <div className={css(styles.wrapper)}>
        <TextField
          label="Продолжительность тура"
          multiline
          rowsMax="4"
          value={val}
          onChange={handleChange(langId, 'duration')}
          margin="normal"
          fullWidth
        />
      </div>
    </CollapseComponent>
  )
};

export default TourDuration