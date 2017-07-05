
const appReducer = (state = { languagePrefix: ''}, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE_PREFIX': {
      return {
        ...state,
        languagePrefix: action.prefix
      }
    }
    default:
      return state
  }
};

export default appReducer;