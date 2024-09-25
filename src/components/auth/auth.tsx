import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Register, Login } from './index'
import { AuthLayout } from '@/layouts/auth_layout'

const AuthModule = () => {
  return (
    <Suspense fallback={<div></div>}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='*' element={<Login />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
export default AuthModule
