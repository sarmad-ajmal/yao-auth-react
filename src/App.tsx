import { lazy, Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import DefaultRedirectRoute from './routes/default_redirect'

const AuthModule = lazy(() => import('./components/auth/auth'))

function App() {
  return (
    <div className='h-full bg-slate-200'>
      <Router>
        <Suspense fallback={<FallBack />}>
          <Routes>
            <Route path='auth/*' element={<AuthModule />} />
            <Route path='*' element={<DefaultRedirectRoute />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  )
}

export default App

const FallBack = () => {
  return <div>Loading...</div>
}

const Home = () => {
  return <div>Home</div>
}
