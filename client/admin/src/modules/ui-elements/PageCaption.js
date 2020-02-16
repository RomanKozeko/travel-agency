import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  header: {
    color: '#697882',
    fontSize: '16px',
    fontWeight: '400',
    margin: '0 0 20px 0',
    padding: '0 0 10px 0',
    borderBottom: '1px solid #eef1f5;',
  },
});

const PageCaption = ({ text }) => (
  <h3 className={css(styles.header)}>{text}</h3>
);

PageCaption.propTypes = {
  text: PropTypes.string,
};

export default PageCaption;
