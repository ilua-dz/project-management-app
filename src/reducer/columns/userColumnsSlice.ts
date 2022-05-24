import { getBoard, IBoard } from './../../API/boards';
import {
  ColumnDeleteRequest,
  ColumnUpdateRequest,
  ColumnGetRequest,
  ColumnCreateRequest
} from '../../API/columns';
import { RootState } from '../../app/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateColumn, createColumn, deleteColumn } from '../../API/columns';

export interface UserColumnsState {
  columnsLoading: boolean;
  columnsError: string;
  activeBoardColumnsData?: IBoard;
}

const initialState: UserColumnsState = {
  columns: [],
  columnsLoading: false,
  columnsError: ''
};

export const getActiveBoardColumnsDataThunk = createAsyncThunk(
  'columns/getActiveBoardColumnsData',
  async ({},
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.userAuthorization.signInData.token;
      const id = state.userBoards.activeBoardId;
      return await getBoard({token, id});
    } catch {
      rejectWithValue(`Column can't be deleted`);
    }
  }
)

export const deleteColumnThunk = createAsyncThunk(
  'columns/deleteColumn',
  async (
    { boardId, columnId }: Omit<ColumnDeleteRequest, 'token'>,
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.userAuthorization.signInData.token;
      await deleteColumn({ boardId, columnId, token });
      dispatch(getActiveBoardColumnsDataThunk());
    } catch {
      rejectWithValue(`Column can't be deleted`);
    }
  }
);

export const updateColumnThunk = createAsyncThunk(
  'columns/updateColumn',
  async (
    { boardId, columnId, body }: Omit<ColumnUpdateRequest, 'token'>,
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.userAuthorization.signInData.token;
      await updateColumn({ boardId, columnId, body, token });
      dispatch(getActiveBoardColumnsDataThunk());
    } catch {
      rejectWithValue(`Column can't be updated`);
    }
  }
);

export const createColumnThunk = createAsyncThunk(
  'columns/createColumn',
  async (
    { boardId, body }: Omit<ColumnCreateRequest, 'token'>,
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.userAuthorization.signInData.token;
      await createColumn({ token, boardId, body });
      dispatch(getActiveBoardColumnsDataThunk());
    } catch {
      rejectWithValue(`Column can't be created`);
    }
  }
);

export const userBoardsSlice = createSlice({
  name: 'userBoards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createColumnThunk.rejected, (state, { error }) => {
      state.columnsError = error.message as string;
    });

    builder.addCase(updateColumnThunk.rejected, (state, { error }) => {
      state.columnsError = error.message as string;
    });

    builder.addCase(deleteColumnThunk.rejected, (state, { error }) => {
      state.columnsError = error.message as string;
    });

    builder
      .addCase(getActiveBoardColumnsDataThunk.pending, (state) => {
        state.columnsLoading = true;
      })
      .addCase(getActiveBoardColumnsDataThunk.fulfilled, (state, { payload }) => {
        state.activeBoardColumnsData = payload as IBoard;
        state.columnsLoading = false;
        state.columnsError = '';
      })
      .addCase(getActiveBoardColumnsDataThunk.rejected, (state, { error }) => {
        state.columnsLoading = false;
        state.columnsError = error.message as string;
      });
  }
});

export const getAppActiveBoardColumnsData = (state: RootState) => state.userColumns.activeBoardColumnsData;
export const getAppColumnsError = (state: RootState) => state.userColumns.columnsError;
export const getAppColumnsLoading = (state: RootState) => state.userColumns.columnsLoading;

export default userBoardsSlice.reducer;
