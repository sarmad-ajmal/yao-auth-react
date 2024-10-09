import { useMemo } from 'react'
import { AUTH_ROUTES } from '../components/auth'

const useRedirect = ({ isLogin }: { isLogin: boolean }) => {
  const redirectTo = useMemo(() => {
    if (isLogin) {
      return '/'
    } else {
      return AUTH_ROUTES.DEFAULT + AUTH_ROUTES.LOGIN
    }
  }, [isLogin])

  return { redirectTo }
}

export default useRedirect
