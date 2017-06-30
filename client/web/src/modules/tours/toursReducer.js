const toursItems = [];

const toursReducer = (state = { items: toursItems}, action) => {
  switch (action.type) {
    case 'REQUEST_TOURS_SUCCESS': {
      return {
        ...state,
        items: action.tours
      }
    }
    default:
      return state
  }
};

export default toursReducer;