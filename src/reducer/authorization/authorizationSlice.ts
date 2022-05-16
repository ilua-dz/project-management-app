import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { signIn, signUp } from '../../API/authorization';

export interface userAuthorizationState {
  dataOfSignUp: { id: string; name: string; login: string };
  dataOfSignIn: { token: string };
  statusSignUp: string;
  statusSignIn: string;
  errorOfSignIn: string;
  errorOfSignUp: string;
}

const initialState: userAuthorizationState = {
  dataOfSignUp: { id: '', name: '', login: '' },
  dataOfSignIn: { token: '' },
  statusSignUp: '',
  statusSignIn: '',
  errorOfSignIn: 'User was not founded!',
  errorOfSignUp: 'User login already exists!'
};

export const createAsyncSignIn = createAsyncThunk('tokenOfUser/fetchSignIn', signIn);

export const createAsyncSignUp = createAsyncThunk('tokenOfUser/fetchSignUp', signUp);

export const userAuthorizationSlice = createSlice({
  name: 'userAuthorization',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAsyncSignUp.pending, (state) => {
        state.statusSignUp = 'loading';
      })
      .addCase(createAsyncSignUp.fulfilled, (state, action: PayloadAction<any>) => {
        state.statusSignUp = 'fulfilled';
        if (action.payload) {
          state.dataOfSignUp = action.payload;
        }
      })
      .addCase(createAsyncSignUp.rejected, (state, action) => {
        if (action.error.message) {
          state.errorOfSignUp = action.error.message;
        }
        state.statusSignUp = 'rejected';
      });

    builder
      .addCase(createAsyncSignIn.pending, (state) => {
        state.statusSignIn = 'loading';
      })
      .addCase(createAsyncSignIn.fulfilled, (state, action: PayloadAction<any>) => {
        state.statusSignIn = 'fulfilled';
        if (action.payload) {
          state.dataOfSignIn = action.payload;
        }
      })
      .addCase(createAsyncSignIn.rejected, (state, action) => {
        if (action.error.message) {
          state.errorOfSignIn = action.error.message;
        }
        state.statusSignIn = 'rejected';
      });
  }
});

export const valueApiSignUp = (state: RootState) => state.userAuthorization.dataOfSignUp;
export const tokenFromApiSignIn = (state: RootState) => state.userAuthorization.dataOfSignIn.token;
export const statusFromApiSignIn = (state: RootState) => state.userAuthorization.statusSignIn;
export const statusFromApiSignUp = (state: RootState) => state.userAuthorization.statusSignUp;
export const errorFromApiSignIn = (state: RootState) => state.userAuthorization.errorOfSignIn;
export const errorFromApiSignUp = (state: RootState) => state.userAuthorization.errorOfSignUp;

export default userAuthorizationSlice.reducer;
