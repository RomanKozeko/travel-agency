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

  const saveItem = (id) => {
    return null;
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


//
// const fetchPages = (nextPageUrl, nextPage) => ({
//   [CALL_API]: {
//     types: [PAGES_REQUEST, PAGES_SUCCESS, PAGES_FAILURE],
//     endpoint: nextPageUrl,
//     schema: Schemas.PAGES,
//     nextPage
//   }
// });
//
//
//
// const fetchPage = id => ({
//   [CALL_API]: {
//     types: [PAGE_REQUEST, PAGE_SUCCESS, PAGE_FAILURE],
//     endpoint: `/api/pages/${id}`,
//     schema: Schemas.PAGE,
//   }
// });
//
// export const loadPage = id => (dispatch, getState) => {
//   const state = getState().pages;
//   if (!state.byIds[id]) {
//     return dispatch(fetchPage(id));
//   }
//   return null;
// };
//
// export const deletePages = ids => ({
//   [CALL_API]: {
//     types: [PAGES_DELETE_REQUEST, PAGES_DELETE_SUCCESS, PAGES_DELETE_FAILURE],
//     method: 'DELETE',
//     endpoint: '/api/pages',
//     toasterMsg: {
//       success: 'Pages deleted'
//     },
//     body: ids,
//     schema: Schemas.PAGES,
//   }
// });
