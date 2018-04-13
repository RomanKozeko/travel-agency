export const createReducer = (initialState, handlers) => {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
};

export function createBasicActions(aliasPlural, endpoint, middleware, schemas) {
  const actions = {
    [`${aliasPlural}_REQUEST`]: `${aliasPlural}_REQUEST`,
    [`${aliasPlural}_SUCCESS`]: `${aliasPlural}_SUCCESS`,
    [`${aliasPlural}_FAILURE`]: `${aliasPlural}_FAILURE`,
  };

  const fetch = (lang) => ({
    [middleware]: {
      types: [`${aliasPlural}_REQUEST`, `${aliasPlural}_SUCCESS`, `${aliasPlural}_FAILURE`],
      endpoint: withPrefix(`/api/${endpoint}`, lang),
      schema: schemas[aliasPlural],
    }
  });

  const load = () => (dispatch, getState) => {
    return dispatch(fetch(getState().app.languages.urlPrefix));
  };

  return {
    actions,
    load
  };
}

export const getLangPref = () => {
  try {
    const pref = window.location.href.split('/')[3];
    if (pref.length > 2) {
      return 'ru';
    }
    return window.location.href.split('/')[3];
  } catch (err) {
    return '';
  }
};


export const makeActionCreator = (type, ...argNames) => {
  return function (...args) {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    });
    return action
  }
};

export const getLangUrlPref = (languages, currPrefix) => {
	const pref = languages.find(lang => lang.prefix === currPrefix);
	if (pref) {
		return pref._id;
	}
	return languages.find(lang => lang.prefix === 'ru')._id;
};

export const withPrefix = (endpoint, langPref) => {
	if(langPref) {
		const separator = (endpoint.indexOf('?') > -1) ? '&' : '?';
		return `${endpoint}${separator}lang=${langPref}`
	}
	return endpoint
};

export const getPageCount = (count, limit) => {
  return parseInt(count/limit) + (count % limit)
};

export const getContentByLanguage = (content, languageId) => content.find(
	item => item.language === languageId
);

export const getImageById = (allImages, id) => allImages.find(
  item => item._id === id
);

export const getFiltersQuery = filters => {
  let query = '';

  for (const filter in filters) {
    if (filters[filter].length) {
      query += `${filter}=`;
      query += typeof filters[filter] === 'object' ?
        filters[filter].map(item => item._id || item).join(','):
        filters[filter];
      query += '&'
    }
  }
  return query.slice(0, -1);
};
