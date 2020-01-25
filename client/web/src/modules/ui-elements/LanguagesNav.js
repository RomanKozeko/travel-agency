import React, { Component } from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { theme } from '../../services/constans'

const styles = StyleSheet.create({
  link: {
    textTransform: 'uppercase',
    margin: '0 3px',
    display: 'inline-block',
    padding: '2px;',
    lineHeight: '14px',
    color: theme.colors.primary,
    fontSize: '12px'
  },
  active: {
    background: theme.colors.primary,
    color: '#fff',
    ':hover': {
      color: '#fff',
      textDecoration: 'none'
    }
  },
  wrapper: {
    whiteSpace: 'nowrap'
  }
});

class LanguagesNav extends Component {
  render() {
    if (!this.props.items.length) {
      return null;
    }
    return (
      <div className={css(styles.wrapper)}>
        {this.props.items.map(item => {
          const linkClass = classNames({
            [css(styles.link, styles.active)]: item.prefix === this.props.prefix,
            [css(styles.link)]: item.prefix !== this.props.prefix
          });
          const url = item.prefix === this.props.defaultLang ? '' : item.prefix;
          return (
            <a className={linkClass} key={item._id} href={`/${url}`}>{item.prefix}</a>
          )})
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    prefix: state.app.languages.prefix,
    defaultLang: state.app.languages.defaultLang,
    items: state.app.languages.items
  };
};

LanguagesNav = connect(
  mapStateToProps
)(LanguagesNav);

export default LanguagesNav;
