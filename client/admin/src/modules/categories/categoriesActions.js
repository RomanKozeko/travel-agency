import { createBasicActions } from '../../services/utils';
import { CALL_API, Schemas } from '../../middleware/callApi';

const actionsObj = createBasicActions('CATEGORIES', 'CATEGORY', 'categories', CALL_API, Schemas);

export const actions = actionsObj.actions;
export const loadCategories = actionsObj.load;
export const deleteCategories = actionsObj.deleteItem;
export const loadCategory = actionsObj.loadItem;
export const saveCategory = actionsObj.saveItem;
