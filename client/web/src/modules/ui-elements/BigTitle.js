import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { theme } from '../../services/constans';

const styles = StyleSheet.create({
  wrapper: {
    textAlign: 'center',
    margin: '40px 0 40px',
  },
  subTitle: {
    display: 'inline-block',
    color: theme.colors.primary,
    textTransform: 'uppercase',
    lineHeight: '26px',
    fontWeight: 'bold',
    fontSize: '16px',
    position: 'relative',
    borderBottom: '5px solid #1593d0',
    marginBottom: '20px',
    paddingBottom: '10px',
  },
  title: {
    color: '#222',
    margin: '0',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    lineHeight: '42px',
    fontSize: '32px',
    letterSpacing: '6.4px',
  },
});

const BigTitle = ({ title, subTitle }) => (
  <header className={css(styles.wrapper)}>
    {subTitle && <div className={css(styles.subTitle)}>{subTitle}</div>}

    <h2 className={css(styles.title)}>{title}</h2>
  </header>
);

export default BigTitle;
