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
import boardsReducer, { UserBoardsState } from '../reducer/boards/userBoardsSlice';
import columnReducer, { UserColumnsState } from '../reducer/columns/userColumnsSlice';
import profileReducer, { profileState } from '../reducer/editProfile/userProfileSlice';
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
  userBoards: boardsReducer,
  userColumns: columnReducer,
  userProfile: profileReducer
});

type PMPersistConfig = PersistConfig<
  CombinedState<{
    userAuthorization: userAuthorizationState;
    userBoards: UserBoardsState;
    userColumns: UserColumnsState;
    userProfile: profileState;
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
