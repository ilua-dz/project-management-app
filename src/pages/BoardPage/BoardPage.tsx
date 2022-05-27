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
  getAppActiveBoardColumnsData,
  getActiveBoardColumnsDataThunk
} from '../../reducer/columns/userColumnsSlice';

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
  margin-top: 100px;
  padding-top: 50px;
  column-gap: 50px;
  overflow-x: scroll;
  padding: 0 30px;
`;

export default MainPage;
