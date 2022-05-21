import { RootState } from './../../app/store';
import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import {
  IBoard,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  BoardUpdateRequest,
  BoardDeleteRequest,
  BoardCreateRequest
} from '../../API/boards';

export interface userBoardsState {
  boards: IBoard[];
  boardsLoading: boolean;
  boardsError: string;
  activeBoardId: string;
}

const initialState: userBoardsState = {
  boards: [],
  boardsLoading: false,
  boardsError: '',
  activeBoardId: ''
};

export const deleteBoardThunk = createAsyncThunk(
  'boards/deleteBoard',
  async ({ id }: Omit<BoardDeleteRequest, 'token'>, { dispatch, getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.userAuthorization.signInData.token;
      await deleteBoard({ token, id });
      dispatch(getBoardThunk({}));
    } catch {
      rejectWithValue(`Board can't be deleted`);
    }
  }
);
export const updateBoardThunk = createAsyncThunk(
  'boards/updateBoard',
  async ({ title, id }: BoardUpdateRequest, { dispatch, getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.userAuthorization.signInData.token;
      await updateBoard({ token, title, id });
      dispatch(getBoardThunk({}));
    } catch {
      rejectWithValue(`Board can't be updated`);
    }
  }
);
export const getBoardThunk = createAsyncThunk(
  'boards/getBoard',
  async ({ id }: { id?: string }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.userAuthorization.signInData.token;
      return await getBoard({ token, id });
    } catch {
      rejectWithValue(`Boards can't be loaded`);
    }
  }
);
export const createBoardThunk = createAsyncThunk(
  'boards/createBoard',
  async ({ title }: BoardCreateRequest, { dispatch, getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.userAuthorization.signInData.token;
      await createBoard({ token, title });
      dispatch(getBoardThunk({}));
    } catch {
      rejectWithValue(`Board can't be created`);
    }
  }
);
export const setUserActiveBoard = createAction('setActiveBoard', (id: string) => {
  return {
    payload: {
      id
    }
  };
});

export const userBoardsSlice = createSlice({
  name: 'userBoards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBoardThunk.rejected, (state, { error }) => {
      state.boardsError = error.message!;
    });

    builder.addCase(updateBoardThunk.rejected, (state, { error }) => {
      state.boardsError = error.message!;
    });

    builder.addCase(deleteBoardThunk.rejected, (state, { error }) => {
      state.boardsError = error.message!;
    });

    builder
      .addCase(getBoardThunk.pending, (state) => {
        state.boardsLoading = true;
      })
      .addCase(getBoardThunk.fulfilled, (state, { payload }) => {
        state.boards = payload as IBoard[];
        state.boardsLoading = false;
        state.boardsError = '';
      })
      .addCase(getBoardThunk.rejected, (state, { error }) => {
        state.boardsLoading = false;
        state.boardsError = error.message!;
      });

    builder.addCase(setUserActiveBoard, (state, { payload }) => {
      state.activeBoardId = payload.id;
    });
  }
});

export const getAppBoards = (state: RootState) => state.userBoards.boards;
export const getAppBoardsError = (state: RootState) => state.userBoards.boardsError;
export const getAppBoardsLoading = (state: RootState) => state.userBoards.boardsLoading;
export const getAppBoardsActiveId = (state: RootState) => state.userBoards.activeBoardId;

export default userBoardsSlice.reducer;
