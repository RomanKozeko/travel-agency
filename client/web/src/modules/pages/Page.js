import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite/no-important';
import { withRouter, Link } from 'react-router-dom';
import { getPage } from '../../rootReducer';
import { loadPage } from './PagesActions';

const styles = StyleSheet.create({
  page: {

  },
  pageContent: {
    padding: '40px 0'
  },
  header: {
    height: '287px',
    marginTop: '-76px',
    paddingTop: '76px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url(/web/build/v.jpg)',
    backgroundSize: 'cover',
  },
  headerTitle: {
    lineHeight: '27px',
    fontSize: '38px',
    fontWeight: 'bold',
    color: '#fefefe',
    textTransform: 'uppercase'
  }
});


const mapStateToProps = (state, router) => ({
  page: getPage(state, router.match.params.id),
  isFetching: state.pages.isFetching
});

class Page extends React.Component {
  componentDidMount() {
    if (!this.props.page) {
      this.props.loadPage(this.props.match.params.id);
    }
  }

  getRowItemClass(size) {
    return 'col-sm-' + size.split('-')[2];
  }

  render() {
    const { isFetching, page } = this.props;
    return (
      <div>
        {isFetching || !page ?
          <h1>Loading...</h1>
          :
          <div className={css(styles.page)}>
            <header className={css(styles.header)}>
              <h1 className={css(styles.headerTitle)}>{page.content.title}</h1>
            </header>
            <div className="container">
              <div className={css(styles.pageContent)}>
                {page.content.rows.map(row => (
                  <div key={row._id} className="row">
                    {row.items.map(item => (
                        <div key={item._id} className={this.getRowItemClass(item.size)}>
                          <div dangerouslySetInnerHTML={{ __html: item.content }} />
                        </div>
                      ))
                    }
                  </div>
                ))
                }
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

Page.propTypes = {
  page: PropTypes.object,
  loadPage: PropTypes.func,
  isFetching: PropTypes.bool,
  match: PropTypes.object,
};

Page = withRouter(connect(
  mapStateToProps,
  { loadPage }
)(Page));

export default Page