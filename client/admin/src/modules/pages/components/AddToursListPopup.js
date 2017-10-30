import React from 'react';
import Button from 'material-ui/Button';
import {css, StyleSheet} from 'aphrodite/no-important';
import Dialog, {
  DialogActions,
  DialogTitle,
  DialogContent
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import FilteredTagSelector from '../../ui-elements/FilteredTagSelector';
import TextField from 'material-ui/TextField';

const styles = StyleSheet.create({
  popup: {
    minWidth: '570px'
  },
  input: {
    width: '100%'
  },
});


class AddToursListPopup extends React.Component {
	render() {
		const {isOpen, handleRequestClose, categories, regions} = this.props;
    return (
			<Dialog open={isOpen} onRequestClose={handleRequestClose} transition={<Slide direction="up" />}>
				<DialogTitle>Filter tours to display</DialogTitle>
				<DialogContent className={css(styles.popup)}>
          <TextField
            label="Header text"
            margin="normal"
            fullwidth
            className={css(styles.input)}
          />
          <FilteredTagSelector items={categories} label='Select categories' />
          <FilteredTagSelector items={regions} label='Select regions' />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleRequestClose} color="accent">
						Cancel
					</Button>
					<Button onClick={handleRequestClose} color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
    )
	}
}

export default AddToursListPopup;