const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

function action(type, payload = {}) {
  return {type, ...payload}
}

export const TOURS = createRequestTypes('TOURS');

export const requestTours = () => ({
  type: 'REQUEST_TOURS'
});

export const getToursSuccess = (tours) => ({
  type: 'REQUEST_TOURS_SUCCESS',
  tours
});

export const getToursFailure = () => ({
  type: 'REQUEST_TOURS_FAILURE'
});
