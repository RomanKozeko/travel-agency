import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import { fetchItems } from '../app/appReducer'
import { getLanguages } from '../../rootReducer'
import { connect } from 'react-redux';
import classNames from 'classnames';

const styles = StyleSheet.create({
  link: {
    textTransform: 'uppercase',
    margin: '0 5px',
    display: 'inline-block',
    padding: '2px;',
    lineHeight: '14px'
  },
  active: {
    background: '#1593d0',
    color: '#fff',
    ':hover': {
      color: '#fff',
      textDecoration: 'none'
    }
  },
  wrapper: {
    width: '100%;'
  }
});

class LanguagesNav extends React.Component {
	componentDidMount() {
		if (!this.props.items.length) {
			this.props.fetchItems();
		}
	}

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
    prefix: state.app.languages.languagePrefix,
    defaultLang: state.app.languages.defaultLang,
    items: getLanguages(state)
  };
};

LanguagesNav = connect(
  mapStateToProps,
  { fetchItems }
)(LanguagesNav);

export default LanguagesNav;
