import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite/no-important';
import Menu, { MenuItem } from 'material-ui/Menu';
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import { CircularProgress } from 'material-ui/Progress';
import AddPageItemMenu from './AddPageItemMenu';
import Portlet from '../ui-elements/Portlet';
import PageCaption from '../ui-elements/PageCaption';
import GridIcons from '../ui-elements/gridIcons/GridIcons';
import PageForm from './PageForm';
import MyEditor from './MyEditor'
import ImagePreview from '../ui-elements/ImagePreview';
import { getPage } from '../../rootReducer';
import { loadPage } from './RegionsActions';

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
    initialValues: getPage(state, router.match.params.id),
    page: getPage(state, router.match.params.id),
    isFetching: state.pages.isFetching
  };
};

const renderRows = (size) => {
  //"col-md-6"
  const splited = size.split('-');
  const count = 12 / +splited[splited.length - 1];
  const rows = [];
  for (let i = 0; i < count; i++) {
    rows.push(
      <div key={i} className={css(styles.rowInner)}>
        <AddPageItemMenu />
      </div>);
  }

  return rows;
};

class Row {
  constructor(title, size, type, content, pageLink) {
    this.title = title;
    this.size = size;
    this.type = type;
    this.content = content;
    this.content = pageLink;
  }
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.props.page
    };
  }

  addRow(columns) {
    const page = { ...this.state.page };
    page.content[0].rows.push(new Row('Обычный контент', `col-sm-${12 / columns}`));
    this.setState({ page });
  }

  render() {
    const isBordered = true;
    const { page } = this.state;
    return (
      <Portlet isBordered={isBordered}>
        <div className="row">
          <div className="col-sm-3">
            <ImagePreview url={page.preview}/>
          </div>
          <div className="col-sm-5">
            <PageForm onSubmit={this.submit} id={page._id}/>
          </div>
        </div>

        <PageCaption text={'Добавить ряд'}/>
        <div className="row">
          <div className="col-sm-3">
            <GridIcons count={1} clickHandler={this.addRow.bind(this)}/>
          </div>
          <div className="col-sm-3">
            <GridIcons count={2} clickHandler={this.addRow.bind(this)}/>
          </div>
          <div className="col-sm-3">
            <GridIcons count={3} clickHandler={this.addRow.bind(this)}/>
          </div>
          <div className="col-sm-3">
            <GridIcons count={4} clickHandler={this.addRow.bind(this)}/>
          </div>
        </div>

        <PageCaption text={'Схема страницы'} />

        <div>
          {page.content[0].rows.map((row, i) => (
            <div key={i} className={css(styles.row)}>
              <IconButton className={css(styles.dragButton)}>
                <Icon>drag_handle</Icon>
              </IconButton>
              <IconButton className={css(styles.closeButton)}>
                <Icon>close</Icon>
              </IconButton>
              {renderRows(row.size)}
            </div>
          ))}
        </div>

        <Button raised color="primary" className={css(styles.button)}>
          Сохранить
        </Button>
      </Portlet>
    );
  }
}

Page.propTypes = {
  page: PropTypes.object,
  loadPage: PropTypes.func,
  isFetching: PropTypes.bool,
  content: PropTypes.object,
  match: PropTypes.object,
};

Page = withRouter(connect(
  mapStateToProps,
  { loadPage }
)(Page));

export default Page;