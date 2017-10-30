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

const styles = StyleSheet.create({
  popup: {
    minWidth: '570px'
  }
});


class AddToursListPopup extends React.Component {
	render() {
		const {isOpen, handleRequestClose, categories, regions} = this.props;
    return (
			<Dialog open={isOpen} onRequestClose={handleRequestClose} transition={<Slide direction="up" />}>
				<DialogTitle>Filter tours to display</DialogTitle>
				<DialogContent className={css(styles.popup)}>
          <FilteredTagSelector/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleRequestClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleRequestClose} color="primary">
						Subscribe
					</Button>
				</DialogActions>
			</Dialog>
    )
	}
}

export default AddToursListPopup;