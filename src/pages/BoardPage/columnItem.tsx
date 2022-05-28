import { Typography, Button, Tooltip } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { IColumn } from '../../API/columns';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { updateColumnThunk, deleteColumnThunk } from '../../reducer/columns/userColumnsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CallConfirm from '../../antd/confirmModal';
import Task from './Task/Task';
import { useParams } from 'react-router-dom';
import { getApiUserId } from '../../reducer/authorization/authorizationSlice';
import Colors from '../../enumerations/Colors';
const { Paragraph } = Typography;

function ColumnItem({ title, order, id, tasks }: IColumn) {
  const { boardId } = useParams();
  const { t } = useTranslation();
  const confirmMessage = t('confirm.delete');
  const dispatch = useAppDispatch();
  const userId = useAppSelector(getApiUserId);

  const updateColumnHandler = (title: string) => {
    dispatch(updateColumnThunk({ title, order, columnId: id, boardId: `${boardId}` }));
  };

  const deleteButtonHandler = CallConfirm(confirmMessage, () =>
    dispatch(deleteColumnThunk({ columnId: id, boardId: `${boardId}` }))
  );

  return (
    <div className="site-card-border-less-wrapper">
      <StyledColumn
        bodyStyle={{ padding: '0.5rem' }}
        title={
          <TitleContainer>
            <Paragraph
              editable={{
                triggerType: ['text'],
                onChange: updateColumnHandler
              }}>
              {title}
            </Paragraph>
            <Tooltip title={t('tooltips.delete')}>
              <Button shape="circle" icon={<CloseOutlined />} onClick={deleteButtonHandler} />
            </Tooltip>
          </TitleContainer>
        }
        bordered={false}>
        <CardsContainer>
          {tasks?.map((taskData) => (
            <Task key={taskData.id} {...{ ...taskData, columnId: id, userId }} />
          ))}
        </CardsContainer>
      </StyledColumn>
    </div>
  );
}

const CardsContainer = styled.div`
  overflow-y: auto;
  max-height: 69vh;
  display: flex;
  flex-direction: column;
  row-gap: 0.2rem;
`;

const StyledColumn = styled(Card)`
  width: calc(320px - 1rem);
  border-radius: 0.5rem;
  border: ${Colors.success} solid 1px;
  background-color: ${Colors.column};

  & .ant-card-head {
    border-bottom-color: ${Colors.columnDivider};
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
`;

export default ColumnItem;
