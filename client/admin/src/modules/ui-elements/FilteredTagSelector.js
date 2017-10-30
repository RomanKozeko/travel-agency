import React from 'react';
import {css, StyleSheet} from 'aphrodite/no-important';
import TextField from 'material-ui/TextField';

const styles = StyleSheet.create({
  row: {
    display: 'flex',
  },
  tags: {
    flex: '1',
    paddingLeft: '20px'
  },
  inputWrapper: {
    flex: '1'
  },
  input: {
    width: '100%'
  }
});

class FilteredTagSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      items: [...this.props.items]
    }
  }

  render() {
    return (
      <div className={css(styles.row)}>
        <div className={css(styles.inputWrapper)}>
          <TextField
            id="uncontrolled"
            label="Uncontrolled"
            margin="normal"
            className={css(styles.input)}
          />
        </div>
        <div className={css(styles.tags)}>
          tag
        </div>
      </div>
    )
  }
}

export default FilteredTagSelector;