import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from 'material-ui/Icon';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  link: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
});

const BackLink = ({ text, url }) => (
  <Link className={css(styles.link)} to={url}>
    <Icon>keyboard_arrow_left</Icon>
    {text}
  </Link>
);

BackLink.propTypes = {
  text: PropTypes.string,
  url: PropTypes.string,
};

export default BackLink;
