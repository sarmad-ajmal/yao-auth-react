import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useAuth from './use_auth.hook'

const PrivateRoute: React.FC<{}> = ({ children, ...rest }: any) => {
  const navigate = useNavigate()

  const { isLogin = false } = useAuth()
  useEffect(() => {
    if (!isLogin) {
      navigate('/login', { replace: true })
    }
  }, [isLogin, navigate])
  return <>{children}</>
}

export default PrivateRoute
