import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const ConfirmDialog = ({show, proceed, dismiss, cancel, confirmation, options}) => {
  return (<Dialog open={show} onRequestClose={dismiss}>
    <DialogTitle>{"Are you sure?"}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        {confirmation}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => cancel()} color="primary">
        Disagree
      </Button>
      <Button onClick={() => proceed()} color="primary">
        Agree
      </Button>
    </DialogActions>
  </Dialog>)
};


export default ConfirmDialog
