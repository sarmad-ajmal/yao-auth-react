import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const AuthModule = lazy(() => import('./components/auth/auth'))

function App() {
  return (
    <div className='app'>
      <Router>
        <Suspense fallback={<FallBack />}>
          <Routes>
            <Route path='auth/*' element={<AuthModule />} />
            <Route path='/' element={<Home />} />
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
