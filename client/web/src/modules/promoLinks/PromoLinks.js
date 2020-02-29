import React, { useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import PrefixLink from '../ui-elements/PrefixLink';
import LoadingItems from '../ui-elements/LoadingItems';
import { getPromoLinks } from '../../rootReducer';
import { fetchPromoLinks } from './promoLinksReducer';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    margin: '0 -15px',
    flexWrap: 'wrap',
    paddingBottom: '40px',
  },
  itemBg: {
    position: 'absolute',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
  },
  item: {
    height: '220px',
    margin: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    backgroundSize: 'cover',
    borderRadius: '5px',
    width: '100%',
    transition: 'box-shadow .3s ease-in',
    boxShadow: '0px 30px 90px rgba(0,0,0,0.14)',
    overflow: 'hidden',
    ':hover': {
      textDecoration: 'none',
    },
    '@media (min-width: 500px)': {
      width: 'calc(100% / 2 - 30px)',
    },
    '@media (min-width: 970px)': {
      width: 'calc(100% / 3 - 30px)',
    },
    position: 'relative',
    color: '#fff',
    ':before': {
      content: '""',
      top: 0,
      left: 0,
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,.32)',
      zIndex: '1',
    },
  },
  title: {
    color: '#fff',
    textTransform: 'uppercase',
    textAlign: 'center',
    position: 'relative',
    paddingBottom: '20px',
    paddingLeft: '10px',
    paddingRight: '10px',
    zIndex: '2',
    ':after': {
      content: '""',
      width: '100px',
      borderTop: '5px solid #fff',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      bottom: '0',
    },
  },
});

const PromoLinks = ({ items, isFetching, isFetched, fetchPromoLinks }) => {
  useEffect(() => {
    if (!isFetched) {
      fetchPromoLinks();
    }
  }, [fetchPromoLinks, isFetched]);

  return (
    <div className={css(styles.wrapper)}>
      {isFetching ? (
        <LoadingItems count={6} />
      ) : (
        items
          .sort((a, b) => a.order - b.order)
          .map(({ preview, content, linkUrl, _id }) => (
            <PrefixLink
              to={`/pages/${linkUrl}`}
              className={css(styles.item)}
              key={_id}
            >
              <div
                className={css(styles.itemBg)}
                style={{
                  backgroundImage: `url(${preview[0] && preview[0].path})`,
                }}
              />
              <h3 className={css(styles.title)}>{content.title}</h3>
            </PrefixLink>
          ))
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  items: getPromoLinks(state),
  isFetching: state.promoLinks.isFetching,
  isFetched: state.promoLinks.isFetched,
});

export default compose(connect(mapStateToProps, { fetchPromoLinks }))(
  PromoLinks
);
