import React, { Component } from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import Button from 'material-ui/Button';
import MediaFilesContainer from '../mediaFiles/MediaFilesContainer';
import Dialog, { DialogActions,	DialogContent } from 'material-ui/Dialog';

const styles = StyleSheet.create({
  button: {
  	display: 'block',
		textAlign: 'center',
		width: '100%',
		marginBottom: '15px'
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
				<Button
					className={css(styles.button)}
					onClick={this.handleClickOpen}
					component="span"
					raised
				>
					Add preview images
				</Button>
				<Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
					<DialogContent>
						<MediaFilesContainer />
					</DialogContent>
					<DialogActions>
						<Button raised onClick={this.handleClick} color="primary">
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
