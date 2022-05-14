import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authorizationOfUserReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    authorizationOfUser: authorizationOfUserReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
