import { put, takeEvery, all } from 'redux-saga/effects'
import * as actions from './toursActions'

export function* addTour(data) {
  try {
    yield put(actions.addNewTourSuccess(data))
  } catch(error) {
    yield put(actions.addNewTourFailure(error))
  }
}

export function* watchAddTour() {
  yield takeEvery('ADD_TOUR_REQUEST', addTour)
}

export default function* rootSaga() {
  yield all([watchAddTour()])
}
