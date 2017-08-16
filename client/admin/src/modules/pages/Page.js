import { StyleSheet, css } from 'aphrodite/no-important';
import Menu, { MenuItem } from 'material-ui/Menu';
import Tabs, { Tab, TabContainer } from 'material-ui/Tabs';
import React from 'react';
import PropTypes from 'prop-types';
import Portlet from '../ui-elements/Portlet';
import PageForm from './PageForm';
import MyEditor from './MyEditor';
import AppBar from 'material-ui/AppBar';

const styles = StyleSheet.create({
  field: {
    marginBottom: '10px;'
  },
  tabs: {
    top: '-20px',
    zIndex: '1',
    position: 'relative',
    borderRadius: '4px 4px 0 0',
    borderBottom: '1px solid #dae2ea'
  },
  row: {
    height: '200px',
    position: 'relative',
    width: '100%',
    border: '4px solid #aeaeae',
    borderTop: '23px solid #aeaeae',
    margin: '20px 0',
    display: 'flex',
    padding: '0 5px;'
  },
  rowInner: {
    border: '4px dashed #e6e6e6',
    margin: '10px 5px;',
    display: 'flex',
    flexGrow: '1',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all .3s ease',
    ':hover': {
      border: '4px dashed #aeaeae',
    }
  },
  dragButton: {
    position: 'absolute',
    top: '-35px',
    left: '-16px'
  },
  closeButton: {
    position: 'absolute',
    top: '-35px',
    right: '-16px'
  },
});

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.props.page,
      index: 0
    };
  }

  handleChange(event, index) {
    this.setState({ index });
  }

  render() {
    const isBordered = true;
    const tabIndex = this.state.index;
    return (
      <Portlet isBordered={isBordered}>
        <Tabs
          className={css(styles.tabs)}
          index={this.state.index}
          onChange={(event, index) => this.handleChange(event, index)}
        >
          {this.props.languages.map(lang => (<Tab label={lang.title} key={lang._id}/>))}
        </Tabs>
        <PageForm
          onSubmit={this.submit}
          {...this.props}
          selectedTabIndex={tabIndex}
        />
      </Portlet>
    );
  }
}

Page.propTypes = {
  page: PropTypes.object,
  languages: PropTypes.array,
  loadPage: PropTypes.func,
  isFetching: PropTypes.bool,
  content: PropTypes.object,
  match: PropTypes.object,
};


export default Page;
