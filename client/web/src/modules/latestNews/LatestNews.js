import React, { useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { connect } from 'react-redux';
import PrefixLink from '../ui-elements/PrefixLink';
import { getLatestNews } from '../../rootReducer';
import { fetchLatestNews } from './latestNewsReducer';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    margin: '0 -15px',
    flexWrap: 'wrap',
    paddingBottom: '40px',
  },
  column: {
    width: '100%',
    margin: '15px',
    '@media (min-width: 500px)': {
      width: 'calc(100% / 2 - 30px)',
    },
    '@media (min-width: 970px)': {
      width: 'calc(100% / 3 - 30px)',
    },
  },
  img: {
    maxWidth: '100%',
    minWidth: '100%',
  },
  item: {
    display: 'block',
    color: '#222',
    backgroundColor: '#fff',
    borderRadius: '5px',
    overflow: 'hidden',
    transition: 'box-shadow .3s ease-in',
    marginBottom: '30px',
    boxShadow: '0px 30px 90px rgba(0,0,0,0.14)',
    ':hover': {
      textDecoration: 'none',
      color: '#222',
    },
  },
  content: {
    padding: '20px',
  },
  title: {
    marginTop: '0',
  },
});

const itemsBycolumns = items => {
  return items.reduce((prev, curr, index) => {
    const columnIndex = index % 3;
    if (!prev[columnIndex]) {
      prev[columnIndex] = [curr];
      return prev;
    }
    prev[columnIndex].push(curr);
    return prev;
  }, []);
};

const LatestNews = ({ items, isFetched, fetchLatestNews }) => {
  useEffect(() => {
    if (!isFetched) {
      fetchLatestNews();
    }
  }, [fetchLatestNews, isFetched]);

  return (
    <div className={css(styles.wrapper)}>
      {itemsBycolumns(items.sort((a, b) => a.order - b.order)).map(
        (columns, index) => (
          <div className={css(styles.column)} key={index}>
            {columns.map(item => (
              <PrefixLink
                to={`/pages/${item.linkUrl}`}
                className={css(styles.item)}
                key={item._id}
              >
                <img
                  className={css(styles.img)}
                  src={item.preview[0] && item.preview[0].path}
                  alt=""
                />
                <div className={css(styles.content)}>
                  <h3 className={css(styles.title)}>{item.content.title}</h3>
                  <p>{item.content.description}</p>
                </div>
              </PrefixLink>
            ))}
          </div>
        )
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  items: getLatestNews(state),
  isFetching: state.latestNews.isFetching,
  isFetched: state.latestNews.isFetched,
});

export default connect(mapStateToProps, { fetchLatestNews })(LatestNews);
