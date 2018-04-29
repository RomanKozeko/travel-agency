import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { StyleSheet, css } from 'aphrodite/no-important';
import LanguagesNav from '../ui-elements/LanguagesNav'
import { getContacts } from '../../rootReducer'
import { fetchContacts } from './headerReducer'
import { setCurrency, setCurrencies } from '../app/appReducer'
import { theme } from '../../services/constans'

const styles = StyleSheet.create({
  wrapper: {
    background: '#fff',
    padding: '10px 0',
    boxSizing: 'border-box'
  },
  item: {
    display: 'inline-flex',
    color: '#1593d0',
    marginRight: '20px',
    alignItems: 'center',
    '@media (max-width: 600px)': {
      marginTop: '10px'
    }
  },
  text: {
    color: 'rgba(34, 34, 34, 1);',
    fontSize: '13px',
    marginBottom: '5px'
  },
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    '@media (max-width: 600px)': {
      flexDirection: 'column-reverse;'
    }
  },
  right: {
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center',
    '@media (max-width: 600px)': {
      textAlign: 'center'
    }
  },
  
  textTelWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '-10px'
  },
  textTel: {
    width: 'calc(100% / 2 - 10px)',
    fontSize: '12px',
    marginLeft: '10px',
    marginBottom: '5px',
    display: 'flex',
    alignItems: 'center',
    '@media (min-width: 600px)': {
      width: 'calc(100% / 3 - 10px)',
    }
  },
  textTelImg: {
    maxHeight: '15px'
  },
  textTelContent: {
    marginLeft: '10px',
    whiteSpace: 'nowrap'
  },
  col: {
    width: '100%'
  },
  wrapperTop: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  select: {
    marginRight: '20px',
    borderRadius: '5px',
    border: `1px solid ${theme.colors.primary}`
  }
});

const TopNav = ({ items, setCurrency, currency }) => (
  <div className={css(styles.wrapper)}>
    <div className="container">
      <div className={css(styles.wrapperTop)}>
        <select className={css(styles.select)} value={currency} onChange={ (e) => { setCurrency( e.target.value )}}>
          {
            window.TA.currencies.map(({ item }) => {
              const splited = item.split(',')
              return <option value={ item }>{ splited[1] }</option>
            })
          }
        </select>
        <LanguagesNav/>

      </div>
      <div className={css(styles.inner)}>
        <div className={css(styles.col)}>
          <div className="row">
            {
              items.map(({ content, _id, tels }) => (
                <div className="col-md-6" key={ _id }>
                  <div className={css(styles.item)}>
                    <span className={css(styles.text)}>{ content.title }</span>
                  </div>
                  <div className={css(styles.textTelWrap)}>
                    {
                      tels.map(({ title, img }) =>
                        <div className={css(styles.textTel)}>
                          <img src={ img }  className={css(styles.textTelImg)} alt=""/>
                          <div className={css(styles.textTelContent)}>{ title }</div>
                        </div>
                      )
                    }
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  items: getContacts(state),
  isFetching: state.contacts.isFetching,
  isFetched: state.contacts.isFetched,
  currency: state.app.languages.currency
})

export default compose(
  connect(mapStateToProps, { fetchContacts, setCurrency, setCurrencies }),
  lifecycle({
    componentDidMount() {
      if (!this.props.isFetched) {
        this.props.fetchContacts()
      }

      window.TA.currencies.unshift({_id: 'BUN', item: 'Бун,BUN,BUN'});

      const currCurrency = window.TA.currencies.find(curr => {
        return curr.item.split(',')[1] === window.TA.content.currForLang
      });
      
      fetch('http://www.nbrb.by/API/ExRates/Rates?Periodicity=0', {
        method: 'GET'
      })
      .then(response => response.json()
        .then(res => {
          this.props.setCurrencies(res)
          this.props.setCurrency(currCurrency.item)
        })
      );

    }
  })
)(TopNav)
