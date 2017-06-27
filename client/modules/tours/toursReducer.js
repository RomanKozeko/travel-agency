const toursItems = [
  {
    title: 'Тур по Греции'
  },
  {
    title: 'Тур по Италии 2'
  },
];

const toursReducer = (state = { items: toursItems}, action) => {
  switch (action.type) {
    case 'ADD_TOUR': {
      const items = [...state.items];
      items.push(action.newTour);

      return {
        ...state,
        items
      }
    }
    default:
      return state
  }
};

export default toursReducer;