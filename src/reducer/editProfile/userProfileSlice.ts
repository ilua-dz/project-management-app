import { RootState } from './../../app/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteUser, updateUser } from '../../API/users';
import { SignUpData } from '../../API/authorization';

export interface profileState {
  profileDeleteError: string;
  profileUpdateError: string;
}

const initialState: profileState = {
  profileDeleteError: '',
  profileUpdateError: ''
};

export const deleteUserThunk = createAsyncThunk(
  'profile/deleteUser',
  async (id: string, { getState }) => {
    const state = getState() as RootState;
    const token = state.userAuthorization.signInData.token;
    await deleteUser(token, id);
  }
);

export const updateUserThunk = createAsyncThunk(
  'profile/updateDataUser',
  async (body: SignUpData, { getState }) => {
    const state = getState() as RootState;
    const token = state.userAuthorization.signInData.token;
    const id = state.userAuthorization.signUpData.id;
    await updateUser(token, id, body);
  }
);

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteUserThunk.rejected, (state, { error }) => {
      state.profileDeleteError = error.message as string;
    });

    builder.addCase(updateUserThunk.rejected, (state, { error }) => {
      state.profileUpdateError = error.message as string;
      console.log(state.profileUpdateError);
    });
  }
});

export const getUserDeleteError = (state: RootState) => state.userProfile.profileDeleteError;
export const getProfileUpdateError = (state: RootState) => state.userProfile.profileUpdateError;

export default userProfileSlice.reducer;
