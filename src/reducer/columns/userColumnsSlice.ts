import {
  createTask,
  taskCreateRequest,
  taskDeleteRequest,
  taskUpdateRequest,
  updateTask
} from './../../API/tasks';
import { getBoard, IBoard, BoardGetRequest } from './../../API/boards';
import { ColumnDeleteRequest, ColumnUpdateRequest, ColumnCreateRequest } from '../../API/columns';
import { RootState } from '../../app/store';
import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { updateColumn, createColumn, deleteColumn } from '../../API/columns';
import { deleteTask } from '../../API/tasks';
import applyToken from '../../API/applyToken';
import { WritableDraft } from 'immer/dist/internal';
import { SerializedError } from '@reduxjs/toolkit';

export interface UserColumnsState {
  columnsLoading: boolean;
  columnsError: string;
  activeBoardColumnsData?: IBoard;
  lastDraggableTask: string;
}

interface ITaskReplace {
  deleteRequest: Omit<taskDeleteRequest, 'token'>;
  createRequest: Omit<taskCreateRequest, 'token'>;
}

const initialState: UserColumnsState = {
  columnsLoading: false,
  columnsError: '',
  lastDraggableTask: ''
};

export const getActiveBoardColumnsDataThunk = createAsyncThunk(
  'columns/getActiveBoardColumnsData',
  async (_: void, { getState, rejectWithValue }) => {
    const url = location.href;
    const id = url.slice(url.lastIndexOf('/') + 1);
    try {
      return await applyToken<BoardGetRequest, ReturnType<typeof getBoard>>(
        getBoard,
        {
          token: '',
          id
        },
        getState() as RootState
      );
    } catch {
      rejectWithValue(`Column can't be deleted`);
    }
  }
);

export const deleteColumnThunk = createAsyncThunk(
  'columns/deleteColumn',
  async (
    { boardId, columnId }: Omit<ColumnDeleteRequest, 'token'>,
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const columns = state.userColumns.activeBoardColumnsData?.columns || [];
      for (const column of columns) {
        if (column.id === columnId) {
          const tasks = column.tasks;
          tasks?.forEach((task) =>
            applyToken<taskDeleteRequest, void>(
              deleteTask,
              {
                token: '',
                boardId,
                columnId,
                taskId: task.id
              },
              getState() as RootState
            )
          );
        }
        break;
      }

      await applyToken<ColumnDeleteRequest, ReturnType<typeof deleteColumn>>(
        deleteColumn,
        {
          boardId,
          columnId,
          token: ''
        },
        getState() as RootState
      );
      dispatch(getActiveBoardColumnsDataThunk());
    } catch {
      rejectWithValue(`Column can't be deleted`);
    }
  }
);

export const updateColumnThunk = createAsyncThunk(
  'columns/updateColumn',
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
      rejectWithValue(`Column can't be updated`);
    }
  }
);

export const createColumnThunk = createAsyncThunk(
  'columns/createColumn',
  async (
    requestData: Omit<ColumnCreateRequest, 'token'>,
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      await applyToken<ColumnCreateRequest, ReturnType<typeof createColumn>>(
        createColumn,
        {
          ...requestData,
          token: ''
        },
        getState() as RootState
      );
      dispatch(getActiveBoardColumnsDataThunk());
    } catch {
      rejectWithValue(`Column can't be created`);
    }
  }
);

export const dragColumnTaskThunk = createAsyncThunk(
  'columns/updateTask',
  async (
    requestData: Omit<taskUpdateRequest, 'token'>,
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      await applyToken<taskUpdateRequest, ReturnType<typeof updateTask>>(
        updateTask,
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

export const replaceColumnTaskThunk = createAsyncThunk(
  'columns/replaceTask',
  async (requestData: ITaskReplace, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      applyToken<taskDeleteRequest, ReturnType<typeof deleteTask>>(
        deleteTask,
        { ...requestData.deleteRequest, token: '' },
        state
      );
      await applyToken<taskCreateRequest, ReturnType<typeof createTask>>(
        createTask,
        { ...requestData.createRequest, token: '' },
        state
      );
    } catch {
      rejectWithValue(`Column task can't be replaced`);
    }
  }
);

export const setLastDraggableTask = createAction('setLastDraggable', (lastDraggable: string) => {
  return {
    payload: lastDraggable
  };
});

export const userBoardsSlice = createSlice({
  name: 'userBoards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createColumnThunk.rejected, setColumnError);

    builder.addCase(updateColumnThunk.rejected, setColumnError);

    builder.addCase(deleteColumnThunk.rejected, setColumnError);

    builder.addCase(dragColumnTaskThunk.rejected, setColumnError);

    builder.addCase(setLastDraggableTask, (state, { payload }) => {
      state.lastDraggableTask = payload;
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
      .addCase(getActiveBoardColumnsDataThunk.rejected, setColumnError);
  }
});

function setColumnError(
  state: WritableDraft<UserColumnsState>,
  { error }: { error: SerializedError }
) {
  state.columnsError = error.message as string;
}

export const getAppActiveBoardColumnsData = (state: RootState) =>
  state.userColumns.activeBoardColumnsData;
export const getAppColumnsError = (state: RootState) => state.userColumns.columnsError;
export const getAppColumnsLoading = (state: RootState) => state.userColumns.columnsLoading;
export const getAppLastDraggableTask = (state: RootState) => state.userColumns.lastDraggableTask;

export default userBoardsSlice.reducer;
