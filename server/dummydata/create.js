const mongoose = require('mongoose');
const chalk = require('chalk');
const faker = require('faker');

process.env.MONGODB_URI = `mongodb://localhost:27017/test`;

const Tour = require('../models/Tour');
const Region = require('../models/Region');
const TourCategory = require('../models/TourCategory');

mongoose.Promise = global.Promise;
var promise = mongoose.connect(
  process.env.MONGODB_URI || process.env.MONGOLAB_URI,
  {
    useMongoClient: true,
  }
);

const countryList = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antigua &amp; Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia',
  'Bosnia &amp; Herzegovina',
  'Botswana',
  'Brazil',
  'British Virgin Islands',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Cape Verde',
  'Cayman Islands',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Congo',
  'Cook Islands',
  'Costa Rica',
  'Cote D Ivoire',
  'Croatia',
  'Cruise Ship',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Estonia',
  'Ethiopia',
  'Falkland Islands',
  'Faroe Islands',
  'Fiji',
  'Finland',
  'France',
  'French Polynesia',
  'French West Indies',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guam',
  'Guatemala',
  'Guernsey',
  'Guinea',
  'Guinea Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Isle of Man',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jersey',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kuwait',
  'Kyrgyz Republic',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macau',
  'Macedonia',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Montserrat',
  'Morocco',
  'Mozambique',
  'Namibia',
  'Nepal',
  'Netherlands',
  'Netherlands Antilles',
  'New Caledonia',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'Norway',
  'Oman',
  'Pakistan',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Reunion',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Pierre &amp; Miquelon',
  'Samoa',
  'San Marino',
  'Satellite',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'South Africa',
  'South Korea',
  'Spain',
  'Sri Lanka',
  'St Kitts &amp; Nevis',
  'St Lucia',
  'St Vincent',
  'St. Lucia',
  'Sudan',
  'Suriname',
  'Swaziland',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  "Timor L'Este",
  'Togo',
  'Tonga',
  'Trinidad &amp; Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Turks &amp; Caicos',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'Uruguay',
  'Uzbekistan',
  'Venezuela',
  'Vietnam',
  'Virgin Islands (US)',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];
const categoriesList = ['Автобус', 'Самоелт', 'Поезд', 'Пешком'];

function generateTours(N, categories, regions) {
  let tours = [];

  for (i = 0; i < N; i++) {
    let rundomNum = Math.floor(Math.random() * 3);
    let randomItems = [];

    for (j = 0; j < rundomNum; j++) {
      randomItems.push(
        categories[Math.floor(Math.random() * categories.length)]._id
      );
    }

    let randomRegion =
      regions[Math.floor(Math.random() * categories.length)]._id;

    tours.push({
      preview: 1,
      content: {
        title: faker.lorem.word(),
        subTitle: faker.lorem.sentence(),
        price: faker.finance.amount(),
        picture: faker.image.city(),
        images: [
          faker.image.city(),
          faker.image.city(),
          faker.image.city(),
          faker.image.city(),
          faker.image.city(),
        ],
        description: faker.lorem.sentences(),
        content: faker.lorem.paragraphs(),
        startDate: faker.date.future(),
        endDate: faker.date.future(),
        language: 'ru',
      },
      region: randomRegion,
      categories: randomItems,
    });
  }

  return tours;
}

function generateCategories() {
  let categories = [];

  for (i = 0; i < categoriesList.length; i++) {
    categories.push({
      content: {
        title: categoriesList[i],
      },
    });
  }

  return categories;
}

function generateRegions() {
  let regions = [];

  for (i = 0; i < countryList.length; i++) {
    regions.push({
      content: {
        title: countryList[i],
      },
    });
  }

  return regions;
}

function removeTours() {
  return Tour.remove({});
}

function createTours(N, categories, regions) {
  return Tour.insertMany(generateTours(N, categories, regions));
}

function createCountries() {
  return Region.insertMany(generateRegions());
}

function createTerms() {
  return TourCategory.insertMany(generateCategories());
}

function init() {
  Region.find({}).then(regions => {
    if (regions.length > 0) {
      console.log(chalk.blue('regions > 0. Regions was found.'));

      TourCategory.find({}).then(categories => {
        if (categories.length > 0) {
          console.log(chalk.blue('categories > 0. Categories was found.'));

          Tour.find({}).then(tours => {
            if (tours.length > 0) {
              console.log(chalk.blue('tours > 0'));

              return;

              removeTours().then(() => {
                console.log(chalk.blue('all tours removed'));

                createTours(1000, categories, regions).then(tours => {
                  console.log(chalk.red('new tours generated'));
                });
              });
            } else {
              console.log(chalk.blue('tours == 0'));
              console.log(20, regions);

              createTours(1000, categories, regions).then(tours => {
                console.log(chalk.red('tours generated'));
              });
            }
          });
        } else {
          console.log(
            chalk.blue(
              'categories == 0. We need to generate and create categories'
            )
          );

          createTerms().then(categories => {
            console.log(chalk.red('categories generated'));
            init();
          });
        }
      });
    } else {
      createCountries().then(regions => {
        console.log(chalk.red('regions generated'));
        init();
      });
    }
  });
}

promise.then(function() {
  init();
});
