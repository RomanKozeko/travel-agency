import { createReducer } from '../../services/utils';
import { PAGE_ADD_CONTENT_ROW } from './pageActions';
import {
  PAGE_SUCCESS
} from './PagesActions';

const pageReducer = createReducer({ rowsByLanguages: {} }, {
  [PAGE_ADD_CONTENT_ROW]: (state, action) => ({ ...state, rowsByLanguages: action.payload }),
  [PAGE_SUCCESS]: (state, action) => ({ ...state, item: action.response.entities.items }),
});

export default pageReducer;
