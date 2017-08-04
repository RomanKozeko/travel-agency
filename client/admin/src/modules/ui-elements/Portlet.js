import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import classNames from 'classnames';

const styles = StyleSheet.create({
  wrapper: {
    border: '1px solid #e7ecf1',
    backgroundColor: '#fff',
    boxShadow: '0 2px 3px 2px rgba(0,0,0,.03);',
    marginTop: '0;',
    marginBottom: '25px;',
    borderRadius: '4px;',
    padding: '0'
  },
  bordered: {
    padding: '20px 20px 15px'
  }
});


const Portlet = ({ children, isBordered }) => (
  <div className={classNames({
    [css(styles.wrapper)]: !isBordered,
    [css(styles.wrapper, styles.bordered)]: isBordered
    })}>
    {children}
  </div>
);

export default Portlet;
