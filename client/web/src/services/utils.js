export const createReducer = (initialState, handlers) => {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
};

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

export const getLangUrlPref = () => {
	const currPrefix = window.location.href.split('/')[3];
	const languages = JSON.parse(window.localStorage.t_languages);
	const pref = languages.find(lang => lang.prefix === currPrefix);
	if (pref) {
		return pref._id;
	}
	return languages.find(lang => lang.prefix === 'ru')._id;
};

export const withPrefix = (endpoint) => {
	const langPref = getLangUrlPref();
	if(langPref) {
		const separator = (endpoint.indexOf('?') > -1) ? '&' : '?';
		return `${endpoint}${separator}lang=${langPref}`
	}
	return endpoint
};



export const getPageCount = (count, limit) => {
  return parseInt(count/limit) + (count % limit)
};

