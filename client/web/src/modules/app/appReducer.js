import { getLangPref } from '../../services/utils';

const appReducer = (state = { languagePrefix: getLangPref(), defaultLang: 'ru' }, action) => {
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