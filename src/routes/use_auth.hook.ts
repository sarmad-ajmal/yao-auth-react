import { useMemo } from 'react'
import { useAppSelector } from '../redux/store'

const useAuth = () => {
  const authenticated = useAppSelector(state => state.auth.isAuthenticated)

  const isLogin = useMemo(() => {
    return authenticated
  }, [authenticated])

  return { isLogin }
}

export default useAuth
