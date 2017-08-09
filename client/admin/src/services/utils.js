export const createReducer = (initialState, handlers) => {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
};

export const getPageCount = (count, limit) => {
  const pageCount = count % limit ? 1 : 0;
  return parseInt(count / limit) + pageCount;
};

