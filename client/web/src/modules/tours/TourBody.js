import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite/no-important';
import { compose } from 'recompose';
import { DinnerIcon, ClockIcon, DateIcon, WorkIcon, PlaceIcon } from '../ui-elements/icons/Icons';
import PrefixLink from '../ui-elements/PrefixLink';
import { getContentByLanguage } from '../../services/utils';
import { theme } from '../../services/constans';

const styles = StyleSheet.create({
  wrapper: {
    minHeight: '210px',
    backgroundColor: '#ffffff',
    position: 'relative',
    borderRadius: '5px',
    transition: 'all .3s ease-in',
    marginBottom: '20px',
    ':hover': {
      boxShadow: '0 15px 35px rgba(0,0,0,0.15)'
    },
    overflow: 'hidden',
    '@media (min-width: 750px)': {
      display: 'flex',
      flexGrow: '1',
      paddingLeft: '220px',
    },
  },
  img: {
    display: 'flex',
    justifyContent: 'center',
    verticalAlign: 'center',
    width: '100%',
    paddingTop: '70%',
    backgroundColor: '#333',
    backgroundSize: 'cover',
    '@media (min-width: 750px)': {
      width: '210px',
      height: '100%',
      position: 'absolute',
      left: '0',
      top: '0',
      paddingTop: '0',
    },
  },
  content: {
    padding: '20px;',
    flex: '1',
    flexDirection: 'column',
    display: 'flex',
    '@media (min-width: 750px)': {
      flexDirection: 'row'
    },
  },
  contentRegions: {
    fontSize: '12px',
    color: '#bebebe;',
  },
  title: {
    fontSize: '18px;',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#222222;'
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '5px'
  },
  listItemText: {
    marginLeft: '10px'
  },
  contentLeft: {
    flexGrow: '1',
  },
  contentRight: {
    paddingTop: '20px',
    '@media (min-width: 750px)': {
      paddingTop: '0'
    },
  },
  listItemPrice: {
    textAlign: 'right',
    paddingBottom: '5px'
  },
  price: {
    fontSize: '23px',
    color: theme.colors.primary,
    fontWeight: 'bold'
  }
});

const getPrice = ({ price, priceBYN, priceRUB, priceEUR, pricePLN, priceUSD, currency, currencies }) => {
    if (!currency) {
        return `${priceBYN || price || '0'} BYN`;
    }

    const Cur_ID = currency.split(',')[2];

    if (Cur_ID === 'BYN') {
        return `${priceBYN || price || '0'} BYN`;
    }

    if (!priceBYN && !priceRUB && !priceEUR && !pricePLN && !priceUSD) {
        const currencyWithRate = currencies.find(item => item.Cur_ID === Number(Cur_ID));

        return `${((price / currencyWithRate.Cur_OfficialRate) * currencyWithRate.Cur_Scale).toFixed(0) || '0'} ${currencyWithRate.Cur_Abbreviation}`;
    }

    const { Cur_Abbreviation } = currencies.find(item => item.Cur_ID === Number(Cur_ID));

    switch (Cur_Abbreviation) {
        case 'BYN': return `${priceBYN} BYN`;
        case 'RUB': return `${priceRUB} RUB`;
        case 'EUR': return `${priceEUR} EUR`;
        case 'USD': return `${priceUSD} USD`;
        case 'PLN': return `${pricePLN} PLN`;
        default: return `${priceBYN || price} BYN`;
    }
}

const TourBody = ({
  tour: { url, preview, days, content = {}, food, categories },
  currency,
  languageID,
  currencies
}) => {
  const categoriesList = categories.map(category => {
    const content = getContentByLanguage(category.content, languageID)
    return content ? content.title : ''
  })

  const { price, priceBYN, priceRUB, priceEUR, pricePLN, priceUSD } = content;
  return (
    <div className={css(styles.content)}>
      <div className={css(styles.contentLeft)}>
        <h4 className={css(styles.title)}>
          <PrefixLink to={`/tours/${ url }`}>{ content.title }</PrefixLink>
        </h4>
        {
          content.mapName &&
          <div className={css(styles.listItem)}>
            <PlaceIcon color={ theme.colors.primary } width={20}/>
            <span className={css(styles.listItemText)}>{ content.mapName }</span>
          </div>
        }

        <div className={css(styles.listItem)}>
          <WorkIcon color={ theme.colors.primary } width={20}/>
					<span className={css(styles.listItemText)}>
						{
              categoriesList.join(', ')
            }
					</span>
        </div>
        {
          food &&
          <div className={css(styles.listItem)}>
            <DinnerIcon color={ theme.colors.primary } width={20}/>
						<span className={css(styles.listItemText)}>
							{
                getContentByLanguage(food.content, languageID) ? getContentByLanguage(food.content, languageID).title : ''
              }
						</span>
          </div>
        }

        {
          content.duration &&
          <div className={css(styles.listItem)}>
            <ClockIcon color={ theme.colors.primary } width={20}/>
            <span className={css(styles.listItemText)}>{ content.duration }</span>
          </div>
        }

        {
          days &&
          <div className={css(styles.listItem)}>
            <DateIcon color={ theme.colors.primary } width={20}/>
            <span className={css(styles.listItemText)}>{  window.TA.content.daysAmount }: { days }</span>
          </div>
        }
          <div className={css(styles.listItemPrice)}>
            <span className={css(styles.price)}>
              {
                getPrice({ price, priceBYN, priceRUB, priceEUR, pricePLN, priceUSD, currency, currencies })
              }
            </span>
          </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    languageID: state.app.languages.urlPrefix,
    currency: state.app.languages.currency,
    currencies: state.app.languages.currencies
  }
}

export default compose(
  connect(mapStateToProps)
)(TourBody)

