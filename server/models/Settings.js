const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingsSchema = new Schema({
  pagesImg: String,
  currencies: [{
    item: String
  }],
  content: [{
    appTitle: String,
    appDescription: String,
    tourInfo: String,
    tourDescription: String,
    route: String,
    showPlaces: String,
    accommodation: String,
    currForLang: String,
    tourProgram: String,
    includedInPrice: String,
    notIncludedInPrice: String,
    orderTour: String,
    orderHotel: String,
    order: String,
    language: String,
    name: String,
    message: String,
    email: String,
    ourContacts: String,
    followUs: String,
    byName: String,
    regions: String,
    hotels: String,
    daysAmount: String,
    tourType: String,
    copyRight: String,
    submit: String,
    news: String,
    mostInteresting: String,
    phone: String,
    date: String,
    departureInfo: String,
    foodType: String,
    downloadTourProgram: String,
    moreInfo: String,
    emailSentMessage: String,
    emailSentContactsMessage: String,
    notFound: String,
    price: String,
    main: String,
    day: String,
    close: String,
  }]
});

module.exports = mongoose.model('Settings', SettingsSchema);
