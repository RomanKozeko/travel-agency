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


export const getPageCount = (count, limit) => {
  return parseInt(count/limit) + (count % limit)
};

