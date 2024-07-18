// app/store/reducers/rootReducer.ts

import { combineReducers } from '@reduxjs/toolkit';

// Import your slice reducers here
// Example:
// import authReducer from '@/store/reducers/authSlice';

const rootReducer = combineReducers({
  // Add your slice reducers here
  // Example:
  // auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
