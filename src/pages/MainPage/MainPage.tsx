import { List } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import PageTitle from '../../components/styled/PageTitle';
import { getBoardThunk, getAppBoards } from '../../reducer/boards/userBoardsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useCallback, useEffect } from 'react';
import BoardItem from './BoardItem';
import { IBoard } from '../../API/boards';
import styled from 'styled-components';
import { ListGridType } from 'antd/lib/list';

function MainPage() {
  const boards = useAppSelector(getAppBoards);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async function boardsRequest() {
      await dispatch(getBoardThunk({}));
    })();
  }, []);

  const renderBoardItem = useCallback((item: IBoard) => <BoardItem item={item} />, []);

  return (
    <Container>
      <PageTitle textLink="titles.main-page" icon={<AppstoreOutlined />} />
      <List grid={grid} dataSource={boards} renderItem={renderBoardItem} />
    </Container>
  );
}

const Container = styled.div`
  & .ant-row {
    margin: 0 !important;
    justify-content: center;
  }
`;

const grid: ListGridType = {
  gutter: 16,
  xs: 1,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 3,
  xxl: 3
};

export default MainPage;
