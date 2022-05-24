import { List } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import PageTitle from '../../components/styled/PageTitle';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useCallback, useEffect } from 'react';
import { getAppBoardsActiveId } from '../../reducer/boards/userBoardsSlice';
import styled from 'styled-components';
import ColumnItem from './columnItem'
import { ListGridType } from 'antd/lib/list';
import {
  getAppColumns,
  getColumnThunk,
  createColumnThunk,
  updateColumnThunk,
  deleteColumnThunk,
  getAppColumnsError,
  getAppColumnsLoading
} from '../../reducer/columns/userColumnsSlice';
import { IColumn } from '../../API/columns';

function MainPage() {
  const columns = useAppSelector(getAppColumns);
  const boardId = useAppSelector(getAppBoardsActiveId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getColumnThunk({boardId}));
    })();
  }, []);

  const renderColumnItem = useCallback((item: IColumn) => <ColumnItem data={item} />, []);

  return (
  );
}

export default MainPage;
