import { createReducer } from '../../services/utils';

function defaultEntity(options) {
  return { ...{ byId : {}, allIds : [] }, ...options }
}

const defaultState = {
  languages: defaultEntity(),
  regions: defaultEntity(),
  hotels: defaultEntity({ filter: {}}),
  showplaces: defaultEntity({ filter: {}})
};

const mergeIds = (allIds, newIds) => {
  const res = [...allIds];

  newIds.forEach(id => {
    if (!res.includes(id)) {
      res.push(id)
    }
  });

  return  res;
};

const hotelReducer = {
  itemsSuccess: function(state, action) {
    const res = action.response;
    let hotels = {...state.hotels};
    let regions = {...state.regions};

    let regionsAllIds = res.entities.regions ? Object.keys(res.entities.regions) : [];
    let hotelsIDs = res.result.items ? res.result.items : [res.result];

    regions = {
      ...regions,
      byId: {...regions.byId, ...res.entities.regions},
      allIds: mergeIds(regions.allIds, regionsAllIds)
    };
    hotels = {
      ...hotels,
      byId: {...hotels.byId, ...action.response.entities.items},
      allIds: mergeIds(hotels.allIds, hotelsIDs),
      filter: {}
    };
    return {
      ...state,
      hotels,
      regions
    };
  },
  deleteSuccess: function(state, action) {
    const hotels = { ...state.hotels };
    const idsToRemove = action.response.result;
    const byId = { ...hotels.byId };
    const allIds = [...hotels.allIds];

    Object.keys(idsToRemove).forEach((id) => {
      delete byId[idsToRemove[id]];
      const index = allIds.indexOf(idsToRemove[id]);
      if (index > -1) {
        allIds.splice(index, 1);
      }
    });
    return {
      ...state,
      hotels: { ...hotels, byId, allIds, filter: {} }
    };
  },
  filteredItemsSuccess: (state, action) => {
    const items = action.response.result.items;
    let hotels = { ...state.hotels };
    const key = action.endpoint.split('?')[1];

    hotels.filter = {
      ...hotels.filter,
      [key]: items
    };

    return {
      ...state,
      hotels
    }
  }
};

const regionReducer = {
  itemsSuccess: function(state, action) {
    const res = action.response;
    let regions = {...state.regions};
    let regionsAllIds = Object.keys(res.entities.regions || res.entities);

    regions = {
      byId: {...regions.byId, ...res.entities.regions},
      allIds: mergeIds(regions.allIds, regionsAllIds)
    };

    return {
      ...state,
      regions
    };
  },
  deleteSuccess: function(state, action) {
    const hotels = { ...state.regions };
    const idsToRemove = action.response.result;
    const byId = { ...hotels.byId };
    const allIds = [...hotels.allIds];

    Object.keys(idsToRemove).forEach((id) => {
      delete byId[idsToRemove[id]];
      const index = allIds.indexOf(idsToRemove[id]);
      if (index > -1) {
        allIds.splice(index, 1);
      }
    });
    return {
      ...state,
      regions: { byId, allIds }
    };
  }
};

const showPlaceReducer = {
  itemsSuccess: function(state, action) {
    const res = action.response;
    let showplaces = {...state.showplaces};
    let regions = {...state.regions};

    let regionsAllIds = res.entities.regions ? Object.keys(res.entities.regions) : [];
    let showplaceIDs = res.result.items ? res.result.items : [res.result];

    regions = {
      ...regions,
      byId: {...regions.byId, ...res.entities.regions},
      allIds: mergeIds(regions.allIds, regionsAllIds)
    };
    showplaces = {
      ...showplaces,
      byId: {...showplaces.byId, ...action.response.entities.items},
      allIds: mergeIds(showplaces.allIds, showplaceIDs),
      filter: {}
    };
    return {
      ...state,
      showplaces,
      regions
    };
  },
  deleteSuccess: function(state, action) {
    const showplaces = { ...state.showplaces };
    const idsToRemove = action.response.result;
    const byId = { ...showplaces.byId };
    const allIds = [...showplaces.allIds];

    Object.keys(idsToRemove).forEach((id) => {
      delete byId[idsToRemove[id]];
      const index = allIds.indexOf(idsToRemove[id]);
      if (index > -1) {
        allIds.splice(index, 1);
      }
    });
    return {
      ...state,
      showplaces: { ...showplaces, byId, allIds, filter: {} }
    };
  },
  filteredItemsSuccess: (state, action) => {
    const items = action.response.result.items;
    let showplaces = { ...state.showplaces };
    const key = action.endpoint.split('?')[1];

    showplaces.filter = {
      ...showplaces.filter,
      [key]: items
    };

    return {
      ...state,
      showplaces
    }
  }
};

const regionsActions = {
  'REGIONS_SUCCESS': regionReducer.itemsSuccess,
  'REGION_SUCCESS': regionReducer.itemsSuccess,
  'REGION_SAVE_SUCCESS': regionReducer.itemsSuccess,
  'REGIONS_DELETE_SUCCESS': regionReducer.deleteSuccess,
};

const hotelsActions = {
  'HOTELS_SUCCESS': hotelReducer.itemsSuccess,
  'HOTEL_SUCCESS': hotelReducer.itemsSuccess,
  'HOTEL_SAVE_SUCCESS': hotelReducer.itemsSuccess,
  'HOTELS_DELETE_SUCCESS': hotelReducer.deleteSuccess,
  'FILTERED_HOTELS_SUCCESS': hotelReducer.filteredItemsSuccess,
};

const showplacesActions = {
  'SHOWPLACES_SUCCESS': showPlaceReducer.itemsSuccess,
  'SHOWPLACE_SUCCESS': showPlaceReducer.itemsSuccess,
  'SHOWPLACE_SAVE_SUCCESS': showPlaceReducer.itemsSuccess,
  'SHOWPLACES_DELETE_SUCCESS': showPlaceReducer.deleteSuccess,
  'FILTERED_SHOWPLACES_SUCCESS': showPlaceReducer.filteredItemsSuccess,
};

const entitiesReducer = createReducer(defaultState, {
  ...hotelsActions,
  ...regionsActions,
  ...showplacesActions,
});

export default entitiesReducer;

//  selectors
export const getHotels = state => (state.allIds.map(id => state.byId[id]));
export const getHotel = (state, id) => (state.byId[id] ? {...state.byId[id]} : false);
export const getHotelsByFilter = (state, filter) => {
  const items = state.filter[filter] ? [...state.filter[filter]] : false;
  if (items) {
    return items.map(item => ({...state.byId[item]}))
  }
  return [];
};

export const getRegions = state => (state.allIds.map(id => state.byId[id]));
export const getRegion = (state, id) => (state.byId[id] ? {...state.byId[id]} : false);

export const getShowplaces = state => (state.allIds.map(id => state.byId[id]));
export const getShowplace = (state, id) => (state.byId[id] ? {...state.byId[id]} : false);
export const getShowplacesByFilter = (state, filter) => {
  const items = state.filter[filter] ? [...state.filter[filter]] : false;
  if (items) {
    return items.map(item => ({...state.byId[item]}))
  }
  return [];
};
