import { AppstoreOutlined } from '@ant-design/icons';
import PageTitle from '../../components/styled/PageTitle';
import { useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import styled from 'styled-components';
import ColumnItem from './columnItem';
import { MessageKeys } from '../../antd/messageProperties';
import { useApiRequestWithUIMessages } from '../../app/useApiRequestWithUIMessages';
import { IBoard } from '../../API/boards';
import { Empty } from 'antd';
import {
  getActiveBoardColumnsDataThunk,
  getAppActiveBoardColumnsData
} from '../../reducer/columns/userColumnsSlice';

function BoardPage() {
  const activeBoardColumnsData = useAppSelector(getAppActiveBoardColumnsData);
  const columnsRequest = useApiRequestWithUIMessages<void, IBoard | IBoard[]>({
    messageKey: MessageKeys.board,
    thunk: getActiveBoardColumnsDataThunk
  });
  const isEmpty = !!activeBoardColumnsData && !activeBoardColumnsData.columns;

  useEffect(() => {
    (() => {
      columnsRequest();
    })();
  }, []);

  return (
    <>
      <PageTitle textLink="titles.board-page" icon={<AppstoreOutlined />} />
      <Container>
        {activeBoardColumnsData?.columns?.map((columnData) => (
          <ColumnItem key={columnData.id} {...columnData} />
        ))}
        {isEmpty && <CentredEmpty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      </Container>
    </>
  );
}

const CentredEmpty = styled(Empty)`
  margin: 0 auto;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-grow: 1;
  column-gap: 0.5rem;
  overflow-x: scroll;
  padding: 0 0.5rem;
`;

export default BoardPage;
