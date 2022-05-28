import { List } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import PageTitle from '../../components/styled/PageTitle';
import {
  getBoardThunk,
  getAppBoards,
  BoardRequestData
} from '../../reducer/boards/userBoardsSlice';
import { useAppSelector } from '../../app/hooks';
import { useApiRequestWithUIMessages } from '../../app/useApiRequestWithUIMessages';
import { useCallback, useEffect } from 'react';
import BoardItem from './BoardItem';
import { IBoard } from '../../API/boards';
import styled from 'styled-components';
import { ListGridType } from 'antd/lib/list';
import { MessageKeys } from '../../antd/messageProperties';

export function useBoardsRequest() {
  return useApiRequestWithUIMessages<BoardRequestData, IBoard | IBoard[]>({
    messageKey: MessageKeys.main,
    thunk: getBoardThunk
  });
}

function MainPage() {
  const boards = useAppSelector(getAppBoards);
  const boardsRequest = useBoardsRequest();

  useEffect(() => {
    boardsRequest({});
  }, []);

  const renderBoardItem = useCallback((item: IBoard) => <BoardItem {...item} />, []);

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
