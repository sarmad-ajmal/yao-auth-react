// auth.reducer.ts
import { authenticateUserAction, loginAction } from './auth.action'
import { AuthReducerState } from './auth.interface'
import { AnyAction } from 'redux-saga'

const initialState: AuthReducerState = {
  loading: false,
  accessToken: '448',
  refreshToken: '',
  user: null,
}

export const authReducer = (
  state = initialState,
  action: AnyAction,
): AuthReducerState => {
  switch (action.type) {
    case authenticateUserAction.TRIGGER:
      return { ...state, loading: true }
    case authenticateUserAction.SUCCESS:
      return { ...state, loading: false }
    case authenticateUserAction.FAILURE:
      return { ...state, loading: false }

    case loginAction.TRIGGER:
      return { ...state, loading: true }
    case loginAction.SUCCESS:
      return {
        ...state,
        loading: false,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      }
    case loginAction.FAILURE:
      return { ...initialState }

    default:
      return state
  }
}
