// saga.ts
import { all } from 'redux-saga/effects';
import { watchAuth } from '../components/auth';

export function* rootSaga() {
  yield all([
    watchAuth(),
    // Add other sagas here if needed
  ]);
}
