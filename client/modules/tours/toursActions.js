
export const addNewTour = (newTourData) => {
  return {
    type: 'ADD_TOUR',
    tour: newTourData
  }
};
