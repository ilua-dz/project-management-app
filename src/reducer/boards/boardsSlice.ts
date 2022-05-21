import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteBoard, getBoard, IBoard } from '../../API/boards';
import { RootState } from '../../app/store';

export interface BoardsState {
  boards: IBoard[];
  status: 'loading' | 'loaded' | 'error';
  errorMessage: string;
}

const initialState: BoardsState = { boards: [], status: 'loading', errorMessage: '' };

export const asyncGetBoards = createAsyncThunk('boards/fetchBoards', getBoard);
export const asyncRemoveBoard = createAsyncThunk('boards/remove', deleteBoard);

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetBoards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(asyncGetBoards.fulfilled, (state, { payload }) => {
        state.status = 'loaded';
        state.boards = payload as IBoard[];
      })
      .addCase(asyncGetBoards.rejected, (state, { error }) => {
        state.status = 'error';
        if (error.message) {
          state.errorMessage = error.message;
        }
      });

    builder.addCase(asyncRemoveBoard.fulfilled, (state, { payload }) => {
      state = { ...state, boards: state.boards.filter((board) => board.id !== payload) };
    });
  }
});

export const getBoards = (state: RootState) => state.boardsState.boards;

export default boardsSlice.reducer;
