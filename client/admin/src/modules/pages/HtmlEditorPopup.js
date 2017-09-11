import React from 'react';
import Dialog from 'material-ui/Dialog';
import TinyMCE from 'react-tinymce';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import Button from 'material-ui/Button';
import {css, StyleSheet} from 'aphrodite/no-important';
import MyEditor from './MyEditor';

const styles = StyleSheet.create({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
});

class HtmlEditorPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }

  handleEditorChange(e) {
    this.state.content = e.target.getContent();
  }

  render() {
    const {isOpen, handleRequestClose, saveRow} = this.props;
    return (
      <Dialog
        fullScreen
        open={isOpen}
        onRequestClose={handleRequestClose}
        transition={<Slide direction="up"/>}
      >
        <AppBar className={css(styles.appBar)}>
          <Toolbar>
            <IconButton color="contrast" onClick={handleRequestClose} aria-label="Close">
              <CloseIcon/>
            </IconButton>
            <Typography type="title" color="inherit" className={css(styles.flex)}>
              Добавить контент
            </Typography>
            <Button color="contrast" onClick={() => saveRow(this.state.content)}>
              Сoхранить
            </Button>
          </Toolbar>
        </AppBar>
        <TinyMCE
          content="<p>This is the initial content of the editor</p>"
          config={{
            plugins: 'link image code',
            height: '500'
          }}
          onChange={this.handleEditorChange.bind(this)}
        />
      </Dialog>
    );
  }
}

export default HtmlEditorPopup;