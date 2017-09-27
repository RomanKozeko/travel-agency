import { camelizeKeys } from 'humps';
import { normalize, schema } from 'normalizr';
import {toastr} from 'react-redux-toastr';
import React from 'react';

import createToaster from '../modules/ui-elements/createToaster';

const API_ROOT = '/';

function createRequestOptions(method, body) {
  if (!method || method === 'GET') {
    return {
      method: 'GET'
    };
  }

  return {
    method,
    headers: { 'Content-Type': 'application/json', authorization: window.localStorage.token },
    body: JSON.stringify(body)
  };
}

const callApi = (endpoint, options, schema, nextPage) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl, options)
    .then(response =>
      response.json().then((json) => {
        if (!response.ok) {
          return Promise.reject(json);
        }

        return Object.assign({},
          normalize(json, schema),
          { nextPage }
        );
      })
    );
};

export const rowItemSchema = new schema.Entity('rowsItems', {}, { idAttribute: '_id' });
export const rowSchema = new schema.Entity('rows', {
  items: [rowItemSchema]
}, { idAttribute: '_id' });
export const contentSchema = new schema.Entity('content', {
  rows: [rowSchema],
}, { idAttribute: '_id' });

export const categoryContentSchema = new schema.Entity('content', {}, { idAttribute: '_id' });
export const categorySchema = new schema.Entity('items', {}, { idAttribute: '_id' });
export const categoriesSchema = [categorySchema];

export const regionSchema = new schema.Entity('items', {}, { idAttribute: '_id' });
export const regionsSchema = [regionSchema];

export const tourSchema = new schema.Entity('tours', {
  categories: [categorySchema],
  regions: [regionSchema]
}, { idAttribute: '_id' });
export const toursSchema = { tours: [tourSchema] };

export const pageSchema = new schema.Entity('items', {
  content: [contentSchema],
}, { idAttribute: '_id' });
export const pagesSchema = { items: [pageSchema] };


export const languageSchema = new schema.Entity('items', {}, { idAttribute: '_id' });
export const languagesSchema = [languageSchema];

export const Schemas = {
  TOUR: tourSchema,
  TOURS: toursSchema,
  PAGE: pageSchema,
  PAGES: pagesSchema,
  LANGUAGES: languagesSchema,
  REGION: regionSchema,
  REGIONS: regionsSchema,
  CATEGORY: categorySchema,
  CATEGORIES: categoriesSchema
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API';

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => (action) => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint, nextPage } = callAPI;
  const { schema, types, method, body, toasterMsg } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const actionWith = (data) => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return callApi(endpoint, createRequestOptions(method, body), schema, nextPage).then(
    (response) => {
      if (toasterMsg) {
        toastr.success('', '', createToaster(toasterMsg.success));
      }
      return next(actionWith({
        response,
        type: successType
      }));
    },
    (error) => {
      toastr.error('', '', createToaster(error.message || 'Something bad happened'));
      return next(actionWith({
        type: failureType,
        error: error.message || 'Something bad happened'
      }));
    }
  );
};

