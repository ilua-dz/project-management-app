import { AppstoreOutlined } from '@ant-design/icons';
import PageTitle from '../../components/styled/PageTitle';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import styled from 'styled-components';
import ColumnItem from './columnItem';
import { MessageKeys } from '../../antd/messageProperties';
import { useApiRequestWithUIMessages } from '../../app/useApiRequestWithUIMessages';
import { BoardGetRequest, IBoard } from '../../API/boards';
import { Empty } from 'antd';
import {
  getAppActiveBoardColumnsData,
  createColumnThunk,
  updateColumnThunk,
  deleteColumnThunk,
  getAppColumnsError,
  getAppColumnsLoading,
  getActiveBoardColumnsDataThunk
} from '../../reducer/columns/userColumnsSlice';

import { BoardRequestData } from '../../reducer/boards/userBoardsSlice';

function MainPage() {
  const activeBoardColumnsData = useAppSelector(getAppActiveBoardColumnsData);
  const columnsRequest = useApiRequestWithUIMessages<void, IBoard | IBoard[]>({
    messageKey: MessageKeys.board,
    thunk: getActiveBoardColumnsDataThunk
  });
  const isEmpty = !!activeBoardColumnsData && !activeBoardColumnsData.columns;

  useEffect(() => {
    (async () => {
      await columnsRequest();
    })();
  }, []);

  return (
    <>
      <PageTitle textLink="titles.board-page" icon={<AppstoreOutlined />} />
      <Container>
        {activeBoardColumnsData?.columns?.map((columnData) => (
          <ColumnItem key={columnData.id} data={columnData} />
        ))}
        {isEmpty && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  column-gap: 20px;
  padding-top: 50px;
`;

export default MainPage;
