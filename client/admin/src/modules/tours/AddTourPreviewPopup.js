import React, { Component } from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import Button from 'material-ui/Button';
import MediaFilesContainer from '../mediaFiles/MediaFilesContainer';

import Dialog, {
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from 'material-ui/Dialog';

const styles = StyleSheet.create({
  field: {
    marginBottom: '10px;'
  },
  button: {
  }
});

class AddTourPreviewPopup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false
		}
	}


	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleRequestClose = () => {
		this.setState({ open: false });
	};

	handleClick = () => {
		this.props.addPreview();
		this.handleRequestClose();
	};

	render() {
		return (
			<div>
				<Button onClick={this.handleClickOpen}>Add preview images</Button>
				<Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
					<DialogContent>
						<MediaFilesContainer />
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClick} color="primary">
							Select
						</Button>
						<Button onClick={this.handleRequestClose} color="primary" autoFocus>
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		)
	}
}

export default AddTourPreviewPopup;
