import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  CombinedState
} from '@reduxjs/toolkit';
import userAuthorizationReducer, {
  userAuthorizationState
} from '../reducer/authorization/authorizationSlice';
import boardsReducer, { userBoardsState } from '../reducer/boards/userBoardsSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const rootReducer = combineReducers({
  userAuthorization: userAuthorizationReducer,
  userBoards: boardsReducer
});

type PMPersistConfig = PersistConfig<
  CombinedState<{
    userAuthorization: userAuthorizationState;
    userBoards: userBoardsState;
  }>
>;

const persistConfig: PMPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['userAuthorization']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
