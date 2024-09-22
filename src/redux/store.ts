// store.ts
import { createStore, applyMiddleware, compose, Store } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore } from 'redux-persist'
import persistedReducer from './reducers' // Import persistedReducer instead of rootReducer
import { rootSaga } from './saga'
import { IAppState } from './state.interface'

// Create saga middleware
const sagaMiddleware = createSagaMiddleware()

// Setup Redux DevTools if available
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Create store with persisted reducer, middleware, and enhancers
const store: Store<IAppState> = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
)

// Run the root saga
sagaMiddleware.run(rootSaga)

// Persistor for persisting the store
export const persistor = persistStore(store)

export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
