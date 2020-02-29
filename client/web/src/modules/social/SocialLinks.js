import React, { useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { connect } from 'react-redux';
import { fetchSocial } from './SocialReducer';
import { getSocial } from '../../rootReducer';

const styles = StyleSheet.create({
  wrap: {
    display: 'flex',
    flexWrap: 'wrap',
    minHeight: '40px',
  },
  img: {
    width: '30px',
  },
  item: {
    margin: '5px',
  },
});

const SocialLinks = ({ items, isFetched, fetchSocial }) => {
  useEffect(() => {
    if (!isFetched) {
      fetchSocial();
    }
  }, [fetchSocial, isFetched]);

  return (
    <div className={css(styles.wrap)}>
      {items[0] &&
        items[0].socials.map(item => (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={css(styles.item)}
            key={item._id}
          >
            <img src={item.image} className={css(styles.img)} alt={item.link} />
          </a>
        ))}
    </div>
  );
};

const mapStateToProps = state => ({
  items: getSocial(state),
  isFetching: state.social.isFetching,
  isFetched: state.social.isFetched,
});

export default connect(mapStateToProps, { fetchSocial })(SocialLinks);
