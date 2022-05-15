import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {signIn, signUp} from '../../API/authorization';
import { IUserData } from '../../API/dependencies';

interface IvalueForFill{
  name: string;
  login: string;
}

export interface authorizationOfUserState {
  dataOfSignUp:{id: string, name: string, login: string};
  dataOfSignIn:{token:string};
  status: 'fulfilled' | 'loading' | 'rejected';
  errorOfSignIn: string;
  errorOfSignUp: string;
}

const initialState: authorizationOfUserState = {
  dataOfSignUp:{id: '', name: '', login: ''},
  dataOfSignIn:{token:''},
  status: 'fulfilled',
  errorOfSignIn: 'User was not founded!',
  errorOfSignUp: 'User login already exists!',
};

export const createAsyncSignIn = createAsyncThunk(
  'tokenOfUser/fetchSignIn',
  async (body: IUserData) => signIn(body)
);

export const createAsyncSignUp = createAsyncThunk(
  'tokenOfUser/fetchSignUp',
  async (body: IUserData) => signUp(body)
);

export const authorizationOfUserSlice = createSlice({
  name: 'authorizationOfUser',
  initialState,
  reducers: {
    addValuesForFill: (state, action: PayloadAction<IvalueForFill>) => {
      state.dataOfSignUp.login = action.payload.login;
      state.dataOfSignUp.name = action.payload.name;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAsyncSignUp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createAsyncSignUp.fulfilled, (state, action:PayloadAction<any>) => {
        state.status = 'fulfilled';
        if (action.payload){
          state.dataOfSignUp = action.payload;
        }
      })
      .addCase(createAsyncSignUp.rejected, (state, action) => {
        if (action.error.message){
          state.errorOfSignUp = action.error.message;
        }
        state.status = 'rejected';
      });

    builder
      .addCase(createAsyncSignIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createAsyncSignIn.fulfilled, (state, action:PayloadAction<any>) => {
        state.status = 'fulfilled';
        if (action.payload){
          state.dataOfSignIn = action.payload;
        }
      })
      .addCase(createAsyncSignIn.rejected, (state, action ) => {
        if (action.error.message){
          state.errorOfSignIn = action.error.message;
        }
        state.status = 'rejected';
      });
  },
});

export const { addValuesForFill } = authorizationOfUserSlice.actions;

export const valueApiSignUp = (state: RootState) => state.authorizationOfUser.dataOfSignUp;
export const tokenFromApiSignIn = (state: RootState) => state.authorizationOfUser.dataOfSignIn.token;
export const statusFromApiSignIn = (state: RootState) => state.authorizationOfUser.status;
export const errorFromApiSignIn = (state: RootState) => state.authorizationOfUser.errorOfSignIn;
export const errorFromApiSignUp = (state: RootState) => state.authorizationOfUser.errorOfSignUp;

export default authorizationOfUserSlice.reducer;