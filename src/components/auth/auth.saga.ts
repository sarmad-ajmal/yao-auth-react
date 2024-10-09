import { call, delay, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { Api } from '../../services/api'

import { authenticateUserAction, loginAction } from './auth.action'
import { statusCodes } from '../../constants'
import { toast } from 'react-toastify'

export function* authenticateUserSaga(api: any, { payload }: any) {
  try {
    const { onSuccess, data } = payload
    const { statusCode } = yield call(Api, api, data)
    if (statusCode === statusCodes.CREATED) {
      yield put(authenticateUserAction.success({}))
      toast.success('User authenticated successfully')
      if (onSuccess) {
        onSuccess()
      }
    } else {
      yield put(authenticateUserAction.failure())
    }
  } catch (e) {
    yield put(authenticateUserAction.failure())
    toast.error('User authentication failed')
  }
}
export function* loginUserSaga(api: any, { payload }: any) {
  try {
    const { onSuccess, data } = payload
    const { statusCode, res } = yield call(Api, api, data)
    if (statusCode === statusCodes.CREATED) {
      yield put(loginAction.success(res))
      if (onSuccess) {
        onSuccess()
      }
    } else {
      yield put(loginAction.failure())
    }
  } catch (e) {
    yield put(loginAction.failure())
    toast.error('User authentication failed')
  }
}

export default (api: any) => {
  const authenticateApi = (data: any) => {
    return api.post('/users/create', data)
  }
  const loginApi = (data: any) => {
    return api.post('/auth/login', data)
  }

  return [
    takeLatest(
      authenticateUserAction.TRIGGER,
      authenticateUserSaga,
      authenticateApi,
    ),
    takeLatest(loginAction.TRIGGER, loginUserSaga, loginApi),
  ]
}
