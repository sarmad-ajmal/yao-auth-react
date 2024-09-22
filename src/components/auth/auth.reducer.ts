// auth.reducer.ts
import { createRoutine, Routine } from 'redux-saga-routines';

export const authRoutine = createRoutine('AUTH_ROUTINE');

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action: Routine): AuthState => {
  switch (action.type) {
    case authRoutine.TRIGGER:
      return { ...state, loading: true };
    case authRoutine.SUCCESS:
      return { ...state, loading: false, isAuthenticated: true };
    case authRoutine.FAILURE:
      return { ...state, loading: false, error: action.payload };
    case authRoutine.FULFILL:
      return { ...state, loading: false };
    default:
      return state;
  }
};
