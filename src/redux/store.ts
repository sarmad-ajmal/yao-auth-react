// store.ts
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import persistedReducer from './reducers'; // Import persistedReducer instead of rootReducer
import { rootSaga } from './saga';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Setup Redux DevTools if available
const composeEnhancers =
  (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create store with persisted reducer, middleware, and enhancers
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

// Run the root saga
sagaMiddleware.run(rootSaga);

// Persistor for persisting the store
export const persistor = persistStore(store);

export default store;
