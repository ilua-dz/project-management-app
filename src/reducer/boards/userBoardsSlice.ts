import { useAppDispatch } from './../../app/hooks';
import { BoardGetRequest } from './../../API/boards';
import { RootState } from '../../app/store';
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
import { SerializedError } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import applyToken from '../../API/applyToken';
import { getActiveBoardColumnsDataThunk } from '../columns/userColumnsSlice';
import { ColumnUpdateRequest, updateColumn } from '../../API/columns';

export interface UserBoardsState {
  boards: IBoard[];
  boardsLoading: boolean;
  boardsError: string;
  lastDraggableColumn: string;
}

export interface BoardRequestData {
  id?: string;
}

const initialState: UserBoardsState = {
  boards: [],
  boardsLoading: false,
  boardsError: '',
  lastDraggableColumn: ''
};

export const deleteBoardThunk = createAsyncThunk(
  'boards/deleteBoard',
  async (
    requestData: Omit<BoardDeleteRequest, 'token'>,
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      await applyToken<BoardDeleteRequest, ReturnType<typeof deleteBoard>>(
        deleteBoard,
        {
          ...requestData,
          token: ''
        },
        getState() as RootState
      );
      dispatch(getBoardThunk({}));
    } catch {
      rejectWithValue(`Board can't be deleted`);
    }
  }
);

export const updateBoardThunk = createAsyncThunk(
  'boards/updateBoard',
  async (
    requestData: Omit<BoardUpdateRequest, 'token'>,
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      await applyToken<BoardUpdateRequest, ReturnType<typeof updateBoard>>(
        updateBoard,
        {
          ...requestData,
          token: ''
        },
        getState() as RootState
      );
      dispatch(getBoardThunk({}));
    } catch {
      rejectWithValue(`Board can't be updated`);
    }
  }
);

export const getBoardThunk = createAsyncThunk(
  'boards/getBoard',
  async (requestData: BoardRequestData, { rejectWithValue, getState }) => {
    try {
      return await applyToken<BoardGetRequest, ReturnType<typeof getBoard>>(
        getBoard,
        {
          ...requestData,
          token: ''
        },
        getState() as RootState
      );
    } catch {
      rejectWithValue(`Boards can't be loaded`);
    }
  }
);

export const createBoardThunk = createAsyncThunk(
  'boards/createBoard',
  async (
    requestData: Omit<BoardCreateRequest, 'token'>,
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      await applyToken<BoardCreateRequest, ReturnType<typeof createBoard>>(
        createBoard,
        {
          ...requestData,
          token: ''
        },
        getState() as RootState
      );
      dispatch(getBoardThunk({}));
    } catch {
      rejectWithValue(`Board can't be created`);
    }
  }
);

export const dragBoardsColumnThunk = createAsyncThunk(
  'columns/updateTask',
  async (
    requestData: Omit<ColumnUpdateRequest, 'token'>,
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      await applyToken<ColumnUpdateRequest, ReturnType<typeof updateColumn>>(
        updateColumn,
        {
          ...requestData,
          token: ''
        },
        getState() as RootState
      );
      dispatch(getActiveBoardColumnsDataThunk());
    } catch {
      rejectWithValue(`Column task can't be updated`);
    }
  }
);

export const setLastDraggableColumn = createAction('boards/columnDrag', (id: string) => {
  return {
    payload: id
  };
});

export const userBoardsSlice = createSlice({
  name: 'userBoards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBoardThunk.rejected, setBoardError);

    builder.addCase(updateBoardThunk.rejected, setBoardError);

    builder.addCase(deleteBoardThunk.rejected, setBoardError);

    builder.addCase(setLastDraggableColumn, (state, { payload }) => {
      state.lastDraggableColumn = payload;
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
        state.boardsError = error.message as string;
      });
  }
});

function setBoardError(
  state: WritableDraft<UserBoardsState>,
  { error }: { error: SerializedError }
) {
  state.boardsError = error.message as string;
}

export const getAppBoards = (state: RootState) => state.userBoards.boards;
export const getAppBoardsLoading = (state: RootState) => state.userBoards.boardsLoading;
export const getLastDraggableColumn = (state: RootState) => state.userBoards.lastDraggableColumn;

export function useUpdateActiveBoard() {
  const dispatch = useAppDispatch();

  return async function () {
    await dispatch(getActiveBoardColumnsDataThunk());
  };
}

export default userBoardsSlice.reducer;
