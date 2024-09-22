// reducers.ts
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default: localStorage for web
import { authReducer } from '../components/auth';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Only persist the auth state
};

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer; // Export persisted reducer instead of rootReducer

export type RootState = ReturnType<typeof rootReducer>;
