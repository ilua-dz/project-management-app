import { IUserData } from './../../API/dependencies';
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { signIn, signUp, Token } from '../../API/authorization';

export interface userAuthorizationState {
  signUpData: { id: string; name: string; login: string };
  signInData: { token: string };
  signUpStatus: string;
  signInStatus: string;
  signInError: string;
  signUpError: string;
}

const initialState: userAuthorizationState = {
  signUpData: { id: '', name: '', login: '' },
  signInData: { token: '' },
  signUpStatus: '',
  signInStatus: '',
  signInError: 'User was not founded!',
  signUpError: 'User login already exists!'
};

function getUserId(token: Token) {
  return JSON.parse(window.atob(token.token.split('.')[1])).userId;
}

export const asyncSignIn = createAsyncThunk('tokenOfUser/fetchSignIn', signIn);
export const asyncSignUp = createAsyncThunk('tokenOfUser/fetchSignUp', signUp);
export const signOut = createAction('signOut');

export const userAuthorizationSlice = createSlice({
  name: 'userAuthorization',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncSignUp.pending, (state) => {
        state.signUpStatus = 'loading';
      })
      .addCase(asyncSignUp.fulfilled, (state, { payload }) => {
        state.signUpStatus = 'fulfilled';
        if (payload) {
          state.signUpData = payload as IUserData;
        }
      })
      .addCase(asyncSignUp.rejected, (state, { error }) => {
        if (error.message) {
          state.signUpError = error.message;
        }
        state.signUpStatus = 'rejected';
      });

    builder
      .addCase(asyncSignIn.pending, (state) => {
        state.signInStatus = 'loading';
      })
      .addCase(asyncSignIn.fulfilled, (state, { payload }) => {
        state.signInStatus = 'fulfilled';
        if (payload) {
          const token = payload as Token;
          state.signInData = token;
          state.signUpData.id = getUserId(token);
        }
      })
      .addCase(asyncSignIn.rejected, (state, { error }) => {
        if (error.message) {
          state.signInError = error.message;
        }
        state.signInStatus = 'rejected';
      });

    builder.addCase(signOut, (state) => {
      return { ...state, signInData: { token: '' }, signUpData: { id: '', name: '', login: '' } };
    });
  }
});

export const getApiSignUpData = (state: RootState) => state.userAuthorization.signUpData;
export const getApiSignInToken = (state: RootState) => state.userAuthorization.signInData.token;
export const getApiSignInStatus = (state: RootState) => state.userAuthorization.signInStatus;
export const getApiSignUpStatus = (state: RootState) => state.userAuthorization.signUpStatus;
export const getApiSignInError = (state: RootState) => state.userAuthorization.signInError;
export const getApiSignUpError = (state: RootState) => state.userAuthorization.signUpError;

export default userAuthorizationSlice.reducer;
