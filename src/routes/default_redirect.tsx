import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from './use_auth.hook'
import useRedirect from './use_redirect'

const DefaultRedirectRoute: React.FC = () => {
  const { isLogin } = useAuth()
  const { redirectTo } = useRedirect({ isLogin })
  // TODO: check it
  return <Navigate to={redirectTo} />
}

export default DefaultRedirectRoute
