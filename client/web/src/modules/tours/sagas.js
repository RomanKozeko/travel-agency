import { take, put, call, fork, select, all, takeEvery } from 'redux-saga/effects'
import { getToursSuccess, getToursFailure } from './toursActions'
import { fetchTours } from '../../services/apiHelper'

export function* requestTours() {
  const response = yield call(fetchTours);
  if (!response.error) {
    yield put(getToursSuccess(response.tours))
  } else {
    yield put(getToursFailure())
  }
}

export function* watchRequestTours() {
  yield takeEvery('REQUEST_TOURS', requestTours)
}

export default function* rootSaga() {
  yield all([watchRequestTours()])
}

