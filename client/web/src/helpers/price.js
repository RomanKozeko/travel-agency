const getPrice = ({
  price,
  priceBYN,
  priceRUB,
  priceEUR,
  pricePLN,
  priceUSD,
  currency,
  currencies,
}) => {
  if (!currency) {
    return `${priceBYN || price || '0'} BYN`;
  }

  const Cur_ID = currency.split(',')[2];

  if (Cur_ID === 'BYN') {
    return `${priceBYN || price || '0'} BYN`;
  }

  if (!priceBYN && !priceRUB && !priceEUR && !pricePLN && !priceUSD) {
    const currencyWithRate = currencies.find(
      item => item.Cur_ID === Number(Cur_ID)
    );

    return price
      ? `${(
          (price / currencyWithRate.Cur_OfficialRate) *
          currencyWithRate.Cur_Scale
        ).toFixed(0) || '0'} ${currencyWithRate.Cur_Abbreviation}`
      : null;
  }

  const { Cur_Abbreviation } = currencies.find(
    item => item.Cur_ID === Number(Cur_ID)
  );

  switch (Cur_Abbreviation) {
    case 'BYN':
      return priceBYN ? `${priceBYN} BYN` : null;
    case 'RUB':
      return priceRUB ? `${priceRUB} RUB` : null;
    case 'EUR':
      return priceEUR ? `${priceEUR} EUR` : null;
    case 'USD':
      return priceUSD ? `${priceUSD} USD` : null;
    case 'PLN':
      return pricePLN ? `${pricePLN} PLN` : null;
    default:
      return priceBYN || price ? `${priceBYN || price} BYN` : null;
  }
};

export default getPrice;
