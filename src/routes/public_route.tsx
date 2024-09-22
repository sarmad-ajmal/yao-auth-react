import React from 'react'
import { Navigate, RouteProps } from 'react-router-dom'

import useAuth from './use_auth.hook'

export type IPublicRouteProps = RouteProps & {
  component: any
  restricted?: boolean // if true, only unauthenticated user have access
  // For example signin page after login
}
const PublicRoute: React.FC<IPublicRouteProps> = ({
  component: Component,
  restricted,
  ...rest
}) => {
  const { isLogin } = useAuth()
  if (isLogin && restricted) {
    return <Navigate to='/' />
  }
  return <Component {...rest} />
}

export default PublicRoute
