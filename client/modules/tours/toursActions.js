export const addNewTourRequest = (newTourData) => {
  return {
    type: 'ADD_TOUR_REQUEST',
    tour: newTourData
  }
};

export const addNewTourSuccess = (newTourData) => {
  return {
    type: 'ADD_TOUR_SUCCESS',
    tour: newTourData
  }
};

export const addNewTourFailure = () => {
  return {
    type: 'ADD_TOUR_SUCCESS_FAILURE'
  }
};
