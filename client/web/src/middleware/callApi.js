import { normalize, schema } from 'normalizr';

const API_ROOT = '/';

function createRequestOptions(method, body) {
  if (!method || method === 'GET') {
    return {
      method: 'GET',
    };
  }

  return {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

const callApi = (endpoint, options, schema, nextPage, query) => {
  const fullUrl =
    endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl, options).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return Object.assign({}, normalize(json, schema), { nextPage, query });
    })
  );
};

export const tourSchema = new schema.Entity(
  'items',
  {},
  { idAttribute: 'url' }
);
export const toursSchema = { items: [tourSchema] };

export const pageSchema = new schema.Entity(
  'pages',
  {},
  { idAttribute: 'url' }
);
export const pagesSchema = { items: [pageSchema] };

export const languageSchema = new schema.Entity(
  'items',
  {},
  { idAttribute: '_id' }
);
export const languagesSchema = [languageSchema];

export const menuSchema = new schema.Entity(
  'items',
  {},
  { idAttribute: '_id' }
);
export const menuItemsSchema = { items: [menuSchema] };

export const itemSchema = new schema.Entity(
  'items',
  {},
  { idAttribute: '_id' }
);
export const itemsSchema = { items: [itemSchema] };

export const itemByUrlSchema = new schema.Entity(
  'items',
  {},
  { idAttribute: '_id' }
);
export const itemsByUrlSchema = { items: [itemSchema] };

export const regionSchema = new schema.Entity(
  'items',
  {},
  { idAttribute: '_id' }
);
export const regionsSchema = [regionSchema];

export const categorySchema = new schema.Entity(
  'items',
  {},
  { idAttribute: '_id' }
);
export const categoriesSchema = [categorySchema];

export const Schemas = {
  TOUR: tourSchema,
  TOURS: toursSchema,
  PAGES: pagesSchema,
  PAGE: pageSchema,
  LANGUAGES: languagesSchema,
  PROMO_LINK: itemSchema,
  PROMO_LINKS: itemsSchema,
  NEWS_ITEM: itemSchema,
  NEWS: itemsSchema,
  CONTACTS_ITEM: itemSchema,
  CONTACTS: itemsSchema,
  REGION: regionSchema,
  REGIONS: regionsSchema,
  CATEGORY: categorySchema,
  CATEGORIES: categoriesSchema,
  MENU: menuItemsSchema,
  HOTEL: itemByUrlSchema,
  HOTELS: itemsByUrlSchema,
  SHOWPLACE: itemByUrlSchema,
  SHOWPLACES: itemsByUrlSchema,
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API';

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint, nextPage, query, method, body } = callAPI;
  const { schema, types } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  // if (!schema) {
  //   throw new Error('Specify one of the exported Schemas.')
  // }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return callApi(
    endpoint,
    createRequestOptions(method, body),
    schema,
    nextPage,
    query
  ).then(
    response =>
      next(
        actionWith({
          response,
          type: successType,
        })
      ),
    error =>
      next(
        actionWith({
          type: failureType,
          error: error.message || 'Something bad happened',
        })
      )
  );
};
