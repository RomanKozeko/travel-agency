import React from 'react';
import Popup from 'reactjs-popup';
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
import { css, StyleSheet } from 'aphrodite/no-important';

const styles = StyleSheet.create({
    appBar: {
        position: 'relative',
        background: '#3f51b5',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flex: {
        flex: 1,
    },
    title: {
        color: '#fff',
        margin: '0',
    },
});

class HtmlEditorPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
        };
    }

    handleEditorChange = e => {
        this.state.content = e.target.getContent();
    };

    render() {
        const { isOpen, handleRequestClose, saveRow, currentRowItem } = this.props;
        const content = currentRowItem ? currentRowItem.content : '<p>Page content</p>';
        return (
            <React.Fragment>
                {isOpen && (
                    <div>
                        <Popup open={isOpen} onClose={() => handleRequestClose(false)} className={'editor-popup'}>
                            <div className={css(styles.appBar)}>
                                <IconButton color="contrast" onClick={() => handleRequestClose(false)} aria-label="Close">
                                    <CloseIcon />
                                </IconButton>
                                <h3 type="title" color="inherit" className={css(styles.title)}>
                                    Добавить контент
                                </h3>
                                <Button color="contrast" onClick={() => saveRow(this.state.content, 'content')}>
                                    Сoхранить
                                </Button>
                            </div>
                            <TinyMCE
                                className={'editor-html'}
                                content={content}
                                config={{
                                    plugins: 'table link image code',
                                    toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | fontsizeselect link image',
                                    height: '500',
                                }}
                                onChange={this.handleEditorChange}
                            />
                        </Popup>
                    </div>
                )}
            </React.Fragment>
            // <Dialog open={isOpen} onClose={handleRequestClose}>
            //     <div className={css(styles.appBar)}>
            //         <IconButton color="contrast" onClick={() => handleRequestClose(false)} aria-label="Close">
            //             <CloseIcon />
            //         </IconButton>
            //         <h3 type="title" color="inherit" className={css(styles.title)}>
            //             Добавить контент
            //         </h3>
            //         <Button color="contrast" onClick={() => saveRow(this.state.content, "content")}>
            //             Сoхранить
            //         </Button>
            //     </div>
            //     <TinyMCE
            //         className={"editor-html"}
            //         content={content}
            //         config={{
            //             plugins: "link image code",
            //             height: "500",
            //         }}
            //         onChange={this.handleEditorChange}
            //     />
            // </Dialog>
        );
    }
}

export default HtmlEditorPopup;
