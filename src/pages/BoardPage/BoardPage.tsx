import { AppstoreOutlined } from '@ant-design/icons';
import PageTitle from '../../components/styled/PageTitle';
import { useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';
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

export function useColumnsRequest() {
  return useApiRequestWithUIMessages<void, IBoard | IBoard[]>({
    messageKey: MessageKeys.board,
    thunk: getActiveBoardColumnsDataThunk
  });
}

function BoardPage() {
  const activeBoardColumnsData = useAppSelector(getAppActiveBoardColumnsData);
  const columnsRequest = useColumnsRequest();
  const isEmpty = !!activeBoardColumnsData && !activeBoardColumnsData.columns?.length;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    columnsRequest().then(() => setLoading(false));
  }, []);

  return (
    <>
      <PageTitle text={activeBoardColumnsData?.title} icon={<AppstoreOutlined />} />
      <Container>
        {!loading &&
          activeBoardColumnsData &&
          activeBoardColumnsData.columns &&
          [...activeBoardColumnsData.columns]
            .sort((a, b) => a.order - b.order)
            .map((columnData) => <ColumnItem key={columnData.id} {...columnData} />)}
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
  height: 0;
`;

export default BoardPage;
