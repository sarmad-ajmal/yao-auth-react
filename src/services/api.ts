// @ts-nocheck
import apisauce, { ApisauceInstance, ApiResponse } from 'apisauce'
import { call } from 'redux-saga/effects'
import Cookies from 'js-cookie'
const create = (baseURL = 'localhost:3000'): ApisauceInstance => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
    timeout: 60000,
  })
  api.addRequestTransform(request => {
    const accessToken = Cookies.get('accessToken')
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`
    }
  })

  // Handle responses, including token expiration
  api.addResponseTransform(async response => {
    if (response.status === 401) {
      // Access token might be expired, try to refresh the token
      const refreshToken = Cookies.get('refreshToken')
      if (refreshToken) {
        // Call the refresh token endpoint to get a new access token
        const refreshResponse = await api.post('/auth/refresh', {
          refreshToken,
        })

        if (refreshResponse.ok) {
          const newAccessToken = refreshResponse.data.accessToken

          // Store the new access token in the cookie
          Cookies.set('accessToken', newAccessToken)

          // Retry the original request with the new token
          response.config.headers.Authorization = `Bearer ${newAccessToken}`
          return api.any(response.config) // Retry the original request
        } else {
          // Handle refresh failure (e.g., log out the user)
          console.log('Refresh token failed, logging out...')
          Cookies.remove('accessToken')
          Cookies.remove('refreshToken')
          // Redirect to login or another appropriate action
        }
      }
    }
  })

  return {
    ...api,
  }
}
const isConnected = true

export function processResponse(
  response: ApiResponse<any>,
  showError: boolean,
) {
  const {
    status = 200,
    data: resData = null,
    ok = false,
    problem = 'TIMEOUT_ERROR',
    headers = {},
  } = response || {}
  if (ok && status && status >= 200 && status <= 300) {
    return { error: false, res: resData, statusCode: status }
  } else {
    let message = ''
    if (resData) {
      if ((headers['content-type'] || '').startsWith('text/html')) {
        message = 'Invalid Response From Server'
      } else if (typeof resData.error === 'object' && resData.error.message) {
        message = resData.error.message
      } else if (resData.message) {
        message = resData.message
      } else if (typeof resData.error === 'string') {
        message = resData.error
      } else if (resData.msg) {
        message = resData.msg
      } else if (typeof resData === 'string') {
        message = resData
      } else {
        message = getMessage(resData)
      }
    } else {
      message = getMessage(problem)
    }
    if (showError) {
      showErrorMessage(message)
    }
    const { data = {} } = resData || {}
    throw { error: true, message, statusCode: status, data }
  }
  return { error: false, res: resData, statusCode: status }
}

function* callServer(
  apiFunction: () => void,
  reqData: unknown = {},
  showError = false,
  id = null,
) {
  if (isConnected) {
    // @ts-ignore
    const response = yield call(apiFunction, reqData, reqData.id || id)

    return processResponse(response, showError)
  } else {
    const message = 'Network not available.'

    if (showError) {
      showErrorMessage(message)
    }

    throw { error: true, message, statusCode: 503 }
  }
}

const getMessage = (error: string | null) => {
  if (error === 'TIMEOUT_ERROR') {
    return 'No Response From Server.'
  } else if (error === 'CONNECTION_ERROR') {
    return 'Server Is Not Available.'
  } else if (error === 'NETWORK_ERROR') {
    return 'Network not available.'
  } else if (error === 'CANCEL_ERROR') {
    return 'Request Cancelled'
  } else {
    return 'Something went wrong. Please try again'
  }
}

export { callServer as Api, create }

const showErrorMessage = (errorMessage: string) => {
  console.error(errorMessage)
}
