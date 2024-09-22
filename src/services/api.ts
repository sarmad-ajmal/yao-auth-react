import apisauce, { ApisauceInstance, ApiResponse } from 'apisauce'

const create = (baseURL = ''): ApisauceInstance => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
    timeout: 60000,
  })


  return {
    ...api,
  }
}
const isConnected = true;

export function processResponse(response: ApiResponse<unknown>, showError: boolean) {
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
}

function* callServer(
  apiFunction: () => void,
  reqData: unknown = {},
  showError = false,
  id = null,
) {
  if (isConnected) {
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

const getMessage = (error: string) => {
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

export {
  callServer,
  create
}

const showErrorMessage = (errorMessage: string) => {
  console.error(errorMessage)
}