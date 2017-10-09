import { StyleSheet, css } from 'aphrodite/no-important';
import Menu, { MenuItem } from 'material-ui/Menu';
import Tabs, { Tab, TabContainer } from 'material-ui/Tabs';
import React from 'react';
import PropTypes from 'prop-types';
import Portlet from '../../ui-elements/Portlet';
import PageForm from './PageForm';
import MyEditor from './MyEditor';

const styles = StyleSheet.create({
  tabs: {
    top: '-20px',
    zIndex: '1',
    position: 'relative',
    borderRadius: '4px 4px 0 0',
    borderBottom: '1px solid #dae2ea'
  }
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
          handleSubmit={this.props.savePage}
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
  savePage: PropTypes.func,
  isFetching: PropTypes.bool,
  content: PropTypes.object,
  match: PropTypes.object,
};


export default Page;
