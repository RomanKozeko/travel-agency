import { makeActionCreator } from '../../services/utils';
export const PAGE_ADD_CONTENT_ROW = 'PAGE_ADD_CONTENT_ROW';

export const addRow = makeActionCreator(PAGE_ADD_CONTENT_ROW, 'columns');