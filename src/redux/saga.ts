// saga.ts
import { all } from 'redux-saga/effects';
import authSaga from '../components/auth/auth.saga';
import { create } from '../services/api';
import { BASEURL } from '../constants';
export const api = create(BASEURL)

export function* rootSaga() {
  yield all([
    ...authSaga(api),
    // Add other sagas here if needed
  ]);
}
