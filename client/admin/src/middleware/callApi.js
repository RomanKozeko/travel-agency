import { camelizeKeys } from 'humps';
import { normalize, schema } from 'normalizr';

const API_ROOT = '/';

const getLangPref = () => {
  return window.location.href.split('/')[3]
};

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


export const categorySchema = new schema.Entity('categories', {}, { idAttribute: '_id' });
export const categoriesSchema = { items: [categorySchema] };

export const tourSchema = new schema.Entity('tours', { categories: [ categorySchema ] }, { idAttribute: '_id' });
export const toursSchema = { tours: [tourSchema] };

export const pageSchema = new schema.Entity('items', {}, { idAttribute: '_id' });
export const pagesSchema = { items: [pageSchema] };


export const Schemas = {
  TOUR: tourSchema,
  TOURS: toursSchema,
  PAGE: pageSchema,
  PAGES: pagesSchema
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
  const { schema, types, method, body } = callAPI;

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

	const requestOptions = !method || method === 'GET' ?
    {
		  method: 'GET'
	  }
	  :
    {
	    method: method,
	    headers: {'Content-Type': 'application/json', 'authorization': window.localStorage.token},
      body:JSON.stringify(body)
    };

  return callApi(endpoint, requestOptions, schema, nextPage).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  );
};

