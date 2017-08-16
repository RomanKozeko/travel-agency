import { makeActionCreator } from '../../services/utils';
export const PAGE_ADD_CONTENT_ROW = 'PAGE_ADD_CONTENT_ROW';

// export const addRow = (columns) => {
//   // const page = { ...this.state.page };
//   // page.content[0].rows.push(new Row('Обычный контент', `col-sm-${12 / columns}`));
//   // this.setState({ page });
// }

export const addRow = makeActionCreator(PAGE_ADD_CONTENT_ROW, 'columns');