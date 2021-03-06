import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose, lifecycle } from 'recompose';
import { StyleSheet, css } from 'aphrodite/no-important';
import LanguagesNav from '../ui-elements/LanguagesNav';
import { getContacts } from '../../rootReducer';
import { setCurrency, setCurrencies } from '../app/appReducer';
import { theme, EMAIL_REGEX } from '../../services/constans';

import SocialLinks from '../social/SocialLinks';

const styles = StyleSheet.create({
  wrapper: {
    background: '#fff',
    padding: '10px 0',
    boxSizing: 'border-box',
  },
  item: {
    display: 'inline-flex',
    color: '#1593d0',
    marginRight: '20px',
    alignItems: 'center',
    '@media (max-width: 600px)': {
      marginTop: '10px',
    },
  },
  text: {
    color: 'rgba(34, 34, 34, 1);',
    fontSize: '13px',
    marginBottom: '5px',
  },
  inner: {
    display: 'block',
    paddingTop: '20px',
    justifyContent: 'space-between',
    '@media (min-width: 1000px)': {
      display: 'flex',
    },
  },
  right: {
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center',
    '@media (max-width: 600px)': {
      textAlign: 'center',
    },
  },

  textTelWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '-10px',
  },
  textTel: {
    width: '100%',
    fontSize: '12px',
    marginLeft: '10px',
    marginBottom: '5px',
    display: 'flex',
    alignItems: 'center',
    '@media (min-width: 400px)': {
      width: 'calc(100% / 2 - 10px)',
    },
    '@media (min-width: 600px)': {
      width: 'calc(100% / 3 - 10px)',
    },
  },
  textTelImg: {
    maxHeight: '15px',
  },
  textTelContent: {
    marginLeft: '10px',
    whiteSpace: 'nowrap',
    color: '#222',
    ':hover': {
      color: '#222',
      textDecoration: 'none',
    },
  },
  col: {
    width: '100%',
  },
  wrapperTop: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  select: {
    marginRight: '20px',
    borderRadius: '5px',
    border: `1px solid ${theme.colors.primary}`,
  },
  logoBssr: {
    backgroundImage: 'url(/web/build/bssrLogo.png)',
    width: '215px',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    marginLeft: '10px',
    marginTop: '5px',
    height: '120px',
    display: 'none',
    '@media (min-width: 600px)': {
      display: 'block',
    },
  },
  logo: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundImage: 'url(/web/build/logo.jpg)',
    backgroundSize: 'cover',
    color: '#222',
    width: '133px',
    height: '120px',
    fontSize: '0',
    margin: '5px 0',
  },
  logoWrap: {
    display: 'flex',
    paddingRight: '20px',
  },
});

const TopNav = ({ items, setCurrency, currency }) => (
  <div className={css(styles.wrapper)}>
    <div className="container">
      <div className={css(styles.wrapperTop)}>
        <select
          className={css(styles.select)}
          value={currency}
          onChange={e => {
            setCurrency(e.target.value);
          }}
        >
          {window.TA.currencies.map(({ item }) => {
            const splited = item.split(',');
            return (
              <option value={item} key={item}>
                {splited[1]}
              </option>
            );
          })}
        </select>
        <LanguagesNav />
      </div>
      <div className={css(styles.inner)}>
        <div className={css(styles.logoWrap)}>
          <Link to="/" className={css(styles.logo)}>
            Logo
          </Link>
          <div className={css(styles.logoBssr)} />
        </div>
        <div className={css(styles.col)}>
          {items.map(({ content, _id, tels }) => (
            <div key={_id}>
              <div className={css(styles.item)}>
                <span className={css(styles.text)}>{content.title}</span>
              </div>
              <div className={css(styles.textTelWrap)}>
                {tels.map(({ title, img, _id }) => {
                  const prefix = EMAIL_REGEX.test(title) ? 'mailto' : 'tel';
                  return (
                    <div className={css(styles.textTel)} key={_id}>
                      <img
                        src={img}
                        className={css(styles.textTelImg)}
                        alt=""
                      />
                      <a
                        href={`${prefix}:${title}`}
                        className={css(styles.textTelContent)}
                      >
                        {title}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-3">
          <h4 className={css(styles.header)}>{window.TA.content.followUs}</h4>
          <SocialLinks />
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  items: getContacts(state),
  currency: state.app.languages.currency,
});

export default compose(
  connect(mapStateToProps, { setCurrency, setCurrencies }),
  lifecycle({
    componentDidMount() {
      window.TA.currencies.unshift({ _id: 'BYN', item: 'Бун,BYN,BYN' });

      const currCurrency = window.TA.currencies.find(curr => {
        return curr.item.split(',')[1] === window.TA.content.currForLang;
      });

      fetch('http://www.nbrb.by/API/ExRates/Rates?Periodicity=0', {
        method: 'GET',
      }).then(response =>
        response.json().then(res => {
          this.props.setCurrencies(res);
          if (currCurrency) {
            this.props.setCurrency(currCurrency.item);
          }
        })
      );
    },
  })
)(TopNav);
