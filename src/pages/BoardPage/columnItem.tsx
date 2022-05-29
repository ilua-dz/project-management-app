import { Button, Tooltip } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { IColumn } from '../../API/columns';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { updateColumnThunk, deleteColumnThunk } from '../../reducer/columns/userColumnsSlice';
import { useAppDispatch } from '../../app/hooks';
import CallConfirm from '../../antd/confirmModal';
import Task from './Task/Task';
import { useParams } from 'react-router-dom';
import Colors from '../../enumerations/Colors';
import { useState } from 'react';
import CreateTaskModal from './Task/CreateTaskModal';
import EditableTitle from './EditableTitle';

function ColumnItem({ title, order, id, tasks }: IColumn) {
  const { boardId } = useParams();
  const { t } = useTranslation();
  const confirmMessage = t('confirm.delete');
  const dispatch = useAppDispatch();
  const [isCreateTaskModalVisible, setIsCreateTaskModalVisible] = useState(false);

  function closeCreateTaskModal() {
    setIsCreateTaskModalVisible(false);
  }

  function showCreateTaskModal() {
    setIsCreateTaskModalVisible(true);
  }

  const updateColumnHandler = (value: string) => {
    dispatch(
      updateColumnThunk({
        title: value,
        order,
        columnId: id,
        boardId: `${boardId}`
      })
    );
  };

  const deleteButtonHandler = CallConfirm(confirmMessage, () =>
    dispatch(deleteColumnThunk({ columnId: id, boardId: `${boardId}` }))
  );

  const columnButtons = (
    <StyledButtonsBlock>
      <Tooltip title={t('tooltips.create-task')}>
        <Button shape="circle" icon={<PlusCircleOutlined />} onClick={showCreateTaskModal} />
      </Tooltip>
      <Tooltip title={t('tooltips.delete')}>
        <Button shape="circle" icon={<DeleteOutlined />} onClick={deleteButtonHandler} />
      </Tooltip>
    </StyledButtonsBlock>
  );

  return (
    <div className="site-card-border-less-wrapper">
      <StyledColumn
        bodyStyle={{ padding: '0.5rem' }}
        extra={columnButtons}
        title={<EditableTitle defaultValue={title} setValueAction={updateColumnHandler} />}>
        <CardsContainer>
          {tasks &&
            [...tasks]
              .sort((a, b) => a.order - b.order)
              .map((taskData) => <Task key={taskData.id} {...{ ...taskData, columnId: id }} />)}
        </CardsContainer>
      </StyledColumn>
      <CreateTaskModal
        visible={isCreateTaskModalVisible}
        closeModalFn={closeCreateTaskModal}
        columnId={id}
      />
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

  & > .ant-card-head {
    border-bottom-color: ${Colors.columnDivider};
    padding: 0 1rem;
    display: flex;
  }

  & .ant-card-head-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;

    & > * {
      padding: 0;
    }
  }

  @media (max-width: 480px) {
    width: calc(100vw - 1rem);
  }
`;

const StyledButtonsBlock = styled.div`
  display: flex;
  column-gap: 0.3rem;
`;

export default ColumnItem;
