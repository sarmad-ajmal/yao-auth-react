import { createSelector } from 'reselect'
import { IAppState } from '../../redux/state.interface'

const getAuthState = (state: IAppState) => state.auth

export const getAuthStateSelector = createSelector(
  [getAuthState],
  data => data,
)