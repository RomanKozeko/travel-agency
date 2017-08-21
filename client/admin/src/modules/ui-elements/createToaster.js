import React from 'react';
import Snackbar from 'material-ui/Snackbar';

const createToaster = msg => ({
  timeOut: 2000,
  icon: (<div />),
  showCloseButton: false,
  component: (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={true}
      message={<span>{msg}</span>}
    />
  )
});

export default createToaster;
