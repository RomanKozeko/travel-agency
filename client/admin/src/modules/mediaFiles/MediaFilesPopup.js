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

const MediaFilesPopup = ({ isOpen, handleRequestClose, filesType, addPreview }) =>(
  <div>
    <Dialog open={ isOpen } onRequestClose={ handleRequestClose }>
      <DialogContent>
        <MediaFilesContainer filesType={ filesType } />
      </DialogContent>
      <DialogActions>
        <Button variant="raised" onClick={() => {
                  addPreview();
                  handleRequestClose();
                }}
                color="primary">
          Добавить
        </Button>
        <Button onClick={handleRequestClose} color="primary" autoFocus>
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
  </div>
)

export default MediaFilesPopup;
