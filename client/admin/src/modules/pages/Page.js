import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite/no-important';
import Menu, { MenuItem } from 'material-ui/Menu';
import Tabs, { Tab, TabContainer } from 'material-ui/Tabs';
import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';
import Portlet from '../ui-elements/Portlet';
import PageForm from './PageForm';
import MyEditor from './MyEditor';
import ImagePreview from '../ui-elements/ImagePreview';
import { getPage } from '../../rootReducer';
import { loadPage, savePage } from './PagesActions';


const styles = StyleSheet.create({
  field: {
    marginBottom: '10px;'
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

const mapStateToProps = (state, router) => {
  return {
    page: getPage(state, router.match.params.id),
    isFetching: state.pages.isFetching
  };
};



class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.props.page,
      index: 0
    };
  }

  // addRow(columns) {
  //   const page = { ...this.state.page };
  //   page.content[0].rows.push(new Row('Обычный контент', `col-sm-${12 / columns}`));
  //   this.setState({ page });
  // }

  handleChange(event, index) {
    this.setState({ index });
  }

  render() {
    const isBordered = true;
    const { page } = this.state;
    const tabIndex = this.state.index;
    return (
      <Portlet isBordered={isBordered}>
        <Tabs index={this.state.index} onChange={(event, index) => this.handleChange(event, index)}>
          {this.props.languages.map(lang => (
            <Tab label={lang.title} key={lang._id}/>
          ))
          }
        </Tabs>
        <PageForm onSubmit={this.submit} {...this.props} />
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

Page = withRouter(connect(
  mapStateToProps,
  { loadPage, savePage }
)(Page));

export default Page;