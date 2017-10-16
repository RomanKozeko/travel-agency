import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import { fetchLanguages } from '../../services/apiHelper';
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
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    fetchLanguages().then((res) => {
      window.localStorage.setItem('t_languages', JSON.stringify(res));
      this.setState({
        items: res
      });
    });
  }

  render() {
    if (!this.state.items.length) {
      return null;
    }
    return (
      <div className={css(styles.wrapper)}>
        {this.state.items.map(item => {
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
    prefix: state.app.languagePrefix,
    defaultLang: state.app.defaultLang
  };
};

LanguagesNav = connect(
  mapStateToProps,
)(LanguagesNav);

export default LanguagesNav;
