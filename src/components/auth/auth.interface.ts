export interface AuthReducerState {
  loading: boolean;
  readonly accessToken: string
  readonly refreshToken: string
  user: any
}
