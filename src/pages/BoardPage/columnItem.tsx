import { Typography, Button, Tooltip } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { IColumn } from '../../API/columns';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { updateColumnThunk, deleteColumnThunk } from '../../reducer/columns/userColumnsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CallConfirm from '../../antd/confirmModal';
import { getAppBoardsActiveId } from '../../reducer/boards/userBoardsSlice';
import Task from './Task/Task';
const { Paragraph } = Typography;

function ColumnItem({title, order, id, tasks}: IColumn) {
  const boardId = useAppSelector(getAppBoardsActiveId);
  const { t } = useTranslation();
  const confirmMessage = t('confirm.delete');
  const dispatch = useAppDispatch();
  const updateColumnHandler = (title: string) => {
    const body = { title, order };
    const columnId = id;
    dispatch(updateColumnThunk({ body, columnId, boardId }));
  };
  const deleteButtonHandler = CallConfirm(confirmMessage, () => dispatch(deleteColumnThunk({ columnId: id, boardId })));

  return (
    <div className="site-card-border-less-wrapper">
      <Card
        style={{ maxHeight: 600, width: 350 }}
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
            <Task key={taskData.id} {...taskData} />
          ))}
          ;
        </CardsContainer>
      </Card>
    </div>
  );
}

const CardsContainer = styled.div`
  overflow-y: auto;
  max-height: 300px;
  padding: 10px 15px;
  margin-right: 12px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
`;

export default ColumnItem;
