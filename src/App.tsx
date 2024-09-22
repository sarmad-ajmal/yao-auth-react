import { lazy, Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './app.css'

const AuthModule = lazy(() => import('./components/auth/auth'))

function App() {
  return (
    <div className='app'>
      <Router>
        <Suspense fallback={<FallBack />}>
          <Routes>
            <Route path='auth/*' element={<AuthModule />} />
            {/* <Route path='/secure/*' element={<PrivateRoute />}>
              <Route path='*' element={<DefaultRedirectRoute />} />
            </Route> */}
          </Routes>
          {/* <Route path='*' element={<DefaultRedirectRoute />} /> */}
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
