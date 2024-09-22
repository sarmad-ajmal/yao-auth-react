import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Register, Login } from './index'

const AuthModule = () => {
  return (
    <Suspense fallback={<div></div>}>
      <Routes>
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
      </Routes>
    </Suspense>
  )
}
export default AuthModule
