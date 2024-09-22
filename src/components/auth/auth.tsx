import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Register } from './index'

const AuthModule = () => {
  return (
    <Suspense fallback={<div></div>}>
      <Routes>
        <Route path='register' element={<Register />} />
      </Routes>
    </Suspense>
  )
}
export default AuthModule
