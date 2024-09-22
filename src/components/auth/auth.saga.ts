// auth.saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { authRoutine } from './auth.reducer';
import { create } from '../../services/api';
// Create an instance of API sauce


// Worker saga: handle auth API call
function* handleAuth(action: ReturnType<typeof authRoutine.trigger>) {
  try {
    const response = yield call(api.post, '/login', action.payload); // Replace with your API path
    if (response.ok) {
      yield put(authRoutine.success(response.data)); // Dispatch success action
    } else {
      yield put(authRoutine.failure(response.problem)); // Dispatch failure action
    }
  } catch (error: Error | unknown) {
    yield put(authRoutine.failure(error.message ?? 'An unknown error occurred'));
  } finally {
    yield put(authRoutine.fulfill());
  }
}

// Watcher saga: watches for TRIGGER action
export function* watchAuth() {
  yield takeEvery(authRoutine.TRIGGER, handleAuth);
}

