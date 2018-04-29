import React, { Component } from 'react';
import { compose, lifecycle } from 'recompose'
import {connect} from 'react-redux';
import Button from 'material-ui/Button';
import { Field } from 'redux-form'
import { StyleSheet, css } from 'aphrodite/no-important';
import { fetchCurrencies } from "./SettingsReducer";

const styles = StyleSheet.create({
  currItem: {
    display: 'flex',
    marginBottom: '20px'
  },
  wrapper: {
    margin: '20px 0'
  },
  input: {
    marginRight: '20px',
    height: '40px'
  }
})

const renderField = ({ currencies = [], input, label, type, meta: { touched, error } }) => (
  <div>
    <select {...input} type={type} className={css(styles.input)}>
      {
        currencies.map(item =>
          <option value={ `${item.Cur_Name},${item.Cur_Abbreviation},${item.Cur_ID}` }>
            { item.Cur_Name }
          </option>
        )
      }
    </select>
  </div>
)

export const Currencies = ({ fields, currencies, meta: { error, submitFailed } }) => (
  <div>
    <Button
      className={css(styles.button)}
      variant="raised"
      onClick={() => fields.push({})}
    >
      Добавить валюту
    </Button>
    {submitFailed && error && <span>{error}</span>}
    <ol className={ css(styles.wrapper) }>
      {fields.map((currency, index) => (
        <li key={index} className={ css(styles.currItem) }>
          <Field
            name={`${currency}.item`}
            type="text"
            currencies={ currencies }
            component={renderField}
          />
          <Button
            className={css(styles.button)}
            variant="raised"
            onClick={() => fields.remove(index)}
            color="accent"
          >
            Удалить валюту
          </Button>
        </li>
      ))}
    </ol>
  </div>
)


const mapStateToProps = (state) => {
  return {
    currenciesIsFetched: state.settings.currenciesIsFetched,
    currencies: state.settings.currencies,
  }
};


export default compose(
  connect(mapStateToProps, { fetchCurrencies }),
  lifecycle({
    componentDidMount() {
      if (!this.props.currenciesIsFetched) {
        this.props.fetchCurrencies()
      }
    }
  })
)(Currencies);