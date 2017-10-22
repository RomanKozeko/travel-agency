import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, css} from 'aphrodite/no-important';

const styles = StyleSheet.create({
  header: {
    color: '#697882',
    fontSize: '22px',
    fontWeight: '400',
    margin: '0 0 20px 0',
    padding: '0'
  }
});

const PageHeader = ({text}) => (
  <h1 className={css(styles.header)}>{text}</h1>
);

PageHeader.propTypes = {
  text: PropTypes.string,
};

export default PageHeader;
