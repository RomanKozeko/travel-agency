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

const chunk = (r, j) => r.reduce((a, b, i, g) => !(i % j) ? a.concat([g.slice(i, i + j)]) : a, []);
export const updatePages = (pagesIds, itemsPerPage) => (
  chunk(pagesIds, itemsPerPage)
    .reduce((acc, cur, i) => {
      acc[i] = cur;
      return acc;
    }, {})
);

export function createBasicActions(alias, aliasPlural, endpoint, middleware, schemas) {
  const actions = {
    [`${alias}_REQUEST`]: `${alias}_REQUEST`,
    [`${alias}_SUCCESS`]: `${alias}_SUCCESS`,
    [`${alias}_FAILURE`]: `${alias}_FAILURE`,
    [`${alias}_DELETE_REQUEST`]: `${alias}_DELETE_REQUEST`,
    [`${alias}_DELETE_SUCCESS`]: `${alias}_DELETE_SUCCESS`,
    [`${alias}_DELETE_FAILURE`]: `${alias}_DELETE_FAILURE`,
    [`${alias}_GET_PAGE_FROM_CACHE`]: `${alias}_GET_PAGE_FROM_CACHE`,
    [`${aliasPlural}_REQUEST`]: `${aliasPlural}_REQUEST`,
    [`${aliasPlural}_SUCCESS`]: `${aliasPlural}_SUCCESS`,
    [`${aliasPlural}_FAILURE`]: `${aliasPlural}_FAILURE`,
    [`${aliasPlural}_SAVE_REQUEST`]: `${aliasPlural}_SAVE_REQUEST`,
    [`${aliasPlural}_SAVE_SUCCESS`]: `${aliasPlural}_SAVE_SUCCESS`,
    [`${aliasPlural}_SAVE_FAILURE`]: `${aliasPlural}_SAVE_FAILURE`,
    [`${aliasPlural}_SAVE_FAILURE`]: `${aliasPlural}_SAVE_FAILURE`,
  };

  const fetch = () => ({
    [middleware]: {
      types: [`${alias}_REQUEST`, `${alias}_SUCCESS`, `${alias}_FAILURE`],
      endpoint: `/api/${endpoint}`,
      schema: schemas[alias],
    }
  });

  const fetchWithPagination = (nextPageUrl, nextPage) => ({
    [middleware]: {
      types: [`${alias}_REQUEST`, `${alias}_SUCCESS`, `${alias}_FAILURE`],
      endpoint: nextPageUrl,
      schema: schemas[alias],
      nextPage
    }
  });

  const load = () => (dispatch) => {
      return dispatch(fetch());
  };

  const loadWithPagination = (nextPage = 0) => (dispatch, getState) => {
    const {
      nextPageUrl = `/api/${endpoint}/?page=${nextPage}&limit=100`,
      pages,
      pageCount,
      isFetched
    } = getState()[endpoint];

    if (nextPage < 0 || (nextPage === pageCount && pageCount !== 0)) {
      return null;
    }
    // TODO: support pagination
    if (pages && pages[nextPage] && isFetched) {
      return dispatch({
        type: `${alias}_GET_PAGE_FROM_CACHE`,
        payload: nextPage
      });
    }

    return dispatch(fetchWithPagination(nextPageUrl, nextPage));
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

  const deleteItems = ids => ({
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
    deleteItems,
    loadWithPagination,
    loadItem,
    saveItem,
    load
  };
}

export const basicReducerEvents = {
  success: (alias) => (state, action) => {
    const payload = action.response;
    if (!payload.result) {
      return {
        ...state,
        isFetching: false,
        isFetched: true
      };
    }

    const allIdsResult = (payload.result instanceof Array) ? payload.result : payload.result.items
    return {
      ...state,
      allIds: [...allIdsResult],
      byIds: {...state.byIds, ...payload.entities[alias || 'items']},
      content: {...state.content, ...payload.entities.content},
      isFetching: false,
      isFetched: true
    };
  },
  deleteSuccess:
    (state, action) => {
      const idsToRemove = action.response.result;
      const byIds = { ...state.byIds };
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
        byIds,
        isDeleting: false
      };
    },
	itemSuccess:
    (alias) => (state, action) => {
			const payload = action.response;
			const allIds = [...state.allIds];
			if (state.allIds.indexOf(payload.result) === -1) {
				allIds.push(payload.result)
			}
			return {
				...state,
				allIds,
				byIds: {...state.byIds, ...payload.entities[alias || 'items']},
				content: {...state.content, ...payload.entities.content},
				isFetching: false,
				isSaving: false,
				pages: updatePages(allIds, state.itemsPerPage)
			};
		}
};

export function getFiltersQuery(filters) {
  let query = '';

  for (const filter in filters) {
    query += `${filter}=`;
    query += filters[filter].map(item => item._id || item).join(',');
    query += '&'
  }
  return query.slice(0, -1);
}

export const getContentByLanguage = (content, languageId) => content.find(
	item => item.language === languageId
)


