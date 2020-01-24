import React from 'react';
import Dialog from 'material-ui/Dialog';
import TinyMCE from 'react-tinymce';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Button from 'material-ui/Button';
import {css, StyleSheet} from 'aphrodite/no-important';

const styles = StyleSheet.create({
  appBar: {
    position: 'relative',
    background: '#3f51b5',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  flex: {
    flex: 1,
  },
  title: {
    color: '#fff',
    margin: '0'
  }
});

class HtmlEditorPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }

  handleEditorChange = (e) => {
    this.state.content = e.target.getContent();
  }

  render() {
    const {isOpen, handleRequestClose, saveRow, currentRowItem} = this.props;
    const content = currentRowItem ? currentRowItem.content : '<p>Page content</p>';
    return (
      <Dialog
        open={isOpen}
        onClose={handleRequestClose}
      >
        <div className={css(styles.appBar)}>
          <IconButton color="contrast" onClick={() => handleRequestClose(false) } aria-label="Close">
            <CloseIcon/>
          </IconButton>
          <h3 type="title" color="inherit" className={css(styles.title)}>
            Добавить контент
          </h3>
          <Button color="contrast" onClick={() => saveRow(this.state.content, 'content')}>
            Сoхранить
          </Button>
        </div>
        <TinyMCE
          content={content}
          config={{
            plugins:'link image code',
            height: '500'
          }}
          onChange={this.handleEditorChange}
        />
      </Dialog>
    );
  }
}

export default HtmlEditorPopup;