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
  return parseInt(count / limit, 10) + pageCount;
};

export const makeActionCreator = (type, ...argNames) => {
  return function (...args) {
    let action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
};

export function createBasicActions(alias, aliasPlural, endpoint, middleware, schemas) {
  const actions = {
    [`${alias}_REQUEST`]: `${alias}_REQUEST`,
    [`${alias}_SUCCESS`]: `${alias}_SUCCESS`,
    [`${alias}_FAILURE`]: `${alias}_FAILURE`,
    [`${alias}_DELETE_REQUEST`]: `${alias}_DELETE_REQUEST`,
    [`${alias}_DELETE_SUCCESS`]: `${alias}_DELETE_SUCCESS`,
    [`${alias}_DELETE_FAILURE`]: `${alias}_DELETE_FAILURE`,
    [`${aliasPlural}_REQUEST`]: `${aliasPlural}_REQUEST`,
    [`${aliasPlural}_SUCCESS`]: `${aliasPlural}_SUCCESS`,
    [`${aliasPlural}_FAILURE`]: `${aliasPlural}_FAILURE`,
    [`${aliasPlural}_SAVE_REQUEST`]: `${aliasPlural}_SAVE_REQUEST`,
    [`${aliasPlural}_SAVE_SUCCESS`]: `${aliasPlural}_SAVE_SUCCESS`,
    [`${aliasPlural}_SAVE_FAILURE`]: `${aliasPlural}_SAVE_FAILURE`,
  };

  const fetch = () => ({
    [middleware]: {
      types: [`${alias}_REQUEST`, `${alias}_SUCCESS`, `${alias}_FAILURE`],
      endpoint: `/api/${endpoint}`,
      schema: schemas[alias],
    }
  });

  const load = () => (dispatch, getState) => {
    const { allIds } = getState()[alias.toLowerCase()];

    if (!allIds.length) {
      return dispatch(fetch());
    }

    return null;
  };

  const loadItem = id => ({
    [middleware]: {
      types: [`${aliasPlural}_REQUEST`, `${aliasPlural}_SUCCESS`, `${aliasPlural}_FAILURE`],
      endpoint: `/api/${endpoint}/${id}`,
      schema: schemas[aliasPlural],
    }
  });

  const saveItem = (payload, isNew) => (dispatch) => {
    return dispatch({
      [middleware]: {
        types: [`${aliasPlural}_SAVE_REQUEST`, `${aliasPlural}_SAVE_SUCCESS`, `${aliasPlural}_SAVE_FAILURE`],
        method: isNew ? 'POST' : 'PUT',
        endpoint: isNew ? `/api/${endpoint}/` : `/api/${endpoint}/${payload._id}`,
        body: payload,
        toasterMsg: {
          success: 'Saved'
        },
        schema: schemas[aliasPlural]
      }
    });
  };

  const deleteItem = ids => ({
    [middleware]: {
      types: [`${alias}_DELETE_REQUEST`, `${alias}_DELETE_SUCCESS`, `${alias}_DELETE_FAILURE`],
      method: 'DELETE',
      endpoint: `/api/${endpoint}`,
      toasterMsg: {
        success: 'Deleted'
      },
      body: ids,
      schema: schemas[alias],
    }
  });

  return {
    actions,
    deleteItem,
    loadItem,
    saveItem,
    load
  };
}

export const basicReducerEvents = {
  success: (state, action) => {
    const payload = action.response;
    return {
      ...state,
      allIds: [...state.allIds, ...payload.result],
      byIds: {...state.byIds, ...payload.entities.items},
      content: {...state.content, ...payload.entities.content},
      isFetching: false
    };
  },
  deleteSuccess:
    (state, action) => {
      const idsToRemove = action.response.result;
      const byIds = {...state.byIds};
      const allIds = [...state.allIds];

      Object.keys(idsToRemove).forEach((id) => {
        delete byIds[idsToRemove[id]];
        const index = allIds.indexOf(idsToRemove[id]);
        if (index > -1) {
          allIds.splice(index, 1);
        }
      });

      return {
        ...state,
        allIds,
        byIds
      };
    },
  itemSuccess:
    (state, action) => {
      const payload = action.response;

      return {
        ...state,
        allIds: [...state.allIds, payload.result],
        byIds: { ...state.byIds, ...payload.entities.items },
        content: {...state.content, ...payload.entities.content },
        isFetching: false,
        isSaving: false
      };
    }
};
